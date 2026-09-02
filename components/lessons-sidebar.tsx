'use client'

import { Terminal } from 'lucide-react'
import type { Lesson } from '@/lib/lessons'
import { cn } from '@/lib/utils'

type LessonsSidebarProps = {
  lessons: Lesson[]
  activeId: string
  onSelect: (lesson: Lesson) => void
}

export function LessonsSidebar({
  lessons,
  activeId,
  onSelect,
}: LessonsSidebarProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-sidebar-border bg-sidebar md:h-full md:w-72 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2 px-5 py-4">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Terminal className="size-4.5" />
        </span>
        <div className="leading-tight">
          <p className="font-mono text-sm font-semibold text-sidebar-foreground">
            CodeLab
          </p>
          <p className="text-xs text-muted-foreground">JavaScript playground</p>
        </div>
      </div>

      <div className="px-5 pb-2">
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Lessons
        </h2>
      </div>

      <nav className="flex flex-col gap-1 px-3 pb-4">
        {lessons.map((lesson) => {
          const isActive = lesson.id === activeId
          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => onSelect(lesson)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'group flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors',
                isActive
                  ? 'bg-sidebar-accent'
                  : 'hover:bg-sidebar-accent/50',
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-semibold',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground group-hover:text-foreground',
                )}
              >
                {lesson.index}
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    'block text-sm font-medium',
                    isActive
                      ? 'text-sidebar-foreground'
                      : 'text-sidebar-foreground/80',
                  )}
                >
                  {lesson.title}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                  {lesson.description}
                </span>
              </span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto hidden px-5 py-4 md:block">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Edit the code, then run it. Everything executes right here in your
          browser.
        </p>
      </div>
    </aside>
  )
}
