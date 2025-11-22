import MatrixRain from "./MatrixRain";

export default function RightSide({ className }: { className: string }) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <div className="flex flex-col gap-5">
        <MatrixRain className="h-screen" />
      </div>
    </div>
  )
}