import React, { FC } from "react";
import Image from 'next/image';
import Link from "next/link";


export const Navibar: FC = () => {
  return (
    <div className="text-center h6 my-4" id="footer">
      <div className="row">
        <Link href="/">
          <div className="col-4" role="button">
            <Image src="/home.svg" alt="Picture of the author"
              width={30}
              height={30} />
          </div>
        </Link>
        <Link href="/search">
          <div className="col-4" role="button">
            <Image src="/search.svg" alt="Picture of the author"
              width={30}
              height={30} />
          </div>
        </Link>
        <Link href="/fav">
          <div className="col-4" role="button">
            <Image src="/star.svg" alt="Picture of the author"
              width={30}
              height={30} />
          </div>
        </Link>
      </div>
    </div>
  );
};

