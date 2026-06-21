const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4']
const blockedExtensions = ['.exe', '.js', '.html', '.svg', '.zip', '.bat', '.cmd', '.php']

export function validateMediaFile(file?: File | null): string | null {
  if (!file) return null

  const lowered = file.name.toLowerCase()
  if (blockedExtensions.some((extension) => lowered.endsWith(extension))) {
    return 'Archivo no permitido. Solo se aceptan imagenes JPG, PNG, WEBP y videos MP4.'
  }

  if (!allowedTypes.includes(file.type)) {
    return 'Archivo no permitido. Solo se aceptan imagenes JPG, PNG, WEBP y videos MP4.'
  }

  if (file.type.startsWith('image/') && file.size > 5 * 1024 * 1024) {
    return 'La imagen supera el limite de 5 MB.'
  }

  if (file.type === 'video/mp4' && file.size > 50 * 1024 * 1024) {
    return 'El video supera el limite de 50 MB.'
  }

  return null
}
