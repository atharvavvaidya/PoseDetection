import type { Results } from '@mediapipe/holistic'
import type React from 'react'

export enum ModelComplexity {
  'HIGH_SPEED' = 0,
  'NORMAL' = 1,
  'HIGH_PERFORMANCE' = 2
}

export interface MotionDetectArc {
  points: [number, number, number]
  clockwise: boolean
  showArc: boolean
  label: string
}

export interface MotionDetectStage {
  id: string
  name: string
  order: number
  allowGap: number
  hold: number
  joints: Array<{
    points: [number, number, number]
    min: number
    max: number
    label: string
    angle?: number
  }>
}

export interface MotionDetectProps {
  exercise: {
    id: string
    name: string
    description: string
    configJoints: Array<MotionDetectArc>
    stages: Array<MotionDetectStage>
  }

  options: {
    video?: {
      width: number
      height: number
      facingMode: 'user' | 'environment'
    }
    model?: {
      modelComplexity?: ModelComplexity
      smoothLandmarks?: boolean
      enableSegmentation?: boolean
      refineFaceLandmarks?: boolean
    }
    landmark?: {
      faceLandmarks: boolean
      leftHandLandmarks: boolean
      rightHandLandmarks: boolean
      style: {
        color: string
        lineWidth: number
      }
    }
    connector?: {
      style: {
        color: string
        lineWidth: number
        radius: number
      }
    }
    pointNumber?: {
      style: {
        font: string
        fillStyle: string
      }
    }
  }

  onCycle: () => void
  onChangeStage: (
    stage: MotionDetectStage | undefined
    // waitingForStage: MotionDetectStage
    // angles: Array<{ points: [number, number, number]; value: number }>
  ) => void
  onChangeAngles: (angles: Results) => void
}

export type UseHolisticProps = {
  arcs: Array<MotionDetectArc>
  options: MotionDetectProps['options']
  videoRef: React.RefObject<HTMLVideoElement | null>
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  onResults?: (results: Results, canvasCtx: CanvasRenderingContext2D) => void
}

export type UseCycleProps = {
  exercise: MotionDetectProps['exercise']
  results: Results
}

export type TimelineItem = {
  to?: number
  from: number
  stage: MotionDetectStage | undefined
  meta?: number
}
export type Timeline = Array<TimelineItem>

export type UseStageTracker = {
  exercise: MotionDetectProps['exercise']
  onStageChange: (stage: MotionDetectStage | undefined) => void
}

export type OnCycleDetectorProps = {
  pattern: MotionDetectStage[]
  timelineLogRef: React.RefObject<Timeline>
  startIndexTimelineForCycle: React.RefObject<number>
  waitingStage: React.RefObject<TimelineItem | null>
}
