export default function MovieCardSkeleton() {
    return (
        <div className="col-span-1 space-y-2 animate-pulse">
            <div className="aspect-2/3 rounded bg-gray-800" />
            <div className="h-4 w-24 bg-gray-800 rounded" />
            <div className="h-5 w-3/4 bg-gray-800 rounded" />
            <div className="h-4 w-12 bg-gray-800 rounded" />
        </div>
    );
}
