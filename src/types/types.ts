export type Id = string | number

export type Column = {
  id: 'drill' | 'stock'
  title: string
}

export type Drill = {
  id: Id
  columnId: Id
  content: string
  status: boolean
}

export type DrillChecked = {
  id: Id
  content: string
}

export type TodaysDrill = {
  date: string
  memo: string
  drillItemsChecked: DrillChecked[]
}
