export const FriendListSkeleton = () => {
  const skeletonItems = Array(5).fill(null);
  return (
    <div className="flex flex-col max-w-full mt-5 ">
      <div className=" items-center justify-between flex">
        <h1 className="text-base font-medium text-info-content px-2  ">Friends:</h1>
        <p className="badge skeleton bg-neutral  size-5"></p>
      </div>
      <div className="flex flex-col mt-2 gap-1 ">
        {skeletonItems.map((_, idx) => (
          <div key={idx} className="w-full p-2 flex items-center gap-3">
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-lg bg-neutral" />
            </div>

            <div className="block  text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2 bg-neutral" />
              <div className="skeleton h-3 w-16 bg-neutral" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
