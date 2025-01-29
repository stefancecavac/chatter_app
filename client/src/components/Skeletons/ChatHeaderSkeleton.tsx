export const ChatHeaderSkeleton = () => {
  return (
    <div className="bg-base-100 p-1  m-1 rounded-lg border-r-2 border-base-200  gap-5 bg-fixed  flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative mx-auto lg:mx-0">
          <div className="skeleton size-10 rounded-lg bg-neutral" />
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 font-medium  ">
            <div className="skeleton h-6 w-32 mb-2 bg-neutral" />
          </div>
          <div className="skeleton h-3 w-16 bg-neutral" />
        </div>
      </div>
    </div>
  );
};
