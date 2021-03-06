import Link from "next/link"
import { FaGithub, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = ({ className, withTerms = true }) => {
  const classNames =
    "fixed z-10 bottom-0 left-0 w-full px-4 bg-stone-100 dark:bg-stone-900" +
    (className ? ` ${className}` : "")
  return (
    <div className={classNames}>
      <div className="mx-auto my-6 flex w-full max-w-screen-md justify-between">
        <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
          Evolution2Art &copy; 2022
        </p>
        {withTerms && (
          <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            <Link href="/legal">
              <a>Terms &amp; Conditions</a>
            </Link>
          </p>
        )}
        <div className="ml-4 flex gap-3">
          {/* <a
          href="https://twitter.com/evolution2art"
          target="_blank"
          rel="noreferrer"
          className="ml-4"
        >
          <Twitter width={20} height={20} />
        </a> */}
          <a
            href="https://facebook.com/evolution2art/"
            target="_blank"
            rel="noreferrer"
            className="ml-3 max-w-xs"
          >
            <FaFacebook width={20} height={20} />
          </a>
          <a
            href="https://www.instagram.com/evolution.2.art/"
            target="_blank"
            rel="noreferrer"
            className="ml-3"
          >
            <FaInstagram width={20} height={20} />
          </a>
          {/* <a
            href="https://github.com/Evolution2art/"
            target="_blank"
            rel="noreferrer"
            className="ml-3"
          >
            <FaGithub width={20} height={20} />
          </a> */}
        </div>
      </div>
    </div>
  )
}

export default Footer
