import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";


export const Form: FC = () => {
  const [text, setText] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.keyword !== undefined) {
      const keyword = router.query.keyword as string;
      if (keyword !== undefined && keyword !== null)
        setText(keyword);
    } else {
      setText("");
    }
  }, [router.query.keyword]);

  const onAction = (e: any) => {
    e.preventDefault();
    console.log(text);
    if (text !== "") {
      router.push({
        pathname: '/search',
        query: { keyword: text }
      });
    }
  };

  const onChange = (e: any) => {
    if (e.target.value !== null) {
      setText(e.target.value);
    }
  };

  return (
    <form onSubmit={onAction}>
      <div className="form-row align-items-center my-3">
        <div className="col-8">
          <input type="text" className="form-control" onChange={onChange} value={text} placeholder="レシピを検索" />
        </div>
        {/* <div className="col-2">
          <input type="submit" className="btn btn-primary" onClick={onAction} value="検索" />
        </div> */}
        <div className="col-4 " role="button" onClick={onAction}>
          <Image src="/search.svg" alt="Picture of the author"
            width={30}
            height={30} />
        </div>
      </div>
    </form>
  );
};
