import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

const SearchForm: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    router.push({
      pathname: "/search",
      query: { q: searchQuery },
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="items-center bg-white border-[2px] border-[#D9D9D9] rounded-[10px] w-full lg:max-w-[580px]"
    >
      <div className="flex flex-row justify-between gap-4 p-1 lg:p-[7px]">
        <input
          id="search-form-input"
          data-cy="search-input"
          type="search"
          name="search"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Explore datasets..."
          aria-label="Explore datasets"
          className={`w-3/4 py-3 px-4 md:py-3 md:px-4 leading-none placeholder-[#111D43] text-sm lg:text-[19px] ring-0 outline-0`}
        />
        <button
          data-cy="search-submit-button"
          type="submit"
          className={`text-sm lg:text-[19px] rounded-[5px] font-bold px-3 py-3 md:px-8 md:py-3 leading-none lg:mt-0 text-white bg-ann-arbor-accent-green transition-all hover:bg-ann-arbor-accent-green/90`}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
