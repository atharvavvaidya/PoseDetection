import { Camera } from '@mediapipe/camera_utils'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { HAND_CONNECTIONS, Holistic, POSE_CONNECTIONS, type Results } from '@mediapipe/holistic'
import { useEffect } from 'react'
import { ModelComplexity, type MotionDetectArc, type UseHolisticProps } from '../motion-detect.type'
import { calculateAngle } from '../motion-detect.utils'

export const useHolistic = ({
  arcs,
  options,
  videoRef,
  canvasRef,
  onResults
}: UseHolisticProps) => {
  let ctx: CanvasRenderingContext2D

  const defaultConnectorStyle = {
    color: '#0D99FF',
    lineWidth: 3
  }
  const defaultLandmarkStyle = {
    color: '#FF0',
    lineWidth: 1,
    radius: 6
  }

  const drawBody = (data: Results['poseLandmarks']) => {
    drawConnectors(ctx!, data, POSE_CONNECTIONS, options?.connector?.style || defaultConnectorStyle)
    drawLandmarks(ctx!, data, options?.landmark?.style || defaultLandmarkStyle)
  }

  const drawFace = (data: Results['faceLandmarks']) => {
    if (options.landmark?.faceLandmarks) {
      drawLandmarks(ctx!, data, options.landmark?.style || defaultLandmarkStyle)
    }
  }

  const drawLeftHand = (data: Results['leftHandLandmarks']) => {
    if (options.landmark?.leftHandLandmarks) {
      drawLandmarks(ctx!, data, options.landmark?.style || defaultLandmarkStyle)

      drawConnectors(
        ctx!,
        data,
        HAND_CONNECTIONS,
        options.connector?.style || defaultConnectorStyle
      )
    }
  }

  const drawRightHand = (data: Results['rightHandLandmarks']) => {
    if (options.landmark?.rightHandLandmarks) {
      drawLandmarks(ctx!, data, options.landmark?.style || defaultLandmarkStyle)

      drawConnectors(
        ctx!,
        data,
        HAND_CONNECTIONS,
        options.connector?.style || defaultConnectorStyle
      )
    }
  }

  const drawPointNumber = (results: Results) => {
    if (options) {
      ctx!.fillStyle = options.pointNumber?.style?.fillStyle || 'red'
      ctx!.font = options.pointNumber?.style?.font || '14px Arial'

      ctx!.save()
      ctx!.scale(-1, 1)

      const arr = [
        ...(results.poseLandmarks || []),
        ...(options.landmark?.faceLandmarks ? results.faceLandmarks || [] : []),
        ...(options.landmark?.leftHandLandmarks ? results.leftHandLandmarks || [] : []),
        ...(options.landmark?.rightHandLandmarks ? results.rightHandLandmarks || [] : [])
      ]
      for (let i = 0; i < arr.length; i++) {
        const point = arr[i]

        const x = point.x * canvasRef.current!.width
        const y = point.y * canvasRef.current!.height

        ctx!.fillText(i.toString(), -1 * x + 5, y - 5)
      }
    }
  }

  const drawArc = (arc: MotionDetectArc, data: Results['poseLandmarks']) => {
    const point0 = data[arc.points[0]]
    const point1 = data[arc.points[1]]
    const point2 = data[arc.points[2]]

    let angle = calculateAngle(point0, point1, point2)
    if (arc.clockwise) {
      angle = 360 - angle
    }

    ctx!.beginPath()
    const startAngle = Math.atan2(point0.y - point1.y, point0.x - point1.x)
    const endAngle = Math.atan2(point2.y - point1.y, point2.x - point1.x)

    ctx!.font = '20px Courier New'
    ctx!.fillStyle = '#fff'
    ctx!.textAlign = 'center'
    ctx!.save()
    ctx!.scale(-1, 1)
    ctx!.fillText(
      angle.toFixed(2),
      -1 * point1.x * canvasRef.current!.width,
      point1.y * canvasRef.current!.height + 10
    )
    ctx!.scale(1, 1)
    ctx!.restore()

    ctx!.arc(
      point1.x * canvasRef.current!.width,
      point1.y * canvasRef.current!.height,
      40,
      endAngle,
      startAngle,
      arc.clockwise
    )

    ctx!.strokeStyle = '#fff'
    ctx!.lineWidth = 5
    ctx!.stroke()
  }

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.clientWidth
    canvas.height = video.clientHeight + 200

    ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const holistic = new Holistic({
      locateFile: (file) => `/holistic/${file}`
    })

    const camera = new Camera(video, {
      ...options.video,
      onFrame: () => holistic.send({ image: video })
    })

    holistic.setOptions({
      modelComplexity: options.model?.modelComplexity || ModelComplexity.HIGH_PERFORMANCE,
      smoothLandmarks: options.model?.smoothLandmarks || false,
      enableSegmentation: options.model?.enableSegmentation || false,
      refineFaceLandmarks: options.model?.refineFaceLandmarks || false
    })

    holistic.onResults((results: Results) => {
      if (ctx && results.poseLandmarks) {
        ctx.save()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)

        const showArcs = arcs.filter((f) => f.showArc)
        for (let i = 0; i < showArcs.length; i++) {
          drawArc(showArcs[i], results.poseLandmarks)
        }

        drawBody(results.poseLandmarks)
        drawFace(results.faceLandmarks)
        drawLeftHand(results.leftHandLandmarks)
        drawRightHand(results.rightHandLandmarks)
        drawPointNumber(results)

        onResults?.(results, ctx)

        ctx.restore()
      }
    })

    ctx!.translate(canvasRef.current.width, 0)
    ctx!.scale(-1, 1)
    camera.start()

    return () => {
      camera.stop()
      holistic.close()
    }
  }, [videoRef, canvasRef, , onResults])
}
