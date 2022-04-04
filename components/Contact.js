import CMSContent from "./CMSContent"
import NextImage from "./Image"
import logo from "../public/Evolution2Art-logo.svg"

const Contact = ({ cms, id = "contact", className }) => {
  const background = cms?.background?.[0]
  const {
    title = "Contact",
    email = "info@evolution2art.com",
    phone = "+32 4xx xxx xxx",
  } = cms
  const classNames =
    "contact min-h-screen prose prose-invert text-white p-8 mx-auto max-w-screen-md w-full " +
    "flex flex-row justify-between items-start" +
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
        <div>
          <h2 className={`text-4xl font-light italic`}>{title}</h2>
          <p>
            By Email: <br />
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p>
            By Phone: <br />
            <a href={`tel:${phone?.replace(/[^\d+]/g, "")}`}>{phone}</a>
          </p>
        </div>
        <div className="ml-8 mt-24">
          <CMSContent
            text={cms.text}
            className="prose-invert mt-5 text-white"
          />
          <div className="dark ml-8">
            <NextImage
              src={logo}
              className="drop-shadow"
              width="300"
              height="330"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
