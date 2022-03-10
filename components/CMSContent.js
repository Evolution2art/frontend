import React from "react"
import ReactMarkdown from "react-markdown"

const CMSContent = ({ title, text, id, className }) => {
  const classNames =
    "prose prose-stone dark:prose-invert" + (className ? ` ${className}` : "")
  return (
    <article id={id} className={`max-w-none p-8 ${classNames}`}>
      {title && <h2>{title}</h2>}
      {text && <ReactMarkdown>{text}</ReactMarkdown>}
    </article>
  )
}

export default CMSContent
