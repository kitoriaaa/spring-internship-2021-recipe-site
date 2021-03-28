import React, { FC } from "react";
import { Layout } from "../components/layout";
import { Recipe, getRecipes, Response } from "../lib/recipe";
import Link from "next/link";
import { ListImageDescription } from "../components/listImageDescription";
import { GetServerSideProps } from "next";

type Props = {
  recipes: Recipe[] | null;
  res: Response | null;
}

const Home: FC<Props> = (props) => {
  const { recipes, res } = props;

  if (recipes === null) {
    return (
      <Layout header="ReciPeer" title="レシピ一覧">
        <div className="alert alert-warning text-center font-weight">Sorry!! Not Found Recipe</div>
      </Layout>
    );
  }

  return (
    <Layout header="ReciPeer" title="レシピ一覧">
      {recipes.map((recipe) => (
        <div className="card alert alert-warning" key={recipe.id}>
          <Link key={recipe.id} href={`recipes/${recipe.id}`}>
            <div role="button">
              <div className="text-center font-weight-bold">
                {recipe.title}
              </div>
              <ListImageDescription image_url={recipe.image_url} description={recipe.description} />
            </div>
          </Link>
        </div>
      ))}
      <div className="btn-toolbar">
        {
          res?.links.prev === undefined ? null :
            <div className="btn-group">
              <Link href={res?.links.prev.split('?')[1] == undefined ? "/" : '/?' + res?.links.prev?.split('?')[1]}>
                <button type="button" className="btn btn-success">Prev</button>
              </Link>
            </div>
        }
        {
          res?.links.next === undefined ? null :
            <div className="btn-group ml-auto">
              <Link href={'/?' + res?.links.next?.split('?')[1]}>
                <button type="button" className="btn btn-success">Next</button>
              </Link>
            </div>
        }
      </div>
    </Layout >
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query?.page as string;
  console.log("params", context);
  let res;
  if (page !== undefined) {
    res = await getRecipes(page[0]);
  } else {
    res = await getRecipes("1");
  }

  let recipes: Recipe[] | null;
  if (res !== null)
    recipes = res.recipes;
  else
    recipes = null;

  return {
    props: {
      recipes: recipes,
      res: res,
    }
  };
};

export default Home;
