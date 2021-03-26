import React, { FC } from "react";
import Image from "next/image";

type Props = {
  image_url: string | null;
  description: string;
};

export const ListImageDescription: FC<Props> = (props) => {
  return (
    <div className="card" id="props_all">
      {props.image_url !== null ? <img className="bd-placeholder-img card-img-top" width="100%" src={props.image_url} alt="Racipe image" /> :
        <Image src="/no-image.jpg" alt="No image"
          width="260" height="160"
        />}
      <div className="card-body">
        <p className="card-text">{props.description}</p>
      </div>
    </div>
  );
};