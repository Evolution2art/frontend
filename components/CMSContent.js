import React from "react"
import ReactMarkdown from "react-markdown"

const CMSContent = ({ title, text, id }) => {
  return (
    <article
      id={id}
      className="prose prose-stone mx-auto mt-12 max-w-none p-8 text-center dark:prose-invert"
    >
      {title && <h2>{title}</h2>}
      {text && <ReactMarkdown>{text}</ReactMarkdown>}
    </article>
  )
}

export default CMSContent
