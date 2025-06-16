import { useCallback, useMemo, useRef, useState } from 'react'

import type { Results } from '@mediapipe/holistic'
import type { MotionDetectProps, MotionDetectStage } from './motion-detect.type'
import { calculateAngle } from './motion-detect.utils'
import { HoldProgressBar } from './sub-components/hold-progress.component'
import { JointsAnglesProgressBar } from './sub-components/joints-angles-progress.component'
import { VideoCanvas } from './sub-components/video-canvas.component'

export const MotionDetect = (props: MotionDetectProps) => {
  const INCREMENT_TIMER = 100
  const intervalHandler = useRef<NodeJS.Timeout>(null)

  const memoizedExercise = useMemo(() => props.exercise, [props.exercise])
  const memoizedOptions = useMemo(() => props.options, [props.options])

  const [counter, setCounter] = useState<number>(0)
  const [stage, setStage] = useState<MotionDetectStage>()
  const stageRef = useRef<MotionDetectStage | undefined>(null)
  const [angles, setAngles] = useState<Record<string, number>>({})
  const [progress, setProgress] = useState<{ hold: number; max: number }>({
    hold: 0,
    max: 0
  })

  function stopIntervalHandler() {
    setProgress({ hold: 0, max: 0 })

    if (intervalHandler.current) {
      clearInterval(intervalHandler.current)
    }
  }

  function setIntervalHandler(item: MotionDetectStage | undefined) {
    stopIntervalHandler()

    if (item?.hold) {
      setProgress({ hold: 0, max: item.hold })
      intervalHandler.current = setInterval(() => {
        setProgress((prev) => {
          const nextHold = prev.hold + INCREMENT_TIMER
          if (nextHold >= prev.max) {
            stopIntervalHandler()
            return prev
          }
          return { ...prev, hold: nextHold }
        })
      }, INCREMENT_TIMER)
    }
  }

  const onChangeStage = useCallback((item: MotionDetectStage | undefined) => {
    if (item) {
      setStage(item)
      setIntervalHandler(item)
      stageRef.current = item
    }
  }, [])

  const onCycle = useCallback(() => {
    setCounter((prev) => prev + 1)
  }, [])

  const onChangeAngles = useCallback((results: Results) => {
    const currentStage = stageRef.current
    if (!currentStage) return

    currentStage.joints.forEach((element) => {
      const point1 = results.poseLandmarks[element.points[0]]
      const point2 = results.poseLandmarks[element.points[1]]
      const point3 = results.poseLandmarks[element.points[2]]

      const configJoint = props.exercise.configJoints.find((f) => f.label == element.label)
      if (configJoint) {
        let angle = calculateAngle(point1, point2, point3)
        if (configJoint.clockwise) {
          angle = 360 - angle
        }

        setAngles((prev) => {
          const obj = { ...prev }
          obj[element.label] = angle

          return obj
        })
      }
    })
  }, [])

  return (
    <>
      <div className="bg-gray-100 z-20 w-16 h-24 flex justify-center items-center rounded-md absolute left-3 top-3 text-2xl font-bold">
        {counter}
      </div>

      {stage && (
        <div className="absolute bottom-5 z-20 p-5 text-white">
          {stage.joints.map((f) => (
            <JointsAnglesProgressBar
              key={f.label}
              label={f.label}
              min={f.min}
              max={f.max}
              angle={angles[f.label] || 0}></JointsAnglesProgressBar>
          ))}
        </div>
      )}

      <HoldProgressBar
        hold={progress.hold}
        max={progress.max}></HoldProgressBar>

      <VideoCanvas
        options={memoizedOptions}
        exercise={memoizedExercise}
        onChangeStage={onChangeStage}
        onChangeAngles={onChangeAngles}
        onCycle={onCycle}></VideoCanvas>
    </>
  )
}
