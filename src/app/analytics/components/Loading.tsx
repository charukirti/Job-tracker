export default function Loading() {
  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <div className="animate-spin rounded-full h-20 w-20 border-8 border-t-transparent border-gray-400 dark:border-gray-600"></div>
      <p className="text-xl font-bold text-gray-400 dark:text-gray-600">Loading Analytics...</p>
    </div>
  );
}
