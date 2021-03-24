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


  // console.log(recipes);
  if (recipes === null) return <div>loading...</div>;

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
        {/* <div className="btn-toolbar">
          {
            page === 1 ? null :
              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={pageDecrement}>Prev</button>
              </div>
          }
          <div className="btn-group ml-auto">
            <button type="button" className="btn btn-secondary" onClick={pageIncrement}>Next</button>
          </div>
        </div> */}

        <div className="btn-toolbar">
          {
            page === undefined ? null :
              <div className="btn-group">
                <Link href={'/?' + res?.links.prev?.split('?')[1]}>
                  <button type="button" className="btn btn-success">Prev</button>
                </Link>
              </div>
          }
          <div className="btn-group ml-auto">
            <Link href={'/?' + res?.links.next?.split('?')[1]}>
              <button type="button" className="btn btn-success">Next</button>
            </Link>
          </div>
        </div>
      </>
    </Layout >
  );
};

export default Home;
