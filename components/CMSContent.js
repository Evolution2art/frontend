import React from "react"
import ReactMarkdown from "react-markdown"

const CMSContent = ({ title, text, anchor }) => {
  return (
    <div>
      {anchor && <a name={anchor} />}
      {title && <h4>{title}</h4>}
      {text && <ReactMarkdown>{text}</ReactMarkdown>}
    </div>
  )
}

export default CMSContent
