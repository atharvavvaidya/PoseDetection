import type { MotionDetectProps } from '@/lib/motion-detect/motion-detect.type'
import _ from 'lodash'
import { EXERCISE_1 } from '../_constants/exercises/exercise1.constant'

export const initMotion: () => MotionDetectProps['exercise'] = () =>
  _({ id: '', name: '', configJoints: [], description: '', stages: [] }).cloneDeep()

export const sampleMotion: () => MotionDetectProps['exercise'] = () => _(EXERCISE_1).cloneDeep()
