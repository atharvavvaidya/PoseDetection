import { ModelComplexity, type MotionDetectProps } from '@/lib/motion-detect/motion-detect.type'

export const MOTION_OPTION: MotionDetectProps['options'] = {
  connector: {
    style: {
      color: 'red',
      lineWidth: 1,
      radius: 2
    }
  },
  landmark: {
    faceLandmarks: false,
    leftHandLandmarks: true,
    rightHandLandmarks: true,
    style: {
      color: 'green',
      lineWidth: 2
    }
  },
  model: {
    modelComplexity: ModelComplexity.HIGH_PERFORMANCE,
    enableSegmentation: false,
    refineFaceLandmarks: false,
    smoothLandmarks: false
  },
  pointNumber: {
    style: {
      fillStyle: 'yellow',
      font: '14px Arial'
    }
  },
  video: {
    facingMode: 'user',
    height: 1980,
    width: 1024
  }
}
