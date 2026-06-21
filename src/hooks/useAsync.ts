import { useEffect, useState } from 'react'

export function useAsync<T>(loader: () => Promise<T>, fallback: T, refreshKey = 0) {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    loader()
      .then((result) => {
        if (active) setData(result)
      })
      .catch((caught: Error) => {
        if (active) setError(caught.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [loader, refreshKey])

  return { data, loading, error }
}
