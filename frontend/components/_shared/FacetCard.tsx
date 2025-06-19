
export default function FacetCard({
  title,
  children,
  showClear,
  clearAction,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  showClear?: boolean;
  clearAction?: Function;
}) {

  return (
    <section className={`bg-white rounded-[10px] p-5 mb-4`}>
      <div className="flex items-center pb-4 ">
        {title && <h1 className="font-bold m-0">{title}</h1>}
      </div>
      <div>{children}</div>
      {showClear && (
        <div>
          <span
            role="button"
            className="text-sm cursor-pointer hover:underline"
            onClick={() => clearAction && clearAction()}
          >
            Clear
          </span>
        </div>
      )}
    </section>
  );
}
