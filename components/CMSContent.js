import React from "react"
import ReactMarkdown from "react-markdown"
import { getStrapiURL } from "../utils/api"

const CMSContent = ({
  title,
  text,
  id,
  className = "prose-stone dark:prose-invert p-8",
  titleClassName = "text-2xl",
  image,
}) => {
  const classNames = `prose ${className}`
  return (
    <article id={id} className={`max-w-none ${classNames}`}>
      {image}
      {title && (
        <h2 className={`font-light italic ${titleClassName}`}>{title}</h2>
      )}
      {text && (
        <ReactMarkdown transformImageUri={getStrapiURL}>{text}</ReactMarkdown>
      )}
    </article>
  )
}

export default CMSContent
