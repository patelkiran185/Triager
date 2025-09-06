import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, Clock, Users, Zap, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">TriageAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
              Pricing
            </a>
          </nav>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            AI-Powered Support Automation
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
            Intelligent Ticket Triage for
            <span className="text-blue-600"> Modern Support Teams</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 text-pretty max-w-2xl mx-auto">
            Transform your helpdesk with AI that automatically prioritizes tickets, suggests the best agents, and drafts
            personalized responses in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Try Demo Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">85%</div>
              <div className="text-slate-600">Faster Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">92%</div>
              <div className="text-slate-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">60%</div>
              <div className="text-slate-600">Workload Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything You Need for Smarter Support</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our AI analyzes every ticket to ensure the right priority, agent, and response every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-slate-900">Smart Prioritization</CardTitle>
                <CardDescription>
                  AI automatically assigns P0-P3 priorities based on urgency, impact, and content analysis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-slate-900">Intelligent Assignment</CardTitle>
                <CardDescription>
                  Matches tickets to the best available agent based on skills, workload, and expertise.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-slate-900">AI Response Drafts</CardTitle>
                <CardDescription>
                  Generate personalized, contextual first responses that maintain your brand voice.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-slate-900">Real-time Processing</CardTitle>
                <CardDescription>Instant triage and routing as soon as tickets arrive in your system.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-slate-900">Quality Assurance</CardTitle>
                <CardDescription>
                  Built-in checks ensure accuracy and consistency across all automated decisions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-slate-900">Continuous Learning</CardTitle>
                <CardDescription>
                  AI improves over time by learning from your team's decisions and feedback.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How TriageAI Works</h2>
            <p className="text-xl text-slate-600">Three simple steps to transform your support workflow</p>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Ticket Analysis</h3>
                </div>
                <p className="text-slate-600 text-lg">
                  Our AI analyzes incoming tickets for keywords, sentiment, urgency indicators, and technical complexity
                  to understand the full context.
                </p>
              </div>
              <div className="flex-1 bg-white p-6 rounded-lg border border-slate-200">
                <div className="text-sm text-slate-500 mb-2">Analyzing ticket...</div>
                <div className="text-slate-900 font-medium">"Payment failed, urgent help needed"</div>
                <div className="mt-3 space-y-1">
                  <div className="text-xs text-blue-600">✓ Urgency detected</div>
                  <div className="text-xs text-green-600">✓ Billing category identified</div>
                  <div className="text-xs text-purple-600">✓ Customer sentiment analyzed</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Smart Assignment</h3>
                </div>
                <p className="text-slate-600 text-lg">
                  Based on agent skills, current workload, and ticket requirements, the system suggests the optimal
                  assignment with clear reasoning.
                </p>
              </div>
              <div className="flex-1 bg-white p-6 rounded-lg border border-slate-200">
                <div className="text-sm text-slate-500 mb-2">Recommended assignment:</div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">SC</div>
                  <div>
                    <div className="font-medium text-slate-900">Sarah Chen</div>
                    <div className="text-xs text-slate-500">Billing specialist • 3 active tickets</div>
                  </div>
                </div>
                <div className="text-xs text-slate-600">Best match: billing expertise + low workload</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Response Generation</h3>
                </div>
                <p className="text-slate-600 text-lg">
                  AI crafts a personalized first response that acknowledges the issue, sets expectations, and maintains
                  your brand voice.
                </p>
              </div>
              <div className="flex-1 bg-white p-6 rounded-lg border border-slate-200">
                <div className="text-sm text-slate-500 mb-2">Generated response:</div>
                <div className="text-slate-900 text-sm leading-relaxed">
                  "Thank you for contacting us about your billing inquiry. I understand your concern and I'm here to
                  help resolve this quickly. Let me review your account details..."
                </div>
                <div className="mt-3 text-xs text-green-600">✓ Ready to send</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Support?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of support teams already using TriageAI to deliver faster, more accurate customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TriageAI</span>
            </div>
            <div className="text-sm text-slate-400">
              © 2024 TriageAI. Built with AI for the future of customer support.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
