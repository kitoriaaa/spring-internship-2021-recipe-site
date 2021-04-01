import React, { FC, useState } from "react";
import { Recipe, getRecipeById } from "../../lib/recipe";
import { Layout } from "../../components/layout";
import usePersist from "../../lib/persist";
import { GetServerSideProps } from "next";
import Image from 'next/image';

type Props = {
  recipe: Recipe | undefined;
  id: number | undefined;
}

const RecipePage: FC<Props> = (props) => {
  const [getFav, setFav] = usePersist("fav", []);
  const [isFav, setIsFav] = useState<boolean>(false);
  const { recipe, id } = props;

  const Fav = () => {
    setIsFav(!isFav);

    let favArr = getFav;
    const targetId = String(id);
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

  if (recipe === undefined) {
    return (
      <div>
        <Layout header="Recipeer" title="詳細レシピ">
          <div className="alert alert-warning text-center font-weight">Sorry!! Not found Recipe</div>
        </Layout>
      </div>
    );
  }

  return (
    <div>
      <Layout header="ReciPeer" title="詳細レシピ" image={recipe.image_url}>
        {recipe && (
          <main>
            <h2>{recipe.title}</h2>
            {recipe.image_url !== null ?
              <Image src={recipe.image_url} alt="recipe"
                width="300" height="160" />
              : <Image src="/no-image.jpg" alt="No image" width="300" height="160" />}

            <div className="row">
              <p className="col-6">{recipe.author.user_name}</p>
              <p className="col-6">{recipe.published_at}</p>
            </div>
            <button id={getFav.includes(String(id)) ? "active" : "deactive"} onClick={Fav}>お気に入り</button>
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


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query?.id;
  let res;

  if (id === undefined) {
    res = null;
  } else {
    res = await getRecipeById(id);
  }

  const recipe = res?.recipes[0];

  return {
    props: {
      recipe: recipe,
      id: id
    }
  };
};

export default RecipePage;