import { useState } from "react"

import Achievement from "./Achievement"

const Slideshow = ({ items }) => {
  const [current, setCurrent] = useState(0)

  return (
    <div className="slideshow w-full">
      <div className="slides relative w-full">
        {items.map((item, idx) => {
          const classNames = "slide" + (idx === current ? " active" : "")
          return (
            <Achievement
              key={`achievement_${idx}`}
              achievement={item}
              className={classNames}
            />
          )
        })}
      </div>
      <nav className="fixed flex w-full max-w-screen-md justify-center gap-4">
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
    </div>
  )
}

export default Slideshow
