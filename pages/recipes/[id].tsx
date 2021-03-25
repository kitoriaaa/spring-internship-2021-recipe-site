import React, { FC, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Recipe, getRecipeById } from "../../lib/recipe";
import { Layout } from "../../components/layout";
import usePersist from "../../lib/persist";


const RecipePage: FC = () => {
  const router = useRouter();
  const [getFav, setFav] = usePersist("fav", []);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (router.query.id !== undefined) {
        const recipe = await getRecipeById(router.query.id);
        setRecipe(recipe);
      }
    })();
  }, [router.query.id]);

  const Fav = () => {
    setIsFav(!isFav);

    let favArr = getFav;
    const targetId = Number(router.query.id);
    if (favArr.length === 0) {
      setFav([targetId]);
    } else {
      if (favArr.includes(targetId)) {
        favArr = favArr.filter((item) => item !== targetId);
      } else {
        favArr = favArr.concat(targetId);
      }
      setFav(favArr);
    }
  };

  return (
    <div>
      <Layout header="Recipe" title="レシピを検索">
        {recipe && (
          <main>
            <h2>{recipe.title}</h2>
            {recipe.image_url && (
              <img src={recipe.image_url} alt="レシピ画像" width="300" />
            )}

            <div className="row">
              <p className="col-6">{recipe.author.user_name}</p>
              <p className="col-6">{recipe.published_at}</p>
            </div>
            <button id={getFav.includes(Number(router.query.id)) ? "active" : "deactive"} onClick={Fav}>お気に入り</button>
            <p>{recipe.description}</p>


            <h3>材料</h3>
            <ol className="list-group">
              {recipe.ingredients.map((item, ind) => (
                <li key={ind} className="list-group-item">
                  <div className="row">
                    <div className="col-8 my-2">{item.name}</div>
                    <div className="col-4 my-2">{item.quantity}</div>
                  </div>
                </li>
              ))}
            </ol>
            <h3 className="my-3">手順</h3>
            <ol className="list-group">
              {recipe.steps.map((step, ind) => (
                <li key={ind} className="list-group-item">
                  <div className="row">
                    <div className="col-2 my-2 d-flex align-items-center text-center">{ind + 1}</div>
                    <div className="col-10 my-2">{step}</div>
                  </div>
                </li>
              ))}
            </ol>
          </main>
        )}
      </Layout>
    </div>
  );
};

export default RecipePage;