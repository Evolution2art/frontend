import React from "react"
import ReactMarkdown from "react-markdown"
import { getStrapiURL } from "../utils/api"

const CMSContent = ({
  title,
  text,
  id,
  className = "prose-stone dark:prose-invert",
  titleClassName = "",
  image,
}) => {
  const classNames = `prose ${className}`
  return (
    <article id={id} className={`max-w-none p-8 ${classNames}`}>
      {image}
      {title && (
        <h2 className={`text-2xl font-light italic ${titleClassName}`}>
          {title}
        </h2>
      )}
      {text && (
        <ReactMarkdown transformImageUri={getStrapiURL}>{text}</ReactMarkdown>
      )}
    </article>
  )
}

export default CMSContent
