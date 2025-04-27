import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
        secondary:
          "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
        destructive:
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        outline: 
          "border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300",
        // Kubernetes-related badge variants
        clusterManagement: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        podsManagement: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        debugging: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        security: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        monitoring: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        autoScaling: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
        development: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
        cicd: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
        ai: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
        // Custom variants for tags with GitHub-like styling
        ml: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
        data: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
        reinforcement: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
        programming: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
        llmFramework: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
        llmModel: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
        llmVector: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
        llmTool: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
        mcpCore: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
        mcpDatabase: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
        mcpFinance: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
        mcpWeb: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
        mcpDeveloper: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
        mcpAI: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
        mcpProductivity: "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300",
        plain: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants } 