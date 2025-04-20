"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download, X, CheckCircle, XCircle, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { WorkflowJob } from "@/lib/types"
import { getJobLogs } from "@/actions/fetch-job-logs"
import { LogRenderer } from "@/components/log-renderer"
type JobLogsModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  job: WorkflowJob
  repoName: string
}

export function JobLogsModal({ open, onOpenChange, job, repoName }: JobLogsModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [logs, setLogs] = useState<string[]>([])
  const [filteredLogs, setFilteredLogs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Simulate API call to fetch logs
  useEffect(() => {
    if (open) {
      setLoading(true)
      getJobLogs(repoName, job.id).then((logs) => {
        setLogs(logs)
        setFilteredLogs(logs)
        setLoading(false)
      })
    }
  }, [open, repoName, job])

  // Filter logs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredLogs(logs)
    } else {
      const filtered = logs.filter((log) => log.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredLogs(filtered)
    }
  }, [searchTerm, logs])

  // Status icon based on job status
  const StatusIcon = () => {
    if (job.status === "completed" && job.conclusion === "success") {
      return <CheckCircle className="h-4 w-4 text-emerald-400" />
    } else if (job.status === "completed" && job.conclusion === "failure") {
      return <XCircle className="h-4 w-4 text-red-400" />
    } else if (job.status === "in_progress") {
      return <Clock className="h-4 w-4 text-blue-400 animate-pulse" />
    } else {
      return <Clock className="h-4 w-4 text-yellow-400" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 font-mono">
              <StatusIcon />
              {job.name}
            </DialogTitle>
            <Badge
              variant="outline"
              className={`font-mono text-xs ${
                job.status === "completed" && job.conclusion === "success"
                  ? "bg-emerald-900/20 text-emerald-400 border-emerald-900/30"
                  : job.status === "completed" && job.conclusion === "failure"
                    ? "bg-red-900/20 text-red-400 border-red-900/30"
                    : job.status === "in_progress"
                      ? "bg-blue-900/20 text-blue-400 border-blue-900/30"
                      : "bg-yellow-900/20 text-yellow-400 border-yellow-900/30"
              }`}
            >
              {job.status === "completed"
                ? job.conclusion === "success"
                  ? "Success"
                  : "Failed"
                : job.status === "in_progress"
                  ? "Running"
                  : "Queued"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-600"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-zinc-500 hover:text-zinc-300"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        {loading ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4 font-mono text-xs overflow-auto max-h-[60vh]">
            <pre className="whitespace-pre-wrap">
              <LogRenderer logs={filteredLogs} />
            </pre>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Helper function to generate job-specific logs
function generateJobLogs(job: WorkflowJob): string[] {
  const logs: string[] = []
  const startTime = new Date()
  startTime.setMinutes(startTime.getMinutes() - 30) // Start 30 minutes ago
  const currentTime = new Date(startTime)

  // Job initialization
  logs.push(`[${formatLogTime(currentTime)}] INFO: Starting job: ${job.name}`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Runner: GitHub-hosted runner (ubuntu-latest)`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Runner group: Default`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Runner image: ubuntu-22.04`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Runner architecture: X64`)

  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Preparing runner environment`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Runner IP: 13.X.X.X`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Runner version: 2.308.0`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Runner OS: Linux`)

  advanceTime(currentTime, 3)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Job configuration:`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: - timeout-minutes: 60`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: - concurrency: ci-\${{ github.ref }}`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: - environment: production`)

  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Initializing job container`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Container ID: 3a8f7d2e9b1c`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Container image: ubuntu:22.04`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Container started successfully`)

  // Generate logs based on job name
  if (job.name.toLowerCase().includes("setup")) {
    generateSetupLogs(logs, currentTime, job)
  } else if (job.name.toLowerCase().includes("test")) {
    generateTestLogs(logs, currentTime, job)
  } else if (job.name.toLowerCase().includes("build")) {
    generateBuildLogs(logs, currentTime, job)
  } else if (job.name.toLowerCase().includes("deploy")) {
    generateDeployLogs(logs, currentTime, job)
  } else if (job.name.toLowerCase().includes("lint")) {
    generateLintLogs(logs, currentTime, job)
  } else {
    generateGenericLogs(logs, currentTime, job)
  }

  // Job completion
  advanceTime(currentTime, 3)
  if (job.status === "completed") {
    if (job.conclusion === "success") {
      logs.push(`[${formatLogTime(currentTime)}] SUCCESS: Job completed successfully`)
      logs.push(
        `[${formatLogTime(currentTime)}] INFO: Job duration: ${job.steps.reduce((acc, step) => acc + step.duration, 0)} seconds`,
      )
      logs.push(`[${formatLogTime(currentTime)}] INFO: Job result: success`)
    } else {
      logs.push(`[${formatLogTime(currentTime)}] ERROR: Job failed`)
      logs.push(
        `[${formatLogTime(currentTime)}] INFO: Job duration: ${job.steps.reduce((acc, step) => acc + step.duration, 0)} seconds`,
      )
      logs.push(`[${formatLogTime(currentTime)}] INFO: Job result: failure`)
      logs.push(`[${formatLogTime(currentTime)}] INFO: Error: Process completed with exit code 1`)
    }
  } else if (job.status === "in_progress") {
    logs.push(`[${formatLogTime(currentTime)}] INFO: Job is still running...`)
    logs.push(
      `[${formatLogTime(currentTime)}] INFO: Current step: ${job.steps.find((step) => step.status === "in_progress")?.name || "Unknown"}`,
    )
  } else {
    logs.push(`[${formatLogTime(currentTime)}] INFO: Job is queued and waiting to start...`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Waiting for available runner...`)
  }

  return logs
}

// Helper functions for generating specific job logs
function generateSetupLogs(logs: string[], currentTime: Date, job: WorkflowJob): void {
  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Setting up environment...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Setting up Node.js`)
  advanceTime(currentTime, 1)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Using Node.js version 18.x`)
  logs.push(
    `[${formatLogTime(currentTime)}] INFO: Downloading Node.js from https://nodejs.org/dist/v18.17.1/node-v18.17.1-linux-x64.tar.gz`,
  )
  advanceTime(currentTime, 3)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Node.js installed successfully`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Node.js version: v18.17.1`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: npm version: 9.6.7`)

  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Setting up cache...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Cache key: node-modules-\${{ hashFiles('**/package-lock.json') }}`)
  advanceTime(currentTime, 1)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Cache restored successfully`)

  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Installing dependencies...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Running: npm ci`)
  advanceTime(currentTime, 5)

  if (job.status === "completed" && job.conclusion === "failure") {
    logs.push(`[${formatLogTime(currentTime)}] ERROR: npm ERR! code ENOENT`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: npm ERR! syscall open`)
    logs.push(
      `[${formatLogTime(currentTime)}] ERROR: npm ERR! path /home/runner/work/project/project/package-lock.json`,
    )
    logs.push(`[${formatLogTime(currentTime)}] ERROR: npm ERR! errno -2`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: npm ERR! enoent Could not find package-lock.json`)
    advanceTime(currentTime, 1)
    logs.push(
      `[${formatLogTime(currentTime)}] ERROR: npm ERR! A complete log can be found in: /home/runner/.npm/_logs/2023-04-18T_log.txt`,
    )
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Process completed with exit code 1`)
  } else {
    logs.push(`[${formatLogTime(currentTime)}] INFO: added 1247 packages in 24s`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: 127 packages are looking for funding`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Dependencies installed successfully`)
  }
}

function generateTestLogs(logs: string[], currentTime: Date, job: WorkflowJob): void {
  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Running tests...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Command: npm run test`)
  advanceTime(currentTime, 1)
  logs.push(`[${formatLogTime(currentTime)}] INFO: > project@1.0.0 test`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: > jest --coverage`)
  advanceTime(currentTime, 3)
  logs.push(`[${formatLogTime(currentTime)}] INFO: PASS src/utils/__tests__/format.test.ts (1.2s)`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: PASS src/components/__tests__/button.test.tsx (0.8s)`)

  if (job.status === "completed" && job.conclusion === "failure") {
    logs.push(`[${formatLogTime(currentTime)}] INFO: FAIL src/components/__tests__/form.test.tsx (1.5s)`)
    advanceTime(currentTime, 1)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: ● Form component › should submit the form successfully`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR:   Expected form submission to succeed, but it failed`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR:   Expected: true`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR:   Received: false`)
    logs.push(
      `[${formatLogTime(currentTime)}] ERROR:       at Object.<anonymous> (src/components/__tests__/form.test.tsx:42:3)`,
    )
    advanceTime(currentTime, 1)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Test Suites: 1 failed, 2 passed, 3 total`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Tests: 1 failed, 23 passed, 24 total`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Snapshots: 0 total`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Time: 3.5s`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Process completed with exit code 1`)
  } else {
    logs.push(`[${formatLogTime(currentTime)}] INFO: PASS src/components/__tests__/form.test.tsx (1.5s)`)
    advanceTime(currentTime, 1)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Test Suites: 3 passed, 3 total`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Tests: 24 passed, 24 total`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Snapshots: 0 total`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Time: 3.5s`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Test coverage: 87.5%`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: All tests passed successfully`)
  }
}

function generateBuildLogs(logs: string[], currentTime: Date, job: WorkflowJob): void {
  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Building project...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Command: npm run build`)
  advanceTime(currentTime, 1)
  logs.push(`[${formatLogTime(currentTime)}] INFO: > project@1.0.0 build`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: > next build`)
  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: info  - Loaded env from .env`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: info  - Checking validity of types...`)
  advanceTime(currentTime, 3)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Creating an optimized production build...`)

  if (job.status === "completed" && job.conclusion === "failure") {
    advanceTime(currentTime, 2)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Failed to compile.`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: ./src/pages/api/data.ts:12:10`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Type error: Cannot read properties of undefined (reading 'map')`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR:   10 | `)
    logs.push(`[${formatLogTime(currentTime)}] ERROR:   11 | export default function handler(req, res) {`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: > 12 |   const items = data.items.map(item => ({`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR:      |                 ^`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR:   13 |     id: item.id,`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR:   14 |     name: item.name,`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR:   15 |   }));`)
    advanceTime(currentTime, 1)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Build failed with 1 error`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Process completed with exit code 1`)
  } else {
    advanceTime(currentTime, 5)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Compiled successfully.`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: `)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Route (pages)                              Size     First Load JS`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: ┌ ○ /                                      5.28 kB        87.4 kB`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: ├ ○ /404                                   193 B          82.3 kB`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: ├ ○ /api/data                              0 B              0 B`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: └ ○ /dashboard                             8.12 kB        90.2 kB`)
    advanceTime(currentTime, 1)
    logs.push(`[${formatLogTime(currentTime)}] INFO: `)
    logs.push(
      `[${formatLogTime(currentTime)}] INFO: ○  (Static)  automatically rendered as static HTML (uses no initial props)`,
    )
    logs.push(`[${formatLogTime(currentTime)}] INFO: Build completed successfully`)
  }
}

function generateDeployLogs(logs: string[], currentTime: Date, job: WorkflowJob): void {
  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Preparing deployment...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Environment: production`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Vercel Project ID: prj_1a2b3c4d5e6f7g8h9i0j`)
  advanceTime(currentTime, 1)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Verifying project settings...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Framework detected: Next.js`)
  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Installing Vercel CLI...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Vercel CLI 28.20.0`)
  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Uploading build artifacts...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Uploading .next directory`)
  advanceTime(currentTime, 3)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Uploaded 42 files (8.5 MB)`)

  if (job.status === "completed" && job.conclusion === "failure") {
    advanceTime(currentTime, 2)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Error: Failed to deploy to Vercel`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Error code: api_error`)
    logs.push(
      `[${formatLogTime(currentTime)}] ERROR: Error message: Authentication failed. Please check your deployment token.`,
    )
    advanceTime(currentTime, 1)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Process completed with exit code 1`)
  } else {
    advanceTime(currentTime, 2)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Deployment started...`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Building...`)
    advanceTime(currentTime, 3)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Build completed`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Deploying...`)
    advanceTime(currentTime, 2)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Deployment complete!`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Production URL: https://project-name.vercel.app`)
    logs.push(`[  INFO: Production URL: https://project-name.vercel.app`)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Deployment successful!`)
  }
}

function generateLintLogs(logs: string[], currentTime: Date, job: WorkflowJob): void {
  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Running linter...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Command: npm run lint`)
  advanceTime(currentTime, 1)
  logs.push(`[${formatLogTime(currentTime)}] INFO: > project@1.0.0 lint`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: > eslint . --ext .js,.jsx,.ts,.tsx`)
  advanceTime(currentTime, 3)

  if (job.status === "completed" && job.conclusion === "failure") {
    logs.push(`[${formatLogTime(currentTime)}] WARNING: ESLint found 3 warnings and 2 errors`)
    advanceTime(currentTime, 1)
    logs.push(
      `[${formatLogTime(currentTime)}] ERROR: src/components/main.tsx:42:10: 'useState' is defined but never used (no-unused-vars)`,
    )
    logs.push(
      `[${formatLogTime(currentTime)}] ERROR: src/utils/helpers.ts:17:5: Expected a default case (default-case)`,
    )
    logs.push(
      `[${formatLogTime(currentTime)}] WARNING: src/pages/index.tsx:23:7: React Hook useEffect has a missing dependency: 'props' (react-hooks/exhaustive-deps)`,
    )
    advanceTime(currentTime, 1)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Linting failed with 2 errors`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Process completed with exit code 1`)
  } else {
    logs.push(`[${formatLogTime(currentTime)}] INFO: ESLint found 0 errors and 2 warnings`)
    advanceTime(currentTime, 1)
    logs.push(
      `[${formatLogTime(currentTime)}] WARNING: src/pages/index.tsx:23:7: React Hook useEffect has a missing dependency: 'props' (react-hooks/exhaustive-deps)`,
    )
    logs.push(
      `[${formatLogTime(currentTime)}] WARNING: src/components/header.tsx:15:3: Prop spreading is forbidden (react/jsx-props-no-spreading)`,
    )
    advanceTime(currentTime, 1)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Linting completed successfully with 2 warnings`)
  }
}

function generateGenericLogs(logs: string[], currentTime: Date, job: WorkflowJob): void {
  advanceTime(currentTime, 2)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Running job: ${job.name}...`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: Command: npm run ${job.name.toLowerCase()}`)
  advanceTime(currentTime, 1)
  logs.push(`[${formatLogTime(currentTime)}] INFO: > project@1.0.0 ${job.name.toLowerCase()}`)
  logs.push(`[${formatLogTime(currentTime)}] INFO: > node scripts/${job.name.toLowerCase()}.js`)
  advanceTime(currentTime, 3)

  if (job.status === "completed" && job.conclusion === "failure") {
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Error: Command failed with exit code 1`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: at ChildProcess.exithandler (node:child_process:402:12)`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: at ChildProcess.emit (node:events:513:28)`)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: at maybeClose (node:internal/child_process:1091:16)`)
    advanceTime(currentTime, 1)
    logs.push(`[${formatLogTime(currentTime)}] ERROR: Process completed with exit code 1`)
  } else {
    logs.push(`[${formatLogTime(currentTime)}] INFO: Task completed successfully`)
    logs.push(
      `[${formatLogTime(currentTime)}] INFO: Output: Task ${job.name} completed in ${Math.floor(Math.random() * 10) + 5} seconds`,
    )
    advanceTime(currentTime, 1)
    logs.push(`[${formatLogTime(currentTime)}] INFO: Process completed with exit code 0`)
  }
}

// Helper function to format time for logs
function formatLogTime(date: Date): string {
  return date.toISOString().replace("T", " ").replace("Z", "")
}

// Helper function to advance time for log timestamps
function advanceTime(date: Date, seconds: number): void {
  date.setSeconds(date.getSeconds() + seconds)
}
