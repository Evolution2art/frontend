import NextImage from "./Image"
import Twitter from "./Svg/Twitter"
import Facebook from "./Svg/Facebook"
import Instagram from "./Svg/Instagram"
import Github from "./Svg/Github"

const Footer = () => {
  return (
    <div className="m-6 flex justify-between">
      <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
        Evolution2Art &copy; 2022
      </p>
      <div className="ml-4 flex gap-3">
        <a
          href="https://twitter.com/evolution2art"
          target="_blank"
          className="ml-4 max-w-xs"
        >
          <Twitter width={20} height={20} />
        </a>
        <a
          href="https://facebook.com/evolution2art/"
          target="_blank"
          className="ml-3"
        >
          <Facebook width={20} height={20} />
        </a>
        {/* <a
          href="https://facebook.com/evolution2art/"
          target="_blank"
          className="ml-3"
        >
          <Instagram width={20} height={20} />
        </a> */}
        <a
          href="https://github.com/Evolution2art/"
          target="_blank"
          className="ml-3"
        >
          <Github width={20} height={20} />
        </a>
      </div>
    </div>
  )
}

export default Footer
