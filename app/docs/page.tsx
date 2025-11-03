'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/client/Navbar"

// ✅ Lucide Icons
import {
  Compass,
  Rocket,
  Puzzle,
  Lightbulb,
  CalendarClock,
  Coffee,
  FolderKanban,
  Settings,
  ListTodo,
  Filter,
  Bell,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  PauseCircle,
  AlertTriangle,
  Timer,
  RotateCcw,
  Lock,
  BarChart2,
  Brain,
} from "lucide-react"

const sections = [
  { id: "overview", title: "Overview", icon: Compass },
  { id: "getting-started", title: "Getting Started", icon: Rocket },
  { id: "features", title: "Key Features", icon: Puzzle },
  { id: "benefits", title: "Why You’ll Love FlowKeep", icon: Lightbulb },
  { id: "roadmap", title: "What’s Coming Next", icon: CalendarClock },
  { id: "final-note", title: "Final Note", icon: Coffee },
]

export default function DocsPage() {
  const [active, setActive] = useState("overview")

  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setActive(id)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
        {/* Sidebar */}
        <aside className="md:w-64 md:sticky md:top-20 md:h-[calc(100vh-5rem)] border-r md:pr-6 mb-10 md:mb-0">
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Documentation</h2>
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <Button
                  key={section.id}
                  variant={active === section.id ? "default" : "ghost"}
                  onClick={() => handleScroll(section.id)}
                  className="w-full justify-start text-sm sm:text-base font-medium flex items-center gap-2"
                >
                  <Icon size={16} />
                  {section.title}
                </Button>
              )
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-16 md:pl-10 text-sm sm:text-base leading-relaxed">
          {/* Overview */}
          <motion.section
            id="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-2">
              <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              FlowKeep — Your Space to Stay Organized
            </h1>
            <p className="text-muted-foreground">
              Welcome to <strong>FlowKeep</strong> — your personal space to plan, manage, and complete your projects easily. 
              It helps you stay organized, focused, and aware of your priorities — all in a calm and clutter-free workspace.
            </p>
          </motion.section>

          {/* Getting Started */}
          <section id="getting-started" className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary" /> Getting Started
            </h2>
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <p><strong>1. Sign In:</strong> Click “Sign in with Google” to enter your workspace. Everything is private and visible only to you.</p>
                <p><strong>2. Create a Project:</strong> Tap “New Project” and give it a name, short description, and due date.</p>
                <p><strong>3. Edit or Delete a Project:</strong> Update or remove projects anytime to keep your dashboard clean.</p>
                <p><strong>4. View a Project:</strong> Open “View Project” to access and manage all related tasks.</p>
                <p><strong>5. Add a Task:</strong> Click “Add Task,” enter the title, priority, and due date to create one.</p>

                <p><strong>6. Task Flow:</strong> Every task moves through smart stages automatically:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2"><ListTodo size={16}/> <strong>New:</strong> All new tasks start here.</li>
                  <li className="flex items-center gap-2"><Timer size={16}/> <strong>Pending:</strong> Tasks due today move here automatically.</li>
                  <li className="flex items-center gap-2"><AlertTriangle size={16}/> <strong>Backlog:</strong> Tasks past their due date are moved here.</li>
                  <li className="flex items-center gap-2"><Settings size={16}/> <strong>In Progress:</strong> Move tasks here when you start working on them.</li>
                  <li className="flex items-center gap-2"><PauseCircle size={16}/> <strong>On Hold:</strong> For paused tasks.</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16}/> <strong>Completed:</strong> Finished tasks are stored here.</li>
                </ul>

                <p>
                  Once completed, tasks can only be reopened by moving them back to <strong>New</strong>.
                  FlowKeep automatically organizes overdue and due-today tasks — so you stay focused, not busy.
                </p>

                <p><strong>7. Edit or Delete Tasks:</strong> Open any task to update its title, due date, or delete it if no longer needed.</p>
              </CardContent>
            </Card>
          </section>

          {/* Features */}
          <section id="features" className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Puzzle className="w-6 h-6 text-primary" /> Key Features
            </h2>
            <ul className="space-y-2">
              <li className="flex gap-2"><FolderKanban size={16}/> <strong>Project Boards:</strong> Manage all your projects effortlessly.</li>
              <li className="flex gap-2"><RotateCcw size={16}/> <strong>Automatic Task Flow:</strong> Tasks move automatically based on due dates.</li>
              <li className="flex gap-2"><BarChart2 size={36}/><strong>Analytics:</strong> See the total number of high, medium, and low-priority tasks, along with how many are due today or overdue — all at a glance.</li>
              <li className="flex gap-2"><Filter size={16}/> <strong>Smart Filters:</strong> Quickly find tasks by priority, status, or date.</li>
              <li className="flex gap-2"><Bell size={16}/> <strong>Timely Notifications:</strong> Stay reminded about what’s due or pending.</li>
              <li className="flex gap-2"><ShieldCheck size={16}/> <strong>Private Workspace:</strong> Everything stays safe and only accessible by you.</li>
            </ul>
          </section>

          {/* Benefits */}
          <section id="benefits" className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" /> Why You’ll Love FlowKeep
            </h2>
            <ul className="space-y-2">
              <li><strong>Effortless Organization:</strong> You’ll always know what’s new, due, or done.</li>
              <li><strong>Clear Analytics:</strong> Instantly see priority breakdowns and overdue tasks to plan smarter.</li>
              <li><strong>Automatic Updates:</strong> No need to manually sort or track due dates.</li>
              <li><strong>Calm, Focused Design:</strong> Simple and clean layout to help you focus.</li>
              <li><strong>Privacy & Security:</strong> Your workspace belongs to you alone.</li>
              <li><strong>Responsive Everywhere:</strong> Works seamlessly on mobile, tablet, and desktop.</li>
            </ul>
          </section>

          {/* Roadmap */}
          <section id="roadmap" className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <CalendarClock className="w-6 h-6 text-primary" /> What’s Coming Next
            </h2>
            <p className="text-muted-foreground">
              FlowKeep is constantly improving — here’s what’s next:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>✅ Project editing and deletion options</li>
              <li>✅ Task analytics dashboard</li>
              <li>🔜 Smart reminders and insights</li>
              <li>🔜 Shared team projects and collaboration</li>
            </ul>
          </section>

          {/* Final Note */}
          <motion.section
            id="final-note"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-t pt-8 space-y-3"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Coffee className="w-6 h-6 text-primary" /> Final Note
            </h2>
            <p className="text-muted-foreground">
              FlowKeep helps you do more than manage tasks — it helps you stay balanced and productive.
              With automatic organization, analytics, and a distraction-free design, your projects stay in flow.
            </p>
            <p className="text-muted-foreground text-center font-semibold">
              Stay organized. Stay focused. Keep your flow. ✨
            </p>
          </motion.section>
        </main>
      </div>
    </div>
  )
}
