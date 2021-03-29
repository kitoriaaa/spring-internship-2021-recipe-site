import React, { FC } from "react";
import { Recipe, searchRecipes, Response } from "../../lib/recipe";
import { Layout } from "../../components/layout";
import Link from 'next/link';
import { ListImageDescription } from "../../components/listImageDescription";
import { GetServerSideProps } from "next";

type Props = {
  recipes: Recipe[] | null;
  res: Response | null;
  keyword: string;
}

const Search: FC<Props> = (props) => {
  const { recipes, res, keyword } = props;

  // console.log(res);
  if (keyword === undefined) {
    return (
      <Layout header="ReciPeer" title="レシピを検索">
      </Layout>
    );
  }

  if (res === null || recipes === null) {
    return (
      <Layout header="ReciPeer" title="レシピを検索">
        <div className="alert alert-warning text-center font-weight">Sorry!! Not Found Recipe</div>
      </Layout>
    );
  }


  return (
    <Layout header="ReciPeer" title="レシピを検索">
      <>
        {recipes.map((recipe) => (
          <div className="card alert alert-warning" key={recipe.id}>
            <Link key={recipe.id} href={`recipes/${recipe.id}`}>
              <div>
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
                <Link href={res?.links.prev.split('?')[1] == undefined ? "/search" : '/search?' + res?.links.prev?.split('?')[1]}>
                  <button type="button" className="btn btn-success">Prev</button>
                </Link>
              </div>
          }
          {
            res?.links.next === undefined ? null :
              <div className="btn-group ml-auto">
                <Link href={'/search?' + res?.links.next?.split('?')[1]}>
                  <button type="button" className="btn btn-success">Next</button>
                </Link>
              </div>
          }
        </div>
      </>
    </Layout>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query?.page;
  const word = context.query?.keyword as string;
  console.log(word);

  let res;
  if (word !== undefined) {
    if (page !== undefined) {
      console.log("page isn't undefined");
      res = await searchRecipes(encodeURIComponent(word), page as string);
    } else {
      res = await searchRecipes(encodeURIComponent(word), null);
    }
  } else {
    res = null;
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
      keyword: word
    }
  };
};

export default Search;
