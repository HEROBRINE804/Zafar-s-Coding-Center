'use client'

import { useMemo, useRef, type ChangeEvent, type KeyboardEvent } from 'react'

type CodeEditorProps = {
  value: string
  onChange: (value: string) => void
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)

  const lineCount = useMemo(() => value.split('\n').length, [value])

  const handleScroll = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Insert two spaces on Tab instead of moving focus.
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.currentTarget
      const start = target.selectionStart
      const end = target.selectionEnd
      const next = value.slice(0, start) + '  ' + value.slice(end)
      onChange(next)
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2
      })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="relative flex h-full min-h-0 overflow-hidden bg-card font-mono text-sm">
      <div
        ref={gutterRef}
        aria-hidden="true"
        className="select-none overflow-hidden border-r border-border bg-card py-4 text-right text-muted-foreground/60"
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i} className="px-3 leading-6 tabular-nums">
            {i + 1}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="JavaScript code editor"
        className="h-full w-full flex-1 resize-none bg-card px-4 py-4 leading-6 text-foreground caret-primary outline-none placeholder:text-muted-foreground/50"
        placeholder="// Write some JavaScript here..."
      />
    </div>
  )
}
