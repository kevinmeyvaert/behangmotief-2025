import { useNavigate } from "@remix-run/react";

import { useSearchParams } from "@remix-run/react";
import { FormEvent } from "react";

export const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchValue = (form.elements.namedItem("search") as HTMLInputElement)
      .value;
    if (searchValue) {
      navigate({
        pathname: "/",
        search: `?search=${encodeURIComponent(searchValue.trim())}&page=1`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex mb-5 w-full justify-center"
      key={searchParams.get("search")}
    >
      <input
        type="text"
        name="search"
        defaultValue={searchParams.get("search") ?? ""}
        placeholder="Search an artist or venue..."
        className="appearance-none rounded-none p-4 text-m bg-[white] w-full max-w-96 border-b-4 border-black"
      />
      <button type="submit" className="py-2 px-4">
        Search
      </button>
    </form>
  );
};
