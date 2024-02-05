import { useEffect, useState } from 'react'
import { Storage } from '@ionic/storage'
import { v4 as uuidv4 } from 'uuid'

import { Id, Drill, TodaysDrill } from './../types/types'
import { SAVE_DRILLS_LENGTH } from '../consts/const'

const DRILL_KEY = 'my-drills'
const HISTORY_KEY = 'my-history'

export function useStorage() {
  const [store, setStore] = useState<Storage>()
  const [drills, setDrills] = useState<Drill[]>([])
  const [drillHistory, setDrillHistory] = useState<TodaysDrill[]>([])
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false)

  useEffect(() => {
    const initStorage = async () => {
      const newStore = new Storage({
        name: 'dnd-drill-db'
      })
      const store = await newStore.create()
      setStore(store)

      // drill store
      const storedDrills = (await store.get(DRILL_KEY)) || []
      setDrills(storedDrills)
      // history store
      const historyStore = (await store.get(HISTORY_KEY)) || []
      setDrillHistory(historyStore)
      // await store.set(HISTORY_KEY, history)
    }

    initStorage()
  }, [])

  const createDrillOnStorage = async (columnId: Id, drillContent: string) => {
    const uniqueId = uuidv4()
    const newDrill: Drill = {
      id: uniqueId,
      columnId,
      content: `Drill ${drills.length + 1} ${drillContent}`, // 仮置き
      status: false
    }
    setDrills([...drills, newDrill])
    return store?.set(DRILL_KEY, [...drills, newDrill])
  }

  const deleteDrillOnStorage = async (id: Id) => {
    const newDrills = drills.filter((drill) => drill.id !== id)
    setDrills(newDrills)
    return store?.set(DRILL_KEY, newDrills)
  }

  const updateDrillOnStorage = async (id: Id, content: string) => {
    const newDrills = drills.map((drill) => {
      if (drill.id !== id) return drill
      return { ...drill, content }
    })

    setDrills(newDrills)
    return store?.set(DRILL_KEY, newDrills)
  }

  const updateDrillColumnIdOnStorage = (id: Id, columnId: string) => {
    const newDrills = drills.map((drill) => {
      if (drill.id !== id) return drill
      return { ...drill, columnId }
    })
    setDrills(newDrills)
    return store?.set(DRILL_KEY, newDrills)
  }

  const updateDrillStatusOnStorage = async (id: Id, status: boolean) => {
    const newDrills = drills.map((drill) => {
      if (drill.id !== id) return drill
      return { ...drill, status }
    })
    const isAnyDrillActive = newDrills.some((drill) => drill.status)
    setSubmitButtonEnabled(isAnyDrillActive)
    setDrills(newDrills)
    return store?.set(DRILL_KEY, newDrills)
  }

  const moveDrillsOnSubmit = async () => {
    const newDrills = drills.map((drill) => {
      if (drill.columnId === 'drill') {
        drill.columnId = 'stock'
        drill.status = false
      }
      return drill
    })
    setDrills(newDrills)
    return store?.set(DRILL_KEY, newDrills)
  }

  const saveTodaysDrill = (drill: TodaysDrill) => {
    const newDrillHistory = [drill, ...drillHistory]
    if (newDrillHistory.length > SAVE_DRILLS_LENGTH) {
      newDrillHistory.pop()
    }
    return store?.set(HISTORY_KEY, newDrillHistory)
  }

  return {
    drills,
    createDrillOnStorage,
    deleteDrillOnStorage,
    updateDrillOnStorage,
    updateDrillColumnIdOnStorage,
    updateDrillStatusOnStorage,
    moveDrillsOnSubmit,
    submitButtonEnabled,
    setSubmitButtonEnabled,
    saveTodaysDrill
  }
}
