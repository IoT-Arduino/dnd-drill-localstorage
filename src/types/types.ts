export type Id = string | number

export type Column = {
  id: 'drill' | 'stock'
  title: string
}

export type Drill = {
  id: Id
  columnId: Id
  content: string
}
