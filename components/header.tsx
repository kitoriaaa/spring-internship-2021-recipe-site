import React, { FC } from "react";

type Props = {
  header: string
}

export const Header: FC<Props> = (props) => {
  return (
    <div>
      <h1 className="bg-primary px-3 text-white display-4 text-left">
        {props.header}
      </h1>
    </div>
  );
};
