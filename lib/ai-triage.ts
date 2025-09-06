import type { Ticket, Agent, TriageResult, Priority } from "./types"

// Mock AI triage logic - in a real app, this would call an AI service
export const performAITriage = async (ticket: Ticket, agents: Agent[]): Promise<TriageResult> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { title, description } = ticket
  const content = `${title} ${description}`.toLowerCase()

  // Priority determination logic
  let priority: Priority = "P2"
  let priorityReason = ""

  if (
    content.includes("urgent") ||
    content.includes("critical") ||
    content.includes("down") ||
    content.includes("outage")
  ) {
    priority = "P0"
    priorityReason = "Contains urgent keywords indicating critical system issues"
  } else if (
    content.includes("billing") ||
    content.includes("payment") ||
    content.includes("refund") ||
    content.includes("charge")
  ) {
    priority = "P1"
    priorityReason = "Financial/billing issues require prompt attention"
  } else if (
    content.includes("bug") ||
    content.includes("error") ||
    content.includes("broken") ||
    content.includes("not working")
  ) {
    priority = "P1"
    priorityReason = "Technical issues affecting user experience"
  } else if (content.includes("question") || content.includes("how to") || content.includes("help")) {
    priority = "P3"
    priorityReason = "General inquiry or support question"
  } else {
    priorityReason = "Standard support request requiring normal response time"
  }

  // Agent assignment logic
  let bestAgent = agents[0]
  let assignmentReason = "Default assignment to available agent"

  // Find agent with relevant skills and lowest workload
  const relevantAgents = agents.filter((agent) => {
    return agent.skills.some((skill) => content.includes(skill))
  })

  if (relevantAgents.length > 0) {
    bestAgent = relevantAgents.reduce((prev, current) => (prev.workload < current.workload ? prev : current))
    const matchedSkills = bestAgent.skills.filter((skill) => content.includes(skill))
    assignmentReason = `Best match based on skills: ${matchedSkills.join(", ")} and current workload (${bestAgent.workload} tickets)`
  } else {
    bestAgent = agents.reduce((prev, current) => (prev.workload < current.workload ? prev : current))
    assignmentReason = `Assigned to agent with lowest workload (${bestAgent.workload} tickets)`
  }

  // Generate AI response
  let aiResponse = ""
  if (content.includes("billing") || content.includes("payment")) {
    aiResponse =
      "Thank you for contacting us about your billing inquiry. I understand your concern and I'm here to help resolve this quickly. Let me review your account details and get back to you with a solution within the next few hours."
  } else if (content.includes("technical") || content.includes("bug") || content.includes("error")) {
    aiResponse =
      "I appreciate you reporting this technical issue. Our team takes these matters seriously and I'll investigate this right away. I'll provide you with an update and potential workaround within 24 hours."
  } else if (content.includes("urgent") || content.includes("critical")) {
    aiResponse =
      "I understand this is urgent and I'm prioritizing your request immediately. Our team is investigating and I'll provide you with a status update within the next hour. Thank you for your patience."
  } else {
    aiResponse =
      "Thank you for reaching out to our support team. I've received your request and I'm looking into this for you. I'll get back to you with a helpful response within 1-2 business days."
  }

  return {
    priority,
    priorityReason,
    suggestedAssignee: bestAgent.name,
    assignmentReason,
    aiResponse,
  }
}
