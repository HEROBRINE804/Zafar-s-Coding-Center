export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'return'

export type LogEntry = {
  id: number
  level: LogLevel
  text: string
}

function formatValue(value: unknown, seen = new WeakSet()): string {
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean')
    return String(value)
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'function')
    return `[Function: ${(value as { name?: string }).name || 'anonymous'}]`
  if (typeof value === 'bigint') return `${value}n`
  if (typeof value === 'symbol') return value.toString()

  if (typeof value === 'object') {
    if (seen.has(value as object)) return '[Circular]'
    seen.add(value as object)
    try {
      if (Array.isArray(value)) {
        const items = value.map((item) => formatInner(item, seen))
        return `[${items.join(', ')}]`
      }
      const entries = Object.entries(value as Record<string, unknown>).map(
        ([key, val]) => `${key}: ${formatInner(val, seen)}`,
      )
      return `{ ${entries.join(', ')} }`
    } finally {
      seen.delete(value as object)
    }
  }
  return String(value)
}

// Inner values (inside arrays/objects) quote strings for readability.
function formatInner(value: unknown, seen: WeakSet<object>): string {
  if (typeof value === 'string') return `"${value}"`
  return formatValue(value, seen)
}

/**
 * Runs user-provided JavaScript, capturing console output and the final
 * expression value. Executes synchronously via the Function constructor so
 * console.log calls are captured in order.
 */
export function runCode(code: string): LogEntry[] {
  const logs: LogEntry[] = []
  let counter = 0

  const push = (level: LogLevel, args: unknown[]) => {
    logs.push({
      id: counter++,
      level,
      text: args.map((arg) => formatValue(arg)).join(' '),
    })
  }

  const sandboxConsole = {
    log: (...args: unknown[]) => push('log', args),
    info: (...args: unknown[]) => push('info', args),
    warn: (...args: unknown[]) => push('warn', args),
    error: (...args: unknown[]) => push('error', args),
    debug: (...args: unknown[]) => push('log', args),
  }

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(
      'console',
      `"use strict";\n${code}`,
    )
    const result = fn(sandboxConsole)
    if (result !== undefined) {
      push('return', [result])
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? `${error.name}: ${error.message}`
        : String(error)
    logs.push({ id: counter++, level: 'error', text: message })
  }

  return logs
}
