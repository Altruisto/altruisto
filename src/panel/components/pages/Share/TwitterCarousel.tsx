import React from "react"
import { CarouselProvider, Slider, Slide, Dot } from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"
import "./TwitterCarousel.scss"
import tweet1 from "../../../assets/tweet1.png"
import tweet2 from "../../../assets/tweet2.png"
import tweet3 from "../../../assets/tweet3.png"
import tweet4 from "../../../assets/tweet4.png"

// we load tweets as images instead of embedding them because we don't want to
// load external resources to a browser extension as it's a security risk
export const TwitterCarousel: React.FC = () => {
  return (
    <CarouselProvider
      naturalSlideWidth={245}
      naturalSlideHeight={240}
      totalSlides={4}
      isPlaying={true}
    >
      <Slider>
        <Slide index={0}>
          <div className="tweet" style={{ height: "201px" }}>
            <a
              href="https://twitter.com/sapinker/status/899723513627648001"
              target="_blank"
            >
              <img src={tweet1} />
            </a>
          </div>
        </Slide>
        <Slide index={1}>
          <div className="tweet" style={{ height: "241px" }}>
            <a
              href="https://twitter.com/Liv_Boeree/status/894597256384577537"
              target="_blank"
            >
              <img src={tweet2} />
            </a>
          </div>
        </Slide>
        <Slide index={2}>
          <div className="tweet" style={{ height: "239px" }}>
            <a
              href="https://twitter.com/PeterSinger/status/892286979030765568"
              target="_blank"
            >
              <img src={tweet3} />
            </a>
          </div>
        </Slide>
        <Slide index={3}>
          <div className="tweet" style={{ height: "239px" }}>
            <a
              href="https://twitter.com/clairlemon/status/993639143891615744"
              target="_blank"
            >
              <img src={tweet4} />
            </a>
          </div>
        </Slide>
      </Slider>
      <div className="twitter-carousel__dots">
        <Dot slide={0} className="twitter-carousel__dot">
          {" "}
        </Dot>
        <Dot slide={1} className="twitter-carousel__dot">
          {" "}
        </Dot>
        <Dot slide={2} className="twitter-carousel__dot">
          {" "}
        </Dot>
        <Dot slide={3} className="twitter-carousel__dot">
          {" "}
        </Dot>
      </div>
    </CarouselProvider>
  )
}
