import MatrixRain from "./MatrixRain";

export default function RightSide({ className }: { className: string }) {
  return (
    <div className={`flex flex-col gap-5 w-100 ${className}`}>
      <div className="flex flex-col gap-5 w-full">
        <MatrixRain className="h-screen w-full" />
      </div>
    </div>
  )
}