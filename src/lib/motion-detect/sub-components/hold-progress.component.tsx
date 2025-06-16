export const HoldProgressBar = ({ hold, max }: { hold: number; max: number }) => {
  if (max === 0) return null
  return (
    <progress
      className="absolute w-[360px] bottom-[.8rem] left-[9.4rem] overflow-hidden rounded-sm z-50 h-[1.3rem] border border-gray-400"
      value={hold}
      max={max}></progress>
  )
}
