export const calculateAngle = (
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
) => {
  const angle1 = Math.atan2(p1.y - p2.y, p1.x - p2.x)
  const angle2 = Math.atan2(p3.y - p2.y, p3.x - p2.x)

  let angle = (angle1 - angle2) * (180 / Math.PI)

  if (angle < 0) {
    angle += 360
  }

  return angle
}
