import type { MotionDetectProps } from '@/lib/motion-detect/motion-detect.type'
import to from 'await-to-js'
import { useEffect, useState } from 'react'
import { deleteExercise, getAllExercises, saveExercise } from '../services/index-db.service'

export function useMotions() {
  const [data, setData] = useState<MotionDetectProps['exercise'][]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function load() {
    setError(null)
    setLoading(true)
    const [err, res] = await to(getAllExercises())
    setLoading(false)

    if (err) {
      setError(err)
    } else {
      setData(res)
    }
  }

  async function save(item: MotionDetectProps['exercise']) {
    setError(null)
    const [err] = await to(saveExercise(item))
    if (err) {
      setError(err)
    } else {
      await load()
    }
  }

  async function remove(id: string) {
    setError(null)
    const [err] = await to(deleteExercise(id))
    if (err) {
      setError(err)
    } else {
      await load()
    }
  }

  useEffect(() => {
    load()
  }, [])

  return {
    data,
    loading,
    error,
    load,
    save,
    remove
  }
}
