var basketApp = new Vue({
    el: '#minibsk',
    data: {
        message: 'Hello Vue!',
        basket: basket,
        loaded: false,
        intervalObj: {},
        active: false,
        timeOut: 0
    },
    mounted: function mounted() {
        var _this = this;

        this.loaded = true;
        //this.active = false;

        this.intervalObj = setInterval(function() {
            _this.loadBasket();
        }, 60 * 1000);
        $(document).ready(function() {
            $('[data-toggle="tooltip"]').tooltip();
            /*only for retail products*/
            $('.retproducts').each(function() {
                $('.retproducts .qtyboxMain input').prop('disabled', true);
                $('.retproducts .drecipeCheck').prop('disabled', true);
                $('.retproducts .mblAllowSubs .mrecipeCheck').prop('disabled', true);
            })

            $('.retproducts').each(function() {
                $('.retproducts .item-name').prop('disabled', true);
                $('.retproducts .prodnamelink').removeAttr('href');
                $('.retproducts .image-wrapper a').removeAttr('href');
            })

            var wsdisbledctr = 0;
            $('.retproducts').each(function() {
                wsdisbledctr++;
            })
            /*console.log(wsdisbledctr)*/

            var wsdisbledctr = 0;
            $('.retproducts').each(function() {
                wsdisbledctr++;
            })
            /*console.log(wsdisbledctr)*/
            if (wsdisbledctr > 0) {
                $('.retproducts .retdelproducts .deleteitems').addClass('txt-orange');
                $('.checkAll').prop('disabled', true);
                $('.checkAll .checkmark').css('opacity', '0.4');
                $('.checkoutbutton').removeAttr('href');
                $('.btn-checkout').removeAttr('href');
                $('.checkoutbutton').click(function() {
                    $('#cartitemdisableditemmodal').modal('show');
                })
                $('.btn-checkout').click(function() {
                    $('#cartitemdisableditemmodal').modal('show');
                })
            }
            /*only for retail products */
            $("#minibsk").css("opacity", 1);
            $(".no-touch #global-mini-basket-wrapper").on("mousemove", function() {
                basketApp.activate();
            });
            setTimeout(function() {
                $(".no-touch #global-mini-basket-wrapper").on("mousemove", function() {
                    basketApp.activate();
                });
            }, 1000);
            $("body #global-mini-basket-wrapper").on("click", function(e) {
                if (!$("body").hasClass("no-touch"))
                    e.preventDefault();
                basketApp.activate(true);
                $('.masteracntbtn').hide();
            });
            var clickedTimes = 0;
            $("body:not(.no-touch)").on("click", function(e) {
                //This close the minibasket in touch devices
                var container = $("#minibsk");
                var link = $("#global-mini-basket-wrapper");

                if (container.is(e.target) || container.has(e.target).length !== 0) {} else {
                    if (link.is(e.target) || link.has(e.target).length !== 0) {
                        if (clickedTimes > 1 && basketApp.active) {
                            basketApp.active = false;
                            clickedTimes = 0;
                        }
                        clickedTimes++;
                    } else {
                        _this.active = false;
                    }
                }
            });
            basketApp.loadBasket();
        });
    },
    methods: {
        addProduct: function addProduct() {},
        loadBasket: function loadBasket() {
            var _this2 = this;
            $.getJSON("/GLOBALBASK_JSON.html", function(data) {
                _this2.basket = data;
                $(".basket-count").text(data.basket_count);
                //this might be better as another vue instance?
                var baskCount = data.basket_count;
                var formatted_total = data.formatted_total;
                var threebiecounter = 0;
                var getthreebiecounter = 0;
                var getpoints = data.total_points;
                if (getpoints > 0) {
                    $(".earnedpoints").text(data.total_points);
                    $(".pointmessage").show();
                }
                $('.miniproductcode').each(function() {
                    var targetInput = $(this).val();
                    var datathreebie = $(this).attr('data-minicartthreebie');
                    var datamarketthreebie = $(this).attr('data-marketthreebie');
                    var cartQty = [];
                    var qtyincart = $(this).attr('data-miniqtyincart');
                    var marketqtyincart = $(this).attr('data-minimarketqtyincart');

                    if (datamarketthreebie === 'Yes') {
                        checkforThreebieElegible(targetInput, marketqtyincart);
                        getthreebiecounter++;
                        if (marketqtyincart < 3) {
                            threebiecounter++;
                            setTimeout(function() {
                                $('.threebmessage').show().html("YOU'RE CLOSE TO A THREEBIE!");
                            }, 100);
                        } else if ((marketqtyincart < 3 && $('.threebiecartbtn').is(":visible") == true || marketqtyincart >= 3 && $('.threebiecartbtn').is(":visible") == true)) {
                            threebiecounter--;
                            setTimeout(function() {
                                $('.threebmessage').show().html("YOU'RE CLOSE TO ANOTHER THREEBIE!");
                            }, 1000);
                        } else if (marketqtyincart >= 3) {
                            setTimeout(function() {
                                $('.threebmessage').show().html("YOU'VE GOT THREEBIE SAVINGS!");
                            }, 100);
                        } else {
                            $('.threebmessage').hide('slow');
                        }
                    }
                    else if (datathreebie === 'Yes') {
                        checkforThreebieElegible(targetInput, qtyincart);
                        getthreebiecounter++;
                        if (qtyincart < 3) {
                            threebiecounter++;
                            setTimeout(function() {
                                $('.threebmessage').show().html("YOU'RE CLOSE TO A THREEBIE!");
                            }, 100);
                        } else if ((qtyincart < 3 && $('.threebiecartbtn').is(":visible") == true || qtyincart >= 3 && $('.threebiecartbtn').is(":visible") == true)) {
                            threebiecounter--;
                            setTimeout(function() {
                                $('.threebmessage').show().html("YOU'RE CLOSE TO ANOTHER THREEBIE!");
                            }, 1000);
                        } else if (qtyincart >= 3) {
                            setTimeout(function() {
                                $('.threebmessage').show().html("YOU'VE GOT THREEBIE SAVINGS!");
                            }, 100);
                        } else {
                            $('.threebmessage').hide('slow');
                        }
                    } else {
                        if ($('.threebmessage').is(":visible")) {} else {
                            $('.threebmessage').hide();
                        }

                    }

                });

                if (threebiecounter > 0) {
                } else if (threebiecounter == 0) {
                } else if (threebiecounter == '') {
                    $('.threebmessage').hide();
                }

                var mixandmatchsum = 0;
                $('.sumofmixandmatch:visible').each(function() {
                    var mixandmatchcounter = $(this).text();
                    mixandmatchsum += !isNaN(mixandmatchcounter);
                });
                if (mixandmatchsum >= 3) {
                    $('.mixandmatchimg').show();
                }

                /*$.each( data.items, function( key, val ) {
                    console.log(data.items[key].code);
                  });*/
                /*varibales used for minimum check*/

                /*only for retail products*/
                $('.retproducts').each(function() {
                    $('.retproducts .qtyboxMain input').prop('disabled', true);
                    $('.retproducts .drecipeCheck').prop('disabled', true);
                    $('.retproducts .mblAllowSubs .mrecipeCheck').prop('disabled', true);
                })

                $('.retproducts').each(function() {
                    $('.retproducts .item-name').prop('disabled', true);
                    $('.retproducts .prodnamelink').removeAttr('href');
                    $('.retproducts .image-wrapper a').removeAttr('href');
                });

                var wsdisbledctr = 0;
                if ($('.retproducts').length > 0) {
                    $('.retproducts').each(function() {
                        wsdisbledctr++;
                    })
                    /*console.log(wsdisbledctr)*/
                    if (wsdisbledctr > 0) {
                        $('.retproducts .remove-item1').addClass('wsremove');
                        $('.proceedtocheckout').prop('disabled', true);
                        $('.retproducts .retdelproducts .deleteitems').addClass('txt-orange');
                        $('.checkAll').prop('disabled', true);
                        $('.checkAll .checkmark').css('opacity', '0.4');
                        $('.checkoutbutton').removeAttr('href');
                        $('.btn-checkout').removeAttr('href');
                        $('.checkoutbutton').click(function() {
                            $('#cartitemdisableditemmodal').modal('show');
                        })
                        $('.btn-checkout').click(function() {
                            $('#cartitemdisableditemmodal').modal('show');
                        })
                    } else {
                        $('.proceedtocheckout').prop('disabled', false);
                    }
                    /*only for retail products */
                }

                var sum = 0;
                var pagecode = $('.pagecodes').text();
                if (pagecode == "BASK") {
                    $(".retproducts .msubtotal .psubtotal").each(function() {
                        var val = $(this).text();
                        val = val.replace('$', '');
                        val = parseFloat(val, 10);
                        sum += (val);
                    });
                } else {
                    $("#minibsks:hidden .retproducts .msubtotal .psubtotal").each(function() {
                        var val = $(this).text();
                        val = val.replace('$', '');
                        val = parseFloat(val, 10);
                        sum += (val);
                    });

                    $(".retproducts .msubtotal .psubtotal:visible").each(function() {
                        var val = $(this).text();
                        val = val.replace('$', '');
                        val = parseFloat(val, 10);
                        sum += (val);
                    });
                }
                /*console.log(sum);*/
                var retailcounter = $('.retailcounter').text();
                /*console.log('retail counter is ' + retailcounter);*/
                var minrouteGroupPrice = $('.routemin').text();
                var mintotal = '';
                var additionalPrice = '';
                var basketTotal = data.total;
                var afterretailcheck = '';
                if (pagecode == "BASK") {
                    var shippingdetails = $('.shippingdetails').html();

                    var salestax = $('.salestax').html();
                    if (salestax == "TBD") {
                        salestax = salestax.replace('TBD', '0');
                    } else {
                        if (salestax != undefined) {
                            salestax = salestax.replace('$', '0');
                            salestax = parseFloat(salestax);
                        }
                    }
                    if (shippingdetails == "TBD") {
                        shippingdetails = shippingdetails.replace('TBD', '0');
                    } else {
                        if (shippingdetails != undefined) {
                            shippingdetails = shippingdetails.replace('$', '');
                            shippingdetails = parseFloat(shippingdetails);
                        }
                    }
                } else {
                    var shippingdetails = 0;

                    var salestax = 0;
                }

                var ordertotal = '';
                var typeofmembership = $('.typeofmembership').val();
                var minfaltratemsg = '';
                if (typeofmembership == 'BasicAccount') {
                    minfaltratemsg = "to get FLAT RATE SHIPPING";
                }
                /*console.log("the final price is"+ basketTotal);*/
                /*varibales used for minimum check*/
                /*check the min order and bask order and show message*/
                mintotal = parseFloat(basketTotal - minrouteGroupPrice);
                mintotal = mintotal.toFixed(2);
                if (retailcounter > 0) {
                    afterretailcheck = parseFloat(basketTotal - sum);
                    afterretailcheck = afterretailcheck.toFixed(2);
                    /*console.log("the after check" + afterretailcheck);*/
                    additionalPrice = parseFloat(minrouteGroupPrice - afterretailcheck);
                    additionalPrice = additionalPrice.toFixed(2);
                    if (additionalPrice > 0 && afterretailcheck > 0) {
                        $('.footer-quote').show();
                        $('.minQty').css('visibility', 'visible');
                        $('.minQty').html("Add $" + additionalPrice + " to meet $" + minrouteGroupPrice + " minimum " + minfaltratemsg);
                    } else {
                        $('.footer-quote').hide();
                        $('.minQty').text('Dont show this');
                        $('.minQty').css('visibility', 'hidden');
                    }

                    ordertotal = parseFloat(ordertotal);
                    /*ordertotal = ordertotal.replace('TBD','0');*/
                    var ordertotals = parseFloat(afterretailcheck) + parseFloat(shippingdetails) + parseFloat(salestax);
                    ordertotals = ordertotals.toFixed(2);
                    $('.totalamounts').text("$" + ordertotals);
                    $('.retailsubtotal').text(afterretailcheck);
                    /*$('#your-cart-link .basket-total').text('...');*/
                    setTimeout(function() {
                        $('#your-cart-link .basket-total').text("$" + afterretailcheck);
                    }, 500);
                    $('#minibsks .formatted_total').text("$" + afterretailcheck);
                    $('.load-img1').show();
                } else {
                    mintotal = parseFloat(basketTotal - minrouteGroupPrice);
                    mintotal = mintotal.toFixed(2);
                    additionalPrice = parseFloat(minrouteGroupPrice - basketTotal);
                    additionalPrice = additionalPrice.toFixed(2);
                    /*console.log(additionalPrice);*/
                    if (mintotal < 0) {
                        /*console.log("The min total is" + mintotal);*/
                        /*$('.minQty').html("Add $" + additionalPrice + " to meet $" + minrouteGroupPrice + " minimum " + minfaltratemsg);*/
                        if ((($('#getweekday').val() == 1) || ($('#getweekday').val() == 6) || $('#getweekday').val() == 7) && (typeofmembership == 'BasicAccount')) {
                        } else {
                            if (basketTotal > 40 && (typeofmembership == 'BasicAccount')) {// $('.footer-quote').show();
                            // $('.minQty').css('visibility', 'visible');
                            // $('.minQty').html("You're almost there! Only $" + additionalPrice + " " + minfaltratemsg);
                            } else if ((typeofmembership != 'BasicAccount') && basketTotal > 0) {
                                $('.footer-quote').show();
                                $('.minQty').css('visibility', 'visible');
                                $('.minQty').html("You're almost there! Only $" + additionalPrice + " " + minfaltratemsg);
                            }
                            // ShowShippingRule(basketTotal);
                        }
                    } else {
                        /*console.log('No its not min value');*/
                        $('.footer-quote').hide();
                        $('.minQty').text('Dont show this');
                        $('.minQty').css('visibility', 'hidden');
                    }
                    // if((isUserLoggedIn !== 0) && (vueUserTypes !== 'Wholesale') && (typeofmembership !== 'BasicAccount')){
                    // ShowShippingRule(basketTotal);
                    // }
                    $('.load-img1').show();
                }
                $('.load-img1').hide();
                /*check the min order and bask order and show message*/
                /* New Fix for Subtotal */
                $.get('/ajax.html?CustomerAction=getbasketcharges', function(data) {
                    var basketDataGet = JSON.parse(data)
                    for (var key in basketDataGet) {
                        if (key.includes("BasketTotal")) {
                            /*console.log(basketDataGet[key]);*/
                            $(".basket-total span").text(basketDataGet[key]);
                            if (retailcounter > 0) {} else {
                                $('.formatted_total').text(basketDataGet[key]);
                                BasketDiscount();
                            }
                        }
                    }
                    if (pagecode == 'BASK') {
                        Checkthreebieproductsincart();
                    }

                });

                if (pagecode == 'opco' || pagecode == 'OPCO' || pagecode == 'opcoguest' || pagecode == 'OPCOGUEST') {/*if(getthreebiecounter > 0)
                    getThreebieDiscountinCheckout();*/
                }
                /* New Fix for Subtotal */
                $('.baskcount').text(baskCount);
                $('.cartqty').text(baskCount);
                if (baskCount == 0) {
                    $('.cartqty').hide();
                    $('#responsiveButton').hide();
                } else {
                    $('.cartqty').text(baskCount).show();
                    if (pagecode == 'opco' || pagecode == 'OPCO' || pagecode == 'opcoguest' || pagecode == 'OPCOGUEST') {
                        $('#responsiveButton').hide();
                    } else {
                        $('#responsiveButton').show()
                    }
                }
                if (baskCount == 0) {
                    $('#minibsks').hide();
                    $('body').css('position', 'relative');
                    $('body').css('overflow-y', 'auto');
                    $('body').css('inset', '0');
                    //$('.deals-container').show();
                }
                refreshItemsOnBasket();
            });
        },
        activate: function activate(nonTimer) {
            var _this3 = this;

            if (this.basket.items === "")
                return 0;
            //Not show an empty one

            this.active = true;
            clearTimeout(this.timeOut);

            if (!nonTimer) {
                this.timeOut = setTimeout(function() {
                    _this3.active = false;
                }, 1500);
            }
        },
        /* to check inventory */
        CheckInventory: function CheckInventory() {
            /*console.log('test ' + $(".inventoryCnt").val());*/
            var inventaory_count = $(".inventoryCnt").val();
            if (inventaory_count || inventaory_count == 'true') {
                // $('.proceedtocarts,.checkoutloginClick').prop('disabled',true);
                $('.proceedtocheckout ,.checkoutloginClick').prop('disabled', true);

            } else {
                $(".inventoryCnt").val('false');
                // $('.proceedtocarts,.checkoutloginClick').prop('disabled',false);
                $('.proceedtocheckout ,.checkoutloginClick').prop('disabled', false);

            }
        },
        /* to check inventory */
        ShowLoader: function ShowLoader() {
            $('.loaderContainers').show();
            $('.qtybtns').attr('disabled', true);
            $('.proceedtocheckout').prop('disabled', true);
            $('.proceedtocarts,.checkoutloginClick').attr('disabled', true);
            $('.minibsk-container').css('opacity', '0.4');
        },
        HideLoader: function HideLoader() {
            $('.loaderContainers').hide();
            $('.qtybtns').attr('disabled', false);
            $('.proceedtocheckout').prop('disabled', false);
            $('.proceedtocarts,.checkoutloginClick').attr('disabled', false);
            $('.minibsk-container').css('opacity', '1');
        },
        CheckBasketItemss() {

            $.getJSON("/GLOBALBASK_JSON.html", function(data) {
                if (data.groups.length) {
                    console.log('load');
                    $.each(data.groups, function(i, item) {
                        var popupid = item.code;
                        var radiocheck = $('input[value="' + popupid + '"]');
                        popupidparent = $(radiocheck).attr("data-parent");
                        productcode = item.product.code;
                        let data_stock = parseInt($(radiocheck).attr("data-stock"));
                        var datastockraw = $(".ProductDetail-" + productcode).find(".form-check-input").attr("data-stock-raw");
                        var datastock = $(".ProductDetail-" + productcode).find('input[name="Product_Attributes[1]:value"]').attr('data-stock');
                        //   $(".ProductDetail-" + productcode)
                        //     .find(".prodcodecheck-" + popupid)
                        //     .each(function () {
                        //       $(this).attr("data-qtycart", item.quantity);
                        //       console.log($(this).val());
                        //       $(".ProductDetail-" + productcode)
                        //   .find('input[name="Product_Attributes[1]:value"]').attr('data-stock',datastock - item.quantity);
                        //     });
                        $(".ProductDetail-" + productcode).find(".prodcodecheck-" + popupid).each(function() {
                            $(this).attr("data-qtycart", item.quantity);
                            $(".ProductDetail-" + productcode).find('input[name="Product_Attributes[1]:value"]').attr('data-stock', ((datastockraw / item.quantity) - Math.floor($(this).val())) * item.quantity);
                            console.log($(this).attr('data-newuom') + ' - ' + (((datastockraw / item.quantity) - Math.floor($(this).val())) * item.quantity));
                        });
                        $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycart", item.quantity);
                        $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycartcheck", item.quantity);
                        $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycart");

                        if ($(radiocheck).attr("data-parent") != "" && $(radiocheck).attr("data-parent") != undefined)
                            popupid = $(radiocheck).attr("data-parent");
                        else
                            var radiocheck = $('.form-check-dropdown input[value="' + popupid + '"]');
                    });
                }
            });
        },
        CheckShippingMethods() {

            $.get("/Merchant5/merchant.mvc?Screen=CUDET&CustomerAction=ReloadShipping&ShippingMethod=null", function(data) {})

        }
    }

});

/*Minibasket Updated 08-sep-2021 */
$(document).ready(function() {
    if (getPageCode !== 'OPCO' || getPageCode !== 'opcoguest') {
        basketApp.CheckShippingMethods();
    }
    $('body').on('click', '#your-cart-link,#global-mini-basket-wrapper', function() {
        var baskcount = $('body').find('.baskcount').text()

        if (screen.width < 768 || pagecode == "BASK" || baskcount == '0' || pagecode == "OPCO" || pagecode == "opco" || pagecode == "OPCOGUEST" || pagecode == "opcoguest") {
            /*$('#your-cart-link .basket-total').text('...');*/
            location.href = "/?Screen=BASK&Store_Code=" + storecode;
        } else {
            // $('#minibsks').animate({width:'toggle'},350);
            /*basketApp.loadBasket();*/
            $('#minibsks').show();
            $('body').css('position', 'relative');
            $('body').css('overflow-y', 'hidden');
            $('body').css('inset', '0');
            $('[data-toggle="tooltip"]').tooltip();
        }
        //$('.deals-container').hide();
    });

    $('.closeCart').click(function() {
        $('#minibsks').toggle();
        $('body').css('position', 'relative');
        $('body').css('overflow-y', 'auto');
        $('body').css('inset', '0');
        //$('.deals-container').show();
        $('.masteracntbtn').show();
    })

    $('.addtocartbtn').click(function() {
        /*basketApp.ShowLoader();
       $('.minibsk-body').load( window.location.protocol + "//" + window.location.host + window.location.pathname + " .minibsk-container",function( response, status, xhr){
       $('.minibsk-body').load().stop();
       basketApp.HideLoader();
   });    */
        basketApp.loadBasket();
    });

    $('.newPlusBtn').click(function() {
        /*basketApp.ShowLoader();
            $('.minibsk-body').load( window.location.protocol + "//" + window.location.host + window.location.pathname + " .minibsk-container",function( response, status, xhr){
            $('.minibsk-body').load().stop();
            basketApp.loadBasket();
            basketApp.HideLoader();
        }); */
        basketApp.loadBasket();
    });

    $('.newMinusBtn').click(function() {
        /*basketApp.ShowLoader();
       $('.minibsk-body').load( window.location.protocol + "//" + window.location.host + window.location.pathname + " .minibsk-container",function( response, status, xhr){
       $('.minibsk-body').load().stop();
       basketApp.loadBasket();
       basketApp.HideLoader();
   });  */
        basketApp.loadBasket();
    });

});

function removeItms($event) {

    var retailcounter = $('.retailcounter').text();
    var wsaccount = $('.wsaccount').text();
    if (retailcounter > 0 && wsaccount == 1) {
        retailcounter = retailcounter - 1;
        retailcounter = $('.retailcounter').text(retailcounter);
    }

    /* e.preventDefault(); */
    var deleteid = $($event).attr('data-removeid');
    var parentCode = $($event).attr('data-parent');
    var childcode = $($event).attr('data-miniproductcode');
    var productCode = $($event).attr('data-product');
    var stockReset = parseInt($($event).attr('data-stockfix'));
    /*.log("restock: " + stockReset);*/
    /*console.log("removed from basket:");*/
    var deleteitem = 'Action=RGRP&Basket_Group=' + deleteid + ';&Offset=' + globalOffset + '&AllOffset=' + globalAllOffset + '&CatListingOffset=' + catlistOffset + '&RelatedOffset=' + relatedOffset + '&SearchOffset=' + searchOffset;
    basketApp.ShowLoader();
    $('.minibsk-body').load('/ajax.html?CustomerAction=getMiniBasket&' + deleteitem + " .minibsk-container", function() {
        basketApp.HideLoader();
        setTimeout(function() {
            if (jQuery('#minibsks .product-row').length < 1) {
                jQuery('.minibsk-header .baskcount').html('0');
                jQuery('.minibsk-footer .formatted_total').html('$0.00');
                $('#minibsks').hide();

            }
        }, 500);
        basketApp.loadBasket();
        basketApp.CheckInventory();
        setTimeout(function() {
            if ($('.ProductDetail-' + parentCode).length > 0) {
                $('.ProductDetail-' + parentCode).find('input[type="radio"]').attr('data-stock', stockReset);
                $('.ProductDetail-' + parentCode).find('input[value="' + productCode + '"]').attr('data-added', 0);
                $('.ProductDetail-' + parentCode).find('.QtyVal').attr('data-qtycartcheck', 0);
                $('.checkpcode-' + productCode).find('.data-min').attr('data-incart', 0)
                $.getJSON("/GLOBALBASK_JSON.html", function(data) {
                    $.each(data.items, function(key, val) {
                        /*console.log(data.items[key].code + " " + data.items[key].quantity);*/
                        $('.checkpcode-' + data.items[key].code).find('.data-min').attr('data-incart', 0)
                    });
                });
                addProductNew();
            }
        }, 1000);
        $('.checkpcode-' + productCode).find('.data-min').attr('data-incart', 0);
        $('[data-toggle="tooltip"]').tooltip();
    });
}

var changeBasketQty = function(element, sign) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    var targetInput = $(element).closest('.custom-number-input').find('input[type="text"]');
    //$(targetInput).focus();
    var parentCode = $.trim($(targetInput).attr('data-parent'));
    var childcode = $(targetInput).attr('data-miniproductcode');
    var miniproductcode = $(targetInput).attr('data-miniproductcode');
    var productCode = $(targetInput).attr('data-product');
    var uomtype = $(targetInput).attr('data-mini-uom');
    var currentValue = parseInt($.trim($(targetInput).val()));
    var totalQntyAvailable = parseInt($.trim($(targetInput).attr('data-stock')));
    var qtySize = parseInt($.trim($(targetInput).attr('data-min')));
    var errorMsg = 'Sorry, we do not have enough quantity to fulfill your order.\r\nPlease adjust the quantity and try again. <br>';
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);
    var datathreebie = $(targetInput).attr('data-minicartthreebie');
    var CartQty = $(targetInput).val();
    if (isNaN(currentValue)) {
        currentValue = 1;
    }
    if (sign === "+") {
        currentValue++;
        if ((qtySize * 1) > totalQntyAvailable) {
            var showDisplay = uomtype + ' - ' + remaingQnty;
            $('#new_globalerrorpopup .gpoperror').html(errorMsg + ' <br/> \r\n  <p class="">Quantity Available:</p>  ' + showDisplay);
            $('#new_globalerrorpopup').modal('show');
            return false;
        }

        $(targetInput).attr('data-stock', (totalQntyAvailable - (qtySize)));
    } else if (sign === "-") {
        currentValue = currentValue > 1 ? currentValue - 1 : 0;
        $(targetInput).attr('data-stock', (totalQntyAvailable + (qtySize)));
    }

    var counterchek = 1;
    $(element).closest('.product-row').find('.psubtotal').text("...");
    $(targetInput).val(currentValue);
    var basketData = $(element).closest('.basket-page-quantity-update-form').serialize();
    basketData = basketData.replace('Screen=', 'OldScreen=');
    basketApp.ShowLoader();
    $('.minibsk-body').load("/ajax.html?CustomerAction=getMiniBasket&" + basketData + " .minibsk-container", function() {
        $('.minibsk-body').load().stop();
        basketApp.CheckInventory();
        basketApp.HideLoader();
        counterchek++;
        /*console.log("the counter is now " + counterchek);*/
        basketApp.loadBasket();
        basketApp.CheckInventory();
        if ($('.ProductDetail-' + parentCode).length > 0) {
            var totalQntyAvailableNew = parseInt(jQuery('body').find('.minibsk-body .qtybox[data-parent="' + parentCode + '"]').attr('data-stock'));
            var addedQty = parseInt(jQuery('body').find('.minibsk-body .qtybox[data-parent="' + parentCode + '"]').val());

            /* additional check for if user make 0 quantity */

            if (jQuery('body').find('.minibsk-body .qtybox[data-parent="' + parentCode + '"]').length < 1) {
                var datastockmain = $('.ProductDetail-' + parentCode).find('input[type="radio"]').attr('data-stock-raw');
                $('.ProductDetail-' + parentCode).find('input[type="radio"]').attr('data-stock', datastockmain);
                $('.ProductDetail-' + parentCode).find('.QtyVal').attr('data-qtycart', 0);
                $('.checkpcode-' + childcode).find('.data-min').attr('data-incart', 0);
                $('.ProductDetail-' + parentCode).find('.QtyVal').attr('data-qtycartcheck', 0);
                $('.ProductDetail-' + parentCode).find('input[value="' + miniproductcode + '"]').attr('data-added', 0);
                /*console.log(miniproductcode);*/
                setTimeout(function() {
                    $('.checkpcode-' + childcode).find('.data-min').attr('data-incart', 0);
                    addProductNew();
                    CheckBasketItems();
                }, 1000);
                $('.ProductDetail-' + parentCode).find('input[name="Action"]').val("ADPR");

            } else {
                $('.ProductDetail-' + parentCode).find('input[type="radio"]').attr('data-stock', totalQntyAvailableNew);
                $('.ProductDetail-' + parentCode).find('.QtyVal').attr('data-qtycart', addedQty);
                $('.checkpcode-' + childcode).find('.data-min').attr('data-incart', addedQty);
                $('.ProductDetail-' + parentCode).find('.QtyVal').attr('data-qtycartcheck', addedQty);
                setTimeout(function() {
                    addProductNew();
                    CheckBasketItems();
                }, 1000);
            }

            /* additional check for if user make 0 quantity */

            /*console.log(addedQty);*/
        }
        $('[data-toggle="tooltip"]').tooltip();
    });

}

$("#global-mini-basket-wrapper").click(function(element) {
    basketApp.ShowLoader();
    var basketData = $(element).closest('.basket-page-quantity-update-form').serialize();
    basketData = basketData.replace('Screen=', 'OldScreen=');
    $('.minibsk-body').load("/ajax.html?CustomerAction=getMiniBasket&" + basketData + " .minibsk-container", function(response, status, xhr) {
        if (xhr.status == 200) {

            basketApp.HideLoader();

            basketApp.CheckInventory();
            refreshItemsOnBasket();
        }
        basketApp.loadBasket();
        $('.minibsk-body').load().stop();
        $('[data-toggle="tooltip"]').tooltip();
    });
});

/* To check internet availalbe or not */
console.log('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');
window.addEventListener('online', ()=>{
    console.log('Became online'),
    location.reload();
    basketApp.ShowLoader(),
    $('.minibsk-body').load(window.location.protocol + "//" + window.location.host + window.location.pathname + " .minibsk-container", function(response, status, xhr) {
        $('.minibsk-body').load().stop();
        basketApp.HideLoader();
        basketApp.loadBasket();
        basketApp.CheckInventory();
        refreshItemsOnBasket();
    })
}
);

window.addEventListener("offline", (event)=>{
    $('.hello-banner').html('<p class="bold-ft mar-zero txt-center">You are offline. Please test your Internet connection</p>');
}
);

window.addEventListener('offline', ()=>console.log('Became offline'), //$('.hello-banner').html('Became offline')
);
/*Minibasket Updated 08-sep-2021 */

if (window.screen < 1180) {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen()
    }
}

/*show after page load*/
/*$('.totalamounts,.retailsubtotal').text('...');*/
$("body").find(".updatedShipping .load-img").css('display', 'flex');
$("body").find(".updatedShipping .logo").hide();
var retailcounter = $('.retailcounter').text();
window.addEventListener('load', (event)=>{
    if (retailcounter > 0) {
    } else {
        setTimeout(function() {
            $("body").find(".updatedShipping .logo").show();
            $('.totalamounts').text(basketformattedTotal).show();
            /*$('#your-cart-link .basket-total').text('&mvt:toolkit:basketsubtotalF;');*/
            $('.retailsubtotal').text(toolkitFormattedTotal).show();
        }, 5000);
    }
}
);
/*show after page load*/

var changeBasketQtyusingInputforThreebie = function(element) {
    $(element).val();
    var parentCode = $(element).attr('data-parent');
    var childcode = $(element).attr('data-miniproductcode');
    var add = parseInt($(element).attr('data-qty')) + parseInt($('.forms-' + $(element).attr('data-pcode')).find('input[name="Quantity"]').val());
    $('.forms-' + $(element).attr('data-pcode')).find('input[name="Quantity"]').val(add);
    var sign = '+';
    changeBasketQty(element, sign);

    $('.ProductDetail-' + parentCode).find('.QtyVal').attr('data-qtycart', add);
    $('.checkpcode-' + childcode).find('.data-min').attr('data-incart', add);
    $('.ProductDetail-' + parentCode).find('.QtyVal').attr('data-qtycartcheck', add);

    setTimeout(function() {
        addProductNew();
        CheckBasketItems();
    }, 1000);
}

var refreshItemsOnBasket = function() {
    var e = {};
    "" !== basketApp.basket.items && basketApp.basket.items.forEach(function(t, a) {
        e[t.product.code] ? (e[t.product.code] += t.quantity) : (e[t.product.code] = t.quantity);
    }),
    $(".product-item").each(function(t) {
        $(this).attr("data-code") && e[$(this).attr("data-code")] ? ($(this).find(".in-cart").text(e[$(this).attr("data-code")] + " IN CART"),
        0 === $(this).find(".in-cart").length && $(this).find(".product-details").append("<div class='in-cart'>" + e[$(this).attr("data-code")] + " IN CART</div>")) : $(this).find(".in-cart").remove();
    }),
    0 === $("td.addtocartbox .in-cart").length ? e[$($("#js-purchase-product input[name=Product_Code]")[0]).val()] && $("td.addtocartbox").append("<div class='in-cart'>" + e[$($("#js-purchase-product input[name=Product_Code]")[0]).val()] + " IN CART</div>") : e[$($("#js-purchase-product input[name=Product_Code]")[0]).val()] && $("td.addtocartbox").find(".in-cart").text(e[$($("#js-purchase-product input[name=Product_Code]")[0]).val()] + " IN CART");
};

function BasketDiscount() {
    var isredeemed = '';
    if ($('#redeemablebalance').is(':checked') == true) {
        isredeemed = 'true';
    } else {
        isredeemed = '';
    }
    let url = "/ajax.html?CustomerAction=getbasketcharges&displayType=raw&redeemed=" + isredeemed;
    $.get(url, (response)=>{
        $('#mobTotal').text($('#OrderSummaryTotal').text())
        var responseData = $(response).filter('#sidebarcart-DISCOUNT').find('#OrderSummaryShipping').html();
        var info = $(response).filter('#sidebarcart-DISCOUNT').find('.col-xs-6').first().html();
        var discount = '<i title="' + info + '" class="pointer">' + $(response).filter('#sidebarcart-DISCOUNT').find('#OrderSummaryShipping').html() + '</i>';
        if (responseData != undefined) {
            $('.BasketDiscount').html(discount);
        } else {
            $('.BasketDiscount').html('');
        }

    }
    );

}
function ShowShippingRule(basketTotal) {
    var getState = document.querySelector('.userState').value;
    var message = '';

    if (!isUserLoggedIn && !getState) {
        $('.footer-quote').hide();
        $('.minQty').css('visibility', 'hidden');
        return;
    }

    if (getState == 'TX') {
        if (basketTotal < 99) {
            message = "You're getting flat rate shipping!";
        } else {
            message = "You're getting free FedEx Ground Shipping!";
        }
    } else {
        if (basketTotal < 99) {
            message = "You're getting flat rate shipping!";
        } else {
            message = "You're getting flat rate shipping!";
        }
    }

    if (message !== '') {
        $('.footer-quote').show();
        $('.minQty').css('visibility', 'visible').html(message);
    }
}

basketApp.CheckShippingMethods();