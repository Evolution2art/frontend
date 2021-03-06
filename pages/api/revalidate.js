export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" })
  }

  const path = req.query.path
  try {
    // console.log("Calling unstable revalidate for path", path)
    await res.unstable_revalidate(`/${path}`)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    // console.log("Failed unstable revalidate for path", path)
    return res.status(500).send("Error revalidating")
  }
}
