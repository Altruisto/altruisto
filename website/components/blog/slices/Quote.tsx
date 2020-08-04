export default ({ slice }) => {
  const quote = slice.primary.quote[0]
  if (!quote) {
    return null
  }

  const authorPortrait = slice.primary["portrait_author"]
  const authorName = slice.primary["name_of_the_author"][0]
  const authorTitle = slice.primary["author_title"][0]

  return (
    <blockquote className="text-center blog__post-quote-wrapper">
      <p className="text-gradient font-weight-normal mb-5 blog__post-quote-text">{quote.text}</p>
      {authorPortrait ? (
        <img className="rounded-circle" src={authorPortrait.url} width="48" height="48" />
      ) : null}
      {authorName ? <p className="mb-0">{authorName.text}</p> : null}
      {authorTitle ? <small>{authorTitle.text}</small> : null}
    </blockquote>
  )
}
