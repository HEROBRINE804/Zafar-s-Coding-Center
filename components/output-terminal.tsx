'use client'

import { useEffect, useRef } from 'react'
import { Trash2 } from 'lucide-react'
import type { LogEntry, LogLevel } from '@/lib/run-code'
import { cn } from '@/lib/utils'

type OutputTerminalProps = {
  logs: LogEntry[]
  hasRun: boolean
  onClear: () => void
}

const levelStyles: Record<LogLevel, string> = {
  log: 'text-foreground',
  info: 'text-chart-2',
  warn: 'text-chart-3',
  error: 'text-destructive',
  return: 'text-primary',
}

const levelPrefix: Record<LogLevel, string> = {
  log: '›',
  info: 'i',
  warn: '!',
  error: '✕',
  return: '⏎',
}

export function OutputTerminal({ logs, hasRun, onClear }: OutputTerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <section
      aria-label="Output terminal"
      className="flex h-full min-h-0 flex-col bg-background"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-chart-3/70" />
            <span className="size-3 rounded-full bg-primary/70" />
          </span>
          <span className="ml-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Output
          </span>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={logs.length === 0}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          <Trash2 className="size-3.5" />
          Clear
        </button>
      </div>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-auto px-4 py-3 font-mono text-sm leading-6"
      >
        {logs.length === 0 ? (
          <p className="text-muted-foreground/70">
            {hasRun
              ? '// Program finished with no output.'
              : '// Press "Run Code" to see the output here.'}
          </p>
        ) : (
          <ul className="space-y-0.5">
            {logs.map((entry) => (
              <li
                key={entry.id}
                className={cn(
                  'flex gap-2 whitespace-pre-wrap break-words',
                  levelStyles[entry.level],
                )}
              >
                <span className="select-none opacity-50">
                  {levelPrefix[entry.level]}
                </span>
                <span>{entry.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
