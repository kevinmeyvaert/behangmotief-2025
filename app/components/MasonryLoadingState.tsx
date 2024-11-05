export const MasonryLoadingState = () => (
  <div className="container text-white grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-5">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-slate-200 pt-[66%] max-w-[100%] drop-shadow"
      />
    ))}
  </div>
);
