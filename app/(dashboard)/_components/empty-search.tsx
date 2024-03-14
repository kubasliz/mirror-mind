import Image from 'next/image';

export const EmptySearch = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-search.svg" width={200} height={200} alt="Empty search" />
      <h2 className="text-2xl font-semibold mt-6">No results found.</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else or favoriting some boards
      </p>
    </div>
  );
};
