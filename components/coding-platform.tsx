'use client'

import { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { lessons, type Lesson } from '@/lib/lessons'
import { runCode, type LogEntry } from '@/lib/run-code'
import { CodeEditor } from '@/components/code-editor'
import { OutputTerminal } from '@/components/output-terminal'
import { LessonsSidebar } from '@/components/lessons-sidebar'

export function CodingPlatform() {
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0])
  const [code, setCode] = useState<string>(lessons[0].starterCode)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [hasRun, setHasRun] = useState(false)

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson)
    setCode(lesson.starterCode)
    setLogs([])
    setHasRun(false)
  }

  const handleRun = () => {
    setLogs(runCode(code))
    setHasRun(true)
  }

  const handleReset = () => {
    setCode(activeLesson.starterCode)
    setLogs([])
    setHasRun(false)
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden md:flex-row">
      <LessonsSidebar
        lessons={lessons}
        activeId={activeLesson.id}
        onSelect={handleSelectLesson}
      />

      <main className="flex min-h-0 flex-1 flex-col">
        {/* Lesson brief */}
        <div className="border-b border-border bg-card/50 px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-xs font-medium text-primary">
              Lesson {activeLesson.index}
            </span>
            <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
              {activeLesson.level}
            </span>
          </div>
          <h1 className="mt-2 text-lg font-semibold text-foreground text-balance">
            {activeLesson.title}
          </h1>
          <ul className="mt-2 space-y-1">
            {activeLesson.instructions.map((step, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="font-mono text-primary">{i + 1}.</span>
                <span className="text-pretty">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Editor toolbar */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            script.js
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleRun}
              className="flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-1.5 font-mono text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Play className="size-3.5 fill-current" />
              Run Code
            </button>
          </div>
        </div>

        {/* Editor + terminal split */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 basis-3/5">
            <CodeEditor value={code} onChange={setCode} />
          </div>
          <div className="min-h-0 flex-1 basis-2/5 border-t border-border">
            <OutputTerminal
              logs={logs}
              hasRun={hasRun}
              onClear={() => setLogs([])}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
