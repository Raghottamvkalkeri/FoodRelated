function is_touch_device() {
  try {
    KeyCheck;
    return document.createEvent("TouchEvent"), !0;
  } catch (e) {
    return !1;
  }
}

function estimateShipping(e) {
  $("img.estimate-shipping-loading-spinner").show();
  var t = $(e).closest("form.estimate-shipping-form");
  $.post("merchant.mvc", $(t).serialize() + "&AJAX_SERT=1").done(function (e) {
    (e = $.trim(e)),
      $("img.estimate-shipping-loading-spinner").hide(),
      $("#shipping-estimate-modal form.estimate-shipping-form").hide(),
      $("#shipping-estimate-modal div.modal-body").append(e);
  });
}

function alignModal() {
  $(".modal").each(function () {
    if ($(this).is(":visible")) {
      var e = $(this).find(".modal-dialog");
      e.css("margin-top", Math.max(0, ($(window).height() - e.height()) / 2));
    }
  }),
    $(".custompopup").each(function () {
      if ($(this).is(":visible")) {
        var e = $(this);
        e.css("margin-top", Math.max(0, ($(window).height() - e.height()) / 2));
      }
    });
}

function zoomImagePositioningHandler() {
  if ($("#closeup_div img:visible").length > 0) {
    clearInterval(zoomImagePositioningInterval);
    var e =
        0.95 *
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      t =
        0.95 *
        Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ),
      a = $("#closeup_div"),
      o = $(a).outerWidth(),
      i = $(a).outerHeight();
    if (o > e) {
      var n = (i * e) / o;
      (o = e), (i = n);
    }
    if (i > t) (o = (o * t) / i), (i = t);
    $(a).css({
      width: o + "px",
      height: i + "px",
    });
    var s = 0 - o / 2,
      r = 0 - i / 2;
    $(a).css({
      position: "fixed",
      top: "50%",
      left: "50%",
      "margin-left": s + "px",
      "margin-top": r + "px",
    });
  }
}

function validateShippingAddressForPOBox() {
  if (
    ("undefined" == typeof poBoxErrorAlreadyShown &&
      (poBoxErrorAlreadyShown = !1),
    !poBoxErrorAlreadyShown)
  ) {
    var e = $.trim($("body.OCST #ShipAddress1").val()),
      t = $.trim($("body.OCST #ShipAddress2").val()),
      a = /P\s*\.*\s*O\s*\.*\s*BOX/i;
    a.test(e) || a.test(t)
      ? ((poBoxErrorAlreadyShown = !0),
        $("#new_globalerrorpopup .gpoperror").html(
          "We are not able to ship to PO Boxes. Please re-enter a regular STREET ADDRESS."
        ),
        $("#new_globalerrorpopup").modal("show"))
      : (poBoxErrorAlreadyShown = !1);
  }
}

function bindWholesaleRegistrationFormHandlers() {
  replaceStateAndCountrySelectPlaceholders(),
    $(".ws-reg-form").submit(function () {
      return validateWholesaleRegistrationForm();
    }),
    $(
      ".ws-reg-form-row input, .ws-reg-form-row select, .ws-reg-form-row textarea"
    ).blur(function () {
      realtimeValidateFieldWithPopover(this);
    }),
    $(".ws-reg-form-row input, .ws-reg-form-row textarea").keyup(function () {
      clearPopoverErrorMessage(this);
    }),
    $(".ws-reg-form-row select").change(function () {
      clearPopoverErrorMessage(this);
    }),
    $(".ws-reg-form-hide-bill-to-checkbox").change(function () {
      wholesaleSameAsShipToCheckboxChange();
    }),
    $(".ws-reg-form-hide-bill-to-checkbox").trigger("change");
}

function replaceStateAndCountrySelectPlaceholders() {
  var e = $("#Customer_ShipStateSelect").find('option[value=""]');
  $(e).text("State"),
    (e = $("#Customer_BillStateSelect").find('option[value=""]')),
    $(e).text("State"),
    (e = $("#Customer_ShipCountry").find('option[value=""]')),
    $(e).text("Country"),
    (e = $("#Customer_BillCountry").find('option[value=""]')),
    $(e).text("Country"),
    $(
      "#Customer_ShipStateSelect, #Customer_BillStateSelect, #Customer_ShipCountry, #Customer_BillCountry"
    )
      .val("")
      .addClass("required");
}

function realtimeValidateFieldWithPopover(e) {
  var t = $(e).closest(".ws-reg-form-row");
  if ($(e).hasClass("required"))
    if (0 == $(e).val().length) {
      if (0 == $(t).find(".ws-reg-form-error-popover").length) {
        if ($(e).is("select"))
          var a =
            '<div class="ws-reg-form-error-popover">' +
            $(e).find('option[value=""]').text() +
            "</div>";
        else
          a =
            '<div class="ws-reg-form-error-popover">' +
            $(e).attr("placeholder") +
            "</div>";
        $(t).append(a),
          $(t).find(".ws-reg-form-error-popover").fadeIn(1e3),
          $(t).addClass("invalid");
      }
    } else
      $(t).removeClass("invalid"),
        $(t).find(".ws-reg-form-error-popover").fadeOut(1e3),
        setTimeout(function () {
          $(t).find(".ws-reg-form-error-popover").remove();
        }, 1e3);
}

function clearPopoverErrorMessage(e) {
  var t = $(e).closest(".ws-reg-form-row");
  $(e).val().length > 0 &&
    ($(t).removeClass("invalid"),
    $(t).find(".ws-reg-form-error-popover").fadeOut(1e3),
    setTimeout(function () {
      $(t).find(".ws-reg-form-error-popover").remove();
    }, 1e3));
}

function wholesaleSameAsShipToCheckboxChange() {
  var e = $(".ws-reg-form-hide-bill-to-checkbox"),
    t = $(e).closest(".ws-reg-form-section");
  $(e).is(":checked")
    ? ($(t).addClass("same-as-shipping"),
      $(t).find('input[type="text"]').val(""),
      $(t).find("select").val(""))
    : $(t).removeClass("same-as-shipping");
}

function validateWholesaleRegistrationForm() {
  var e = [],
    t = $(
      '.ws-reg-form input[type="text"].required, .ws-reg-form input[type="email"].required, .ws-reg-form input[type="password"].required, .ws-reg-form select.required, .ws-reg-form textarea.required'
    ),
    a = $(".ws-reg-form-hide-bill-to-checkbox");
  if ($(a).is(":checked")) var o = !0;
  else o = !1;
  for (i = 0; i < t.length; i++)
    0 == $(t[i]).val().length &&
      ((o && 0 != $(t[i]).closest(".bill-to-fields").length) || e.push(t[i]));
  if (0 == e.length) return !0;
  for (i = 0; i < e.length; i++) realtimeValidateFieldWithPopover(e[i]);
  return !1;
}

function fieldlabelCheck() {
  /*$(".hidetextlabel")
    .find("input")
    .each(function () {
      "" != $(this).val()
        ? $(this).closest(".form_row").find("label").hide()
        : $(this).closest(".form_row").find("label").show();
    }),
    $(".hidetextlabel")
      .find("textarea")
      .each(function () {
        "" != $(this).val()
          ? $(this).closest(".form_row").find("label").hide()
          : $(this).closest(".form_row").find("label").show();
      }),
    $(".hidetextlabel")
      .find("select")
      .each(function () {
        "" != $("option:selected", this).val()
          ? $(this).closest(".form_row").find("label").hide()
          : $(this).closest(".form_row").find("label").show();
      });*/
}

function getParameterByName(e) {
  var t = RegExp("[?&]" + e + "=([^&]*)").exec(window.location.search);
  return t && decodeURIComponent(t[1].replace(/\+/g, " "));
}
is_touch_device() && $("body").addClass("touch"),
  (function (e) {
    e.fn.shorten = function (t) {
      var a = {
        showChars: 100,
        ellipsesText: "...",
        moreText: "more",
        lessText: "less",
      };
      return (
        t && e.extend(a, t),
        e(document).off("click", ".morelink"),
        e(document).on(
          {
            click: function () {
              var t = e(this);
              return (
                t.hasClass("less")
                  ? (t.removeClass("less"), t.html(a.moreText))
                  : (t.addClass("less"), t.html(a.lessText)),
                t.parent().prev().toggle(),
                t.prev().toggle(),
                !1
              );
            },
          },
          ".morelink"
        ),
        this.each(function () {
          var t = e(this);
          if (!t.hasClass("shortened")) {
            t.addClass("shortened");
            var o = t.html();
            if (o.length > a.showChars) {
              var i = o.substr(0, a.showChars),
                n = o.substr(a.showChars, o.length - a.showChars),
                s =
                  i +
                  '<span class="moreellipses">' +
                  a.ellipsesText +
                  ' </span><span class="morecontent"><span>' +
                  n +
                  '</span> <a href="#" class="morelink">' +
                  a.moreText +
                  "</a></span>";
              t.html(s), e(".morecontent span").hide();
            }
          }
        })
      );
    };
  })(jQuery),
  setInterval(function () {
    alignModal();
  }, 1e3),
  fieldlabelCheck(),
  $(document).ready(function (e) {
    $(".checkoutloginClick").click(function () {
      $("#minibsks").hide();
    });
    getParameterByName("scrollto") &&
      setTimeout(function () {
        window.scrollTo(0, getParameterByName("scrollto"));
      }, 1e3),
      e("#shipping_fields .form_row label").click(function () {
        // fieldlabelCheck(), e(this).hide();
      }),
      e(".hidetextlabel input")
        .focusin(function () {
          // e(this).closest(".form_row").find("label").hide();
        })
        .focusout(function () {
          fieldlabelCheck();
        }),
      e(".hidetextlabel textarea")
        .focusin(function () {
          // e(this).closest(".form_row").find("label").hide();
        })
        .focusout(function () {
          fieldlabelCheck();
        }),
      e(".hidetextlabel select")
        .change(function () {
          // e(this).closest(".form_row").find("label").hide();
        })
        .focusout(function () {
          fieldlabelCheck();
        });
    var t = e(window).width();
    "ontouchstart" in document
      ? e("body").removeClass("no-touch")
      : e("body").addClass("no-touch"),
      t < 1024
        ? e("body").removeClass("no-touch")
        : e("body").addClass("no-touch"),
      e(window).resize(function () {
        var t = e(window).width();
        t < 1024
          ? (e("body").removeClass("no-touch"),
            e(".global-header-wrapper").removeClass("sticky"),
            e(".sticky-header-categories").removeClass("active"))
          : e("body").addClass("no-touch"),
          t > 768 &&
            (e("body").removeClass("overflow"),
            e("#navigation-bar").removeClass("active"));
      }),
      e(
        ".navigation-links span.parentnavlinks, .navigation-links>.fa-angle-right"
      ).click(function (t) {
        t.stopPropagation();
        var a = e(window).width();
        if (a >= 1170) {
          var o = e(this).parent().attr("data-link");
          window.location = o;
        } else if (a < 1025 && a > 767)
          if (e("body").hasClass("sticky"));
          else if (e(this).parent().children().hasClass("sub-menu"))
            if (e(this).parent().hasClass("drop-down")) {
              o = e(this).parent().attr("data-link");
              window.location = o;
            } else
              e(this).parent().siblings().removeClass("drop-down"),
                e(this).parent().addClass("drop-down");
          else {
            o = e(this).parent().attr("data-link");
            window.location = o;
          }
        else if (
          (e(this).parent().siblings().removeClass("active"),
          e(this).parent().addClass("active"),
          e(this).parent().children().hasClass("sub-menu"))
        )
          e("#navigation-bar").addClass("submenu-active");
        else {
          o = e(this).parent().attr("data-link");
          window.location = o;
        }
      }),
      e("body").click(function (t) {
        var a = e(window).width();
        "navigation-wrapper" !== t.target.className &&
          a < 1025 &&
          a > 767 &&
          e(".navigation-links").siblings().hasClass("drop-down") &&
          e(".navigation-links").siblings().removeClass("drop-down");
      }),
      e(".fa-angle-left").click(function () {
        e("#navigation-bar").removeClass("submenu-active");
      }),
      e(".sub-menu").each(function () {
        e(this)
          .find(".column-one")
          .wrapAll('<div class="column-one-wrapper" />'),
          e(this)
            .find(".column-two")
            .wrapAll('<div class="column-two-wrapper" />');
      }),
      e(window).scroll(function () {
        var t = e(window).width();
        if (e("#navigation-bar").length) {
          e("#navigation-bar").scrollTop(), e("#navigation-bar").offset().top;
          t > 1200 &&
            (e(document).scrollTop() < 325
              ? (e(".global-header-wrapper").removeClass("sticky"),
                e(".sticky-header-categories").removeClass("active"))
              : e(window).scrollTop() > e("#navigation-bar").position().top &&
                e(".global-header-wrapper").addClass("test")),
            e(".sticky-header-categories").removeClass("active"),
            e(".navigation-links").siblings().removeClass("drop-down");
        }
      }),
      e(".sticky-header-categories").click(function (t) {
        t.stopPropagation(), e(this).toggleClass("active");
      }),
      e(document).click(function () {
        e(".sticky-header-categories").removeClass("active");
      }),
      e(".sticky-dropdown").each(function () {
        e(this)
          .find(".column-one")
          .wrapAll('<div class="column-one-wrapper" />'),
          e(this)
            .find(".column-two")
            .wrapAll('<div class="column-two-wrapper" />');
      }),
      e(".background-container").click(function () {
        e("body").removeClass("overflow"),
          e("#navigation-bar").removeClass("active");
      }),
      e(".mobile-barss, .ham_menu").on("click", function () {
        e(".newLoginContainer").addClass("displayNone"),
          /*e(".mobile-search-wrapper").removeClass("active"),*/
          e("body").toggleClass("overflow"),
          $("#navigation-bar").toggleClass("active"),
          e(".navigation-links").siblings().removeClass("active"),
          e(".navigation-links").siblings().removeClass("drop-down"),
          e("#navigation-bar").hasClass("submenu-active") &&
            e("#navigation-bar").removeClass("submenu-active"),
          $("#myLinks").css("display", "block") &&
            $("#myLinks").css("display", "none"),
          $("body")
            .css("overflow", "hidden")
            .css("position", "relative")
            .css("touch-action", "none")
            .css("-ms-touch-action", "none");
        $(".mobileview-summary").css("z-index", "999");
      }),
      $(".mobile-bars").on("click", function () {
        $(".newLoginContainer").addClass("displayNone"),
          $("body").css("overflow", "auto"),
          /*e(".mobile-search-wrapper").removeClass("active"),*/
          $("body")
            .toggleClass("overflow")
            .css("touch-action", "initial")
            .css("-ms-touch-action", "initial"),
          $("#navigation-bar").toggleClass("active"),
          $(".navigation-links").siblings().removeClass("active"),
          $(".navigation-links").siblings().removeClass("drop-down"),
          $("#navigation-bar").hasClass("submenu-active") &&
            $("#navigation-bar").removeClass("submenu-active"),
          $("#myLinks").css("display", "block") &&
            $("#myLinks").css("display", "none");
        $(".box_ORG").hide();
        $(".mobileview-summary").css("z-index", "99999999999999999");
      }),
      e(".menuback").click(function () {
        /*e(".mobile-search-wrapper").removeClass("active"),*/
        e("body").addClass("overflow"),
          e("#navigation-bar").addClass("active"),
          e(".navigation-links").siblings().removeClass("active"),
          e(".navigation-links").siblings().removeClass("drop-down"),
          e("#navigation-bar").hasClass("submenu-active") &&
            e("#navigation-bar").removeClass("submenu-active");
      }),
      e(".menubacksub").click(function () {
        var t = e(this).closest(".sub-menu");
        e(t).find(".column-two-wrapper").hide(),
          e(t).find(".column-one-wrapper").show(),
          e(".navigation-links a.showsubcats").each(function () {
            e(this).addClass("disableLink");
          });
      }),
      e(".redeem-button").click(function () {
        e("#js-coupon-form").slideToggle();
      }),
      e(".checkout-mobile").click(function () {
        e(".checkout-button .yellow-button").click();
      }),
      e("body").on("click", ".input-incremental-controls div", function (t) {
        t.preventDefault();
        var a = e(this)
            .closest(".custom-number-input")
            .find('input[type="text"]'),
          o = parseInt(e.trim(e(a).val()));
        isNaN(o) && (o = 1),
          e(this).hasClass("increment")
            ? o++
            : e(this).hasClass("decrement") && o--,
          e(this).hasClass("related-product-panel-quantity-adjust"),
          o < 0 && (o = 0),
          e(a).val(o);
      }),
      e(".basket-page-quantity-update-form .update-submit").click(function (t) {
        t.preventDefault(),
          e(this).closest(".basket-page-quantity-update-form").submit();
      }),
      e(".basket-page-estimate-shipping-button").click(function (t) {
        t.preventDefault(),
          e("p.estimate-shipping-modal-no-rates-found-message").remove(),
          e("table.estimated-shipping-rates-table").remove(),
          e("form.estimate-shipping-form").show(),
          e("#shipping-estimate-modal").modal();
      }),
      e(".estimate-shipping-modal-calculate-button").click(function (t) {
        t.preventDefault(), estimateShipping(e(this));
      }),
      e("#toggle-shipping-calculator").click(function () {
        e("#shipestimate_show").click();
      }),
      e(".cancel-button").click(function () {
        e("#cada_form").trigger("reset"), e(".form_row").removeClass("invalid");
      }),
      e(".submit-button").click(function (t) {
        e("#cada_form .form_row.required input").each(function () {
          e(this).val()
            ? (e(".CABK .submit-form").click(),
              e(this).parent().removeClass("invalid"))
            : e(this).parent().addClass("invalid");
        }),
          e("#Address_Country option:selected").val().length > 0
            ? e("#Address_Country ").parent().removeClass("invalid")
            : e("#Address_Country").parent().addClass("invalid");
      }),
      e(".cart-summary-title").click(function () {
        e("#basket-contents").toggleClass("active");
      }),
      e(".customer-title").click(function () {
        e("#customer-fields").toggleClass("active");
      }),
      e(".coupon-title").click(function () {
        e("#coupon-fields").toggleClass("active");
      }),
      e(".mobile-search").click(function () {
        e("#navigation-bar").removeClass("active"),
          e("body").removeClass("overflow");
        /*e(".mobile-search-wrapper").toggleClass("active");*/
      }),
      e(window).scroll(function () {
        e(".social-wrapper").fadeIn();
      }),
      e("body").on("click", ".sort-by", function () {
        e(".sort-by-options-wrapper").toggleClass("active");
      }),
      e(".product-zoom-image-wrapper").click(function (t) {
        e(t.target).hasClass("product-zoom-image") ||
          (zoomImagePositioningInterval = setInterval(
            zoomImagePositioningHandler,
            5
          ));
      }),
      e(".product-zoom-image").click(function () {
        e(".main-product-image").trigger("click");
      }),
      e(".tab").click(function () {
        var t = e(window).width(),
          a = e(this).attr("data-tab");
        t > 667
          ? (e(this).siblings().removeClass("active"),
            e(this).addClass().addClass("active"),
            e(".product-information-container")
              .children()
              .removeClass("active"),
            e(".product-information-container")
              .find('[data-tab="' + a + '"] ')
              .addClass("active"))
          : (e(this).parent().siblings().removeClass("active"),
            e(this).parent().toggleClass("active"),
            e("html, body").animate(
              {
                scrollTop:
                  e(".product-information-container").offset().top - 100,
              },
              1500
            ));
      }),
      e(".PROD .no-reviews, .PROD .star-reviews").click(function () {
        e(".review").click(),
          e("html, body").animate(
            {
              scrollTop:
                e(".product-tabs-information-wrapper").offset().top - 100,
            },
            1e3
          );
      }),
      e(".load-more-reviews").click(function () {
        e(".more-than-4").toggleClass("active"), e(this).toggleClass("active");
      }),
      e(".load-more-question-answer").click(function () {
        e(".more-than-3").toggleClass("active"), e(this).toggleClass("active");
      }),
      e("#askaq-form").submit(function (t) {
        var a = e.trim(e(this).find('textarea[name="Question"]').val()),
          o = e.trim(e(this).find('input[name="Email"]').val()),
          i = "";
        if (
          !/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            o
          )
        ) {
          t.preventDefault();
          i = "Please Enter Your Email Address";
        }
        if (a.length <= 0) {
          t.preventDefault();
          i = "Please Enter a question";
        }
        if (i.length <= 0)
          return (
            e
              .post("merchant.mvc", e("#askaq-form").serialize())
              .done(function (t) {
                e("#myModal").addClass("thank-you-active");
              }),
            !1
          );
        var n = '<div class="alert alert-danger"> ' + i + "</div>";
        e(".faq-alerts").empty(),
          e(".faq-alerts").append(n),
          e(".faq-alerts").show(),
          e(".faq-alerts div").fadeIn(1e3).delay(2e3).fadeOut(1e3),
          (faqAlert = setTimeout(function () {
            e(".faq-alerts div").remove(), e(".faq-alerts").hide();
          }, 5e3));
      }),
      window.location.href.indexOf("bestsellers") > -1
        ? e(".active-sort-by").html("Bestsellers")
        : window.location.href.indexOf("price_asc") > -1
        ? e(".active-sort-by").html("Lowest Price")
        : window.location.href.indexOf("price_desc") > -1
        ? e(".active-sort-by").html("Highest Price")
        : window.location.href.indexOf("newest") > -1
        ? e(".active-sort-by").html("Newest Items")
        : window.location.href.indexOf("disp_order") > -1 &&
          e(".active-sort-by").html("Default"),
      e(".active-sort-by").click(function () {
        e(".sort-by-options-wrapper").toggle();
      }),
      e("#newsletter-signup").submit(function (t) {
        t.preventDefault();
        var a = e.trim(e(this).find('input[name="email_address"]').val());
        if (
          /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            a
          )
        )
          e.post("constant-contact-v2/constant-contact-subscribe.php", {
            email: a,
          }).done(function (t) {
            t = e.trim(t);
            var a = JSON.parse(t);
            if ("success" == a.result) {
              var o =
                '<div class="alert alert-success">Thanks for signing up!</div>';
              e("#newsletter-signup .signup-alerts").empty().append(o).show(),
                e("#newsletter-signup .signup-alerts div")
                  .fadeIn(1e3)
                  .delay(2e3)
                  .fadeOut(1e3),
                (newsletterAlert = setTimeout(function () {
                  e("#newsletter-signup .signup-alerts div").remove(),
                    e("#newsletter-signup .signup-alerts").hide();
                }, 5e3));
            } else {
              o =
                '<div class="alert alert-danger">An error occurred when attempting to sign you up. Please try again later.</div>';
              -1 != a.errors[0].indexOf("already") &&
                (o =
                  '<div class="alert alert-danger">You are already subscribed.</div>'),
                e("#newsletter-signup .signup-alerts").empty(),
                e("#newsletter-signup .signup-alerts").append(o),
                e("#newsletter-signup .signup-alerts").show(),
                e("#newsletter-signup .signup-alerts div")
                  .fadeIn(1e3)
                  .delay(2e3)
                  .fadeOut(1e3),
                (newsletterAlert = setTimeout(function () {
                  e("#newsletter-signup .signup-alerts div").remove(),
                    e("#newsletter-signup .signup-alerts").hide();
                }, 5e3));
            }
          });
        else {
          e("#newsletter-signup .signup-alerts").empty(),
            e("#newsletter-signup .signup-alerts").append(
              '<div class="alert alert-danger">Please provide a valid email address.</div>'
            ),
            e("#newsletter-signup .signup-alerts").show(),
            e("#newsletter-signup .signup-alerts div")
              .fadeIn(1e3)
              .delay(2e3)
              .fadeOut(1e3),
            (newsletterAlert = setTimeout(function () {
              e("#newsletter-signup .signup-alerts div").remove(),
                e("#newsletter-signup .signup-alerts").hide();
            }, 5e3));
        }
      }),
      e(".footer-toggle").click(function () {
        e(this).siblings().removeClass("footer-active"),
          e(this).hasClass("footer-active")
            ? e(this).removeClass("footer-active")
            : e(this).addClass("footer-active");
      }),
      e(".osel-page-custom-order-data-wrapper").length > 0 &&
        e(".osel-page-checkout-form").submit(function (t) {
          if (0 == e('input[name="out_of_stock_handling"]:checked').length)
            return (
              e("#new_globalerrorpopup .gpoperror").html(
                "Please indicate how you would like us to proceed in the event one or more of your items aren't immediately available."
              ),
              e("#new_globalerrorpopup").modal("show"),
              !1
            );
        }),
      e("body.OCST #ShipAddress1").length > 0 &&
        (e("body.OCST #ShipAddress1, body.OCST #ShipAddress2").blur(
          function () {
            validateShippingAddressForPOBox();
          }
        ),
        e("body.OCST #ShipAddress1, body.OCST #ShipAddress2").change(
          function () {
            poBoxErrorAlreadyShown = !1;
          }
        )),
      e(".ws-reg-form").length > 0 && bindWholesaleRegistrationFormHandlers(),
      e(".column-one").hover(function () {
        e(".showsubcats").removeClass("active"),
          e(this).addClass("active"),
          e(".hidesubmenu").hide(),
          e(".sub-" + e(this).attr("data-cat")).css("display", "block");
      }),
      e(".navigation-links .parentnavlinks").hover(function () {
        e(".showsubcats").removeClass("active");
      });
    e(".fullwidthmenu").height();
    t < 1025 &&
      e(".navigation-links a.showsubcats").each(function () {
        e(this).addClass("disableLink");
      }),
      t < 768 &&
        (e(".showsubcats").click(function () {
          e(".sub-menu .column-one-wrapper").hide(),
            e(".sub-menu .column-two-wrapper").show();
        }),
        e(".parentnavlinks").click(function () {
          e(".sub-menu .column-two-wrapper").hide(),
            e(".sub-menu .column-one-wrapper").show();
        }),
        e(".mobmenuaccordion").click(function (t) {
          t.preventDefault(), e("#" + e(this).attr("rel")).toggle();
        })),
      e("body").on("click", ".disableLink", function () {
        return e(this).removeClass("disableLink"), !1;
      }),
      e("#billing_to_show").change(function () {
        e("#billing_to_show").is(":checked") &&
          (e("#shipping_fields")
            .find("input")
            .each(function () {
              var t = e(this).attr("name").replace("Ship", "Bill");
              e("#billing_fields")
                .find('input[name="' + t + '"]')
                .val(e(this).val());
            }),
          e("#shipping_fields")
            .find("select")
            .each(function () {
              var t = e(this).attr("name").replace("Ship", "Bill");
              e("#billing_fields")
                .find('select[name="' + t + '"]')
                .val(e(this).val());
            }));
      }),
      e("#contactForm").submit(function (t) {
        t.preventDefault();
        var a = e(this).serialize();
        e.post("contact-form.php", a + "&ajax=1").done(function (t) {
          (t = e.trim(t)),
            e("#new_globalerrorpopup .gpoperror").html(t),
            e("#new_globalerrorpopup .modal-titles").html("");
          e("#new_globalerrorpopup").modal("show"),
            document.getElementById("contactForm").reset();
          if (
            urlpath === "https://foodrelated.com" ||
            urlpath === "https://www.foodrelated.com"
          ) {
            dataLayer.push({
              event: "contactForm",
            });
          }
        });
      }),
      e("#newsletter").submit(function (t) {
        t.preventDefault();
        var a = e(this).serialize();
        e("input[name='retail']:checked").val()
          ? e.post("ccsignup.php", a + "&ajax=1").done(function (t) {
              (t = e.trim(t)),
                document.getElementById("newsletter").reset(),
                e("#NLFormsubmit").prop("disabled", "disabled"),
                e("#NLFormsubmit").addClass("btndisabled"),
                t.includes("emailexist")
                  ? (e("#initalNewsPapaerBody").addClass("displayNone"),
                    e("#emailExist").removeClass("displayNone"))
                  : (e("#initalNewsPapaerBody").addClass("displayNone"),
                    e("#couponCodeId").removeClass("displayNone"),
                    (document.getElementById("couponCodeText").innerHTML = t));
            })
          : e
              .post(
                "merchant.mvc?Screen=AJAX&Action=wholesaleNewsletter",
                a + "&ajax=1"
              )
              .done(function (t) {
                (t = e.trim(t)),
                  document.getElementById("newsletter").reset(),
                  e("#NLFormsubmit").prop("disabled", "disabled"),
                  e("#NLFormsubmit").addClass("btndisabled"),
                  t.includes("noaccount") &&
                    (e("#initalNewsPapaerBody").addClass("displayNone"),
                    e("#noBAccount").removeClass("displayNone")),
                  t.includes("business-success") &&
                    (e("#initalNewsPapaerBody").addClass("displayNone"),
                    e("#businessSuccess").removeClass("displayNone")),
                  t.includes("emailexist") &&
                    (e("#initalNewsPapaerBody").addClass("displayNone"),
                    e("#emailExist").removeClass("displayNone")),
                  t.includes("retailaccount") &&
                    (e("#initalNewsPapaerBody").addClass("displayNone"),
                    e("#retailAccount").removeClass("displayNone")),
                  t.includes("apierror") &&
                    (e("#initalNewsPapaerBody").addClass("displayNone"),
                    e("#apierror").removeClass("displayNone"));
              });
      });
    var a = function (t) {
      var a = e(t).find("input[type=radio]:checked").val();
      var o = e(t).find(".product-quantity-input").val();
      void 0 === o && (o = void 0 === o ? 1 : o);
      var i = parseInt(e(t).find("input[type=radio]:checked").attr("data-min"));
      var n = e(t).find("input[type=radio]:checked").attr("data-product_code");
      var s = e(t).find("input.button");
      s = 0 === s.length || 2 === s.length ? e(t).find(".multcartbutton") : s;
      var r = e(s).val();
      e(s).val("Adding"), e(s).addClass("adding");
      var l = e(e(t)[0]).serializeArray();
      l.forEach(function (e) {
        "allowsub" === e.name && ((e.name = "allowsub123"), (e.value = "off"));
      }),
        e.post("merchant.mvc", l).done(function (t) {
          (t && t.basket_count
            ? ((basketApp.basket = t),
              e(".basket-count").text(t.basket_count),
              e.get("/ajax.html?CustomerAction=getbasketcharges", function (t) {
                var a = JSON.parse(t);
                for (var o in a)
                  o.includes("BasketSubTotal") &&
                    (e(".basket-total span").text("$" + a[o]),
                    e(".formatted_total").text(a[o]));
              }))
            : (e(t).find("#basket-contents").length &&
                (e("#basket-contents").html(
                  e(t).find("#basket-contents").html()
                ),
                e(".updatedShipping").html(
                  e(t).find(".updatedShipping").html()
                ),
                "1" == e(t).find(".is_empty").val()
                  ? e(".estimate-shipping-modal-calculate-button").prop(
                      "disabled",
                      !0
                    )
                  : e(".estimate-shipping-modal-calculate-button").prop(
                      "disabled",
                      !1
                    )),
              basketApp.loadBasket()),
          e("body").hasClass("BASK")) &&
            e(".inventoryCnt").val() &&
            (e(".btn-checkout").addClass("btn-grey"),
            e(".checkoutbutton").css({
              "background-color": "grey !important",
              "pointer-events": "none",
            }));
          e("input[data-product_code=" + n + "][type=radio]").length &&
            e("input[data-product_code=" + n + "][type=radio]").attr(
              "data-stock",
              parseInt(
                e("input[value=" + a + "][type=radio]").attr("data-stock")
              ) -
                parseInt(o) * i
            ),
            e(".inventoryCnt").val()
              ? e(".continue-button .red-button").css({
                  "pointer-events": "none",
                  "background-color": "#ccc7c7",
                })
              : e(".continue-button .red-button").css({
                  "pointer-events": "all",
                  "background-color": "#f47a44",
                }),
            e(s).val("Added"),
            setTimeout(function () {
              e(s).val(r), refreshItemsOnBasket(), e(s).removeClass("adding");
            }, 1e3);
        });
    };
    e("body").on(
      "click",
      ".addtobasket-wrapper .buynowbtn .button",
      function (t) {
        t.preventDefault();
        var o = e(this).closest("form.addtobasket-wrapper");
        if (
          null != e(o).find("input[type=radio]") &&
          null != e(o).find("input[type=radio]:checked").attr("data-stock")
        ) {
          var i =
              "Sorry, we do not have enough quantity to fulfill your order.\r\nPlease adjust the quantity and try again. Quantity Available:",
            n = parseInt(e(o).find(".qtyinbox input").val());
          var s = parseInt(
            e(o).find("input[type=radio]:checked").attr("data-stock")
          );
          var r = parseInt(
            e(o).find("input[type=radio]:checked").attr("data-min")
          );
          var l = Math.floor(s / r);
          if (
            (null !=
              e(o).find("input[type=radio]:checked").attr("data-maxqty") &&
              e(o).find("input[type=radio]:checked").attr("data-maxqty") > 0 &&
              ((s =
                e(o).find("input[type=radio]:checked").attr("data-maxqty") <= s
                  ? e(o).find("input[type=radio]:checked").attr("data-maxqty")
                  : s),
              (i =
                "We apologize, but due to high demand, we must limit the purchase quantity of this item. Max Quantity Allowed:")),
            r * n > s)
          )
            return (
              e("#new_globalerrorpopup .gpoperror").html(i + " " + l),
              e("#new_globalerrorpopup").modal("show"),
              t.preventDefault(),
              !1
            );
          a(o);
        } else a(o);
      }
    );
    var o = 0;
    e("body").on("click", "#basket-contents .remove-item", function (t) {
      t.preventDefault(),
        e(this)
          .closest(".product-row")
          .fadeOut("slow", function () {}),
        e(this).closest(".bask-cart-phone-item-wrapper").remove(),
        o++,
        e.get(e(this).attr("href")).done(function (t) {
          0 === --o &&
            (e("#basket-contents").html(e(t).find("#basket-contents").html()),
            basketApp.loadBasket());
        });
    }),
      e("body").on(
        "click",
        "#js-purchase-product .multcartbutton",
        function (t) {
          var o = e(this).closest("#js-purchase-product"),
            i = "",
            n = 0,
            s = [];
          e(".mattributes")
            .find("tr")
            .each(function (t) {
              if (null != e(this).find(".qtybox").val()) {
                var a = parseInt(e(this).find(".qtybox").val());
                if (
                  (s.push({
                    i: a,
                  }),
                  (n = parseInt(n) + parseInt(a)),
                  a > 0 && null != e(this).find(".qtybox").attr("data-stock"))
                ) {
                  var o = e(this).find(".prodSku").attr("data-sku"),
                    r = parseInt(e(this).find(".qtybox").attr("data-stock")),
                    l =
                      "Sorry, we do not have enough SKU: " +
                      o +
                      " to fill your order.\r\nPlease adjust the quantity and try again. Quantity Available:";
                  null != e(this).find(".qtybox").attr("data-maxqty") &&
                    e(this).find(".qtybox").attr("data-maxqty") > 0 &&
                    ((r =
                      e(this).find(".qtybox").attr("data-maxqty") <= r
                        ? e(this).find(".qtybox").attr("data-maxqty")
                        : r),
                    (l =
                      "We apologize, but due to high demand, we must limit the purchase quantity of this item. Max Quantity Allowed:")),
                    a > r && (i = i + l + r + "\r\n");
                }
              }
            }),
            n < 1 && (i = "Please select quantity!"),
            "" != i
              ? (e("#new_globalerrorpopup .gpoperror").html(i),
                e("#new_globalerrorpopup").modal("show"))
              : (a(o),
                e(".mattributes")
                  .find("tr")
                  .each(function (t) {
                    var a = parseInt(e(this).find(".qtybox").val());
                    a &&
                      null != e(this).find(".qtybox").attr("data-stock") &&
                      (e(this)
                        .find(".qtybox")
                        .attr(
                          "data-stock",
                          e(this).find(".qtybox").attr("data-stock") - a
                        ),
                      e(this).find(".qtybox").val(0));
                  }));
        }
      ),
      e("body").on("click", ".bask-item-quantity-update-button", function (t) {
        t.preventDefault();
        var o = e(this).closest("form");
        if (
          null != e(this).find(".basket-qty-input").attr("data-maxqty") &&
          e(this).find(".basket-qty-input").attr("data-maxqty") > 0
        ) {
          var i = e(this).find(".basket-qty-input").val(),
            n = e(this).find(".basket-qty-input").attr("data-maxqty");
          return (
            (errorMsg =
              "We apologize, but due to high demand, we must limit the purchase quantity of this item. Max Quantity Allowed:" +
              n),
            i > n
              ? (e("#new_globalerrorpopup .gpoperror").html(errorMsg),
                e("#new_globalerrorpopup").modal("show"),
                !1)
              : (a(o), !1)
          );
        }
        return a(o), !1;
      }),
      e("body").on(
        "submit",
        ".basket-page-quantity-update-form, .product-quantity-and-remove-column form",
        function (t) {
          t.preventDefault();
          var o = e(this);
          if (
            null != e(this).find(".basket-qty-input").attr("data-stock") &&
            e(this).find(".basket-qty-input").attr("data-stock") >= 0
          ) {
            var i = e(this).find(".basket-qty-input").val(),
              n = e(this).find(".basket-qty-input").attr("data-stock"),
              s = e(this).find(".basket-qty-input").attr("data-min"),
              r = e(this).find(".currentInventary").val(),
              l = Math.floor(n / s);
            return (
              (errorMsg =
                "We apologize, but due to high demand, we must limit the purchase quantity of this item. Max Quantity Allowed:" +
                l),
              i > r
                ? (i - r) * s > n
                  ? (e("#new_globalerrorpopup .gpoperror").html(errorMsg),
                    e("#new_globalerrorpopup").modal("show"),
                    e(this).find(".basket-qty-input").val(r),
                    !1)
                  : (a(o), !1)
                : (a(o), !1)
            );
          }
          return a(o), !1;
        }
      ),
      (null == document.getElementById("returnOrderCheck") &&
        null == document.getElementById("returnOrderCheck")) ||
        document.getElementById("returnOrderCheck").reset(),
      e('.returncheck input[data-type="returnable"]').change(function () {
        e(this).is(":checked")
          ? e("#retitem-" + e(this).val()).show()
          : (e("#retitem-" + e(this).val()).hide(),
            e("#retitem-" + e(this).val() + " .returnreason").val(""));
      }),
      e(".returnreason").change(function () {
        var t = e("option:selected", this);
        "yes" == t.attr("data-subopt")
          ? e("#retopt-" + t.attr("data-optid")).show()
          : e("#retopt-" + t.attr("data-optid")).hide();
      }),
      e("#nonreturncont").click(function () {
        e("#nonreturnablebox").modal("hide"),
          e("#retitem-" + e(this).attr("data-id")).show();
      }),
      e("#nonreturncancel").click(function () {
        e("#nonreturnablebox").modal("hide"),
          e('.returncheck input[value="' + e(this).attr("data-id") + '"]').prop(
            "checked",
            !1
          );
      }),
      e(
        '#returnOrderCheck .returncheck input[data-type="non_returnable"]'
      ).change(function () {
        e(this).is(":checked")
          ? (e("#nonreturnablebox").modal("show"),
            e("#nonreturncont").attr("data-id", e(this).val()),
            e("#nonreturncancel").attr("data-id", e(this).val()))
          : e("#retitem-" + e(this).val()).hide();
      }),
      e("#returnOrderCheck").submit(function (t) {
        var a,
          o = 0,
          i = 0,
          n = "",
          s = 0,
          r = 0,
          l = 0;
        if (
          (e(this)
            .find('.returncheck input[data-type="non_returnable"]')
            .each(function () {
              e(this).is(":checked") && i++;
            }),
          e(this)
            .find('.returncheck input[data-type="returnable"]')
            .each(function () {
              e(this).is(":checked") && o++;
            }),
          (a = i + o),
          e(this)
            .find(".returnreason")
            .each(function () {
              n && e("option:selected", this).val()
                ? e("option:selected", this).val() != n && (l = 1)
                : e("option:selected", this).val() &&
                  (n = e("option:selected", this).val());
            }),
          e(this)
            .find(".returnreasonopt")
            .each(function () {
              e(this).is(":visible") &&
                "" == e("option:selected", this).val() &&
                r++;
            }),
          e(this)
            .find(".returnreasoncontainer")
            .each(function () {
              e(this).is(":visible") &&
                "" == e(this).find(".returnreason option:selected").val() &&
                s++;
            }),
          o && i)
        )
          return e("#popupmixitems").show(), !1;
        if (l) {
          e("#popupmixreasons").show();
          var c = e(this).serialize();
          return (
            (c = c.replace("=RTOR", "=ROAJAX")),
            e.ajax({
              url: "/Merchant5/merchant.mvc",
              type: "POST",
              data: c,
              showLoader: !0,
              cache: !1,
              success: function (t) {
                "ERROR" == t.trim()
                  ? (e("#new_globalerrorpopup .gpoperror").html(
                      "Error in RMA Generation!"
                    ),
                    e("#new_globalerrorpopup").modal("show"))
                  : (e("#returnOrderCheck .submitrtrn").hide(),
                    e(".returnorderbtn").html("Return in Progress"));
              },
            }),
            !1
          );
        }
        return a < 1
          ? (e("#popupmixreasontype").show(), !1)
          : s
          ? (e("#popupmixreasonval").show(), !1)
          : !r || (e("#popupmixreasonopt").show(), !1);
      }),
      e(".cpopclose").click(function () {
        e(".modal-backdrop").css("display", "none"),
          e(this).closest(".custompopup").hide();
      }),
      e("body").on("submit", "#returnOrder", function (t) {
        t.preventDefault();
        var a = e(this).serialize();
        return (
          e.ajax({
            url: "/Merchant5/merchant.mvc?Screen=ROAJAX",
            type: "POST",
            data: a,
            showLoader: !0,
            cache: !1,
            success: function (t) {
              "ERROR" == t.trim()
                ? (e("#new_globalerrorpopup .gpoperror").html(
                    "Error in RMA Generation!"
                  ),
                  e("#new_globalerrorpopup").modal("show"))
                : (e("#rmaReturn").find("#rmanumber").html(t),
                  e("#rmaReturn").modal("show"),
                  e("#returnOrder .submitrtrn").hide(),
                  e("#returnProgress").show());
            },
          }),
          !1
        );
      }),
      e("#retailNL").click(function (t) {
        e("#first_name_0").val(
          e('#newsletter-signup input[name="f_name"]').val()
        ),
          e("#email_address_0").val(
            e('#newsletter-signup input[name="email_address"]').val()
          ),
          e("#retailnlpopup").modal("show"),
          setTimeout(function () {
            document.getElementById("newsletter-signup").reset();
          }, 500);
      }),
      e('input[name="ShippingMethod"]').click(function () {
        var t = parseFloat(e(".basket-total").text().replace("$", ""));
        if ("flatrate:Home Delivery" == e(this).val() && t < 30) {
          var a = 30 - t;
          return (
            (a = a.toFixed(2)),
            e("#new_globalerrorpopup").modal({
              backdrop: "static",
              keyboard: !1,
            }),
            e(".modal-backdrop").css("display", "block"),
            e(".cpopupinner").css("display", "inline-block"),
            e(".cpopclose").css("height", "28px"),
            e(".cpopclose").css("padding", "7px 16px 0px 19px"),
            e("#new_globalerrorpopup .gpoperror").html(
              "<p style='font-size:15px;letter-spacing:1px'>We are almost on our way! Our home delivery order minimum is $30.<br/> <p style='color:#f47a44;font-weight:bold;font-size:15px;letter-spacing:1px'>Place an order of $50 or more and receive FREE Home Delivery!</p></p><a href='/' class='linkbutton' style='white-space: nowrap;max-width: 200px;margin-bottom: -40px;margin-top: 20px;margin-left: 0px;line-height:33px;height:32px;padding-bottom: 2px;'>Continue Shopping</a>"
            ),
            e("#new_globalerrorpopup").modal("show"),
            !1
          );
        }
      });
  });
$("body").on("click", ".image-wrapper a", function (e) {
  $(this).parent().find(".wishlist-actions").length &&
    window.innerWidth < 900 &&
    e.preventDefault();
}),
  (window.qtyupdate = function (e, t) {
    var a = parseInt(document.getElementById(e).value),
      o = $("#" + e);
    "plus" == t ? o.val(a + 1) : a < 2 ? o.val(0) : o.val(a - 1);
  });
var checkInv = function (e) {
    "0" === e.dataset.stock || "" === e.dataset.stock
      ? ($(e).closest(".product-details").find(".tbd").css("display", "none"),
        $(e)
          .closest(".product-details")
          .find(".out-of-stock")
          .css("display", "block"))
      : ($(e).closest(".product-details").find(".tbd").css("display", "block"),
        $(e)
          .closest(".product-details")
          .find(".out-of-stock")
          .css("display", "none"));
  },
  updateSubTotal = function (e) {
    var price = $(e)
      .find("input:checked + label .price")
      .text()
      .trim()
      .substring(1);
    var qty = $(e).find(".product-quantity-input").val();
    $(e)
      .find(".card-subtotal span")
      .text("$" + (parseFloat(price) * parseFloat(qty)).toFixed(2));
    $(e).find(".card-subtotal").css("opacity", 1);
    //Updates price per lb on PROD Page
    if ($(".prbrand").length) {
      let price_per_lb = $("#main-prod-card")
        .find("input[type=radio]:checked + label .price-per-lb")
        .html();
      if (price_per_lb) {
        if ($(".prbrand").find(".price-per-lb").length) {
          $(".prbrand .price-per-lb").html(
            "($" +
              $("#main-prod-card")
                .find("input[type=radio]:checked + label .price-per-lb:first")
                .html() +
              "/lb.)"
          );
        } else {
          $(".prbrand").html(
            $(".prbrand").text() +
              "<span class='price-per-lb'>($" +
              +"/lb.)<span>"
          );
        }
      } else {
        $(".prbrand .price-per-lb").html(
          $("#main-prod-card")
            .find("input[type=radio]:checked + label .price-per-lb:first")
            .text()
        );
      }
    }
  };
window.chooseProductTab = function (e) {
  $(e).parent().parent().find(".collapse").hasClass("show")
    ? ($("#product-info-aco .collapse").removeClass("show"),
      $("#product-info-aco .panel").removeClass("active"))
    : ($("#product-info-aco .collapse").removeClass("show"),
      $("#product-info-aco .panel").removeClass("active"),
      $(e).parent().parent().find(".collapse").addClass("show"),
      $(e).parent().parent().addClass("active"));
};
var removeOutOfStock = function (e) {
    $(e)
      .find(".addtobasket-wrapper")
      .each(function () {
        let e = 0;
        $(this)
          .find("input[type=radio]")
          .each(function () {
            e += parseInt($(this).attr("data-stock") || 0);
          }),
          0 === e && $(this).closest(".product-item").remove();
      });
  },
  height_resize = function () {
    if (!$("body").hasClass("touch")) return 1;
    if (
      ($(
        ".featured-categories .owl-carousel, .featured-products-carousel.owl-carousel, .prog-cat .prods-listing"
      ).each(function () {
        let e = 0;
        $(this)
          .find(
            ".product-item .padding .product-detail-wrapper .product-name a:not(.see-more)"
          )
          .each(function () {
            e = Math.max(e, $(this).height());
          }),
          $(this)
            .find(
              ".product-item .padding .product-detail-wrapper .product-name a:not(.see-more)"
            )
            .each(function () {
              $(this).css("height").split("px")[0] !== e + "" &&
                $(this).css("height", e);
            });
        let t = 0;
        $(this)
          .find(".product-item .padding .product-detail-wrapper")
          .each(function () {
            t = Math.max(t, $(this).height());
          }),
          $(this)
            .find(".product-item .padding .product-detail-wrapper")
            .each(function () {
              $(this).css("height").split("px")[0] !== t + "" &&
                $(this).css("height", t);
            });
        let a = 0;
        $(this)
          .find(".product-item .padding .addtobasket-wrapper")
          .each(function () {
            a = Math.max(a, $(this).outerHeight());
          }),
          $(this)
            .find(".product-item .padding .addtobasket-wrapper")
            .each(function () {
              $(this).css("height").split("px")[0] !== a + "" &&
                $(this).css("height", a);
            });
      }),
      $("body").hasClass("CTGY") || $("body").hasClass("SRCH"))
    ) {
      let e = 0;
      $(".product-item .padding .product-detail-wrapper .product-name a").each(
        function () {
          e = Math.max(e, $(this).height());
        }
      ),
        $(
          ".product-item .padding .product-detail-wrapper .product-name a"
        ).each(function () {
          $(this).css("height").split("px")[0] !== e + "" &&
            $(this).css("height", e);
        });
      let t = 0;
      $(".product-item .padding .product-detail-wrapper").each(function () {
        t = Math.max(t, $(this).outerHeight());
      }),
        $(".product-item .padding .product-detail-wrapper").each(function () {
          $(this).css("height").split("px")[0] !== t + "" &&
            $(this).css("height", t);
        });
      let a = 0;
      $(".product-item .padding .addtobasket-wrapper").each(function () {
        a = Math.max(a, $(this).outerHeight());
      }),
        $(".product-item .padding .addtobasket-wrapper").each(function () {
          $(this).css("height").split("px")[0] !== a + "" &&
            $(this).css("height", a);
        });
    }
  };
setInterval(height_resize, 3e3),
  $("body").on("click", ".product-item .form-check-label", function () {
    $(this).prev().click();
  }),
  $(document).ready(function () {
    $(".form-check-input:checked").each(function () {
      checkInv(this);
    }),
      refreshItemsOnBasket(),
      height_resize(),
      $("body").on("click", ".addtobasket-wrapper", function () {
        updateSubTotal(this);
      }),
      $("body").on("mouseenter", ".addtobasket-wrapper", function () {
        updateSubTotal(this);
      }),
      $(".addtobasket-wrapper").each(function () {
        updateSubTotal(this);
      }),
      $("body").on("change", ".form-check-input", function () {
        checkInv(this);
      });
  });

jQuery(document).ready(function () {
  jQuery("body").on(
    "click",
    ".wishlistAdditionButton:not(.addFav2)",
    function () {
      var t = jQuery(this).attr("data-code"),
        e = $(this).parent().find(".item-name");
      e = $.trim(e.text());
      var a = $(this).parent().find(".decpr.packsize");
      a = $.trim(a.text());
      var r = $(this).parent().parent().parent().find(".image-wrapper a img");
      r = r.attr("src");
      var i = jQuery(this).attr("data-wishlist");
      (productInfo = {
        code: jQuery(this).attr("data-code"),
        sku: jQuery(this).attr("data-sku") ? jQuery(this).attr("data-sku") : t,
        name: e,
        Option: a,
        imgSrc: r,
        id: i,
      }),
        populateWishlistPopup();
    }
  ),
    jQuery(".removeWishlist2,.addFav2.removeWishlist").click(function () {
      event.preventDefault();
      var t = "&product_id=" + jQuery(this).attr("data-wishlist");
      jQuery.ajax({
        url: "/Merchant5/merchant.mvc?Screen=AJAX&CustomerAction=delwishlist",
        type: "POST",
        data: t,
        showLoader: !0,
        cache: !1,
        success: function (t) {
          $("#baskgdpopup").css("z-index", 1050),
            Swal.fire(
              "Succesful Operation",
              "Product removed from wishlist!",
              "success"
            ).then(function () {
              $("#baskgdpopup").css("z-index", 9800);
              var t = $("#addToWishList")
                .attr("action")
                .replace(/^http:\/\//i, "https://");
              window.location.href = " ".concat(t, "Screen=BASK&Store_Code=G");
            });
        },
      });
    }),
    jQuery(".addtowish.login,.addFav.login").click(function (t) {
      t.preventDefault();
      var e = "/LOGN.html?ref=" + jQuery(this).attr("data-page");
      return (window.location = e), !1;
    }),
    jQuery(".product-names a,.product-thumbnails a").click(function (t) {
      t.preventDefault();
      var e = $(this).parents(".product-item").find(".addFav");
      setWishlistParams(e), $("body").css("overflow", "hidden");
      var a = jQuery(this).closest(".owl-item");
      jQuery("#baskgdpopup").html(
        '<center><p><img src="graphics/00000001/loading.gif"></p></center>'
      ),
        jQuery("#baskgdpopup").load(
          globalSecureSession +
            "Screen=PROD&Type=cartLoad&Product_Code=" +
            a.find(".product-item").attr("data-code") +
            " #prodContents",
          function () {
            jQuery("#baskgdpopup #js-purchase-product .multcartbutton").click(
              function (t) {
                var e = jQuery(this).closest("#js-purchase-product"),
                  a = "",
                  r = 0;
                (jQuery(".mattributes")
                  .find("tr")
                  .each(function () {
                    if (null != jQuery(this).find(".qtybox").val()) {
                      var t = parseInt(jQuery(this).find(".qtybox").val());
                      if (
                        ((r = parseInt(r) + parseInt(t)),
                        t > 0 &&
                          null !=
                            jQuery(this).find(".qtybox").attr("data-stock"))
                      ) {
                        var e = jQuery(this).find(".prodSku").attr("data-sku"),
                          i = parseInt(
                            jQuery(this).find(".qtybox").attr("data-stock")
                          ),
                          o =
                            "Sorry, we do not have enough SKU: " +
                            e +
                            " to fill your order.\r\nPlease adjust the quantity and try again. Quantity Available:";
                        null !=
                          jQuery(this).find(".qtybox").attr("data-maxqty") &&
                          jQuery(this).find(".qtybox").attr("data-maxqty") >
                            0 &&
                          ((i =
                            jQuery(this).find(".qtybox").attr("data-maxqty") <=
                            i
                              ? jQuery(this).find(".qtybox").attr("data-maxqty")
                              : i),
                          (o =
                            "We apologize, but due to high demand, we must limit the purchase quantity of this item. Max Quantity Allowed:")),
                          t > i && (a = a + o + i + "\r\n");
                      }
                    }
                  }),
                r < 1 && (a = "Please select quantity!"),
                "" != a)
                  ? (jQuery("#globalerrorpopup .gpoperror").html(a),
                    jQuery("#globalerrorpopup").show())
                  : ((jQuery(this).closest("form")[0].action = globalSFNT),
                    jQuery(e).submit());
              }
            );
          }
        ),
        jQuery("#baskgdpopup").show().addClass("PROD"),
        jQuery("#baskgdpopupClose").show();
    }),
    jQuery("body").on("click", ".fa-close", function () {
      jQuery("#baskgdpopup").hide(),
        jQuery("#baskgdpopupClose").hide(),
        $("body").css("overflow", "visible");
    }),
    $("#baskgdpopup").css("z-index", 9800),
    $("#waitList").css("z-index", 9900);
});

var productInfo = {},
  wishlistId = "";

function succesfulWishlistSubmission() {
  lastHeart &&
    (lastHeart.find(".fa").removeClass("fa-heart-o").addClass("fa-heart"),
    lastHeart.removeClass("addWishlist").addClass("removeWishlist")),
    $("#wishListPop").modal("hide"),
    $("#addProductToWishlist").show(),
    $("#addWishlistItem").hide(),
    $("#addedToWishlist").hide(),
    $(".product-item[data-code=" + productInfo.code + "]").each(function () {
      let t = $(this).find(".addFav");
      t.find(".fa").removeClass("fa-heart-o").addClass("fa-heart"),
        t.removeClass("addWishlist").addClass("removeWishlist");
    });
}

function setWishlistParams(t) {
  let i = t.attr("data-wishlist");
  let s = t.attr("data-code"),
    o = t.parents(".product-item").find("input[type=radio]:checked").val(),
    e = t.parents(".product-item").find(".product-name a").text();
  e = $.trim(e);
  let a = t.parents(".product-item").find(".product-thumbnail img");
  a = a.attr("src");
  let d = t
    .parents(".product-item")
    .find(".selectsize")
    .find(":selected")
    .text();
  (d = $.trim(d)),
    $("#addProductToWishlist").show(),
    $("#addWishlistItem").hide(),
    (productInfo = {
      code: s,
      sku: o || s,
      name: e,
      Option: d,
      imgSrc: a,
      id: i,
    });
}

function setWishlistParams2(t) {
  let i = t.attr("data-wishlist");
  let s = $(".mattributes")
    .find("tr:nth-child(2)")
    .find(".prodSku")
    .text()
    .split("SKU")[1];
  s = $.trim(s);
  let o = $("#prodContents").find(".product-information-wrapper h1").text();
  o = $.trim(o);
  let e = t.attr("data-code"),
    a = $("#prodContents .product-image-wrapper .main-product-image").attr(
      "src"
    ),
    d = $(".mattributes")
      .find("tr:nth-child(2)")
      .find(".mobleft:first")
      .text()
      .split("Size")[1];
  (d = $.trim(d)),
    $("#addProductToWishlist").show(),
    $("#addWishlistItem").hide(),
    (productInfo = {
      code: e,
      sku: s || e,
      name: o,
      Option: d,
      imgSrc: a,
      id: i,
    });
}

function addNotesToWishlist(t) {
  wishlistId = $("#wishListId").children("option:selected").val();
  let i = $("#addToWishList").find("textarea").val();
  productInfo.notes = i;
  let s = productInfo.id;
  let o =
    globalSecureSession +
    `Screen=WISH&WishList_ID=${wishlistId} #category-listing`;
  let e = document.createElement("div");
  (e.id = "hidden-wishlist-container"),
    (e.style = "display:none"),
    document.querySelector("body").append(e),
    $("#hidden-wishlist-container").load(o, () => {
      let i = $(
          "#hidden-wishlist-container .addFav[data-wishlist='" + s + "']"
        ).parents(".padding"),
        o = i.find(".wlsave").attr("data-id"),
        e = $(`#hidden-wishlist-container #formwl-${o}`);
      e.find("textarea").val(productInfo.notes),
        (finalUrl = t + "&" + e.serialize()),
        $.ajax({
          type: "POST",
          url: finalUrl,
          showLoader: !0,
          cache: !1,
          success: function (t) {
            $("#addToWishList").find("textarea").val(""),
              succesfulWishlistSubmission();
          },
        });
    });
}

function addProduct() {
  let t, i;
  (t = $("#addToWishList")
    .attr("action")
    .replace(/^http:\/\//i, "https://")),
    (i = t + $("#addToWishList").serialize()),
    (finalUrl = i + "&Product_Attributes%5B+1+%5D%3Acode=size"),
    (finalUrl =
      finalUrl + "&Product_Attributes%5B1%5D%3Avalue=" + productInfo.sku),
    $("#addProductToWishlist").hide(),
    $("#addWishlistItem").hide(),
    $("#addedToWishlist").show(),
    $(".saveRecipe .fa").removeClass("fa-heart-o").addClass("fa-heart"),
    $.ajax({
      type: "POST",
      url: finalUrl,
      showLoader: !0,
      cache: !1,
      success: function (i) {
        $("#addToWishList").find("textarea").val().length > 0
          ? addNotesToWishlist(t)
          : succesfulWishlistSubmission();
      },
    });
}

function populateWishlistPopup() {
  $("#wishListPop")
    .find("img.image-responsive")
    .attr("src", productInfo.imgSrc),
    $("#wishListPop").find("#wlProdName").html(productInfo.name),
    $("#wishListPop")
      .find("#wlProdCode")
      .html("Code: " + productInfo.code),
    $("#wishListPop").find("#wlProdOption").html(productInfo.Option),
    $("#wishListPop").find("#ProductCode").val(productInfo.code),
    $("#wishListPop").modal("show"),
    "block" == $("#addWishlistItem").css("display") &&
      ($("#addWishlistItem").hide(), $("#addProductToWishlist").show());
}
$(document).ready(function () {
  $("#baskgdpopup").on(
    "click",
    "#showwishlist:not(.removeWishlist)",
    function () {
      let t = $(this);
      (lastHeart = t),
        $("#baskgdpopup").css("z-index", 1040),
        $("#baskgdpopupClose").css("z-index", 1041),
        populateWishlistPopup();
    }
  ),
    $("body").on("click", ".removeWishlist", function (t) {
      t.preventDefault(), t.stopPropagation();
      var i = "&product_id=" + $(this).attr("data-wishlist"),
        s = this;
      $.ajax({
        url: "/Merchant5/merchant.mvc?Screen=AJAX&CustomerAction=delwishlist",
        type: "POST",
        data: i,
        showLoader: !0,
        cache: !1,
        success: function (t) {
          $("#baskgdpopup").css("z-index", 9800),
            $(s).find(".fa").removeClass("fa-heart").addClass("fa-heart-o"),
            $(s).removeClass("removeWishlist"),
            $(s).addClass("addWishlist"),
            $(s).closest(".PROD").length || $(s).addClass("addWishlist"),
            $(".product-item[data-code=" + productInfo.code + "]").each(
              function () {
                let t = $(this).find(".addFav");
                t.find(".fa").removeClass("fa-heart").addClass("fa-heart-o"),
                  t.removeClass("removeWishlist").addClass("addWishlist");
              }
            );

          $(s).find(".fa").removeClass("fa-heart").addClass("fa-heart-o"),
            $(s).removeClass("removeWishlist"),
            $(s).addClass("addWishlist").find("span").text("Add to Wishlist"),
            $(s).closest(".PROD").length || $(s).addClass("addWishlist"),
            $(".product-item[data-code=" + productInfo.code + "]").each(
              function () {
                let t = $(this).find(".addFav");
                t.find(".fa").removeClass("fa-heart").addClass("fa-heart-o"),
                  t.removeClass("removeWishlist").addClass("addWishlist");
              }
            );
        },
      });
    }),
    $("body").on("click", "#showwishlist:not(.removeWishlist)", function (t) {
      if ($("body").hasClass("PROD")) {
        let t = $(this);
        (lastHeart = t), setWishlistParams2(t), populateWishlistPopup();
      } else $("#wishListPop").find("img.image-responsive").attr("src", $(".main-product-image").attr("src")), $("#wishListPop").modal("show"), (document.getElementById("wishListId").value = "");
    }),
    $(".createWishList").click(function (t) {
      $("#wishListPop").modal("show");
    }),
    $(".createRecipeFolderBtn").click(function (t) {
      $("#recipeFolderPop").modal("show");
    }),
    $(".invitewlmodal").click(function (t) {
      $("#wishlist_url").val($(this).attr("data-url")),
        $("#inviteWishList").hasClass("sharedWishList")
          ? ($("#privateWishListmsg").hide(), $("#inviteWishList").show())
          : ($("#inviteWishList").hide(), $("#privateWishListmsg").show()),
        $("#wishListInvitePop").modal("show");
    }),
    $(".wlemail").click(function (t) {
      $("#wishlist_url").val($(this).attr("data-url")),
        $("#privateWishListmsg").hide(),
        $("#inviteWishList").show(),
        $("#wishListInvitePop").modal("show");
    }),
    $("#wishListId").change(function () {
      "wlAddNew" == $("option:selected", this).val()
        ? ($("#addProductToWishlist").hide(), $("#addWishlistItem").show())
        : ($("#addWishlistItem").hide(), $("#addProductToWishlist").show());
    }),
    $("#createWishList").submit(function (t) {
      t.preventDefault();
      var i = $("#createWishList").serialize() + "&Screen=ajax",
        s = $("#createWishList").attr("action");
      return (
        $.ajax({
          url: s,
          type: "POST",
          data: i,
          showLoader: !0,
          cache: !1,
          success: function (t) {
            $("#wishListId").html(t),
              $("#addWishlistItem").hide(),
              $("#recipeFolderPop").hide(),
              $("#wishListPop").hide(),
              //window.location.reload(),
              addProduct();
            $('input[name="WishListTitle"]').val("");
          },
        }),
        !1
      );
    }),
    $("body").on(
      "click",
      ".addFav.retailLoginclick,.retailaddFav",
      function (t) {
        if ((t.preventDefault(), $("body").hasClass("CTGY"))) {
          var i = $(this).attr("data-page");
          $(this).attr("data-search"),
            $(this).attr("data-ctgy"),
            $(this).attr("data-prod");
          window.location = "/LOGN.html?ref=" + i;
        } else if ($("body").hasClass("PROD")) {
          let t = $("body").attr("class").split(" ")[0],
            i = $(this).attr("data-prod");
          window.location = "/LOGN.html?Old_Screen=" + t + "&Product_Code=" + i;
        } else {
          let t = $("body").attr("class").split(" ")[0];
          window.location = "/LOGN.html?ref=" + t;
        }
        return !1;
      }
    ),
    $("#inviteWishList").submit(function (t) {
      t.preventDefault();
      var i = $(this).serialize() + "&Screen=ajax";
      return (
        $.ajax({
          url: $(this).attr("action"),
          type: "POST",
          data: i,
          showLoader: !0,
          cache: !1,
          success: function (t) {
            $("#inviteresponse").html(t);
          },
        }),
        !1
      );
    }),
    $("#inviteRecipeList").submit(function (t) {
      t.preventDefault();
      var i = $(this).serialize() + "&Screen=ajax";
      return (
        $.ajax({
          url: $(this).attr("action"),
          type: "POST",
          data: i,
          showLoader: !0,
          cache: !1,
          success: function (t) {
            $("#inviteRecipeListResponse").html(t);
          },
        }),
        !1
      );
    }),
    (window.lastHeart = ""),
    $("body").on("click", ".addWishlists", function () {
      $(".global-header-wrapper").css("z-index", "1006");
      if ($(this).parents(".product-item").length)
        if ($(this).parents(".product-item").length) {
          let t = $(this).parents(".product-item").find(".addFav");
          (lastHeart = t), setWishlistParams(t), populateWishlistPopup();
          alert(4);
        } else if ($("body").hasClass("BASK")) {
          alert(3);
          lastHeart = $(this);
          let t = $(this).attr("data-code");
          (productInfo = {
            code: $(this).attr("data-code"),
            sku: $(this).attr("data-sku") ? $(this).attr("data-sku") : t,
            name: $.trim($(this).parent().find(".item-name").text()),
            Option: $.trim($(this).parent().find(".decpr.packsize").text()),
            imgSrc: $(this)
              .parent()
              .parent()
              .parent()
              .find(".image-wrapper a img")
              .attr("src"),
            id: $(this).attr("data-wishlist"),
          }),
            populateWishlistPopup();
        } else (lastHeart = $(this)), populateWishlistPopup();
      else if ($(this).closest(".product-information-wrapper").length) {
        alert(2);
        lastHeart = $(this);
        let t = $(this).attr("data-code");
        (productInfo = {
          code: $(this).attr("data-code"),
          sku: $("#main-prod-card input[type=radio]:checked").val() || t,
          name: $(this).attr("data-name"),
          Option: "",
          imgSrc: $(".main-product-image").attr("src"),
          id: $(this).attr("data-wishlist"),
        }),
          populateWishlistPopup();
      } else {
        let s = $("." + prodcode + "-prodcont")
          .find("#wishlistattr")
          .val();
        alert(1);
        var t = $(this).attr("data-sku") ? $(this).attr("data-sku") : prodcode;
        let o = $("." + prodcode + "-prodcont")
            .find(".product-thumbnail .img-responsive")
            .attr("src"),
          e = $("." + prodcode + "-prodcont")
            .find(".product-thumbnail .img-responsive")
            .attr("alt"),
          a = "";
        (productInfo = {
          code: $(this).attr("data-code"),
          sku: t,
          name: e,
          Option: s,
          imgSrc: o,
          id: a,
        }),
          $("#addProductToWishlist").show(),
          $("#wishListPop").modal("show");
        var i = $("." + prodcode + "-fatc")
          .serialize()
          .replace("ADPR", "ATWL");
        $("#addToWishList").attr(
          "action",
          $("#addToWishList").attr("action") + i
        );
      }
    }),
    $("#addToWishList").submit(function (t) {
      return t.preventDefault(), addProduct(), !1;
    }),
    $(".wlsave").click(function () {
      var t = $(this).attr("data-id");
      $("#formwl-" + t).toggle();
    }),
    window.history.replaceState &&
      window.history.replaceState(null, null, window.location.href);
});

function myFunction(e, l) {
  var n = document.getElementById(e),
    t = document.getElementById(l);
  "none" === n.style.display
    ? ((n.style.display = "block"), (t.style.display = "none"))
    : ((n.style.display = "none"), (t.style.display = "block"));
  if (
    $("#showpairs .showthreebie .threebieproductbtn").is(":visible") == false
  ) {
    $("#showpairs .defaultClass").each(function () {
      $(this).click();
    });
  }

  if (
    $("#showpairs1 .showthreebie .threebieproductbtn").is(":visible") == false
  ) {
    $("#showpairs1 .defaultClass").each(function () {
      $(this).click();
    });
  }
}

function myFunction1(e, l) {
  var n = document.getElementById(e),
    t = document.getElementById(l);
  "none" === n.style.display
    ? ((n.style.display = "block"), (t.style.display = "none"))
    : ((n.style.display = "none"), (t.style.display = "block"));
}

console.log("The page is " + getPageCode);

function isNumber(s) {
  var e = (s = s || window.event).which ? s.which : s.keyCode;
  return !(e > 31 && (e < 48 || e > 57));
}

function isAlpha(s) {
  var e = (s = s || window.event).which ? s.which : s.keyCode;
  return (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
}

function isAlphaNumber(s) {
  var e = (s = s || window.event).which ? s.which : s.keyCode;
  return (
    (e >= 65 && e <= 90) ||
    (e >= 97 && e <= 122) ||
    !(e > 31 && (e < 48 || e > 57))
  );
}

function ResizeModalHeight() {
  if (jQuery(window).width() > 767) {
    var s = 0;
    $(".modal-dialog .whitebg .cellbg").each(function () {
      $(this).height() > s && (s = $(this).height());
    }),
      $(".modal-dialog .whitebg .cellbg").css("min-height", s + 10);
  }
}
$(document).ready(function () {
  $("#register_zipcode").keyup(function () {
    var s = $(this).val().split("-").join("");
    s.length > 0 && (s = s.match(new RegExp(".{1,5}", "g")).join("-")),
      $(this).val(s);
  });
}),
  $(".newslettermessage").hide(),
  $(".news").on("change", function () {
    $(".news").is(":checked")
      ? $(".newslettermessage").show()
      : $(".newslettermessage").hide();
  }),
  $(".Lclose").click(function () {
    $(".btmFixh125").css("z-index", "999999");
  });

/* category code starts here */

if (
  getPageCode == "CTGY" ||
  getPageCode == "CTGYN" ||
  getPageCode == "deli-grid" ||
  getPageCode == "SRCH"
) {
  $(document).ready(function () {
    if ($(".subdisplay .fourthactivecat." + categoryCode).length > 0) {
      $(".subdisplay").animate(
        {
          scrollLeft: $(".fourthactivecat." + categoryCode).position().left,
        },
        500
      );
    }
    // Sort by Inventory
    let divList = $(".product-item");
    let inventory = [];
    let outofstock = [];

    divList.each(function () {
      let stock = 0;
      $(this)
        .find(".form-check input")
        .each(function () {
          stock += parseInt(this.dataset.stock);
        });
      if (stock) {
        inventory.push(this);
      } else {
        outofstock.push(this);
      }
    });

    Array.prototype.push.apply(inventory, outofstock);
    // $("#category-listing .expanded").html(inventory);

    $("#catprodlisting").html(divList);
    $(".product-item a.product-item-link").click(function () {
      window.location = $(this).attr("href");
    });
    $(".waitlistbtn").click(function () {
      $("#WaitlistProductCode").val($(this).attr("data-product_code"));
      $("#WaitlistVariantID").val(
        $(this)
          .closest(".product-item")
          .find(".form-check input:checked")
          .attr("data-product_variant")
      );
    });

    $(".cust-title-button").each(function () {
      $(this).text($(this).text().replace("View", ""));
    });

    // const slider = document.querySelector(".scroll");
    // let mouseDown = false;
    // let startX, scrollLeft;

    // let startDragging = function(e) {
    //     mouseDown = true;
    //     startX = e.pageX - slider.offsetLeft;
    //     scrollLeft = slider.scrollLeft;
    // };
    // let stopDragging = function(event) {
    //     mouseDown = false;
    // };

    // slider.addEventListener("mousemove", (e)=>{
    //     e.preventDefault();
    //     if (!mouseDown) {
    //         return;
    //     }
    //     const x = e.pageX - slider.offsetLeft;
    //     const scroll = x - startX;
    //     slider.scrollLeft = scrollLeft - scroll;
    // }
    // );

    // // Add the event listeners
    // slider.addEventListener("mousedown", startDragging, false);
    // slider.addEventListener("mouseup", stopDragging, false);
    // slider.addEventListener("mouseleave", stopDragging, false);

    $(document).ready(function () {
      /* $('#sortoptions').attr('action',location.href);  */
    });

    $("#sortoptions :radio").change(function (e) {
      var myvalue = $(this).val();
      e.preventDefault();
      var links = $("#sortoptions").attr("action");
      $("#Sort_By").val(myvalue);
      $("#sortoptions").submit();
    });

    var url_string = location.href;
    //window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("Sort_By");
  });

  /*$(".sortby").click(function() {
        $(".sort-by-options-wrappers").toggle();
        if ($(".sort-by-options-wrappers").is(":visible") == true) {
            $(".sortby").text("-");
        } else {
            $(".sortby").text("+");
        }
    });*/

  function showhideFacets($this) {
    var facetname = $($this).text().replace("");
    $(".facetbox." + $this).toggle();

    $(".collapse-" + $this).hide();
    if ($(".facetbox." + $this).is(":visible") == true) {
      $(".button-" + $this).text("-");
      $(".show-" + $this).show();
    } else {
      $(".facetbox." + $this);
      $(".show-" + $this).hide();
      $(".collapse-" + $this).hide();
      $(".button-" + $this).text("+");
    }
  }

  jQuery(document).ready(function () {
    $("body").on(
      "click",
      ".product-item .product-name a, .product-item .product-thumbnail a",
      function () {
        window.location = $(this).attr("href");
      }
    );
    $(".waitlistbtn").click(function () {
      $("#WaitlistProductCode").val($(this).attr("data-product_code"));
      $("#WaitlistVariantID").val(
        $(this)
          .closest(".product-item")
          .find(".form-check input:checked")
          .attr("data-product_variant")
      );
    });

    if (window.innerWidth > 767) {
      var timerId = 0;
      var lastSearch = "";
      var fuzzySearch = function (searchStr) {
        var s = searchStr;
        lastSearch = s;
        clearTimeout(timerId);
        if (s.length < 3) return 0;
        timerId = setTimeout(function () {
          $(".search-again").addClass("loading");
          $(".srch-content").load(
            "/Merchant5/merchant.mvc?Sort_By=inventory&Screen=SRCH&Search=" +
              encodeURI(s) +
              " .srch-content-wrapper",
            function () {
              var current = new URL(document.URL);
              if (s == current.searchParams.get("Search")) return 0;
              current.searchParams.set("Search", s);
              if (current.searchParams.get("SearchOffset"))
                current.searchParams.set("SearchOffset", 0);
              history.pushState(null, null, current.href);
              $("#Search").focus();
              $("#Search").setCursorToTextEnd();
            }
          );
        }, 1000);
      };

      $("body").on("input", "#Search", function () {
        var s = $(this).val();
        fuzzySearch(s);
      });

      window.addEventListener("popstate", function (event) {
        var current = new URL(document.URL);
        if (lastSearch == current.searchParams.get("Search")) return 0;
        $(".search-again #Search").val(current.searchParams.get("Search"));
        fuzzySearch(current.searchParams.get("Search"));
      });

      $("body").on("submit", ".search-again form", function (event) {
        event.preventDefault();
      });
    }
    // filter functionality
    $("#recipeFilter").click(function () {
      $(".filterContainer").removeClass("displayNone");
    });
    $(".Fclose").click(function () {
      $(".filterContainer").addClass("displayNone");
    });
  });

  (function ($) {
    $.fn.setCursorToTextEnd = function () {
      var initialVal = this.val();
      this.val("").val(initialVal);
    };
  })(jQuery);

  /*waitlist code */
  $(".out-of-stock-new a").click(function () {
    $("#keepitcold").modal("hide");
    $("#WaitlistProductCode").val($(this).attr("data-product_code"));
    $("#wishsearch").val($(this).attr("data-product_code"));
  });
  /*waitlist code */
}
/* category page code ends here */

/* product page footer code starts here */
if (getPageCode == "PROD" || getPageCode == "PRODN") {
  /* substitution addtocart */
  var addDeliProductFromForm = function addDeliProductFromForm(
    addForm,
    sign,
    prevQuantity = null
  ) {
    var parent_item = sessionStorage.getItem("parent_item");
    console.log(parent_item, "+++++parent_item++++++");
    console.log(addForm, "addForm");
    var prodCode = $(`${parent_item}`)
      .find(`#${addForm}`)
      .find("input[type=radio]:checked")
      .val();
    console.log(prodCode, "prodCode");
    var prodQty = $(`${parent_item}`)
      .find(`#${addForm}`)
      .find('input[name="Quantity"]')
      .val();
    console.log(prodQty, "prodQty");
    // console.log(prodQty,"+++prodQty+++");
    // console.log(typeof(prodQty),"+++prodQty+++");
    var prodId = $(`${parent_item}`)
      .find(`#${addForm}`)
      .find("input[type=radio]:checked")
      .attr("data-id");
    // pack size validation
    console.log(prodId, "prodId");
    var qtySize = parseInt(
      $(`${parent_item}`)
        .find(`#${addForm}`)
        .find("input[type=radio]:checked")
        .attr("data-min")
    );
    console.log(qtySize, "qtySize");
    var parentprodcode = $(`${parent_item}`)
      .find(`#${addForm}`)
      .find("input[type=radio]:checked")
      .attr("data-product_code");
    console.log(parentprodcode, "parentprodcode");
    var buyBotton = $(`${parent_item}`)
      .find("#ProductDetail-" + parentprodcode)
      .find(".button");
    var addForm = $(`${parent_item}`).find(`#${addForm}`);

    try {
      if (fbq) {
        fbq("track", "AddToCart", {
          content_name: $(
            "#baskgdpopup .product-information-wrapper h1"
          ).text(),
          content_ids: [prodCode],
          quantity: prodQty,
          content_type: "product",
        });
      }
    } catch (e) {
    } finally {
    }

    $(buyBotton).text("Adding");
    $(buyBotton).addClass("adding");
    var selected_pcode = [prodCode];
    $.post("merchant.mvc", $($(addForm)[0]).serialize()).done(function (
      responseData
    ) {
      // console.log("Product Added");
      if (responseData && responseData.basket_count) {
        //we ask for the basktet json
        console.log("hii inside the basket");
        basketApp.basket = responseData;
        $(".basket-count").text(responseData.basket_count);
        $(".basket-total span").text("$" + responseData.total);
        var selected_group = responseData.groups.filter(({ code }) =>
          selected_pcode.includes(code)
        );
        console.log(selected_group, "+++++selected_group++++");
        // console.log($("#showmodal" + parentprodcode).find('.updatetocartbtn').text(), "+++quantity text");
        if (selected_group.length > 0) {
          $(`${parent_item}`)
            .find("#ProductDetail-" + parentprodcode)
            .find(".updatetocartbtn")
            .text(selected_group[0]["quantity"] + " Added");
          $(`${parent_item}`)
            .find("#ProductDetail-" + parentprodcode)
            .find(".psubtotal")
            .text(selected_group[0]["formatted_subtotal"]);
          $(`${parent_item}`)
            .find("#updateSubstitution-" + parentprodcode)
            .find('input[name="Basket_Group"]')
            .val(selected_group[0]["group_id"]);
          $(`${parent_item}`)
            .find("#updateSubstitution-" + parentprodcode)
            .find('input[name="Quantity"]')
            .val(selected_group[0]["quantity"]);
        }
      } else {
        if ($(responseData).find("#basket-contents").length) {
          //we are in the bask page
          $("#basket-contents").html(
            $(responseData).find("#basket-contents").html()
          );
        }

        basketApp.loadBasket();
      }
      // reducing the inventory at parent level start
      if (
        $("input[data-product_code=" + parentprodcode + "][type=radio]").length
      ) {
        // console.log($("input[value=" + prodCode + "][type=radio]").length)
        // console.log("Updating produc " + prodCode + " availablity");

        $(`${parent_item}`)
          .find("#updateSubstitution-" + parentprodcode)
          .find(`input[data-id=${prodId}]`)
          .attr("checked", true);
        if (sign === "+") {
          console.log(parseInt(prevQuantity), "+++++inside++++");
          $("input[data-product_code=" + parentprodcode + "][type=radio]").attr(
            "data-stock",
            parseInt(
              $("input[value=" + prodCode + "][type=radio]").attr("data-stock")
            ) - qtySize
          );
        } else {
          console.log(parseInt(prevQuantity), "+++++consolelog++++");
          if (parseInt(prevQuantity) > 1) {
            $(
              "input[data-product_code=" + parentprodcode + "][type=radio]"
            ).attr(
              "data-stock",
              parseInt(
                $("input[value=" + prodCode + "][type=radio]").attr(
                  "data-stock"
                )
              ) + qtySize
            );
          }
        }
      }
      // reducing the inventory at parent level end

      setTimeout(function () {
        //  $(buyBotton).text(prevText); // Show legend of QTY in cart

        refreshItemsOnBasket();
        $(buyBotton).removeClass("adding");
      }, 1000);

      if (parseInt(prodQty) < 1 && sign === "-") {
        console.log("hi inside the new code <1 ");
        $(`${parent_item}`)
          .find("#addSubstitution" + parentprodcode)
          .removeClass("displayNone");
        $(`${parent_item}`)
          .find("#ProductDetail-" + parentprodcode)
          .find(".addtocartbtn")
          .removeClass("displayNone");
        $(`${parent_item}`)
          .find("#ProductDetail-" + parentprodcode)
          .find(".addtocartbtn")
          .text("Add Sub");
        // $(`${parent_item}`).find("#addSubstitution-" + parentprodcode).find('.dLabel1').dropdown();
        console.log(
          $(`${parent_item}`)
            .find("#ProductDetail-" + parentprodcode)
            .find(".inputBox")
            .html()
        );

        $(`${parent_item}`)
          .find("#updateSubstitution-" + parentprodcode)
          .addClass("displayNone");
        $(`${parent_item}`)
          .find("#ProductDetail-" + parentprodcode)
          .find(".inputBox")
          .addClass("displayNone");
        $(`${parent_item}`)
          .find("#ProductDetail-" + parentprodcode)
          .find(".priceloop")
          .addClass("displayNone");
      } else {
        console.log("inside another loop");

        $(`${parent_item}`)
          .find("#ProductDetail-" + parentprodcode)
          .find(".inputBox")
          .removeClass("displayNone");
        $(`${parent_item}`)
          .find("#ProductDetail-" + parentprodcode)
          .find(".addtocartbtn")
          .addClass("displayNone");
        $(`${parent_item}`)
          .find("#ProductDetail-" + parentprodcode)
          .find(".priceloop")
          .removeClass("displayNone");

        $(`${parent_item}`)
          .find("#updateSubstitution-" + parentprodcode)
          .removeClass("displayNone");
        $(`${parent_item}`)
          .find("#addSubstitution" + parentprodcode)
          .addClass("displayNone");
        $(`${parent_item}`)
          .find("#updateSubstitution-" + parentprodcode)
          .find(".dLabel1")
          .dropdown();
      }
    });
  };

  var addDeliProduct1 = function (formId) {
    alert();
    // console.log(formId);
    var addForm = $("#" + formId);
    var parent_item = sessionStorage.getItem("parent_item");
    console.log(parent_item);

    var targetInput = $(`${parent_item}`)
      .find(`#${formId}`)
      .find("input[type=radio]:checked");
    var totalQntyAvailable = parseInt(
      $.trim($(targetInput).attr("data-stock"))
    );
    console.log(totalQntyAvailable, "totalQntyAvailable");
    var qtySize = parseInt($.trim($(targetInput).attr("data-min")));
    console.log(qtySize, "qtySize");
    var errorMsg =
      "Sorry, we do not have enough quantity to fulfill your order.\r\nPlease adjust the quantity and try again. Quantity Available:";
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);

    if (qtySize > totalQntyAvailable) {
      $("#new_globalerrorpopup .gpoperror").html(errorMsg + " " + remaingQnty);
      $("#new_globalerrorpopup").modal("show");
      return false;
    }
    addDeliProductFromForm(formId, "+");
  };

  var timer_id = setTimeout(function () {}, 1);
  var addDeliProduct = function (formId, sign) {
    console.log("inside the update");
    var parent_item = sessionStorage.getItem("parent_item");
    console.log(parent_item);

    var addForm = $(`${parent_item}`).find("#" + formId);
    event.preventDefault();
    // var addForm = $('#' + formId)

    var targetInput = $(addForm).find("input[type=radio]:checked");
    console.log(targetInput, "+++targetInput++");

    var currentValue = $(addForm).find('input[name="Quantity"]').val();
    console.log(currentValue, "++++");
    var prevQuantity = $(addForm).find('input[name="Quantity"]').val();
    console.log(prevQuantity + "prevQuantity");
    var totalQntyAvailable = parseInt(
      $.trim($(targetInput).attr("data-stock"))
    );
    console.log(totalQntyAvailable + "totalQntyAvailableshilpa");
    var qtySize = parseInt($.trim($(targetInput).attr("data-min")));
    console.log(qtySize + "qtySizeshilpa");
    var errorMsg =
      "Sorry, we do not have enough quantity to fulfill your order.\r\nPlease adjust the quantity and try again. Quantity Available:";
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);
    // console.log(remaingQnty+"remaingQnty shilpa");
    if (isNaN(currentValue)) {
      currentValue = 1;
    }

    if (sign === "+") {
      currentValue++;
      if (qtySize * 1 > totalQntyAvailable) {
        $("#new_globalerrorpopup .gpoperror").html(
          errorMsg + " " + remaingQnty
        );
        $("#new_globalerrorpopup").modal("show");
        return false;
      }
      $(targetInput).attr("data-stock", totalQntyAvailable - qtySize);
    } else if (sign === "-") {
      // currentValue = currentValue > 2 ? currentValue - 1 : 1;
      currentValue = currentValue > 0 ? currentValue - 1 : 0;
      $(targetInput).attr("data-stock", totalQntyAvailable + qtySize);
    }
    //   console.log("Updating Qty to:......" + $(this).closest('.basket-qty-input').val());

    $(addForm).find('input[name="Quantity"]').val(currentValue);

    clearTimeout(timer_id);
    // console.log("restarting timer");
    timer_id = setTimeout(function () {
      addDeliProductFromForm(formId, sign, prevQuantity);
    }, 1000);
  };
  /*substitution addtocart */

  function ProdLovelyitems() {
    $(".featured-products-carousel").owlCarousel({
      navText: [
        "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 2rem;transform:rotate(180deg);filter: brightness(0.2);'>",
        "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 2rem;filter: brightness(0.2);'>",
      ],
      items: 5,
      loop: false,
      pagination: false,
      responsiveClass: true,
      dots: false,
      nav: true,
      lazyLoad: true,
      responsive: {
        0: {
          items: 2,
          nav: true,
          lazyLoad: true,
        },
        600: {
          items: 3,
          nav: true,
          lazyLoad: true,
        },
        1000: {
          items: 4,
          nav: true,
          loop: false,
          lazyLoad: true,
          touchDrag: false,
          mouseDrag: false,
        },
      },
    });
  }

  function getMoretolove() {
    var url = window.location.pathname;
    console.log("the url is " + url + mtlproduct_code);
    $.when(
      $.get(
        "/prodn.html?CustomerAction=loadmoretolove&Product_Code=" +
          mtlproduct_code +
          "&cat_code=" +
          mtlcat_code,
        "ismarket=" + isthimarketproduct,
        function (t) {
          $(".loadmoretolove").html(t);
        }
      )
    ).then(function () {
      $(".related-products").ready(function () {
        ProdLovelyitems();
        addProductNew();
        CheckBasketItems();
        // $.getScript("/Merchant5/scripts/00000001/vueapp.js?T=5fe8a6e44");
      });
    });
  }

  function getMoretolovenew() {
    var url = window.location.pathname;
    console.log("the url is " + url + mtlproduct_code);
    loadProducts([
      "morelovelyitems",
      "loadmorelovelyproducts",
      mtlproduct_code,
      mtlcat_code,
      isthimarketproduct,
    ]);
    $(".loadmoretolove").html();
  }

  $("#prodContents").ready(function () {
    getMoretolovenew();
  });

  $(window).on("load", function () {
    $("[data-src]").each(function () {
      var $this = $(this),
        src = $(this).data("src");
      $this.attr("src", src);
    });
    if ($("body").find(".out-of-stock-new").is(":visible")) {
    } else {
    }
  });

  document
    .querySelector("body")
    .addEventListener("toggle", function afterToggle(e) {
      if (e.target.open) {
        //do something when opened
      } else {
        //do something when closed
      }
    });

  /*product related js starts here */
  jQuery(document).ready(function () {
    $(".related-products-carousel").owlCarousel({
      autoplay: false,
      loop: true,
      margin: 15,
      nav: true,
      pagination: false,
      dots: false,
      navigation: true,
      navigationText: [
        "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 2rem;transform:rotate(180deg);filter: brightness(0.4);'>",
        "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 2rem;filter: brightness(0.4);'>",
      ],
      itemsDesktop: [990, 5],
      itemsDesktopSmall: [768, 3],
      itemsTablet: [767, 2],
      itemsTabletSmall: [650, 2],
      itemsMobile: [480, 2],
    });

    $(".waitlistbtn").click(function () {
      $("#WaitlistProductCode").val($(this).attr("data-product_code"));
      $("#WaitlistVariantID").val(
        $(this)
          .closest(".product-item")
          .find(".form-check input:checked")
          .attr("data-product_variant")
      );
    });

    function waitlistCheck($this) {
      var selectedSize = jQuery("option:selected", $this);
      if (selectedSize.attr("data-stock") < 1) {
        jQuery(
          "." + selectedSize.attr("data-product_code") + "-oos .waitlistbtn"
        ).attr("data-product_code", selectedSize.attr("data-product_code"));
        jQuery(
          "." + selectedSize.attr("data-product_code") + "-oos .waitlistbtn"
        ).attr(
          "data-product_variant",
          selectedSize.attr("data-product_variant")
        );
        jQuery("." + selectedSize.attr("data-product_code") + "-atc").hide();
        jQuery("." + selectedSize.attr("data-product_code") + "-oos").show();
      } else {
        jQuery("." + selectedSize.attr("data-product_code") + "-oos").hide();
        jQuery("." + selectedSize.attr("data-product_code") + "-atc").show();
      }
    }
    jQuery(".selectsize").change(function () {
      waitlistCheck(this);
    });
    jQuery(".recentlyviewed")
      .find(".proddetailbox")
      .each(function () {
        waitlistCheck(jQuery(this).find(".selectsize"));
      });

    $(".tab-accordion .prv-title").click(function () {
      var parentDiv = $(this).closest(".tab-accordion").attr("id");
      $("#" + parentDiv).toggleClass("active");
      return false;
    });

    jQuery(".est_outer_wrap").click(function (e) {
      var zipcode = $("input[name='ShipEstimate:ship_zip_hidden']").val();
      console.log($("input[name='ShipEstimate:ship_zip_hidden']").val());
      var zip = $(".getzip").val(zipcode);
      if (zipcode == "") {
        $("#shipestimate_rates").html("");
        $(".validatemsg").show().css("color", "#628e83").text("");
      } else {
        if (zip == "") {
          $("#shipestimate_rates").html("");
        } else {
          $("input[name='ShipEstimate:ship_zip']").css(
            "border",
            "solid 1px #628e83"
          );
          $(".getshipinfo").prop("disabled", false);
          $("#estimateinfo").submit();
        }
      }
      setTimeout(function () {
        $(".validatemsg").hide();
      }, 5000);
    });

    window.chooseProductTab = function (el) {
      $(".panel-header p").removeClass("activeTab");
      $(".panel-headers p").removeClass("activeTab");
      $(el).addClass("activeTab");
      if ($(el).parent().parent().find(".collapse").hasClass("show")) {
        $("#product-info-aco-mobile .collapse").removeClass("show");
        $("#product-info-aco-mobile .panel").removeClass("active");

        $("#product-info-aco .collapse").removeClass("show");
        $("#product-info-aco .panel").removeClass("active");
      } else {
        $("#product-info-aco-mobile.collapse").removeClass("show");
        $("#product-info-aco-mobile .panel").removeClass("active");

        $("#product-info-aco.collapse").removeClass("show");
        $("#product-info-aco .panel").removeClass("active");
        $(el).parent().parent().find(".collapse").addClass("show");
        $(el).parent().parent().addClass("active");
      }
    };

    $("body").on("click", ".addtobasket-wrapper", function () {
      var price = $(this)
        .find("input:checked + label .price")
        .text()
        .trim()
        .substring(1)
        .replace(/,/g, "");
      var qty = $(this).find(".product-quantity-input").val();
      $(this)
        .find(".card-subtotal span")
        .text("$" + (parseFloat(price) * parseFloat(qty)).toFixed(2));
      $(this).find(".card-subtotal").css("opacity", 1);
    });

    $("body").on("mouseenter", ".addtobasket-wrapper", function () {
      var price = $(this)
        .find("input:checked + label .price")
        .text()
        .trim()
        .substring(1)
        .replace(/,/g, "");
      var qty = $(this).find(".product-quantity-input").val();
      $(this)
        .find(".card-subtotal span")
        .text("$" + (parseFloat(price) * parseFloat(qty)).toFixed(2));
      $(this).find(".card-subtotal").css("opacity", 1);
    });

    $("#thumbnails li:first").addClass("selectedThumbnail");
    $("#thumbnails li img").click(function () {
      $("li").removeClass("selectedThumbnail");
      $(this).parent().addClass("selectedThumbnail");
    });
  });

  function ResizeBoxes() {
    var maxHeight = 0;
    jQuery(
      ".alsobought .featured-products-carousel .individual-featured-product"
    ).each(function () {
      if (jQuery(this).height() > maxHeight) {
        maxHeight = jQuery(this).height();
      }
    });
    jQuery(
      ".alsobought .featured-products-carousel .individual-featured-product"
    ).height(maxHeight);
    jQuery(".scrollhead .alsolike-products").css(
      "height",
      jQuery(".coladdnlprods").height()
    );
  }

  $(window).on("load", function () {
    ResizeBoxes();
  });
  setInterval(function () {
    ResizeBoxes();
  }, 500);

  var hash = location.hash.substr(1);
  if (hash) {
    $("#" + hash).toggleClass("active");
  }

  if ($(".featured-products-carousel").html() == "\n") {
    $(".makethiscompletedinner").hide();
  } else {
    $(".makethiscompletedinner").show();
  }

  /* product display code start */

  $("#restockest").on("shown.bs.modal", function () {
    $(".modal-backdrop.in").hide();
  });
  /* est restock code ends*/
  function loadRestock() {
    $("#estrestock").dialog({
      draggable: false,
    });
  }

  /* to check whether thumbnails are there or not */
  var thumbnais = $("#thumbnails li").length;
  var thumbnailcontainer = $(".thumbnail-container").html();
  var imagecontainer = $(".image-container").html();
  if (thumbnais == 0) {
    $(".thumbnail-container").removeClass(
      "col-lg-2 col-md-2 col-sm-2 col-xs-2"
    );
    $(".image-container").removeClass(
      "col-lg-10 col-md-10 col-sm-10 col-xs-10"
    );
    $(".thumbnail-container").addClass("hidden");
    $(".image-container").addClass("col-lg-12 col-md-12 col-sm-12 col-xs-12");
    $(".buttonholder").removeClass("addtop");
  } else {
    $(".thumbnail-container").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
    $(".image-container").addClass("col-lg-10 col-md-10 col-sm-10 col-xs-10");
    $(".buttonholder").addClass("addtop");
  }

  $(".savePackDisplay").each(function () {
    if ($(this).text() == "") {
    } else if (!$(this).text()) {
      $(".dropdown-item").click(function () {
        $(".savePackDisplay").css("visibility", "visible");
        $(".savePackDisplay").css("height", "40px");
      });
    }
  });

  $(".cw-1").hide();
  $(".reviews").hide();
  $(".spt-1").hide();
  $(".sp-1").hide();
  $(".nut-1").hide();
  $(".spec-1").hide();
  $(".ing-1").hide();

  function showProducttab($this, texts) {
    if (texts == "pw-1") {
      $(".product-description").show();
      $(".pw-1").show();
      $(".activeTab").removeClass("activeTab");
      $(".cw-1").hide();
      $(".reviews").hide();
      $(".spt-1").hide();
      $(".sp-1").hide();
      $(".nut-1").hide();
      $(".spec-1").hide();
      $(".ing-1").hide();
      $($this).addClass("activeTab");
    } else if (texts == "cw-1") {
      $(".product-description").show();
      $(".cw-1").show();
      $(".activeTab").removeClass("activeTab");
      $(".pw-1").hide();
      $(".reviews").hide();
      $(".spt-1").hide();
      $(".sp-1").hide();
      $(".nut-1").hide();
      $(".spec-1").hide();
      $(".ing-1").hide();
      $($this).addClass("activeTab");
    } else if (texts == "sp-1") {
      $(".product-description").show();
      $(".activeTab").removeClass("activeTab");
      $(".cw-1").hide();
      $(".reviews").hide();
      $(".pw-1").hide();
      $(".spt-1").hide();
      $(".sp-1").show();
      $(".nut-1").hide();
      $(".spec-1").hide();
      $(".ing-1").hide();
      $($this).addClass("activeTab");
    } else if (texts == "spt-1") {
      $(".product-description").show();
      $(".activeTab").removeClass("activeTab");
      $(".cw-1").hide();
      $(".reviews").hide();
      $(".pw-1").hide();
      $(".sp-1").hide();
      $(".spt-1").show();
      $(".nut-1").hide();
      $(".spec-1").hide();
      $(".ing-1").hide();
      $($this).addClass("activeTab");
    } else if (texts == "nut-1") {
      $(".product-description").show();
      $(".activeTab").removeClass("activeTab");
      $(".cw-1").hide();
      $(".reviews").hide();
      $(".pw-1").hide();
      $(".spt-1").hide();
      $(".sp-1").hide();
      $(".spec-1").hide();
      $(".ing-1").hide();
      $(".nut-1").show();
      $($this).addClass("activeTab");
    } else if (texts == "reviews") {
      $(".product-description").show();
      $(".activeTab").removeClass("activeTab");
      $(".cw-1").hide();
      $(".pw-1").hide();
      $(".spt-1").hide();
      $(".sp-1").hide();
      $(".nut-1").hide();
      $(".spec-1").hide();
      $(".ing-1").hide();
      $(".reviews").show();
      $($this).addClass("activeTab");
    } else if (texts == "spec-1") {
      $(".product-description").show();
      $(".activeTab").removeClass("activeTab");
      $(".cw-1").hide();
      $(".pw-1").hide();
      $(".spt-1").hide();
      $(".sp-1").hide();
      $(".nut-1").hide();
      $(".reviews").hide();
      $(".spec-1").show();
      $(".ing-1").hide();
      $($this).addClass("activeTab");
    } else if (texts == "ing-1") {
      $(".product-description").show();
      $(".activeTab").removeClass("activeTab");
      $(".cw-1").hide();
      $(".pw-1").hide();
      $(".spt-1").hide();
      $(".sp-1").hide();
      $(".nut-1").hide();
      $(".reviews").hide();
      $(".spec-1").show();
      $(".ing-1").show();
      $($this).addClass("activeTab");
    }
  }
  /* to check whether thumbnails are there or not */

  /* change Add to Order Guide check */
  $(".form-check-dropdown").click(function () {
    var productcode = $(this).children(".form-check-input").val();
    $(".orderguide").attr("data-code", productcode);
  });

  /*delay image after 3 seconds*/
  window.onload = (event) => {
    setTimeout(function () {
      var mainimg = $(this).attr("data-src2");
      $(".main-product-image").each(function () {
        $(this).attr("src", mainimg);
      });
    }, 5000);
  };
}

//function to add items / products to orderguide
function addtoOrderGUide(buyBotton) {
  buyBotton = $(buyBotton);
  var user = $(buyBotton).attr("data-oguser");
  var type = $(buyBotton).attr("data-ogtype");
  var productprice = $(buyBotton).attr("data-product_price");
  if (user == "Wholesale") {
    ogtext = "Order Guide";
  } else {
    ogtext = "Shopping List";
  }
  let prevText = $(buyBotton).text();
  // $(buyBotton).addClass("adding");
  var array = [];
  var product_code = $(buyBotton).attr("data-code");
  var order_id = [];
  var customerid = $("#customerId").val();
  var product_id = $(buyBotton).attr("data-product-id");
  jQuery.ajax({
    url: "/ajax.html?CustomerAction=" + type,
    data:
      "product_id=" +
      product_id +
      "&product_code=" +
      product_code +
      "&order_id=" +
      order_id +
      "&customer_id=" +
      customerid +
      "&product_price=" +
      productprice,
    showLoader: true,
    cache: false,
    beforeSend: function () {
      if (getPageCode != "PROD") {
      }
      if (type == "deleteOrderGuideItem") {
        $(buyBotton).text("Removing");
      } else {
        $(buyBotton).text("Adding");
      }
    },
    success: function (data) {
      var text = "";

      if (type == "deleteOrderGuideItem") {
        $(buyBotton).text("Removing");
        text = "Add to ";
        deleteProductPrice(product_id, customerid);
      } else {
        $(buyBotton).text("Adding");
        text = $(buyBotton).hasClass("underline")
          ? "Added to "
          : "Remove from ";
      }

      // text = 'Added to ';

      $(buyBotton).text(text + ogtext);
      if (type === "deleteOrderGuideItem") {
        $(buyBotton).attr("data-ogtype", "insertOrderGuide");
      } else {
        $(buyBotton).attr("data-ogtype", "deleteOrderGuideItem");
      }
      // $(buyBotton).addClass("bold-ft");
      if ($(buyBotton).hasClass("underline")) {
        $(buyBotton).attr("onclick", "").unbind("click");
      }
      setTimeout(() => {
        /*$(buyBotton).text(prevText); */
        if (getPageCode != "PROD") {
          //$(buyBotton).removeClass("adding");
        }
      }, 3000);
      $("input[type=checkbox]:checked").attr("disabled", true);
      $("#addtocart3").attr("disabled", true);
      // addProductDatatoUserSavedlist(product_code,customerid,productprice)
      addProductDatatoUserSavedlist(product_id, customerid, productprice);
      if(getPageCode == 'ordguide') {
        $('#ordguideproducts input[type=checkbox]:checked').attr('disabled',false);
        parseInt($("#defaultoffset").val(-10));
        ogobjects.products = [];
        ogobjects.getallproducts('', '');
      }
    },
  });
}
//function to add items / products to orderguide

/* product page footer code ends here */
$(document).on("click", function (e) {});

/* newsletter.js starts here */

$(window).on("load", function () {
  $("body").removeClass("loader");
  $("body").find('[data-toggle="tooltip"]').tooltip();
});
$(document).ready(function () {
  $("#couponCodeId").addClass("displayNone");
  $("#emailExist").addClass("displayNone");
  $("#noBAccount").addClass("displayNone");
  $("#businessSuccess").addClass("displayNone");
  $("#retailAccount").addClass("displayNone");

  $("#Baccount").click(function () {
    $("#newsLetterModal").modal("hide");
  });
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let email = "";
  $("#retailNewsRadio").click(function () {
    if (
      regex.test(email) &&
      ($("#businessRadio").prop("checked") == true ||
        $("#retailNewsRadio").prop("checked") == true)
    ) {
      $("#NLFormsubmit").prop("disabled", false);
      $("#NLFormsubmit").removeClass("btndisabled");
    } else {
      $("#NLFormsubmit").prop("disabled", "disabled");
      $("#NLFormsubmit").addClass("btndisabled");
    }
  });

  $("#businessRadio").click(function () {
    if (
      regex.test(email) &&
      ($("#businessRadio").prop("checked") == true ||
        $("#retailNewsRadio").prop("checked") == true)
    ) {
      $("#NLFormsubmit").prop("disabled", false);
      $("#NLFormsubmit").removeClass("btndisabled");
    } else {
      $("#NLFormsubmit").prop("disabled", "disabled");
      $("#NLFormsubmit").addClass("btndisabled");
    }
  });

  $("#email").on("keyup", function () {
    email = $(this).val();
    // if (regex.test($(this).val()) && ($('#businessRadio').prop('checked') == true || $('#retailNewsRadio').prop('checked') == true)) {
    if (regex.test($(this).val())) {
      $(".form-check-input").prop("disabled", false);

      //$('#NLFormsubmit').prop('disabled', false);

      //$('#NLFormsubmit').removeClass('btndisabled')
    } else {
      $("#NLFormsubmit").addClass("btndisabled");
      $("#NLFormsubmit").prop("disabled", "disabled");
    }
  });
});
$("#newsLetterModal").on("hide.bs.modal", function (e) {
  // do something...
  $("#initalNewsPapaerBody").removeClass("dispalyNone");
});

/* newsletter.js ends here */

/* CTGY Banner popup starts here*/
if (getPageCode == "CTGY") {
  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var lockBodyScroll = function () {
    if (iOS) {
      $("html, body").addClass("stop-scrolling");
    } else {
      $("body").css("overflow-y", "hidden");
    }
  };
  var unlockBodyScroll = function () {
    if (iOS) {
      $("html, body").removeClass("stop-scrolling");
    } else {
      $("body").css("overflow-y", "initial");
    }
  };
  var bannerPop = {};
  bannerPop.open = function (pageCode) {
    lockBodyScroll();
    $(".banner-popup .main-content-section").html(
      '<center><p><img src="graphics/00000001/loading.gif"></p></center>'
    );
    $(".banner-popup").fadeIn();
    $(".banner-popup .main-content-section").load(
      "/" + pageCode + ".html",
      function () {
        //Do some after loading...
      }
    );
  };
  bannerPop.close = function () {
    unlockBodyScroll();
    $(".banner-popup").fadeOut();
  };
  $("body").on("click", "#CtgyBannerPopup .fa.fa-close", function () {
    bannerPop.close();
  });
  ///LOVEDROP
}

function Showestimatetiming() {
  let zip = $(".getzip").val();
  $(".shippingMethodRadio").each(function () {
    let url =
      "/Merchant5/FedExApi/estimate-delivery-new.php?baskweight=40&destzip=" +
      zip;
    jQuery.ajax({
      url: url,
      type: "POST",
      showLoader: true,
      cache: false,
      beforeSend: function () {
        $(".loaderContainer").show();
      },
      success: function (data) {
        $(".shippingMethodRadio").each(function () {
          var selectedShiping = $(this).attr("shiping-method");
          let type = JSON.parse(data);
          $(this)
            .find(".showestimatetime")
            .text("Estimated: " + type[selectedShiping]);
        });
      },
    });
  });
}
/*EST-SHIPPING ends here*/

function delay(ms) {
  var cur_d = new Date();
  var cur_ticks = cur_d.getTime();
  var ms_passed = 0;
  while (ms_passed < ms) {
    var d = new Date();
    // Possible memory leak?
    var ticks = d.getTime();
    ms_passed = ticks - cur_ticks;
    // d = null;  // Prevent memory leak?
  }
}

function getNewsletter() {
  $.when(
    $.get("/sfntajax.html?CustomerAction=newsletter", function (t) {
      $("#newsLetterModal").html(t);
    })
  ).then(function () {
    $("#newsLetterModal").modal("toggle");

    /*add js to function newsletter properly */
    $("#couponCodeId").addClass("displayNone");
    $("#emailExist").addClass("displayNone");
    $("#noBAccount").addClass("displayNone");
    $("#businessSuccess").addClass("displayNone");
    $("#retailAccount").addClass("displayNone");

    $("#Baccount").click(function () {
      console.log("step2");
      $("#newsLetterModal").modal("hide");
    });
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //var regex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = "";
    /* $(".form-check-input1").click(function() {
            console.log("step3");
            if (regex.test(email) && ($("#businessRadio").prop("checked") == true || $("#retailNewsRadio").prop("checked") == true)) {
                $("#NLFormsubmit").prop("disabled", false);
                $("#NLFormsubmit").removeClass("btndisabled");
            } else {
                $("#NLFormsubmit").prop("disabled", "disabled");
                $("#NLFormsubmit").addClass("btndisabled");
            }
            $("#businessRadio").prop("checked", false);
        });*/

    /* $("#businessRadio").click(function() {
            if (regex.test(email) && ($("#businessRadio").prop("checked") == true || $("#retailNewsRadio").prop("checked") == true)) {
                $("#NLFormsubmit").prop("disabled", false);
                $("#NLFormsubmit").removeClass("btndisabled");
            } else {
                $("#NLFormsubmit").prop("disabled", "disabled");
                $("#NLFormsubmit").addClass("btndisabled");
            }
            $("#retailNewsRadio").prop("checked", false);
        }); */

    $("#email").on("keyup", function () {
      //console.log("step 5 ")
      email = $(this).val();
      console.log(email, "+++email+++");
      console.log(email.length);
      // if (regex.test($(this).val()) && ($('.form-check-input1').prop('checked') == true || $('.form-check-input1').prop('checked') == true)) {
      //   if (email == "") {
      //     console.log("not ture");
      //   } else {}
      if (regex.test(email) == true) {
        $(".form-check-input1").prop("disabled", false);
        //$('#NLFormsubmit').removeClass('btndisabled')
        //$('#NLFormsubmit').prop('disabled', false);
      } else {
        $("#NLFormsubmit").addClass("btndisabled");
        $("#NLFormsubmit").prop("disabled", "disabled");
        //   added newly 2-4-2024
        $(".form-check-input1").prop("checked", false);
        $(".form-check-input1").prop("disabled", true);
        $("#NLFormsubmit").prop("disabled", true);
        // copied from email check
        $("#NLFormsubmit").addClass("btndisabled");
        $("#NLFormsubmit").prop("disabled", "disabled");
        $(".form-check-input1").prop("checked", false);
        $(".form-check-input1").prop("disabled", true);
      }
    });

    /* $("#newsletter").on("change", "input:checkbox", function(){ 
               $('#NLFormsubmit').removeClass('btndisabled')
               $('#NLFormsubmit').prop('disabled', false);
          });*/

    $(".form-check-input1").on("click", function () {
      if ($(".form-check-input1:checked").length > 0) {
        $("#NLFormsubmit").removeClass("btndisabled");
        $("#NLFormsubmit").prop("disabled", false);
      } else {
        $("#NLFormsubmit").addClass("btndisabled");
        $("#NLFormsubmit").prop("disabled", true);
      }
    });

    $("#newsletter").submit(function (e) {
      e.preventDefault();
      var formData = $(this).serialize();
      //console.log(formData);
      let count = $(".form-check-input1:checked").length;

      $.ajax({
        url: "ccsignup.php",
        type: "POST",
        data: formData,
        cache: false,
        beforeSend: function () {
          $("#NLFormsubmit").prop("disabled", true);
        },
        success: function (responseData) {
          responseData = $.trim(responseData);
          document.getElementById("newsletter").reset();
          $("#NLFormsubmit").prop("disabled", "disabled");
          $("#NLFormsubmit").addClass("btndisabled");

          if (responseData.includes("apierror")) {
            $("#initalNewsPapaerBody").addClass("displayNone");
            $("#retailAccount").removeClass("displayNone");
          } else if (responseData.includes("business-success")) {
            $("#initalNewsPapaerBody").addClass("displayNone");
            $("#businessSuccess").removeClass("displayNone");
          } else if (responseData.includes("emailexist")) {
            //console.log("exist");
            $("#initalNewsPapaerBody").addClass("displayNone");
            $("#emailRetailExist").removeClass("displayNone");
          } else {
            if (count > 1) {
              console.log(count);
              $("#initalNewsPapaerBody").addClass("displayNone");
              $("#couponCodeRetailBusiness").removeClass("displayNone");
            } else {
              console.log(count);
              $("#initalNewsPapaerBody").addClass("displayNone");
              $("#couponCodeId").removeClass("displayNone");
              document.getElementById("couponCodeText").innerHTML =
                responseData;
            }
          }
          //   added Google analytics code please do not remove
          console.log(urlpath);
          if (
            urlpath === "https://foodrelated.com" ||
            urlpath === "https://www.foodrelated.com"
          ) {
            dataLayer.push({
              event: "subscribe",
            });
          }
          //   added Google analytics code please do not remove
        },
      });
    });
    /*add js to function newsletter properly */
  });
}

$("#new_globalerrorpopup").on("hide.bs.modal", function (e) {
  $(this).css({
    "z-index": "2!important",
  });
  setTimeout(function () {
    $(".global-header-wrapper").css("z-index", "1006");
  }, 1000);
});

$("#new_globalerrorpopup").on("hidden.bs.modal", function (e) {
  $(this).css({
    "z-index": "2!important",
  });
  setTimeout(function () {
    $(".global-header-wrapper").css("z-index", "1006");
  }, 1000);
});

/*product quantity check */

$(".QtyVal").on("keypress keyup blur", function (event) {
  $(this).val(
    $(this)
      .val()
      .replace(/[^\d].+/, "")
  );
  if (event.which < 48 || event.which > 57) {
    event.preventDefault();
  }
});

function disableEnter() {
  var search = $(".search-button").val();
  var coupon = $('input[name="Coupon_Code"]').val();
  if (search == "Search" || coupon) {
    console.log("yes");
  } else {
    $(window).keydown(function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });
  }
}

function GetState(element) {
  var id = $(element).attr("id");
  var zipval = $(element).val();
  console.log(zipval);
  var getstate = "";
  var zipcodes = "/Merchant5/scripts/USCities.json";
  $.getJSON(zipcodes, function (data) {
    console.log(data);
    var zipcode = data.filter((x) => x.zip_code == zipval);
    if (zipcode.length != 0) {
      getstate = zipcode[0].state;
      $("select[name='Address_StateSelect']").css(
        "border",
        "solid 1px #e2e2e2"
      );
      $("select[name='Address_StateSelect']").prop("disabled", false);
      $("select[name='ShipStateSelect']").prop("disabled", false);
      $("select[name='register_state']").prop("disabled", false);
      $("select[name='ShipStateSelect']").css("border", "solid 1px #e2e2e2");
      $("select[name='register_state']").css("border", "solid 1px #e2e2e2");
      $("input[name='register_zipcode']").removeAttr("style");
      //$(".formBtncreateAccount").prop("disabled", false);
      $(".invalidmessage").hide();
    } else {
      getstate = "";
      $("select[name='Address_StateSelect']").css(
        "border",
        "solid 1px #f47a44"
      );
      $("select[name='Address_StateSelect']").prop("disabled", true);
      $("select[name='ShipStateSelect']").prop("disabled", true);
      $("select[name='register_state']").prop("disabled", true);
      $("select[name='ShipStateSelect']").css("border", "solid 1px #f47a44");
      $("select[name='register_state']").css("border", "solid 1px #f47a44");
      $("input[name='register_zipcode']").css("border", "solid 1px #f47a44");
      //$(".formBtncreateAccount").prop("disabled", true);
      $(".invalidmessage").addClass("shake").show();
    }

    console.log(getstate + $(element).attr("id"));
    $("select[name='Address_StateSelect']")
      .val(getstate)
      .attr("selected", "selected");
    $("select[name='ShipStateSelect']")
      .val(getstate)
      .attr("selected", "selected");
    $("select[name='register_state']")
      .val(getstate)
      .attr("selected", "selected");
  });
}

function GetStateValidation() {
  var checkvalidornot = 0;
  var zipcode = "";
  var zipval = String($("input[name='Address_Zip']:visible").val());
  var zipcodes = "/Merchant5/scripts/USCities.json";
  var checkvalidornot = "";
  $.ajax({
    async: false,
    dataType: "json",
    url: zipcodes,
    success: function (data) {
      //zipcode = data.filter((x) => String(x.zip_code) == zipval);
      zipcode = data.filter((x) => x.zip_code == zipval);
      console.log("berofre check " + zipval);
      if (zipcode.length > 0 && zipval == zipcode[0].zip_code) {
        console.log("after zipcode " + zipcode[0].zip_code);
        getstate = zipcode[0].state;
        getstatevalue = zipcode[0].state;
        $("select[name='Address_StateSelect']:visible").prop("disabled", false);
        $("select[name='ShipStateSelect']:visible").css(
          "border",
          "solid 1px #e2e2e2"
        );
        checkvalidornot = true;
      } else {
        getstate = "";
        $("select[name='Address_StateSelect']:visible").prop("disabled", true);
        $("select[name='ShipStateSelect']:visible").css(
          "border",
          "solid 1px #f47a44"
        );
        $("select[name='Address_StateSelect']:visible").addClass("shake");
        checkvalidornot = false;
      }
      $("input[name='ShipEstimate:ship_state_select']").val(getstate);
    },
  });
  return {
    checkvalidornot,
    getstate,
  };
}

function GetValidzipcode(element) {
  var id = $(element).attr("id");
  var zipval = $(element).val();
  var getstate = "";
  var zipcodes = "/Merchant5/scripts/USCities.json";
  $.getJSON(zipcodes, function (data) {
    var zipcode = data.filter((x) => x.zip_code == zipval);
    if (zipcode.length != 0) {
      getstate = zipcode[0].state;
      getstatevalue = zipcode[0].state;

      $("input[name='ShipEstimate:ship_zip']").css(
        "border",
        "solid 1px #628e83"
      );
      $("input[name='ShipEstimate:ship_state_select']").val(getstate);
      $("input[name='ShipEstimate:register_zipcode']").val(getstate);
      $(".getshipinfo").prop("disabled", false);
      $(".checkValidornot").val(true);
    } else {
      getstate = "";
      $("input[name='ShipEstimate:ship_zip']").css(
        "border",
        "solid 1px #f47a44"
      );
      $(".checkValidornot").val(false);
    }
    console.log(getstate + $(element).attr("id"));
    $("select[name='Address_StateSelect']")
      .val(getstate)
      .attr("selected", "selected");
  });
}

function GetCity(element) {
  var zipval = $(element).val();
  var zipcodes = "/Merchant5/scripts/USCities.json";
  $.getJSON(zipcodes, function (data) {
    var zipcode = data.filter((x) => x.city == zipval);
    var getstate = zipcode[0].state;
    var getzipcode = zipcode[0].zip_code;
    console.log(getstate);
    $("#Address_StateSelect").val(getstate).attr("selected", "selected");
    $("#Address_Zip").val(zip_code);
  });
}

// (A) LOCK SCREEN ORIENTATION
function lock(orientation) {
  // (A1) GO INTO FULL SCREEN FIRST
  let de = document.documentElement;
  if (de.requestFullscreen) {
    de.requestFullscreen();
  }
  // (A2) THEN LOCK ORIENTATION
  screen.orientation.lock(orientation);
}

// (B) UNLOCK SCREEN ORIENTATION
function unlock() {
  // (B1) UNLOCK FIRST
  screen.orientation.unlock();

  // (B2) THEN EXIT FULL SCREEN
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
/*lock('portrait-primary');*/
if (screen.width < 767) {
  $("body").on("click", function () {
    /* lock('portrait-primary'); */
  });
}

function removeCouponsWhenLogin() {
  $.when(
    $.get(
      "/ajax.html?removecouponcode=removeallcouponsforlogin",
      function (html) {
        checkOrderSummaryforUser();
      }
    )
  ).then(function () {
    checkOrderSummaryforUser();
  });
}

var checkOrderSummaryforUser = () => {
  let url = "/ajax.html?CustomerAction=getbasketcharges&displayType=raw";
  $.get(url, (response) => {
    /* $("#showbasketCharges").html(response);
    $("#mobileOrderSummary").html(response);
    $("#mobTotal").text($("#OrderSummaryTotal").text());*/
  });
};
setTimeout(function () {
  if (setWholesaleuser == 1 && getPageCode !== "ORDHN") {
    removeCouponsWhenLogin();
  }
}, 2500);

function DetectDevice() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // Take the user to a different screen here.
  }
}

/* function Retail_password_checks() {
    var str = $(".ret_register_password").val();
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    if ((re.test(str) == true) || (str == '')) {
        $(".ret-pwd-error").hide();
        //$(".formBtncreateAccount").prop("disabled", false);
    } else {
        $(".ret-pwd-error").show();
        //$(".formBtncreateAccount").prop("disabled", true);
    }
  }
  
  function RetailcheckPasswordconfirm() {
    var str = $(".ret_register_password").val();
    var confirpassword = $(".retconfrimpswd").val();
    if (str === confirpassword) {
        if ($(".ret-pwd-error").is(":visible") == true) {
            //$(".formBtncreateAccount").prop("disabled", true);
        } else {
            $(".confirmpwderror").hide();
            //$(".formBtncreateAccount").prop("disabled", false);
        }
    } 
    // added below condition for if we clear confirm password field before password field, the error message was still displaying.
    else if(confirpassword == ''){
            $(".confirmpwderror").hide();
        //$(".formBtncreateAccount").prop("disabled", false);
    }
    else {
        $(".confirmpwderror").show();
        //$(".formBtncreateAccount").prop("disabled", true);
    }
  } */

/* function WholesalecheckPasswordconfirm() {
  var str = $(".ws_register_password").val();
  var confirpassword = $(".wsconfrimpswd").val();
  if (str === confirpassword) {
    if ($(".ws-pwd-error").is(":visible") == true) {
      $(".formBtncreateAccount").prop("disabled", true);
    } else {
      $(".confirmpwderror").hide();
      $(".formBtncreateAccount").prop("disabled", false);
    }
  }
  // added below condition for if we clear confirm password field before password field, the error message was still displaying.
  else if (confirpassword == "") {
    $(".confirmpwderror").hide();
    $(".formBtncreateAccount").prop("disabled", false);
  } else {
    $(".confirmpwderror").show();
    $(".formBtncreateAccount").prop("disabled", true);
  }
}

function ws_password_checks() {
  var str = $(".ws_register_password").val();
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (re.test(str) == true || str == "") {
    $(".formBtncreateAccount").prop("disabled", false);
    $(".ws-pwd-error").hide();
  } else {
    $(".ws-pwd-error").show();
    $(".formBtncreateAccount").prop("disabled", true);
  }
} */

$(".retailaccount,.businessaccount").click(function () {
  //$(".static-msg").hide();
});

function Checkthumnails() {
  if ($("#thumbnails").html() == "" || $("#thumbnails").html() == "\n") {
    $(".image-container").removeClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
    $(".image-container").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12");
    if (screen.width < 767) {
      $(".product-zoom-image-wrapper img").css("margin", "auto");
    }
  }
}
Checkthumnails();

$(".viewSubstitutionModal").on("hidden.bs.modal", function () {
  $(".viewSubstitutionModal").html("");
  addProductNew();
});

$(".viewSubstitutionModal").on("hide.bs.modal", function () {
  $(".viewSubstitutionModal").html("");
  addProductNew();
});

function removeFirstLink() {
  var counter = 0;
  $(".parent-nav li:visible").each(function () {
    counter++;
  });
  if (counter == 1) {
    $(".all-cat.firstcat").find("a").removeAttr("href", "");
  }
}
removeFirstLink();

document.addEventListener("visibilitychange", () => {
  if (getPageCode == "OPCO" || getPageCode == "opco") {
    if (document.visibilityState == "hidden") {
      /*location.reload();*/
    }
  }
  /*location.reload();*/
});

function GetCustomerEmail() {
  var getEmail = $("#Customer_LoginEmail").val();
  var url = "/?Screen=CUDET&customerDetail=" + getEmail;
  $.ajax({
    async: false,
    dataType: "html",
    url: url,
    success: function (data) {
      if ($.trim(data) == "No Detail Found From Back End") {
        $("#rspwdmsg").html("This Email is not registered");
      } else {
        $("#fpwd").submit();
        $("#rspwdmsg").html("");
      }
    },
  });
}

/*function to scroll to where the user last loaded */
function storeScrollPositionInHistoryState() {
  // Make sure to add lastScrollPosition to the current state
  // to avoid removing other properties
  const newState = {
    ...history.state,
    lastScrollPosition: scrollY,
  };

  // Pass the current location.href since you only want to update
  // the state, not the url
  history.replaceState(newState, "", location.href);
}
window.addEventListener("beforeunload", storeScrollPositionInHistoryState);
/*function to scroll to where the user last loaded */
//function to show loader on create account button

// function validateRetailForm() {
//  console.log("Validating retail form");
//  var isValid = true;
//
//  $("#retailSignupForm :input").each(function (index, element) {
//    if ($(element).val() === "") isValid = false;
//  });
//  return isValid;
// }

//function validateBusinessForm() {
// var isValid = true;
//
//  $(".businessSignUP :input")
//    .filter("[required]")
//    .each(function (index, element) {
//     if ($(element).val() === "") isValid = false;
//    });
//  return isValid;
// }

function showthreebievideobtn() {
  var player01 = document.getElementById("threebie-videos");

  player01.ontimeupdate = function () {
    if (parseInt(this.currentTime) == 5) {
      $(".videobtn").removeClass("hidden");
    }
  };
}
function formattocanadapostal(foo) {
  return foo.toString().replace(/\w{3}?(?=...)/g, "$& ");
}

function checkCanadaPostalCodes(foo) {
  const postalCodeRegex = new RegExp(
    /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d$/i
  );

  return postalCodeRegex.test(foo);
}

function checkCanadaPostalCode(foo) {
  const postalCodeRegex = new RegExp(
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
  );

  return postalCodeRegex.test(foo);
}

function getstatedetails() {
  var CanadianProvinces = [
    "AB",
    "BC",
    "MB",
    "NB",
    "NL",
    "NT",
    "NS",
    "NU",
    "ON",
    "PE",
    "QC",
    "SK",
    "YT",
  ];
  $("select[name='Address_StateSelect'],select[name='ShipStateSelect']").css(
    "pointer-events",
    "none"
  );
  jQuery(
    "#register_country,#Edit_Address_Country,#Address_Country,#Address_Country1,#Address_Country2,#Address_Country3,#ShipCountry"
  ).on("change", function () {
    var selCountry = jQuery("option:selected", this).val();

    jQuery(
      "#register_state,#Address_StateSelect,#Address_StateSelect2,#Address_StateSelect3,#ShipStateSelect"
    )
      .find("option")
      .hide()
      .attr("disabled", true);
    if (selCountry == "US") {
      jQuery(
        "#register_state,#Address_StateSelect,#Address_StateSelect2,#Address_StateSelect3,#ShipStateSelect"
      )
        .find("option")
        .each(function () {
          if (CanadianProvinces.includes(jQuery(this).val()) == false) {
            jQuery(this).show().removeAttr("disabled", false);
            $(
              "#register_zipcode,#Address_Zips,#Address_Zip2,#Address_Zip3,#Edit_Address_Zips"
            ).attr(
              "onchange",
              "SignUpValidation('businessSignUp','.zipcode', '');"
            );
            $(
              "#register_state,#Address_StateSelect,#Address_StateSelect2,#Address_StateSelect3,#ShipStateSelect"
            ).css("pointer-events", "none");
            $(
              "#register_state,#Address_StateSelect,#Address_StateSelect2,#Address_StateSelect3,#ShipStateSelect"
            ).attr("disabled");
            $(".zipcode:visible").on("change", function () {
              var foo = $(this).val().split("-").join("");
              // remove hyphens
              if (foo.length <= 6) {
                foo = formattocanadapostal(foo);
              }
              $(this).val(foo);
            });
          } else {
          }
        });
    }
    if (selCountry == "CA") {
      jQuery(
        "#register_state,#Address_StateSelect,#Address_StateSelect2,#Address_StateSelect3,#ShipStateSelect"
      )
        .find("option")
        .each(function () {
          if (CanadianProvinces.includes(jQuery(this).val())) {
            jQuery(this).show().removeAttr("disabled", true);
            $("#Address_Zips,#Address_Zip2,#Address_Zip3,#Edit_Address_Zips")
              .removeAttr("onkeypress")
              .removeAttr("pattern")
              .attr("maxlength", "7");
            $(
              "#register_zipcode,#Address_Zips,#Address_Zip2,#Address_Zip3,#Edit_Address_Zips"
            ).attr(
              "onchange",
              "SignUpValidation('businessSignUp','.zipcode', '');"
            );
            $("#register_zipcode")
              .removeAttr("onchange")
              .removeAttr("onkeypress")
              .removeAttr("pattern")

              .attr("maxlength", "7")
              .attr(
                "onchange",
                "SignUpValidation('businessSignUp','.zipcode', '');"
              );
            //$(".invalidmessage").hide();
            $(
              "#register_state,#Address_StateSelect,#Address_StateSelect2,#Address_StateSelect3,#ShipStateSelect"
            )
              .css("pointer-events", "none")
              .css("border", "solid 1px #e2e2e2");
            $(
              "#register_state,#Address_StateSelect,#Address_StateSelect2,#Address_StateSelect3,#ShipStateSelect"
            ).removeAttr("disabled");

            $(".zipcode:visible").keyup(function () {
              var foo = $(this).val().split("-").join("");
              // remove hyphens
              if (foo.length == 6) {
                foo = formattocanadapostal(foo);
              }
              $(this).val(foo);
            });

            $(".zipcode:visible").on("change", function () {
              var foo = $(this).val().split("-").join("");
              // remove hyphens
              if (foo.length <= 6) {
                foo = formattocanadapostal(foo);
              }
              $(this).val(foo);
            });
          }
        });
    }
  });
  document.addEventListener("keydown", KeyCheck);
}

function disableStateValidation(id) {
  var Country = "US";
  $(
    "#register_zipcode,#Address_Zip,#Address_Zip2,#Address_Zip3,#Edit_Address_Zip,#ShipZip"
  )
    .removeAttr("onchange")
    .removeAttr("onkeypress")
    .removeAttr("pattern");
  $(
    "#register_state,#Address_StateSelect,#Address_StateSelect2,#Address_StateSelect3,#ShipStateSelect"
  ).css("pointer-events", "none");
  $(
    "#register_state,#Address_StateSelect,#Address_StateSelect2,#Address_StateSelect3,#ShipStateSelect"
  ).attr("disabled");
  $.ajax({
    url: "/CUDET.html?getStatelist=1&country=" + Country,
    beforeSend: function () {},
    success: function (getcountry) {
      $(
        "#register_state,#Address_StateSelect,#Address_StateSelect2,#Address_StateSelect3,#ShipStateSelect"
      ).html(getcountry);
    },
  });
}

// document.addEventListener("keydown", KeyCheck);
//or however you are calling your method
function KeyCheck(event) {
  var KeyID = event.keyCode;
  switch (KeyID) {
    case 8:
      //alert("backspace");
      var text = $(".zipcode:visible").val().split(" ").join("");

      $(".zipcode:visible").val(text);

      break;
    case 46:
      //alert("delete");
      break;
    default:
      break;
  }
}

// To Get Age of Users
var getAges = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

// To Get Birthday of Users
function getBirthday(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  var birthmonth = birthDate.getMonth();
  var getbi = birthDate.getDate();
  var birthday = birthDate.getMonth() + 1;
  if (getbi == today.getDate() && birthmonth == today.getMonth()) {
    return "Today is Your Birthday";
  } else {
    return age;
  }
}

function backtoBacicmembership(id) {
  $.ajax({
    url: "/cudet.html?CustomerAction=membershipUpdateremove&customer_id=" + id,
    success: function (data, textStatus, xhr) {
      reloadBasketSession();
      location.reload();
    },
  });
}

const els = document.querySelector(".featured-products-carousels");
const observer = new window.IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      $("html").find(".mobilecontent").removeClass("sticky-content");
      return;
    }
    //$('html').find('.mobilecontent').addClass('sticky-content');
  },
  {
    root: null,
    threshold: 0.1,
    // set offset 0.1 means trigger if atleast 10% of element in viewport
  }
);

if (getPageCode == "opco") {
  // const slider = document.querySelector('#showallcoupons');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
}

function CheckBasketItemss() {
  $.getJSON("/GLOBALBASK_JSON.html", function (data) {
    if (data.groups.length) {
      $.each(data.groups, function (i, item) {
        var popupid = item.code;
        var radiocheck = $('input[value="' + popupid + '"]');
        popupidparent = $(radiocheck).attr("data-parent");
        productcode = item.product.code;

        $(".ProductDetail-" + productcode)
          .find(".prodcodecheck-" + popupid)
          .each(function () {
            $(this).attr("data-qtycart", item.quantity);
          });
        $(".ProductDetail-" + productcode)
          .find(".QtyVal")
          .attr("data-qtycart", item.quantity);
        $(".ProductDetail-" + productcode)
          .find(".QtyVal")
          .attr("data-qtycartcheck", item.quantity);
        $(".ProductDetail-" + productcode)
          .find(".QtyVal")
          .attr("data-qtycart");
        if (
          $(radiocheck).attr("data-parent") != "" &&
          $(radiocheck).attr("data-parent") != undefined
        )
          popupid = $(radiocheck).attr("data-parent");
        else
          var radiocheck = $(
            '.form-check-dropdown input[value="' + popupid + '"]'
          );
      });
    }
  });
}

function getThreebieProducts() {
  if (screen.width < 768) {
    $("#recipeFilter").click();
    $(".container-checkbox")
      .find(' input[name="isThisthreebieProduct"]')
      .click();
    $(".applyFilter").click();
  } else {
    $('input[name="isThisthreebieProduct"]:visible').trigger("click");
  }
}

function getSlacProducts() {
  if (screen.width < 768) {
    $("#recipeFilter").click();
    $(".container-checkbox").find(' input[name="isSLACProduct"]').click();
    $(".applyFilter").click();
  } else {
    $('input[name="isSLACProduct"]:visible').trigger("click");
  }
}

function getSlacCheck() {
  var responsedata;
  $.ajax({
    async: false,
    url: "/Merchant5/merchant.mvc?Screen=CUDET&pricegroup=yes&customertype=retail",
    success: function (response) {
      var res = response;
      responsedata = res.replaceAll(/\s/g, "");
      /*console.log(responsedata);*/
    },
  });
  return responsedata;
}

function loadgiftbox() {
  $(".gift-box-carousels").owlCarousel({
    navText: [
      "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 2rem;transform:rotate(180deg);filter: brightness(0.2);'>",
      "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 2rem;filter: brightness(0.2);'>",
    ],
    items: 2,
    loop: false,
    pagination: false,
    responsiveClass: true,
    dots: false,
    nav: true,
    lazyLoad: true,
    responsive: {
      0: {
        items: 2,
        nav: true,
        lazyLoad: true,
      },
      600: {
        items: 2,
        nav: true,
        lazyLoad: true,
      },
      1000: {
        items: 2,
        nav: true,
        loop: false,
        lazyLoad: true,
        touchDrag: false,
        mouseDrag: false,
      },
    },
  });
}

function loadSubstitutioncarousel() {
  $(".gridProducts").each(function () {
    if ($(window).width() < 768) {
      if ($(this).find(".product-item-new").length > 2) {
        var owl = $(this).owlCarousel({
          navText: [
            "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 2rem;transform:rotate(180deg);filter: brightness(0.2);'>",
            "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 2rem;filter: brightness(0.2);'>",
          ],
          items: 3,
          loop: false,
          pagination: false,
          responsiveClass: true,
          dots: false,
          nav: true,
          lazyLoad: true,
          responsive: {
            0: {
              items: 2,
              nav: true,
            },
            600: {
              items: 3,
              nav: true,
            },
            1000: {
              items: 3,
              nav: true,
              loop: false,
            },
          },
        });
      }
    } else {
      if ($(this).find(".product-item-new").length > 2) {
        var owl = $(this).owlCarousel({
          navText: [
            "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 2rem;transform:rotate(180deg);filter: brightness(0.2);'>",
            "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 2rem;filter: brightness(0.2);'>",
          ],
          items: 3,
          loop: false,
          pagination: false,
          responsiveClass: true,
          dots: false,
          nav: true,
          lazyLoad: true,
          responsive: {
            0: {
              items: 2,
              nav: true,
            },
            600: {
              items: 3,
              nav: true,
            },
            1000: {
              items: 3,
              nav: true,
              loop: false,
            },
          },
        });
      }
    }
  });
}

// function showSubstitutions(productCode, subitems) {
//   loadProducts2([
//     "getSubstitutes",
//     "substitutionproducts-" + productCode,
//     subitems,
//     "",
//     "",
//   ]);
//   let url =
//     "/cudet.html?CustomerAction=getCartSubstitution&productCode=" + productCode;
//   $.get(url, (response) => {
//     $("#viewSubstitutionModal").addClass("viewSubstitution" + productCode);
//     $("#viewSubstitutionModal").modal("show");
//     $("#viewSubstitutionModal").html($(response).find(".modal").html());

//     //loadSubstitutioncarousel();
//     /* Added Temp Fix By Bhanu*/
//   });
// }

function showSubstitutions(productCode, subitems) {
  loadProducts2([
    "getSubstitutes",
    "substitutionproducts-" + productCode,
    subitems,
    "",
    "",
  ]).then((data) => {
    if (data) {
      // Products loaded successfully, proceed to show the modal
      fetchSubstitutionModalContent(productCode).then(() => {
        $("#viewSubstitutionModal").modal("show");
      });
    } else {
      // Handle the case where no product data was loaded
      console.error("No product data loaded from loadProducts.");
      // Consider providing appropriate user feedback or error handling here
    }
  });
}

function fetchSubstitutionModalContent(productCode) {
  return new Promise((resolve, reject) => {
    $.get(
      "/cudet.html?CustomerAction=getCartSubstitution&productCode=" +
        productCode,
      (response) => {
        $("#viewSubstitutionModal").addClass("viewSubstitution" + productCode);
        $("#viewSubstitutionModal").html($(response).find(".modal").html());
        resolve(); // Resolve the promise after modal content is set
      }
    ).fail((error) => {
      reject(error); // Reject the promise on error
    });
  });
}

function showFRProducts(productCode, type) {
  var id = "";
  if (type == "giftbox") {
    id = "#giftboxproduct";
  } else {
    id = "#viewfrproduct";
  }
  $(id).addClass("viewfrproduct" + productCode);
  if ($(id).hasClass("dataloaded") != true) {
    loadProducts([
      "getUpsell",
      "frproduct-" + productCode,
      productCode,
      "",
      "",
    ]);
    let url =
      "/cudet.html?CustomerAction=getFRProduct&productCode=" +
      productCode +
      "&type=" +
      type;
    $.get(url, (response) => {
      $(id).html($(response).find(".modal").html());
      $(id).modal("show").addClass("dataloaded");
      $(".viewfrproduct").find(".prod-wishlist").remove();
    });
  } else {
    $(id).modal("show");
  }
  $(id).find(".productListing").addClass("nogrid");
}

/*code added for deals */
function getshelfcoupons() {
  var customer_type =
    document.getElementById("usertype") === null
      ? true
      : document.getElementById("usertype").value;
  $.get(
    "/ajax.html?CustomerAction=getCategoryDeals&pagetype=Shelves&customer_type=" +
      customer_type,
    function (data) {
      var newdata = JSON.parse(data);
      var sortOrder = "";
      if (sortOrder != "") {
        sortOrder = newdata.filter((sortnumber) => {
          return sortnumber.coupon_order;
        });
      }
      if (sortOrder == "") {
        sortOrder = newdata;
      }

      for (let i = 0; i < newdata.length; i++) {
        if (newdata[i].coupon_type == "Retail,Premium") {
          newdata[i].coupon_type = newdata[i].coupon_type.replace(",", " ");
        }
      }

      if (newdata == "") {
        $("#deals").hide();
      } else {
        $("#deals").show();
      }
      var slidesToShow = 0;

      coupon = new Vue({
        el: "#shelfcoupoons",
        data: { coupons: sortOrder },
        methods: {
          couponCrousel() {
            $("#shelfcoupoons").owlCarousel({
              navText: [
                "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 1rem;transform:rotate(180deg);filter: brightness(0.2);'>",
                "<img src='graphics/00000001/3/Arrow-HighRes-.png' width='20' height='28' style='width: 1rem;filter: brightness(0.2);'>",
              ],
              items: 4,
              loop: false,
              pagination: false,
              responsiveClass: true,
              dots: false,
              margin: 15,
              stagePadding: 5,
              nav: true,
              lazyLoad: true,
              touchDrag: true,
              mouseDrag: true,
              pullDrag: true,
              responsive: {
                0: {
                  items: 2,
                  nav: true,
                  lazyLoad: true,
                },
                600: {
                  items: 3,
                  nav: true,
                  lazyLoad: true,
                },
                1000: {
                  items: 4,
                  nav: true,
                  loop: false,
                  lazyLoad: true,
                  touchDrag: true,
                  pullDrag: true,
                },
              },
            });
          },
        },
        computed: {
          vueUserLoginDetails: function () {
            var responsedata = "";
            $.ajax({
              async: false,
              url: "/Merchant5/merchant.mvc?Screen=CUDET&getUserLoginDetail=1",
              success: function (response) {
                var res = response;
                responsedata = res.replaceAll(/\s/g, "");
              },
            });
            return responsedata;
          },

          vueUserType: function () {
            var responsedata = "";
            $.ajax({
              async: false,
              url: "/Merchant5/merchant.mvc?Screen=CUDET&getUserDetails=1",
              success: function (response) {
                var res = response;
                responsedata = res.replaceAll(/\s/g, "");
              },
            });
            return responsedata;
          },
        },
        mounted() {
          $(".couponcard-image").each(function () {
            var checklogin = $(this).hasClass("loginClick");
            if (checklogin == true) {
              $(this).find("a").removeAttr("href");
            }
          });
        },
      });
      coupon.couponCrousel();

      var memrbershipuser =
        document.getElementById("memrbershipuser") === null
          ? true
          : document.getElementById("memrbershipuser").value;
      if (memrbershipuser == "Premium") {
      } else {
      }
    }
  );
}

function copyShelefDealsCode(e) {
  var copyText = e;
  var customer_type =
    document.getElementById("usertype") === null
      ? true
      : document.getElementById("usertype").value;
  if (customer_type == "wholesale") {
    $("#coupons .couponcode-container").addClass("wholesale-off");
  } else {
    if ($(".copy-" + copyText).hasClass("loginClick") != true) {
      navigator.clipboard.writeText(copyText);
      $(".copy-" + copyText)
        .find(".copycode")
        .delay("slow")
        .show();
      setTimeout(function () {
        $(".copy-" + copyText)
          .find(".copycode")
          .delay("slow")
          .hide();
      }, 3000);
    }
  }
}
/*code added for deals*/

if (screen.width <= 767) {
  window.addEventListener("beforeunload", function () {
    window.location.href = "frapp://";
  });

  window.addEventListener("load", (e) => {
    if (navigator.getInstalledRelatedApps) {
      navigator.getInstalledRelatedApps().then((apps) => {
        if (apps.length > 0) {
          /* Hide the UI */
        }
      });
    }
  });
}

function checkorientations() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    if (window.matchMedia("(orientation: landscape)").matches == true) {
      switch (screen.orientation.type) {
        case "landscape-primary":
          document.querySelector(".hidelandscape").style.display = "block";
          break;
        case "landscape-secondary":
          document.querySelector(".hidelandscape").style.display = "block";
          break;
        case "portrait-secondary":
          document.querySelector(".hidelandscape").style.display = "none";
        case "portrait-primary":
          document.querySelector(".hidelandscape").style.display = "none";
          break;
        default:
      }
    } else {
      document.querySelector(".hidelandscape").style.display = "none";
    }
  }
}
var screencheck = window.matchMedia("(orientation: landscape)");
// screencheck.addListener(checkorientation);

screencheck.addEventListener("change", () => {
  //checkorientation();
});

var supportsOrientationChange = "onorientationchange" in window,
  orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function () {}, false);

var defaultCount = "";
function checkwishlist() {
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  var jsonRequest =
    '{"Store_Code": "G","Function":"Module","Session_Type":"runtime","Module_Code":"frjsonfunctions","Module_Function":"FR_GetWishLists","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '"}';
  var defaultid = "";
  $.ajax({
    type: "POST",
    async: false,
    url: "/Merchant5/json.mvc",
    data: jsonRequest,
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
      defaultCount = result.data.length;

      if (result.data == "") {
        $("#wishlistid").val("");
      } else {
        var getdefaultid = result.data.filter((getdefaultwishlistdata) => {
          return getdefaultwishlistdata.default == 1;
        });

        if (getPageCode === "WLST") {
          const getwishlistid = result.data.filter((getdefaultwishlistdata) => {
            var s = getdefaultwishlistdata.total_products > 1 ? "s" : "";
            $(".wlprodcount-" + getdefaultwishlistdata.id)
              .html(getdefaultwishlistdata.total_products + " Product" + s)
              .show();
              var firstimg  = '';
              if(getdefaultwishlistdata.product && getdefaultwishlistdata.product.length > 0) {
                firstimg = getdefaultwishlistdata.product[0].data.productimagedata[0].image;
              }
              
              if(getdefaultwishlistdata.total_products  < 1){
                $('.img-'+getdefaultwishlistdata.id).css('visibility','hidden');
              }else {
                $(".img-" + getdefaultwishlistdata.id).attr("src", firstimg);
              }
            return getdefaultwishlistdata.id;
          });
        }

        // console.log(getwishlistid.id);

        $("#wishlistid").val(getdefaultid[0].id);
        $(".product-details").each(function () {
          if (getdefaultid[0].id == $(this).attr("default-wishlistid")) {
            $(this).append(
              '<i class="fa fa-tag txt-orange default-tag" style="top:0" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Default wishlist"></i>'
            );
          }
        });
      }
    },
  });
  // return defaultCount;
}

$("body").on("click", ".addWishlist", function () {
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  var productCode = $(this).attr("data-code");
  var productid = $(this).attr("data-productid");
  var element = $(this);
  var wishlistid = $("#wishlistid").val();
  var pbrand = $(this).attr("data-brand");
  var psku = $(this).attr("data-sku");
  var pname = $(this).attr("data-productname");
  var pformatted_price = $(this).attr("data-price");

  if (defaultCount > 1) {
    moveToWishlist(sessionid, customerType, productCode, productid);
  } else {
    var Module = "";
    if (wishlistid == 0) {
      Module = "FR_AddProductToWishList";
    } else {
      Module = "FR_AddUpdateWishList";
    }

    var jsonRequest =
      '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"' +
      Module +
      '","customer_session":"' +
      sessionid +
      '","customer_type":"' +
      customerType +
      '","wishlist_title":"","wishlist_notes":"","wishlist_shared":1,"wishlist_product_code":"' +
      productCode +
      '","wishlist_product_quantity":"1","wishlist_id":"' +
      wishlistid +
      '"}';
    $.ajax({
      type: "POST",
      url: "/Merchant5/json.mvc",
      data: jsonRequest,
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        // console.log(result);
        $("#wishlistid").val(result.wishlist_id);
        $(".wishlistitems .product-item").addClass("default-wish");
        $(".ProductDetail-" + productCode)
          .find(".fa")
          .removeClass("fa-heart-o")
          .addClass("fa-heart");
        $(".ProductDetail-" + productCode)
          .find(".addFav")
          .removeClass("addWishlist")
          .addClass("removeWishlist");

        $(".ProductDetail-" + productCode)
          .find(".addFavs")
          .removeClass("addWishlist")
          .addClass("removeWishlist");

        $(".ProductDetail-" + productCode)
          .find(".addFavs")
          .find("span")
          .text("Added to Wishlist");
        // $('.ProductDetail-'+productCode).find(".wishlist-text").text('Item Saved to ' +result.wishlist_name+ ' Wishlist').show().delay('2000').fadeOut();
        //$('.owl-stage-outer').css('overflow','visible');
        // $("#myToast").showToast({
        //     message: 'Item Saved to ' +result.wishlist_name+ ' Wishlist'
        //   });
        $.Toast.showToast({
          // toast message
          title: "Item saved to " + result.wishlist_name + " ",
          // default: 1500
          duration: 3000,
        });
        if (
          urlpath === "https://www.foodrelated.com" ||
          urlpath === "https://foodrelated.com"
        ) {
          var items = [];
          items.push({
            item_id: psku,
            item_name: pname,
            item_brand: pbrand,
            price: pformatted_price,
          });

          dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
          dataLayer.push({
            event: "add_to_wishlist",
            ecommerce: {
              currency: "USD",
              value: pformatted_price,
              items,
            },
          });

          console.log(dataLayer);
        }
      },
    });
  }
});

function moveToWishlist(sessionid, customerType, productcode, productid) {
  var jsonRequest =
    '{"Store_Code": "G","Function":"Module","Session_Type":"runtime","Module_Code":"frjsonfunctions","Module_Function":"FR_GetWishLists","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '"}';

  $.ajax({
    type: "POST",
    url: "/Merchant5/json.mvc",
    data: jsonRequest,
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
      LoadWishlist = new Vue({
        el: "#loadwishlistdata",
        data: { loadwishlistdata: result },
        mounted() {
          this.$nextTick(() => {
            $("#movemodal").modal("show");
            $("#movemodal")
              .find(".wishlistproductcode")
              .val(productcode)
              .attr("data-productcode", productcode);
            $("#movemodal")
              .find(".wishlistproductid")
              .val(productid)
              .attr("data-productid", productid);
            $(".movewish").each(function () {
              $("select").on("change", function () {
                if (this.value == "createnew") {
                  $(".title").removeClass("hidden");
                  $("#selectwishlist").addClass("hidden");
                  $(".okbutton").addClass("hidden");
                  $(".createandmoveitem").removeClass("hidden");
                  $("#wishlist_description").prop("disabled", false);
                }
              });
              $('select[name="selectwishlist"]').on("change", function () {
                var wishlistnotes = $(this).val().split(",")[2];
                $("#wishlist_description").val(wishlistnotes);
                if (this.value != "createnew") {
                  $("#wishlist_description").prop("disabled", true);
                }
              });
            });
          });
        },
      });
    },
  });
}

$("body").on("click", ".create-wishlist", function (e) {
  e.preventDefault();
  $(".title-error").addClass("validateAddressForm").css("visibility", "hidden");
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  var wishlistName = document.getElementById("wishlist_title").value;
  var wishlistDescription = document.getElementById(
    "wishlist_description"
  ).value;
  var productCode = $(this).attr("data-code");
  var checkDefault = "";
  if ($("#default_wishlistid").is(":checked") == true) {
    checkDefault = $("#default_wishlistid").val();
  } else {
    checkDefault = "0";
  }
  var jsonRequest =
    '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"FR_AddUpdateWishList","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '","wishlist_title":"' +
    wishlistName +
    '","wishlist_notes":"' +
    wishlistDescription +
    '","wishlist_shared":1,"wishlist_product_quantity":"1","wishlist_id":"","default_wishlist":"' +
    checkDefault +
    '"}';
  $("#default_wishlistid").val();
  if (wishlistName == "") {
    $(".title-error")
      .addClass("validateAddressForm")
      .css("visibility", "visible");
    document.getElementById("wishlist_title").focus();
  } else {
    $(".title-error")
      .addClass("validateAddressForm")
      .css("visibility", "hidden");
    $.ajax({
      type: "POST",
      url: "/Merchant5/json.mvc",
      data: jsonRequest,
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        // console.log(result);
        if (result) {
          if ($("#default_wishlistid").is(":checked") == true) {
            $("#wishlistid").val(result.wishlist_id);
            location.reload();
          } else {
            location.reload();
          }
        }
      },
    });
  }
});

$("body").on("click", ".edit-wishlist", function (e) {
  e.preventDefault();
  $(".title-error").addClass("validateAddressForm").css("visibility", "hidden");
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  var wishlistName = document.getElementById("wishlist_title_edited").value;
  var wishlistDescription = document.getElementById(
    "wishlist_description_edited"
  ).value;
  var productCode = $(this).attr("data-code");
  var wishlistid = $(this).attr("data-wishlistedit");
  var checkDefault = "";
  if ($("#editdefault_wishlist").is(":checked") == true) {
    checkDefault = $("#editdefault_wishlist").val();
  } else {
    checkDefault = "0";
  }
  var jsonRequest =
    '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"FR_AddUpdateWishList","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '","wishlist_id":"' +
    wishlistid +
    '","wishlist_title":"' +
    wishlistName +
    '","wishlist_notes":"' +
    wishlistDescription +
    '","wishlist_shared":1,"default_wishlist":"' +
    checkDefault +
    '"}';
  if (wishlistName == "") {
    document.getElementById("wishlist_title_edited").focus();
    $(".title-error")
      .addClass("validateAddressForm")
      .css("visibility", "visible");
  } else {
    $.ajax({
      type: "POST",
      url: "/Merchant5/json.mvc",
      data: jsonRequest,
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        // console.log(result);
        $(".createWishList").val(wishlist_title);
        $("#wishFolderPopEdit1").modal("hide");
        location.reload();
      },
    });
  }
});

$("body").on("click", ".editWishFolder", function (e) {
  e.preventDefault();
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  var wishlistName = document.getElementById("wishlist_title_edited").value;
  var wishlistDescription = document.getElementById(
    "wishlist_description_edited"
  ).value;
  var productCode = $(this).attr("data-code");
  var wishlistid = $(this).attr("data-wishlistedit");
  $("#wishFolderPopEdit1").each(function () {
    var selectedwishlist = checkwishlist1(wishlistid);
    $(this).find("#wishlist_title_edited").val(selectedwishlist.title);
    $(this)
      .find("#wishlist_description_edited")
      .val(selectedwishlist.description);
    if (selectedwishlist.defaultid == "1") {
      $("#editdefault_wishlist").prop("checked", true);
    } else {
      $("#editdefault_wishlist").prop("checked", false);
    }
  });
  $(".edit-wishlist").each(function () {
    $(this).attr("data-wishlistedit", wishlistid);
    $(".editWishFolder").attr("iswishDefault", "true");
  });
});

$("body").on("click", ".deleteWislistFolder", function (e) {
  e.preventDefault();
  var wishlistid = $(this).attr("data-deletewishlist");
  $("#wishFolderPopEdit1").each(function () {
    var selectedwishlist = checkwishlist1(wishlistid);
    $(this).find("#wishlist_title_edited").val(selectedwishlist.title);
    $(this)
      .find("#wishlist_description_edited")
      .val(selectedwishlist.description);
  });
  $(".delete-wishlist").each(function () {
    $(this).attr("data-wishlistdelete", wishlistid);
  });
});

$("body").on("click", ".removeWishlistinwishlist", function (t) {
  t.preventDefault(), t.stopPropagation();
  var i = "&product_id=" + $(this).attr("data-wishlist"),
    s = this;
  $.ajax({
    url: "/Merchant5/merchant.mvc?Screen=AJAX&CustomerAction=delwishlist",
    type: "POST",
    data: i,
    showLoader: !0,
    cache: !1,
    success: function (t) {
      location.reload();
    },
  });
});

$("body").on("click", ".delete-wishlist", function (e) {
  e.preventDefault();
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  var wishlistid = $(this).attr("data-wishlistdelete");

  var jsonRequest =
    '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"FR_DeleteWishList","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '","wishlist_id":"' +
    wishlistid +
    '"}';
  $.ajax({
    type: "POST",
    url: "/Merchant5/json.mvc",
    data: jsonRequest,
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
      if (result.status == "success") {
        location.reload();
      }
    },
  });
});

$("body").on("click", ".movewish", function (e) {
  e.preventDefault();
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  var wishlistid = $(this).attr("data-wishlistdelete");
  var productcode = $(this).attr("data-productcode");
  var productid = $(this).attr("data-productid");
  var title = $(".nomargin").text();
  var jsonRequest =
    '{"Store_Code": "G","Function":"Module","Session_Type":"runtime","Module_Code":"frjsonfunctions","Module_Function":"FR_GetWishLists","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '"}';

  $.ajax({
    type: "POST",
    url: "/Merchant5/json.mvc",
    data: jsonRequest,
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
      LoadWishlist = new Vue({
        el: "#loadwishlistdata",
        data: { loadwishlistdata: result },
        mounted() {
          this.$nextTick(() => {
            $("#movemodal").modal("show");
            $("#movemodal")
              .find(".wishlistproductcode")
              .val(productcode)
              .attr("data-productcode", productcode);
            $("#movemodal")
              .find(".wishlistproductid")
              .val(productid)
              .attr("data-productid", productid);
            $(".movewish").each(function () {
              $("select").on("change", function () {
                if (this.value == "createnew") {
                  $(".title").removeClass("hidden");
                  $("#selectwishlist").addClass("hidden");
                  $(".okbutton").addClass("hidden");
                  $(".createandmoveitem").removeClass("hidden");
                  $("#wishlist_description").prop("disabled", false);
                }
              });
              $('select[name="selectwishlist"]').on("change", function () {
                var wishlistnotes = $(this).val().split(",")[2];
                $("#wishlist_description").val(wishlistnotes);
                if (this.value != "createnew") {
                  $("#wishlist_description").prop("disabled", true);
                }
              });
            });
          });
        },
      });
    },
  });
});

$("body").on("submit", "#movetowishlistform", function (e) {
  e.preventDefault();
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  $(this).find('select[name="selectwishlist"]').val();
  var wishlistid = $(this)
    .find('select[name="selectwishlist"]')
    .val()
    .split(",")[0];
  var wishlistName = $(this)
    .find('select[name="selectwishlist"]')
    .val()
    .split(",")[1];
  var wishlistNotes = $(this)
    .find('select[name="selectwishlist"]')
    .val()
    .split(",")[2];
  var productId = $("#movemodal").find(".wishlistproductid").val();
  var productCode = $("#movemodal").find(".wishlistproductcode").val();
  var moved = "";
  var Module = "FR_AddUpdateWishList";
  var title = $(".nomargin").text();
  var jsonRequest =
    '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"' +
    Module +
    '","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '","wishlist_title":"' +
    wishlistName +
    '","wishlist_notes":"' +
    wishlistNotes +
    '","wishlist_shared":1,"wishlist_product_code":"' +
    productCode +
    '","wishlist_product_quantity":"1","wishlist_id":"' +
    wishlistid +
    '"}';
  $.ajax({
    type: "POST",
    url: "/Merchant5/json.mvc",
    data: jsonRequest,
    contentType: "application/json",
    dataType: "json",
    async: false,
    success: function (result) {
      moved = result.wishlist_name;
      if (
        getPageCode == "WISH" ||
        getPageCode == "wish" ||
        getPageCode == "Wish"
      ) {
        deleteWishList(moved, sessionid, customerType, productId);
      } else {
        $("#movemodal").modal("hide");
        $.Toast.showToast({
          // toast message
          title: "Item added to " + moved + " ",
          // default: 1500
          duration: 3000,
        });
        if (
          urlpath === "https://www.foodrelated.com" ||
          urlpath === "https://foodrelated.com"
        ) {
          var items = [];
          items.push({
            item_id: wishlistid,
            item_name: productCode,
            // item_brand: brand,
            // item_variant: data.code,
            // price: data.formatted_price,
            // quantity: data.quantity
          });

          dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
          dataLayer.push({
            event: "add_to_wishlist",
            ecommerce: {
              currency: "USD",
              value: "",
              items,
            },
          });

          console.log(dataLayer);
        }
        location.reload();
      }
    },
  });
});

function deleteWishList(moved, sessionid, customerType, productId) {
  var jsonRequestnew =
    '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"FR_DeleteWishListItem","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '","wishlist_item_id":"' +
    productId +
    '"}';
  $.ajax({
    type: "POST",
    url: "/Merchant5/json.mvc",
    data: jsonRequestnew,
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
      if (result.status == "success") {
        $("#movemodal").modal("hide");
        $.Toast.showToast({
          // toast message
          title: "Item moved from " + title + " to " + moved + " ",
          // default: 1500
          duration: 3000,
        });
        location.reload();
      }
    },
  });
}

$('select[name="selectwishlist"]').on("change", function () {
  var wishlistnotes = $(this).val().split(",")[2];
  $("#wishlist_description").val(wishlistnotes);
});

$("body").on("click", ".movetootherwishlist", function (e) {
  e.preventDefault();
  var moved = "";
  var Module = "FR_AddUpdateWishList";
  var jsonRequest =
    '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"' +
    Module +
    '","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '","wishlist_title":"' +
    wishlistName +
    '","wishlist_notes":"","wishlist_shared":1,"wishlist_product_code":"' +
    productCode +
    '","wishlist_product_quantity":"1","wishlist_id":"' +
    wishlistid +
    '"}';
  $.ajax({
    type: "POST",
    url: "/Merchant5/json.mvc",
    data: jsonRequest,
    contentType: "application/json",
    dataType: "json",
    async: false,
    success: function (result) {
      moved = result.wishlist_name;
      var jsonRequestnew =
        '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"FR_DeleteWishListItem","customer_session":"' +
        sessionid +
        '","customer_type":"' +
        customerType +
        '","wishlist_item_id":"' +
        productId +
        '"}';
      // console.log(jsonRequestnew)
      $.ajax({
        type: "POST",
        url: "/Merchant5/json.mvc",
        data: jsonRequestnew,
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
          $("#movemodal").modal("hide");
          $.Toast.showToast({
            // toast message
            title: "Item moved from " + title + " to " + moved + " ",
            // default: 1500
            duration: 3000,
          });
          setTimeout(function () {
            location.reload();
          }, 3000);
        },
      });
    },
  });
});

function checkwishlist1(wishlistid) {
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  var jsonRequest =
    '{"Store_Code": "G","Function":"Module","Session_Type":"runtime","Module_Code":"frjsonfunctions","Module_Function":"FR_GetWishLists","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '"}';
  var wishlistid = wishlistid;
  var title = "";
  var description = "";
  $.ajax({
    type: "POST",
    url: "/Merchant5/json.mvc",
    data: jsonRequest,
    contentType: "application/json",
    dataType: "json",
    async: false,
    success: function (result) {
      id = result.data.filter((x) => String(x.id) == wishlistid);
      title = id[0].title;
      description = id[0].notes;
      defaultid = id[0].default;
    },
  });
  return { title, description, defaultid };
}
$(".movewish").each(function () {
  $("select").on("change", function () {
    if (this.value == "createnew") {
      $(".title").removeClass("hidden");
      $("#selectwishlist").addClass("hidden");
      $(".okbutton").addClass("hidden");
      $(".createandmoveitem").removeClass("hidden");
    }
  });
});
$("body").on("click", ".createandmoveitem", function (e) {
  $(".title-error").addClass("validateAddressForm").css("visibility", "hidden");
  e.preventDefault();
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  var wishlistName = document.getElementById("wishlist_title").value;
  var wishlistDescription = document.getElementById(
    "wishlist_description"
  ).value;
  var checkDefault = "";
  if ($("#default_wishlistid").is(":checked") == true) {
    checkDefault = $("#default_wishlistid").val();
  } else {
    checkDefault = "0";
  }
  var jsonRequest =
    '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"FR_AddUpdateWishList","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '","wishlist_title":"' +
    wishlistName +
    '","wishlist_notes":"' +
    wishlistDescription +
    '","wishlist_shared":1,"wishlist_product_quantity":"1","wishlist_id":"","default_wishlist":"' +
    checkDefault +
    '"}';
  $("#default_wishlistid").val();
  if (wishlistName == "") {
    $(".title-error")
      .addClass("validateAddressForm")
      .css("visibility", "visible");
  } else {
    $.ajax({
      type: "POST",
      url: "/Merchant5/json.mvc",
      data: jsonRequest,
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        //   console.log(result);
        createdMovenow(result);
        if (result) {
          if ($("#default_wishlistid").is(":checked") == true) {
            $("#wishlistid").val(result.wishlist_id);
          }
        }
      },
    });
  }
});
function createdMovenow(result) {
  var sessionid = document.getElementById("sessionid").value;
  var customerType = document.querySelector(".customertype").value;
  var prevWishlistName = document.getElementById("WishList_Title").value;
  var wishlistName = $("#wishlist_title").val();
  var wishlistDescription = document.getElementById(
    "wishlist_description"
  ).value;
  var productId = $("#movemodal").find(".wishlistproductid").val();
  var productCode = $("#movemodal").find(".wishlistproductcode").val();
  var wishlistid = result.wishlist_id;

  var moved = "";
  var Module = "FR_AddUpdateWishList";
  var jsonRequest =
    '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"' +
    Module +
    '","customer_session":"' +
    sessionid +
    '","customer_type":"' +
    customerType +
    '","wishlist_title":"' +
    wishlistName +
    '","wishlist_notes":"' +
    wishlistDescription +
    '","wishlist_shared":1,"wishlist_product_code":"' +
    productCode +
    '","wishlist_product_quantity":"1","wishlist_id":"' +
    wishlistid +
    '"}';
  $.ajax({
    type: "POST",
    url: "/Merchant5/json.mvc",
    data: jsonRequest,
    contentType: "application/json",
    dataType: "json",
    async: false,
    success: function (result) {
      moved = result.wishlist_name;

      var jsonRequestnew =
        '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"FR_DeleteWishListItem","customer_session":"' +
        sessionid +
        '","customer_type":"' +
        customerType +
        '","wishlist_item_id":"' +
        productId +
        '"}';
      // console.log(jsonRequestnew)
      $.ajax({
        type: "POST",
        url: "/Merchant5/json.mvc",
        data: jsonRequestnew,
        contentType: "application/json",
        dataType: "json",
        success: function (result1) {
          // if (result1) {
          //     if ($("#default_wishlistid").is(":checked") == true) {
          //       $("#wishlistid").val(result1.wishlist_id);
          // }
          //   }
          $("#movemodal").modal("hide");
          $.Toast.showToast({
            // toast message
            title: "Item moved from " + prevWishlistName + " to " + moved + " ",
            // default: 1500
            duration: 3000,
          });
          setTimeout(function () {
            location.reload();
          }, 3000);
        },
      });
    },
  });
}

// sign up validation - 14-12-23
function isAlpha(s) {
  var e = (s = s || window.event).which ? s.which : s.keyCode;
  return (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
}

function isAlphaNumber(s) {
  var e = (s = s || window.event).which ? s.which : s.keyCode;
  return (
    (e >= 65 && e <= 90) ||
    (e >= 97 && e <= 122) ||
    !(e > 31 && (e < 48 || e > 57))
  );
}

// Get State API added 09-01-2024
function GetStatefromZipcode(countrys, zipcode) {
  console.log(countrys, zipcode);
  var setparam = "";
  if (countrys == "") {
    setparam = "";
  } else {
    zipcode = zipcode.toUpperCase();
    setparam = "&country=" + countrys;
  }
  const url =
    "/majax.html?mobileAction=stateSearch&zipcode=" + zipcode + setparam;
  let state = "";
  $.ajax({
    method: "POST",
    async: false,
    url: url,
    success: function (data) {
      state = data.state;
      country = data.country;
    },
  });
  if (state != "no state found") {
    $("select[name='Address_StateSelect']")
      .val(state)
      .attr("selected", "selected");
    $("select[name='register_state']").val(state).attr("selected", "selected");
    $("select[name='ShipStateSelect']").val(state).attr("selected", "selected");
    return { country: country, state: state, status: true };
  } else {
    return { state: state, status: false };
  }
}
// Get State API added 09-01-2024

if (sessionStorage.getItem("erroonopcopage") == "true") {
  //sessionStorage.removeItem("erroonopcopage");
}

// Function to open business signup page from guest order

// changes done 08-02-2024 as ready function
/* window.onload = function () {  }; commented and changes it as ready function */
$(window).on("load", function () {
  var businessurl = new URL(window.location.href);
  var guestorderurl = businessurl.searchParams.get("subaction");
  if (guestorderurl == "guestcheckout") {
    CreateGuestBusinessAccount();
  }
});

function CreateGuestBusinessAccount() {
  $(".businessaccount").click();
  $(".account-wrapper").removeClass("active");
}

// Function to check and restrict landscape mode on tablets
function checkOrientation() {
  // Check if the device is a tablet (you may need to adjust this condition)
  // const isTablet = window.innerWidth >= 600 && window.innerWidth <= 1024;
  let isorientation =
    screen.orientation.type == "portrait-primary" ||
    screen.orientation.type == "portrait-secondary";
  // const isIphone = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isIphone = /iPad|iPod/i.test(navigator.userAgent);
  const iphone = /iPhone/i.test(navigator.userAgent);
  const showlandscapeimage = document.querySelector(".hidelandscape");
  showlandscapeimage.style.display = "none";
  // Check if the device is in landscape mode
  // const isLandscape = window.innerWidth > window.innerHeight;

  const isMObileDevice =
    navigator.userAgentData && navigator.userAgentData.mobile;
  if (isMObileDevice || iphone) {
    isorientation =
      screen.orientation.type == "landscape-primary" ||
      screen.orientation.type == "landscape-secondary";
  }
  // If it's a tablet and in landscape mode, prevent it
  // if ((isorientation && isIphone) || (isMObileDevice && isorientation)) {
  //   // alert("Please use the device in portrait mode.");
  //   showlandscapeimage.style.display = "block";
  //   // You can add additional actions here, like applying styles or preventing certain actions.
  // }
  if (
    (isorientation && isIphone) ||
    (isMObileDevice && isorientation) ||
    (iphone && isorientation)
  ) {
    // alert("Please use the device in portrait mode.");
    showlandscapeimage.style.display = "block";
    // You can add additional actions here, like applying styles or preventing certain actions.
  }
}

// Attach the checkOrientation function to the orientationchange event
window.addEventListener("orientationchange", checkOrientation);

// Call the checkOrientation function on page load
window.addEventListener("load", checkOrientation);

// load function once window loaded completely
$(window).on("load", function () {
  if (isUserLoggedIn == "1") {
    if (getPageCode != "ORDHN" && getPageCode != "ORDHNMOBILE") {
      checkwishlist();
    }
  }
});

function ApplyAutoCoupon() {
  var couponcode = $("#signupcouponcode").val();
  var checkcouponapplied = basket.coupons;
  console.log(checkcouponapplied);
  if (checkcouponapplied == "") {
    jQuery.ajax({
      url:
        "/cudet.html?CustomerAction=customerorders&ACTION=ACPN&Coupon_Code=" +
        couponcode,
      type: "POST",
      showLoader: true,
      cache: false,
      beforeSend: function () {},
      success: function (data) {
        getOrderSummary();
      },
    });
  } else {
    console.log("Coupon Code Applied Already");
  }
}

function getFooterlinks() {
  $("#FooterSection a").each(function () {
    var links = $(this).attr("href");
    var id = $(this).attr("id");
    var name = $(this).text();
    $(this).on("click", function () {
      console.log(links);
      console.log(name);
      dataLayer.push({
        linkName: name, //pass the link name
        linkURL: links, //pass the link url
        linkLocation: "Footer", //pass the link location like Header, Footer
        event: "navBarClicks",
      });
    });
  });

  $(".navigation-background a").each(function () {
    var links = $(this).attr("href");
    var id = $(this).attr("id");
    var name = $(this).text();
    $(this).on("click", function () {
      console.log(links);
      console.log(name);
      dataLayer.push({
        linkName: name, //pass the link name
        linkURL: links, //pass the link url
        linkLocation: "Header", //pass the link location like Header, Footer
        event: "navBarClicks",
      });
    });
  });
}

$(window).on("load", function () {
  // Added Google Tag Manage Code Please do not remove
  if (
    urlpath == "https://foodrealted.com" ||
    urlpath == "https://www.foodrelated.com"
  ) {
    getFooterlinks();
    $(
      ".proceedtocheckout ,.LinputContainer .Guest , .checkoutbutton ,.checkoutguestbtn"
    ).on("click", function () {
      var items = [];
      var formatted_total = [];
      $.getJSON("/GLOBALBASK_JSON.html", function (dataval) {
        // Assuming data.items is an array
        if (dataval) {
          dataval.items.map((data) => {
            var brand = data.link;
            if (
              brand.split("-by")[1] === undefined ||
              brand.split("-by")[1] == ""
            ) {
              brand = "";
            } else {
              brand = brand
                .split("-by")[1]
                .replaceAll("-", " ")
                .replace(".html", "");
            }
            items.push({
              item_id: data.sku,
              item_name: data.name,
              item_brand: brand,
              item_variant: data.code,
              price: data.formatted_price,
              quantity: data.quantity,
            });
          });
        } else {
          console.error("Error: Invalid JSON data or missing items array.");
        }
        dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        dataLayer.push({
          event: "begin_checkout",
          ecommerce: {
            currency: "USD",
            value: dataval.formatted_total,
            items,
          },
        });
      });

      console.log(dataLayer);
    });
  }

  $("body").on("click", ".remove-item1", function () {
    var pcode = $(this).attr("data-psku");
    var pname = $(this).attr("data-pname");
    var pbrand = $(this).attr("data-pbrand");
    var pvariant = $(this).attr("data-pcode");
    var price = $(this).attr("data-psubtotal");
    var pqty = $(this).attr("data-pquantity");
    var items = [];
    items.push({
      item_id: pcode,
      item_name: pname,
      item_brand: pbrand,
      item_variant: pvariant,
      price: price,
      quantity: pqty,
    });
    if (
      urlpath === "https://foodrelated.com" ||
      urlpath === "https://www.foodrelated.com"
    ) {
      dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      dataLayer.push({
        event: "remove_from_cart",
        ecommerce: {
          currency: "USD",
          value: price,
          items,
        },
      });
      console.log(dataLayer);
    }
  });
  // Added Google Tag Manage Code Please do not remove
});

function getCustomerOrderPoints(orderId) {
  var customer_session = $("#sessionid").val();
  var customerId = $("#customerId").val();
  var jsonRequest = JSON.stringify({
    Store_Code: "G",
    Function: "Module",
    Session_Type: "runtime",
    Module_Code: "frjsonfunctions",
    Module_Function: "FR_TransactionPoints",
    customer_session: customer_session,
    customer_id: customerId,
    order_id: orderId,
  });

  $.ajax({
    url: "/Merchant5/json.mvc",
    type: "POST",
    contentType: "application/json",
    data: jsonRequest,
    dataType: "json",
    success: function (result) {
      console.log(result.total_points);
      if (result.total_points > 0) {
        $(".pointmessage").show();
        $(".earnedpointsinvc").text(result.total_points).show();
      } else {
        $(".pointmessage").hide();
      }
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector("#navigation-bar");
  let startY;
  let scrollTop;

  container.addEventListener("touchstart", function (e) {
    startY = e.touches[0].pageY - container.offsetTop;
    scrollTop = container.scrollTop;
  });

  container.addEventListener("touchmove", function (e) {
    const y = e.touches[0].pageY - container.offsetTop;
    const walk = y - startY;
    container.scrollTop = scrollTop - walk;
  });
});

function getSavedItemResponse() {
  if ($(".saveditemresponse").text() === "hidesavedfolater") {
    $(".basket-warning-message-container").hide();
  } else {
    $(".basket-warning-message-container").show();
  }
}

function addProductDatatoUserSavedlist(product_id, customer_id, price) {
  // console.log(product_id,customer_id,price);
  let url = `/Merchant5/merchant.mvc?Screen=majax&mobileAction=saveProductPrice&prod_id=${product_id}&cust_id=${customer_id}&price_data=${price}`;
  $.ajax({
    url: url,
    success: function (data) {
      console.log(data);
    },
  });
}

// Function to delete the product price
async function deleteProductPrice(prodId, custId) {
  const url = `/?Screen=majax&mobileAction=deleteProductPrice&prod_id=${prodId}&cust_id=${custId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Product price deleted successfully:", data);
      // Handle the success response (e.g., update the UI)
    } else {
      console.error("Failed to delete product price. Status:", response.status);
      // Handle the error response
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}