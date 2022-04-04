import { useEffect, useState } from "react"
import {
  MdFullscreen,
  MdFullscreenExit,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md"

const Slideshow = ({
  items,
  renderer,
  navClassName,
  className,
  filler,
  theme,
  keyName = "slide",
  fullscreen = false,
}) => {
  const [current, setCurrent] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDark, setIsDark] = useState(theme === "dark")

  const next = () => {
    setCurrent(current === items.length - 1 ? 0 : current + 1)
  }
  const previous = () => {
    setCurrent(current === 0 ? items.length - 1 : current - 1)
  }

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  const classNames =
    "slideshow" +
    (className ? ` ${className}` : "") +
    (isFullscreen ? " fullscreen" : "")
  const navClassNames =
    "slideshow-nav " + (navClassName ? ` ${navClassName}` : "")

  useEffect(
    () => setIsDark(items[current]?.isDark || theme !== "light"),
    [current]
  )
  // const isDark = items[current]?.isDark || theme !== "light"
  // const iconColor = isDark ? "text-stone-200" : "text-stone-800"

  return (
    <div className={classNames}>
      <div className="slides">
        {items.map((item, idx) => (
          <div
            key={`${keyName}-${idx}`}
            className={`slide absolute${idx === current ? " active" : ""}`}
          >
            {renderer(item, idx, current, isFullscreen)}
          </div>
        ))}
        {filler ? (
          <div className="filler invisible relative -z-10">
            {renderer(filler)}
          </div>
        ) : null}
      </div>
      {items.length > 1 && (
        <nav className={`nav-wrapper ${navClassNames}`}>
          <a className="nav-previous" onClick={previous}>
            <MdKeyboardArrowLeft
              className={`h-8 w-8 text-stone-${
                isFullscreen
                  ? isDark
                    ? "200"
                    : "800"
                  : "text-stone-800 dark:text-stone-200"
              } drop-shadow-md`}
            />
          </a>
          <div className="dots">
            {items.map((item, idx) => {
              const dotClassNames = `nav-dot drop-shadow-md ${
                idx === current ? " active" : ""
              }`
              return (
                <a
                  className={dotClassNames}
                  key={`nav-dot-${idx}`}
                  onClick={() => setCurrent(idx)}
                >
                  <span />
                </a>
              )
            })}
          </div>
          <a className="nav-next" onClick={next}>
            <MdKeyboardArrowRight
              className={`h-8 w-8 text-stone-${
                isFullscreen
                  ? isDark
                    ? "200"
                    : "800"
                  : "text-stone-800 dark:text-stone-200"
              } drop-shadow-md`}
            />
          </a>
        </nav>
      )}
      {fullscreen ? (
        <a className="toggle-fullscreen" onClick={toggleFullscreen}>
          {isFullscreen ? (
            <MdFullscreenExit
              className={`h-6 w-6 text-stone-${
                isDark ? "200" : "800"
              } drop-shadow-md`}
            />
          ) : (
            <MdFullscreen
              className={`h-6 w-6 text-stone-${
                isDark ? "200" : "800"
              } drop-shadow-md`}
            />
          )}
        </a>
      ) : null}
    </div>
  )
}

export default Slideshow
