import React, { FC, useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { Recipe, Response, getRecipeById } from "../../lib/recipe";
import usePersist from "../../lib/persist";
import Link from "next/link";

const FavPage: FC = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [getFav, setFav] = usePersist("fav", []);
  const [loading, setLoading] = useState<boolean>(true);
  const [res, setRes] = useState<Response | null>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const ids = getFav;
      const res = await getRecipeById(ids);
      setRes(res);
      if (res !== null) setRecipes(res.recipes);
    })();
    setLoading(false);
  }, [getFav]);


  console.log(res);
  if (loading) {
    return (
      <Layout header="Recipe" title="レシピを検索">
        <div className="alert alert-warning text-center font-weight">Now Loading...</div>
      </Layout>
    );
  }
  if (res === null || recipes === null) {
    return (
      <Layout header="Recipe" title="レシピを検索">
        <div className="alert alert-warning text-center font-weight">お気に入りレシピはまだありません！</div>
      </Layout>
    );
  }


  return (
    <Layout header="Recipe" title="レシピを検索">
      {recipes.map((recipe) => (
        <div className="card alert alert-warning" key={recipe.id}>
          <Link key={recipe.id} href={`recipes/${recipe.id}`}>
            <div role="button">
              <div className="text-center font-weight-bold">
                {recipe.title}
              </div>
              <div className="card" id="recipe_all">
                {recipe.image_url !== null ? <img className="bd-placeholder-img card-img-top" width="100%" height="180" src={recipe.image_url} /> : null}
                <div className="card-body">
                  <p className="card-text">{recipe.description}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Layout >
  );
};

export default FavPage;