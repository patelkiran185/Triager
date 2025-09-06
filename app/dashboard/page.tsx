"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  BarChart3,
  TrendingUp,
} from "lucide-react"
import { getTickets, addTicket, updateTicket, getAgents } from "@/lib/storage"
import { performAITriage } from "@/lib/ai-triage"
import type { Ticket, TicketStatus } from "@/lib/types"

const priorityColors = {
  P0: "bg-red-100 text-red-800 border-red-200",
  P1: "bg-orange-100 text-orange-800 border-orange-200",
  P2: "bg-yellow-100 text-yellow-800 border-yellow-200",
  P3: "bg-green-100 text-green-800 border-green-200",
}

const statusColors = {
  open: "bg-blue-100 text-blue-800 border-blue-200",
  "in-progress": "bg-purple-100 text-purple-800 border-purple-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
  closed: "bg-gray-100 text-gray-800 border-gray-200",
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isTriaging, setIsTriaging] = useState<string | null>(null)

  // Form state for new ticket
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    customerName: "",
    customerEmail: "",
  })

  useEffect(() => {
    const loadedTickets = getTickets()
    setTickets(loadedTickets)
    setFilteredTickets(loadedTickets)
  }, [])

  useEffect(() => {
    let filtered = tickets

    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.priority === priorityFilter)
    }

    setFilteredTickets(filtered)
  }, [tickets, searchTerm, statusFilter, priorityFilter])

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    p0: tickets.filter((t) => t.priority === "P0").length,
    p1: tickets.filter((t) => t.priority === "P1").length,
  }

  const handleCreateTicket = async () => {
    if (!newTicket.title || !newTicket.description || !newTicket.customerEmail) return

    const ticket = addTicket({
      ...newTicket,
      status: "open" as TicketStatus,
    })

    setTickets([ticket, ...tickets])
    setNewTicket({ title: "", description: "", customerName: "", customerEmail: "" })
    setIsCreateDialogOpen(false)
  }

  const handleTriageTicket = async (ticketId: string) => {
    setIsTriaging(ticketId)
    const ticket = tickets.find((t) => t.id === ticketId)
    if (!ticket) return

    try {
      const agents = getAgents()
      const triageResult = await performAITriage(ticket, agents)

      const updatedTicket = updateTicket(ticketId, {
        priority: triageResult.priority,
        priorityReason: triageResult.priorityReason,
        suggestedAssignee: triageResult.suggestedAssignee,
        assignmentReason: triageResult.assignmentReason,
        aiResponse: triageResult.aiResponse,
      })

      if (updatedTicket) {
        setTickets(tickets.map((t) => (t.id === ticketId ? updatedTicket : t)))
      }
    } catch (error) {
      console.error("Triage failed:", error)
    } finally {
      setIsTriaging(null)
    }
  }

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    const updatedTicket = updateTicket(ticketId, { status: newStatus })
    if (updatedTicket) {
      setTickets(tickets.map((t) => (t.id === ticketId ? updatedTicket : t)))
    }
  }

  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      case "closed":
        return <XCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Support Dashboard</h1>
              <p className="text-slate-600">Manage and triage customer support tickets</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Ticket</DialogTitle>
                  <DialogDescription>Add a new support ticket to the system.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                      placeholder="Brief description of the issue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                      placeholder="Detailed description of the issue"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        value={newTicket.customerName}
                        onChange={(e) => setNewTicket({ ...newTicket, customerName: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerEmail">Customer Email</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={newTicket.customerEmail}
                        onChange={(e) => setNewTicket({ ...newTicket, customerEmail: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTicket} className="bg-blue-600 hover:bg-blue-700">
                      Create Ticket
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time tickets</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.open}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">Being worked on</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.p0 + stats.p1}</div>
              <p className="text-xs text-muted-foreground">P0 & P1 priority</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="P0">P0 - Critical</SelectItem>
              <SelectItem value="P1">P1 - High</SelectItem>
              <SelectItem value="P2">P2 - Medium</SelectItem>
              <SelectItem value="P3">P3 - Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tickets Grid */}
        <div className="grid gap-4">
          {filteredTickets.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No tickets found</h3>
                  <p className="text-slate-600">
                    {tickets.length === 0 ? "Create your first ticket to get started." : "Try adjusting your filters."}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-slate-900 mb-2">{ticket.title}</CardTitle>
                      <CardDescription className="text-slate-600 line-clamp-2">{ticket.description}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      {ticket.priority && (
                        <Badge className={priorityColors[ticket.priority]} variant="outline">
                          {ticket.priority}
                        </Badge>
                      )}
                      <Badge className={statusColors[ticket.status]} variant="outline">
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1 capitalize">{ticket.status.replace("-", " ")}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {ticket.customerName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </div>
                      {ticket.suggestedAssignee && (
                        <div className="text-blue-600">Assigned: {ticket.suggestedAssignee}</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {!ticket.priority && (
                        <Button
                          size="sm"
                          onClick={() => handleTriageTicket(ticket.id)}
                          disabled={isTriaging === ticket.id}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isTriaging === ticket.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Triaging...
                            </>
                          ) : (
                            "AI Triage"
                          )}
                        </Button>
                      )}
                      <Select
                        value={ticket.status}
                        onValueChange={(value) => handleStatusChange(ticket.id, value as TicketStatus)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" onClick={() => setSelectedTicket(ticket)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedTicket.title}</DialogTitle>
              <DialogDescription>Ticket #{selectedTicket.id}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex gap-2">
                {selectedTicket.priority && (
                  <Badge className={priorityColors[selectedTicket.priority]} variant="outline">
                    {selectedTicket.priority}
                  </Badge>
                )}
                <Badge className={statusColors[selectedTicket.status]} variant="outline">
                  {getStatusIcon(selectedTicket.status)}
                  <span className="ml-1 capitalize">{selectedTicket.status.replace("-", " ")}</span>
                </Badge>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-2">Description</h4>
                <p className="text-slate-600 whitespace-pre-wrap">{selectedTicket.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">Customer</h4>
                  <p className="text-slate-600">{selectedTicket.customerName}</p>
                  <p className="text-slate-500 text-sm">{selectedTicket.customerEmail}</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">Created</h4>
                  <p className="text-slate-600">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {selectedTicket.priorityReason && (
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Priority Analysis</h4>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">{selectedTicket.priorityReason}</p>
                </div>
              )}

              {selectedTicket.suggestedAssignee && (
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Suggested Assignment</h4>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-900">{selectedTicket.suggestedAssignee}</p>
                    <p className="text-blue-700 text-sm mt-1">{selectedTicket.assignmentReason}</p>
                  </div>
                </div>
              )}

              {selectedTicket.aiResponse && (
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">AI-Generated Response</h4>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-800">{selectedTicket.aiResponse}</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
