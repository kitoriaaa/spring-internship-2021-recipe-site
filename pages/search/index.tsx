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

  useEffect(() => {
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
  }, [router.query.page, router.query.keyword]);

  if (res === null) {
    return (
      <Layout header="Recipe" title="レシピを検索">
        <div className="alert alert-warning text-center font-weight">Sorry!! Not Found Recipe</div>
      </Layout>
    );
  }
  if (recipes === null) return <div>loading...</div>;

  console.log("query:", router.query.keyword);

  return (
    <Layout header="Recipe" title="レシピを検索">
      <>
        {recipes.map((recipe) => (
          <div className="card alert alert-primary" key={recipe.id}>
            <Link key={recipe.id} href={`recipes/${recipe.id}`}>
              <div>
                <div className="text-center font-weight-bold">
                  {recipe.title}
                </div>
                <div className="row">
                  <div className="col">
                    {recipe.image_url !== null ? <img className="my-2" src={recipe.image_url} width="185" /> : <div className="my-2">No Image</div>}
                  </div>
                  <div className="col d-flex align-items-center text-left" >
                    <div className="p-2">
                      {recipe.description}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        <div className="btn-toolbar">
          {
            page === undefined ? null :
              <div className="btn-group">
                <Link href={'/search?' + res?.links.prev?.split('?')[1]}>
                  <button type="button" className="btn btn-success">Prev</button>
                </Link>
              </div>
          }
          <div className="btn-group ml-auto">
            <Link href={'/search?' + res?.links.next?.split('?')[1]}>
              <button type="button" className="btn btn-success">Next</button>
            </Link>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Search;
