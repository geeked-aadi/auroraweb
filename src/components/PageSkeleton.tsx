import { Skeleton } from "@/components/ui/skeleton";

const DesktopPageSkeleton = () => (
  <div className="hidden min-h-screen bg-background md:block">
    <div className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-16" />
          ))}
        </div>
      </div>
    </div>

    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-24 pb-12">
      <Skeleton className="h-[480px] w-full rounded-2xl" />
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-40 w-full rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-72 w-full rounded-2xl" />
      <div className="grid grid-cols-2 gap-6">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
      <Skeleton className="h-56 w-full rounded-2xl" />
    </main>
  </div>
);

const MobilePageSkeleton = () => (
  <div className="min-h-screen bg-background md:hidden">
    <div className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
    </div>

    <main className="flex flex-col gap-5 px-4 pt-20 pb-8">
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-56 w-full rounded-xl" />
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-72 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
    </main>
  </div>
);

const PageSkeleton = () => {
  return (
    <>
      <DesktopPageSkeleton />
      <MobilePageSkeleton />
    </>
  );
};

export default PageSkeleton;
