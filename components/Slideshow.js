import { useState } from "react"
import PropTypes from "prop-types"

import Achievement from "./Achievement"

const Slideshow = ({ items, render, navClassName, className }) => {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current === items.length - 1 ? 0 : current + 1)
  }
  const previous = () => {
    setCurrent(current === 0 ? items.length - 1 : current - 1)
  }

  const classNames = "slideshow" + (className ? ` ${className}` : "")
  const navClassNames =
    "slideshow-nav mx-auto flex justify-center gap-4" +
    (navClassName ? ` ${navClassName}` : "")

  return (
    <div className={classNames}>
      <div className="slides relative w-full">
        {items.map((item, idx) => render(item, idx, current))}
      </div>
      {items.length > 1 && (
        <div className="nav-wrapper">
          <nav className="prev-next absolute top-0 flex h-full w-full justify-between">
            <a className="nav-previous h-full" onClick={previous}>
              <span class="arrow arrow-left"></span>
            </a>
            <a className="nav-next h-full" onClick={next}>
              <span class="arrow arrow-right"></span>
            </a>
          </nav>
          <nav className={`dots ${navClassNames}`}>
            {items.map((item, idx) => {
              const classNames =
                "slide-nav" + (idx === current ? " active" : "")
              return (
                <a
                  className={classNames}
                  key={`slide-nav-${idx}`}
                  onClick={() => setCurrent(idx)}
                ></a>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}

Slideshow.propTypes = {
  render: { type: PropTypes.func, required: true },
}

export default Slideshow
