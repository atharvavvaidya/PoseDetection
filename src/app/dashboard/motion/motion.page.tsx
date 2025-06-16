import {
  type MotionDetectProps,
  type MotionDetectStage
} from '@/lib/motion-detect/motion-detect.type'
import { MotionDetect } from '@lib/motion-detect/motion-detect.component'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DashboardRouterType } from '../_types/router.type'
import { getExerciseByKey } from '../services/index-db.service'
import { MOTION_OPTION } from './motion.constant'

export const MotionDetectPage = () => {
  const navigate = useNavigate()
  const [exercise, setExercise] = useState<MotionDetectProps['exercise']>()
  const options: MotionDetectProps['options'] = MOTION_OPTION
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      getExerciseByKey(id).then((res) => {
        if (res) {
          setExercise(res)
        }
      })
    } else {
      navigate(DashboardRouterType.LIST_OF_MOTIONS)
    }
  }, [])

  function back() {
    navigate(DashboardRouterType.LIST_OF_MOTIONS)
  }

  function log(stage: MotionDetectStage | undefined) {
    console.log('Current: ' + stage?.name)
    // console.log('Next: ' + waitingForStage?.name)
  }
  function cycle() {
    console.log('**********************')
    console.log('Cycle')
    console.log('**********************')
  }

  return (
    <>
      <div className="size-full">
        <button
          onClick={back}
          style={{ zIndex: 60 }}
          className="absolute right-3 top-3 capitalize border rounded-md py-1 px-4 bg-gray-300 hover:bg-gray-400 text-gray-700">
          back
        </button>
        {exercise && (
          <MotionDetect
            exercise={exercise}
            options={options}
            onCycle={() => cycle()}
            onChangeAngles={() => {}}
            onChangeStage={log}></MotionDetect>
        )}
      </div>
    </>
  )
}
