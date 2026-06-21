import type { TerminalCommand, TerminalResult } from '../models/TerminalCommand'

export const prompt = 'C:\\FAMILIA\\PAPAOS>'

const aliases: Record<string, string> = {
  AYUDA: 'HELP',
  LIMPIAR: 'CLS',
  LIBRO: 'CD LIBRO',
  ARBOL: 'CD ARBOL',
  MENSAJES: 'CD MENSAJES',
  RECUERDOS: 'CD RECUERDOS',
}

const helpLines = [
  'Comandos disponibles:',
  '',
  'DIR                 Lista los modulos del sistema.',
  'TREE                Muestra el arbol general de PapaOS.',
  'CD LIBRO            Abre el Libro de Recuerdos.',
  'CD ARBOL            Abre el Arbol de Ensenanzas.',
  'CD MENSAJES         Abre los mensajes familiares.',
  'ADMIN               Abre el acceso administrativo.',
  'TYPE BIENVENIDA.TXT Muestra el mensaje inicial.',
  'TYPE GRACIAS.TXT    Muestra una carta especial.',
  'WHOAMI              Muestra el perfil simbolico del usuario.',
  'VER                 Muestra la version del sistema.',
  'CLS                 Limpia la terminal.',
  'EXIT                Cierra la sesion simbolica.',
]

function normalizeCommand(input: string) {
  const normalized = input.trim().replace(/\s+/g, ' ').toUpperCase()
  return aliases[normalized] ?? normalized
}

function distance(a: string, b: string) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i])
  for (let j = 0; j <= a.length; j += 1) matrix[0][j] = j

  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      matrix[i][j] =
        b.charAt(i - 1) === a.charAt(j - 1)
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
    }
  }

  return matrix[b.length][a.length]
}

export function getAutocomplete(input: string, commands: TerminalCommand[]) {
  const normalized = normalizeCommand(input)
  return commands.find((command) => command.command.startsWith(normalized))?.command ?? input
}

export function runTerminalCommand(rawInput: string, commands: TerminalCommand[]): TerminalResult {
  const command = normalizeCommand(rawInput)
  const match = commands.find((item) => item.command === command && item.enabled)

  if (!command) {
    return { command, lines: [] }
  }

  if (command === 'HELP') return { command, lines: helpLines }
  if (command === 'DIR') {
    return {
      command,
      lines: [
        'Directorio de C:\\FAMILIA\\PAPAOS',
        '',
        '<DIR>          LIBRO',
        '<DIR>          ARBOL',
        '<DIR>          MENSAJES',
        '<DIR>          RECUERDOS',
        '<TXT>          BIENVENIDA.TXT',
        '<TXT>          GRACIAS.TXT',
        '<SYS>          LEGADO.SYS',
      ],
    }
  }
  if (command === 'TREE') {
    return {
      command,
      lines: [
        'C:\\FAMILIA\\PAPAOS',
        '+-- LIBRO',
        '|   +-- momentos_felices',
        '|   +-- fotos',
        '|   +-- videos',
        '+-- ARBOL',
        '|   +-- familia',
        '|   +-- trabajo',
        '|   +-- valores',
        '|   +-- ensenanzas',
        '+-- MENSAJES',
        '|   +-- familia',
        '+-- LEGADO.SYS',
      ],
    }
  }
  if (command === 'WHOAMI') {
    return {
      command,
      lines: [
        'Usuario: Papa',
        'Rol: Ingeniero en Sistemas',
        'Estado: Legado activo',
        'Equipo: Macara',
        'Permisos: Administrador de recuerdos familiares',
      ],
    }
  }
  if (command === 'VER') {
    return {
      command,
      lines: ['PapaOS Version 1.0', 'Macara Legacy Terminal', 'Build: Familia.Edicion.Especial'],
    }
  }
  if (command === 'CLS') return { command, lines: [], clear: true }
  if (command === 'ADMIN') {
    return {
      command,
      lines: ['Acceso administrativo solicitado.', 'Redirigiendo al inicio de sesion...'],
      navigateTo: '/admin/login',
    }
  }

  if (match?.actionType === 'navigate') {
    const targetName = command.replace('CD ', '')
    const lines =
      command === 'CD ARBOL'
        ? ['Abriendo modulo ARBOL...', 'Raices encontradas: familia, trabajo, valores, vida.', 'Redirigiendo...']
        : [`Abriendo modulo ${targetName}...`, 'Cargando recuerdos aprobados...', 'Redirigiendo...']

    return { command, lines, navigateTo: match.actionTarget }
  }

  if (match?.response) return { command, lines: match.response.split('\n') }

  const suggestion = commands
    .map((item) => ({ command: item.command, score: distance(command, item.command) }))
    .sort((a, b) => a.score - b.score)[0]

  const unknownPath = command.startsWith('CD ') ? command.replace('CD ', '') : command
  return {
    command,
    lines: [
      `El sistema no reconoce la ruta especificada: ${unknownPath}`,
      suggestion && suggestion.score <= 4 ? `Quiza quiso decir: ${suggestion.command}` : 'Comando no reconocido.',
      'Escriba HELP para ver los comandos disponibles.',
    ],
  }
}
