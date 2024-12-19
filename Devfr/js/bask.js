// Disabling the checkout button if  inventory is not sufficient start
$(document).ready(function () {
    $("#wishListPop").on("shown.bs.modal", function (e) {
      $(".global-header-wrapper").css("z-index", "1006");
    });
  
    $("#viewSubstitutionModal").on("shown.bs.modal", function (e) {
      $("#keepitcold").modal("hide");
    });
  
    $(".out-of-stock-new a").click(function () {
      $("#keepitcold").modal("hide");
      $("#WaitlistProductCode").val($(this).attr("data-product_code"));
      $("#wishsearch").val($(this).attr("data-product_code"));
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
    disableEnter();
    if ($(".is_empty").val() == "1") {
      $(".estimate-shipping-modal-calculate-button").prop("disabled", true);
    }
  
    $(
      ".estimate-shipping-form-notloggedin, .estimate-shipping-form-loggedin, .estimate-shipping-form-mob "
    ).on("keyup keypress", function (e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });
  
    var inventaory_count = $(".inventoryCnt").val();
    /* console.log(inventaory_count, "++++inventaory_count+++"); */
    if (inventaory_count) {
      /*console.log("+++inside the inventory"); */
      $(".btn-checkout").addClass("btn-grey");
      $(".checkoutbutton").css({
        "background-color": "grey !important",
        "pointer-events": "none",
      });
    }
  
    $(".clrCart").click(function () {
      $("#clearCartModal").modal("show");
    });
    // $('.deleteIcon').click(function () {
    //     $("#clearCartModal").modal('show');
  
    // });
  
    $("body").on("click", "#mobileArrowUp", function (event) {
      $("#mobileSummary").removeClass("displayNone");
      $("#mobileArrowDown").removeClass("displayNone");
      $("#mobileArrowUp").addClass("displayNone");
      $(".slideCard").addClass("btmFixh300");
      $(".slideCard").removeClass("btmFixh125");
      $(".cart-total").addClass("displayNone");
      $("body").css("overflow", "hidden");
      $("body").css("position", "relative");
    });
    $("body").on("click", "#mobileArrowDown", function (event) {
      $("#mobileSummary").addClass("displayNone");
      $("#mobileArrowDown").addClass("displayNone");
      $("#mobileArrowUp").removeClass("displayNone");
      $(".slideCard").removeClass("btmFixh300");
      $(".slideCard").addClass("btmFixh125");
      $(".cart-total").removeClass("displayNone");
      $("body").css("overflow", "auto");
      $("body").css("position", "initial");
    });
  
    if (screen.width > 768) {
      $(".scrollShowHide").hover(function () {
        $(".scrollShowHide").addClass("showScroll");
        $(".scrollShowHide").removeClass("child");
      });
      $(".scrollShowHide").mouseleave(function () {
        $(".scrollShowHide").addClass("child");
        $(".scrollShowHide").removeClass("showScroll");
      });
    }
  
    if ($(".baskcount").text() == 0) {
      // removed the code shipping fees and added inside getShippingandotherFees()
    }
    if ($(".baskcount").text() == 1) {
      $(".baskbrandnote").show();
    }
  
    getShippingandotherFees();
  
    function checkZipcode() {
      var str = $(".ship-estimate:visible").val();
      const re = new RegExp("^(?=.*[0-9])(?=.{5})");
      if (re.test(str) == true) {
        return true;
      } else {
        return false;
      }
    }
  
    $(".estimate-shipping").click(function () {
      console.log(checkZipcode());
      if (checkZipcode() == true) {
        //$('#estimateest').modal('show');
        GetValidzipcodeforEstimateShipping();
      }
    });
  
    // getBasketProductPriceUpdate();
  
    new Vue({
      el: '#pricechangelist',
      data: {
        loading: false,
        productDetails: ''
      },
      methods: {
        fetchPriceCheck() {
          this.loading = true;
          $.get("/cudet.html?CustomerAction=frproductpricecheck")
            .done((response) => {
              console.log(response.data.length);
              if(response.data.length === 0){
                $('.basket-warning-message-container').addClass('hidden');
              
              
            }
              else{
                this.productDetails = response;
              response.data.forEach(item=>{
                console.log(item.code);
                item.calulatedprice = (item.saved_price - item.current_price);
                item.calulatedpercentage = (item.calulatedprice/item.saved_price) * 100;
              });
                $('.basket-warning-message-container').removeClass('hidden');
                // document.querySelector('.view-btn').innerHTML = 'View ' + response.data.length;
                // document.querySelector('.view-toggle').innerHTML = 'View ' + response.data.length;
                document.querySelector('.basket-warning-message').addEventListener('click', function() {
                  this.classList.toggle('active');
                  const content = this.nextElementSibling;
                  if (content.style.display === "block") {
                      content.style.display = "none";
                      document.querySelector('.view-btn').innerHTML = 'View Detail';
                  } else {
                      content.style.display = "block";
                      document.querySelector('.view-btn').innerHTML = 'Hide';
                  }
              });
              document.querySelector('.view-toggle').addEventListener('click', function() {
                this.classList.toggle('active');
                const content = this.previousElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                    document.querySelector('.view-toggle').innerHTML = 'View Detail'
                } else {
                    content.style.display = "block";
                    document.querySelector('.view-toggle').innerHTML = 'Hide';
                }
            });
              }
            })
            .fail((error) => {
              console.error("Error fetching the price check:", error);
            })
            .always(() => {
              this.loading = false;
            }).complete(()=>{
              setTimeout(function(){
                $('.price-details').find('ol').removeAttr('hidden');
               },1000);
            });
        }
      },
      mounted(){
        this.fetchPriceCheck();
      }
    });
    
  });
  
  function showShippingSelection(id) {
    var x = document.getElementById(id);
    var y = document.getElementById("summaryIcon");
    if (x.className.indexOf("show_estimate_shipping") == -1) {
      $(".createRecipeFolderBtn1").addClass("hidden");
      x.className += " show_estimate_shipping";
      y.className = y.className.replace(" fa-angle-down", " fa-angle-up");
      $(".estimate-shipping-modal-calculate-button").css({
        color: "grey",
        "pointer-events": "all",
      });
    } else {
      x.className = x.className.replace(" show_estimate_shipping", "");
      $(".createRecipeFolderBtn1").removeClass("hidden");
      y.className = y.className.replace(" fa-angle-up", " fa-angle-down");
      $(".estimate-shipping-modal-calculate-button").css({
        color: "grey",
        "pointer-events": "all",
      });
    }
  }
  
  function submitEstimateShippingInfo(id) {
    showShippingSelection(id);
  }
  // Disabling the checkout button if  inventory is not sufficient end
  
  $("#shipestimate_zip").keyup(function () {
    $(".estimateBtn").addClass("estimate-shipping-modal-calculate-button");
  });
  
  function submitEstimateShippingInfoLoggedIn(id) {
    var $myForm = $(".estimate-shipping-form-loggedin");
    if (!$myForm[0].checkValidity()) {
      $myForm.find(":submit").click();
      $(".estimate-shipping-modal-calculate-button").css({
        color: "grey",
        "pointer-events": "none",
      });
      $(".estimateBtn").removeClass("estimate-shipping-modal-calculate-button");
    } else {
      showShippingSelection(id);
      $(".estimateBtn").addClass("estimate-shipping-modal-calculate-button");
      $(".estimate-shipping-modal-no-rates-found-message").remove();
      $(".table").remove();
      $("#shipping-estimate-modal").modal();
      $(".estimate-shipping-modal-calculate-button").prop("disabled", true);
    }
  }
  
  function submitEstimateShippingInfoNotLoggedIn(id) {
    var $myForm = $(".estimate-shipping-form-notloggedin");
    if (!$myForm[0].checkValidity()) {
      $myForm.find(":submit").click();
      $(".estimate-shipping-modal-calculate-button").css({
        color: "grey",
        "pointer-events": "none",
      });
      $(".estimateBtn").removeClass("estimate-shipping-modal-calculate-button");
    } else {
      showShippingSelection(id);
      $(".estimateBtn").addClass("estimate-shipping-modal-calculate-button");
      $(".estimate-shipping-modal-no-rates-found-message").remove();
      $(".table").remove();
      $("#shipping-estimate-modal").modal();
      $(".estimate-shipping-modal-calculate-button").prop("disabled", true);
    }
  }
  
  function submitEstimateShippingInfoMob(id) {
    var $myForm = $(".estimate-shipping-form-mob");
    if (!$myForm[0].checkValidity()) {
      $(".submitestimate").click();
    } else {
      setTimeout(function () {
        showShippingSelection(id);
        $(".estimate-shipping-modal-calculate-buttonss").click();
      }, 1000);
    }
  }
  
  function submitEstimateShippingInfoLoggedIn(id) {
    var $myForm = $(".estimate-shipping-form-loggedin");
    if (!$myForm[0].checkValidity()) {
      $myForm.find(":submit").click();
    } else {
      showShippingSelection(id);
    }
  }
  
  function shipestimate() {
    var self = this;
  
    this.dialog = document.getElementById("shipestimate_dialog");
    this.backing = document.getElementById("shipestimate_backing");
    this.inputfields_tbody = document.getElementById(
      "shipestimate_inputfields_tbody"
    );
    this.shippingmethods_tbody = document.getElementById(
      "shipestimate_shippingmethods_tbody"
    );
    this.shippingmethods = document.getElementById(
      "shipestimate_shippingmethods"
    );
    this.body = document.getElementsByTagName("body")[0];
  
    this.close = document.getElementById("shipestimate_close");
    this.calculate = document.getElementById("shipestimate_calculate");
    this.show = document.getElementById("shipestimate_show");
  
    if (this.close)
      this.close.onclick = function () {
        self.Hide();
        return false;
      };
    if (this.calculate)
      this.calculate.onclick = function () {
        self.Calculate();
        return false;
      };
    if (this.show)
      this.show.onclick = function () {
        self.Show();
        return false;
      };
    if (this.backing)
      this.backing.onclick = function () {
        self.Hide();
        return false;
      };
  }
  
  shipestimate.prototype.Show = function () {
    var self = this;
  
    this.dialog.style.display = "block";
    this.backing.style.display = "inline-block";
    this.shippingmethods_tbody.style.display = "none";
    this.inputfields_tbody.style.display = "";
    this.calculate.style.display = "inline-block";
  
    window.scrollTo(0, 0);
  
    window.onresize = function () {
      self.Resize();
    };
  
    self.Resize();
  };
  
  shipestimate.prototype.Hide = function () {
    this.dialog.style.display = "none";
    this.backing.style.display = "none";
  };
  
  shipestimate.prototype.Calculate = function () {
    document.shipestimate_form.submit();
  };
  
  shipestimate.prototype.Resize = function () {
    if (document.documentElement.clientHeight > document.body.scrollHeight) {
      if (this.backing)
        this.backing.style.height = document.documentElement.clientHeight + "px";
    } else {
      if (this.backing)
        this.backing.style.height =
          document.body.scrollHeight > document.documentElement.scrollHeight
            ? document.body.scrollHeight + "px"
            : document.documentElement.scrollHeight + "px";
    }
  
    if (this.dialog)
      this.dialog.style.left =
        document.body.offsetWidth / 2 - this.dialog.offsetWidth / 2 + "px";
    if (this.dialog) this.dialog.style.top = 100 + "px";
  };
  
  var shipestimate_init = new shipestimate();
  
  $(".estimateBtn").click(function () {
    var State = $(".shipestimate_state_select").val();
    var Zipcode = $(".shipestimate_zip").val();
    var addr = $(".shipestimate_addr").val();
    var newaddr = '<span  class="address"> ' + addr + "</span>";
    $("#estimateHeader").html(newaddr + " " + State + " " + Zipcode);
    $(".address").on("keyup", function () {
      var addr = $(".address").text();
      $(".shipestimate_addr").val(addr);
    });
  });
  $(".estimateBtn").click(function () {
    var State = $(".shipestimate_state_select_mob").val();
    var addr = $(".shipestimate_addr_mob").val();
    var Zipcode = $(".shipestimate_zip_mob").val();
    $(".address").on("keyup", function () {
      var addr = $(".address").text();
      $(".shipestimate_addr").val(addr);
    });
  });
  $(".loginClick").on("click", function () {
    $(".newLoginContainer").show();
    $(".newLoginContainer").removeClass("displayNone");
  });
  
  $(".address").on("keyup", function () {
    var addr = $(".address").text();
    $(".shipestimate_addr").val(addr);
  });
  $("body").on(
    "click",
    ".estimate-shipping-modal-calculate-button",
    function (event) {
      $(".estimate-shipping-modal-no-rates-found-message").remove();
      $(".table").remove();
      $("#shipping-estimate-modal").modal();
      $(".estimate-shipping-modal-calculate-button").prop("disabled", true);
    }
  );
  
  $("#shipping-estimate-modal").on("hidden.bs.modal", function (e) {
    $(".estimate-shipping-modal-calculate-button").prop("disabled", false);
  });
  $("#shipping-estimate-modal").on("hide.bs.modal", function (e) {
    $(".estimate-shipping-modal-calculate-button").prop("disabled", false);
  });
  
  function getEstimate() {
    $(".estimateBtn").click(function () {
      var State = $(".shipestimate_state_select").val();
      var Zipcode = $(".shipestimate_zip").val();
      var addr = $(".shipestimate_addr").val();
      var newaddr = '<span  class="address"> ' + addr + "</span>";
      $("#estimateHeader").html(newaddr + " " + State + " " + Zipcode);
      $(".address").on("keyup", function () {
        var addr = $(".address").text();
        $(".shipestimate_addr").val(addr);
      });
    });
  }
  
  if (screen.width < 768) {
    $(".col-xs-12").removeClass("tabpadding");
  }
  
  $(".baskbrandnote").hide();
  setTimeout(function () {
    if ($(".baskcount").text() == 0) {
    } else {
      $(".baskbrandnote").show("slow");
    }
  }, 2000);
  
  /*for substitution */
  function showSubstitutions(productCode, subitems) {
    $("#viewSubstitutionModal").addClass("viewSubstitution" + productCode);
    let url =
      "/ajax.html?CustomerAction=getCartSubstitution&productCode=" + productCode;
    $.get(url, (response) => {
      $("#viewSubstitutionModal").html($(response).find(".modal").html());
  
      /* Added Temp Fix By Bhanu*/
      setTimeout(function () {
        $("body")
          .find("#viewSubstitutionModal")
          .find(".product-item-new")
          .each(function () {
            $(this).find(".dropdown-menu li a")[0].click();
          });
        addProductNew();
        CheckBasketItems();
      }, 300);
  
      /* Added Temp Fix By Bhanu*/
  
      $("#viewSubstitutionModal").modal("show");
      setTimeout(function () {
        $(".mobileversions").each(function () {
          var mainimg = $(this).attr("datasrc2");
          $(this).attr("src", mainimg);
        });
      }, 100);
  
      $(".frsubstitutionmodal").on("hide.bs.modal", function () {
        setTimeout(function () {
          $(".global-header-wrapper").css("z-index", "1");
        }, 100);
      });
  
      $(".gridProducts").each(function () {
        if ($(window).width() < 768) {
          if ($(this).find(".product-item-new").length > 2) {
            var owl = $(this).owlCarousel({
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
                  items: 1.5,
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
    });
  }
  /*for substitution */
  
  /*content js is here */
  
  function is_touch_device() {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }
  
  $("body").on("mousedown", ".qtybox", function (event) {
    if (window.innerWidth < 900 || is_touch_device) event.preventDefault();
  });
  
  var timer_id = setTimeout(function () {}, 1);
  
  var changeBasketQty = function (element, sign) {
    event.preventDefault();
    var targetInput = $(element)
      .closest(".custom-number-input")
      .find('input[type="tel"]');
  
    var currentValue = parseInt($.trim($(targetInput).val()));
    console.log(currentValue, "+++currentValue+++");
    var totalQntyAvailable = parseInt($.trim($(targetInput).attr("data-stock")));
    var qtySize = parseInt($.trim($(targetInput).attr("data-min")));
    let parentuom = $(targetInput).attr("data-uom");
    var isDataThreebie = $(targetInput).attr("data-cartthreebie");
    var isDataMarketThreebie = $(targetInput).attr("data-cartmarketthreebie");
    var productcode = $(targetInput).attr("data-cartproductcode");
    console.log("Elegible for 3 " + isDataThreebie);
    console.log("Is this Market Threebie Eligible" + isDataMarketThreebie);
  
    var errorMsg =
      "Sorry, we do not have enough quantity to fulfill your order.\r\nPlease adjust the quantity and try again. <br>  ";
  
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);
    if (isNaN(currentValue)) {
      currentValue = 1;
    }
  
    if (sign === "+") {
      currentValue++;
      if (qtySize * 1 > totalQntyAvailable) {
        $("#new_globalerrorpopup .gpoperror").html(
          errorMsg +
            '<br/> \r\n <p class="">Quantity Available:</p> ' +
            parentuom +
            " - " +
            remaingQnty
        );
        $("#new_globalerrorpopup").modal("show");
        return false;
      }
      $(targetInput).attr("data-stock", totalQntyAvailable - qtySize);
    } else if (sign === "-") {
      currentValue = currentValue > 1 ? currentValue - 1 : 0;
      $(targetInput).attr("data-stock", totalQntyAvailable + qtySize);
      setTimeout(cartEmpty, 3000);
    }
    console.log(
      "Updating Qty to:......" + $(this).find(".basket-qty-input").val()
    );
  
    $(element).closest(".product-row").find(".psubtotal").text("...");
    $(targetInput).val(currentValue);
    console.log($(targetInput).val(), "+++currentValue+++");
    clearTimeout(timer_id);
    console.log("restarting timer");
    timer_id = setTimeout(function () {
      $("body").find(".updatedShipping .logo").hide();
      $("body").find(".updatedShipping .load-img").css("display", "flex");
      $(".totalamounts,.retailsubtotal").text("...");
      $(element).closest(".basket-page-quantity-update-form").submit();
      loadCheckoutmessage();
    }, 500);
  
    setTimeout(function () {
      if (isDataMarketThreebie == "Yes") {
        Checkthreebieproductsincart();
      } else if (isDataThreebie == "Yes") {
        Checkthreebieproductsincart();
      }
    }, 1000);
  };
  function Checkthreebieproductsincart() {
    $(".custom-number-input")
      .find('input[type="tel"]')
      .each(function () {
        var targetInput = this;
        var qtyincart = $(targetInput).attr("data-qtyincart");
        var marketqtyincart = $(targetInput).attr("data-market-qtyincart");
        var isDataThreebie = $(targetInput).attr("data-cartthreebie");
        var isDataMarketThreebie = $(targetInput).attr("data-cartmarketthreebie");
        var productcode = $(targetInput).attr("data-cartproductcode");
  
        if (isDataMarketThreebie == "Yes") {
          /*checkforThreebieElegible(productcode,qtyincart);*/
          if (marketqtyincart < 3) {
            checkforMarketThreebieElegible(productcode, marketqtyincart);
          } else {
            $(".threebiebtnincart-" + productcode).hide();
          }
          var strikerTotal = 0;
          var totalamount = 0;
          $(".threebiecart-actualprice").each(function () {
            var total = $(this).html().replace("$", "");
            strikerTotal += +parseFloat(total);
          });
  
          $(".totalamt").each(function () {
            var total = $(this).html().replace("$", "");
            totalamount += +parseFloat(total);
          });
          var getTotal = (strikerTotal - totalamount) * 3;
          $(".threebiediscount").text("$" + getTotal.toFixed(2));
        } else if (isDataThreebie == "Yes") {
          /*checkforThreebieElegible(productcode,qtyincart);*/
          if (qtyincart < 3) {
            checkforThreebieElegible(productcode, qtyincart);
          } else {
            $(".threebiebtnincart-" + productcode).hide();
          }
          var strikerTotal = 0;
          var totalamount = 0;
          $(".threebiecart-actualprice").each(function () {
            var total = $(this).html().replace("$", "");
            strikerTotal += +parseFloat(total);
          });
  
          $(".totalamt").each(function () {
            var total = $(this).html().replace("$", "");
            totalamount += +parseFloat(total);
          });
          var getTotal = (strikerTotal - totalamount) * 3;
          $(".threebiediscount").text("$" + getTotal.toFixed(2));
        }
      });
  }
  
  var changeBasketQtyusingInput = function (element) {
    event.preventDefault();
    var targetInput = $(element).val();
    var uomtype = $(targetInput).attr("data-cart-uom");
    var currentValue = targetInput;
    console.log(currentValue, "+++currentValue+++");
    var totalQntyAvailable = parseInt($.trim($(element).attr("data-stock")));
    var qtySize = parseInt($.trim($(element).attr("data-min")));
    let parentuom = $(element).attr("data-uom");
    var errorMsg =
      "Sorry, we do not have enough quantity to fulfill your order.\r\nPlease adjust the quantity and try again. <br>  ";
    var addedqtytoBASK = parseInt($.trim($(element).attr("data-bask-addedqty")));
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);
    if (isNaN(currentValue)) {
      currentValue = 1;
    }
  
    /* Inventory Check  */
    var getdataStock = totalQntyAvailable;
  
    var getnewQTY = targetInput;
  
    var checkStockRequired = Math.floor(getnewQTY * qtySize);
  
    /*var dataStockcheck = (parseInt(getdataStock) - parseInt(newqtyinCart)) - parseInt(getnewQTY);*/
  
    if (getdataStock >= checkStockRequired) {
      $(targetInput).attr("data-stock", totalQntyAvailable - qtySize);
  
      currentValue = currentValue > 2 ? currentValue - 1 : 0;
      $(targetInput).attr("data-stock", totalQntyAvailable + qtySize);
  
      $(element).closest(".product-row").find(".psubtotal").text("...");
      $(targetInput).val(currentValue);
      setTimeout(cartEmpty, 2000);
      console.log($(targetInput).val(), "+++currentValue+++");
      clearTimeout(timer_id);
      console.log("restarting timer");
      timer_id = setTimeout(function () {
        $("body").find(".updatedShipping .logo").hide();
        $("body").find(".updatedShipping .load-img").css("display", "flex");
        $(".totalamounts,.retailsubtotal").text("...");
        $(element).closest(".basket-page-quantity-update-form").submit();
        loadCheckoutmessage();
      }, 500);
    } else {
      $("#new_globalerrorpopup .gpoperror").html(
        errorMsg +
          '<br/> \r\n <p class="">Quantity Available:</p> ' +
          parentuom +
          " - " +
          remaingQnty
      );
      $("#new_globalerrorpopup").modal("show");
      // getBasketProductPriceUpdate();
      $(element).val(addedqtytoBASK);
      return false;
    }
  };
  
  $("body").on("click", ".dcheckAll", function (event) {
    $(".loaderContainer").css({ display: "block" });
    if ($(".dcheckAll").prop("checked")) {
      var time = 100;
      $(".drecipeCheck:checkbox:not(:checked)").each(function () {
        let url =
          "/ajax.html?CustomerAction=saveAllowSubstitutions&product_id=" +
          $(this).attr("data-code") +
          "&v=" +
          Math.random();
        setTimeout(function () {
          $.get(url, (response, status) => {});
        }, time);
        time += 1000;
      });
    } else {
      var time = 100;
      $(".drecipeCheck:checkbox:checked").each(function () {
        let url =
          "/ajax.html?CustomerAction=saveAllowSubstitutions&product_id=" +
          $(this).attr("data-code") +
          "&v=" +
          Math.random();
        setTimeout(function () {
          $.get(url, (response, status) => {});
        }, time);
        time += 1000;
      });
    }
    $(".loaderContainer").css({ display: "none" });
    $("input:checkbox").not(this).prop("checked", this.checked);
  });
  
  $("body").on("click", ".mCheckAll", function (event) {
    $(".loaderContainer").css({ display: "block" });
    if ($(".mCheckAll").prop("checked")) {
      var time = 100;
      $(".mrecipeCheck:checkbox:not(:checked)").each(function () {
        let url =
          "/ajax.html?CustomerAction=saveAllowSubstitutions&product_id=" +
          $(this).attr("data-code") +
          "&v=" +
          Math.random();
        setTimeout(function () {
          $.get(url, (response, status) => {});
        }, time);
        time += 1000;
      });
    } else {
      var time = 100;
      $(".mrecipeCheck:checkbox:checked").each(function () {
        let url =
          "/ajax.html?CustomerAction=saveAllowSubstitutions&product_id=" +
          $(this).attr("data-code") +
          "&v=" +
          Math.random();
        setTimeout(function () {
          $.get(url, (response, status) => {});
        }, time);
        time += 1000;
      });
    }
    $(".loaderContainer").css({ display: "none" });
    $("input:checkbox").not(this).prop("checked", this.checked);
  });
  
  $(document).ready(function () {
    $(".wscartdisbledclass").each(function () {
      $(".wscartdisbledclass .qtyboxMain input").prop("disabled", true);
      $(".wscartdisbledclass .drecipeCheck").prop("disabled", true);
      $(".wscartdisbledclass .mblAllowSubs .mrecipeCheck").prop("disabled", true);
    });
  
    $(".wscartdisbledclass").each(function () {
      $(".wscartdisbledclass .item-name").prop("disabled", true);
      $(".wscartdisbledclass .prodnamelink").removeAttr("href");
      $(".wscartdisbledclass .image-wrapper a").removeAttr("href");
    });
  
    var wsdisbledctr = 0;
    $(".wscartdisbledclass").each(function () {
      wsdisbledctr++;
    });
    console.log(wsdisbledctr);
  
    var wsdisbledctr = 0;
    $(".wscartdisbledclass").each(function () {
      wsdisbledctr++;
    });
    console.log(wsdisbledctr);
    if (wsdisbledctr > 0) {
      $(".wscartdisbledclass .remove-item1").addClass("wsremove");
      $(".checkAll").prop("disabled", true);
      $(".checkAll .checkmark").css("opacity", "0.4");
      $(".checkoutbutton").removeAttr("href");
      $(".btn-checkout").removeAttr("href").removeAttr('onclick');
      $(".checkoutbutton").click(function () {
        $("#cartitemdisableditemmodal").modal("show");
      });
      $(".btn-checkout").click(function () {
        $("#cartitemdisableditemmodal").modal("show");
      });
    }
  
    var time = 100;
    var wsdisbledctr1 = 0;
    $(".RemovefromCart").click(function () {
      $(".wsremove:visible").each(function (index) {
        wsdisbledctr1++;
        var removevalue = $(this).attr("data-remove");
        var link =
          "/ajax.html?CustomerAction=RetailOnlyItems&removeitem=" + removevalue;
        $(".RemovefromCart").html(
          '<img src="graphics/00000001/3/loading_2.gif" width="20" height="20">'
        );
        setTimeout(function () {
          $.get(link, (response, status) => {
            var counter = 0;
            if (status == "success") {
              link =
                "/?Action=RGRP&Screen=CUDET&Basket_Group=" +
                response +
                "&Offset=&AllOffset=&CatListingOffset=&RelatedOffset=&SearchOffset=";
  
              $.get(link, (response) => {
                if (response) {
                  counter++;
                }
                if (counter > 0) {
                  counter = 0;
                } else {
                  counter++;
                  location.reload();
                }
              });
            }
          });
        }, time);
        time += 100;
      });
      if (wsdisbledctr1 == 0) {
        location.reload();
      }
      $("#baskContainer").load(
        window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?Screen=BASK #baskContainer",
        function () {
          $(".RemovefromCart").click();
          wsdisbledctr1--;
        }
      );
    });
  
    var wineitemcheck = 0;
  
    $(".RemovefromCartforwine").click(function () {
      $(".removewineitem:visible").each(function (index) {
        wineitemcheck++;
        var removevalue = $(this).attr("data-remove");
  
        var link =
          "/ajax.html?CustomerAction=WineOnlyItems&removeitem=" + removevalue;
        $(".RemovefromCartforwine").html(
          '<img src="graphics/00000001/3/loading_2.gif" width="20" height="20">'
        );
  
        setTimeout(function () {
          $.get(link, (response, status) => {
            var counter = 0;
            if (status == "success") {
              link =
                "/?Action=RGRP&Screen=CUDET&Basket_Group=" +
                response +
                "&Offset=&AllOffset=&CatListingOffset=&RelatedOffset=&SearchOffset=";
  
              $.get(link, (response) => {
                if (response) {
                  counter++;
                }
                if (counter > 0) {
                  counter = 0;
                } else {
                  counter++;
                  location.reload();
                }
              });
            }
          });
        }, time);
        time += 100;
      });
  
      if (wineitemcheck == 0) {
        location.reload();
      }
      $("#baskContainer").load(
        window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?Screen=BASK #baskContainer",
        function () {
          $(".RemovefromCart").click();
          wineitemcheck--;
        }
      );
    });
  
    var nonwineitemcheck = 0;
    $(".RemovefromCartfornonewine").click(function () {  
       $(".nothisisnotwineaccount:visible").each(function (index) {
         nonwineitemcheck++;
         var removevalue = $(this).attr("data-remove");
   
         var link =
           "/ajax.html?CustomerAction=WineOnlyItems&removeitem=" + removevalue;
         $(".RemovefromCartfornonewine").html(
           '<img src="graphics/00000001/3/loading_2.gif" width="20" height="20">'
         );
   
         setTimeout(function () {
           $.get(link, (response, status) => {
             var counter = 0;
             if (status == "success") {
               link =
                 "/?Action=RGRP&Screen=CUDET&Basket_Group=" +
                 response +
                 "&Offset=&AllOffset=&CatListingOffset=&RelatedOffset=&SearchOffset=";
   
               $.get(link, (response) => {
                 if (response) {
                   counter++;
                 }
                 if (counter > 0) {
                   counter = 0;
                 } else {
                   counter++;
                   location.href = "/?Screen=Bask&Store=G";
                 }
               });
             }
           });
         }, time);
         time += 100;
       });
   
       if (nonwineitemcheck == 0) {
        location.href = "/?Screen=Bask&Store=G";
       }
       $("#baskContainer").load(
         window.location.protocol +
           "//" +
           window.location.host +
           window.location.pathname +
           "?Screen=BASK #baskContainer",
         function () {
           $(".RemovefromCart").click();
           nonwineitemcheck--;
         }
       );
   
   console.log(nonwineitemcheck);
   });
  });
  
  function getEstimate() {
    $(".estimateBtn").click(function () {
      var State = $(".shipestimate_state_select").val();
      var Zipcode = $(".shipestimate_zip").val();
      var addr = $(".shipestimate_addr").val();
      var newaddr = '<span  class="address"> ' + addr + "</span>";
      $("#estimateHeader").html(newaddr + " " + State + " " + Zipcode);
      $(".address").on("keyup", function () {
        var addr = $(".address").text();
        $(".shipestimate_addr").val(addr);
      });
    });
  }
  getEstimate();
  
  /*footer js is here */
  function GetBaskChanges() {
    if ($("body").hasClass("BASK")) {
      $.post("merchant.mvc?screen=BASK").done(function (responseData) {
        if ($(responseData).find("#basket-contents").length) {
          //we are in the bask page
          $("#basket-contents").html(
            $(responseData).find("#basket-contents").html()
          );
          $(".updatedShipping").html(
            $(responseData).find(".updatedShipping").html()
          );
          $(".updatedShipping").removeAttr("hidden");
          $("body").find(".updatedShipping").show();
          if ($(responseData).find(".is_empty").val() == "1") {
            $(".mobile-share").css({
              "margin-left": "1rem",
            });
            $(".clearshopingcart ").hide();
            $(".estimate-shipping-modal-calculate-button").prop("disabled", true);
            $(".dchillMsg").css({ display: "none" });
          } else {
            $(".clearshopingcart ").show();
            $(".mobile-share").css({
              "margin-left": "-4rem",
            });
            $(".estimate-shipping-modal-calculate-button").prop(
              "disabled",
              false
            );
            $(".dchillMsg").css({ display: "block" });
          }
          var inventaory_count = $(".inventoryCnt").val();
          if (inventaory_count) {
            $(".btn-checkout").addClass("btn-grey");
            $(".checkoutbutton").css({
              "background-color": "grey !important",
              "pointer-events": "none",
            });
          }
        }
  
        basketApp.loadBasket();
      });
    }
  }
  
  function GetBaskCount() {
    $.getJSON("/GLOBALBASK_JSON.html", function (data) {
      /*console.log(data.basket_count);*/
      $(".baskcount").text(data.basket_count);
    });
  }
  GetBaskCount();
  
  //     $(".prog-cat").each(function(i) {
  //         var categorycode = $(this).attr('data-ctgy');
  //         var title = $(this).attr('data-title');
  //         if(categorycode == 'great-deals'){
  //             /*$.getScript("/Merchant5/scripts/00000001/vueapp.js?T=5fe8a6e4444444444444444444444");*/
  //         }else{
  //         setTimeout(loadDealsOrSavedItems(this), 300);
  //         }
  // });
  
  $(document).ready(function () {
    $(".waitlistbtn").click(function () {
      $("#WaitlistProductCode").val($(this).attr("data-product_code"));
      $("#WaitlistVariantID").val(
        $(this)
          .closest(".product-item")
          .find(".form-check input:checked")
          .attr("data-product_variant")
      );
    });
    $(".loginClick").on("click", function () {
      $(".newLoginContainer").removeClass("displayNone");
    });
    /*Make popup appear*/
    $("body").on("click", ".product-names a,.product-thumbnails a", function (e) {
      e.preventDefault();
      let heart = $(this).parents(".product-item").find(".addFav");
      setWishlistParams(heart);
      /* make background not scrollable */
      $("body").css("overflow", "hidden");
      /*$(window).width()<768*/
      var productItem = $(this).closest(".owl-item");
      let code =
        $(this).closest(".owl-item").find(".product-item").attr("data-code") ||
        $(this)
          .closest(".product-details")
          .find("input[name=Product_Code]")
          .val();
      $("#baskgdpopup").html(
        '<center><p><img src="graphics/00000001/loading.gif"></p></center>'
      );
      $("#baskgdpopup").load(
        "&mvt:global:secure_sessionurl;Screen=PROD&Type=cartLoad&Product_Code=" +
          productItem.find(".product-item-new").attr("data-code") +
          " #prodContents",
        () => {
          $("#js-purchase-product").append(
            '<input type="hidden" name="Screen" value="BASK">'
          );
          refreshItemsOnBasket();
          addProductNew();
          if (fbq) {
            fbq("track", "ViewContent", {
              content_name: $(
                "#baskgdpopup .product-information-wrapper h1"
              ).text(),
              //content_category: 'Apparel & Accessories > Shoes',
              content_ids: [code],
              content_type: "product",
              //value: 0.50,
              //currency: 'USD'
            });
          }
        }
      );
      $("#baskgdpopup").show().addClass("PROD");
      $("#baskgdpopupClose").show();
    });
  
    /*Close Popup*/
    $("body").on("click", ".closeIcon", function () {
      $("#baskgdpopup").hide();
      $("#baskgdpopupClose").hide();
      /* make background scrollable */
      $("body").css("overflow", "visible");
    });
  
    /*fixing bug waitlist*/
    $("#baskgdpopup").css("z-index", 9800);
    $("#waitList").css("z-index", 9900);
  
    $("body").on("click", ".saveItemLater", function (e) {
      var refresh = "";
      let datagroupid = $(this).attr("data-groupid");
      let dataprice = $(this).attr('data-productprice');
      let dataproductprice = $(this).attr('data-productprice');
      let parentid = $(this).attr('data-product-parentid');
      let customerid = $('#customerId').val();
      e.preventDefault();
      let url =
        "/ajax.html?CustomerAction=saveCartItems&product_id=" +
        $(this).attr("data-code")+"&price="+dataprice;
      $.get(url, (response) => {
        $(".ctgy-title span").html("SAVED FOR LATER");
        $(this).hide();
        // $(".prog-cat").each(function(i) {
        //     /*console.log("loading deals ");
        //     setTimeout(loadDealsOrSavedItems(this),
        //     refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + "?Action=RGRP&Screen=BASK&Basket_Group="+datagroupid+"&Offset=&mvte:global:Offset;&AllOffset=&mvte:global:AllOffset;&CatListingOffset=&mvte:global:CatListingOffset;&RelatedOffset=&mvte:global:RelatedOffset;&SearchOffset=&mvte:global:SearchOffset;",
        //     window.history.pushState({ path: refresh }, '', refresh), $('.bask-' + datagroupid).hide('slow'), 300); */
        // /* $('.loaderContainer').show();
        //     $('body').load(window.location.protocol + "//" + window.location.host + window.location.pathname + "?Action=RGRP&Screen=BASK&Basket_Group=" + datagroupid + "&Offset=&mvte:global:Offset;&AllOffset=&mvte:global:AllOffset;&CatListingOffset=&mvte:global:CatListingOffset;&RelatedOffset=&mvte:global:RelatedOffset;&SearchOffset=&mvte:global:SearchOffset;", function() {
        //         $('.loaderContainer').hide();
        //         $('body').load().stop();
        //     });*/
  
        // });
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?Action=RGRP&Screen=BASK&Basket_Group=" +
          datagroupid +
          "&utm_source=savedforlater";
          addProductDatatoUserSavedlist(parentid,customerid,dataproductprice)
        window.location = newurl;
      });
      $(".loginClick").on("click", function () {
        $("#signinForm").removeClass("displayNone");
        $(".newLoginContainer").removeClass("displayNone");
      });
    });
    var baskId = $(".baskid").text();
    if (baskId == 1) {
    }
    /*console.log("yes");*/
  
    $("body").on("click", ".prods-listing .addbtn", function (e) {
      e.preventDefault();
      let url =
        "/cudet.html?CustomerAction=saveCartItems_new&product_id=" +
        $(this).attr("data-productcode")+'-';
      $.get(url, (response) => {
        $(".prog-cat").each(function (i) {});
        if (response.includes("success") == true) {
          // $("#baskContainer").html("");
          // $("#baskContainer").load(
          //   window.location.protocol +
          //     "//" +
          //     window.location.host +
          //     window.location.pathname +
          //     "?Screen=BASK #baskContainer",
          //   function () {
          //     $(".loaderContainer").hide();
          //     alert;
  
          //     var element = document.getElementById("baskContainer");
          //   }
          // );
          if ($("#cart_cat_title").attr("data-carouseltype") == "saveforlater") {
            document.getElementById("baskContainer").scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
            // addProductNew();
            // $("#savedforlaterlist").html("");
           
            $(".prog-cat").load(
              window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?Screen=BASK #savedforlaterlist",
              function () {
                $(".loaderContainer").hide();
                // var element = document.getElementById("baskContainer");
                loadProducts(["getsavedcartitems", "savedforlaterlist", ""]);
                basketApp.checkifWineaccoutaddedWine();
              }
            );
  
            // setTimeout(function () {
            //   // $("#baskContainer").load();
            //   // $("#savedforlaterlist").html("");
              
            // }, 1000);
          } else {
            $(".baskcontent").fadeTo("slow", 0.5);
            $(".baskcontent").load(
              window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?Screen=BASK .baskcontent",
              function () {
                $(".loaderContainer").hide();
                $(".baskcontent").fadeTo("slow", 1);
                var element = document.getElementById("baskContainer");
              }
            );
          }
        } else {
          document.getElementById("baskContainer").scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
          addProductNew();
          $(".baskcontent").fadeTo("slow", 0.5);
          $(".baskcontent").load(
            window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?Screen=BASK .baskcontent",
            function () {
              $(".loaderContainer").hide();
              $(".baskcontent").fadeTo("slow", 1);
              var element = document.getElementById("baskContainer");
            }
          );
        }
        if($('.empty-basket-message').html() !== undefined ) {
          if($('.empty-basket-message').html().includes('\nOH NO! It looks like your cart is empty.\n') === true) { location.reload(); }
      }
        $("body").find(".updatedShipping .logo").hide();
        $("body").find(".updatedShipping .load-img").css("display", "flex");
        $(".checkoutSummaryCard").load(
          window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?Screen=BASK .summaryandotherdata",
          function () {
            $(".loaderContainer").hide();
            $(".checkoutSummaryCard").removeClass("hidden");
            var element = document.getElementById("baskContainer");
          }
        );
      });
      $(".loginClick").on("click", function () {
        $("#signinForm").removeClass("displayNone");
        $(".newLoginContainer").removeClass("displayNone");
      });
  
      $(".share-basket-btn").click(() => {
        $.get("/BASK2TEXT.html", (data) => {
          $("#share-basket input[name=url]").val(encodeURIComponent(data));
        });
        $("#share-basket").modal("show");
      });
    });
  
    $("body").on("change", ".drecipeCheck", function (e) {
      let checkb_len = parseInt($(".drecipeCheck").length);
      let checkedcheck_len = parseInt($(".drecipeCheck:checked").length);
      e.preventDefault();
      let url =
        "/ajax.html?CustomerAction=saveAllowSubstitutions&product_id=" +
        $(this).attr("data-code");
      $.get(url, (response) => {});
      if (checkb_len == checkedcheck_len) {
        $(".dcheckAll").prop("checked", true);
      } else {
        $(".dcheckAll").prop("checked", false);
      }
    });
  
    $("body").on("change", ".mrecipeCheck", function (e) {
      let checkb_len = parseInt($(".mrecipeCheck").length);
      let checkedcheck_len = parseInt($(".mrecipeCheck:checked").length);
      e.preventDefault();
      let url =
        "/ajax.html?CustomerAction=saveAllowSubstitutions&product_id=" +
        $(this).attr("data-code");
      $.get(url, (response) => {});
      if (checkb_len == checkedcheck_len) {
        $(".mCheckAll").prop("checked", true);
      } else {
        $(".mCheckAll").prop("checked", false);
      }
    });
  });
  
  if ($(".baskcount").text() == 0) {
    $(".baskbrandnote").hide();
  } else {
    $(".baskbrandnote").show();
  }
  
  var CartThreebietoCart = function (element) {
    $(element).val();
    var qty = parseInt($(element).attr("data-qty"));
    var addqty = parseInt(
      $(".cartforms-" + $(element).attr("data-cartproductcode"))
        .find('input[name="Quantity"]')
        .val()
    );
    var add = qty + addqty;
    console.log("the qty is " + add);
    $(".cartforms-" + $(element).attr("data-cartproductcode"))
      .find('input[name="Quantity"]')
      .val(add);
    var sign = "+";
    changeBasketQty(element, sign);
  };
  
  function removeCoupon(element) {
    let dataPost = $("#removeCouponform" + element).serialize();
    console.log(dataPost);
    setTimeout(function () {
      jQuery.ajax({
        url: "/coupon-ajax.html?CustomerAction=RemoveCoupon",
        type: "POST",
        showLoader: true,
        data: dataPost,
        cache: false,
        beforeSend: function () {
          $(".loaderContainer").show();
          $(".btnApply").addClass("adding");
        },
        success: function (data) {
          $(".btnApply").removeClass("adding");
          $(".loaderContainer").hide();
          location.reload();
          $(".couponDisclaimer").show();
          if (data.trim().search(/class="errormessageshow"/i) != -1) {
            $(".error-message")
              .text($(data).filter(".errormessageshow").text())
              .show();
            setTimeout(function () {
              $(".discountcodeinput").val("");
              $(".applyDisc .error-message").hide();
            }, 5000);
            return false;
          } else {
            $(".showdiscounts").show();
            getCreditfeeSummary();
            $(".error-message")
              .text($(data).filter(".successmessageshow").text())
              .show();
          }
        },
      });
    }, 1000);
  }
  
  function WholesaluserDiscount() {
    let url = "/ajax.html?CustomerAction=getbasketcharges&displayType=raw";
    $.get(url, (response) => {
      var discount = $(response).filter("#sidebarcart-DISCOUNT").html();
      $(".wholesaleDiscount").html(discount);
      $(".wholesaleDiscount")
        .find(".col-sm-6")
        .addClass("col-sm-9 col-lg-9 txt-orange bold-ft");
      $(".wholesaleDiscount")
        .find(".col-sm-9")
        .removeClass("col-sm-6 col-lg-6 col-xs-6");
      $(".wholesaleDiscount").find(".col-sm-9").css("padding", "2px");
      $("#OrderSummaryShipping").removeClass("col-sm-6 col-lg-6 col-xs-6");
      $("#OrderSummaryShipping").addClass("col-sm-3 col-lg-3 txt-orange bold-ft");
      $("#OrderSummaryShipping").css("padding", "2px");
  
      if (screen.width < 1180) {
        $(".wholesaleDiscountMobile").html(discount);
        $(".wholesaleDiscountMobile")
          .find(".col-sm-6")
          .addClass("col-sm-9 col-xs-9 txt-orange bold-ft txt-left");
        $(".wholesaleDiscountMobile")
          .find(".col-sm-9")
          .removeClass("col-sm-6 col-lg-6 col-xs-6");
        $("#OrderSummaryShipping").addClass(
          "col-sm-3 col-xs-3 col-lg-3 col-md-3 txt-orange bold-ft"
        );
      }
    });
  }
  WholesaluserDiscount();
  
  /*to remove error-message after applying discount */
  setTimeout(function () {
    $(".desktop-error-message").html("");
  }, 2500);
  
  // $( ".product-row" ).each(function() {    })
  function cartEmpty() {
    var counter = 0;
    $(".product-row:visible").each(function () {
      counter++;
    });
    if (counter < 1) {
      $("#baskContainer").css("visibility", "hidden");
      location.reload();
    }
  }
  
  setTimeout(function () {
    if (setWholesaleuser == 1) {
      removeCouponsWhenLogin();
      /*$('.basket-page-quantity-update-form').submit();*/
      WholesaluserDiscount();
  if($('.basket-total').html().split('$')[1] > 0){
      //updateCartDetails();
  }
    }
  }, 5000);
  
  function updateCartDetails() {
    $.get("/ajax.html?CustomerAction=getbasketcharges", function (data) {
      var basketDataGet = JSON.parse(data);
      for (var key in basketDataGet) {
        if (key.includes("BasketTotal")) {
          $(".basket-total span,#mobTotal,.totalamounts").text(
            basketDataGet[key]
          );
          if (retailcounter > 0) {
          } else {
            $(".formatted_total").text(basketDataGet[key]);
            BasketDiscount();
          }
        }
      }
    });
  }
  function GetFreeshippingInfoold() {
    var shipfirstname = $("#shipfname").val();
    var shiplastname = $("#shiplname").val();
    var shipemail = $("#shipemail").val();
  
    var shipphone = $("#shipphone").val();
    var shipaddr1 = $("#shipaddr1").val();
  
    var shipcity = $("#shipcity").val();
    var shipstate = $("#shipbaskstate").val();
    var shipcntry = $("#shipcntry").val();
    var shipzip = $("#shipzip").val();
  
    jQuery.ajax({
      url:
        "/?subaction=fetch_shipping_details&Action=ORDR&Screen=OUSL&Store_Code=G&ShipFirstName=" +
        shipfirstname +
        "&ShipLastName=" +
        shiplastname +
        "&shipemail=" +
        shipemail +
        "&ShipPhone=" +
        shipphone +
        "&ShipAddress1=" +
        shipaddr1 +
        "&ShipCity=" +
        shipcity +
        "&ShipStateSelect=" +
        shipstate +
        "&ShipCountry=" +
        shipcntry +
        "&ShipZip=" +
        shipzip,
      type: "POST",
      showLoader: true,
      dataType: "json",
      cache: false,
      beforeSend: function () {},
      success: function (data) {
        if (
          data.length > 1 &&
          data[1].typeofshipping == "hd" &&
          data[0].typeofshipping == "frp"
        ) {
          $(".showFreeShipping").html(
            "You've got <b>FREE HOME DELIVERY</b> and <b>FLAT RATE SHIPPING</b> for this address"
          );
          $(".fam-Container").show();
        } else if (data[0].typeofshipping == "frp") {
          $(".showFreeShipping").html(
            "You've got <b>FLAT RATE SHIPPING</b> for this address"
          );
          $(".fam-Container").show();
        } else if (data[0].typeofshipping == "hd") {
          $(".showFreeShipping").html(
            "You've got <b>FREE HOME DELIVERY</b> for this address"
          );
          $(".fam-Container").show();
        } else {
          // alert();
          // $(".showFreeShipping").html(
          //     "You're earning <b>VIP Rewards!</b>"
          //   );
          //   $(".fam-Container").show();
  
          $(".showFreeShipping").html("");
          $(".fam-Container").hide("");
          $(".basicshowimg").show();
          $(".fam-main").hide();
        }
  
        //    $(".showFreeShipping").html(data);
      },
    });
  }
  
  function loadCheckoutmessage() {
    jQuery.ajax({
      url: "/Merchant5/merchant.mvc?Screen=BASK",
      type: "POST",
      type: "POST",
      showLoader: true,
      dataType: "html",
      cache: false,
      beforeSend: function () {},
      success: function (data) {
        $(".detailsAlign").html($(data).find("#checkout-message").html());
        // getBasketProductPriceUpdate();
      },
    });
  }
  
  // clearcart code starts from here
  var isBasketDisccount = false;
  $("body").on("click", "#clearcart, #clearcartresponive", function (e) {
    var sessionid = document.getElementById("sessionid").value;
    var customer_id =
      isUserLoggedIn == 1 && setWholesaleuser == 0 ? $("#customerId").val() : 1;
  
    e.preventDefault();
    if (isBasketDisccount == false) {
      var jsonRequest =
        '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"FR_ClearBasketCoupon","customer_session":"' +
        sessionid +
        '","customer_id":"' +
        customer_id +
        '"}';
      $.ajax({
        type: "POST",
        url: "/Merchant5/json.mvc",
        data: jsonRequest,
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function (result) {
          if (result.status == "success") {
            if (isUserLoggedIn == 1 && setWholesaleuser == 0) {
              $(".coupon_code").html(result.coupon);
              $(".coupon_discount").html(
                (result.discount * 100) / 100 + "" + "%"
              );
  
              isBasketDisccount = true;
              $(".couponcode-main").show();
            } else {
              $(".coupon_code").html(result.coupon);
              $(".coupon_discount").html(
                (result.discount * 100) / 100 + "" + "%"
              );
            }
          } else {
            $(".couponcode-main").hide();
            isBasketDisccount = false;
          }
        },
      });
    }
  });
  
  $("body").on("click", ".copy-code", function () {
    // navigator.clipboard.writeText("");
    navigator.clipboard.writeText($(".coupon_code:visible").text());
    $(".show_coupon_copied").show();
    $(".show_coupon_copied").html("Coupon copied to clipboard");
  
    setTimeout(function () {
      $(".show_coupon_copied").hide();
    }, 2000);
  });
  
  // clearcart code ends here
  
  jQuery(document).ready(function ($) {
    //Emptycart retail start
  
    if (isUserLoggedIn == 1 && setWholesaleuser == 0) {
      $("body").on("click", "#trackCoupon", function (e) {
        var sessionid = document.getElementById("sessionid").value;
        var customer_id = $("#customerId").val();
        //
  
        e.preventDefault();
  
        var jsonRequest =
          '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"FR_ClearBasketCoupon","coupon_type":"ecs","customer_session":"' +
          sessionid +
          '","customer_id":"' +
          customer_id +
          '" }';
        $.ajax({
          type: "POST",
          url: "/Merchant5/json.mvc",
          data: jsonRequest,
          contentType: "application/json",
          dataType: "json",
          async: false,
          success: function (result) {
            console.log(result);
          },
        });
      });
    }
  
    //Emptycart retail end
  
    loadProducts(["getsavedcartitems", "savedforlaterlist", ""]);
    $("body").on("click", "#trackCoupon", function (e) {
        if(urlpath === 'https://www.foodrelated.com' || urlpath === 'https://foodrelated.com'){
          dataLayer.push({
            'event': 'emptyCart'
          });
          console.log(dataLayer);
        }
    });
  });
  function loadgiftboxs() {
    $(".gift-box-carousel").owlCarousel({
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
  
  function getShippingandotherFees() {
    var url = "/ajax.html?CustomerAction=getbasketcharges";
    $.get(url, (response) => {
      var responses = JSON.parse(response);
      for (var key in responses) {
        if (key.includes("Shipping")) {
          var shipdetail = $(".shippingdetails").text(responses[key]);
          var total = parseFloat($(".totalamount").text().replace(/\$|,/g, ""));
          var totalamount = $(".totalamount").text(
            total + parseFloat(responses[key].replace(/\$|,/g, ""))
          );
        }
        if (key.includes("Sales Tax:")) {
          var stax = $(".salestax").text(responses[key]);
          var total = parseFloat($(".totalamount").text().replace(/\$|,/g, ""));
  
          var charges = parseFloat(responses[key].replace(/\$|,/g, ""));
          var discount = parseFloat(
            $(".coupon-discount").text().replace(/\$|,/g, "")
          );
          var theamtis = total + charges;
          var totalamount = $(".totalamount").text("$" + theamtis.toFixed(2));
        }
      }
    });
  }
  
  // function getBasketProductPriceUpdate() {
  //   const productpricelist = {};
  //   const productcatchweight = {};
  //   const url = '/cudet.html?CustomerAction=frproductprice';
  
  //   $('.totalamt').each(function() {
  //     const productcode = $(this).attr('data-product-code');
  //     const price = $(this).attr('data-product-price');
  //     const catchweight = $(this).attr('data-product-catchweight');
  //     productpricelist[productcode] = parseFloat(price).toFixed(2);
  //     productcatchweight[productcode] = catchweight;
  //     productpricelist.push({'catchweight': catchweight});
  //   });
  
  //   $.ajax({
  //     url: url,
  //     success: function(response) {
  //       const newPrices = response.data;
  
  //       newPrices.forEach(item => {
  //         const productCode = Object.keys(item)[0];
  //         const newPrice = parseFloat(item[productCode]).toFixed(2);
  //         const currentPrice = parseFloat(productpricelist[productCode]);
  //         console.log(currentPrice);
  //         if (currentPrice && currentPrice !== parseFloat(newPrice)) {
  //           const priceDifference = currentPrice - parseFloat(newPrice);
  //           const percentageDrop = Math.abs((priceDifference / currentPrice) * 100);
          
  //           // Fix precision issues by rounding to two decimal places
  //           const roundedPercentageDrop = Math.round(percentageDrop * 100) / 100;
  //           if(catchweight == 1){
  //             console.log(`Product: ${productCode}, Current Price: $${currentPrice.toFixed(2)}, New Price: $${newPrice}, Price Difference: $${Math.abs(priceDifference).toFixed(2)}`);
  
  //           if ($('.priceslash-'+productCode).is(':visible') !== true) {
  //             $('.oldprice-'+productCode).html('$'+newPrice+`<span class="material-symbols-outlined" style="position: absolute; top: 0rem; font-size: 14px;">info</span>`);
  //           }
  //           }else{
  //           if (roundedPercentageDrop >= 3) {
  //             console.log(`Product: ${productCode}, Current Price: $${currentPrice.toFixed(2)}, New Price: $${newPrice}, Price Dropped by ${roundedPercentageDrop}%`);
  //             console.log(`Product: ${productCode}, Current Price: $${currentPrice.toFixed(2)}, New Price: $${newPrice}, Price Difference: $${Math.abs(priceDifference).toFixed(2)}`);
  
  //           if ($('.priceslash-'+productCode).is(':visible') !== true) {
  //             $('.oldprice-'+productCode).html('$'+newPrice+`<span class="material-symbols-outlined" style="position: absolute; top: 0rem; font-size: 14px;">info</span>`);
  //           }
  //           }
  //         }
            
  //         }
  //       });
  //     }
  //   });
  // }
  
  function getBasketProductPriceUpdate() {
      const productpricelist = {};
      const productcatchweight = {};
      const url = '/cudet.html?CustomerAction=frproductprice';
    
      $('.totalamt').each(function() {
        const productcode = $(this).attr('data-product-code');
        const price = parseFloat($(this).attr('data-product-price')).toFixed(2);
        const catchweight = $(this).attr('data-product-catchweight');
        
        productpricelist[productcode] = price;
        productcatchweight[productcode] = catchweight;
      });
    
      $.ajax({
        url: url,
        success: function(response) {
          const newPrices = response.data;
    
          newPrices.forEach(item => {
          //   const productCode = Object.keys(item)[0];
            const productCode = item.code;
            const newPrice = parseFloat(item.price).toFixed(2);
            const currentPrice = parseFloat(productpricelist[productCode]);
            console.log(item.code);
            console.log(newPrice);
            if (currentPrice && currentPrice !== newPrice) {
              const priceDifference = currentPrice - newPrice;
              const percentageDrop = Math.abs((priceDifference / currentPrice) * 100);
              const roundedPercentageDrop = Math.round(percentageDrop * 100) / 100;
    
              const catchweight = productcatchweight[productCode];
              
              if (catchweight == 1) {
                console.log(`Product: ${productCode}, Current Price: $${currentPrice}, New Price: $${newPrice}, Price Difference: $${Math.abs(priceDifference).toFixed(2)}`);
                
                if (!$('.priceslash-' + productCode).is(':visible')) {
                  $('.oldprice-' + productCode).html('$' + newPrice + `<span class="material-symbols-outlined" style="position: absolute; top: 0rem; font-size: 14px;">info</span>`);
                }
              } else {
                if (roundedPercentageDrop >= 3) {
                  console.log(`Product: ${productCode}, Current Price: $${currentPrice}, New Price: $${newPrice}, Price Dropped by ${roundedPercentageDrop}%`);
                  console.log(`Product: ${productCode}, Current Price: $${currentPrice}, New Price: $${newPrice}, Price Difference: $${Math.abs(priceDifference).toFixed(2)}`);
                  
                  if (!$('.priceslash-' + productCode).is(':visible')) {
                    $('.oldprice-' + productCode).html('$' + newPrice + `<span class="material-symbols-outlined" style="position: absolute; top: 0rem; font-size: 14px;">info</span>`);
                  }
                }
              }
            }
          });
        }
      });
    }
    $(window).on('load', function() {
      if($('.userState').val() == 'TX') {
      basketApp.checkifWineaccoutaddedWine();
      }
    });