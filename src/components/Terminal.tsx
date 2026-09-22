import { useRef, useState } from 'react'
import { content } from '../data/content'
import type { Locale } from '../data/types'
import { autocomplete, commands, executeCommand, type TerminalOutput } from '../lib/terminal'
import { Dialog } from './Dialog'
import { ExternalLink } from './ExternalLink'

export default function Terminal({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const t = content[locale]
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(0)
  const [draft, setDraft] = useState('')
  const [entries, setEntries] = useState<{ command: string; output: TerminalOutput }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  function run(command: string) {
    if (!command.trim()) return
    const output = executeCommand(command, locale)
    const next = [...history, command].slice(-100)
    setHistory(next)
    setCursor(next.length)
    setInput('')
    setDraft('')
    setEntries((previous) => (output.clear ? [] : [...previous.slice(-49), { command, output }]))
    inputRef.current?.focus()
    requestAnimationFrame(() => {
      if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
    })
  }
  return (
    <Dialog title={t.terminal} closeLabel={t.close} onClose={onClose} className="terminal-dialog">
      <p className="terminal-intro">{t.terminalIntro}</p>
      <div
        className="terminal-output"
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        tabIndex={0}
      >
        {entries.map((entry, index) => (
          <div className="terminal-entry" key={index}>
            <p className="terminal-command">
              <span>visitor@eduardo:~$</span> {entry.command}
            </p>
            <div className="terminal-text">{entry.output.text}</div>
            {entry.output.links && (
              <div className="terminal-links">
                {entry.output.links.map((link) => (
                  <ExternalLink key={link.url} href={link.url}>
                    {link.label} ↗
                  </ExternalLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <form
        className="terminal-form"
        onSubmit={(event) => {
          event.preventDefault()
          run(input)
        }}
      >
        <label htmlFor="terminal-input" className="sr-only">
          {t.terminalInput}
        </label>
        <span className="terminal-prompt" aria-hidden="true">
          visitor@eduardo:~$
        </span>
        <input
          id="terminal-input"
          ref={inputRef}
          autoFocus
          autoComplete="off"
          spellCheck={false}
          aria-label={t.terminalInput}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Tab') {
              const match = autocomplete(input)
              if (match && match !== input) {
                event.preventDefault()
                setInput(match)
              }
            }
            if (event.key === 'ArrowUp') {
              event.preventDefault()
              if (cursor === history.length) setDraft(input)
              const next = Math.max(0, cursor - 1)
              setCursor(next)
              setInput(history[next] ?? input)
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              const next = Math.min(history.length, cursor + 1)
              setCursor(next)
              setInput(next === history.length ? draft : (history[next] ?? ''))
            }
          }}
        />
        <button type="submit" aria-label={t.terminalInput}>
          ↵
        </button>
      </form>
      <div className="terminal-shortcuts" aria-label={t.shortcuts}>
        {commands
          .filter((command) => command !== 'clear')
          .map((command) => (
            <button key={command} onClick={() => run(command)}>
              {command}
            </button>
          ))}
        <button onClick={() => run('clear')}>clear</button>
      </div>
    </Dialog>
  )
}
