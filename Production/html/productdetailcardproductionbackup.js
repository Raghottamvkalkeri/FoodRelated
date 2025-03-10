function addProductNew() {
    let element = $('input[name="productcode"]');
    for (var i = 0; i < element.length; i++) {
        let popupid = $('input[name="productcode"]').eq(i).val();
        if (getPageCode == "CTGY-NEW" || getPageCode == "newproductcard" || getPageCode == "CTGY" || getPageCode == "SRCH" || getPageCode == "deli-grid" || getPageCode == "SFNT" || getPageCode == "BASK" || getPageCode == "MSHIP" || getPageCode == "PROD" || getPageCode == "ShelfLP" || getPageCode == "ordguide" || getPageCode == "featured-items" || getPageCode == "ORDHN" || getPageCode == "ORDHNMobile" || getPageCode == "ORDHNMOBILE" || getPageCode == "WISH" || getPageCode == "blogmain") {
            if (popupid) {
                newshowpriceperlbonload(popupid);
            }
        } else {
            if (popupid) {
                newshowpriceperlbonload(popupid);
                showpriceperlbonload(popupid);
            }
        }

        /*getThreebieDiscountonload(popupid);*/
        checkthreebiecounter();
        checkSlacCounter();
        checkDealsflag(popupid);
        $(".ProductDetail-" + popupid).find(".dropdown-menu li a").click(function () {
            $(this).find(".data-min").each(function () {
                var threebieDiscount = $(this).attr("data-threebie");
                var threebieqty = $(this).attr("data-threebieqty");
                var slacDiscount = $(this).attr("data-slacdiscount");
                var slacDiscountvalue = $(this).attr("data-slacdiscountamt");
                var threebieMarketDiscount = $(this).attr("data-market-threebie");
                var variantinventory = $(this).attr("data-variantinventory");
                var checkdealflag = $(this).attr("data-checkdealflag");
                var getDatastock = $(this).attr("data-stock");
                var maindatastock = $(".ProductDetail-" + popupid).find(".form-check-input").attr("data-stock");
                var qtyincarts = $(this).attr("data-incart");
                var isSaleFlagEnabled = $(this).attr("data-isflag-enabled");
                if (isSaleFlagEnabled == "1") {
                    isFlaEnabled(1, popupid);
                } else {
                    isFlaEnabled(0, popupid);
                }
                setTimeout(function () {
                    // console.log(popupid + ': ' + threebieMarketDiscount + ':' + maindatastock);
                    if (threebieMarketDiscount == "Yes" && maindatastock > 0) {
                        checkthreebiecounter();
                        checkSlacCounter();
                        if ($(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtn").is(":visible") == true) { } else {
                            $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtn").show();
                        }
                        $(".ProductDetail-" + popupid).find(".Threeebielogo").show();
                        $(".main-prod-cards-" + popupid).find(".threebiesavingsimg").show();
                        $(".pop-out-wrap-" + popupid).find(".Threeebielogo").show();

                        if (screen.width > 767) {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").show();
                            $(".productThreebieimg-" + popupid + " img").hide();
                        } else {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").hide();
                            $(".productThreebieimg-" + popupid + " img").show();
                        }

                        if ($("#showproductmodal" + popupid).is(":visible") && maindatastock > 0) {
                            MarketThreebiePopup(threebieMarketDiscount, popupid);
                            checkforMarketPopupThreebieElegible(popupid, qtyincarts);
                            resetProductQuantity();
                        } else {
                            checkforMarketThreebieElegible(popupid, qtyincarts);
                            $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find(".threebieproductpopupbtn").hide();
                        }
                    } else if (threebieqty == "Yes" && maindatastock > 0) {
                        checkthreebiecounter();
                        checkSlacCounter();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtnnew").show();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtn").hide();
                        $(".ProductDetail-" + popupid + ":visible").find(".addtocart-container").hide();
                        // $(".ProductDetail-" + popupid).find('.slaclogo').hide();
                        $(".ProductDetail-" + popupid).find(".slaclogo");
                        $(".ProductDetail-" + popupid).find(".Threeebielogo").show();
                        $(".main-prod-cards-" + popupid).find(".threebiesavingsimg").show();
                        $(".pop-out-wrap-" + popupid).find(".Threeebielogo").show();
                        if (screen.width > 767) {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").show();
                            $(".productThreebieimg-" + popupid + " img").hide();
                        } else {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").hide();
                            $(".productThreebieimg-" + popupid + " img").show();
                        }
                        var qtyincart1 = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycartcheck");
                        var qtyincart2 = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycart");
                        if (qtyincart1 > 0) {
                            qtyincart = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycartcheck");
                        } else {
                            qtyincart = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycart");
                        }
                    } else if (threebieDiscount == "Yes") {
                        checkthreebiecounter();
                        checkSlacCounter();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtn").show();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtnnew").hide();
                        $(".ProductDetail-" + popupid + ":visible").find(".addtocart-container").show();
                        $(".ProductDetail-" + popupid).find(".Threeebielogo").show();
                        // $(".ProductDetail-" + popupid).find('.slaclogo').hide();
                        $(".ProductDetail-" + popupid).find(".slaclogo");
                        $(".main-prod-cards-" + popupid).find(".threebiesavingsimg").show();
                        $(".pop-out-wrap-" + popupid).find(".Threeebielogo").show();
                        if (screen.width > 767) {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").show();
                            $(".productThreebieimg-" + popupid + " img").hide();
                        } else {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").hide();
                            $(".productThreebieimg-" + popupid + " img").show();
                        }
                        /*var qtyincart = $(".ProductDetail-" + popupid).find('.QtyVal').attr('data-qtycart');*/
                        var qtyincart1 = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycartcheck");
                        var qtyincart2 = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycart");
                        if (qtyincart1 > 0) {
                            qtyincart = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycartcheck");
                        } else {
                            qtyincart = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycart");
                        }
                        if (maindatastock > 0 && variantinventory > 2) {
                            checkforThreebieElegible(popupid, qtyincart);
                        }
                        // resetProductQuantity();
                    } else if (slacDiscount == "Yes") {
                        checkSlacCounter();
                        $(".main-prod-cards-" + popupid).find(".slacdiscount").text("Save " + slacDiscountvalue);
                        $(".ProductDetail-" + popupid + ":visible").find(".addtocart-container").show();
                        $(".ProductDetail-" + popupid).find(".threebieproductbtn").hide();
                        $(".ProductDetail-" + popupid).find(".slaclogo").show();
                        $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find(".threebieproductpopupbtn").hide();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtnnew").hide();
                        $(".ProductDetail-" + popupid).find(".Threeebielogo").hide();
                        checkDealsflag(popupid);
                    } else {
                        $(".ProductDetail-" + popupid).find(".threebieproductbtn").hide();
                        $(".ProductDetail-" + popupid + ":visible").find(".addtocart-container").show();
                        $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find(".threebieproductpopupbtn").hide();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtnnew").hide();
                        /*$(".ProductDetail-" + popupid)
                  .find(".Threeebielogo")
                  .hide();
                $(".ProductDetail-" + popupid)
                  .find(".slaclogo")
                  .hide();*/
                        $(".ProductDetail-" + popupid).find(".slaclogo");
                        //$('.main-prod-cards-' + popupid).find('.threebiesavingsimg').show();
                        $(".productThreebieimg-" + popupid + " img").hide();
                        $(".pop-out-wrap-" + popupid).find(".Threeebielogo").hide();
                        $(".main-prod-cards-" + popupid).find(".slacdiscount").text("Save Upto 20");
                        if ($("#showproductmodal" + popupid).is(":visible") && maindatastock > 0) {
                            MarketThreebiePopup(threebieMarketDiscount, popupid);
                        }
                    }
                }, 100);
            });
        });

        $(".ProductDetail-" + popupid).find(".dropdown-menu li a").click(function () {
            $(".deliproductDisplay").find(".owl-wrapper").css({
                "padding-bottom": "24px",
            });

            if ($(".ProductDetail-" + popupid).find(".dropdown-menu li a").length === 1) {
                $(".caret ." + popupid).addClass("displayNone");
                $(".ProductDetail-" + popupid).find(".dLabel1").html($(this).html() + '<span  class="caret ' + popupid + '" ></span>');
            } else {
                $(".ProductDetail-" + popupid).find(".dLabel1").html($(this).html() + '<span  class="caret ' + popupid + '" style="display: block;"></span>');
            }
            let radiocheck = $(this).find("input[type=radio]");
            let prodCode = $(radiocheck).val();
            let dataMin = $(radiocheck).attr("data-min");
            // let data_stock = parseInt($(radiocheck).attr("data-stock"));
            let data_stock = parseInt($(radiocheck).attr("data-stock-raw"));
            let notes = $(radiocheck).attr("data-notes") ? $(radiocheck).attr("data-notes") : "";
            let customerType = $(radiocheck).attr("data-customer");
            let selected_pcode = [prodCode];

            /* Check Data Stock */

            $(".ProductDetail-" + popupid).find(".inputBox").addClass("displayNone");
            if (data_stock > 0) {
                $(".ProductDetail-" + popupid).find(".addtocartbtn").removeClass("displayNone");
                $(".ProductDetail-" + popupid).find(".addbtn").removeClass("displayNone");
                $(".ProductDetail-" + popupid).find(".form-check-input").find(".QtyVal").attr("data-qtycart", 0);
                $(".ProductDetail-" + popupid).find(".productcardbtn").removeClass("displayNone");
                $(".ProductDetail-" + popupid).find(".addtocartbtn").text("Add");
                $(".ProductDetail-" + popupid).find(".out-of-stock-new,.soldoutmessage").css("display", "none");
                $(".ProductDetail-" + popupid).find(".addtocart-container").closest(".row").show();
                var dataminqty = jQuery(this).find(".form-check-input").attr("data-minqty");
                if (dataminqty < 1 || dataminqty == null) {
                    dataminqty = 1;
                }
                $(".ProductDetail-" + popupid).find("[name=Quantity").attr("data-added", dataminqty);
                $(".ProductDetail-" + popupid).find("[name=Quantity").val(dataminqty);
                $(".ProductDetail-" + popupid).find(".QtyVal").val(dataminqty);
            } else {
                $(".ProductDetail-" + popupid).find(".addtocartbtn").addClass("displayNone");
                $(".ProductDetail-" + popupid).find(".addbtn").addClass("displayNone");
                $(".ProductDetail-" + popupid).find(".addbtn").removeClass("visibleformobile");
                $(".ProductDetail-" + popupid).find(".rimgss").css("filter", "grayscale(1)");
                $(".ProductDetail-" + popupid).find(".out-of-stock-new,.soldoutmessage").css("display", "flex");

                $(".ProductDetail-" + popupid).find(".addtocart-container").closest(".row").hide();
                $(".ProductDetail-" + popupid).find(".upbutton").addClass("displayNone");
                $(".ProductDetail-" + popupid).find(".threebieproductbtn").hide();
            }
            $(".ProductDetail-" + popupid).find("input[type=radio]").attr("checked", false);
            $(".ProductDetail-" + popupid).find(`input[data-id=${prodCode}-option]`).attr("checked", true);
            $(".ProductDetail-" + popupid).find('input[name="Action"]').val("ADPR");
            $(".ProductDetail-" + popupid).find('input[name="Basket_Group"]').val("");

            /* Check If Already Added */
            if ($(radiocheck).attr("data-added") && data_stock > 0) {
                $(".ProductDetail-" + popupid).find(".addtocartbtn").addClass("displayNone");
                /*$(".ProductDetail-" + popupid).find('.addbtn').addClass("displayNone");*/
                $(".ProductDetail-" + popupid).find(".inputBox").removeClass("displayNone");
            }

            /* Discount Solution  10/11/2021 */

            var saleFlag = $(".ProductDetail-" + popupid).find(".saleItemFlag").length;
            var greatDeals = $(radiocheck).attr("data-greatdeals");
            var productBox = $(".ProductDetail-" + popupid);
            var salePrice = parseFloat($(radiocheck).attr("data-saleprice").replace(/[^\d\.]/g, ""));
            var saleBasePrice = parseFloat($(radiocheck).attr("data-salebaseprice").replace(/[^\d\.]/g, ""));
            var salePriceF = $(radiocheck).attr("data-saleprice");
            var saleBasePriceF = $(radiocheck).attr("data-salebaseprice");
            var isSaleFlagEnabled = $(radiocheck).attr("data-flag");
            var checkSalePrice = saleBasePrice > salePrice ? 1 : 0;
            var pack_size = 9999;
            productBox.find(".savePackDisplay").text("").css("visibility", "hidden");

            if (customerType == "Retail" || customerType == "Wholesale") {
                /* Show Case/Pack Discount */
                if (prodCode.indexOf("-CS") > -1 || prodCode.indexOf("-PK") > -1) {
                    if (saleFlag < 1 && greatDeals < 1 && checkSalePrice < 1) {
                        productBox.find(".savePackDisplay").html(productBox.find(".savepack").first().text()).css("visibility", "visible");
                        productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                        $(".wholesalediscountnote").html(notes);
                    }
                }
            }

            /* Display Retail Discount Start */
            /*if (customerType == 'Retail') {
                if (notes.trim()) {
                    productBox.find('.savePackDisplay').html(notes).css('visibility', 'visible');
                }
  
            } else {
                if (notes.trim()) {
                    productBox.find('.allPrice .Sale').hide();
                    productBox.find('.allPrice .price').html(salePriceF);
                    productBox.find('.savePackDisplay').html(notes).css('visibility', 'visible');
                    if(saleBasePrice > salePrice)
                    {
                        productBox.find('.allPrice .Sale').html(salePriceF).show();
                        productBox.find('.allPrice .price').html('<s>'+saleBasePriceF+'</s>');
                    }
                }
            }*/

            /* Display Retail Discount Start */
            if (customerType == "Retail") {
                /* if (notes.trim()) {
                    productBox.find('.savePackDisplay').html(notes).css('visibility', 'visible');
                } */

                if (notes.trim()) {
                    if (isSaleFlagEnabled == "Sale" && checkSalePrice < 1) {
                        productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                    } else {
                        if (prodCode.indexOf("-CS") > -1 || prodCode.indexOf("-PK") > -1) {
                            productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                            $(".wholesalediscountnote").html(notes);
                        } else if (notes != "") {
                            productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                            $(".wholesalediscountnote").html(notes);
                        }
                    }
                }
            } else {
                if (notes.trim()) {
                    if (isSaleFlagEnabled == "Sale" && checkSalePrice < 1) {
                        productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                    } else {
                        if ((isSaleFlagEnabled != "Sale" && prodCode.indexOf("-CS") > -1) || prodCode.indexOf("-PK") > -1) {
                            productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                            $(".wholesalediscountnote").html(notes);
                        } else if (notes != "") {
                            productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                            $(".wholesalediscountnote").html(notes);
                        }
                    }
                    /*if(saleBasePrice > salePrice)
                    {
                        productBox.find('.allPrice .Sale').html(salePriceF).show();
                        productBox.find('.allPrice .price').html('<s>'+saleBasePriceF+'</s>');
                    }*/
                }
            }

            /* Sale Price Group Discount Flag Start*/

            if (jQuery("body").hasClass("PROD")) {
                $("#prodContents").find(".image-container .product-zoom-image-wrapper").find(".wholesaleFlag").remove();
                $("#prodContents").find(".image-container .product-zoom-image-wrapper").find(".flag-wrapper").remove();
                if ($("#prodContents").find(".form-check-input").attr("data-customer") == "Wholesale" && $("#prodContents").find(".form-check-input").attr("data-flag") == "Sale") {
                    $("#prodContents").find(".image-container .product-zoom-image-wrapper").append('<div class="flag-wrapper wholesaleFlag" style="position:absolute;z-index:99;top:15px;right:0%"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive sale-flag noborder"></div>');
                } else if ($("#prodContents").find(".form-check-input").attr("data-customer") == "Wholesale" && $("#prodContents").find(".form-check-input").attr("data-flag") == "Saleoffer") {
                    console.log("sale 1");
                    $("#prodContents").find(".image-container .product-zoom-image-wrapper").append('<div class="flag-wrapper wholesaleFlag" style="position:absolute;z-index:99;top:15px;right:0%"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive sale-flag noborder"></div>');
                }

                productBox.find(".product-detail-wrapper .flags").find(".wholesaleFlag").remove();
                if (productBox.find(".form-check-input").attr("data-customer") == "Wholesale" && productBox.find(".form-check-input").attr("data-flag") == "Sale") {
                    productBox.find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
                } else if (productBox.find(".form-check-input").attr("data-customer") == "Wholesale" && productBox.find(".form-check-input").attr("data-flag") == "Saleoffer") {
                    productBox.find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
                }
            } else {
                productBox.find(".product-detail-wrapper").find(".wholesaleFlag").remove();
                if (productBox.find(".form-check-input").attr("data-customer") == "Wholesale" && productBox.find(".form-check-input").attr("data-flag") == "Sale") {
                    productBox.find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
                } else if (productBox.find(".form-check-input").attr("data-customer") == "Wholesale" && productBox.find(".form-check-input").attr("data-flag") == "Saleoffer") {
                    productBox.find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
                }
            }

            /* Sale Price Group Discount Flag Start*/

            /* To Check Weather there is Threebie Discount or Not */
        });

        if ($(".ProductDetail-" + popupid).find(".dropdown-menu li a").hasClass("defaultClass")) {

            $(".ProductDetail-" + popupid).find(".dropdown-menu li .defaultClass").click();
        }
    }

    if ($(".account-wrapper").hasClass('active') === true) {
        $(this).addClass('active');
    }

}

$(document).on("ready", function () {
    //addProductNew();
    // CheckBasketItems();
    basketApp.CheckBasketItemss();
    jQuery("body").on("click", ".dropdown-item", function () {
        if (parseInt(jQuery(this).find(".form-check-input").attr("data-stock-raw")) > 0) {
            if (jQuery(this).find(".form-check-input").attr("data-added") > 0 && jQuery(this).find(".form-check-input").attr("data-product_code")) {
                if (jQuery(this).find(".form-check-input").attr("data-basket-group")) {
                    $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find('input[name="Action"]').val("QTYG");
                }
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find('input[name="Basket_Group"]').val(jQuery(this).find(".form-check-input").attr("data-basket-group"));
                /* $(".ProductDetail-" + jQuery(this).find('.form-check-input').attr('data-product_code')).find('.updatetocartbtn').text(jQuery(this).find('.form-check-input').attr('data-added') + " Added"); */
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".updatetocartbtn").prop("contenteditable", true);
                var input = jQuery('<input class="hiddenInput">');
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".updatetocartbtn").append(input);
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".updatetocartbtn").text(jQuery(this).find(".form-check-input").attr("data-added") + " ");
                /*$(".ProductDetail-" + jQuery(this).find('.form-check-input').attr('data-product_code')).find('.QtyVal').val(jQuery(this).find('.form-check-input').attr('data-added') + " ");*/
            } else {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find('input[name="Action"]').val("ADPR");
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find('input[name="Basket_Group"]').val();
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".inputBox").addClass("displayNone");
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".addtocartbtn").removeClass("displayNone");
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".addbtn").removeClass("displayNone");
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".QtyVal").attr("data-qtycart", 0);
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".productcardbtn").removeClass("displayNone");
                /*$(".ProductDetail-" + jQuery(this).find('.form-check-input').attr('data-product_code')).find('.QtyVal').val(1);*/
                var dataminqty = jQuery(this).find(".form-check-input").attr("data-minqty");
                if (dataminqty < 1 || dataminqty == null) {
                    dataminqty = 1;
                }
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find("[name=Quantity").attr("data-added", dataminqty);
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find("[name=Quantity").val(dataminqty);
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".QtyVal").val(dataminqty);
                /*$(".ProductDetail-" + jQuery(this).find('.form-check-input').attr('data-product_code')).find('.threebieproductbtn').hide();*/
                /*$(".ProductDetail-" + jQuery(this).find('.form-check-input').attr('data-product_code')).find('.QtyVal').attr('data-qtycart', 1);*/
            }
        } else {
            $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".inputBox").addClass("displayNone");
            $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".addtocartbtn").addClass("displayNone");
            $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".addbtn").addClass("displayNone");
            $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".addbtn").removeClass("visibleformobile");
        }

        /* Sale Price Group Discount Flag Start */
        if (jQuery("body").hasClass("PROD")) {
            $("#prodContents").find(".image-container .product-zoom-image-wrapper").find(".wholesaleFlag").remove();
            $("#prodContents").find(".image-container .product-zoom-image-wrapper").find(".flag-wrapper").remove();
            if ($("#prodContents").find(".form-check-input").attr("data-customer") == "Wholesale" && $("#prodContents").find(".form-check-input").attr("data-flag") == "Sale") {
                $("#prodContents").find(".image-container .product-zoom-image-wrapper").append('<div class="flag-wrapper wholesaleFlag" style="position:absolute;z-index:99;top:15px;right:0%"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive sale-flag noborder"></div>');
            } else if ($("#prodContents").find(".form-check-input").attr("data-customer") == "Wholesale" && $("#prodContents").find(".form-check-input").attr("data-flag") == "Saleoffer") {
                console.log("sale 1");
                $("#prodContents").find(".image-container .product-zoom-image-wrapper").append('<div class="flag-wrapper wholesaleFlag" style="position:absolute;z-index:99;top:15px;right:0%"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive sale-flag noborder"></div>');
            }

            if ($("#prodContents").find(".form-check-input").attr("data-customer") == "Retail" && $("#prodContents").find(".form-check-input").attr("data-flag") == "Sale") {
                $("#prodContents").find(".image-container .product-zoom-image-wrapper").append('<div class="flag-wrapper " style="position:absolute;z-index:99;top:15px;right:0%"><img src="graphics/00000001/3/SaleFlag.png" alt="" class="flag img-responsive sale-flag noborder"></div>');
            } else if ($("#prodContents").find(".form-check-input").attr("data-customer") == "Retail" && $("#prodContents").find(".form-check-input").attr("data-flag") == "Saleoffer") {
                $("#prodContents").find(".image-container .product-zoom-image-wrapper").append('<div class="flag-wrapper " style="position:absolute;z-index:99;top:15px;right:0%"><img src="graphics/00000001/3/SaleFlag.png" alt="" class="flag img-responsive sale-flag noborder"></div>');
            } else if ($("#prodContents").find(".form-check-input").attr("data-customer") == "Retail" && $("#prodContents").find(".form-check-input").attr("data-flag") == "vipsale") {
                $("#prodContents").find(".image-container .product-zoom-image-wrapper").append('<div class="flag-wrapper " style="position:absolute;z-index:99;top:15px;right:0%"><img src="graphics/00000001/3/VIP-FlagIcon.png" alt="" class="flag img-responsive sale-flag noborder"></div>');
            }

            $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").find(".wholesaleFlag").remove();
            $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").find(".flag-wrapper").remove();
            if ($(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-customer") == "Wholesale" && $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-flag") == "Sale") {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
            } else if ($(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-customer") == "Wholesale" && $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-flag") == "Saleoffer") {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
            }

            if ($(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-customer") == "Retail" && $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-flag") == "Sale") {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper "><img src="graphics/00000001/3/SaleFlag.png" alt="" class="flag img-responsive  "/></div>');
            } else if ($(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-customer") == "Retail" && $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-flag") == "Saleoffer") {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper "><img src="graphics/00000001/3/SaleFlag.png" alt="" class="flag img-responsive  "/></div>');
            } else if ($(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-customer") == "Retail" && $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-flag") == "vipsale") {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper "><img src="graphics/00000001/3/VIP-FlagIcon.png" alt="" class="flag img-responsive  "/></div>');
            }
        } else {
            $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").find(".wholesaleFlag").remove();
            $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").find(".flag-wrapper").remove();
            if ($(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-customer") == "Wholesale" && $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-flag") == "Sale") {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
            } else if ($(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-customer") == "Wholesale" && $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-flag") == "Saleoffer") {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
            }

            if ($(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-customer") == "Retail" && $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-flag") == "Sale") {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper "><img src="graphics/00000001/3/SaleFlag.png" alt="" class="flag img-responsive  "/></div>');
            } else if ($(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-customer") == "Retail" && $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-flag") == "Saleoffer") {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper "><img src="graphics/00000001/3/SaleFlag.png" alt="" class="flag img-responsive  "/></div>');
            } else if ($(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-customer") == "Retail" && $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".form-check-input").attr("data-flag") == "vipsale") {
                $(".ProductDetail-" + jQuery(this).find(".form-check-input").attr("data-product_code")).find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper "><img src="graphics/00000001/3/VIP-FlagIcon.png" alt="" class="flag img-responsive  "/></div>');
            }
        }
        /* Sale Price Group Discount Flag End*/
    });
});

function CheckBasketItems() {
    $.getJSON("/GLOBALBASK_JSON.html", function (data) {
        if (data.groups.length) {
            $.each(data.groups, function (i, item) {
                var popupid = item.code;
                var selected_group = item.code;
                var radiocheck = $('input[value="' + popupid + '"]');
                popupidparent = $(radiocheck).attr("data-parent");
                /*additional check for qty when user make changes form minicart*/
                $(".checkpcode-" + popupid).find(".data-min").attr("data-incart", item.quantity);
                $(".ProductDetail-" + popupidparent).find(".QtyVal").attr("data-qtycartcheck", item.quantity);
                var dataqtyincart = $(".ProductDetail-" + popupidparent).find(".QtyVal").attr("data-qtycart");

                /*additional check for qty when user make changes form minicart*/
                if ($(radiocheck).attr("data-parent") != "" && $(radiocheck).attr("data-parent") != undefined)
                    popupid = $(radiocheck).attr("data-parent");
                else
                    var radiocheck = $('.form-check-dropdown input[value="' + popupid + '"]');
                let prodCode = $(radiocheck).val();
                let dataMin = $(radiocheck).attr("data-min");
                let data_stock = parseInt($(radiocheck).attr("data-stock"));
                let notes = $(radiocheck).attr("data-notes");

                if (data_stock > 0) {
                    //$('.ProductDetail-' + popupid).find('.inputBox').addClass("displayNone");
                    $(".checkpcode-" + popupid).find(".data-min").attr("data-incart", item.quantity);
                    $(".ProductDetail-" + popupid).find('input[value="' + item.code + '"').attr("data-incart", item.quantity);
                    $(".ProductDetail-" + popupid).find('input[value="' + item.code + '"').attr("data-added", item.quantity);
                    $(".ProductDetail-" + popupid).find('input[value="' + item.code + '"').attr("data-basket-group", item.group_id);
                    /*$('.ProductDetail-' + popupid).find('input[name="Quantity"]').val(item.quantity);*/
                    //$('.ProductDetail-' + popupid).find('input[type=radio]').attr("checked", false);
                    //$('.ProductDetail-' + popupid).find(`input[data-id=${prodCode}-option]`).attr("checked", true);

                    $(".ProductDetail-" + popupid).find(".out-of-stock-new,.soldoutmessage").css("display", "none");
                    if ($(radiocheck).attr("data-added") && $(radiocheck).is(":checked")) {
                        $(".ProductDetail-" + popupid).find('input[name="Action"]').val("QTYG");
                        $(".ProductDetail-" + popupid).find('input[name="Basket_Group"]').val(item.group_id);
                        $(".ProductDetail-" + popupid).find(".addtocartbtn").addClass("displayNone");
                        /* $(".ProductDetail-" + popupid).find('.updatetocartbtn').text(item.quantity + " Added"); */
                        /*$(".ProductDetail-" + popupid).find('.QtyVal').val(item.quantity);*/
                        $(".ProductDetail-" + popupid).find(".updatetocartbtn").prop("contenteditable", true).css("display", "inline-block").css("width", "100px").css("white-space", "nowrap").css("cursor", "text").css("height", "100px");
                        /*numbers only for button */
                        $(".ProductDetail-" + popupid).find('[contenteditable="true"]').keypress(function (e) {
                            var x = event.charCode || event.keyCode;
                            if ((isNaN(String.fromCharCode(e.which)) && x != 46) || x === 32 || x === 13 || (x === 46 && event.currentTarget.innerText.includes("."))) {
                                e.preventDefault();
                            }
                            if ($(this).text().length === 4 && event.keyCode != 8) {
                                event.preventDefault();
                            }
                        });
                        /* here i am adding edit button function */

                        function buttonInput(element) {/*var prevQuantity = $(".ProductDetail-" + popupid).find('input[name="Quantity"]').val();
                           var getdataStock = parseInt($(".ProductDetail-" + popupid).find('input[value="' + selected_group + '"').attr('data-stock-raw'));
                           var getText = $(element).text();
                           var addForm = $(element).attr('data-formid');
                           getText.replace(/\s+/g, '');
                           $(element).attr('data-added', getText);
 
 
                           addProductFrom(addForm, "+", '', parseInt(getText));*/
                            /*setTimeout(function() { */
                            /*$(".ProductDetail-" + popupid).find('input[value="' + selected_group + '"').attr('data-stock', parseInt(getdataStock) - parseInt(getText));*/
                            /*}, 2500);*/
                        }

                        $(".ProductDetail-" + popupid + ":visible").find(".updatetocartbtn").bind("keyup", function () {
                            /*$(".ProductDetail-" + popupid).find('.updatetocartbtn').trigger('change');*/
                            buttonInput(this);
                        });
                        var input = jQuery('<input class="hiddenInput">');
                        $(".ProductDetail-" + popupid).find(".updatetocartbtn").append(input);
                        $(".ProductDetail-" + popupid).find(".updatetocartbtn").text(item.quantity + "");
                        $(".ProductDetail-" + popupid).find(".inputBox").removeClass("displayNone");
                    }
                } else {
                    $(".ProductDetail-" + popupid).find(".addtocartbtn").addClass("displayNone");
                    $(".ProductDetail-" + popupid).find(".upbutton").addClass("displayNone");
                    $(".ProductDetail-" + popupid).find(".rimgss").css("filter", "grayscale(1)");
                    $(".ProductDetail-" + popupid).find(".out-of-stock-new,.soldoutmessage").css("display", "flex");

                    $(".ProductDetail-" + popupid).find(".addtocart-container").closest(".row").show();
                    $(".ProductDetail-" + popupid).find(".threebieproductbtn").hide();
                }
            });
        }
    });
}

function setWishlistParamsNew(heart) {
    let id = heart.attr("data-wishlist");
    let prodcode = heart.attr("data-code");
    // let sku=heart.attr('data-sku')
    let sku = heart.parents(".product-item-new").find("input[type=radio]:checked").val();
    let name = heart.parents(".product-item-new").find(".product-name a").text();
    name = $.trim(name);
    let imgSrc = heart.parents(".product-item-new").find(".product-thumbnail img");
    imgSrc = imgSrc.attr("src");

    let variant_option = heart.parents(".product-item-new").find(".selectsize").find(":selected").text();
    variant_option = $.trim(variant_option);
    $("#addProductToWishlist").show();
    $("#addWishlistItem").hide();

    productInfo = {
        code: prodcode,
        sku: sku ? sku : prodcode,
        name: name,
        Option: variant_option,
        imgSrc: imgSrc,
        id: id,
    };
}
/*heart icon*/
window.lastHeart = "";
// $('body').on("click", ".addWishlist", function() {
// alert()
//     let prodcode = $(this).attr('data-code');
//     if ($(this).parents(".product-item-new").length) {
//         if ($(this).parents(".product-item-new").length) {
//             let heart = $(this).parents(".product-item-new").find(".addFav");
//             lastHeart = heart;
//             setWishlistParamsNew(heart);
//             populateWishlistPopup();
//         } else {
//             if ($("body").hasClass("BASK")) {
//                 //For BASK
//                 lastHeart = $(this);
//                 let prodcode = $(this).attr('data-code');
//                 productInfo = {
//                     code: $(this).attr('data-code'),
//                     sku: $(this).attr('data-sku') ? $(this).attr('data-sku') : prodcode,
//                     name: $.trim($(this).parent().find(".item-name").text()),
//                     Option: $.trim($(this).parent().find(".decpr.packsize").text()),
//                     imgSrc: $(this).parent().parent().parent().find(".image-wrapper a img").attr('src'),
//                     id: $(this).attr('data-wishlist')
//                 }
//                 populateWishlistPopup();
//             } else {
//                 lastHeart = $(this);
//                 populateWishlistPopup();
//             }
//         }
//     } else if ($(this).closest(".product-information-wrapper").length) {
//         lastHeart = $(this);
//         let prodcode = $(this).attr('data-code');
//         productInfo = {
//             code: $(this).attr('data-code'),
//             sku: $("#main-prod-card input[type=radio]:checked").val() || prodcode,
//             name: $(this).attr('data-name'),
//             Option: "",
//             imgSrc: $('.main-product-image').attr('src'),
//             id: $(this).attr('data-wishlist')
//         }
//         populateWishlistPopup();
//     }
//     /*code relevant to prod page*/
//     else {
// alert();
//         let variant_option = $('.' + prodcode + '-prodcont').find('#wishlistattr').val();
//         var prodsku = $(this).attr('data-sku') ? $(this).attr('data-sku') : prodcode;
//         let imgSrc = $('.' + prodcode + '-prodcont').find('.product-thumbnail .img-responsive').attr('src');
//         let name = $('.' + prodcode + '-prodcont').find('.product-thumbnail .img-responsive').attr('alt');
//         let id = "";
//         productInfo = {
//             code: $(this).attr('data-code'),
//             sku: prodsku,
//             name: name,
//             Option: variant_option,
//             imgSrc: imgSrc,
//             id: id
//         };
//         $('#addProductToWishlist').show();
//         $('#wishListPop').modal('show');

//         var frmdata = $('.' + prodcode + '-fatc').serialize().replace('ADPR', 'ATWL');
//         $('#addToWishList').attr('action', $('#addToWishList').attr('action') + frmdata);

//     }
// });

$(".addWishlist").onclick = function () {
    var sessionid = document.getElementById("sessionid").value;
    alert();
    var customerType = document.querySelector(".customertype").value;
    var productCode = $(this).attr("data-code");
    var jsonRequest = 'FR_AddUpdateWishList","customer_session":' + sessionid + ',"customer_type":' + customerType + ',"wishlist_title":"API Test","wishlist_notes":"Testing","wishlist_shared":1,"wishlist_product_code":' + productCode + ',"wishlist_product_quantity":"1"}';
    $.ajax({
        type: "POST",
        url: "/Merchant5/json.mvc",
        dataType: "json",
        data: jsonRequest,
        contentType: "application/json",
        dataType: "json",
        success: function (result) { },
    });
}
    ;

var addProductFrom = function addProductFrom(addForm, sign, prevQuantity = null, inputQty = null) {
    var parent_item = sessionStorage.getItem("parent_item");
    var prodCode = $(`#${addForm}`).find("input[type=radio]:checked").val();
    var prodQty = $(`#${addForm}`).find("input[type=radio]:checked").attr("data-added") ? $(`#${addForm}`).find("input[type=radio]:checked").attr("data-added") : 0;
    if (sign == "-")
        var prodQtyNew = parseInt(prodQty) - 1;
    else
        var prodQtyNew = parseInt(prodQty) + 1;

    if (inputQty)
        var prodQtyNew = inputQty;

    var prodId = $(`#${addForm}`).find("input[type=radio]:checked").attr("data-id");
    var qtySize = parseInt($(`#${addForm}`).find("input[type=radio]:checked").attr("data-min"));
    var parentprodcode = $(`#${addForm}`).find("input[type=radio]:checked").attr("data-product_code");
    var buyBotton = $(".ProductDetail-" + parentprodcode).find(".addbtn");
    basketApp.loadBasket();
    $(".ProductDetail-" + parentprodcode).find(".QtyVal").val(1);
    var addForm = $(`#${addForm}`);

    try {/*if (fbq) {
           fbq('track', 'AddToCart', {
               content_name: $("#baskgdpopup .product-information-wrapper h1").text(),
               content_ids: [prodCode],
               quantity: prodQty,
               content_type: 'product'
           });
       }*/
    } catch (e) { } finally { }

    /*$(buyBotton).text("Adding");*/
    $(buyBotton).addClass("adding");
    $(".ProductDetail-" + parentprodcode).find(".threebieproductbtnnew").addClass("adding");
    $(buyBotton).html('<img src="graphics/00000001/3/loading_2.gif" width="15" height="15">');
    $("body").find("#global-mini-basket-wrapper").addClass("global-mini-basket-wrapper-adding");
    if (screen.width < 767) { } else {
        $("body").find(".basket-total").css("color", "#fff");
    }
    var selected_pcode = [prodCode];
    if ($($(addForm)[0]).find('input[name="Action"]').val() == "ADPR")
        /*prodQtyNew = 1;*/
        prodQtyNew = $($(addForm)[0]).find('input[name="Quantity"]').val();
    else {
        prodQtyNew = parseInt($($(addForm)[0]).find('input[name="Quantity"]').val()) + parseInt($(".ProductDetail-" + parentprodcode).find(".QtyVal").attr("data-qtycart"));
    }
    $($(addForm)[0]).find('input[name="Quantity"]').val(prodQtyNew);
    var formData = $($(addForm)[0]).serialize();
    $.post("merchant.mvc", formData).done(function (responseData) {
        if (responseData && responseData.basket_count) {
            //we ask for the basktet json
            basketApp.basket = responseData;
            $(".basket-count").text(responseData.basket_count);

            $.get("/ajax.html?CustomerAction=getbasketcharges", function (data) {
                var basketDataGet = JSON.parse(data);
                for (var key in basketDataGet) {
                    if (key.includes("BasketSubTotal")) {
                        $(".basket-total span").text(basketDataGet[key]);
                    }
                }
            });

            var selected_group = responseData.groups.filter(({ code }) => selected_pcode.includes(code));
            if (selected_group.length > 0) {
                $(".ProductDetail-" + parentprodcode).find(".updatetocartbtn").attr("data-added", selected_group[0]["quantity"]);
                $(".ProductDetail-" + parentprodcode).find('input[value="' + selected_group[0]["code"] + '"').attr("data-added", selected_group[0]["quantity"]);
                /* $(".ProductDetail-" + parentprodcode).find('.updatetocartbtn').text(selected_group[0]["quantity"] + " Added"); */
                $(".ProductDetail-" + parentprodcode).find(".updatetocartbtn").prop("contenteditable", true);
                var input = jQuery('<input class="hiddenInput">');
                var getThreebievalue = $(".ProductDetail-" + parentprodcode).find(".prodcodecheck-" + prodCode).attr("data-threebie");
                var getMarketThreebievalue = $(".ProductDetail-" + parentprodcode).find(".prodcodecheck-" + prodCode).attr("data-market-threebie");
                $(".ProductDetail-" + parentprodcode).find(".updatetocartbtn").append(input);
                $(".ProductDetail-" + parentprodcode).find(".updatetocartbtn").text(selected_group[0]["quantity"] + " ");
                $(".ProductDetail-" + parentprodcode).find(".addtocartbtn").addClass("displayNone");
                $(".ProductDetail-" + parentprodcode).find('input[name="Basket_Group"]').val(selected_group[0]["group_id"]);
                $(".ProductDetail-" + parentprodcode).find('input[value="' + selected_group[0]["code"] + '"').attr("data-basket-group", selected_group[0]["group_id"]);
                $(".ProductDetail-" + parentprodcode).find('input[name="Quantity"]').val(selected_group[0]["quantity"]);
                console.log(012);
                parseInt($(".ProductDetail-" + parentprodcode).find(".QtyVal").attr("data-qtycart", selected_group[0]["quantity"]));
                parseInt($(".ProductDetail-" + parentprodcode).find(".QtyVal").attr("data-qtycartcheck", selected_group[0]["quantity"]));
                $(".checkpcode-" + prodCode).find(".data-min").attr("data-incart", selected_group[0]["quantity"]);
                qtyincartcheck = selected_group[0]["quantity"];
                checkforThreebieElegible(parentprodcode, qtyincartcheck);
                checkforMarketThreebieElegible(parentprodcode, qtyincartcheck);
                resetProductQuantity();
                if ($("#showproductmodal" + parentprodcode).is(":visible")) {
                    checkforMarketPopupThreebieElegible(parentprodcode, qtyincartcheck);
                    resetProductQuantity();
                }

                /*if(selected_group[0]["quantity"] == 1){
                    $(".ProductDetail-" + parentprodcode).find('.threebieproductbtn').html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add 2, Save 10% </div>').css('background-color','#00594e');
                }
               else if(selected_group[0]["quantity"] < 3){
                    $(".ProductDetail-" + parentprodcode).find('.threebieproductbtn').html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add 1, Save 10% </div>').css('background-color','#00594e');
                }
                else{
                    $(".ProductDetail-" + parentprodcode).find('.threebieproductbtn').html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css('background-color','#ffc841');  
                }*/
                $(".ProductDetail-" + parentprodcode).find('input[name="Quantity"]').val(1);
            } else {
                setTimeout(function () {
                    $(".ProductDetail-" + parentprodcode).find('input[value="' + prodCode + '"]').attr("data-added", 0);
                    $(".ProductDetail-" + parentprodcode).find(".QtyVal").val(1);
                    $(".ProductDetail-" + parentprodcode).find('input[name="Action"]').val("ADPR");
                    $(".ProductDetail-" + parentprodcode).find('input[name="Basket_Group"]').val();
                    $(".ProductDetail-" + parentprodcode).find(".inputBox").addClass("displayNone");
                    $(".ProductDetail-" + parentprodcode).find(".addtocartbtn").removeClass("displayNone");
                    $(".ProductDetail-" + parentprodcode).find(".addbtn").removeClass("displayNone");
                    $(".ProductDetail-" + parentprodcode).find(".form-check-input").find(".QtyVal").attr("data-qtycart", 0);
                    $(".ProductDetail-" + parentprodcode).find(".addbtn").removeClass("productcardbtn");
                    console.log(123);
                }, 100);
            }
        } else {
            if ($(responseData).find("#basket-contents").length) {
                //we are in the bask page
                $("#basket-contents").html($(responseData).find("#basket-contents").html());
            }
            setTimeout(function () {
                $(".ProductDetail-" + parentprodcode).find('input[value="' + prodCode + '"]').attr("data-added", 0);
                $(".ProductDetail-" + parentprodcode).find(".QtyVal").val(1);
                $(".ProductDetail-" + parentprodcode).find('input[name="Action"]').val("ADPR");
                $(".ProductDetail-" + parentprodcode).find('input[name="Basket_Group"]').val();
                $(".ProductDetail-" + parentprodcode).find(".inputBox").addClass("displayNone");
                $(".ProductDetail-" + parentprodcode).find(".addtocartbtn").removeClass("displayNone");
                $(".ProductDetail-" + parentprodcode).find(".addtocartbtn").removeClass("addbtn");
                $(".ProductDetail-" + parentprodcode).find(".addtocartbtn").removeClass("productcardbtn");
                console.log(123);
            }, 100);

            basketApp.loadBasket();
        }

        if ($("body").hasClass("BASK")) {
            $.post("merchant.mvc?screen=BASK").done(function (responseData) {
                if ($(responseData).find("#basket-contents").length) {
                    //we are in the bask page
                    $("#basket-contents").html($(responseData).find("#basket-contents").html());
                    $(".updatedShipping").html($(responseData).find(".updatedShipping").html());

                    if ($(responseData).find(".is_empty").val() == "1") {
                        $(".mobile-share").css({
                            "margin-left": "1rem",
                        });
                        $(".clearshopingcart ").hide();
                        $(".estimate-shipping-modal-calculate-button").prop("disabled", true);
                        $(".dchillMsg").css({
                            display: "none",
                        });
                    } else {
                        $(".clearshopingcart ").show();
                        $(".mobile-share").css({
                            "margin-left": "-4rem",
                        });
                        $(".estimate-shipping-modal-calculate-button").prop("disabled", false);
                        $(".dchillMsg").css({
                            display: "block",
                        });
                    }
                    var inventaory_count = $(".inventoryCnt").val();
                    if (inventaory_count) {
                        $(".btn-checkout").addClass("btn-grey");
                        $(".checkoutbutton").css({
                            "background-color": "grey !important",
                            "pointer-events": "none",
                        });
                    }
                    //                    if($('input[name="SpecialShipping"]').val() == '1'){
                    //                        $('.dchillMsg').css({"display":"block"});
                    //                    }else{
                    //                        $('.dchillMsg').css({"display":"none"});
                    //                    }
                }

                basketApp.loadBasket();
            });
        }

        // reducing the inventory at parent level start
        if ($("input[data-product_code=" + parentprodcode + "][type=radio]").length) {
            $(".ProductDetail-" + parentprodcode).find(`input[data-id=${prodId}]`).attr("checked", true);
            if (sign === "+") {/*$("input[data-product_code=" + parentprodcode + "][type=radio]").attr("data-stock", parseInt($("input[value=" + prodCode + "][type=radio]").attr("data-stock")) - (qtySize));*/
            } else {
                if (parseInt(prevQuantity) > 1) {
                    $("input[data-product_code=" + parentprodcode + "][type=radio]").attr("data-stock", parseInt($("input[value=" + prodCode + "][type=radio]").attr("data-stock")) + qtySize);
                }
            }
        }
        // reducing the inventory at parent level end

        setTimeout(function () {
            //  $(buyBotton).text(prevText); // Show legend of QTY in cart

            refreshItemsOnBasket();
            basketApp.loadBasket();
            $(buyBotton).removeClass("adding");
            $(".ProductDetail-" + parentprodcode).find(".threebieproductbtnnew").removeClass("adding");
            if (screen.width < 768) {
                $(buyBotton).html('<i class="fa fa-shopping-cart ft-14p" aria-hidden="true"></i>');
            } else {
                $(buyBotton).html("Add");
            }

            $("body").find("#global-mini-basket-wrapper").removeClass("global-mini-basket-wrapper-adding");
            $("body").find(".basket-total").css("color", "#628e83");
        }, 500);

        if (parseInt(prodQty) < 1 && sign === "-") {
            $(`${parent_item}`).find("#addSubstitution" + parentprodcode).removeClass("displayNone");
            $(".ProductDetail-" + parentprodcode).find(".addtocartbtn").removeClass("displayNone");
            $(".ProductDetail-" + parentprodcode).find(".addbtn").removeClass("displayNone");
            $(".ProductDetail-" + parentprodcode).find(".form-check-input").find(".QtyVal").attr("data-qtycart", 0);
            $(".ProductDetail-" + parentprodcode).find(".productcardbtn").removeClass("displayNone");
            $(".ProductDetail-" + parentprodcode).find(".addtocartbtn").text("Add");
            $(".ProductDetail-" + parentprodcode).find(".QtyVal").val("0");

            $(".ProductDetail-" + parentprodcode).find(".inputBox").addClass("displayNone");
            $(".ProductDetail-" + parentprodcode).find(".priceloop").addClass("displayNone");
            $(".ProductDetail-" + parentprodcode).find('input[name="Action"]').val("ADPR");
            $(".ProductDetail-" + parentprodcode).find('input[name="Basket_Group"]').val("");
            $(".ProductDetail-" + parentprodcode).find('input[name="Quantity"]').val(1);
        } else {
            $(".ProductDetail-" + parentprodcode).find(".inputBox").removeClass("displayNone");
            $(".ProductDetail-" + parentprodcode).find(".addtocartbtn").addClass("displayNone");
            $(".ProductDetail-" + parentprodcode).find(".priceloop").removeClass("displayNone");

            $(".ProductDetail-" + parentprodcode).find('input[name="Action"]').val("QTYG");
        }

        // Added Google Tag Manager to get product details do not remove
        if (urlpath === 'https://foodrelated.com' || urlpath === 'https://www.foodrelated.com') {
            // var items = [];
            let itemss = responseData.items
                .filter(item => item.product.code.includes(parentprodcode))
                .map(item => item);
            var brand = itemss[0].link;
            if (brand.split('-by')[1] === undefined || brand.split('-by')[1] == '') {
                brand = '';
            } else {
                brand = brand.split('-by')[1].replaceAll('-', ' ').replace('.html', '');
            }
            var items = [
                {
                    item_id: itemss[0].sku,
                    item_name: itemss[0].name,
                    item_brand: brand,
                    item_variant: itemss[0].code,
                    price: itemss[0].formatted_price,
                    quantity: itemss[0].quantity
                }
            ];

            console.log(items);



            dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
            dataLayer.push({
                event: "add_to_cart",
                ecommerce: {
                    currency: "USD",
                    value: itemss[0].formatted_subtotal,
                    items,
                }
            });

            console.log(dataLayer)
            // Added Google Tag Manager to get product details do not remove

        } else {
            let itemss = responseData.items
                .filter(item => item.product.code.includes(parentprodcode))
                .map(item => item);
            var brand = itemss[0].link;
            if (brand.split('-by')[1] === undefined || brand.split('-by')[1] == '') {
                brand = '';
            } else {
                brand.split('-by')[1].replaceAll('-', ' ').replace('.html', '');
            }
            var items = [
                {
                    item_id: itemss[0].sku,
                    item_name: itemss[0].name,
                    item_brand: brand,
                    item_variant: itemss[0].code,
                    price: itemss[0].formatted_base_price,
                    quantity: itemss[0].quantity
                }
            ];

            console.log(items);
        }


    });
    $("#shipping-estimate-modal").on("hidden.bs.modal", function (e) {
        $(".estimate-shipping-modal-calculate-button").prop("disabled", false);
    });

    $("body").find(".baskcount").text(1);
};

var timer_id = setTimeout(function () { }, 1);

var addProductDetail = function (formId) {
    var dispalyUOM = [];
    var availableStock = [];
    var addForm = $("#" + formId);
    var parent_item = sessionStorage.getItem("parent_item");
    var targetInput = $(`#${formId}`).find("input[type=radio]:checked");
    var totalQntyAvailable = parseInt($.trim($(targetInput).attr("data-stock")));
    var qtySize = parseInt($.trim($(targetInput).attr("data-min")));
    var errorMsg = "Sorry, we do not have enough quantity to fulfill your order. Please adjust the quantity and try again.<br>";
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);
    var selected = $(`#${formId}`).find("input[type=radio]:is(:checked)");
    var notselected = $(`#${formId}`).find("input[type=radio]:not(:checked)");

    var getProductCode = formId;
    getProductCode = getProductCode.replace("addProduct-", "");

    var NewMinQty = [];
    var NewMinQtyNew = "";
    var ShowUOM = "";
    var showDisplay = "";
    /*if (notselected) {
        var ShowUOM = $(addForm).find('.dropdown-item .form-check-label .uom_name').eq(0).text();
        $(notselected).each(function() {
            availableStock = totalQntyAvailable;
        });
        //showDisplay = dispalyUOM.unshift(ShowUOM);
    }
  
    if (selected) {
        ShowUOM = $(addForm).find('.dropdown-item .form-check-label .uom_name').eq(1).text();
        $(selected).each(function() {});
        //showDisplay = dispalyUOM.unshift(ShowUOM + ' - ' + availableStock);
    }*/

    var getNewUOm = [];
    var CheckUOM = [];
    var CheckUOMS = [];
    $(".ProductDetail-" + getProductCode + ":visible .dropdown-menu .data-min").each(function () {
        NewMinQtyNew = $(this).val();
        availableStock = Math.floor(totalQntyAvailable / NewMinQtyNew);

        if (CheckUOMS.includes(availableStock)) {
            getNewUOm = $(this).attr("data-newuom");
        } else {
            getNewUOm = $(this).attr("data-newuom");
            CheckUOMS.push(availableStock);
            NewMinQty.push(NewMinQtyNew);
        }

        if (CheckUOM.includes(getNewUOm)) {//Skip
            //console.log(CheckUOM.includes(getNewUOm));
        } else {
            CheckUOM.push(getNewUOm);
            if (getNewUOm != "") {
                showDisplay = dispalyUOM.unshift(getNewUOm + " - " + availableStock);
            }
        }
    });

    $(".ProductDetail-" + getProductCode + ":visible .data-min").each(function () {
        NewMinQtyNew = $(this).val();
        availableStock = Math.floor(totalQntyAvailable / NewMinQtyNew);
        if (isNaN(availableStock)) {
            availableStock = 0;
        }

        if (CheckUOMS.includes(availableStock)) {
            getNewUOm = $(this).attr("data-newuom");
        } else {
            getNewUOm = $(this).attr("data-newuom");
            CheckUOMS.push(availableStock);
            NewMinQty.push(NewMinQtyNew);
        }

        if (CheckUOM.includes(getNewUOm)) {//Skip
            //console.log(CheckUOM.includes(getNewUOm));
        } else {
            CheckUOM.push(getNewUOm);

            showDisplay = dispalyUOM.unshift(getNewUOm + " - " + availableStock);
        }
    });

    var isStandalone = $(addForm).find(".dropdown-item .form-check-label .isstandalone").text();
    if (isStandalone == "1") {
        if (notselected) {
            var ShowUOM = $(addForm).find(".dropdown-item .form-check-label .uom_name").eq(0).text();
            $(notselected).each(function () {
                availableStock = remaingQnty;
            });
        }
    } else { }

    /*availableStock = $(targetInput).attr('data-stock'); */

    /* Inventory Check  */
    var getdataStock = parseInt($(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-stock"));

    var qtyinCart = parseInt($(".ProductDetail-" + getProductCode).find(".QtyVal").attr("data-qtycart"));

    var getnewQTY = $(".ProductDetail-" + getProductCode).find("[name=Quantity").val();

    var checkStockRequired = Math.floor(getnewQTY * qtySize);

    /*var dataStockcheck = (parseInt(getdataStock) - parseInt(newqtyinCart)) - parseInt(getnewQTY);*/

    if (getdataStock >= checkStockRequired) {
        addProductFrom(formId, "+");
        var dataStockcheck = parseInt(getdataStock) - parseInt(qtyinCart) - parseInt(getnewQTY) * qtySize;
        if (dataStockcheck < 0) {
            dataStockcheck = 0;
        }
        $(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-stock", dataStockcheck);
    } else {
        showDisplay = dispalyUOM.toString().replace(/,/g, "<br>");
        $("#new_globalerrorpopup .gpoperror").html(errorMsg + "  <br/> <p>Quantity Available:</p>  " + showDisplay);
        $("#new_globalerrorpopup").modal("show");
        var dataStock = parseInt(getdataStock) - parseInt(qtyinCart);
        if (dataStock < 0) {
            dataStock = 0;
        }
        /*$(".ProductDetail-" + getProductCode).find('.form-check-input').attr('data-stock', dataStock);*/
        $(".ProductDetail-" + getProductCode).find(".QtyVal").val("1");
        $(".ProductDetail-" + getProductCode).find('input[name="Quantity"]').val(1);
        $(".ProductDetail-" + getProductCode).find("[name=Quantity").attr("data-added", 1);
        $(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-added", 1);

        return false;
    }

    /* Inventory Check */
};

var addThreebieProductDetail = function (formId) {
    var dispalyUOM = [];
    var availableStock = [];
    var addForm = $("#" + formId);
    var parent_item = sessionStorage.getItem("parent_item");
    var targetInput = $(`#${formId}`).find("input[type=radio]:checked");
    var totalQntyAvailable = parseInt($.trim($(targetInput).attr("data-stock")));
    var qtySize = parseInt($.trim($(targetInput).attr("data-min")));
    var errorMsg = "Sorry, we do not have enough quantity to fulfill your order.\r\nPlease adjust the quantity and try again.";
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);
    var selected = $(`#${formId}`).find("input[type=radio]:is(:checked)");
    var notselected = $(`#${formId}`).find("input[type=radio]:not(:checked)");

    var getProductCode = formId;
    getProductCode = getProductCode.replace("addProduct-", "");

    var NewMinQty = [];
    var NewMinQtyNew = "";
    var ShowUOM = "";
    var showDisplay = "";

    var getNewUOm = [];
    var CheckUOM = [];
    var CheckUOMS = [];
    $(".ProductDetail-" + getProductCode + ":visible .dropdown-menu .data-min").each(function () {
        NewMinQtyNew = $(this).val();
        availableStock = Math.floor(totalQntyAvailable / NewMinQtyNew);

        if (CheckUOMS.includes(availableStock)) {
            getNewUOm = $(this).attr("data-newuom");
        } else {
            getNewUOm = $(this).attr("data-newuom");
            CheckUOMS.push(availableStock);
            NewMinQty.push(NewMinQtyNew);
        }

        if (CheckUOM.includes(getNewUOm)) {//Skip
            //console.log(CheckUOM.includes(getNewUOm));
        } else {
            CheckUOM.push(getNewUOm);
            if (getNewUOm != "") {
                showDisplay = dispalyUOM.unshift(getNewUOm + " - " + availableStock);
            }
        }
    });

    $(".ProductDetail-" + getProductCode + ":visible  .data-min").each(function () {
        NewMinQtyNew = $(this).val();
        availableStock = Math.floor(totalQntyAvailable / NewMinQtyNew);

        if (CheckUOMS.includes(availableStock)) {
            getNewUOm = $(this).attr("data-newuom");
        } else {
            getNewUOm = $(this).attr("data-newuom");
            CheckUOMS.push(availableStock);
            NewMinQty.push(NewMinQtyNew);
        }

        if (CheckUOM.includes(getNewUOm)) {//Skip
            //console.log(CheckUOM.includes(getNewUOm));
        } else {
            CheckUOM.push(getNewUOm);
            showDisplay = dispalyUOM.unshift(getNewUOm + " - " + availableStock);
        }
    });

    var isStandalone = $(addForm).find(".dropdown-item .form-check-label .isstandalone").text();
    if (isStandalone == "1") {
        if (notselected) {
            var ShowUOM = $(addForm).find(".dropdown-item .form-check-label .uom_name").eq(0).text();
            $(notselected).each(function () {
                availableStock = remaingQnty;
            });
        }
    } else { }

    /*availableStock = $(targetInput).attr('data-stock'); */

    /* Inventory Check  */
    var getdataStock = parseInt($(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-stock"));

    var qtyinCart = parseInt($(".ProductDetail-" + getProductCode).find(".QtyVal").attr("data-qtycart"));

    var getnewQTY = $(".ProductDetail-" + getProductCode).find("[name=Quantity").val();

    var checkStockRequired = Math.floor(getnewQTY * qtySize);

    /*var dataStockcheck = (parseInt(getdataStock) - parseInt(newqtyinCart)) - parseInt(getnewQTY);*/

    if (getdataStock >= checkStockRequired) {
        $(".ProductDetail-" + getProductCode).find('input[name="Quantity"]').val(3);
        checkforThreebieElegible(getProductCode, qtyinCart);
        checkforMarketThreebieElegible(getProductCode, qtyinCart);
        resetProductQuantity();
        if ($("#showproductmodal" + getProductCode).is(":visible")) {
            checkforMarketPopupThreebieElegible(getProductCode, qtyinCart);
            resetProductQuantity();
        }
        setTimeout(function () {
            addProductFrom(formId, "+");
        }, 1000);
        var dataStockcheck = parseInt(getdataStock) - parseInt(qtyinCart) - parseInt(getnewQTY) * qtySize;
        if (dataStockcheck < 0) {
            dataStockcheck = 0;
        }
        $(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-stock", dataStockcheck);
    } else {
        showDisplay = dispalyUOM.toString().replace(/,/g, "<br>");
        $("#new_globalerrorpopup .gpoperror").html(errorMsg + "  \r\n  <p>Quantity Available:</p>  " + showDisplay);
        $("#new_globalerrorpopup").modal("show");
        var dataStock = parseInt(getdataStock) - parseInt(qtyinCart);
        if (dataStock < 0) {
            dataStock = 0;
        }
        /*$(".ProductDetail-" + getProductCode).find('.form-check-input').attr('data-stock', dataStock);*/
        $(".ProductDetail-" + getProductCode).find(".QtyVal").val("1");
        $(".ProductDetail-" + getProductCode).find('input[name="Quantity"]').val(1);
        $(".ProductDetail-" + getProductCode).find("[name=Quantity").attr("data-added", 1);
        $(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-added", 1);

        return false;
    }

    /* Inventory Check */
};

var addThreebieProductDetailtocart = function (formId) {
    var dispalyUOM = [];
    var availableStock = [];
    var addForm = $("#" + formId);
    var parent_item = sessionStorage.getItem("parent_item");
    var targetInput = $(`#${formId}`).find("input[type=radio]:checked");
    var totalQntyAvailable = parseInt($.trim($(targetInput).attr("data-stock")));
    var qtySize = parseInt($.trim($(targetInput).attr("data-min")));
    var errorMsg = "Sorry, we do not have enough quantity to fulfill your order.\r\nPlease adjust the quantity and try again.";
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);
    var selected = $(`#${formId}`).find("input[type=radio]:is(:checked)");
    var notselected = $(`#${formId}`).find("input[type=radio]:not(:checked)");

    var getProductCode = formId;
    getProductCode = getProductCode.replace("addProduct-", "");

    var NewMinQty = [];
    var NewMinQtyNew = "";
    var ShowUOM = "";
    var showDisplay = "";

    var getNewUOm = [];
    var CheckUOM = [];
    var CheckUOMS = [];
    $(".ProductDetail-" + getProductCode + ":visible .dropdown-menu .data-min").each(function () {
        NewMinQtyNew = $(this).val();
        availableStock = Math.floor(totalQntyAvailable / NewMinQtyNew);

        if (CheckUOMS.includes(availableStock)) {
            getNewUOm = $(this).attr("data-newuom");
        } else {
            getNewUOm = $(this).attr("data-newuom");
            CheckUOMS.push(availableStock);
            NewMinQty.push(NewMinQtyNew);
        }

        if (CheckUOM.includes(getNewUOm)) {//Skip
            //console.log(CheckUOM.includes(getNewUOm));
        } else {
            CheckUOM.push(getNewUOm);
            showDisplay = dispalyUOM.unshift(getNewUOm + " - " + availableStock);
        }
    });

    $(".ProductDetail-" + getProductCode + ":visible  .data-min").each(function () {
        NewMinQtyNew = $(this).val();
        availableStock = Math.floor(totalQntyAvailable / NewMinQtyNew);

        if (CheckUOMS.includes(availableStock)) {
            getNewUOm = $(this).attr("data-newuom");
        } else {
            getNewUOm = $(this).attr("data-newuom");
            CheckUOMS.push(availableStock);
            NewMinQty.push(NewMinQtyNew);
        }

        if (CheckUOM.includes(getNewUOm)) {//Skip
            //console.log(CheckUOM.includes(getNewUOm));
        } else {
            CheckUOM.push(getNewUOm);
            showDisplay = dispalyUOM.unshift(getNewUOm + " - " + availableStock);
        }
    });

    var isStandalone = $(addForm).find(".mainproductcard .form-check-label .isstandalone").text();
    if (isStandalone == "1") {
        if (notselected) {
            var ShowUOM = $(addForm).find(".mainproductcard .form-check-label .uom_name").eq(0).text();
            $(notselected).each(function () {
                availableStock = remaingQnty;
            });
        }
    } else { }

    /*availableStock = $(targetInput).attr('data-stock'); */

    /* Inventory Check  */
    var getdataStock = parseInt($(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-stock"));

    var qtyinCart = parseInt($(".ProductDetail-" + getProductCode).find(".QtyVal").attr("data-qtycart"));

    var getnewQTY = $(".ProductDetail-" + getProductCode).find("[name=Quantity").val();

    var checkStockRequired = Math.floor(getnewQTY * qtySize);

    /*var dataStockcheck = (parseInt(getdataStock) - parseInt(newqtyinCart)) - parseInt(getnewQTY);*/

    if (getdataStock >= checkStockRequired) {
        $(".ProductDetail-" + getProductCode).find('input[name="Quantity"]').val(3);
        // checkforThreebieElegible(getProductCode, qtyinCart);
        // checkforMarketThreebieElegible(getProductCode, qtyinCart);
        // resetProductQuantity();
        if ($("#showproductmodal" + getProductCode).is(":visible")) {
            checkforMarketPopupThreebieElegible(getProductCode, qtyinCart);
            resetProductQuantity();
        }
        setTimeout(function () {
            addProductFrom(formId, "+");
        }, 1000);
        var dataStockcheck = parseInt(getdataStock) - parseInt(qtyinCart) - parseInt(getnewQTY) * qtySize;
        if (dataStockcheck < 0) {
            dataStockcheck = 0;
        }
        $(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-stock", dataStockcheck);
    } else {
        showDisplay = dispalyUOM.toString().replace(/,/g, "<br>");
        $("#new_globalerrorpopup .gpoperror").html(errorMsg + "  \r\n  <p>Quantity Available:</p>  " + showDisplay);
        $("#new_globalerrorpopup").modal("show");
        var dataStock = parseInt(getdataStock) - parseInt(qtyinCart);
        if (dataStock < 0) {
            dataStock = 0;
        }
        /*$(".ProductDetail-" + getProductCode).find('.form-check-input').attr('data-stock', dataStock);*/
        $(".ProductDetail-" + getProductCode).find(".QtyVal").val("1");
        $(".ProductDetail-" + getProductCode).find('input[name="Quantity"]').val(1);
        $(".ProductDetail-" + getProductCode).find("[name=Quantity").attr("data-added", 1);
        $(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-added", 1);

        return false;
    }

    /* Inventory Check */
};

var addmixandMatchProduct = function (formId) {
    var dispalyUOM = [];
    var availableStock = [];
    var addForm = $("#" + formId);
    var parent_item = sessionStorage.getItem("parent_item");
    var targetInput = $(`#${formId}`).find("input[type=radio]:checked");
    var totalQntyAvailable = parseInt($.trim($(targetInput).attr("data-stock")));
    var qtySize = parseInt($.trim($(targetInput).attr("data-min")));
    var errorMsg = "Sorry, we do not have enough quantity to fulfill your order.";
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);
    var selected = $(`#${formId}`).find("input[type=radio]:is(:checked)");
    var notselected = $(`#${formId}`).find("input[type=radio]:not(:checked)");

    var getProductCode = formId;
    getProductCode = getProductCode.replace("addProduct-", "");

    var NewMinQty = [];
    var NewMinQtyNew = "";
    var ShowUOM = "";
    var showDisplay = "";
    /*if (notselected) {
        var ShowUOM = $(addForm).find('.dropdown-item .form-check-label .uom_name').eq(0).text();
        $(notselected).each(function() {
            availableStock = totalQntyAvailable;
        });
        //showDisplay = dispalyUOM.unshift(ShowUOM);
    }
  
    if (selected) {
        ShowUOM = $(addForm).find('.dropdown-item .form-check-label .uom_name').eq(1).text();
        $(selected).each(function() {});
        //showDisplay = dispalyUOM.unshift(ShowUOM + ' - ' + availableStock);
    }*/

    var getNewUOm = [];
    var CheckUOM = [];
    var CheckUOMS = [];
    $(".ProductDetail-" + getProductCode + ":visible .dropdown-menu .data-min").each(function () {
        NewMinQtyNew = $(this).val();
        availableStock = Math.floor(totalQntyAvailable / NewMinQtyNew);

        if (CheckUOMS.includes(availableStock)) {
            getNewUOm = $(this).attr("data-newuom");
        } else {
            getNewUOm = $(this).attr("data-newuom");
            CheckUOMS.push(availableStock);
            NewMinQty.push(NewMinQtyNew);
        }

        if (CheckUOM.includes(getNewUOm)) {//Skip
            //console.log(CheckUOM.includes(getNewUOm));
        } else {
            CheckUOM.push(getNewUOm);
            showDisplay = dispalyUOM.unshift(getNewUOm + " - " + availableStock);
        }
    });

    var isStandalone = $(addForm).find(".dropdown-item .form-check-label .isstandalone").text();
    if (isStandalone == "1") {
        if (notselected) {
            var ShowUOM = $(addForm).find(".dropdown-item .form-check-label .uom_name").eq(0).text();
            $(notselected).each(function () {
                availableStock = remaingQnty;
            });
        }
    } else { }

    /*availableStock = $(targetInput).attr('data-stock'); */

    /* Inventory Check  */
    var getdataStock = parseInt($(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-stock"));

    var qtyinCart = parseInt($(".ProductDetail-" + getProductCode).find(".QtyVal").attr("data-qtycart"));

    var getnewQTY = $(".ProductDetail-" + getProductCode).find("[name=Quantity").val();

    var checkStockRequired = Math.floor(getnewQTY * qtySize);

    /*var dataStockcheck = (parseInt(getdataStock) - parseInt(newqtyinCart)) - parseInt(getnewQTY);*/

    if (getdataStock >= checkStockRequired) {
        addProductFrom(formId, "+");
        var dataStockcheck = parseInt(getdataStock) - parseInt(qtyinCart) - parseInt(getnewQTY) * qtySize;
        if (dataStockcheck < 0) {
            dataStockcheck = 0;
        }
        $(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-stock", dataStockcheck);
    } else {
        showDisplay = dispalyUOM.toString().replace(/,/g, "<br>");
        //$('#new_globalerrorpopup .gpoperror').html(errorMsg + '  \r\n  <p>Quantity Available:</p>  ' + showDisplay);
        //$('#new_globalerrorpopup').modal('show');
        $(".mixandmatcherror").html(errorMsg);
        var dataStock = parseInt(getdataStock) - parseInt(qtyinCart);
        if (dataStock < 0) {
            dataStock = 0;
        }
        /*$(".ProductDetail-" + getProductCode).find('.form-check-input').attr('data-stock', dataStock);*/
        $(".ProductDetail-" + getProductCode).find(".QtyVal").val("1");
        $(".ProductDetail-" + getProductCode).find('input[name="Quantity"]').val(1);
        $(".ProductDetail-" + getProductCode).find("[name=Quantity").attr("data-added", 1);
        $(".ProductDetail-" + getProductCode).find(".form-check-input").attr("data-added", 1);

        return false;
    }

    /* Inventory Check */
};

var updateProductDetail = function (formId, sign) {
    //var parent_item = sessionStorage.getItem("parent_item");
    var addForm = $("#" + formId);
    //event.preventDefault();
    // var addForm = $('#' + formId)
    var dispalyUOM = [];
    var showDisplay = "";
    var availableStock = "";
    var targetInput = $(addForm).find("input[type=radio]:checked");

    var currentValue = $(addForm).find('input[name="Quantity"]').val();
    var prevQuantity = $(addForm).find('input[name="Quantity"]').val();

    var totalQntyAvailable = parseInt($.trim($(targetInput).attr("data-stock")));
    var qtySize = parseInt($.trim($(targetInput).attr("data-min")));
    var errorMsg = "Sorry, we do not have enough quantity to fulfill your order.\r\nPlease adjust the quantity and try again.";
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);
    var selected = $(`#${formId}`).find("input[type=radio]:is(:checked)");
    var notselected = $(`#${formId}`).find("input[type=radio]:not(:checked)");
    var ShowUOM = $(addForm).find(".dropdown-item .form-check-label .uom_name").eq(0).text();
    if (ShowUOM == "") {
        showDisplay = dispalyUOM.unshift(ShowUOM + 0);
    } else {
        if (notselected) {
            ShowUOM = $(addForm).find(".dropdown-item .form-check-label .uom_name").eq(0).text();
            $(notselected).each(function () {
                availableStock = totalQntyAvailable;
            });
            showDisplay = dispalyUOM.unshift(ShowUOM + " - " + availableStock);
        }

        if (selected) {
            ShowUOM = $(addForm).find(".dropdown-item .form-check-label .uom_name").eq(1).text();
            $(selected).each(function () {
                availableStock = remaingQnty;
            });
            showDisplay = dispalyUOM.unshift(ShowUOM + " - " + availableStock);
        }
    }

    /*});*/

    if (isNaN(currentValue)) {
        currentValue = 1;
    }

    showDisplay = dispalyUOM.toString().replace(/,/g, "<br>");
    if (sign === "+") {
        currentValue++;
        if (qtySize * 1 > totalQntyAvailable) {
            $("#new_globalerrorpopup .gpoperror").html(errorMsg + "  \r\n  <p>Quantity Available:</p>  " + showDisplay);
            $("#new_globalerrorpopup").modal("show");
            return false;
        }
        /*$(targetInput).attr('data-stock', (totalQntyAvailable - (qtySize)));  Disabled By B */
    } else if (sign === "-") {
        // currentValue = currentValue > 2 ? currentValue - 1 : 1;
        currentValue = currentValue > 0 ? currentValue - 1 : 0;
        $(targetInput).attr("data-stock", totalQntyAvailable + qtySize);
    }

    $(addForm).find('input[name="Quantity"]').val(currentValue);

    clearTimeout(timer_id);
    timer_id = setTimeout(function () {
        addProductFrom(formId, sign, prevQuantity);
    }, 500);
};

function getProductInputVal(element, formId) {
    var getProductCode = formId;
    console.log(formId);
    getProductCode = getProductCode.replace("addProduct-", "");
    if ($(element).val() == "" || $(element).val() == "0") {
        $(".ProductDetail-" + getProductCode).find(".addbtn").prop("disabled", true);
    } else if ($(element).val() == "1") {
        $(".ProductDetail-" + getProductCode).find(".addbtn").prop("disabled", false);
    } else {
        $(".ProductDetail-" + getProductCode).find(".addbtn").prop("disabled", false);

        var newvalue = parseInt($(element).val());
        var qtySize = parseInt($(".ProductDetail-" + formId).find(".form-check-input").attr("data-min"));
        //var qtySize = 2;
        var getdataStock = parseInt($(".ProductDetail-" + formId).find(".form-check-input").attr("data-stock-raw"));
        var acttualdataStock = parseInt($(".ProductDetail-" + formId).find(".form-check-input").attr("data-stock-raw"));

        var qtyinCart = parseInt($(".ProductDetail-" + formId).find(".QtyVal").attr("data-qtycart"));
        $(".ProductDetail-" + formId).find("[name=Quantity").attr("data-added", newvalue);
        $(".ProductDetail-" + formId).find("[name=Quantity").val(newvalue);
        $(".ProductDetail-" + formId).find(".form-check-input").attr("data-added", newvalue);

        $(".ProductDetail-" + formId).find(".addbtn").prop("disabled", false);
    }
}

function qtyupdateCheck(qtyboxid, type) {
    let element = $(".ProductDetail-" + qtyboxid + ":visible").find(".QtyVal");
    if (element.val() === NaN || element.val() == "") {
        element.val(0);
    }
    qty = parseInt(element.val());

    if (type == "+") {
        if (qty == 9999) { } else {
            qty = qty + 1;
        }
        element.val(qty);
        $(".ProductDetail-" + qtyboxid).find(".addbtn").prop("disabled", false);
    } else {
        if (type == "-") {
            if (qty == 1 || qty == 0) {
                qty = 1;
                element.val(qty);
            } else {
                qty = qty > 0 ? qty - 1 : 1;
                element.val(qty);
            }
        }
    }

    $(".ProductDetail-" + qtyboxid).find(".form-check-input").attr("data-added", parseInt(qty));
    var getdataStock = parseInt($(".ProductDetail-" + qtyboxid).find(".form-check-input").attr("data-stock-raw"));

    $(".ProductDetail-" + qtyboxid).find("[name=Quantity").attr("data-added", parseInt(qty));
    $(".ProductDetail-" + qtyboxid).find("[name=Quantity").val(parseInt(qty));

    var getText = element.val();
    getText.replace(/\s+/g, "");
    $(element).attr("data-added", getText);

    var getdataStock = parseInt($(".ProductDetail-" + qtyboxid).find(".form-check-input").attr("data-stock-raw"));
    var qtyinCart = parseInt($(".ProductDetail-" + qtyboxid).find(".QtyVal").attr("data-qtycart"));
    $(".ProductDetail-" + qtyboxid).find("[name=Quantity").attr("data-added", getText);
    $(".ProductDetail-" + qtyboxid).find("[name=Quantity").val(getText);
    $(".ProductDetail-" + qtyboxid).find(".form-check-input").attr("data-added", getText);
    var dataStock = parseInt(getdataStock) - parseInt(qtyinCart) - parseInt(getText);
    if (dataStock < 0) {
        dataStock = 0;
    }
}

function checkQtyInCart(formId) {
    var newQty = $(".ProductDetail-" + formId).find(".QtyVal").val();
    var qtyinCart = parseInt($(".ProductDetail-" + formId).find(".QtyVal").attr("data-qtycart"));
    if (newQty == qtyinCart) {
        $(".ProductDetail-" + formId).find(".addbtn").prop("disabled", true);
    } else {
        $(".ProductDetail-" + formId).find(".addbtn").prop("disabled", false);
    }
}
$(document).ready(function () {
    $(".product-zoom-image-wrapper").click(function (e) {
        $(".overflow-hide").removeClass("overflow-hide");
        $("body").addClass("overflow-hide");
        e.stopPropagation();
        //This will stop the event bubbling
    });

    //This event handler will take care of removing the class if you click anywhere else
    $(document).click(function () {
        $(".overflow-hide").removeClass("overflow-hide");
    });
});

function checkforThreebieElegible(popupid, qtyincart) {
    var c = qtyincart;
    if (c == 0) {
        c = 3;
    }
    var showdispay = 0;
    var cartbtn = 0;
    if (c > 3) {
        var crm = c % 3;
        if (crm == 0) {
            showdispay = $(".ProductDetail-" + popupid).find(".threebieproductbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".ProductDetail-" + popupid).find('input[name="Quantity"]').val(3);
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).hide();
            $(".threebiecartbtn" + popupid).hide();
            /* $('.threebmessage').hide();*/
        } else {
            /*console.log('Add '+ (3-crm));*/
            showdispay = $(".ProductDetail-" + popupid).find(".threebieproductbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + (3 - crm) + ", Save 10% </div>").css("background-color", "#00594e");
            $(".ProductDetail-" + popupid).find('input[name="Quantity"]').val(3 - crm);
            $(".forms-" + popupid).find(".threebiecartbtn" + popupid).attr("data-qty", 3 - crm);
            $(".cartforms-" + popupid).find(".threebiebtnincart-" + popupid).attr("data-qty", 3 - crm);
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + (3 - crm) + ", Save 10% </div>").css("background-color", "#00594e");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + (3 - crm) + ", Save 10% </div>").css("background-color", "#00594e");
            if (qtyincart < 3) { }
            $(".threebiebtnincart-" + popupid).show();
            $(".threebiecartbtn" + popupid).show();
            /*$('.threebmessage').show();*/
        }
    } else {
        var crm = 3 - c;
        if (c == 3) {
            /*console.log('threebe eligible');*/
            showdispay = $(".ProductDetail-" + popupid).find(".threebieproductbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).hide();
            $(".threebiecartbtn" + popupid).hide();
            /* $('.threebmessage').hide(); */
        } else {
            /*console.log('Add '+ crm);*/
            $(".ProductDetail-" + popupid).find('input[name="Quantity"]').val(crm);
            $(".forms-" + popupid).find(".threebiecartbtn" + popupid).attr("data-qty", crm);
            $(".cartforms-" + popupid).find(".threebiebtnincart-" + popupid).attr("data-qty", crm);
            showdispay = $(".ProductDetail-" + popupid).find(".threebieproductbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + crm + ", Save 10% </div>").css("background-color", "#00594e");
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + crm + ", Save 10% </div>").css("background-color", "#00594e");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + crm + ", Save 10% </div>").css("background-color", "#00594e");
            if (qtyincart < 3) { }
            $(".threebiebtnincart-" + popupid).show();
            $(".threebiecartbtn" + popupid).show();
            /*$('.threebmessage').show();*/
        }
    }

    if (showdispay == "") {/*console.log(c);*/
    } else {/*console.log(showdispay + ' number ' + c);*/
    }
}

/*market Threebie function */
function checkforMarketThreebieElegible(popupid, qtyincart) {
    var c = qtyincart;
    if (c == 0) {
        c = 3;
    }
    var showdispay = 0;
    var cartbtn = 0;
    if (c > 3) {
        var crm = c % 3;
        if (crm == 0) {
            showdispay = $(".ProductDetail-" + popupid).find(".threebieproductbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".ProductDetail-" + popupid).find('input[name="Quantity"]').val(3);
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).hide();
            $(".threebiecartbtn" + popupid).hide();
            /* $('.threebmessage').hide();*/
        } else {
            /*console.log('Add '+ (3-crm));*/
            showdispay = $(".ProductDetail-" + popupid).find(".threebieproductbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + (3 - crm) + ", Save 10% </div>").css("background-color", "#00594e");
            $(".ProductDetail-" + popupid).find('input[name="Quantity"]').val(3 - crm);
            $(".forms-" + popupid).find(".threebiecartbtn" + popupid).attr("data-qty", 3 - crm);
            $(".cartforms-" + popupid).find(".threebiebtnincart-" + popupid).attr("data-qty", 3 - crm);
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + (3 - crm) + ", Save 10% </div>").css("background-color", "#00594e");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + (3 - crm) + ", Save 10% </div>").css("background-color", "#00594e");
            if (qtyincart < 3) { }
            $(".threebiebtnincart-" + popupid).show();
            $(".threebiecartbtn" + popupid).show();
            /*$('.threebmessage').show();*/
        }
    } else {
        var crm = 3 - c;
        if (c == 3) {
            /*console.log('threebe eligible');*/
            showdispay = $(".ProductDetail-" + popupid).find(".threebieproductbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).hide();
            $(".threebiecartbtn" + popupid).hide();
            /* $('.threebmessage').hide(); */
        } else {
            /*console.log('Add '+ crm);*/
            $(".ProductDetail-" + popupid).find('input[name="Quantity"]').val(crm);
            $(".forms-" + popupid).find(".threebiecartbtn" + popupid).attr("data-qty", crm);
            $(".cartforms-" + popupid).find(".threebiebtnincart-" + popupid).attr("data-qty", crm);
            showdispay = $(".ProductDetail-" + popupid).find(".threebieproductbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + crm + ", Save 10% </div>").css("background-color", "#00594e");
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + crm + ", Save 10% </div>").css("background-color", "#00594e");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + crm + ", Save 10% </div>").css("background-color", "#00594e");
            if (qtyincart < 3) { }
            $(".threebiebtnincart-" + popupid).show();
            $(".threebiecartbtn" + popupid).show();
            /*$('.threebmessage').show();*/
        }
    }

    if (showdispay == "") {/*console.log(c);*/
    } else {/*console.log(showdispay + ' number ' + c);*/
    }
}

/* Market Popup code */
function checkforMarketPopupThreebieElegible(popupid, qtyincart) {
    var c = qtyincart;
    if (c == 0) {
        c = 3;
    }
    var showdispay = 0;
    var cartbtn = 0;
    if (c > 3) {
        var crm = c % 3;
        if (crm == 0) {
            showdispay = $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find(".threebieproductpopupbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find('input[name="Quantity"]').val(3);
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).hide();
            $(".threebiecartbtn" + popupid).hide();
            /* $('.threebmessage').hide();*/
        } else {
            /*console.log('Add '+ (3-crm));*/
            showdispay = $(".ProductDetail-" + popupid).find(".threebieproductpopupbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + (3 - crm) + ", Save 10% </div>").css("background-color", "#00594e");
            $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find('input[name="Quantity"]').val(3 - crm);
            $(".forms-" + popupid).find(".threebiecartbtn" + popupid).attr("data-qty", 3 - crm);
            $(".cartforms-" + popupid).find(".threebiebtnincart-" + popupid).attr("data-qty", 3 - crm);
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + (3 - crm) + ", Save 10% </div>").css("background-color", "#00594e");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + (3 - crm) + ", Save 10% </div>").css("background-color", "#00594e");
            if (qtyincart < 3) { }
            $(".threebiebtnincart-" + popupid).show();
            $(".threebiecartbtn" + popupid).show();
            /*$('.threebmessage').show();*/
        }
    } else {
        var crm = 3 - c;
        if (c == 3) {
            /*console.log('threebe eligible');*/
            showdispay = $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find(".threebieproductpopupbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Buy 3, Save 10% </div>').css("background-color", "#ffc841");
            $(".threebiebtnincart-" + popupid).hide();
            $(".threebiecartbtn" + popupid).hide();
            /* $('.threebmessage').hide(); */
        } else {
            /*console.log('Add '+ crm);*/
            $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find('input[name="Quantity"]').val(crm);
            $(".forms-" + popupid).find(".threebiecartbtn" + popupid).attr("data-qty", crm);
            $(".cartforms-" + popupid).find(".threebiebtnincart-" + popupid).attr("data-qty", crm);
            showdispay = $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find(".threebieproductpopupbtn").html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + crm + ", Save 10% </div>").css("background-color", "#00594e");
            $(".threebiecartbtn" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + crm + ", Save 10% </div>").css("background-color", "#00594e");
            $(".threebiebtnincart-" + popupid).html('<div style="display: flex;align-items: center;filter: brightness(7);justify-content: center;;height:18px;">Add ' + crm + ", Save 10% </div>").css("background-color", "#00594e");
            if (qtyincart < 3) { }
            $(".threebiebtnincart-" + popupid).show();
            $(".threebiecartbtn" + popupid).show();
            /*$('.threebmessage').show();*/
        }
    }

    if (showdispay == "") {/*console.log(c);*/
    } else {/*console.log(showdispay + ' number ' + c);*/
    }
}

function checkthreebiecounter() {
    var checkthreebieCounter = 0;
    $(".checkthreebieCounter").each(function () {
        if ($(this).val() == "yes") {
            checkthreebieCounter++;
        }
    });

    if (checkthreebieCounter > 0) {
        /*$('.isThisthreebieProduct').show();*/
        $(".filterboxthreebie").show();
        /* $('.button-in-stock:visible').attr('onclick', 'showhideFacets("in-stock");showhideFacets("isThisthreebieProduct")'); */
    } else {
        /*$('.button-in-stock:visible').attr('onclick', 'showhideFacets("in-stock")');*/
        /*$('.isThisthreebieProduct').hide();*/
        $(".filterboxthreebie").hide();
    }
}

function checkSlacCounter() {
    var checkthreebieCounter = 0;
    $(".checkslacCounter").each(function () {
        if ($(this).val() == "yes") {
            checkthreebieCounter++;
        }
    });

    if (checkthreebieCounter > 0) {
        /*$('.isThisSlacProduct').show();*/
        $(".filterboxslac").show();
        /* $('.button-in-stock:visible').attr('onclick', 'showhideFacets("in-stock");showhideFacets("isThisthreebieProduct")'); */
    } else {
        /*$('.button-in-stock:visible').attr('onclick', 'showhideFacets("in-stock")');*/
        $(".isThisSlacProduct").hide();
        $(".filterboxslac").hide();
    }
}

function MarketThreebiePopup(element, popupid) {
    if (element == "Yes") {
        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductpopupbtn").show();
    } else {
        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductpopupbtn").hide();
    }
}

function isFlaEnabled(element, popupid) {
    if (element == "1") {
        $(".ProductDetail-" + popupid + ":visible").find(".flag-wrappernew").show();
        $(".pop-out-wrap-" + popupid).find(".flag-wrappernew").show();
    } else {
        $(".ProductDetail-" + popupid + ":visible").find(".flag-wrappernew").hide();
        $(".pop-out-wrap-" + popupid).find(".flag-wrappernew").hide();
    }
}

function resetProductQuantity() {
    setTimeout(function () {
        $(".product-details").each(function () {
            $(this).find('input[name="Quantity"]').val(1);
            if ($(this).find('input[name="Quantity"]').val() > 1) {
                $(this).find('input[name="Quantity"]').val(1);
            }
        });
    }, 1500);
}

function openDropdown(productcode) {
    if ("ontouchstart" in document.documentElement) { } else {
        $("#delidropdown-" + productcode).addClass("open");
        $("#delidropdown-" + productcode).find(".dropdown-item").find(".slacdiscounttext").show();
        $(".dropdown").on("mouseout", function () {
            $(this).removeClass("open");
            $("#delidropdown-" + productcode).find(".slacdiscounttext").hide();
        });
    }
}

function checkDealsflag(popupid) {
    if ($('.customerType').val() !== 'wholesale') {
        $(".ProductDetail-" + popupid).find(".data-min").each(function () {
            var checkdealflag = $(this).attr("data-checkdealflag");
            if (checkdealflag == "yes") {
                $(".ProductDetail-" + popupid).find(".slaclogo").show();
                $(".ProductDetail-" + popupid).find(".Threeebielogo").show();
            } else {
                // $(".ProductDetail-" + popupid).find('.slaclogo').show();
                $(".ProductDetail-" + popupid).find(".Threeebielogo");
            }
        });
    }
}

function CheckBasketItemss() {

    $.getJSON("/GLOBALBASK_JSON.html", function (data) {
        if (data.groups.length) {
            console.log('load');
            $.each(data.groups, function (i, item) {
                var popupid = item.code;
                var radiocheck = $('input[value="' + popupid + '"]');
                console.log(radiocheck);
                popupidparent = $(radiocheck).attr("data-parent");
                productcode = item.product.code;
                let data_stock = parseInt($(radiocheck).attr("data-stock"));
                var datastockraw = $(".ProductDetail-" + productcode).find(".form-check-input").attr("data-stock-raw");
                var datastock = $(".ProductDetail-" + productcode).find('input[name="Product_Attributes[1]:value"]').attr('data-stock');
                $(".ProductDetail-" + productcode).find(".prodcodecheck-" + popupid).each(function () {
                    $(this).attr("data-qtycart", item.quantity);
                });
                $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycart", item.quantity);
                $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycartcheck", item.quantity);
                $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycart");
                $(".ProductDetail-" + productcode).find('input[name="Product_Attributes[1]:value"]').attr('data-stock', datastock - item.quantity);
                if ($(radiocheck).attr("data-parent") != "" && $(radiocheck).attr("data-parent") != undefined)
                    popupid = $(radiocheck).attr("data-parent");
                else
                    var radiocheck = $('.form-check-dropdown input[value="' + popupid + '"]');
            });
        }
    });
}


function addProductNewchange(element) {
    // let element = $('input[name="productcode"]');
    for (var i = 0; i < element.length; i++) {
        let popupid = $('input[name="productcode"]').eq(i).val();
        if (getPageCode == "CTGY-NEW" || getPageCode == "newproductcard" || getPageCode == "CTGY" || getPageCode == "SRCH" || getPageCode == "deli-grid" || getPageCode == "SFNT" || getPageCode == "BASK" || getPageCode == "MSHIP" || getPageCode == "PROD" || getPageCode == "ShelfLP" || getPageCode == "ordguide" || getPageCode == "featured-items" || getPageCode == "ORDHN" || getPageCode == "ORDHNMobile" || getPageCode == "ORDHNMOBILE" || getPageCode == "WISH" || getPageCode == "blogmain") {
            if (popupid) {
                newshowpriceperlbonload(popupid);
            }
        } else {
            if (popupid) {
                newshowpriceperlbonload(popupid);
                showpriceperlbonload(popupid);
            }
        }

        /*getThreebieDiscountonload(popupid);*/
        checkthreebiecounter();
        checkSlacCounter();
        checkDealsflag(popupid);
        $(".ProductDetail-" + popupid).find(".dropdown-menu li a").click(function () {
            $(this).find(".data-min").each(function () {
                var threebieDiscount = $(this).attr("data-threebie");
                var threebieqty = $(this).attr("data-threebieqty");
                var slacDiscount = $(this).attr("data-slacdiscount");
                var slacDiscountvalue = $(this).attr("data-slacdiscountamt");
                var threebieMarketDiscount = $(this).attr("data-market-threebie");
                var variantinventory = $(this).attr("data-variantinventory");
                var checkdealflag = $(this).attr("data-checkdealflag");
                var getDatastock = $(this).attr("data-stock");
                var maindatastock = $(".ProductDetail-" + popupid).find(".form-check-input").attr("data-stock");
                var qtyincarts = $(this).attr("data-incart");
                var isSaleFlagEnabled = $(this).attr("data-isflag-enabled");
                if (isSaleFlagEnabled == "1") {
                    isFlaEnabled(1, popupid);
                } else {
                    isFlaEnabled(0, popupid);
                }
                setTimeout(function () {
                    // console.log(popupid + ': ' + threebieMarketDiscount + ':' + maindatastock);
                    if (threebieMarketDiscount == "Yes" && maindatastock > 0) {
                        checkthreebiecounter();
                        checkSlacCounter();
                        if ($(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtn").is(":visible") == true) { } else {
                            $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtn").show();
                        }
                        $(".ProductDetail-" + popupid).find(".Threeebielogo").show();
                        $(".main-prod-cards-" + popupid).find(".threebiesavingsimg").show();
                        $(".pop-out-wrap-" + popupid).find(".Threeebielogo").show();

                        if (screen.width > 767) {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").show();
                            $(".productThreebieimg-" + popupid + " img").hide();
                        } else {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").hide();
                            $(".productThreebieimg-" + popupid + " img").show();
                        }

                        if ($("#showproductmodal" + popupid).is(":visible") && maindatastock > 0) {
                            MarketThreebiePopup(threebieMarketDiscount, popupid);
                            checkforMarketPopupThreebieElegible(popupid, qtyincarts);
                            resetProductQuantity();
                        } else {
                            checkforMarketThreebieElegible(popupid, qtyincarts);
                            $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find(".threebieproductpopupbtn").hide();
                        }
                    } else if (threebieqty == "Yes" && maindatastock > 0) {
                        checkthreebiecounter();
                        checkSlacCounter();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtnnew").show();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtn").hide();
                        $(".ProductDetail-" + popupid + ":visible").find(".addtocart-container").hide();
                        // $(".ProductDetail-" + popupid).find('.slaclogo').hide();
                        $(".ProductDetail-" + popupid).find(".slaclogo");
                        $(".ProductDetail-" + popupid).find(".Threeebielogo").show();
                        $(".main-prod-cards-" + popupid).find(".threebiesavingsimg").show();
                        $(".pop-out-wrap-" + popupid).find(".Threeebielogo").show();
                        if (screen.width > 767) {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").show();
                            $(".productThreebieimg-" + popupid + " img").hide();
                        } else {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").hide();
                            $(".productThreebieimg-" + popupid + " img").show();
                        }
                        var qtyincart1 = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycartcheck");
                        var qtyincart2 = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycart");
                        if (qtyincart1 > 0) {
                            qtyincart = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycartcheck");
                        } else {
                            qtyincart = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycart");
                        }
                    } else if (threebieDiscount == "Yes") {
                        checkthreebiecounter();
                        checkSlacCounter();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtn").show();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtnnew").hide();
                        $(".ProductDetail-" + popupid + ":visible").find(".addtocart-container").show();
                        $(".ProductDetail-" + popupid).find(".Threeebielogo").show();
                        // $(".ProductDetail-" + popupid).find('.slaclogo').hide();
                        $(".ProductDetail-" + popupid).find(".slaclogo");
                        $(".main-prod-cards-" + popupid).find(".threebiesavingsimg").show();
                        $(".pop-out-wrap-" + popupid).find(".Threeebielogo").show();
                        if (screen.width > 767) {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").show();
                            $(".productThreebieimg-" + popupid + " img").hide();
                        } else {
                            $(".main-prod-card-" + popupid).find(".Threeebielogo").hide();
                            $(".productThreebieimg-" + popupid + " img").show();
                        }
                        /*var qtyincart = $(".ProductDetail-" + popupid).find('.QtyVal').attr('data-qtycart');*/
                        var qtyincart1 = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycartcheck");
                        var qtyincart2 = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycart");
                        if (qtyincart1 > 0) {
                            qtyincart = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycartcheck");
                        } else {
                            qtyincart = $(".ProductDetail-" + popupid).find(".QtyVal").attr("data-qtycart");
                        }
                        if (maindatastock > 0 && variantinventory > 2) {
                            checkforThreebieElegible(popupid, qtyincart);
                        }
                        // resetProductQuantity();
                    } else if (slacDiscount == "Yes") {
                        checkSlacCounter();
                        $(".main-prod-cards-" + popupid).find(".slacdiscount").text("Save " + slacDiscountvalue);
                        $(".ProductDetail-" + popupid + ":visible").find(".addtocart-container").show();
                        $(".ProductDetail-" + popupid).find(".threebieproductbtn").hide();
                        $(".ProductDetail-" + popupid).find(".slaclogo").show();
                        $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find(".threebieproductpopupbtn").hide();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtnnew").hide();
                        $(".ProductDetail-" + popupid).find(".Threeebielogo").hide();
                        checkDealsflag(popupid);
                    } else {
                        $(".ProductDetail-" + popupid).find(".threebieproductbtn").hide();
                        $(".ProductDetail-" + popupid + ":visible").find(".addtocart-container").show();
                        $("#showproductmodal" + popupid).find(".ProductDetail-" + popupid).find(".threebieproductpopupbtn").hide();
                        $(".ProductDetail-" + popupid + ":visible").find(".threebieproductbtnnew").hide();
                        /*$(".ProductDetail-" + popupid)
                  .find(".Threeebielogo")
                  .hide();
                $(".ProductDetail-" + popupid)
                  .find(".slaclogo")
                  .hide();*/
                        $(".ProductDetail-" + popupid).find(".slaclogo");
                        //$('.main-prod-cards-' + popupid).find('.threebiesavingsimg').show();
                        $(".productThreebieimg-" + popupid + " img").hide();
                        $(".pop-out-wrap-" + popupid).find(".Threeebielogo").hide();
                        $(".main-prod-cards-" + popupid).find(".slacdiscount").text("Save Upto 20");
                        if ($("#showproductmodal" + popupid).is(":visible") && maindatastock > 0) {
                            MarketThreebiePopup(threebieMarketDiscount, popupid);
                        }
                    }
                }, 100);
            });
        });

        $(".ProductDetail-" + popupid).find(".dropdown-menu li a").click(function () {
            $(".deliproductDisplay").find(".owl-wrapper").css({
                "padding-bottom": "24px",
            });

            if ($(".ProductDetail-" + popupid).find(".dropdown-menu li a").length === 1) {
                $(".caret ." + popupid).addClass("displayNone");
                $(".ProductDetail-" + popupid).find(".dLabel1").html($(this).html() + '<span  class="caret ' + popupid + '" ></span>');
            } else {
                $(".ProductDetail-" + popupid).find(".dLabel1").html($(this).html() + '<span  class="caret ' + popupid + '" style="display: block;"></span>');
            }
            let radiocheck = $(this).find("input[type=radio]");
            let prodCode = $(radiocheck).val();
            let dataMin = $(radiocheck).attr("data-min");
            // let data_stock = parseInt($(radiocheck).attr("data-stock"));
            let data_stock = parseInt($(radiocheck).attr("data-stock-raw"));
            let notes = $(radiocheck).attr("data-notes") ? $(radiocheck).attr("data-notes") : "";
            let customerType = $(radiocheck).attr("data-customer");
            let selected_pcode = [prodCode];

            /* Check Data Stock */

            $(".ProductDetail-" + popupid).find(".inputBox").addClass("displayNone");
            if (data_stock > 0) {
                $(".ProductDetail-" + popupid).find(".addtocartbtn").removeClass("displayNone");
                $(".ProductDetail-" + popupid).find(".addbtn").removeClass("displayNone");
                $(".ProductDetail-" + popupid).find(".form-check-input").find(".QtyVal").attr("data-qtycart", 0);
                $(".ProductDetail-" + popupid).find(".productcardbtn").removeClass("displayNone");
                $(".ProductDetail-" + popupid).find(".addtocartbtn").text("Add");
                $(".ProductDetail-" + popupid).find(".out-of-stock-new,.soldoutmessage").css("display", "none");
                $(".ProductDetail-" + popupid).find(".addtocart-container").closest(".row").show();
                var dataminqty = jQuery(this).find(".form-check-input").attr("data-minqty");
                if (dataminqty < 1 || dataminqty == null) {
                    dataminqty = 1;
                }
                $(".ProductDetail-" + popupid).find("[name=Quantity").attr("data-added", dataminqty);
                $(".ProductDetail-" + popupid).find("[name=Quantity").val(dataminqty);
                $(".ProductDetail-" + popupid).find(".QtyVal").val(dataminqty);
            } else {
                $(".ProductDetail-" + popupid).find(".addtocartbtn").addClass("displayNone");
                $(".ProductDetail-" + popupid).find(".addbtn").addClass("displayNone");
                $(".ProductDetail-" + popupid).find(".addbtn").removeClass("visibleformobile");
                $(".ProductDetail-" + popupid).find(".rimgss").css("filter", "grayscale(1)");
                $(".ProductDetail-" + popupid).find(".out-of-stock-new,.soldoutmessage").css("display", "flex");

                $(".ProductDetail-" + popupid).find(".addtocart-container").closest(".row").hide();
                $(".ProductDetail-" + popupid).find(".upbutton").addClass("displayNone");
                $(".ProductDetail-" + popupid).find(".threebieproductbtn").hide();
            }
            $(".ProductDetail-" + popupid).find("input[type=radio]").attr("checked", false);
            $(".ProductDetail-" + popupid).find(`input[data-id=${prodCode}-option]`).attr("checked", true);
            $(".ProductDetail-" + popupid).find('input[name="Action"]').val("ADPR");
            $(".ProductDetail-" + popupid).find('input[name="Basket_Group"]').val("");

            /* Check If Already Added */
            if ($(radiocheck).attr("data-added") && data_stock > 0) {
                $(".ProductDetail-" + popupid).find(".addtocartbtn").addClass("displayNone");
                /*$(".ProductDetail-" + popupid).find('.addbtn').addClass("displayNone");*/
                $(".ProductDetail-" + popupid).find(".inputBox").removeClass("displayNone");
            }

            /* Discount Solution  10/11/2021 */

            var saleFlag = $(".ProductDetail-" + popupid).find(".saleItemFlag").length;
            var greatDeals = $(radiocheck).attr("data-greatdeals");
            var productBox = $(".ProductDetail-" + popupid);
            var salePrice = parseFloat($(radiocheck).attr("data-saleprice").replace(/[^\d\.]/g, ""));
            var saleBasePrice = parseFloat($(radiocheck).attr("data-salebaseprice").replace(/[^\d\.]/g, ""));
            var salePriceF = $(radiocheck).attr("data-saleprice");
            var saleBasePriceF = $(radiocheck).attr("data-salebaseprice");
            var isSaleFlagEnabled = $(radiocheck).attr("data-flag");
            var checkSalePrice = saleBasePrice > salePrice ? 1 : 0;
            var pack_size = 9999;
            productBox.find(".savePackDisplay").text("").css("visibility", "hidden");

            if (customerType == "Retail" || customerType == "Wholesale") {
                /* Show Case/Pack Discount */
                if (prodCode.indexOf("-CS") > -1 || prodCode.indexOf("-PK") > -1) {
                    if (saleFlag < 1 && greatDeals < 1 && checkSalePrice < 1) {
                        productBox.find(".savePackDisplay").html(productBox.find(".savepack").first().text()).css("visibility", "visible");
                        productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                        $(".wholesalediscountnote").html(notes);
                    }
                }
            }

            /* Display Retail Discount Start */
            /*if (customerType == 'Retail') {
                if (notes.trim()) {
                    productBox.find('.savePackDisplay').html(notes).css('visibility', 'visible');
                }
  
            } else {
                if (notes.trim()) {
                    productBox.find('.allPrice .Sale').hide();
                    productBox.find('.allPrice .price').html(salePriceF);
                    productBox.find('.savePackDisplay').html(notes).css('visibility', 'visible');
                    if(saleBasePrice > salePrice)
                    {
                        productBox.find('.allPrice .Sale').html(salePriceF).show();
                        productBox.find('.allPrice .price').html('<s>'+saleBasePriceF+'</s>');
                    }
                }
            }*/

            /* Display Retail Discount Start */
            if (customerType == "Retail") {
                /* if (notes.trim()) {
                    productBox.find('.savePackDisplay').html(notes).css('visibility', 'visible');
                } */

                if (notes.trim()) {
                    if (isSaleFlagEnabled == "Sale" && checkSalePrice < 1) {
                        productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                    } else {
                        if (prodCode.indexOf("-CS") > -1 || prodCode.indexOf("-PK") > -1) {
                            productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                            $(".wholesalediscountnote").html(notes);
                        } else if (notes != "") {
                            productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                            $(".wholesalediscountnote").html(notes);
                        }
                    }
                }
            } else {
                if (notes.trim()) {
                    if (isSaleFlagEnabled == "Sale" && checkSalePrice < 1) {
                        productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                    } else {
                        if ((isSaleFlagEnabled != "Sale" && prodCode.indexOf("-CS") > -1) || prodCode.indexOf("-PK") > -1) {
                            productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                            $(".wholesalediscountnote").html(notes);
                        } else if (notes != "") {
                            productBox.find(".savePackDisplay").html(notes).css("visibility", "visible");
                            $(".wholesalediscountnote").html(notes);
                        }
                    }
                    /*if(saleBasePrice > salePrice)
                    {
                        productBox.find('.allPrice .Sale').html(salePriceF).show();
                        productBox.find('.allPrice .price').html('<s>'+saleBasePriceF+'</s>');
                    }*/
                }
            }

            /* Sale Price Group Discount Flag Start*/

            if (jQuery("body").hasClass("PROD")) {
                $("#prodContents").find(".image-container .product-zoom-image-wrapper").find(".wholesaleFlag").remove();
                $("#prodContents").find(".image-container .product-zoom-image-wrapper").find(".flag-wrapper").remove();
                if ($("#prodContents").find(".form-check-input").attr("data-customer") == "Wholesale" && $("#prodContents").find(".form-check-input").attr("data-flag") == "Sale") {
                    $("#prodContents").find(".image-container .product-zoom-image-wrapper").append('<div class="flag-wrapper wholesaleFlag" style="position:absolute;z-index:99;top:15px;right:0%"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive sale-flag noborder"></div>');
                } else if ($("#prodContents").find(".form-check-input").attr("data-customer") == "Wholesale" && $("#prodContents").find(".form-check-input").attr("data-flag") == "Saleoffer") {
                    console.log("sale 1");
                    $("#prodContents").find(".image-container .product-zoom-image-wrapper").append('<div class="flag-wrapper wholesaleFlag" style="position:absolute;z-index:99;top:15px;right:0%"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive sale-flag noborder"></div>');
                }

                productBox.find(".product-detail-wrapper .flags").find(".wholesaleFlag").remove();
                if (productBox.find(".form-check-input").attr("data-customer") == "Wholesale" && productBox.find(".form-check-input").attr("data-flag") == "Sale") {
                    productBox.find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
                } else if (productBox.find(".form-check-input").attr("data-customer") == "Wholesale" && productBox.find(".form-check-input").attr("data-flag") == "Saleoffer") {
                    productBox.find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
                }
            } else {
                productBox.find(".product-detail-wrapper").find(".wholesaleFlag").remove();
                if (productBox.find(".form-check-input").attr("data-customer") == "Wholesale" && productBox.find(".form-check-input").attr("data-flag") == "Sale") {
                    productBox.find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
                } else if (productBox.find(".form-check-input").attr("data-customer") == "Wholesale" && productBox.find(".form-check-input").attr("data-flag") == "Saleoffer") {
                    productBox.find(".product-detail-wrapper .flags").prepend('<div class="flag-wrapper wholesaleFlag"><img src="graphics/00000001/3/SaleFlagWholesale.png" alt="" class="flag img-responsive  "/></div>');
                }
            }

            /* Sale Price Group Discount Flag Start*/

            /* To Check Weather there is Threebie Discount or Not */
        });

        if ($(".ProductDetail-" + popupid).find(".dropdown-menu li a").hasClass("defaultClass")) {
            $(".ProductDetail-" + popupid).find(".dropdown-menu li .defaultClass").click();
        }
    }
}