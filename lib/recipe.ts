export type Recipe = {
  // レシピID
  id: number;

  // レシピ名
  title: string;

  // レシピ概要
  description: string;

  // レシピ画像。画像がない場合は null。
  image_url: string | null;

  // レシピ作者
  author: {
    user_name: string;
  };

  // レシピを公開した日時。ISO 8601
  published_at: string;

  // レシピの手順
  steps: string[];

  // レシピの材料
  ingredients: {
    // 材料名
    name: string;
    // 分量（100g など）
    quantity: string;
  }[];

  // 関連するレシピのIDが最大5つ入っている。Poster View などを実装するのに使う。
  // なお、関連レシピの算出アルゴリズムのできが悪いため関連性が低い可能性がある点に注意。
  related_recipes: number[];
};

// GET /recipes response type
export type Response = {
  // レシピ一覧
  recipes: Recipe[];

  // ページネーション可能な場合の次、前のページのリンク
  links: {
    next?: string;
    prev?: string;
  };
};


export async function getRecipes(page: string): Promise<Response> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const apiUrl = `${apiBaseUrl}/recipes?page=${page}`;
  const res = await fetch(apiUrl, {
    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY as string }
  });
  const recipes = await res.json();
  console.log(apiUrl);
  console.log(recipes);
  // return recipes.recipes as Recipe[];
  return recipes as Response;
}

// export async function getRecipeById(id: string | string[] | undefined): Promise<Recipe> {
//   const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL as string;
//   const apiUrl = `${apiBaseUrl}/recipes?id=${id}`;
//   console.log("getRecipeById apiURL: ", apiUrl);
//   const res = await fetch(apiUrl, {
//     headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY as string }
//   });
//   const recipe = await res.json();
//   return recipe.recipes[0];
// }

export async function getRecipeById(id: string | string[] | undefined): Promise<Response | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const apiUrl = `${apiBaseUrl}/recipes?id=${id}`;
  console.log("getRecipeById apiURL: ", apiUrl);
  const res = await fetch(apiUrl, {
    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY as string }
  });
  if (res.status === 404) return null;
  const recipes = await res.json();
  return recipes as Response;
}

export async function searchRecipes(keyword: string, page: string | null): Promise<Response | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const apiUrl = page !== null ? `${apiBaseUrl}/search?keyword=${keyword}&page=${page}` : `${apiBaseUrl}/search?keyword=${keyword}`;
  console.log("searchRecipe URL", apiUrl);
  const res = await fetch(apiUrl, {
    headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY as string }
  });

  // console.log(res.json());
  if (res.status === 404) return null;
  const recipes = await res.json();
  return recipes as Response;
}
