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
      className="items-center bg-white border-[2px] border-[#D9D9D9] rounded-[10px] w-full max-w-[580px]"
    >
      <div className="flex flex-row justify-between gap-4 p-2">
        <input
          id="search-form-input"
          type="search"
          name="search"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Explore datasets..."
          aria-label="Explore datasets"
          className={`w-3/4 py-3 px-4 md:py-3 md:px-4 leading-none placeholder-[#111D43] text-lg`}
        />
        <button
          type="submit"
          className={`text-lg rounded-[5px] font-bold px-3 py-3 md:px-8 md:py-3 leading-none lg:mt-0 text-white bg-accent`}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
