import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Recipe, searchRecipes, Response } from "../../lib/recipe";
import { Layout } from "../../components/layout";
import Link from 'next/link';

export const Search: FC = () => {
  const router = useRouter();
  const [res, setRes] = useState<Response | null>(null);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [page, setPage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const page = router.query.page;
      const word = router.query.keyword;
      setPage(page as string);
      let res;
      console.log("page: ", page);

      if (router.query.keyword !== undefined) {
        if (page !== undefined) {
          console.log("page isn't undefined");
          res = await searchRecipes(word as string, page as string);
        } else {
          res = await searchRecipes(word as string, null);
        }
        setRes(res);
        if (res !== null)
          setRecipes(res.recipes);
      }
    })();
    setLoading(false);
  }, [router.query.page, router.query.keyword]);


  // console.log(res);
  if (page === undefined && router.query.keyword === undefined) {
    return (
      <Layout header="Recipe" title="レシピを検索">
      </Layout>
    );
  }

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
        <div className="alert alert-warning text-center font-weight">Sorry!! Not Found Recipe</div>
      </Layout>
    );
  }

  console.log("query:", router.query.keyword);

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

export default Search;
