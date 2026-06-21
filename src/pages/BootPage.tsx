import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { bootMessages } from '../data/mockData'

export function BootPage() {
  const reduceMotion = useReducedMotion()
  const [complete, setComplete] = useState(false)
  const message = bootMessages[bootMessages.length - 1]

  return (
    <main className="boot-screen">
      <motion.section
        className="boot-panel"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="watermark">M</div>
        <p className="terminal-label">PAPAOS BIOS / MACARA LEGACY TERMINAL</p>
        <h1>PapaOS</h1>
        <p className="boot-copy">Inicializando sistema familiar. Preparando terminal simbolica para el Ingeniero.</p>
        <div className="boot-terminal" aria-hidden="true">
          <span>C:\FAMILIA\PAPAOS&gt; boot legado.sys</span>
          <span>{message}</span>
          <span>Verificando modulos: LIBRO, ARBOL, MENSAJES</span>
        </div>
        <div className="progress-track" aria-label="Carga del sistema">
          <motion.div
            className="progress-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 2.4, ease: 'easeOut' }}
            onAnimationComplete={() => setComplete(true)}
          />
        </div>
        <p className="boot-status">
          {complete || reduceMotion ? 'Sistema iniciado correctamente. Bienvenido, Ingeniero.' : message}
        </p>
        <Link className="primary-button" to="/terminal">
          Entrar a la terminal
        </Link>
      </motion.section>
    </main>
  )
}
