'use client'

import { useEffect } from 'react'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <p className="body-primary">
        Oh no, Algo salió mal... ¿tal vez deberías recargar la página
      </p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
