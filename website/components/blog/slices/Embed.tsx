import { useMemo, useCallback } from "react"

export default ({ slice }) => {
    const switchEmbedSizeToCssClass = useCallback(
        iFrameHtml => iFrameHtml
            .replace(/width.*?" /g, "")
            .replace(/height.*?" /g, "class=\"blog__post-embed\" "),
        []
    );

    const embedHTML = useMemo(
        () => switchEmbedSizeToCssClass(slice.primary.embed.html),
        [slice.primary.embed.html]
    )
    
    return (
        <p dangerouslySetInnerHTML={{ __html: embedHTML }} />
    )
}