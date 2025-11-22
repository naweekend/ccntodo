export default function RightSide({ className }: { className: string }) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Right Side</h1>
      </div>
    </div>
  )
}