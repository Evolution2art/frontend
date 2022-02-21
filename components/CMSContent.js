import React from "react"
import ReactMarkdown from "react-markdown"

const CMSContent = ({ title, text, id }) => {
  return (
    <article id={id} className="text-center mt-12 p-8">
      {title && <h2 className="text-xl p-4">{title}</h2>}
      {text && <ReactMarkdown>{text}</ReactMarkdown>}
    </article>
  )
}

export default CMSContent
