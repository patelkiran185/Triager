import type { Ticket, Agent } from "./types"

const TICKETS_KEY = "helpdesk_tickets"
const AGENTS_KEY = "helpdesk_agents"

// Sample agents data
const defaultAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@company.com",
    skills: ["billing", "payments", "refunds"],
    workload: 3,
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    email: "mike@company.com",
    skills: ["technical", "api", "integration"],
    workload: 5,
  },
  {
    id: "3",
    name: "Emma Thompson",
    email: "emma@company.com",
    skills: ["account", "onboarding", "general"],
    workload: 2,
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@company.com",
    skills: ["security", "compliance", "technical"],
    workload: 4,
  },
]

// Sample tickets data
const sampleTickets: Ticket[] = [
  {
    id: "1",
    title: "Payment failed - urgent help needed",
    description:
      "Hi, I tried to process a payment for my subscription but it keeps failing. I need this resolved ASAP as my service is about to expire. The error message says 'Payment method declined' but my card is valid and has sufficient funds.",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    status: "open",
    priority: "P1",
    priorityReason: "Financial/billing issues require prompt attention",
    suggestedAssignee: "Sarah Chen",
    assignmentReason: "Best match based on skills: billing, payments and current workload (3 tickets)",
    aiResponse:
      "Thank you for contacting us about your billing inquiry. I understand your concern and I'm here to help resolve this quickly. Let me review your account details and get back to you with a solution within the next few hours.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "API integration not working",
    description:
      "Our API integration suddenly stopped working this morning. We're getting 500 errors on all endpoints. This is affecting our production system and we need immediate assistance. Error logs show 'Internal server error' but no specific details.",
    customerName: "Lisa Johnson",
    customerEmail: "lisa@techcorp.com",
    status: "in-progress",
    priority: "P0",
    priorityReason: "Contains urgent keywords indicating critical system issues",
    suggestedAssignee: "Mike Rodriguez",
    assignmentReason: "Best match based on skills: technical, api, integration and current workload (5 tickets)",
    aiResponse:
      "I understand this is urgent and I'm prioritizing your request immediately. Our team is investigating and I'll provide you with a status update within the next hour. Thank you for your patience.",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: "3",
    title: "How to setup two-factor authentication?",
    description:
      "I want to enable two-factor authentication on my account for better security. Can you guide me through the process? I've looked through the documentation but couldn't find clear instructions.",
    customerName: "Robert Wilson",
    customerEmail: "robert.wilson@company.com",
    status: "resolved",
    priority: "P3",
    priorityReason: "General inquiry or support question",
    suggestedAssignee: "Emma Thompson",
    assignmentReason: "Best match based on skills: account, onboarding and current workload (2 tickets)",
    aiResponse:
      "Thank you for reaching out to our support team. I've received your request and I'm looking into this for you. I'll get back to you with a helpful response within 1-2 business days.",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
  {
    id: "4",
    title: "Account locked after multiple login attempts",
    description:
      "My account got locked after I tried to login multiple times with what I thought was the correct password. I need to access my account urgently for an important presentation tomorrow.",
    customerName: "Maria Garcia",
    customerEmail: "maria.garcia@startup.io",
    status: "open",
    priority: "P2",
    priorityReason: "Standard support request requiring normal response time",
    suggestedAssignee: "Emma Thompson",
    assignmentReason: "Best match based on skills: account and current workload (2 tickets)",
    aiResponse:
      "Thank you for reaching out to our support team. I've received your request and I'm looking into this for you. I'll get back to you with a helpful response within 1-2 business days.",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "Refund request for cancelled subscription",
    description:
      "I cancelled my subscription last week but was still charged for this month. I would like to request a refund for the unused portion of my subscription. My subscription ID is SUB-12345.",
    customerName: "David Brown",
    customerEmail: "david.brown@freelancer.com",
    status: "open",
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
  },
]

export const getTickets = (): Ticket[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(TICKETS_KEY)

  if (!stored) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(sampleTickets))
    return sampleTickets.map((ticket) => ({
      ...ticket,
      createdAt: new Date(ticket.createdAt),
      updatedAt: new Date(ticket.updatedAt),
    }))
  }

  const tickets = JSON.parse(stored)
  return tickets.map((ticket: any) => ({
    ...ticket,
    createdAt: new Date(ticket.createdAt),
    updatedAt: new Date(ticket.updatedAt),
  }))
}

export const saveTickets = (tickets: Ticket[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
}

export const getAgents = (): Agent[] => {
  if (typeof window === "undefined") return defaultAgents
  const stored = localStorage.getItem(AGENTS_KEY)
  if (!stored) {
    localStorage.setItem(AGENTS_KEY, JSON.stringify(defaultAgents))
    return defaultAgents
  }
  return JSON.parse(stored)
}

export const saveAgents = (agents: Agent[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(AGENTS_KEY, JSON.stringify(agents))
}

export const addTicket = (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">): Ticket => {
  const tickets = getTickets()
  const newTicket: Ticket = {
    ...ticket,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  tickets.push(newTicket)
  saveTickets(tickets)
  return newTicket
}

export const updateTicket = (id: string, updates: Partial<Ticket>): Ticket | null => {
  const tickets = getTickets()
  const index = tickets.findIndex((t) => t.id === id)

  if (index === -1) return null

  tickets[index] = {
    ...tickets[index],
    ...updates,
    updatedAt: new Date(),
  }

  saveTickets(tickets)
  return tickets[index]
}
