import React, { FC } from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { Form } from "./form";

type Props = {
  title: string,
  header: string,
  children: React.ReactNode
}


export const Layout: FC<Props> = (props) => {
  return (
    <div className="bg-light">
      <Head>
        <title>{props.title}</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" crossOrigin="anonymous"></link>
      </Head>
      <Header header={props.header} />
      <div className="container-fluid">
        <h4 className="my-3 text-primary text-center">
          {props.title}
        </h4>
        <Form />
        {props.children}
      </div>
      <Footer footer="copyright kitoriaaa" />
    </div>
  );
};
