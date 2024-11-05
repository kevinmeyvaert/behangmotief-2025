import { Link } from "@remix-run/react";

import logo from "../images/logo.svg";

export const Header = () => {
  return (
    <header className="container flex justify-center md:justify-start items-center h-[150px]">
      <Link
        to={{
          pathname: "/",
          search: "",
        }}
        prefetch="render"
      >
        <div className="flex items-center">
          <img src={logo} width="80" height="55" alt="Behangmotief"></img>
          <p className="ml-2 text-xs sm:text-sm">
            | music & festival photographer
          </p>
        </div>
      </Link>
    </header>
  );
};
