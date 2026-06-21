import type { FamilyMessage } from '../models/Message'
import type { Memory } from '../models/Memory'
import type { Teaching } from '../models/Teaching'
import type { TerminalCommand } from '../models/TerminalCommand'

export const bootMessages = [
  'Cargando recuerdos...',
  'Reconstruyendo momentos...',
  'Instalando deseos...',
  'Compilando gratitud...',
  'Restaurando memorias...',
  'Sincronizando familia...',
  'Verificando enseñanzas...',
  'Preparando bienvenida...',
  'Inicializando legado...',
  'Cargando Macara Legacy Terminal...',
]

export const sampleMemories: Memory[] = [
  {
    id: 'memory-1',
    title: 'El primer sistema de la casa',
    body: 'Antes de que todos entendiéramos qué era un servidor, ya nos enseñabas que la paciencia también compila. Cada arreglo, cada explicación y cada noche larga dejó una forma de mirar el mundo.',
    dateLabel: 'Recuerdo familiar',
    category: 'Ingenieria',
    authorName: 'Familia',
    authorRelation: 'Equipo de casa',
    mediaUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    status: 'approved',
    orderIndex: 1,
    featured: true,
  },
  {
    id: 'memory-2',
    title: 'Domingos celestes',
    body: 'Hay partidos que se recuerdan por el marcador y otros por la compañía. Con Macara aprendimos que la lealtad no depende de una tabla, sino de volver a alentar.',
    dateLabel: 'Domingo de estadio',
    category: 'Macara',
    authorName: 'Tus hijos',
    authorRelation: 'Hijos',
    mediaUrl:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    status: 'approved',
    orderIndex: 2,
    featured: false,
  },
]

export const sampleTeachings: Teaching[] = [
  {
    id: 'teaching-1',
    branch: 'Familia',
    title: 'Primero se escucha',
    body: 'La mejor solución casi siempre empieza entendiendo bien el problema y a la persona que lo trae.',
    authorName: 'Casa',
    authorRelation: 'Familia',
    status: 'approved',
    orderIndex: 1,
  },
  {
    id: 'teaching-2',
    branch: 'Ingenieria',
    title: 'Un sistema vive por su mantenimiento',
    body: 'Lo importante no es solo construir algo que funcione hoy, sino dejarlo listo para que mañana alguien pueda cuidarlo.',
    authorName: 'Familia',
    authorRelation: 'Aprendices',
    status: 'approved',
    orderIndex: 2,
  },
  {
    id: 'teaching-3',
    branch: 'Valores',
    title: 'Hacerlo bien aunque nadie mire',
    body: 'La integridad es ese proceso silencioso que corre en segundo plano y sostiene todo lo demás.',
    authorName: 'Todos',
    authorRelation: 'Familia',
    status: 'approved',
    orderIndex: 3,
  },
]

export const sampleMessages: FamilyMessage[] = [
  {
    id: 'message-1',
    authorName: 'Familia',
    authorRelation: 'Todos',
    body: 'Gracias por ser guía, soporte técnico, hincha fiel y raíz de este sistema que llamamos familia.',
    status: 'approved',
    featured: true,
  },
  {
    id: 'message-2',
    authorName: 'Casa',
    authorRelation: 'Tu equipo',
    body: 'Tu legado está activo. Cada enseñanza sigue ejecutándose en nosotros.',
    status: 'approved',
    featured: false,
  },
]

export const terminalCommands: TerminalCommand[] = [
  { command: 'HELP', description: 'Muestra los comandos disponibles', actionType: 'system', actionTarget: 'help', enabled: true, orderIndex: 1 },
  { command: 'DIR', description: 'Lista los modulos del sistema', actionType: 'list', actionTarget: 'root', enabled: true, orderIndex: 2 },
  { command: 'TREE', description: 'Muestra el arbol general de PapaOS', actionType: 'list', actionTarget: 'tree', enabled: true, orderIndex: 3 },
  { command: 'CD LIBRO', description: 'Abre el Libro de Recuerdos', actionType: 'navigate', actionTarget: '/libro', enabled: true, orderIndex: 4 },
  { command: 'CD ARBOL', description: 'Abre el Arbol de Ensenanzas', actionType: 'navigate', actionTarget: '/arbol', enabled: true, orderIndex: 5 },
  { command: 'CD MENSAJES', description: 'Abre los mensajes familiares', actionType: 'navigate', actionTarget: '/mensajes', enabled: true, orderIndex: 6 },
  { command: 'CD RECUERDOS', description: 'Abre el Libro de Recuerdos', actionType: 'navigate', actionTarget: '/libro', enabled: true, orderIndex: 7 },
  { command: 'TYPE BIENVENIDA.TXT', description: 'Muestra el mensaje inicial', response: 'Bienvenido a PapaOS, un sistema construido con recuerdos.', actionType: 'message', enabled: true, orderIndex: 8 },
  { command: 'TYPE GRACIAS.TXT', description: 'Muestra una carta especial', response: 'Gracias por cada enseñanza,\npor cada esfuerzo silencioso\ny por construir con tu vida\nel sistema mas importante: la familia.', actionType: 'message', enabled: true, orderIndex: 9 },
  { command: 'WHOAMI', description: 'Muestra el perfil simbolico del usuario', actionType: 'system', actionTarget: 'whoami', enabled: true, orderIndex: 10 },
  { command: 'VER', description: 'Muestra la version del sistema', actionType: 'system', actionTarget: 'ver', enabled: true, orderIndex: 11 },
  { command: 'ADMIN', description: 'Abre el acceso administrativo', actionType: 'navigate', actionTarget: '/admin/login', enabled: true, orderIndex: 12 },
  { command: 'CLS', description: 'Limpia la terminal', actionType: 'clear', enabled: true, orderIndex: 13 },
  { command: 'EXIT', description: 'Cierra la sesion simbolica', response: 'Sesion finalizada. El legado permanece activo.', actionType: 'message', enabled: true, orderIndex: 14 },
]
