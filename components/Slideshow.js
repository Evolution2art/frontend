import { useState } from "react"

import Achievement from "./Achievement"

const Slideshow = ({ items, render, navClassName, className }) => {
  const [current, setCurrent] = useState(0)

  const classNames = "slideshow" + (className ? ` ${className}` : "")
  const navClassNames =
    "slideshow-nav mx-auto flex justify-center gap-4" +
    (navClassName ? ` ${navClassName}` : "")

  const renderer =
    render ||
    function (item, idx, current) {
      const classNames = "slide" + (idx === current ? " active" : "")
      return (
        <Achievement
          key={`achievement_${idx}`}
          achievement={item}
          className={classNames}
        />
      )
    }

  return (
    <div className={classNames}>
      <div className="slides relative h-max w-full">
        {items.map((item, idx) => renderer(item, idx, current))}
      </div>
      {items.length > 1 && (
        <nav className={navClassNames}>
          {items.map((item, idx) => {
            const classNames = "slide-nav" + (idx === current ? " active" : "")
            return (
              <div
                className={classNames}
                key={`slide-nav-${idx}`}
                onClick={() => setCurrent(idx)}
              />
            )
          })}
        </nav>
      )}
    </div>
  )
}

export default Slideshow
