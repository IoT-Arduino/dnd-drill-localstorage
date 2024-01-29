import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { v4 as uuidv4 } from 'uuid'

import styles from './MainBoard.module.scss'
import { Column, Id, Drill } from './../types/types'
import { ColumnContainer } from './ColumnContainer'
import { DrillCard } from './DrillCard'

const PresetColumns: Column[] = [
  {
    id: 'drill',
    title: '明日のドリル'
  },
  {
    id: 'stock',
    title: 'ドリルストック'
  }
]

export const MainBoard = () => {
  const [columns] = useState<Column[]>(PresetColumns)
  const [drills, setDrills] = useState<Drill[]>([])
  const [activeDrill, setActiveDrill] = useState<Drill | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  const createDrill = (columnId: Id) => {
    const uniqueId = uuidv4()
    const newDrill: Drill = {
      id: uniqueId,
      columnId,
      content: `Drill ${drills.length + 1}`,
      status: false
    }
    setDrills([...drills, newDrill])
  }

  const deleteDrill = (id: Id) => {
    const newDrills = drills.filter((drill) => drill.id !== id)
    setDrills(newDrills)
  }

  const updateDrill = (id: Id, content: string) => {
    const newDrills = drills.map((drill) => {
      if (drill.id !== id) return drill
      return { ...drill, content }
    })
    setDrills(newDrills)
  }

  const updateDrillStatus = (id: Id, status: boolean) => {
    const newDrills = drills.map((drill) => {
      if (drill.id !== id) return drill
      return { ...drill, status }
    })
    setDrills(newDrills)
  }

  const submitDrill = () => {
    // チェック済みのドリル項目を送信する
    const drillItems = drills.filter((drill) => drill.columnId === 'drill' && drill.status === true)
    // API 通信、drillItems　送信（モーダルの日付、メモも追加）
    console.log(drillItems)

    // drillコラムの中のdrillアイテムをstockコラムに移動。
    const newDrills = drills.map((drill) => {
      if (drill.columnId === 'drill') {
        drill.columnId = 'stock'
        drill.status = false
      }
      return drill
    })
    setDrills(newDrills)
  }

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'DrillItem') {
      setActiveDrill(event.active.data.current.drill)
      return
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveDrill(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return
    const isActiveADrill = active.data.current?.type === 'DrillItem'
    const isOverADrill = over.data.current?.type === 'DrillItem'

    if (!isActiveADrill) return

    // drillアイテムどうしでの移動
    if (isActiveADrill && isOverADrill) {
      setDrills((drills) => {
        const activeIndex = drills.findIndex((d) => d.id === activeId)
        const overIndex = drills.findIndex((d) => d.id === overId)

        if (drills[activeIndex].columnId != drills[overIndex].columnId) {
          drills[activeIndex].columnId = drills[overIndex].columnId
          return arrayMove(drills, activeIndex, overIndex - 1)
        }
        return arrayMove(drills, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // 別Columnにdrillアイテムを移動
    if (isActiveADrill && isOverAColumn) {
      setDrills((drills) => {
        const activeIndex = drills.findIndex((d) => d.id === activeId)
        drills[activeIndex].columnId = overId
        return arrayMove(drills, activeIndex, activeIndex)
      })
    }
  }

  return (
    <div className={styles['main-wrapper']}>
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <div className={styles['context-wrapper']}>
          <div className={styles['context-wrapper-sortable']}>
            {columns.map((col) => {
              return (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  drills={drills.filter((drill) => drill.columnId === col.id)}
                  createDrill={createDrill}
                  deleteDrill={deleteDrill}
                  updateDrill={updateDrill}
                  updateDrillStatus={updateDrillStatus}
                  submitDrill={submitDrill}
                />
              )
            })}
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeDrill && (
              <DrillCard
                drill={activeDrill}
                deleteDrill={deleteDrill}
                updateDrill={updateDrill}
                updateDrillStatus={updateDrillStatus}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}
