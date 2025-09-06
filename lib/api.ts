// Fetch only tickets with pending states (open or in-progress)

// lib/api.ts

export type Ticket = {
  ticket_id: number
  ticket_name: string
  title: string
  description: string
  customer_name: string
  customer_email: string
  status?: string
  priority?: string
}

const API_URL = "http://127.0.0.1:8000"


export async function fetchTickets(): Promise<Ticket[]> {
  const res = await fetch(`${API_URL}/tickets/`)
  return res.json()
}

export async function createTicket(ticket: Omit<Ticket, "ticket_id">): Promise<Ticket> {
  const res = await fetch(`${API_URL}/tickets/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  })
  return res.json()
}

export async function updateTicket(ticket_id: number, ticket: Partial<Ticket>): Promise<Ticket> {
  const res = await fetch(`${API_URL}/tickets/${ticket_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  })
  return res.json()
}

export async function deleteTicket(ticket_id: number): Promise<void> {
  await fetch(`${API_URL}/tickets/${ticket_id}`, { method: "DELETE" })
}
export async function fetchPendingTickets(): Promise<Ticket[]> {
  const res = await fetch(`${API_URL}/tickets/?pending=true`)
  return res.json()
}
