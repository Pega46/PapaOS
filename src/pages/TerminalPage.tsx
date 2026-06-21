import { TerminalWindow } from '../components/terminal/TerminalWindow'

export function TerminalPage() {
  return (
    <main className="terminal-page">
      <header className="terminal-hero">
        <div>
          <p className="terminal-label">MACARA LEGACY TERMINAL</p>
          <h1>PapaOS</h1>
          <p>C:\FAMILIA\PAPAOS&gt; entorno familiar activo</p>
        </div>
      </header>
      <TerminalWindow />
    </main>
  )
}
