import _ from 'lodash'
import type {
  MotionDetectStage,
  OnCycleDetectorProps,
  Timeline,
  TimelineItem
} from '../motion-detect.type'

export const onCycleDetector = ({
  pattern,
  waitingStage,
  timelineLogRef,
  startIndexTimelineForCycle
}: OnCycleDetectorProps) => {
  let arr: Array<TimelineItem> = _(
    timelineLogRef.current.filter((_f, i) => i >= startIndexTimelineForCycle.current)
  ).cloneDeep()

  // append 'to' in the timeline object for low complexity.
  arr = arr.map((f, i) => ({
    from: f.from,
    to: arr[i + 1]?.from || Date.now(),
    stage: f.stage
  }))

  let removeLength = arr.length
  arr = arr.filter(
    (f, i) => !(!f.stage?.name && f.to! - f.from < (arr[i + 1]?.stage?.allowGap || 500))
  )
  removeLength -= arr.length

  const foundGapIndex = arr.findIndex((f) => !f.stage)

  if (foundGapIndex != -1) {
    startIndexTimelineForCycle.current = timelineLogRef.current.length
    waitingStage.current = { stage: pattern[0], from: Date.now(), meta: 0 }
    return
  }

  const cycle = containsPattern(arr, pattern)
  if (cycle) {
    startIndexTimelineForCycle.current = timelineLogRef.current.length
    return '**********cycle**********'
  }

  return
}

function containsPattern(arr: Timeline, pattern: MotionDetectStage[]) {
  // let nextIndex: number = -1
  for (let i = 0; i <= arr.length - pattern.length; i++) {
    let matchCycle = true
    for (let j = 0; j < pattern.length; j++) {
      if (arr[i + j].stage!.id !== pattern[j].id) {
        // nextIndex = i + j
        matchCycle = false
        break
      } else if (arr[i + j].to! - arr[i + j].from < (arr[i + j].stage?.hold || 0)) {
        // nextIndex = i + j
        matchCycle = false
        break
      }
    }
    if (matchCycle) {
      return true
    }
  }
  return undefined
}
