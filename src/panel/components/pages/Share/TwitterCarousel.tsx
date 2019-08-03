import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  Dot
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { TwitterTweetEmbed } from "react-twitter-embed";
import "./TwitterCarousel.scss";

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
          <div className="tweet">
            <TwitterTweetEmbed
              tweetId={"899723513627648001"}
              options={{
                cards: "hidden",
                dnt: true
                // lang="en" add for multilanguage support
              }}
            />
          </div>
        </Slide>
        <Slide index={1}>
          <div className="tweet">
            <TwitterTweetEmbed
              tweetId={"894597256384577537"}
              options={{
                cards: "hidden",
                dnt: true
                // lang="en" add for multilanguage support
              }}
            />
          </div>
        </Slide>
        <Slide index={2}>
          <div className="tweet">
            <TwitterTweetEmbed
              tweetId={"892286979030765568"}
              options={{
                cards: "hidden",
                dnt: true
                // lang="en" add for multilanguage support
              }}
            />
          </div>
        </Slide>
        <Slide index={3}>
          <div className="tweet">
            <TwitterTweetEmbed
              tweetId={"993639143891615744"}
              options={{
                cards: "hidden",
                dnt: true
                // lang="en" add for multilanguage support
              }}
            />
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
  );
};
