export type Priority = "P0" | "P1" | "P2" | "P3"

export type TicketStatus = "open" | "in-progress" | "resolved" | "closed"

export interface Ticket {
  id: string
  title: string
  description: string
  customerEmail: string
  customerName: string
  status: TicketStatus
  priority?: Priority
  priorityReason?: string
  assignedTo?: string
  suggestedAssignee?: string
  assignmentReason?: string
  aiResponse?: string
  createdAt: Date
  updatedAt: Date
}

export interface Agent {
  id: string
  name: string
  email: string
  skills: string[]
  workload: number // number of active tickets
}

export interface TriageResult {
  priority: Priority
  priorityReason: string
  suggestedAssignee: string
  assignmentReason: string
  aiResponse: string
}
