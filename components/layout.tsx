import React, { FC } from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { Form } from "./form";
import { Navibar } from "./navibar";

type Props = {
  title: string;
  header: string;
  children: React.ReactNode;
  image?: string | null;
}

export const Layout: FC<Props> = (props) => {
  return (
    <div className="bg-light" id="wrapper">
      <Head>
        <title>{props.title}</title>
        <meta property="og:title" content={props.header} />
        <meta property="og:url" content="https://kobayashi-spring-internship-2021-recipe-site.vercel.app/" />
        {props.image && <meta property="og:image" content={props.image} />}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" crossOrigin="anonymous"></link>
      </Head>
      <Header header={props.header} />
      <div className="container-fluid">
        <h4 className="my-3 text-primary text-center">
          {props.title}
        </h4>
        <Form />
        {props.children}
        <Footer footer="copyright @kitoriaaa" />
        <Navibar />
      </div>
    </div>
  );
};
