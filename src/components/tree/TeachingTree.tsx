import { LayoutGroup, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import type { Teaching } from '../../models/Teaching'
import { TeachingDetail } from './TeachingDetail'
import { TeachingLeaf } from './TeachingLeaf'
import { TreeSvg } from './TreeSvg'

const branches = ['Familia', 'Trabajo', 'Ingenieria', 'Valores', 'Vida', 'Consejos']

const branchMeta = [
  { name: 'Familia', x: 26, y: 38, rotate: -28 },
  { name: 'Trabajo', x: 72, y: 39, rotate: 26 },
  { name: 'Ingenieria', x: 34, y: 24, rotate: -14 },
  { name: 'Valores', x: 66, y: 24, rotate: 14 },
  { name: 'Vida', x: 42, y: 13, rotate: -6 },
  { name: 'Consejos', x: 58, y: 13, rotate: 6 },
]

interface TeachingTreeProps {
  teachings: Teaching[]
}

export function TeachingTree({ teachings }: TeachingTreeProps) {
  const [selectedTeaching, setSelectedTeaching] = useState<Teaching | null>(null)
  const positions = useMemo(() => {
    const branchSlots = new Map<string, number>()

    return teachings.map((teaching) => {
      const branchIndex = Math.max(0, branches.indexOf(teaching.branch))
      const slot = branchSlots.get(teaching.branch) ?? 0
      branchSlots.set(teaching.branch, slot + 1)
      const sideShift = branchIndex % 2 === 0 ? -1 : 1
      const left = Math.min(78, Math.max(22, branchMeta[branchIndex]?.x + sideShift * slot * 4.5))
      const top = Math.min(54, Math.max(12, (branchMeta[branchIndex]?.y ?? 28) + slot * 4.8))
      const rotate = (branchMeta[branchIndex]?.rotate ?? 0) + sideShift * (slot % 3) * 6

      return { left: `${left}%`, top: `${top}%`, rotate }
    })
  }, [teachings])

  return (
    <LayoutGroup>
      <div className={`tree-stage${selectedTeaching ? ' tree-stage-detail-open' : ''}`} aria-label="Arbol de enseñanzas de PapaOS">
      <motion.div
        className="tree-ground"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48 }}
      />
      <TreeSvg />
      <div className="tree-leaves">
        {teachings.map((teaching, index) => (
          <TeachingLeaf
            key={teaching.id}
            teaching={teaching}
            index={index}
            selected={selectedTeaching?.id === teaching.id}
            position={positions[index]}
            onSelect={setSelectedTeaching}
          />
        ))}
      </div>
      {teachings.length === 0 && (
        <div className="tree-empty-note">
          <p>Aun no hay enseñanzas publicadas.</p>
          <span>El arbol esta esperando sus primeras hojas.</span>
        </div>
      )}
      <TeachingDetail teaching={selectedTeaching} onClose={() => setSelectedTeaching(null)} />
      </div>
    </LayoutGroup>
  )
}
