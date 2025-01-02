import { Fragment } from 'react'

export function highlightText(text: string, searchTerm: string) {
  if (!searchTerm) return text

  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'))

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span className="bg-purple-600 text-white">{part}</span>
          ) : (
            part
          )}
        </Fragment>
      ))}
    </>
  )
}

