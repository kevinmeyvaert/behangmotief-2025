import { Link } from "@remix-run/react";

export const Header = () => {
  return (
    <header className="container z-20 p-[20px_40px] flex justify-start items-center h-[150px]">
      <Link
        to={{
          pathname: "/",
          search: "",
        }}
      >
        <div className="flex items-center">
          <img src="../public/logo.svg" width="80" alt="Behangmotief"></img>
          <p className="ml-2">| concert- & festivalphotographer</p>
        </div>
      </Link>
    </header>
  );
};
