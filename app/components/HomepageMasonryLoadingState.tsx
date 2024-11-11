export const HomepageMasonryLoadingState = () => (
  <div className="container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-5">
    {Array.from({ length: 9 }).map((_, i) => (
      <div key={i} className="drop-shadow">
        <div className="animate-pulse bg-slate-200 pt-[66%] max-w-[100%]" />
      </div>
    ))}
  </div>
);
