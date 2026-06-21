import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { terminalCommands } from '../../data/mockData'
import { getAutocomplete, prompt, runTerminalCommand } from '../../controllers/terminalController'
import type { TerminalResult } from '../../models/TerminalCommand'

const introLines = [
  'Sistema iniciado correctamente.',
  'Bienvenido, Ingeniero.',
  'Escriba HELP para ver los comandos disponibles.',
]

export function TerminalWindow() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<TerminalResult[]>([
    { command: 'BOOT', lines: introLines },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight })
  }, [history])

  function execute(commandInput = input) {
    const result = runTerminalCommand(commandInput, terminalCommands)
    if (!commandInput.trim()) return

    setCommandHistory((current) => [...current, commandInput.trim()])
    setHistoryIndex(null)
    setInput('')

    if (result.clear) {
      setHistory([])
      return
    }

    setHistory((current) => [...current, result])

    if (result.navigateTo) {
      window.setTimeout(() => navigate(result.navigateTo!), 700)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') execute()
    if (event.key === 'Tab') {
      event.preventDefault()
      setInput(getAutocomplete(input, terminalCommands))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex] ?? '')
    }
  }

  return (
    <section className="terminal-frame" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-titlebar">
        <div className="terminal-title">
          <span>PapaOS.exe</span>
          <small>Macara Legacy Terminal</small>
        </div>
        <div className="terminal-status" aria-label="Estado del sistema">
          <span>ONLINE</span>
          <b aria-hidden="true" />
        </div>
        <div className="window-controls" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="terminal-body" ref={terminalRef} role="log" aria-live="polite">
        {history.map((entry, index) => (
          <div className="terminal-entry" key={`${entry.command}-${index}`}>
            {entry.command !== 'BOOT' && (
              <p><span className="prompt">{prompt}</span> {entry.command}</p>
            )}
            {entry.lines.map((line, lineIndex) => (
              <p key={`${line}-${lineIndex}`}>{line || '\u00a0'}</p>
            ))}
          </div>
        ))}
        <label className="terminal-input-row">
          <span className="prompt">{prompt}</span>
          <input
            aria-label="Comando de PapaOS"
            ref={inputRef}
            value={input}
            autoFocus
            autoCapitalize="characters"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
      </div>
    </section>
  )
}
