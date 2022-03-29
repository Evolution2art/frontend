import { useState } from "react"
import NextImage from "./Image"

const Slideshow = ({ items, renderer, navClassName, className, filler }) => {
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
      {items.length > 1 && (
        <div className="nav-wrapper">
          <nav
            className={`prev-next absolute z-10 flex h-full w-full justify-between ${navClassNames}`}
          >
            <a className="nav-previous h-full" onClick={previous}>
              <span className="arrow arrow-left"></span>
            </a>
            <a className="nav-next h-full" onClick={next}>
              <span className="arrow arrow-right"></span>
            </a>
          </nav>
          <nav className={`dots z-10 ${navClassNames}`}>
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
      <div className="slides relative w-full">
        {items.map((item, idx) => renderer(item, idx, current))}
        {filler ? (
          <div className="invisible relative -z-10">
            <NextImage media={filler} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Slideshow
