"use strict";

var bLazy = new Blazy({
  selector: ".lazyload",
  successClass: "lazyloaded",
  breakpoints: [{
    width: 1024,
    src: "data-src-small"
  }],
  success: function success(element) {}
});
jQuery(function () {
  $(window).resize(function () {
    bLazy.revalidate();
  });
  $(".facebook,.google").on("click", function () {
    var url = $(this).data("url");
    window.open(url, "popupWindow", "width=660,height=480,scrollbars=yes");
    return false;
  });
  $(".chat-trigger").on("click", function (e) {
    e.preventDefault();

    function loadJsAsync(t, e) {
      var n = document.createElement("script");
      n.type = "text/javascript", n.src = t, n.addEventListener("load", function (t) {
        e(null, t);
      }, !1);
      var a = document.getElementsByTagName("head")[0];
      a.appendChild(n);
    }

    loadJsAsync("https://webchat.caresoft.vn:8090/js/CsChat.js?v=4.0", function () {
      var t = {
        domain: "sakuravietnam",
        domainId: 5577
      };
      embedCsChat(t);
    });
  });
  $(".messenger-chat").on("click", function (e) {
    e.preventDefault();
  });
  $(".product-category-subnav-container").css({
    width: $(".home-1 .container").innerWidth() - 30 - $(".product-category").outerWidth()
  });
  $(".menu-mobile-toggle").on("click", function () {
    $(".mobile-menu").slideToggle();
    $(".backdrop").fadeToggle();
    $("body").toggleClass("overflow-hidden");
  });
  $(".product-detail-menu-toggle").on("click", function () {
    $(".mobile-menu").slideToggle();
    $(".backdrop").fadeToggle();
    $("body").toggleClass("overflow-hidden");
  });
  $(".backdrop").on("click", function () {
    $(this).fadeOut();
    $(".mobile-menu").slideUp();
    $("body").removeClass("overflow-hidden");
    $(".product-detail-buttons").slideDown();
    $(".product-detail-mobile-purchase").slideUp();
  });
  $(".filter-mobile-toggle").on("click", function () {
    $(".product-filter-wrap").slideToggle();
    $("body").toggleClass("overflow-hidden");
  });
  $(".cart-toggle").on("click", function () {
    $(".cart-dropdown").toggleClass("show");
    bLazy.revalidate();
    setTimeout(function () {
      $(".cart-dropdown.show").removeClass("show");
    }, 3000);
  });
  $(".cart-close").on("click", function () {
    $(".cart-dropdown").toggleClass("show");
  });
  $(".cart-empty-btn").on("click", function () {
    $(".cart-dropdown").removeClass("show");
  });
  $(".add-new-address").on("click", function (e) {
    e.preventDefault();
    $(".address-list").slideToggle("show");
  }); // $(".cart-dropdown.show").on("mouseleave", function () {
  // });

  $(".product-detail-promo-product-clone").appendTo($(".product-detail-promo-product"));
  $(".commentpanel").appendTo($(".detail-comment"));

  if ($(".news-detail-comment-section").length > 0) {
    $(".commentpanel").appendTo($(".news-detail-comment-section"));
  }

  if ($(".search-result-wrap").length > 0) {
    $("#ctl00_mainContent_pnlSearch").remove();
  } else {
    $(".search-page").addClass("search-page-empty");
  } // if($('.news-detail-comment-section').length < 1 || $(".detail-comment").length < 1) {
  //   $(".commentpanel").remove()
  // }


  $(document).on("click", function (e) {
    if ($(".cart-dropdown").has(e.target).length === 0 && $(".cart-toggle").has(e.target).length === 0 && $(".cart-close").has(e.target).length === 0) {
      $(".cart-dropdown").removeClass("show");
    }

    if ($(".productsearchbox").has(e.target).length === 0 && $(".suggestsearch").has(e.target).length === 0) {
      $(".suggestsearch").remove();
      $(".searchinput").val("");
    }
  });
  $(window).resize(function () {
    $(".product-category-subnav-container").css({
      width: $(".container").innerWidth() - 30 - $(".product-category").outerWidth()
    });
  });
  $("header").sticky({
    topSpacing: 0,
    zIndex: 1999
  });
  $("header").on("sticky-start", function () {
    $(".homepage .bottom-header").slideDown();
    $(".top-header").slideUp();
  });
  $("header").on("sticky-end", function () {
    $(".homepage .bottom-header").slideUp();
    $(".top-header").slideDown();
  });
  $(".back-to-top").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 2000);
  });

  if ($(window).width() < 1024) {
    $(".product-category-toggle").click(function () {
      window.location.assign("/danh-muc-san-pham");
    });
    $(".checkout-header").sticky({
      topSpacing: 0,
      zIndex: 1999
    });
  }

  if ($(".account ul li").length == 0) {
    $(".account ul").remove();
  } // $('.progress-title-active a').attr('href', '/gio-hang')


  $(".product-list-desc .view-more-desc").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({
      scrollTop: $(".product-list-more-desc").offset().top - $("header").height()
    }, 1000);
  });
  $(".product-list-more-desc .view-more-desc").on("click", function (e) {
    e.preventDefault();
    $(this).find("span").toggleText("Xem thêm", "Rút gọn");
    $(this).toggleClass("active");
    $(".product-list-more-desc .article-content").toggleClass("show");
  });
  $(".product-category-list > ul > li").on("mouseover", function () {
    bLazy.revalidate();
  });
  var bannerPromoSlider = new Swiper(".big-banner-promo .swiper-container", {
    pagination: {
      el: ".big-banner-promo .swiper-pagination",
      clickable: true
    },
    preloadImages: false,
    lazy: true,
    loop: true,
    navigation: {
      prevEl: ".big-banner-promo .swiper-btn-prev",
      nextEl: ".big-banner-promo .swiper-btn-next"
    }
  });
  var productBanner = new Swiper(".sub-banner .swiper-container", {
    pagination: {
      el: ".sub-banner .swiper-pagination",
      clickable: true
    },
    speed: 1700,
    autoplay: {
      delay: 4500
    },
    preloadImages: false,
    lazy: true
  });
  var dealProductSlider = new Swiper(".product-deal-slider .swiper-container", {
    spaceBetween: 20,
    pagination: {
      el: ".product-deal-pagination",
      clickable: true
    },
    navigation: {
      prevEl: ".product-deal-slider .swiper-btn-prev",
      nextEl: ".product-deal-slider .swiper-btn-next"
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 5
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 5
      },
      576: {
        slidesPerView: 2.5,
        spaceBetween: 5
      }
    }
  });
  var promoDetailSlider = new Swiper(".promo-product-slider .swiper-container", {
    spaceBetween: 5,
    pagination: {
      el: ".promo-product-slider .swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 4000
    },
    preloadImages: false,
    lazy: true,
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 3.5
      },
      576: {
        slidesPerView: 2.5
      }
    }
  });
  var promoProductSlider = new Swiper(".product-promo-wrapper .swiper-container", {
    slidesPerView: 4,
    slidesPerColumn: 2,
    breakpoints: {
      1280: {
        slidesPerView: 3.5
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 5,
        slidesPerColumn: 1
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 5,
        slidesPerColumn: 1
      },
      576: {
        slidesPerView: 2.5,
        spaceBetween: 5,
        slidesPerColumn: 1
      }
    }
  });
  var productSubnavSlider = new Swiper(".product-subnav-slider .swiper-container", {
    slidesPerView: 10,
    spaceBetween: 10,
    preloadImages: false,
    lazy: true,
    navigation: {
      prevEl: ".product-subnav-slider .swiper-btn-prev",
      nextEl: ".product-subnav-slider .swiper-btn-next"
    },
    breakpoints: {
      1024: {
        slidesPerView: 6
      },
      768: {
        slidesPerView: 5
      },
      576: {
        slidesPerView: 3.5
      }
    }
  });
  var dealerSwiper = new Swiper(".dealer-slider .swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    preloadImages: false,
    loop: true,
    lazy: true,
    navigation: {
      prevEl: ".dealer-slider .swiper-btn-prev",
      nextEl: ".dealer-slider .swiper-btn-next"
    }
  });
  var aboutSwiper = new Swiper(".about-1 .swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    preloadImages: false,
    loop: true,
    lazy: true,
    navigation: {
      prevEl: ".about-1 .swiper-btn-prev",
      nextEl: ".about-1 .swiper-btn-next"
    }
  });

  if ($(window).width() < 1025) {
    var tipHomeMobileSlider = new Swiper(".home-4 .swiper-container", {
      spaceBetween: 20,
      slidesPerView: 2.5,
      breakpoints: {
        576: {
          slidesPerView: 1.5
        }
      }
    });
    tipHomeMobileSlider.on("slideChange", function () {
      bLazy.revalidate();
    });
    var activeIndex = 0;

    if ($(".news-subnav-wrap .subnav-link.active").length > 0) {
      activeIndex = $(".news-subnav-wrap .subnav-link").index($(".active"));
      // console.log(activeIndex);
    }

    var newsSubnavMobileSlider = new Swiper(".news-subnav-wrap .swiper-container", {
      initialSlide: activeIndex,
      navigation: {
        prevEl: ".news-subnav-wrap .swiper-btn-prev",
        nextEl: ".news-subnav-wrap .swiper-btn-next"
      }
    });
  }

  $(".btn-comment").on("click", function (e) {
    e.preventDefault();
    $(".comment-form").slideToggle();
  });
  $("header").prepend($(".top-campaign-banner"));
  $(".campaign-banner-close").on("click", function () {
    $(".top-campaign-banner").remove();
  });
  $(document).ready(function () {
    $(".product-list-util select").niceSelect();
  });

  try {
    $(".rating").each(function () {
      var score = Number($(this).data("score").replace(/,/g, "."));
      $(".rating").raty({
        path: "/Data/Sites/1/skins/default/comment/images/",
        score: score,
        halfShow: true
      });
    });
  } catch (error) {}

  $('.vnpay-type-group-dropdown .vnpay-type-group-title').click(function () {
    $(this).next().slideToggle();
  });
  dealProductSlider.on("slideChange", function () {
    bLazy.revalidate();
  });
  promoProductSlider.on("slideChange", function () {
    bLazy.revalidate();
  });
  collapseInit();
  dealCountdown();
  productCategoryTab();
  productFilter();
  productPriceFilter();
  productDetail();
  ZoomImg();
  spinInput();
  productSlider();
  showHideContent();
  newsDetail();
  newsSlider();
  checkOut();
  supportScript();
  searchSuggestSize();
  sliderPartner();
});
$.fn.extend({
  toggleText: function toggleText(a, b) {
    return this.text(this.text() == b ? a : b);
  }
});

try {
  var productCategoryMapping = new MappingListener({
    selector: ".product-category-wrapper",
    mobileWrapper: ".mobile-menu-wrap",
    mobileMethod: "appendTo",
    desktopWrapper: ".site-feature-wrapper",
    desktopMethod: "insertBefore",
    breakpoint: 1024.98
  }).watch();
  var mainMenuMobileMapping = new MappingListener({
    selector: ".menu-wrapper",
    mobileWrapper: ".mobile-menu-wrap",
    mobileMethod: "appendTo",
    desktopWrapper: ".top-header-left",
    desktopMethod: "appendTo",
    breakpoint: 1024.98
  }).watch();
  var languageMobileMapping = new MappingListener({
    selector: ".language-wrapper",
    mobileWrapper: ".mobile-menu-tool",
    mobileMethod: "appendTo",
    desktopWrapper: ".header-util-list",
    desktopMethod: "prependTo",
    breakpoint: 1024.98
  }).watch();
  var hotLineMobileMapping = new MappingListener({
    selector: ".hotline-wrapper",
    mobileWrapper: ".mobile-menu-tool",
    mobileMethod: "appendTo",
    desktopWrapper: ".header-util-list",
    desktopMethod: "prependTo",
    breakpoint: 1024.98
  }).watch();
  var trackingMobileMapping = new MappingListener({
    selector: ".order-check-wrapper",
    mobileWrapper: ".mobile-menu-tool",
    mobileMethod: "appendTo",
    desktopWrapper: ".header-util-list",
    desktopMethod: "prependTo",
    breakpoint: 1024.98
  }).watch();
} catch (error) {}

$.fn.extend({
  toggleText: function toggleText(a, b) {
    return this.text(this.text() == b ? a : b);
  }
});

function collapseInit() {
  $(".collapse-trigger").on("click", function (e) {
    e.preventDefault();
    $(this).parent().siblings().find(".collapse-trigger").removeClass("active");
    $(this).parent().siblings().find(".collapse-target").slideUp();
    $(this).toggleClass("active");
    $(this).next().slideToggle();
    return false;
  });
}

function parseDate(date) {
  var dateInit = date;
  var datearray = dateInit.split(" ");
  var dateNeedFormat = datearray[0];
  var dateNeedFormatArray = dateNeedFormat.split(/\//);
  var dateAfterFormat = [dateNeedFormatArray[1], dateNeedFormatArray[0], dateNeedFormatArray[2]].join("/");
  return [dateAfterFormat, datearray[1]].join(" ");
}

function dealCountdown() {
  $(".deal-deadline-countdown").each(function () {
    var date = $(this).data("countdown");
    var formatDate = parseDate(date);
    $(this).countdown(formatDate, function (event) {
      $(this).html(event.strftime("<div class='count'><span class='number'>%-D</span><span class='unit'>Ngày</span></div>" + "<div class='count'><span class='number'>%H</span><span class='unit'>Giờ</span></div>" + "<div class='count'><span class='number'>%M</span><span class='unit'>Phút</span></div>" + "<div class='count'><span class='number'>%S</span><span class='unit'>Giây</span></div>"));
    });
  });
  $(".product-detail-countdown").each(function () {
    var date = $(this).data("countdown");
    var formatDate = parseDate(date);
    $(this).countdown(formatDate, function (event) {
      $(this).html(event.strftime("%-D ngày %H:%M:%S"));
    });
  });
  $(".flashsale-deadline").each(function () {
    var date = $(this).data("countdown");
    var formatDate = parseDate(date);
    $(this).countdown(formatDate, function (event) {
      $(this).html(event.strftime("%-D ngày %H:%M:%S"));
    });
  });
}

function productCategoryTab() {
  $(".product-category-list").each(function (index, element) {
    $(element).find(".category-tab ul li").each(function (i, eleTrigger) {
      var parentTrigger = $(eleTrigger);
      var btnTrigger = $(eleTrigger).find("a");
      btnTrigger.on("click", function () {
        $(element).find(".category-tab ul li").removeClass("active");
        $(parentTrigger).addClass("active");
        $(element).find(".product-category-tab").removeClass("show");
        $(element).find(".product-category-tab").eq(i).addClass("show");
        bLazy.revalidate();
      });
    });
  });
}

function productFilter() {
  var triggerBtn = $(".product-filter-title");
  var content = $(".product-filter-body");
  $(document).on("click", ".product-filter-title", function () {
    $(this).parent().siblings().find(".product-filter-body").slideUp();
    $(this).parent().siblings().find(".product-filter-title").removeClass("active");

    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      $(this).next().slideDown();
    } else {
      $(this).removeClass("active");
      $(this).next().slideUp();
    }
  });
  $(".filter-close").on("click", function () {
    $(".product-filter-wrap").slideUp();
    $("body").removeClass("overflow-hidden");
  });
  $(".filter-view-more").on("click", function (e) {
    e.preventDefault();
    var $parent = $(this).parents(".product-filter-group");
    $parent.find("ul li:nth-child(n + 11)").slideToggle();
    $(this).find("em").toggleClass("ri-arrow-down-s-fill ri-arrow-up-s-fill");
    $(this).find("strong").toggleText("Xem thêm", "Rút Gọn");
  });
}

function productPriceFilter() {
  var maxPrice = parseInt($(".price-price-slider").data("max"));
  $(".price-price-slider").slider({
    range: true,
    min: 0,
    max: maxPrice,
    values: [0, maxPrice],
    step: 50000,
    slide: function slide(event, ui) {
      $(".price-filter-text-min").text(getNumberWithCommas(ui.values[0]) + " đ");
      $(".price-filter-text-max").text(getNumberWithCommas(ui.values[1]) + " đ");
    },
    change: function change(event, ui) {}
  });
  $(".price-filter-text-min").text(getNumberWithCommas($(".price-price-slider").slider("values", 0)) + " đ");
  $(".price-filter-text-max").text(getNumberWithCommas($(".price-price-slider").slider("values", 1)) + " đ");
  $(".price-filter-input-btn").on("click", function (e) {
    e.preventDefault();
    var inputPriceMax = parseInt($(".price-filter-input-max").val());
    var inputPriceMin = parseInt($(".price-filter-input-min").val());

    if (isNaN(inputPriceMin)) {
      inputPriceMin = 0;
    }

    if (isNaN(inputPriceMax)) {
      inputPriceMax = maxPrice;
    }

    if (inputPriceMin < inputPriceMax && inputPriceMax <= maxPrice) {
      $(".price-price-slider").slider("values", 0, inputPriceMin);
      $(".price-price-slider").slider("values", 1, inputPriceMax);
      $(".price-filter-text-min").text(getNumberWithCommas(inputPriceMin) + " đ");
      $(".price-filter-text-max").text(getNumberWithCommas(inputPriceMax) + " đ");
    }
  });
}

function getNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function productDetail() {
  if ($(window).width() > 1024) {
    var productDetailThumbnail = new Swiper(".product-detail-thumbnail .swiper-container", {
      preloadImages: false,
      lazy: true,
      slidesPerView: 5,
      spaceBetween: 5,
      observer: true,
      observeParents: true,
      scrollbar: {
        el: '.product-detail-thumbnail .swiper-scrollbar',
        draggable: true
      },
      breakpoints: {
        576: {
          slidesPerView: 4
        }
      }
    });
  }

  var productDetailImages = new Swiper(".product-detail-images .swiper-container", {
    observer: true,
    observeParents: true,
    preloadImages: false,
    lazy: true,
    navigation: {
      prevEl: ".product-detail-images .swiper-btn-prev",
      nextEl: ".product-detail-images .swiper-btn-next"
    },
    on: {
      slideChangeTransitionEnd: function slideChangeTransitionEnd() {
        ZoomImg();
      }
    },
    thumbs: {
      swiper: productDetailThumbnail
    },
    pagination: {
      el: ".product-detail-images .swiper-slide-count",
      type: "fraction"
    }
  });
  $(".product-detail-nav .choose-buy").on("click", function (e) {
    e.preventDefault();
    $(".product-detail-buttons").slideUp();
    $(".product-detail-mobile-purchase").slideDown();
    $(".backdrop").fadeIn();
  });
}

function newsDetail() {
  var productMiddleSlider = new Swiper(".news-detail-middle-product-slider .swiper-container", {
    preloadImages: false,
    lazy: true,
    slidesPerView: 2,
    navigation: {
      prevEl: ".news-detail-middle-product-slider  .swiper-btn-prev",
      nextEl: ".news-detail-middle-product-slider  .swiper-btn-next"
    }
  });
}

function ZoomImg() {
  if ($(window).width() > 1024) {
    var size = $(".product-detail-info-container .col-lg-4").width() + $(".product-detail-info-container .col-lg-3").width() + parseFloat($(".product-detail-info-container .col-lg-3").css("padding-left")) * 2 + 2;
    $(".swiper-slide-active .zoom-img").ezPlus({
      gallery: "gallery_01",
      cursor: "pointer",
      galleryActiveClass: "active",
      imageCrossfade: true,
      loadingIcon: "http://www.elevateweb.co.uk/spinner.gif",
      zoomWindowWidth: size,
      zoomWindowHeight: size,
      borderSize: "1",
      borderColour: "#e5e5e5"
    });
  }
}

function spinInput() {
  $(".spin-btn").click(function () {
    var $button = $(this);
    var type = $(this).data("spin");
    var oldValue = $button.parent().find("input").val();

    if (type == "inc") {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }

    $button.parent().find("input").val(newVal);
    AjaxCart.updatecart();
  });
}

function productSlider() {
  $(".product-slider").each(function (index) {
    var $this = $(this);

    if ($(this).data("slides") !== undefined) {
      var initSlide = $(this).data("slides");
    } else {
      var initSlide = 5;
    }

    $this.addClass("product-slider-" + index);
    $this.find(".swiper-btn-prev").addClass("product-slider-prev-" + index);
    $this.find(".swiper-btn-next").addClass("product-slider-next-" + index);
    var productSlider = new Swiper(".product-slider-" + index + " .swiper-container", {
      slidesPerView: initSlide,
      navigation: {
        prevEl: ".product-slider-prev-" + index,
        nextEl: ".product-slider-next-" + index
      },
      preloadImages: false,
      lazy: true,
      breakpoints: {
        1024: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 5
        },
        576: {
          slidesPerView: 2.5,
          spaceBetween: 5
        }
      }
    });
  });
}

function newsSlider() {
  $(".news-slider").each(function (index) {
    var $this = $(this);

    if ($(this).data("slides") !== undefined) {
      var initSlide = $(this).data("slides");
    } else {
      var initSlide = 3;
    }

    $this.addClass("news-slider-" + index);
    $this.find(".swiper-btn-prev").addClass("news-slider-prev-" + index);
    $this.find(".swiper-btn-next").addClass("news-slider-next-" + index);
    var newsSlider = new Swiper(".news-slider-" + index + " .swiper-container", {
      slidesPerView: initSlide,
      navigation: {
        prevEl: ".news-slider-prev-" + index,
        nextEl: ".news-slider-next-" + index
      },
      spaceBetween: 30,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        576: {
          slidesPerView: 1.5,
          spaceBetween: 20
        }
      }
    });
  });
}

function checkOut() {
  $(".cart-product-list-heading input").on("click", function () {
    $(".cart-product-list-body input:checkbox").prop("checked", this.checked);
  });
  $(".progress-title-active .text").text($(".progress-item.active .text").text());
  $(".issueInvoice").on("click", function () {
    $(".checkout-issue-invoice-wrap .card-body").slideToggle();
  });

  if ($(".checkout-button").length > 0) {
    $(".checkout-button").append($(".cart-group-button"));
  }

  if ($(".Module").length > 0) {
    $(".checkout-payment-wrap").after($(".checkout-issue-invoice-wrap"));
  } // var pointMax = Number($(".point-slider-wrap").find(".point-max").text());
  // $(".point-slider").slider({
  //   max: pointMax,
  //   min: 0,
  //   step: 1,
  //   slide: function (event, ui) {
  //     $("#usedPoints").text(ui.value);
  //   },
  // });
  // $("#pointInput").on("keyup", function () {
  //   let val = $(this).val();
  //   if (!isNaN(val) && val <= pointMax) {
  //     $(".point-slider").slider("value", val);
  //     $("#usedPoints").text(val);
  //   }
  // });


  try {
    var checkoutTotalPrice = new MappingListener({
      selector: ".cart-summary-total-price",
      mobileWrapper: ".cart-group-button",
      mobileMethod: "prependTo",
      desktopWrapper: ".cart-summary-price",
      desktopMethod: "appendTo",
      breakpoint: 768.98
    }).watch();
  } catch (error) {}
}

function searchSuggestSize() {
  if ($(window).width() > 1024) {
    $(".suggestsearch").css({
      width: $(".searchbox").outerWidth() + $(".middle-header .col-lg-1").outerWidth() + $(".middle-header .col-lg-2").outerWidth() + 1
    });
    $(window).resize(function () {
      $(".suggestsearch").css({
        width: $(".searchbox").outerWidth() + $(".middle-header .col-lg-1").outerWidth() + $(".middle-header .col-lg-2").outerWidth()
      });
    });
  }
}

function supportScript() {
  var sidenavItems = [];
  $(".support-sidenav-desktop a").each(function (index, element) {
    var text = $(element).text();
    var href = $(element).attr("href");
    var active = $(element).parent().hasClass("active");
    sidenavItems.push({
      text: text,
      link: href,
      active: active
    });
  });
  $.each(sidenavItems, function (indexInArray, valueOfElement) {
    var option = $("<option>" + valueOfElement.text + "</option>").attr("value", valueOfElement.link);

    if (valueOfElement.active) {
      option.attr("selected", valueOfElement.active);
    }

    $(".support-sidenav-mobile select").append(option);
  });
  $(".support-sidenav-mobile select").on("change", function () {
    var href = $(this).val();
    window.location.assign(href);
  });
}

function sliderPartner() {
  var sliderPartner = new Swiper(".slider-partner .swiper-container", {
    slidesPerView: 6,
    spaceBetween: 30,
    preloadImages: false,
    lazy: true,
    loop: true,
    autoplay: {
      delay: 2000
    },
    navigation: {
      prevEl: ".slider-partner .swiper-btn-prev",
      nextEl: ".slider-partner .swiper-btn-next"
    },
    breakpoints: {
      1280: {
        slidesPerView: 5
      },
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 3
      },
      576: {
        slidesPerView: 2
      }
    }
  });
}

function showHideContent() {
  var target = $(".show-hide-content");
  var btnTrigger = $(".btn-show-content");

  if (target.innerHeight() > 750) {
    target.addClass("hide");
  } else {
    btnTrigger.hide();
  }

  $(btnTrigger).on("click", function () {
    $(target).toggleClass("hide");
    $(this).toggleClass("active");
    $(this).find("em").toggleClass("ri-arrow-down-s-fill ri-arrow-up-s-fill");
    $(this).find("span").toggleText("Xem thêm", "Rút Gọn");
  });
}
//# sourceMappingURL=main.min.js.map
