import React, { FC } from "react";
import Link from "next/link";

type Props = {
  header: string
}

export const Header: FC<Props> = (props) => {
  return (
    <div>
      <h1 className="bg-primary px-3 text-white display-4 text-left text-white">
        <div className="row">
          <div className="col-3">
            <Link href="/">
              <div className="text-white">
                {props.header}
              </div>
            </Link>
          </div>
        </div>
      </h1>
    </div>
  );
};
