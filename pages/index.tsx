import React, { FC, useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { Recipe, getRecipes, Response } from "../lib/recipe";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: FC = () => {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [page, setPage] = useState<string | undefined>(undefined);
  const [res, setRes] = useState<Response | null>(null);

  useEffect(() => {
    (async () => {
      const page = router.query.page;
      setPage(page as string);
      let res;
      if (page !== undefined) {
        res = await getRecipes(page[0]);
      } else {
        res = await getRecipes("1");
      }
      setRes(res);
      if (res !== null)
        setRecipes(res.recipes);
    })();
  }, [router.query.page]);


  console.log("link", res?.links.next);
  if (res === null) {
    return (
      <Layout header="Recipe" title="レシピを検索">
        <div className="alert alert-warning text-center font-weight">Sorry!! Not Found Recipe</div>
      </Layout>
    );
  }
  if (recipes === null) return <div>loading...</div>;

  return (
    <Layout header="Recipe" title="レシピを検索">
      <div className="container-sm">
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
            res.links.prev === undefined ? null :
              <div className="btn-group">
                <Link href={'/search?' + res?.links.prev?.split('?')[1]}>
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
      </div>
    </Layout >
  );
};

export default Home;
