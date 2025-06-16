import type { MotionDetectProps } from '@/lib/motion-detect/motion-detect.type'
import { openDB } from 'idb'
import _ from 'lodash'
import { v4 } from 'uuid'

const DB_NAME = 'exercise-db'
const STORE_NAME = 'exercises'
const DB_VERSION = 1

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' })
    }
  }
})

export async function saveExercise(exercise: MotionDetectProps['exercise']): Promise<void> {
  const item = _(exercise).cloneDeep()
  if (!item.id) {
    item.id = v4()
  }
  const db = await dbPromise
  await db.put(STORE_NAME, item)
}

export async function getAllExercises(): Promise<MotionDetectProps['exercise'][]> {
  const db = await dbPromise
  return await db.getAll(STORE_NAME)
}

export async function getExerciseByKey(
  id: string
): Promise<MotionDetectProps['exercise'] | undefined> {
  const db = await dbPromise
  return await db.get(STORE_NAME, id)
}

export async function deleteExercise(id: string): Promise<void> {
  const db = await dbPromise
  await db.delete(STORE_NAME, id)
}
