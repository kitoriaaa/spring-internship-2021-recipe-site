import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";


export const Form: FC = () => {
  const [text, setText] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.keyword !== null) {
      const keyword = router.query.keyword as string;
      if (keyword !== undefined && keyword !== null)
        setText(keyword);
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
      <div className="form-group">
        <input type="text" className="form-control" onChange={onChange} value={text} />
        <input type="submit" className="btn btn-primary" onClick={onAction} />
      </div>
    </form>
  );
};
