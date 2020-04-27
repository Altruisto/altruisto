import jQuery from "jquery"
import "bootstrap"
import "slick-carousel"
import "./bcswipe"
import "./handleA2HS"

;
(function ($) {
  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide")
  })

  $(".carousel").bcSwipe({
    threshold: 50
  })

  $(".tweets-carousel").slick({
    centerMode: true,
    autoplay: true,
    arrows: false,
    centerPadding: "120px",
    slidesToShow: 3,
    speed: 700,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      }
    ]
  })
})(jQuery)

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
}
