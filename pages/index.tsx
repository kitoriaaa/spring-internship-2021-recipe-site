import React, { FC, useEffect, useState } from "react";
import { Layout } from '../components/layout';
import { Recipe, getRecipes } from "../lib/getRecipe";


const Home: FC = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    (async () => {
      const recipes = await getRecipes();
      setRecipes(recipes);
    })();
  }, []);

  // console.log(recipes);
  if (recipes === null) return <div>loading...</div>;

  return (
    <Layout header="Recipe" title="レシピを検索">
      <h1>Hello Next!</h1>
      {recipes.map((recipe) => (
        <div className='alert alert-primary' key={recipe.id}>
          <p className="text-center">{recipe.title}</p>
        </div>
      ))}
    </Layout>
  );
};

export default Home;
