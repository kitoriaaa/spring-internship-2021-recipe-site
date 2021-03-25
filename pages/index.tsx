import React, { FC, useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { Recipe, getRecipes, Response } from "../lib/recipe";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: FC = () => {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [, setPage] = useState<string | undefined>(undefined);
  const [res, setRes] = useState<Response | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    })();
  }, [router.query.page]);

  console.log("link prev", res?.links.prev);

  console.log("link", res?.links.next);

  if (loading || recipes === null) {
    return (
      <Layout header="ReciPeer" title="レシピ一覧">
        <div className="alert alert-warning text-center font-weight">Now Loading...</div>
      </Layout>
    );
  }
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

export default Home;
