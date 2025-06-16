import { v4 } from 'uuid'
import { onCycleDetector } from '../hooks/motion-detect-cycle.hooks'
import { useHolistic } from '../hooks/motion-detect-draw.hooks'
import { useStageTracker } from '../hooks/motion-detect-stage.hooks'

import _ from 'lodash'
import React, { useEffect, useRef } from 'react'

import type {
  MotionDetectProps,
  MotionDetectStage,
  Timeline,
  TimelineItem
} from '../motion-detect.type'

export const VideoCanvas = React.memo((props: MotionDetectProps) => {
  const id = useRef(v4()).current

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const timelineLogRef = useRef<Timeline>([])
  const startIndexTimelineForCycle = useRef<number>(0)
  const waitingStage = useRef<TimelineItem>(null)

  const pattern = _(props.exercise.stages)
    .orderBy((f) => f.order, 'asc')
    .value()

  const trackStage = useStageTracker({
    exercise: props.exercise,
    onStageChange: (stage: MotionDetectStage | undefined) => {
      props.onChangeStage(stage)

      const from = Date.now()
      timelineLogRef.current.push({ stage, from })

      const res = onCycleDetector({
        pattern,
        timelineLogRef,
        startIndexTimelineForCycle,
        waitingStage
      })
      if (res) {
        props.onCycle()
        // counter.current++
        // counterRef.current!.innerHTML = counter.current.toString()
      } else {
        // console.log(waitingStage.current?.stage?.name, waitingStage.current?.meta)
      }

      // props.onChangeStage(stage, stage!)
    }
  })

  useEffect(() => {
    const joints = props.exercise.configJoints.length
    const error = props.exercise.stages.find((f) => f.joints.length != joints)
    if (error) {
      throw new Error(
        `The number of joints defined in "${error.name}" does not match the number of joints configured for the exercise (exercise.configJoints).`
      )
    }

    if (!props.exercise.stages?.length) {
      throw new Error(`You currently have no stages defined for your exercise.`)
    }
  }, [])

  useHolistic({
    arcs: props.exercise.configJoints,
    options: props.options,
    videoRef,
    canvasRef,
    onResults: (results, _ctx) => {
      props.onChangeAngles(results)
      trackStage(results)
    }
  })

  return (
    <>
      <video
        ref={videoRef}
        width={props.options?.video?.width || 800}
        autoPlay={true}
        playsInline
        className="absolute z-0 w-full h-full opacity-0"
        id={'video-' + id}></video>
      <canvas
        ref={canvasRef}
        width={props.options?.video?.width || 800}
        className="absolute z-10 w-full h-full"
        id={'canvas-' + id}></canvas>
    </>
  )
})
