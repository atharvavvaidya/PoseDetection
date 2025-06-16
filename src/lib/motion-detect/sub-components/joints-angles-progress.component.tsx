export const JointsAnglesProgressBar = ({
  label,
  min,
  max,
  angle
}: {
  label: string
  min: number
  max: number
  angle: number
}) => {
  return (
    <>
      <div
        className="flex gap-x-3 justify-center items-center"
        style={{ textShadow: '1px 1px 2px #000' }}>
        <label className="relative top-[-.1rem] w-[7.5rem] overflow-hidden text-ellipsis whitespace-nowrap">
          {label} :
        </label>
        <div className="flex-1 rounded-md h-5 border relative bg-white w-[360px]">
          <div
            className="absolute h-full bg-blue-500"
            style={{
              left: min + 'px',
              width: max - min + 'px'
            }}></div>
          <div
            className="absolute w-1 h-full bg-black"
            style={{ left: angle + 'px' }}></div>
        </div>
        <span>{~~angle} deg</span>
      </div>
    </>
  )
}
