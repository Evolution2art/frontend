import * as React from "react"

const DarkModeToggle = (props) => (
  <svg
    viewBox="0 0 64 64"
    width={32}
    height={32}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g className="star">
      <rect width="32" height="32" x="16" y="16" />
      <rect
        width="32"
        height="32"
        x="29.254833"
        y="-16"
        transform="rotate(45)"
      />
    </g>
    <circle className="bg" cx="32" cy="32" r="12" />
    <circle className="moon" cx="32" cy="32" r="9" />
  </svg>
)

export default DarkModeToggle
