export interface CoreIncomingMessage {
  type: string,
  data?: {
    port?: number
  }
}

export interface GuiIncomingMessage<T> {
  type: string,
  namespace: string
  event_name?: string
  position?: number
  data?: T
}

export interface SessionInsertListData {
  skill_id: string
}

export interface GuiInsertListData {
  url: string
}

export interface EventsTriggeredData {
  number: number
}
