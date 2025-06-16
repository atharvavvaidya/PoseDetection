import type { MotionDetectProps } from '@/lib/motion-detect/motion-detect.type'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { DashboardRouterType } from '../_types/router.type'
import { initMotion } from './list-of-motions.constant'
import { useMotions } from './list-of-motions.hook'
import type { PageMode } from './list-of-motions.type'

export const ListOfMotionsPage = () => {
  const navigate = useNavigate()

  const [mode, setMode] = useState<PageMode>('Add')
  const [selectedRow, setSelectedRow] = useState<MotionDetectProps['exercise']>(initMotion())
  const { data, save, remove, load, error } = useMotions()

  useEffect(() => {
    load().catch(console.error)
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error?.message || 'error :D')
    }
  }, [error])

  function setConfigJoint(e: React.ChangeEvent<HTMLTextAreaElement>) {
    try {
      const parsed = JSON.parse(e.target.value)
      setSelectedRow((prev) => ({
        ...prev,
        configJoints: parsed
      }))
    } catch (err) {
      console.error('Invalid JSON', err)
    }
  }

  function setStages(e: React.ChangeEvent<HTMLTextAreaElement>) {
    try {
      const parsed = JSON.parse(e.target.value)
      setSelectedRow((prev) => ({
        ...prev,
        stages: parsed
      }))
    } catch (err) {
      console.error('Invalid JSON', err)
    }
  }

  function onEdit(item: MotionDetectProps['exercise']) {
    setMode('Edit')
    setSelectedRow(item)
  }

  function onCancel() {
    setMode('Add')
    setSelectedRow(initMotion())
  }

  function onTest(item: MotionDetectProps['exercise']) {
    navigate(DashboardRouterType.TEST_MOTION.replace(':id', item.id))
  }

  async function upsertMotion() {
    await save(selectedRow)
    onCancel()
  }

  async function onRemove(item: MotionDetectProps['exercise']) {
    const allow = confirm('Are you sure?')
    if (allow) {
      await remove(item.id)
    }
  }

  return (
    <div className="flex flex-col size-full p-5 gap-3">
      <div className="flex flex-col p-5 gap-2 border border-gray-300 rounded-lg text-gray-500">
        <div className="flex flex-1 gap-3 justify-center items-center">
          <p className="capitalize">name :</p>
          <input
            type="text"
            className="flex-1 h-8 border border-gray-300 rounded-md px-2"
            value={selectedRow.name}
            onChange={(e) => {
              setSelectedRow((prev) => ({
                ...prev,
                name: e.target.value
              }))
            }}
          />

          <p className="capitalize">description :</p>
          <input
            type="text"
            className="flex-1 h-8 border border-gray-300 rounded-md px-2"
            value={selectedRow.description}
            onChange={(e) => {
              setSelectedRow((prev) => ({
                ...prev,
                description: e.target.value
              }))
            }}
          />
        </div>

        <p className="capitalize">config joints :</p>
        <textarea
          className="h-24 border border-gray-300 rounded-md px-2"
          value={JSON.stringify(selectedRow.configJoints)}
          onChange={setConfigJoint}></textarea>

        <p className="capitalize">stages :</p>
        <textarea
          className="h-24 border border-gray-300 rounded-md px-2"
          value={JSON.stringify(selectedRow.stages)}
          onChange={setStages}></textarea>
        <div className="flex flex-1 justify-end gap-2">
          {mode == 'Edit' && (
            <button
              onClick={() => onCancel()}
              className="capitalize border rounded-md py-1 px-4 hover:bg-gray-100">
              cancel
            </button>
          )}
          <button
            onClick={upsertMotion}
            className="capitalize border rounded-md py-1 px-4 bg-green-700 hover:bg-green-900 text-white">
            {mode == 'Edit' ? 'update' : 'insert'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-500 capitalize font-mono ">
        <span className="flex-1">id</span>
        <span className="flex-1">name</span>
        <span className="flex-1">description</span>
        <span className="flex-1">operations</span>
      </div>

      {data.map((item, i) => (
        <div
          className="flex"
          key={i}>
          <span className="flex-1">{i + 1}</span>
          <span className="flex-1">{item.name}</span>
          <span className="flex-1">{item.description}</span>
          <div className="flex-1 flex gap-2">
            <button
              onClick={() => onRemove(item)}
              className="capitalize border rounded-md py-1 px-4 bg-red-500 hover:bg-red-600 text-white">
              remove
            </button>
            <button
              onClick={() => onEdit(item)}
              className="capitalize border rounded-md py-1 px-4 bg-blue-500 hover:bg-blue-600 text-white">
              edit
            </button>
            <button
              onClick={() => onTest(item)}
              className="capitalize border rounded-md py-1 px-4 bg-orange-500 hover:bg-orange-600 text-white">
              test
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
