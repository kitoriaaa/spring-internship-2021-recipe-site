import React, { FC, useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { Recipe, getRecipes } from "../lib/getRecipe";
import Link from "next/link";
import { useRouter } from 'next/router';

const Home: FC = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [page, setPage] = useState<number>(1);


  useEffect(() => {
    (async () => {
      const recipes = await getRecipes(page);
      setRecipes(recipes);
    })();
  }, [page]);

  const pageIncrement = () => {
    setPage(page + 1);
  };
  const pageDecrement = () => {
    setPage(page - 1);
  };

  // console.log(recipes);
  if (recipes === null) return <div>loading...</div>;

  return (
    <Layout header="Recipe" title="レシピを検索">
      <>
        {recipes.map((recipe) => (
          <div className="card alert alert-primary" key={recipe.id}>
            <Link key={recipe.id} href={`recipes/${recipe.id}`}>
              <div className="row">
                <div className="col">
                  {recipe.image_url !== null ? <img className="my-2" src={recipe.image_url} width="185" /> : <div className="my-2">No Image</div>}
                </div>
                <div className="col d-flex align-items-center text-left" >
                  {recipe.title}
                </div>
              </div>
            </Link>
          </div>
        ))}
        <div className="btn-toolbar">
          {
            page === 1 ? null :
              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={pageDecrement}>Prev</button>
              </div>
          }
          <div className="btn-group ml-auto">
            <button type="button" className="btn btn-secondary" onClick={pageIncrement}>Next</button>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Home;
