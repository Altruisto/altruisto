export default ({ slice }) => {
    const quote = slice.primary.quote[0]
    if (!quote) {
        return null
    }

    const authorName = slice.primary["name_of_the_author"][0]
    const authorTitle = slice.primary["author_title"][0]
    const authorPortrait = slice.primary["name_of_the_author"]
    
    return <blockquote>
        <p>{quote.text}</p>
    </blockquote>
}