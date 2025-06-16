import type { MotionDetectProps } from '@/lib/motion-detect/motion-detect.type'
import { v4 } from 'uuid'

export const EXERCISE_1: MotionDetectProps['exercise'] = {
  id: v4(),
  configJoints: [
    { label: 'Right shoulder', showArc: true, clockwise: false, points: [14, 12, 24] },
    { label: 'Left shoulder', showArc: true, clockwise: true, points: [13, 11, 23] }
  ],
  name: 'exercise 1',
  description: 'this is a test',
  stages: [
    {
      id: v4(),
      name: 'stage1',
      order: 1,
      allowGap: 500,
      hold: 0,
      joints: [
        {
          label: 'Right shoulder',
          points: [14, 12, 24],
          min: 0,
          max: 40
        },
        {
          label: 'Left shoulder',
          points: [13, 11, 23],
          min: 0,
          max: 40
        }
      ]
    },
    {
      id: v4(),
      name: 'stage2',
      order: 2,
      allowGap: 500,
      hold: 1000,
      joints: [
        {
          label: 'Right shoulder',
          points: [14, 12, 24],
          min: 70,
          max: 110
        },
        {
          label: 'Left shoulder',
          points: [13, 11, 23],
          min: 70,
          max: 110
        }
      ]
    },
    {
      id: v4(),
      name: 'stage3',
      order: 3,
      allowGap: 500,
      hold: 2000,
      joints: [
        {
          label: 'Right shoulder',
          points: [14, 12, 24],
          min: 140,
          max: 200
        },
        {
          label: 'Left shoulder',
          points: [13, 11, 23],
          min: 140,
          max: 200
        }
      ]
    }
  ]
}
