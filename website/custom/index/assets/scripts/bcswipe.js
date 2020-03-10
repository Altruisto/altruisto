import jQuery from "jquery"
import "bootstrap"

/*! Bootstrap Carousel Swipe jQuery plugin v1.1 | https://github.com/maaaaark/bcSwipe | MIT License */
;
(function (t) {
  t.fn.bcSwipe = function (e) {
    var n = {
      threshold: 50
    };
    return e && t.extend(n, e), this.each(function () {
      function e(t) {
        1 == t.touches.length && (u = t.touches[0].pageX, c = !0, this.addEventListener("touchmove", i, !1))
      }

      function i(e) {
        if (c) {
          var i = e.touches[0].pageX,
            r = u - i;
          if (Math.abs(r) >= n.threshold) {
            if (h(), o(t(this))) return;
            r > 0 ? t(this).carousel("next") : t(this).carousel("prev")
          }
        }
      }

      function o(t) {
        return t.find(".item.active").length < 1
      }

      function h() {
        this.removeEventListener("touchmove", i), u = null, c = !1
      }
      var u, c = !1;
      "ontouchstart" in document.documentElement && this.addEventListener("touchstart", e, !1)
    }), this
  }
})(jQuery);