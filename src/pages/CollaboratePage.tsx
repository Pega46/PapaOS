import { useState } from 'react'
import type { FormEvent } from 'react'
import { toast } from 'sonner'
import { PageShell } from '../components/layout/PageShell'
import { mediaController } from '../controllers/mediaController'
import { messageController } from '../controllers/messageController'

const contributionTypes = [
  'Recuerdo para el libro',
  'Enseñanza para el árbol',
  'Mensaje familiar',
  'Foto',
  'Video',
]

export function CollaboratePage() {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const file = form.get('media') as File | null
    const fileError = mediaController.validateMediaFile(file?.size ? file : null)

    if (fileError) {
      toast.error(fileError)
      return
    }

    if (form.get('consent') !== 'on') {
      toast.error('Debe confirmar el consentimiento para publicar.')
      return
    }

    setSubmitting(true)
    try {
      await messageController.submitContribution({
        name: String(form.get('name') ?? ''),
        relation: String(form.get('relation') ?? ''),
        contributionType: String(form.get('type') ?? ''),
        title: String(form.get('title') ?? ''),
        message: String(form.get('message') ?? ''),
        category: String(form.get('category') ?? ''),
      })
      event.currentTarget.reset()
      toast.success('Tu aporte fue recibido. Sera revisado antes de aparecer en PapaOS.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo enviar el aporte.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell eyebrow="COLABORAR" title="Enviar un aporte familiar">
      <form className="collab-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input name="name" required />
        </label>
        <label>
          Relacion con el
          <input name="relation" required />
        </label>
        <label>
          Tipo de aporte
          <select name="type" required>
            {contributionTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Titulo
          <input name="title" required />
        </label>
        <label className="wide">
          Mensaje o texto
          <textarea name="message" required rows={6} />
        </label>
        <label>
          Categoria
          <input name="category" placeholder="Familia, Macara, Vida..." />
        </label>
        <label>
          Foto o video opcional
          <input name="media" type="file" accept="image/jpeg,image/png,image/webp,video/mp4" />
        </label>
        <label className="checkbox wide">
          <input name="consent" type="checkbox" />
          <span>Confirmo que este aporte puede ser revisado para publicarse en PapaOS.</span>
        </label>
        <button className="primary-button wide" disabled={submitting} type="submit">
          {submitting ? 'Enviando...' : 'Enviar aporte'}
        </button>
        <p className="system-note wide">
          Todo aporte entra como pending. Nada se publica automaticamente.
        </p>
      </form>
    </PageShell>
  )
}
