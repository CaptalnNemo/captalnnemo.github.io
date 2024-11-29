const lightbox = GLightbox({
  touchNavigation: true,
});

let lastScrollTop = 0;
let isThrottled = false;

function onScroll(event) {
  // show/hide header when scroll down/up
  if (!isThrottled) {
    let st = $(window).scrollTop();
    if (st > lastScrollTop) {
      // Scrolling down
      $(".header").css("top", "-100%"); // Hide the header
    } else {
      // Scrolling up
      $(".header").css("top", "0");
    }
    lastScrollTop = st;
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, 50); // Throttle time in milliseconds
  }

  // scroll to section
  var scrollPos = $(document).scrollTop();
  $(".project-detail-menu a").each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("data-target"));
    if (refElement.position().top <= scrollPos + 148 && refElement.position().top + refElement.height() > scrollPos) {
      $(".project-detail-menu li a").removeClass("active");
      currLink.addClass("active");
    } else {
      currLink.removeClass("active");
    }
  });
}

$(document).ready(function () {
  $(document).on("scroll", onScroll);

  //smoothscroll
  $("a.scroll-to-anchor").on("click", function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $("a.scroll-to-anchor").removeClass("active");
    $(this).addClass("active");

    var target = $(this).data("target");
    $target = $(target);
    $("html, body")
      .stop()
      .scrollTop($target.offset().top - 140);
    setTimeout(function () {
      $(document).on("scroll", onScroll);
    }, 1000);
  });

  new WOW().init();

  $(".slider-wrapper").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});
