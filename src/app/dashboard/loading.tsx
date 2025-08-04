import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function DashboardLoading() {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <div className="mt-10 w-full">
        <LoadingSpinner message="Loading dashboard..." className="py-20" />
      </div>
    </div>
  );
} 