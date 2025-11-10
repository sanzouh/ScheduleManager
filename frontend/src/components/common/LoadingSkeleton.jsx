// src/components/common/LoadingSkeleton.jsx

export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="h-20 bg-gray-200 rounded-lg mb-6"></div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-6 gap-4">
        {/* Time column */}
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>

        {/* Day columns */}
        {[...Array(5)].map((_, dayIdx) => (
          <div key={dayIdx} className="space-y-4">
            <div className="h-12 bg-gray-300 rounded-lg mb-4"></div>
            {[...Array(6)].map((_, slotIdx) => (
              <div
                key={slotIdx}
                className="h-24 bg-gray-200 rounded-lg"
                style={{
                  opacity: Math.random() > 0.5 ? 1 : 0.3,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white p-4 rounded-lg border border-gray-200">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
};
