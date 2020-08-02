import { useMemo } from "react"

export default ({ slice }) => {
    const { aligment, image, title1 } = slice.primary;
    const imageClassName = useMemo(():string => {
            switch (aligment[0].text) {
                case "left": return "blog__post-image__left";
                case "right": return "blog__post-image__right";
                default: return "blog__post-image__center";
            }
        }, [aligment[0].text]
    );
    
    return (
        <figure className={imageClassName}>
            <img
                className="blog-rounded mb-3"
                src={image.url}
                alt={image.alt}
            />
            {title1[0] && title1[0].text && (
                <figcaption>
                    {title1[0].text}
                </figcaption>
            ) }
        </figure>
    )
}