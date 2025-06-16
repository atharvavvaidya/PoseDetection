import _ from 'lodash'
import { useRef } from 'react'
import type { MotionDetectStage, UseCycleProps, UseStageTracker } from '../motion-detect.type'
import { calculateAngle } from '../motion-detect.utils'

export const useStageTracker = ({ exercise, onStageChange }: UseStageTracker) => {
  const lastStageRef = useRef<MotionDetectStage>(undefined)

  const track = (results: UseCycleProps['results']) => {
    const currentStage = stageDetect({ exercise, results })
    if (lastStageRef.current?.id !== currentStage?.id) {
      lastStageRef.current = currentStage
      onStageChange(currentStage)
    }
  }

  return track
}

const stageDetect = ({ exercise, results }: UseCycleProps) => {
  const sortArray = _(exercise.stages)
    .orderBy((f) => f.order, 'asc')
    .value()

  // debugger
  for (let i = 0; i < sortArray.length; i++) {
    const stage = sortArray[i]
    let allow = true

    for (let j = 0; j < stage.joints.length; j++) {
      const config = exercise.configJoints.find(
        (f) =>
          _(f.points)
            .orderBy((f) => f, 'asc')
            .join() ==
          _(stage.joints[j].points)
            .orderBy((f) => f, 'asc')
            .join()
      )
      if (!config) {
        throw new Error(
          `The number of joints defined in "${stage.name}" does not match the number of joints configured for the exercise (exercise.configJoints).`
        )
      }

      const pointA = results.poseLandmarks[stage.joints[j].points[0]]
      const pointB = results.poseLandmarks[stage.joints[j].points[1]]
      const pointC = results.poseLandmarks[stage.joints[j].points[2]]

      let angle = calculateAngle(pointA, pointB, pointC)
      if (config!.clockwise) {
        angle = 360 - angle
      }

      if (stage.joints[j].min > angle || angle > stage.joints[j].max) {
        allow = false
        break
      }
    }

    if (allow) {
      return stage
    }
  }

  return undefined
}
