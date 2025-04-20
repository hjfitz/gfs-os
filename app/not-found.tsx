"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ChevronLeft,
  AlertTriangle,
  FileQuestion,
  GitForkIcon as GitRepository,
  GitPullRequest,
  Play,
  Lock,
  ServerCrash,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  const searchParams = useSearchParams()
  const [reason, setReason] = useState<string | null>(null)

  useEffect(() => {
    // Get the reason from the URL parameter
    const reasonParam = searchParams.get("reason")
    if (reasonParam) {
      try {
        // Decode the URI-encoded reason
        setReason(decodeURIComponent(reasonParam))
      } catch (e) {
        console.error("Failed to decode reason parameter:", e)
        setReason("unknown")
      }
    } else {
      setReason("not-found")
    }
  }, [searchParams])

  // Define content based on reason
  const getContent = () => {
    switch (reason) {
      case "repository-not-found":
        return {
          icon: <GitRepository className="h-16 w-16 text-blue-500 mb-4" />,
          title: "Repository Not Found",
          message: "The repository you're looking for doesn't exist or you don't have access to it.",
          suggestion: "Check the repository name or your permissions and try again.",
        }
      case "workflow-not-found":
        return {
          icon: <Play className="h-16 w-16 text-blue-500 mb-4" />,
          title: "Workflow Not Found",
          message: "The workflow run you're looking for doesn't exist or has been deleted.",
          suggestion: "Check the workflow ID or navigate to the workflows page to see all available workflows.",
        }
      case "pull-request-not-found":
        return {
          icon: <GitPullRequest className="h-16 w-16 text-blue-500 mb-4" />,
          title: "Pull Request Not Found",
          message: "The pull request you're looking for doesn't exist or has been closed.",
          suggestion:
            "Check the pull request number or navigate to the pull requests page to see all open pull requests.",
        }
      case "access-denied":
        return {
          icon: <Lock className="h-16 w-16 text-red-500 mb-4" />,
          title: "Access Denied",
          message: "You don't have permission to access this resource.",
          suggestion: "Contact your administrator if you believe you should have access to this page.",
        }
      case "server-error":
        return {
          icon: <ServerCrash className="h-16 w-16 text-red-500 mb-4" />,
          title: "Server Error",
          message: "Something went wrong on our end. We're working to fix the issue.",
          suggestion: "Please try again later or contact support if the problem persists.",
        }
      case "not-found":
      default:
        return {
          icon: <FileQuestion className="h-16 w-16 text-blue-500 mb-4" />,
          title: "Page Not Found",
          message: "The page you're looking for doesn't exist or has been moved.",
          suggestion: "Check the URL or navigate back to the dashboard.",
        }
    }
  }

  const content = getContent()

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900/40 border border-zinc-800 rounded-lg p-8 text-center">
        <div className="flex justify-center">{content.icon}</div>

        <h1 className="text-2xl font-bold text-zinc-100 font-mono mb-2">{content.title}</h1>

        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
          <p className="text-zinc-400">{content.message}</p>
        </div>

        <p className="text-zinc-500 text-sm mb-6">{content.suggestion}</p>

        <div className="flex justify-center">
          <Link href="/">
            <Button variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-800">
          <p className="text-zinc-600 text-xs font-mono">Error Code: {reason || "unknown"}</p>
          <p className="text-zinc-600 text-xs font-mono">Timestamp: {new Date().toISOString()}</p>
        </div>
      </div>
    </main>
  )
}

export default NotFound
