import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoading() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="items-center gap-8 hidden sm:flex">
          <Skeleton className="h-12 w-48 rounded-md border border-gray-300 animate-pulse" />
          <Separator orientation="vertical" className="bg-neutral-100 h-12" />
          <Skeleton className="h-12 w-24 rounded-md border border-gray-300 animate-pulse" />
          <Separator orientation="vertical" className="bg-neutral-100 h-12" />
          <Skeleton className="h-12 w-24 rounded-md border border-gray-300 animate-pulse" />
        </div>
        <Skeleton className="h-12 w-44 rounded-md border border-gray-300 animate-pulse" />
      </div>
      <Separator className="bg-neutral-200 h-[1px]" />
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="items-center gap-8 hidden sm:flex">
          <Skeleton className="h-12 w-72 rounded-md border border-gray-300 animate-pulse" />
        </div>
        <Skeleton className="h-12 w-12 rounded-md border border-gray-300 animate-pulse" />
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Skeleton className="h-12 w-full rounded-md border border-gray-300 animate-pulse" />
        <div className="flex items-center gap-5 w-full">
          <div
            role="status"
            className="p-4 space-y-4 border border-gray-300 divide-y divide-gray-300 rounded-md shadow animate-pulse w-full"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                className="flex items-center justify-between pt-4"
                key={index}
              >
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5 animate-pulse"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full w-12 animate-pulse"></div>
              </div>
            ))}
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <Skeleton className="h-12 w-full rounded-md border border-gray-300 animate-pulse" />
      </div>
    </div>
  );
}
