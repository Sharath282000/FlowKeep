'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/client/Navbar"

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
  CheckCircle2,
  PauseCircle,
  AlertTriangle,
  Timer,
  RotateCcw,
  BarChart2,
  Cpu,
  Cloud,
} from "lucide-react"

const sections = [
  { id: "overview", title: "Overview", icon: Compass },
  { id: "getting-started", title: "Getting Started", icon: Rocket },
  { id: "features", title: "Key Features", icon: Puzzle },
  { id: "benefits", title: "Why You’ll Love FlowKeep", icon: Lightbulb },
  { id: "lyfn", title: "LyFn Integration", icon: Cpu },
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
              <strong>FlowKeep</strong> is your personal productivity dashboard — a calm, minimal, and intelligent
              space to manage projects, track progress, and keep your workflow simple.
            </p>
            <p className="text-muted-foreground">
              Built as a <strong>Progressive Web App (PWA)</strong>, FlowKeep works offline, syncs instantly when you reconnect,
              and can be installed on your desktop or mobile — giving you the feel of a native app anywhere.
            </p>
            <p className="text-muted-foreground">
              FlowKeep is evolving into an ecosystem that connects with <strong>LyFn</strong> — an AI-powered personal
              companion that understands your goals, patterns, and habits to make your digital workspace smarter.
            </p>
          </motion.section>

          {/* Getting Started */}
          <section id="getting-started" className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary" /> Getting Started
            </h2>
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <p><strong>1. Sign In:</strong> Click “Sign in with Google” to enter your private workspace.</p>
                <p><strong>2. Create a Project:</strong> Add a name and description.</p>
                <p><strong>3. Manage Projects:</strong> Edit or delete any project anytime to keep things tidy.</p>
                <p><strong>4. View a Project:</strong> Dive into project view to see all its related tasks.</p>
                <p><strong>5. Add Tasks:</strong> Create tasks with titles, priorities, and due dates.</p>

                <p><strong>6. Task Flow:</strong> Every task moves automatically through smart stages:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2"><ListTodo size={16} /> <strong>New:</strong> Freshly created tasks.</li>
                  <li className="flex items-center gap-2"><Timer size={16} /> <strong>Pending:</strong> Due today.</li>
                  <li className="flex items-center gap-2"><AlertTriangle size={16} /> <strong>Backlog:</strong> Overdue tasks.</li>
                  <li className="flex items-center gap-2"><Settings size={16} /> <strong>In Progress:</strong> Actively being worked on.</li>
                  <li className="flex items-center gap-2"><PauseCircle size={16} /> <strong>On Hold:</strong> Temporarily paused.</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} /> <strong>Completed:</strong> Finished and archived.</li>
                </ul>

                <p>
                  FlowKeep automatically moves tasks to <strong>Pending</strong> when they are due today, and to <strong>Backlog</strong> if they are overdue.
                  All other task stages are managed manually, so you stay in control while still benefiting from smart automation.
                </p>

                <p><strong>7. Edit or Delete Tasks:</strong> Open any task to update or remove it if no longer needed.</p>
                <p><strong>8. Export Tasks:</strong> Download all tasks of a project as a CSV file for offline review or reporting.</p>
              </CardContent>
            </Card>
          </section>

          {/* Features */}
          <section id="features" className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Puzzle className="w-6 h-6 text-primary" /> Key Features
            </h2>
            <ul className="space-y-2">
              <li className="flex gap-2"><FolderKanban size={16} /> <strong>Project Boards:</strong> Manage all your projects effortlessly.</li>
              <li className="flex gap-2"><RotateCcw size={16} /> <strong>Automatic Task Flow:</strong> Tasks move automatically based on due dates.</li>
              <li className="flex gap-2"><BarChart2 size={16} /><strong>Analytics:</strong> Get quick insights into your task distribution and progress.</li>
              <li className="flex gap-2"><Filter size={16} /> <strong>Smart Filters:</strong> Sort tasks by priority, date, or status.</li>
              <li className="flex gap-2"><Bell size={16} /> <strong>Timely Notifications:</strong> Stay reminded of what’s due.</li>
              <li className="flex gap-2"><ShieldCheck size={16} /> <strong>Private Workspace:</strong> 100% private and secure.</li>
              <li className="flex gap-2"><Rocket size={16} /> <strong>Installable App:</strong> Add FlowKeep directly to your home screen or desktop.</li>
              <li className="flex gap-2"><FolderKanban size={16} /> <strong>Export Tasks:</strong> Download all project tasks as a CSV file for offline use or reporting.</li>
            </ul>
          </section>

          {/* Benefits */}
          <section id="benefits" className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" /> Why You’ll Love FlowKeep
            </h2>
            <ul className="space-y-2">
              <li><strong>Effortless Organization:</strong> Always know what’s new, due, or done.</li>
              <li><strong>Smart Analytics:</strong> Understand your workload instantly.</li>
              <li><strong>Automatic Updates:</strong> Let FlowKeep handle due dates and overdue tasks.</li>
              <li><strong>Peaceful UI:</strong> Minimal design to keep your mind clear.</li>
              <li><strong>Cross-Device Ready:</strong> Fully responsive on phone, tablet, and desktop.</li>
            </ul>
          </section>

          {/* Lyfn Integration */}
          <section id="lyfn" className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Cpu className="w-6 h-6 text-primary" /> LyFn Integration
            </h2>
            <p className="text-muted-foreground">
              <strong>LyFn</strong> is an upcoming AI-powered productivity system that will integrate deeply with FlowKeep.
              It’s designed to act as your personal digital companion — learning from your patterns, helping you focus,
              and guiding your workflow intelligently.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Understands your habits and task patterns</li>
              <li>Offers intelligent recommendations and reminders</li>
              <li>Assists in reflection, focus, and personal growth</li>
              <li>Will connect across your tools — FlowKeep, Notes, Journal, and Calendar</li>
            </ul>
            <p className="text-muted-foreground">
              In short, <strong>Lyfn</strong> turns FlowKeep from a productivity app into an intelligent ecosystem that grows with you.
            </p>
          </section>

          {/* Roadmap */}
          <section id="roadmap" className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <CalendarClock className="w-6 h-6 text-primary" /> What’s Coming Next
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-lg">✅ Current</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Progressive Web App</li>
                  <li>Task analytics dashboard</li>
                  <li>Automatic task flow system</li>
                  <li>Project creation, editing, and deletion</li>
                  <li>CSV export of project tasks</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-lg">🔜 Next</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Smart reminders & notifications</li>
                  <li>Customizable themes</li>
                  <li>Enhanced task sorting and search</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-lg">🔮 Future</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>LyFn AI integration</li>
                  <li>Team collaboration and shared projects</li>
                  <li>Voice-assisted productivity</li>
                </ul>
              </div>
            </div>
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
              FlowKeep is more than a task app — it’s your personal space for focus and flow.
              It helps you stay balanced, organized, and clear.
            </p>
            <p className="text-muted-foreground font-semibold">
              Stay organized. Stay focused. Keep your flow. ✨
            </p>
          </motion.section>

        </main>
      </div>
    </div>
  )
}
