import CMSContent from "./CMSContent"
import NextImage from "./Image"

const Contact = ({ cms, id = "contact", className }) => {
  const handleSubmit = (e) => {
    console.log("handleSubmit event", e)
  }
  const background = cms?.background?.[0]
  const classNames =
    "contact prose prose-invert text-white p-8 mx-auto max-w-screen-md w-full flex items-center justify-center" +
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
        <form
          onSubmit={handleSubmit}
          action="#"
          method="POST"
          className="w-1/2"
        >
          <h2 className="text-4xl font-light italic">{cms.title}</h2>
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
        </form>
        <CMSContent text={cms.text} className="prose-invert w-1/2 text-white" />
      </section>
    </div>
  )
}

export default Contact
