function Productscroll(element, count) {
  if (element == ".gridProductss") {
    $(element).css("justify-content", "unset").css("display", "grid");
    $(element).find('.addFavs').hide();
    $(element).css("grid-template-columns", "253px");
  }
  $(element).css("opacity", 1);
  if (count <= 5) {
    $(element).parentsUntil().contents(".viewAll_btnwrap").hide();
  }
  const container = document.querySelector(element);
  const containerWidth = container.clientWidth;

  // Check if productCardContainer element exists and has width
  const productWidth = container.querySelector(
    ".productCardContainer"
  )?.clientWidth;

  // Handle cases where productWidth is not available (use a default or fallback)
  const maxProductsToShow = productWidth
    ? Math.floor(containerWidth / productWidth)
    : 5; // Assuming a default of 3
  setTimeout(function () {
    // updateProductClassProperty(element, count);
    updateProductClassProperty(element, count);
    window.addEventListener("resize", () =>
      updateProductClassProperty(element, count)
    );
    if (count > maxProductsToShow) {
      addArrowstoProductListings(element);
    }
  }, 500);

  const slider = document.querySelector(element);
  document
    .querySelector(element)
    .setAttribute("data-product-arrows", ".productArrows");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    slider.classList.add("grabbing");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
    slider.classList.remove("grabbing");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
    slider.classList.remove("grabbing");
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
}



function addArrowstoProductListings(element) {
  if (screen.width > 768) {
    let divMain = $(element)[0];
    let position = $(divMain).children().position().left;
    const slideAmount = 300;
    const animationDuration = 400;
    const $productArrows = $(element).next(".productarrows");
    const $arrowRight = $productArrows.find(".arrow-right");
    const $arrowLeft = $productArrows.find(".arrow-left");
    $productArrows.show();

    $arrowRight.click(function () {
      const $thisSlider = $(this).closest(".productarrows").prev();
      const sliderDivMain = $thisSlider[0];
      const currentPosition = $(sliderDivMain).scrollLeft();
      const newPosition = currentPosition + slideAmount;

      $(sliderDivMain).animate(
        {
          scrollLeft: newPosition,
        },
        animationDuration,
        function () {
          $arrowRight.toggleClass(
            "disabled",
            sliderDivMain.scrollLeft + sliderDivMain.clientWidth >= sliderDivMain.scrollWidth
          );
        }
      );
    });

    $arrowLeft.click(function () {
      const $thisSlider = $(this).closest(".productarrows").prev();
      const sliderDivMain = $thisSlider[0];
      const currentPosition = $(sliderDivMain).scrollLeft();
      const newPosition = currentPosition - slideAmount;

      $(sliderDivMain).animate(
        {
          scrollLeft: newPosition,
        },
        animationDuration,
        function () {
          $arrowLeft.toggleClass("disabled", sliderDivMain.scrollLeft <= 0);
        }
      );
    });

    $arrowLeft.toggleClass("disabled", true);

    $(divMain).scroll(function () {
      const $thisSlider = $(this);
      $thisSlider
        .next(".productarrows")
        .find(".arrow-right")
        .toggleClass(
          "disabled",
          this.scrollLeft + this.clientWidth >= this.scrollWidth
        );
      $thisSlider
        .next(".productarrows")
        .find(".arrow-left")
        .toggleClass("disabled", this.scrollLeft <= 0);
    });
  }
}


function updateProductClassProperty(container, count) {
  const screenWidth = screen.width;
  const clientWidth = document.querySelector(container).clientWidth;
  let numColsValue;
  const deviceType = isMobileDevice()
    ? "Mobile"
    : isTabletDevice()
    ? "Tablet"
    : "Desktop";
    $(container).show();
  if (screenWidth > 767) {
    // console.log(screen.orientation.type);
    if (document.querySelector(container).clientWidth <= 767) {
      numColsValue = "2.5";
    }
    //  else if ((screen.orientation.type == "landscape-primary" ||
    // screen.orientation.type == "landscape-secondary") && (deviceType == 'Mobile')) {
    //   numColsValue = "3.5";
    // }
    else if (
      document.querySelector(container).clientWidth > 768 &&
      document.querySelector(container).clientWidth <= 990
    ) {
      numColsValue = "3.5";
    } else if (document.querySelector(container).clientWidth > 1180) {
      //numColsValue = "5";
      numColsValue = "6";
    } else {
      // Default value
      numColsValue = "5";
    }
  } else {
    if (screenWidth > 767) {
      numColsValue = "3.5";
    } else {
      numColsValue = "1.8";
      var childdom = document.querySelector(container).children;
      // childdom[0].style.width = "220px";
    }
  }

  $(container).find(".productCardContainer").addClass("carousel-item");

  // Calculate container width and child width
  const containerMargin =
    parseInt(
      getComputedStyle(document.querySelector(container)).marginRight,
      10
    ) +
    parseInt(
      getComputedStyle(document.querySelector(container)).marginLeft,
      10
    );
  const containerPadding =
    parseInt(
      getComputedStyle(document.querySelector(container)).paddingRight,
      10
    ) +
    parseInt(
      getComputedStyle(document.querySelector(container)).paddingLeft,
      10
    );
  const calculatedWidth =
    document.querySelector(container).clientWidth -
    containerMargin -
    containerPadding;
  const childWidth = Math.floor(
    (calculatedWidth - (numColsValue - 1) * 16) / numColsValue
  ); // Use Math.floor for exact width

  const childDivs = document.querySelectorAll(`${container} .carousel-item`);

  if (count > 2) {
    const gridContainer = document.querySelector(container);
    gridContainer.style.width = "100%"; // Set container width to 100% for responsiveness
    if ($(container).hasClass("nowidth") !== true) {
      gridContainer.style.gridTemplateColumns = `repeat(${count}, ${childWidth}px)`;
    } else {
      gridContainer.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
    }
    gridContainer.style.setProperty("--numCols", numColsValue);
    //gridContainer.style.overflow = "auto overlay";
    if(window.navigator.userAgent.indexOf('Safari')){
      gridContainer.style.overflow = "auto hidden";
      gridContainer.style.overflow = "-webkit-paged-x";
    }else {
      gridContainer.style.overflow = "auto hidden";
    }

    // Set individual child width using JavaScript
    if (screenWidth > 767) {
      childDivs.forEach((childDiv) => {
        if ($(container).hasClass("nowidth") !== true) {
          childDiv.style.width = `${childWidth}px`;
        }
      });
    } else {
      if ($(container).hasClass("nowidth") !== true) {
        $(container)
          .find(".productCardContainer")
          .css("width", `${childWidth}px`);
      }
    }
  } else {
    const gridContainer = document.querySelector(container);
    gridContainer.style.width = "100%"; // Set container width to 100% for responsiveness
    if ($(container).hasClass("nowidth") !== true) {
      gridContainer.style.gridTemplateColumns = `repeat(${count}, ${childWidth}px)`;
    }
    gridContainer.style.setProperty("--numCols", numColsValue);
    //gridContainer.style.overflow = "auto overlay";
    if(window.navigator.userAgent.indexOf('Safari')){
      gridContainer.style.overflow = "auto hidden";
      gridContainer.style.overflow = "-webkit-paged-x";
    }else {
      gridContainer.style.overflow = "auto hidden";
    }
    
  }
}

function loadProducts([
  type,
  container,
  productcode,
  categorycode,
  isthimarketproduct,
]) {
  var paramaters;
  var newcontainer = "substitutionproducts-";
  var frproduct = "frproduct-";
  if (container.includes(newcontainer)) {
    paramaters = "";
  } else if (container.includes(frproduct)) {
    paramaters = "&frproduct=yes" + "&Product_code=" + productcode;
  } else {
    paramaters = "&Product_code=" + productcode;
  }
  if (isthimarketproduct != 1) {
    isthimarketproduct = 0;
  }
  var getcount = 0;
  var processing = $("#category-listing").html();
  var offset = 0;
  var per_page = "16";
  var products = [];
  queryString = "";
  var customer_id = $("#customerId").val();
  if (customer_id == 0) {
    customer_id = 999999999;
  }
  var customer_type = "";

  if (TypofUser == "wholesale") {
    customer_type = "wholesale";
  } else if (TypofUser == "premium") {
    customer_type = "Premium";
  } else {
    customer_type = "retail";
  }
  var UOM = [];

  $.get(
    "/?Screen=majax&mobileAction=" +
      type +
      "&customer_id=" +
      customer_id +
      "&customer_type=" +
      customer_type +
      "&max_num_prod=50&containertype=" +
      container +
      "&codes=" +
      productcode +
      "&cat_code=" +
      categorycode +
      "&ismarket=" +
      isthimarketproduct +
      paramaters,
    function (dataval) {
      var pack_size = 9999;
      var uom = "";
      var addclass = "";

      let stockavailable = "";
      if (paramaters.includes("frproduct")) {
        stockavailable = dataval.item.filter((inv) => {
          return inv.data.product_inventory > 0;
        });
        getProductresponseBask2(stockavailable);
      } else if (container == "loadmorelovelyproducts") {
        stockavailable = dataval.items.filter((inv) => {
          return inv.data.product_inventory >= 0;
        });
        getProductresponseBask2(stockavailable);
      } else {
        stockavailable = dataval.items.filter((inv) => {
          return inv.data.product_inventory > 0;
        });
        getProductresponseBask2(stockavailable);
      }
      myObjectss = new Vue({
        el: "#" + container,
        data: {
          products: stockavailable,
          savedforlater1: dataval,
        },
        methods: {
          resethtml() {
            myObject.products.push(stockavailable);
          },
          getUomforInventorymessage(element) {
            return element.split("of")[0];
          },
          capitalizeText(s) {
            return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
            //console.log(s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
          },
          roundNumbers(s) {
            // console.log(s);
            var number = parseFloat(s).toFixed(2);
            return number;
          },
          removehype(s) {
            if (s.match("-") == null) {
              return s.replace("avg", "").replace("(", "").replace(")", "");
            } else {
              /*console.log(
                      s
                        .replace(/^[^-]+ - /, "")
                        .replace("(", "")
                        .replace(")", "")
                    );*/
              return s
                .replace(/^[^-]+ - /, "")
                .replace("(", "")
                .replace(")", "");
            }
            //console.log(s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
          },
          getpacSize() {
            let pack_size = 9999;
            let uom = "";
            for (let i = 0; i < dataval.length; i++) {
              for (let j = 0; j < dataval.items[i].data.variants.length; j++) {
                if (
                  dataval.items[i].data.variants[j].pack_size < pack_size &&
                  this.vueUserType == "Retail"
                ) {
                  pack_size = dataval.items[i].data.variants[j].pack_size;
                  uom = dataval.items[i].data.variants[j].UOM;
                } else {
                  uom = "";
                  pack_size = 9999;
                }
                return uom;
                //console.log(uom);
              }
            }
          },
          getProductInputValcheck(element, formId) {
            element.target.value.replace(/\D/g, "");
            //console.log(element.target.value.replace(/\D/g, ''));
            var getProductCode = formId;
            getProductCode = getProductCode.replace("addProduct-", "");
            if (
              element.target.value.replace(/\D/g, "") == "" ||
              element.target.value.replace(/\D/g, "") == "0"
            ) {
              $(".ProductDetail-" + getProductCode)
                .find(".addbtn")
                .prop("disabled", true);
            } else if (element.target.value.replace(/\D/g, "") == "1") {
              $(".ProductDetail-" + getProductCode)
                .find(".addbtn")
                .prop("disabled", false);
            } else {
              $(".ProductDetail-" + getProductCode)
                .find(".addbtn")
                .prop("disabled", false);
              var newvalue = parseInt(element.target.value.replace(/\D/g, ""));
              var qtySize = parseInt(
                $(".ProductDetail-" + formId)
                  .find(".form-check-input")
                  .attr("data-min")
              );
              var getdataStock = parseInt(
                $(".ProductDetail-" + formId)
                  .find(".form-check-input")
                  .attr("data-stock-raw")
              );
              var acttualdataStock = parseInt(
                $(".ProductDetail-" + formId)
                  .find(".form-check-input")
                  .attr("data-stock-raw")
              );
              var qtyinCart = parseInt(
                $(".ProductDetail-" + formId)
                  .find(".QtyVal")
                  .attr("data-qtycart")
              );
              $(".ProductDetail-" + formId)
                .find("[name=Quantity")
                .attr("data-added", newvalue);
              $(".ProductDetail-" + formId)
                .find("[name=Quantity")
                .val(newvalue);
              $(".ProductDetail-" + formId)
                .find(".form-check-input")
                .attr("data-added", newvalue);
              $(".ProductDetail-" + formId)
                .find(".addbtn")
                .prop("disabled", false);
            }
          },

          loadJqueryAssets() {
            $("#recipeFilter").click(function () {
              $(".filterContainer").removeClass("displayNone");
            });
            $(".Fclose").click(function () {
              $(".filterContainer").addClass("displayNone");
            });
            $(".applyFilter").on("click", function () {
              $(".filterContainer").addClass("displayNone");
            });

            jQuery(".showmore").click(function () {
              var facetClass = jQuery(this).attr("data-class");
              jQuery(".hidefacet." + facetClass).css("display", "block");
              jQuery(".collapse-" + facetClass).show();
              jQuery(this).hide();
            });
            jQuery(".collapse")
              .not(".alt_row")
              .click(function () {
                var facetClass = jQuery(this).attr("data-class");
                jQuery(".hidefacet." + facetClass).css("display", "none");
                jQuery(".show-" + facetClass).show();
                jQuery(this).hide();
              });

            $(".sortby").click(function () {
              $(".sort-by-options-wrappers").toggle();
              if ($(".sort-by-options-wrappers").is(":visible") == true) {
                $(".sortby").text("-");
              } else {
                $(".sortby").text("+");
              }
            });
            if(("ontouchstart" in document.documentElement)) {
            $(".dropdown").click(function () {
              var _this = this;
              setTimeout(function () {
                if ($(_this).hasClass("open") == true) {
                  $(_this)
                    .find(".dropdown-item")
                    .find(".slacdiscounttext")
                    .show();
                } else {
                  $(_this)
                    .find(".dropdown-item")
                    .find(".slacdiscounttext")
                    .hide();
                  $(_this).find(".dLabel1").find(".slacdiscounttext").hide();
                }
              }, 10);
            });
          }

            $(".loginClick").click(function () {
              $(".newLoginContainer").removeClass("displayNone");
              $("#signinForm").removeClass("displayNone");
              $(".signUpForm").addClass("displayNone");
              $("#signUpMsg").addClass("displayNone");
              $(".Guest").css("display", "none");
              $(".ajaxmsg").html("");
              $("#login")
                .find("input[type=password], input[type=email]")
                .val("");
              $("#login").find("input[type=hidden]").val("login");
              $("#login").removeClass("checkoutlogin");
              $("#singUpNewsLetter").prop("checked", false);
              $(".accountLinked").addClass("displayNone");
            });

            jQuery(
              ".loginClick, .createAccount, .businessaccount , .checkoutloginClick"
            ).click(function () {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
              jQuery("body").addClass("noscroll");
              $(".signinFormText").show();
              jQuery("#closelogin,.Lclose").click(function () {
                jQuery("body").removeClass("noscroll");
              });
            });
          },
          getCurrenctRestockDate(d) {
            // Convert date string to Date object
            var dDate = new Date(d);

            // Get current date with America/New_York timezone
            var currentDate = new Date().toLocaleString("en-US", {
              timeZone: "America/New_York",
            });
            currentDate = new Date(currentDate);

            // Compare dates
            if (dDate < currentDate) {
              return false;
            } else {
              return true;
            }
          },
        },
        computed: {
          gridClass: function () {
            var gridClass = "";
            if (
              getPageCodes != "SFNT" &&
              getPageCodes != "BASK" &&
              getPageCodes != "PROD"
            ) {
              gridClass =
                "col-xs-6s col-sm-6s col-md-4s col-lg-3s gridclass " +
                getPageCode;
            }
            return gridClass;
          },
        },
        mounted() {
          // myObjectss.resethtml();
          $(document).ready(function () {
            myObjectss.$forceUpdate();
            myObjectss.loadJqueryAssets();
          });
          this.$nextTick(() => {
            if (getPageCode == "SFNT") {
              deliciousCarousel();
            }
            if (container == "savedforlaterlists") {
              window.addEventListener(
                "resize",
                Productscroll(".gift-box-carouselss", stockavailable.length)
              );
              $(".gift-box-carouselss").css("opacity", 1);
            } 
            else if (container == "savedforlaterlist" && getPageCode === 'SavedList') {
            }
            else if (container == "savedforlaterlist") {
              if (stockavailable.length > 4) {
                Productscroll(".productListing", stockavailable.length);
              } else {
                Productscroll(".productListing", stockavailable.length);
              }

              if (container == "savedforlaterlist") {
                $("#savedforlaterlist").css("display", "flow-root");
              }
            }
            
            if (container == "loadmorelovelyproducts") {
              $(".makethiscompletedinner").hide();
              $(".makethiscompletedinner").html("");
              if (dataval.items.length > 0) {
                Productscroll(
                  ".featured-products-carousels",
                  dataval.items.length
                );
                $(".makethiscompletedinner").html(dataval.title);
                $(".makethiscompletedinner").show();
              }
            }
            if (container.includes(newcontainer) == true) {
              if (stockavailable.length < 2) {
                $(".gridProductss")
                  .css("grid-template-columns", "253px")
                  .css("opacity", 0);
              }
              Productscroll(".gridProductss", stockavailable.length);
            }
            // loadSubstitutioncarousel();
            $(document).ready(function () {
              if(("ontouchstart" in document.documentElement)){
              $(".dropdown").click(function () {
                var _this = this;
                setTimeout(function () {
                  if ($(_this).hasClass("open") == true) {
                    $(_this)
                      .find(".dropdown-item")
                      .find(".slacdiscounttext")
                      .show();
                    $(_this).find(".dLabel1").find(".slacdiscounttext").hide();
                  } else {
                    $(_this)
                      .find(".dropdown-item")
                      .find(".slacdiscounttext")
                      .hide();
                    $(_this).find(".dLabel1").find(".slacdiscounttext").hide();
                  }
                }, 10);
              });
            }
            });
            if(("ontouchstart" in document.documentElement)){
            $(".dropdown").click(function () {
              var _this = this;
              setTimeout(function () {
                if ($(_this).hasClass("open") == true) {
                  $(_this)
                    .find(".dropdown-item")
                    .find(".slacdiscounttext")
                    .show();
                  $(_this).find(".dLabel1").find(".slacdiscounttext").hide();
                } else {
                  $(_this)
                    .find(".dropdown-item")
                    .find(".slacdiscounttext")
                    .hide();
                  $(_this).find(".dLabel1").find(".slacdiscounttext").hide();
                }
              }, 10);
            });
          }
            addProductNew();
            checkthreebiecounter();
          });
        },
      });
      $(".productListing").show();
      if (container.includes(frproduct) == true) {
        $("#viewfrproduct").find(".productListing").addClass("nogrid");
        $('#viewfrproduct').find('.addWishlist').hide();
	$('.viewfrproduct').find('.addFavs').hide();
        $("#giftboxproduct").find(".productListing").addClass("nogrid");
	$('#giftboxproduct').find('.addWishlist').hide();
        $('.nogrid').find('.productCardContainer').css('width','300px');
      }
      $(".prod-container").show();
      // addProductNew();
      CheckBasketItemss();
      if (getPageCodes != "SFNT" && getPageCodes != "BASK") {
      }
      setTimeout(function () {
        // addProductNew();
        // CheckBasketItemss();
        checkthreebiecounter();
      }, 1000);
    }
  );
}

function loadProducts2([
  type,
  container,
  productcode,
  categorycode,
  isthimarketproduct,
]) {
  return new Promise((resolve, reject) => {
    var paramaters;
    var newcontainer = "substitutionproducts-";
    var frproduct = "frproduct-";
    if (container.includes(newcontainer)) {
      paramaters = "";
    } else if (container.includes(frproduct)) {
      paramaters = "&frproduct=yes" + "&Product_code=" + productcode;
    } else {
      paramaters = "&Product_code=" + productcode;
    }
    if (isthimarketproduct != 1) {
      isthimarketproduct = 0;
    }
    var getcount = 0;
    var processing = $("#category-listing").html();
    var offset = 0;
    var per_page = "16";
    var products = [];
    queryString = "";
    var customer_id = $("#customerId").val();
    if (customer_id == 0) {
      customer_id = 999999999;
    }
    var customer_type = "";

    if (TypofUser == "wholesale") {
      customer_type = "wholesale";
    } else if (TypofUser == "premium") {
      customer_type = "Premium";
    } else {
      customer_type = "retail";
    }
    var UOM = [];

    $.get(
      "/?Screen=majax&mobileAction=" +
        type +
        "&customer_id=" +
        customer_id +
        "&customer_type=" +
        customer_type +
        "&max_num_prod=50&containertype=" +
        container +
        "&codes=" +
        productcode +
        "&cat_code=" +
        categorycode +
        "&ismarket=" +
        isthimarketproduct +
        paramaters,
      function (dataval) {
        // Your existing code for processing the data
        $.get(
          "/?Screen=majax&mobileAction=" +
            type +
            "&customer_id=" +
            customer_id +
            "&customer_type=" +
            customer_type +
            "&max_num_prod=50&containertype=" +
            container +
            "&codes=" +
            productcode +
            "&cat_code=" +
            categorycode +
            "&ismarket=" +
            isthimarketproduct +
            paramaters,
          function (dataval) {
            var pack_size = 9999;
            var uom = "";
            var addclass = "";

            let stockavailable = "";
            if (paramaters.includes("frproduct")) {
              stockavailable = dataval.item.filter((inv) => {
                return inv.data.product_inventory > 0;
              });
              getProductresponseBask2(stockavailable);
            } else if (container == "loadmorelovelyproducts") {
              stockavailable = dataval.items.filter((inv) => {
                return inv.data.product_inventory >= 0;
              });
              getProductresponseBask2(stockavailable);
            } else {
              stockavailable = dataval.items.filter((inv) => {
                return inv.data.product_inventory > 0;
              });
              getProductresponseBask2(stockavailable);
            }
            myObjectss = new Vue({
              el: "#" + container,
              data: {
                products: stockavailable,
                savedforlater1: dataval,
              },
              methods: {
                resethtml() {
                  myObject.products.push(stockavailable);
                },
                getUomforInventorymessage(element) {
                  return element.split("of")[0];
                },
                capitalizeText(s) {
                  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
                },
                roundNumbers(s) {
                  var number = parseFloat(s).toFixed(2);
                  return number;
                },
                removehype(s) {
                  if (s.match("-") == null) {
                    return s
                      .replace("avg", "")
                      .replace("(", "")
                      .replace(")", "");
                  } else {
                    return s
                      .replace(/^[^-]+ - /, "")
                      .replace("(", "")
                      .replace(")", "");
                  }
                },
                getpacSize() {
                  let pack_size = 9999;
                  let uom = "";
                  for (let i = 0; i < dataval.length; i++) {
                    for (
                      let j = 0;
                      j < dataval.items[i].data.variants.length;
                      j++
                    ) {
                      if (
                        dataval.items[i].data.variants[j].pack_size <
                          pack_size &&
                        this.vueUserType == "Retail"
                      ) {
                        pack_size = dataval.items[i].data.variants[j].pack_size;
                        uom = dataval.items[i].data.variants[j].UOM;
                      } else {
                        uom = "";
                        pack_size = 9999;
                      }
                      return uom;
                    }
                  }
                },
                getProductInputValcheck(element, formId) {
                  element.target.value.replace(/\D/g, "");
                  var getProductCode = formId;
                  getProductCode = getProductCode.replace("addProduct-", "");
                  if (
                    element.target.value.replace(/\D/g, "") == "" ||
                    element.target.value.replace(/\D/g, "") == "0"
                  ) {
                    $(".ProductDetail-" + getProductCode)
                      .find(".addbtn")
                      .prop("disabled", true);
                  } else if (element.target.value.replace(/\D/g, "") == "1") {
                    $(".ProductDetail-" + getProductCode)
                      .find(".addbtn")
                      .prop("disabled", false);
                  } else {
                    $(".ProductDetail-" + getProductCode)
                      .find(".addbtn")
                      .prop("disabled", false);
                    var newvalue = parseInt(
                      element.target.value.replace(/\D/g, "")
                    );
                    var qtySize = parseInt(
                      $(".ProductDetail-" + formId)
                        .find(".form-check-input")
                        .attr("data-min")
                    );
                    var getdataStock = parseInt(
                      $(".ProductDetail-" + formId)
                        .find(".form-check-input")
                        .attr("data-stock-raw")
                    );
                    var acttualdataStock = parseInt(
                      $(".ProductDetail-" + formId)
                        .find(".form-check-input")
                        .attr("data-stock-raw")
                    );
                    var qtyinCart = parseInt(
                      $(".ProductDetail-" + formId)
                        .find(".QtyVal")
                        .attr("data-qtycart")
                    );
                    $(".ProductDetail-" + formId)
                      .find("[name=Quantity")
                      .attr("data-added", newvalue);
                    $(".ProductDetail-" + formId)
                      .find("[name=Quantity")
                      .val(newvalue);
                    $(".ProductDetail-" + formId)
                      .find(".form-check-input")
                      .attr("data-added", newvalue);
                    $(".ProductDetail-" + formId)
                      .find(".addbtn")
                      .prop("disabled", false);
                  }
                },

                loadJqueryAssets() {
                  $("#recipeFilter").click(function () {
                    $(".filterContainer").removeClass("displayNone");
                  });
                  $(".Fclose").click(function () {
                    $(".filterContainer").addClass("displayNone");
                  });
                  $(".applyFilter").on("click", function () {
                    $(".filterContainer").addClass("displayNone");
                  });

                  jQuery(".showmore").click(function () {
                    var facetClass = jQuery(this).attr("data-class");
                    jQuery(".hidefacet." + facetClass).css("display", "block");
                    jQuery(".collapse-" + facetClass).show();
                    jQuery(this).hide();
                  });
                  jQuery(".collapse")
                    .not(".alt_row")
                    .click(function () {
                      var facetClass = jQuery(this).attr("data-class");
                      jQuery(".hidefacet." + facetClass).css("display", "none");
                      jQuery(".show-" + facetClass).show();
                      jQuery(this).hide();
                    });

                  $(".sortby").click(function () {
                    $(".sort-by-options-wrappers").toggle();
                    if ($(".sort-by-options-wrappers").is(":visible") == true) {
                      $(".sortby").text("-");
                    } else {
                      $(".sortby").text("+");
                    }
                  });
                  if(("ontouchstart" in document.documentElement)){
                  $(".dropdown").click(function () {
                    var _this = this;
                    setTimeout(function () {
                      if ($(_this).hasClass("open") == true) {
                        $(_this)
                          .find(".dropdown-item")
                          .find(".slacdiscounttext")
                          .show();
                      } else {
                        $(_this)
                          .find(".dropdown-item")
                          .find(".slacdiscounttext")
                          .hide();
                        $(_this)
                          .find(".dLabel1")
                          .find(".slacdiscounttext")
                          .hide();
                      }
                    }, 10);
                  });
                }

                  $(".loginClick").click(function () {
                    $(".newLoginContainer").removeClass("displayNone");
                    $("#signinForm").removeClass("displayNone");
                    $(".signUpForm").addClass("displayNone");
                    $("#signUpMsg").addClass("displayNone");
                    $(".Guest").css("display", "none");
                    $(".ajaxmsg").html("");
                    $("#login")
                      .find("input[type=password], input[type=email]")
                      .val("");
                    $("#login").find("input[type=hidden]").val("login");
                    $("#login").removeClass("checkoutlogin");
                    $("#singUpNewsLetter").prop("checked", false);
                    $(".accountLinked").addClass("displayNone");
                  });

                  jQuery(
                    ".loginClick, .createAccount, .businessaccount , .checkoutloginClick"
                  ).click(function () {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    jQuery("body").addClass("noscroll");
                    $(".signinFormText").show();
                    jQuery("#closelogin,.Lclose").click(function () {
                      jQuery("body").removeClass("noscroll");
                    });
                  });
                },
                getCurrenctRestockDate(d) {
                  // Convert date string to Date object
                  var dDate = new Date(d);

                  // Get current date with America/New_York timezone
                  var currentDate = new Date().toLocaleString("en-US", {
                    timeZone: "America/New_York",
                  });
                  currentDate = new Date(currentDate);

                  // Compare dates
                  if (dDate < currentDate) {
                    console.log(
                      d +
                        " is less than today's date with America/New_York timezone." +
                        currentDate
                    );
                    return false;
                  } else {
                    console.log(
                      d +
                        " is not less than today's date with America/New_York timezone." +
                        currentDate
                    );
                    return true;
                  }
                },
              },
              computed: {
                gridClass: function () {
                  var gridClass = "";
                  if (
                    getPageCodes != "SFNT" &&
                    getPageCodes != "BASK" &&
                    getPageCodes != "PROD"
                  ) {
                    gridClass =
                      "col-xs-6s col-sm-6s col-md-4s col-lg-3s gridclass " +
                      getPageCode;
                  }
                  return gridClass;
                },
              },
              mounted() {
                $(document).ready(function () {
                  myObjectss.$forceUpdate();
                  myObjectss.loadJqueryAssets();
                });
                this.$nextTick(() => {
                  if (getPageCode == "SFNT") {
                    deliciousCarousel();
                  }
                  if (
                    getPageCode == "BASK" &&
                    container == "savedforlaterlist"
                  ) {
                    setTimeout(function () {
                      if (dataval.items.length > 4) {
                        Productscroll(".productListing", dataval.items.length);
                      }
                    }, 800);

                    if (container == "savedforlaterlists") {
                      window.addEventListener(
                        "resize",
                        Productscroll(
                          ".gift-box-carouselss",
                          dataval.items.length
                        )
                      );
                      $(".gift-box-carouselss").css("opacity", 1);
                    }
                    if (container == "savedforlaterlist") {
                      $("#savedforlaterlist").css("display", "flow-root");
                    }
                  }
                  if (container == "loadmorelovelyproducts") {
                    $(".makethiscompletedinner").hide();
                    $(".makethiscompletedinner").html("");
                    if (dataval.items.length > 0) {
                      Productscroll(
                        ".featured-products-carousels",
                        dataval.items.length
                      );
                      $(".makethiscompletedinner").html(dataval.title);
                      $(".makethiscompletedinner").show();
                    }
                  }
                  if (container.includes(newcontainer) == true) {
                    if (stockavailable.length < 2) {
                      setTimeout(function(){
                      $(".gridProductss")
                        .css("justify-content", "center")
                        .css("display", "grid");
                      },100);
                    }
                    Productscroll(".gridProductss", stockavailable.length);
                  }
                  $(document).ready(function () {
                    if(("ontouchstart" in document.documentElement)){
                    $(".dropdown").click(function () {
                      var _this = this;
                      setTimeout(function () {
                        if ($(_this).hasClass("open") == true) {
                          $(_this)
                            .find(".dropdown-item")
                            .find(".slacdiscounttext")
                            .show();
                          $(_this)
                            .find(".dLabel1")
                            .find(".slacdiscounttext")
                            .hide();
                        } else {
                          $(_this)
                            .find(".dropdown-item")
                            .find(".slacdiscounttext")
                            .hide();
                          $(_this)
                            .find(".dLabel1")
                            .find(".slacdiscounttext")
                            .hide();
                        }
                      }, 10);
                    });
                  }
                  });
                  if(("ontouchstart" in document.documentElement)){
                  $(".dropdown").click(function () {
                    var _this = this;
                    setTimeout(function () {
                      if ($(_this).hasClass("open") == true) {
                        $(_this)
                          .find(".dropdown-item")
                          .find(".slacdiscounttext")
                          .show();
                        $(_this)
                          .find(".dLabel1")
                          .find(".slacdiscounttext")
                          .hide();
                      } else {
                        $(_this)
                          .find(".dropdown-item")
                          .find(".slacdiscounttext")
                          .hide();
                        $(_this)
                          .find(".dLabel1")
                          .find(".slacdiscounttext")
                          .hide();
                      }
                    }, 10);
                  });
                }
                  addProductNew();
                  checkthreebiecounter();
                  if (container.includes(frproduct) == true) {
                    $("#viewfrproduct")
                      .find(".productListing")
                      .addClass("nogrid");
                    $("#giftboxproduct")
                      .find(".productListing")
                      .addClass("nogrid");
                  }
                  $(".prod-container").show();
                  CheckBasketItemss();
                  if (getPageCodes != "SFNT" && getPageCodes != "BASK") {
                  }
                  $(".productListing").show();
                });
              },
            });
          }
        );
        resolve(dataval); // Resolve the promise with the data
      }
    ).fail(function (jqXHR, textStatus, errorThrown) {
      reject(errorThrown); // Reject the promise if there's an error
    });
  });
}

// // Usage
// loadProductsw([...]).then(function(dataval) {
//   // Handle success
//   console.log(dataval);
// }).catch(function(error) {
//   // Handle error
//   console.error(error);
// });

function getProductresponseBask(dataval) {
  console.log(dataval);
  var products = [];
  var uom = "";
  var addclass = "";
  for (let i = 0; i < dataval.items.length; i++) {
    var lowestUOM = "";
    var pack_size = 9999;
    var lowestprice = "";
    var highestpacksize = "";
    var highestprice = "";
    var pricediscount = "";
    var casesaving = "";
    var casesavingwholesale = "";
    var isSale = "";
    var isChildSale = "";

    var getpacksize;
    getpacksize = Math.min.apply(
      null,
      dataval.items[i].data.variants.map(function (item) {
        return item.pack_size;
      })
    );

    for (let j = 0; j < dataval.items[i].data.variants.length; j++) {
      if (getpacksize < pack_size) {
        lowestUOM = dataval.items[i].data.variants[j].UOM;
        pack_size = dataval.items[i].data.variants[j].pack_size;
        isChildSale = dataval.items[i].data.variants[j].sale;
        if (isChildSale == 0) {
          lowestprice = dataval.items[i].data.variants[j].price;
        }
      }
    }

    for (let j = 0; j < dataval.items[i].data.variants.length; j++) {
      if (dataval.items[i].data.variants[j].pack_size != getpacksize) {
        dataval.items[i].data.variants[j].addclass = "hidden";
        dataval.items[i].data.variants[j].default = "0";
        isSale = dataval.items[i].data.variants[j].sale;

        if (dataval.items[i].data.variants[j].slac == "1" || dataval.items[i].data.variants[j].slac_retail == "1") {
          checkdealflags = "yes";
          dataval.items[i].data.variants[j].checkdealflags = "yes";
        } else {
          checkdealflags = "yes";
        }

        if (
          dataval.items[i].data.variants[j].slacdiscount == 0 &&
          setWholesaleuser != 1
        ) {
          highestprice = parseFloat(dataval.items[i].data.variants[j].price);
          msrpprice = parseFloat(dataval.items[i].data.variants[j].msrp);

          var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);

          getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(
            2
          );
          casesaving = (100 * (msrpprice - highestprice)) / msrpprice;
          if (
            casesaving.toFixed(2) > 0 &&
            dataval.items[i].data.variants[j].slacdiscount <= "0"
          ) {
            // dataval.items[i].data.variants[j].notes = "Save " + parseFloat(casesaving.toFixed(2)) + '%';
            dataval.items[i].data.variants[j].slacdiscount = parseFloat(
              casesaving.toFixed(2)
            );
          }
          if (
            dataval.items[i].data.variants[j].notes != "" &&
            dataval.items[i].data.variants[j].UOM_TEXT != "Threebie" &&
            dataval.items[i].data.variants[j].sale == "1" &&
            setWholesaleuser != 1
          ) {
            dataval.items[i].data.variants[j].notes =
              dataval.items[i].data.variants[j].notes;
          } else if (
            dataval.items[i].data.variants[j].sale != "1" &&
            setWholesaleuser != 1
          ) {
            dataval.items[i].data.variants[j].notes = "";
          } else if (
            dataval.items[i].data.variants[j].sale != "1" &&
            setWholesaleuser === 1
          ) {
            dataval.items[i].data.variants[j].notes = "";
          }
        } else if (isSale == 0 && isChildSale == 0) {
          highestpacksize = dataval.items[i].data.variants[j].pack_size;
          highestprice = parseFloat(dataval.items[i].data.variants[j].price);
          pricediscount = parseFloat(lowestprice * highestpacksize);
          var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);
          // 100 x (each price * no of items - case price) / (each price * no of items)
          getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(
            2
          );
          casesavingwholesale =
            (100 * (pricediscount - highestprice)) / pricediscount;
          if (
            casesavingwholesale.toFixed(2) > 0 &&
            dataval.items[i].data.variants[j].catch_weight != "1" &&
            dataval.items[i].data.variants[j].notes == ""
          ) {
            dataval.items[i].data.variants[j].notes =
              "Save " + parseFloat(casesavingwholesale.toFixed(2)) + "%";
          } else {
            dataval.items[i].data.variants[j].notes = "";
          }
        }
      } else {
        dataval.items[i].data.variants[j].default = "1";
        if (
          dataval.items[i].data.variants[j].notes != "" &&
          dataval.items[i].data.variants[j].UOM_TEXT != "Threebie" &&
          dataval.items[i].data.variants[j].sale == "1" &&
          setWholesaleuser != 1
        ) {
          dataval.items[i].data.variants[j].notes =
            dataval.items[i].data.variants[j].notes;
        } else if (
          dataval.items[i].data.variants[j].sale != "1" &&
          setWholesaleuser != 1
        ) {
          dataval.items[i].data.variants[j].notes = "";
        } else if (
          dataval.items[i].data.variants[j].sale != "1" &&
          setWholesaleuser === 1
        ) {
          dataval.items[i].data.variants[j].notes = "";
        }
      }

      if (dataval.items[i].data.variants[j].UOM == "EA") {
        dataval.items[i].data.variants[j].UOM = "EACH";
      } else if (dataval.items[i].data.variants[j].UOM == "CS") {
        dataval.items[i].data.variants[j].UOM =
          "CASE" + " of " + dataval.items[i].data.variants[j].pack_size;
      } else if (dataval.items[i].data.variants[j].UOM == "BAG") {
        dataval.items[i].data.variants[j].UOM =
          "BAG" + " of " + dataval.items[i].data.variants[j].pack_size;
      } else if (dataval.items[i].data.variants[j].UOM == "BX") {
        dataval.items[i].data.variants[j].UOM =
          "Box" + " of " + dataval.items[i].data.variants[j].pack_size;
      } else if (dataval.items[i].data.variants[j].UOM == "PK") {
        dataval.items[i].data.variants[j].UOM =
          "Pack" + " of " + dataval.items[i].data.variants[j].pack_size;
      } else if (dataval.items[i].data.variants[j].UOM == "TUB") {
        dataval.items[i].data.variants[j].UOM =
          "TUB" + " of " + dataval.items[i].data.variants[j].pack_size;
      } else {
        dataval.items[i].data.variants[j].UOM =
          dataval.items[i].data.variants[j].UOM;
      }
      if (
        dataval.items[i].data.variants[j].sale == 0 &&
        dataval.items[i].data.variants[j].sale_offer == 1
      ) {
        dataval.items[i].data.variants[j].sale = 2;
      } else if (
        (dataval[i].items.variants[j].sale == 0 &&
          dataval[i].items.variants[j].vip_sale == 1) ||
        (dataval[i].items.variants[j].sale == 1 &&
          dataval[i].items.variants[j].vip_sale == 1)
      ) {
        dataval[i].items.variants[j].sale = 3;
      } else {
        dataval.items[i].data.variants[j].sale =
          dataval.items[i].data.variants[j].sale;
      }
    }
  }
  // console.log(dataval);
  //console.log(products);
}

function getProductresponseBask1(dataval) {
  console.log(dataval);
  var products = [];
  var uom = "";
  var addclass = "";
  for (let i = 0; i < dataval.item.length; i++) {
    var lowestUOM = "";
    var pack_size = 9999;
    var lowestprice = "";
    var highestpacksize = "";
    var highestprice = "";
    var pricediscount = "";
    var casesaving = "";
    var casesavingwholesale = "";
    var isSale = "";
    var isChildSale = "";

    var getpacksize;
    getpacksize = Math.min.apply(
      null,
      dataval.item[i].data.variants.map(function (item) {
        return item.pack_size;
      })
    );

    for (let j = 0; j < dataval.item[i].data.variants.length; j++) {
      if (getpacksize < pack_size) {
        lowestUOM = dataval.item[i].data.variants[j].UOM;
        pack_size = dataval.item[i].data.variants[j].pack_size;
        isChildSale = dataval.item[i].data.variants[j].sale;
        if (isChildSale == 0) {
          lowestprice = dataval.item[i].data.variants[j].price;
        }
      }
    }

    for (let j = 0; j < dataval.item[i].data.variants.length; j++) {
      if (dataval.item[i].data.variants[j].pack_size != getpacksize) {
        dataval.item[i].data.variants[j].addclass = "hidden";
        dataval.item[i].data.variants[j].default = "0";
        isSale = dataval.item[i].data.variants[j].sale;

        if (dataval.item[i].data.variants[j].slac == "1" || dataval.item[i].data.variants[j].slac_retail == "1") {
          checkdealflags = "yes";
          dataval.item[i].data.variants[j].checkdealflags = "yes";
        } else {
          checkdealflags = "yes";
        }

        if (
          dataval.item[i].data.variants[j].slacdiscount == 0 &&
          setWholesaleuser != 1
        ) {
          highestprice = parseFloat(dataval.item[i].data.variants[j].price);
          msrpprice = parseFloat(dataval.item[i].data.variants[j].msrp);

          var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);

          getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(
            2
          );
          casesaving = (100 * (msrpprice - highestprice)) / msrpprice;
          if (
            casesaving.toFixed(2) > 0 &&
            dataval.item[i].data.variants[j].slacdiscount <= "0"
          ) {
            // dataval.item[i].data.variants[j].notes = "Save " + parseFloat(casesaving.toFixed(2)) + '%';
            dataval.item[i].data.variants[j].slacdiscount = parseFloat(
              casesaving.toFixed(2)
            );
          }
          if (
            dataval.item[i].data.variants[j].notes != "" &&
            dataval.item[i].data.variants[j].UOM_TEXT != "Threebie" &&
            dataval.item[i].data.variants[j].sale == "1" &&
            setWholesaleuser != 1
          ) {
            dataval.item[i].data.variants[j].notes =
              dataval.item[i].data.variants[j].notes;
          } else if (
            dataval.item[i].data.variants[j].sale != "1" &&
            setWholesaleuser != 1
          ) {
            dataval.item[i].data.variants[j].notes = "";
          } else if (
            dataval.item[i].data.variants[j].sale != "1" &&
            setWholesaleuser === 1
          ) {
            dataval.item[i].data.variants[j].notes = "";
          }
        } else if (isSale == 0 && isChildSale == 0) {
          highestpacksize = dataval.item[i].data.variants[j].pack_size;
          highestprice = parseFloat(dataval.item[i].data.variants[j].price);
          pricediscount = parseFloat(lowestprice * highestpacksize);
          var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);
          // 100 x (each price * no of items - case price) / (each price * no of items)
          getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(
            2
          );
          casesavingwholesale =
            (100 * (pricediscount - highestprice)) / pricediscount;
          if (
            casesavingwholesale.toFixed(2) > 0 &&
            dataval.item[i].data.variants[j].catch_weight != "1" &&
            dataval.item[i].data.variants[j].notes == ""
          ) {
            dataval.item[i].data.variants[j].notes =
              "Save " + parseFloat(casesavingwholesale.toFixed(2)) + "%";
          } else {
            dataval.item[i].data.variants[j].notes = "";
          }
        }
      } else {
        dataval.item[i].data.variants[j].default = "1";
        if (
          dataval.item[i].data.variants[j].notes != "" &&
          dataval.item[i].data.variants[j].UOM_TEXT != "Threebie" &&
          dataval.item[i].data.variants[j].sale == "1" &&
          setWholesaleuser != 1
        ) {
          dataval.item[i].data.variants[j].notes =
            dataval.item[i].data.variants[j].notes;
        } else if (
          dataval.item[i].data.variants[j].sale != "1" &&
          setWholesaleuser != 1
        ) {
          dataval.item[i].data.variants[j].notes = "";
        } else if (
          dataval.item[i].data.variants[j].sale != "1" &&
          setWholesaleuser === 1
        ) {
          dataval.item[i].data.variants[j].notes = "";
        }
      }

      if (dataval.item[i].data.variants[j].UOM == "EA") {
        dataval.item[i].data.variants[j].UOM = "EACH";
      } else if (dataval.item[i].data.variants[j].UOM == "CS") {
        dataval.item[i].data.variants[j].UOM =
          "CASE" + " of " + dataval.item[i].data.variants[j].pack_size;
      } else if (dataval.item[i].data.variants[j].UOM == "BAG") {
        dataval.item[i].data.variants[j].UOM =
          "BAG" + " of " + dataval.item[i].data.variants[j].pack_size;
      } else if (dataval.item[i].data.variants[j].UOM == "BX") {
        dataval.item[i].data.variants[j].UOM =
          "Box" + " of " + dataval.item[i].data.variants[j].pack_size;
      } else if (dataval.item[i].data.variants[j].UOM == "PK") {
        dataval.item[i].data.variants[j].UOM =
          "Pack" + " of " + dataval.item[i].data.variants[j].pack_size;
      } else if (dataval.item[i].data.variants[j].UOM == "TUB") {
        dataval.item[i].data.variants[j].UOM =
          "TUB" + " of " + dataval.item[i].data.variants[j].pack_size;
      } else {
        dataval.item[i].data.variants[j].UOM =
          dataval.item[i].data.variants[j].UOM;
      }
      if (
        dataval.item[i].data.variants[j].sale == 0 &&
        dataval.item[i].data.variants[j].sale_offer == 1
      ) {
        dataval.item[i].data.variants[j].sale = 2;
      } else {
        dataval.item[i].data.variants[j].sale =
          dataval.item[i].data.variants[j].sale;
      }
    }
  }
  
  // console.log(dataval);
  //console.log(products);
}

function getProductresponseBask2(dataval) {
  var products = [];
  var uom = "";
  var addclass = "";
  for (let i = 0; i < dataval.length; i++) {
    var lowestUOM = "";
    var pack_size = 9999;
    var lowestprice = "";
    var highestpacksize = "";
    var highestprice = "";
    var pricediscount = "";
    var casesaving = "";
    var casesavingwholesale = "";
    var isSale = "";
    var isChildSale = "";

    var getpacksize;
    getpacksize = Math.min.apply(
      null,
      dataval[i].data.variants.map(function (item) {
        return item.pack_size;
      })
    );

    for (let j = 0; j < dataval[i].data.variants.length; j++) {
      if (getpacksize < pack_size) {
        lowestUOM = dataval[i].data.variants[j].UOM;
        pack_size = dataval[i].data.variants[j].pack_size;
        isChildSale = dataval[i].data.variants[j].sale;
        if (isChildSale == 0) {
          lowestprice = dataval[i].data.variants[j].price;
        }
      }
    }

    for (let j = 0; j < dataval[i].data.variants.length; j++) {
      if (dataval[i].data.variants[j].pack_size != getpacksize) {
        dataval[i].data.variants[j].addclass = "hidden";
        dataval[i].data.variants[j].default = "0";
        isSale = dataval[i].data.variants[j].sale;

        if (dataval[i].data.variants[j].slac == "1" || dataval[i].data.variants[j].slac_retail == "1") {
          checkdealflags = "yes";
          dataval[i].data.variants[j].checkdealflags = "yes";
        } else {
          checkdealflags = "yes";
        }

        if (
          dataval[i].data.variants[j].slacdiscount == 0 &&
          setWholesaleuser != 1
        ) {
          highestprice = parseFloat(dataval[i].data.variants[j].price);
          msrpprice = parseFloat(dataval[i].data.variants[j].msrp);

          var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);

          getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(
            2
          );
          casesaving = (100 * (msrpprice - highestprice)) / msrpprice;
          if (
            casesaving.toFixed(2) > 0 &&
            dataval[i].data.variants[j].slacdiscount <= "0"
          ) {
            // dataval[i].data.variants[j].notes = "Save " + parseFloat(casesaving.toFixed(2)) + '%';
            dataval[i].data.variants[j].slacdiscount = parseFloat(
              casesaving.toFixed(2)
            );
          }
          if (
            dataval[i].data.variants[j].notes != "" &&
            dataval[i].data.variants[j].UOM_TEXT != "Threebie" &&
            dataval[i].data.variants[j].sale == "1" &&
            setWholesaleuser != 1
          ) {
            dataval[i].data.variants[j].notes =
              dataval[i].data.variants[j].notes;
          } else if (
            dataval[i].data.variants[j].sale != "1" &&
            setWholesaleuser != 1
          ) {
            dataval[i].data.variants[j].notes = "";
          } else if (
            dataval[i].data.variants[j].sale != "1" &&
            setWholesaleuser === 1
          ) {
            dataval[i].data.variants[j].notes = "";
          }
        } else if (isSale == 0 && isChildSale == 0) {
          highestpacksize = dataval[i].data.variants[j].pack_size;
          highestprice = parseFloat(dataval[i].data.variants[j].price);
          pricediscount = parseFloat(lowestprice * highestpacksize);
          var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);
          // 100 x (each price * no of items - case price) / (each price * no of items)
          getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(
            2
          );
          casesavingwholesale =
            (100 * (pricediscount - highestprice)) / pricediscount;
          if (
            casesavingwholesale.toFixed(2) > 0 &&
            dataval[i].data.variants[j].catch_weight != "1" &&
            dataval[i].data.variants[j].notes == ""
          ) {
            dataval[i].data.variants[j].notes =
              "Save " + parseFloat(casesavingwholesale.toFixed(2)) + "%";
          } else {
            dataval[i].data.variants[j].notes = "";
          }
        }
      } else {
        dataval[i].data.variants[j].default = "1";
        if (
          dataval[i].data.variants[j].notes != "" &&
          dataval[i].data.variants[j].UOM_TEXT != "Threebie" &&
          dataval[i].data.variants[j].sale == "1" &&
          setWholesaleuser != 1
        ) {
          dataval[i].data.variants[j].notes = dataval[i].data.variants[j].notes;
        } else if (
          dataval[i].data.variants[j].sale != "1" &&
          setWholesaleuser != 1
        ) {
          dataval[i].data.variants[j].notes = "";
        } else if (
          dataval[i].data.variants[j].sale != "1" &&
          setWholesaleuser === 1
        ) {
          dataval[i].data.variants[j].notes = "";
        }
      }

      if (dataval[i].data.variants[j].UOM == "EA") {
        dataval[i].data.variants[j].UOM = "EACH";
      } else if (dataval[i].data.variants[j].UOM == "CS") {
        dataval[i].data.variants[j].UOM =
          "CASE" + " of " + dataval[i].data.variants[j].pack_size;
      } else if (dataval[i].data.variants[j].UOM == "BAG") {
        dataval[i].data.variants[j].UOM =
          "BAG" + " of " + dataval[i].data.variants[j].pack_size;
      } else if (dataval[i].data.variants[j].UOM == "BX") {
        dataval[i].data.variants[j].UOM =
          "Box" + " of " + dataval[i].data.variants[j].pack_size;
      } else if (dataval[i].data.variants[j].UOM == "PK") {
        dataval[i].data.variants[j].UOM =
          "Pack" + " of " + dataval[i].data.variants[j].pack_size;
      } else if (dataval[i].data.variants[j].UOM == "TUB") {
        dataval[i].data.variants[j].UOM =
          "TUB" + " of " + dataval[i].data.variants[j].pack_size;
      } else {
        dataval[i].data.variants[j].UOM = dataval[i].data.variants[j].UOM;
      }
      if (
        dataval[i].data.variants[j].sale == 0 &&
        dataval[i].data.variants[j].sale_offer == 1
      ) {
        dataval[i].data.variants[j].sale = 2;
      } else if (
        (dataval[i].data.variants[j].sale == 0 &&
          dataval[i].data.variants[j].vip_sale == 1) ||
        (dataval[i].data.variants[j].sale == 1 &&
          dataval[i].data.variants[j].vip_sale == 1)
      ) {
        dataval[i].data.variants[j].sale = 3;
      } else {
        dataval[i].data.variants[j].sale = dataval[i].data.variants[j].sale;
      }
    }
  }
  for (let i = 0; i < dataval.length; i++) {
    let newProductPrices = []; // Array to store newproductprice values
  
    for (let j = 0; j < dataval[i].data.variants.length; j++) {
      var specificProductCode = dataval[i].data.variants[j].code;
      dataval[i].data.variants[j].newproductprice = `${dataval[i].data.variants[j].code}=${dataval[i].data.variants[j].price}`;
  
      if (dataval[i].data.variants[j].code === specificProductCode) {
        newProductPrices.push(dataval[i].data.variants[j].newproductprice); // Add newproductprice to array
      }
    }
  
    let joinedPrices = newProductPrices.join('|'); // Join array with '|'
    //console.log(joinedPrices); // Log the joined string
    dataval[i].data.newprices = joinedPrices;
    // console.log(dataval[i].data.newprices);
  }
  // console.log(dataval);
  //console.log(products);
}

function showKeepitColdProducts() {
  var id = "#keepitcold";
  $(id).addClass("viewkeepitcold");
  if ($(id).hasClass("dataloaded") != true) {
    loadProducts(["getChillBags", "savedforlaterlists", ""]);
    let url = "/cudet.html?CustomerAction=getKeepitcold";
    $.get(url, (response) => {
      $(id).html($(response).find(".modal").html());
      $(id).modal("show");
      $(".viewkeepitcold").find(".prod-wishlist").remove();
    });
  } else {
    $(id).modal("show");
  }
  $(id).find(".productListing").addClass("nogrid");
}

// check for device type
function isMobileDevice() {
  const userAgent = navigator.userAgent;
  return /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
    userAgent
  );
}

function isTabletDevice() {
  const userAgent = navigator.userAgent;
  return /tablet|ipad|playbook|silk|(android(?!. *mobile))/i.test(userAgent);
}

function isDesktopDevice() {
  return !isMobileDevice() && !isTabletDevice();
}

function toggleDropdown() {
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  dropdownToggle.addEventListener("click", function () {
    const menuRect = dropdownMenu.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    // Calculate margin-left based on menu position
    let marginLeft = 0;
    if (menuRect.right > windowWidth) {
      marginLeft = -(menuRect.width + 10); // Add buffer for padding/border
    }

    dropdownMenu.style.marginLeft = marginLeft + "px";
  });
}