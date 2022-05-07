import CMSContent from "./CMSContent"
import NextImage from "./Image"
// import logoLight from "../public/Evolution2Art-logo-light.svg"
import logoDark from "../public/Evolution2Art-logo-dark.svg"

const Contact = ({ cms, id = "contact", className, theme = "light" }) => {
  const background = cms?.background?.[0]
  const {
    title = "Contact",
    email = "info@evolution2art.com",
    phone = "+32 4xx xxx xxx",
  } = cms
  const logo = logoDark
  const classNames =
    "contact min-h-screen prose prose-invert text-white p-8 max-w-screen-md w-full " +
    "flex flex-row flex-wrap justify-between items-center mx-auto" +
    (className ? ` ${className}` : "")
  return (
    <div className="relative w-full">
      {background && (
        <div className="bg-contact absolute h-full w-full">
          <NextImage
            media={background}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      )}
      <section className={classNames} id={id}>
        {/* <form
          onSubmit={handleSubmit}
          action="#"
          method="POST"
          className="w-1/2"
        >
          <dl>
            <dt className="mt-4">
              <label htmlFor="fullName">Full Name</label>
            </dt>
            <dd>
              <input
                id="fullName"
                type="text"
                className="w-full border-0 border-b-2 border-stone-200 bg-transparent focus:border-stone-200"
              />
            </dd>
            <dt className="mt-4">
              <label htmlFor="email">E-mail address</label>
            </dt>
            <dd>
              <input
                id="email"
                type="email"
                className="w-full border-0 border-b-2 border-stone-200 bg-transparent"
              />
            </dd>
            <dt className="mt-4">
              <label htmlFor="phone">Phone number</label>
            </dt>
            <dd>
              <input
                id="phone"
                type="tel"
                className="border-0 border-b-2 border-stone-200 bg-transparent"
              />
            </dd>
          </dl>
          <dt className="mt-4">
            <label htmlFor="message">Your message</label>
          </dt>
          <dd>
            <textarea
              id="message"
              className="h-48 w-full border-0 border-b-2 border-stone-200 bg-transparent"
            />
          </dd>
          <button type="submit">Send</button>
        </form> */}
        <div className="w-1/3 md:w-1/4">
          <h2 className={`mt-0 text-4xl font-light italic`}>{title}</h2>
          <p>
            By Email: <br />
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          {phone ? (
            <p>
              By Phone: <br />
              <a href={`tel:${phone?.replace(/[^\d+]/g, "")}`}>{phone}</a>
            </p>
          ) : null}
        </div>
        {/* <div className="dark w-1/3 md:w-1/4"></div> */}
        <div className="relative flex w-full justify-center md:w-1/2">
          <div className="absolute -top-full">
            <NextImage
              src={logo}
              className="drop-shadow"
              width="200"
              height="330"
            />
          </div>
          <CMSContent
            text={cms.text}
            className="prose-invert mt-16 text-white"
          />
        </div>
      </section>
    </div>
  )
}

export default Contact
