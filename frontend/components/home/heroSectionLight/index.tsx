import SearchForm from "./SearchForm";

export default function HeroSectionLight({ stats }) {
  return (
    <div>
      <div className="custom-container mx-auto bg-white">
        <div className="flex flex-col lg:items-center gap-8 gap-y-5">
          <h1 className="lg:max-w-[478px] font-bold text-[40px] md:text-6xl flex flex-col text-center">
            City of Ann Arbor Open Data Portal
          </h1>
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
