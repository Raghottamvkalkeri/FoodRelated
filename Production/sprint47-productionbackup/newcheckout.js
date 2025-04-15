// global variables
var addressState = 0;
var DeliveryState = 0;
var PaymentState = 0;
let usedpoints = 0;

/*address form submit code */
jQuery("body").on("submit", "#ocst_form", function(e) {
    e.preventDefault();
    $(".shippingandbillingsection").show();
    $("#shippingAddress").hide();
    $("#shippingAccordianBody").hide();
    $("#shippingContent").show();
    $("#fedexMethod").hide();
    CheckISGuestUuserHasAddress();
    $("#deliveryAccordianBody").show();
    var basktotal = $(".opco .basktotal").text();
    if (basktotal >= 0) {
        let url = jQuery(this).attr("action");
        let dataPost = jQuery(this).serialize();
        jQuery.ajax({
            url: url,
            type: "POST",
            data: dataPost,
            showLoader: true,
            cache: false,
            beforeSend: function() {
                $(".shippingContentloaderbox").show();
                isLoaderVisible(".selectedAddressloaderbox");
                $("#continueDelivery").hide();
            },

            success: function(data) {
                if (data.trim().search(/class="error-message"/i) != -1 || data.trim().search(/class="information-message"/i) != -1) {
                    $(data).find(".invalid").each(function() {
                        $("#addAddressModal").modal("show");
                        $(".show-error").addClass("error-message").show();
                        $(".error-message").html("There is error in " + $(this).find("label").text());
                    });
                    $(".shippingContentloaderbox").hide();
                    $(".new-error-message.error-message").show().html($(data).find(".error-message").html());
                    $(".new-error-message.error-message").show().html($(data).find(".information-message").html());
                    $(".loaderContainer").hide();
                    hideFedExshipping();
                    return false;
                } else {
                    $(".show-error").hide();
                    $("#changeShipping").hide();
                    $("#closeeDeliverty").show();
                    $(".changeBtnshowOnlyMobile").hide();
                    $("#shippingContent .loaderbox").show();
                    $("#changeShipping").text("Change");
                    jQuery("#shippingContent").html(`<div style="position: absolute;width: 100%;height: 100%;background: transparent;z-index: 999;top: 0px;bottom: 0px;" class="shippingContentloaderbox" hidden="">
                <div class="loader"></div>
                </div>` + data);
                    jQuery("#curbsy").attr("src", "/curbsy.html?v=" + randomnumber);
                    $(".loaderContainer").hide();
                    /*$("#changeShipping,#changeShipping").click();*/
                    $("#changeAddress").show();
                    $("#selectedAddress").find(".selectedAddressloaderbox").hide();
                    // for re rendering of time slots  $("#curbsy-div").click();
                    $("#curbsy-div").hide();
                    // if($('body').find('#m-curbside').val()){
                    //let id = $(data).find('#m-curbside')[0] || $(data).find('#m-curbside')[0].id;
                    // }

                    $("#shipping-payment  input:radio").each(function() {
                        if (this.name === "ShippingMethod") {
                            if (this.checked) {
                                $(this).click();
                            }
                        }
                    });

                    /*UserIdleTime();*/
                    // getFreeShippingInfo();
                    checkCouponsApplied();
                }
                //$('#m-curbside').click();
                hideFedExshipping();
                CheckISGuestUuserHasAddress();
                getSpecialShipping();
                $(".SavedShipping").show();
                if ($(".wholesaleuser").text() == 1) {
                    var zipcode = $("#hiddenShipZip").val();
                    CheckRouteGroup(zipcode);
                }
                $("#seletedHeaderContent").find(".updating").remove();
                /*reset the local storage on form submit */
                localStorage.removeItem("curbsyLastWillCall");
                localStorage.removeItem("curbsyLastSelect");
                localStorage.removeItem("curbsyLastCurbside");
                localStorage.removeItem("curbsyReserveUrl");
                localStorage.removeItem("curbsyReserveUrl");
            },
        });
    } else {}
});
//$('#ocst_form').submit();

/*address form submit code */

/*Code to submit the Delivery form */
$("body").on("submit", "#opay", function(e) {
    e.preventDefault();
    var de = new Date();
    $(".continueOrder,.newcard").hide();
    $("#revorder").hide();
    var lastStoredCard = sessionStorage.getItem("CardValue");
    var currentyear = de.getFullYear();
    var estimatetext = $(".estshiptime").text();
    var wholesaleuser = $(".wholesaleuser").text();
    $(".paypalmessage").hide();
    if (wholesaleuser == 1) {
        if ($("#hiddenShipCountry").val() == "CA") {
            estimatetext = $(".estshiptime").eq(1).text();
        } else {
            estimatetext = estimatetext.split(",")[0];
        }
        var formatted_delivery_date = estimatetext + " ," + currentyear;
    } else {
        estimatetext = $(".estshiptime").eq(1).text();
        var formatted_delivery_date = estimatetext;
    }

    document.getElementById("placeOrderBtn").setAttribute("disabled", true);
    document.querySelector(".placeOrderBtn").setAttribute("disabled", true);
    setTimeout(function() {
        $(".instruction-text:first").click();
        $(".instruction-text:first").focus();
        $(".instruction-text").click();
        $(".instruction-text").focus();
    }, 0);
    $("#notessection").show();
    $("#customerpomobile").show();
    $('input[name="delivery_date"]').val(estimatetext);
    if (estimatetext != "") {// $('input[name="formatted_delivery_date"]').val(formatDeliveryDate(formatted_delivery_date));
    // $('#showfromattedDate').html(formatDeliveryDate(formatted_delivery_date));
    }
    let url = jQuery(this).attr("action");
    let dataPost = jQuery(this).serialize();
    if ($('input[name="ShippingMethod"]').is(":checked") == false) {
        $(".new-error-message.error-message").show().html("Please Select Shipping Method");
    } else {
        $(".new-error-message.error-message").hide().html("");

        jQuery.ajax({
            url: url,
            type: "POST",
            data: dataPost,
            showLoader: true,
            cache: false,
            beforeSend: function() {
                $(".checkoutLoader").css("opacity", "1");
                $("#paymentAccordianHeader").find(".paymentloaderbox").show();
            },

            success: function(data) {
                /*This will check api page has any error messages */
                if (data.trim().search(/class="error-message"/i) != -1 || data.trim().search(/class="information-message"/i) != -1) {
                    if ($(data).find(".error-message").html() && $(data).find(".error-message").html().includes('Invalid shipping method.') === true) {
                        $(".new-error-message.error-message").show().html('Selected Delivery Method is not valid anymore. Please change the Delivery Method, Click <a class="refreshshipping" onclick="getShippingMethods();">here to</a> refresh');
                        $(".new-error-message.error-message").show().html($(data).find(".information-message").html());
                        $("#paymentAccordianHeader").find(".paymentloaderbox").hide();
                        console.log($(data).find(".error-message").html());
                        const messagecontent = document.querySelector(".new-error-message.error-message");
                        messagecontent.scrollIntoView({
                            behavior: "smooth",
                            block: "end",
                            inline: "nearest",
                        });
                        $("#changeShipping").click();
                        getShippingMethods();
                    } else {
                        $(".new-error-message.error-message").show().html($(data).find(".error-message").html());
                        $(".new-error-message.error-message").show().html($(data).find(".information-message").html());
                        $("#paymentAccordianHeader").find(".paymentloaderbox").hide();
                        console.log($(data).find(".error-message").html());
                    }

                } else {
                    /*This will check api page has any error messages */
                    $("#restrict").prop("checked", false);
                    showCheckBox();
                    $("#cardDetail span").text("");
                    $("#paymentAccordianHeader").show();
                    $(".checkoutLoader").css("opacity", "0");
                    $("#paymentmethodForm").html(data);
                    $("#changeShipping").text("Change").show();
                    $("#deliveryAccordianBody").hide();
                    $("#closeeDeliverty").hide();
                    $("#selectedDelivery,#selectedDeliveryContent").show();
                    $("#continueDeliverymain").show();
                    if (screen.width < 1023) {
                        $(".changePaymentMethod,#changePaymentMethod").click();
                    }
                    $("#selectPayment").show();
                    $("#paymentAccordianBody").show();
                    $("#paymentmethodForm").show();
                    $("#continueDeliverymain").hide();

                    setTimeout(function() {
                        $("#paymentAccordianHeader").find(".paymentloaderbox").hide();
                    }, 2000);

                    // loadCurbsyData();
                    getCreditfeeSummary();
                    loadCheckout.loadPaymentMethods();
                    if (document.querySelector("input[name=curbsy_datanew]") !== null && document.querySelector("input[name=curbsy_datenew]") !== null) {
                        $("input[name=curbsy_data]").val(document.querySelector("input[name=curbsy_datanew]").value);
                        $("input[name=curbsy_date]").val(document.querySelector("input[name=curbsy_datenew]").value);
                        $("input[name=delivery_date]").val($('input[name="ShippingMethod"]').val() == 'flatrate:FR Truck Delivery' ? document.querySelector("input[name=curbsy_datenew]").value.replace(":", "") : document.querySelector("input[name=curbsy_datenew]").value.replace(":", ","));
                    }
                    $("#getfromwhichsection").val();
                    if ($("#getfromwhichsection").val() == "shipping") {} else {
                        $(".savedPaymentMethod").each(function() {// if($(this).val() == lastStoredCard){
                        //    $(this).val(lastStoredCard).click();
                        // }
                        });
                    }
                    if ($("#redeemablebalance:checked").val() == "points:points") {
                        $(".RewardsavedPaymentMethod").each(function() {
                            if (lastStoredCard == "mivapay:") {
                                $(".continueOrder,.newcard").show();
                            } else {
                                if ($(this).val() == lastStoredCard) {
                                    $(this).val(lastStoredCard).click();
                                }
                            }
                        });
                    } else {
                        $(".newcard").removeAttr("onclick");
                        $(".newcard").attr("onclick", '$(".newcardradio").click();$("#paymentmodal").modal({backdrop: "static", keyboard: false},"show")');
                    }

                    $("#paymentAccordianHeader").css("pointer-events", "all");
                    $("#isreviewsectionvisible").val(1);
                    $(".isreviewsectionvisible").removeClass("isreviewsectionvisible");
                    $(".ispaymentAccordianHeaderVisible").removeClass("ispaymentAccordianHeaderVisible");
                    $(".isdeliveryAccordianBodyvisible").removeClass("isdeliveryAccordianBodyvisible");
                    $("#payment_selection").addClass("showcard");
                    $(".btnApply").prop("disabled", false);

                    DeliveryState = 1;
                    if (paymentTerm == "noncreditcard") {
                        PaymentState = 1;
                        $("#placeOrderBtn,.placeOrderBtn").prop("disabled", false);
                        $(".continueOrder").click();
                        showCheckBox();
                    }
                    console.log("Address State " + addressState + " Shipping State " + DeliveryState + " Payment State " + PaymentState);
                }
                //LoadCouponForm();
                $("#deliveryAccordianBody").hide();
                $("#selectedDelivery").show();
                $("body").on("click", ".continueOrder", function() {
                    $("#applyCouponForm").find("input[name=ShippingMethod]").val(sessionStorage.getItem("SelectedShippingMethod"));
                    $("#applyCouponForm").find("input[name=PaymentMethod]").val(sessionStorage.getItem("SelectedPaymentMethod"));
                    $(".orderSummaryMainContainer").show();

                    $(".savedPaymentMethobd").each(function() {
                        if ($(this).is(":checked")) {
                            $("#cardDetail").text("Card ends in " + $(this).attr("data-prompt"));
                            /*$('#reviewBillingAddress').text($('#BillAddress1L').text()) */
                            /*$('#reviewBillingZip').text($('#BillZipL').text())*/
                            if ($("#BillAddress1L").text() == ",") {
                                $("#reviewBillingAddress").text($("#ShipAddress1L").text());
                            } else {
                                $("#reviewBillingAddress").text($("#BillAddress1L").text());
                            }
                            if ($("#BillZipL").text() == ",") {
                                $("#reviewBillingZip").text($("#ShipZipL").text());
                            } else {
                                $("#reviewBillingZip").text($("#BillZipL").text());
                            }
                        }
                    });

                    $("#reviewBillingAddress").text($("#BillAddress1L").text());
                    $("#reviewBillingZip").text($("#BillZipL").text());
                    /*$('#reviewFirstName').html($('#BillFirstNameL').text()+ '<span class="txt-orange"> - Shipping</span>');*/
                    $("#reviewFirstName").html($("#shipFirstNameL").text() + '<span class="txt-orange"> - Shipping</span>');
                    /*$('#reviewAddress').text($('#BillAddress1L').text());*/
                    $("#reviewAddress").text($("#ShipAddress1L").text());
                    /*$('#reviewZip').text($('#BillZipL').text());*/
                    $("#reviewZip").text($("#ShipZipL").text());
                    $("#edit,#back").show();
                    $("#reivewSelectedDeliveryMethod").html($("#selectedDelivery").html());
                    $("#reviewTab").addClass("active");

                    $(".reviewTabMobile").addClass("active");
                    $(".orderTabhide").addClass("hidden-sm");
                    // $('#notessection').show();
                    // $("#customerpo").show();
                    $("#paymentmethodForm").hide();
                    $("#revorder").show();
                    $("#revorder").show();
                    $("#revorder").removeClass("hideDisplay");
                    //18-12-2023 changes 1
                    $("#reviewoderTabContent").show();
                    //18-12-2023 changes 1
                    $(".reviewOrder").hide();
                    if (screen.width < 1023) {
                        $("#closePaymentMethod").hide();
                        $(".changePaymentMethod").show();
                    }
                    $.ajax({
                        method: "POST",
                        url: "/ajax.html",
                        data: {
                            CustomerAction: "saveDeliveryDate",
                            delivery_date: jQuery("#paymentmethodForm").find('input[name="delivery_date"]').val(),
                        },
                    }).done(function(msg) {
                        console.log("done");
                    });

                    if ($("#BillAddress1L").text() == "," || $("#BillAddress1L").text() == ", ") {
                        $("#reviewBillingAddress").text($("#ShipAddress1L").text());
                    } else {
                        $("#reviewBillingAddress").text($("#BillAddress1L").text());
                    }
                    if ($("#BillZipL").text() == "," || $("#BillZipL").text() == ", ") {
                        $("#reviewBillingZip").text($("#ShipZipL").text());
                    } else {
                        $("#reviewBillingZip").text($("#BillZipL").text());
                    }

                    $(".deskcolsepaymentmethod").hide();
                    $(".changePaymentMethod,#changePaymentMethod").show();
                    $(".continueOrder,.newcard").hide();
                    PaymentState = 1;
                    $("#placeOrderBtn,.placeOrderBtn").prop("disabled", false);
                    showCheckBox();
                    console.log("Address State " + addressState + " Shipping State " + DeliveryState + " Payment State " + PaymentState);
                    // 18-12-2023 changes 3
                    $("#reviewoderTabContent").show();
                    getCreditfeeSummary();
                    // 18-12-2023 changes 3
                });
                if (urlpath === 'https://foodrealted.com' || urlpath === 'https://www.foodrelated.com') {
                    var newList = [];
                    var items = [];

                    $.getJSON("/GLOBALBASK_JSON.html", function(dataval) {
                        // Assuming data.items is an array
                        if (dataval) {
                            dataval.items.map( (data) => {
                                var brand = data.link;
                                if (brand.split('-by')[1] === undefined || brand.split('-by')[1] == '') {
                                    brand = '';
                                } else {
                                    brand = brand.split('-by')[1].replaceAll('-', ' ').replace('.html', '');
                                }
                                items.push({
                                    item_id: data.sku,
                                    item_name: data.name,
                                    item_brand: brand,
                                    item_variant: data.code,
                                    price: data.formatted_price,
                                    quantity: data.quantity
                                });
                            }
                            );
                        } else {
                            console.error("Error: Invalid JSON data or missing items array.");
                        }
                    });

                    dataLayer.push({
                        ecommerce: null
                    });
                    dataLayer.push({
                        event: "add_shipping_info",
                        ecommerce: {
                            currency: "USD",
                            value: $('input[name="ShippingMethod"]:checked').next().next().text().trim(),
                            coupon: "",
                            shipping_tier: $('input[name="ShippingMethod"]:checked').val(),
                            items,
                        }
                    });
                    console.log(dataLayer);
                }

                // Check for Product weight and Delivery Method to add $40 Fees
                // console.log($('input[name="ShippingMethod"]:checked').val());
                checkProductWeight($('input[name="ShippingMethod"]:checked').val());
            },
        });
    }
});
/*Code to submit the Delivery form */

$("body").on("change", "#redeemablebalance", function() {
    $(".paypalmessage").hide();
    if ($(this).is(":checked") == true) {
        $(".savedPaymentMethod").prop("checked", false);
        var points = $(this).val();
        var amounttopay = parseFloat($(".paymentbaskettotal").val()) - parseFloat($(".pointstoreddem").text());
        var radioValue = $(this).val();
        $(".usenewcard").removeAttr("checked");
        if (radioValue == "points:points") {
            $(".nonsavedcardnote,.savedcardnote").hide();
            $("#opay_form").hide();
            $(".payment-type-wrapper").addClass("marltp-15");
        } else {
            $(".paymentcardcontainer").show();
            $(".savedcardnote").show();
            $("#opay_form").show();
            $("#mivapay_frame").css("visibility", "visible");
        }
        $("#editcard .modal-body").html("");
        let url = $("#opay-saved").attr("action");
        let dataPost = $("#opay-saved").serialize();
        jQuery.ajax({
            url: url,
            type: "POST",
            showLoader: true,
            data: dataPost,
            cache: false,
            beforeSend: function() {
                $(".paymentloaderbox").show();
            },
            success: function(data) {
                if (data.trim().search(/class="error-message"/i) != -1 || data.trim().search(/class="information-message"/i) != -1) {
                    $(".new-error-message.error-message").show().html($(data).find(".error-message").html());
                    $(".new-error-message.error-message").show().html($(data).find(".information-message").html());
                    $(".loaderContainer").hide();
                } else {
                    $("#savedCardDetails").html("");
                    $("#savedCardDetails").html(data + "");
                    $(".nonsavedcardnote").hide();
                    $(".paymentloaderbox").hide();
                    getCreditfeeSummary();
                    $(".savedcardheader").text("Saved Card");
                    var lastStoredCard = sessionStorage.getItem("CardValue");
                    $(".RewardsavedPaymentMethod").each(function() {
                        if (lastStoredCard == "mivapay:") {
                            $(".continueOrder,.newcard").show();
                        } else {
                            if ($(this).val() == lastStoredCard) {
                                $(this).val(lastStoredCard).click();
                            }
                        }
                    });
                    if (radioValue != "points:points") {
                        $("#opay_form").show();
                        $("#mivapay_frame").css("visibility", "visible");
                    }

                    if (radioValue == "points:points") {
                        $(".paymentcardcontainer").hide();
                        $(".payment-type-wrapper").addClass("s");
                        if (screen.width > 767 && screen.width <= 768) {
                            $(".removepadding").addClass("marltp-15");
                        }
                        var amounttopay = parseFloat($(".paymentbaskettotal").val()) - parseFloat($(".pointstoreddem").text());
                        $(".finalpay").text(" $" + amounttopay.toFixed(2));
                    } else {
                        $(".removepadding").addClass("nopadding");
                        if (screen.width > 767 && screen.width <= 768) {
                            $(".removepadding").addClass("marltp-15");
                        }
                        $(".payment-type-wrapper").addClass("marltp-15");
                    }

                    $("#payment-balance-amount").change(function() {
                        if ($(this).val() < 0 || $(this).val() == "") {
                            $(".RewardsavedPaymentMethod").css("pointer-events", "none");
                        } else {
                            $(".RewardsavedPaymentMethod").css("pointer-events", "all");
                        }
                    });
                }

                if (radioValue == "points:points") {
                    sessionStorage.setItem("SelectedPaymentMethod", radioValue);
                    sessionStorage.setItem("isRedeemablePaymentMethod", "true");
                    $(".nonsavedcardnote,.savedcardnote").hide();
                } else {
                    $(".savedcardnote").show();
                }

                if ($("#savedCardDetails").find('input[name="AmountType"]').val() == "total") {
                    $("#placeOrderBtn ,.placeOrderBtn").attr("onclick", "onclick_submit();");
                    var totalPoints = $(".entrietotal").html();
                    sessionStorage.removeItem("RewardPoints");
                    $("#cardDetail").html("<span>Redeemed Points " + totalPoints);
                    $("#customerPointsInfo").val("Redeemed Points " + totalPoints);
                } else {
                    $("#placeOrderBtn , .placeOrderBtn").attr("onclick", "onclick_submit();");
                }
                getRedeemedOrderSummary();
                $(".newcard").removeAttr("onclick");
                $(".newcard").attr("onclick", '$("#AdditionalPaymentMethodUsenewCard").click()');
                $(".newcard").show();
            },
        });
    } else {
        $(".newcard").removeAttr("onclick");
        $(".newcard").attr("onclick", '$(".newcardradio").click();$("#paymentmodal").modal({backdrop: "static", keyboard: false},"show")');
        $("#opay").submit();
        $(".newcard").show();
    }
});
/* payment mentod readid selection end*/

/*code to submit payment and form */
var onclick_submit = function(event) {
    if (jQuery("body").find(".selectedPaymentMethods").val().split(":")[0] !== 'frcreditterms') {
        $("#paymentmethodForm").show();
    }
    setTimeout(function() {
        let checkout_store_data = showCheckBox();
        if (checkout_store_data == 1) {
            // Do Nothing

            $("#paymentmodal").modal("hide");
            const element = document.getElementById("min-age");
            element.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
            $("#min-age").css("color", "#f47a44");
        } else {
            removeExtraPaymentMethod();
            var showfromattedDate = $("#showfromattedDate").html();
            if (TDate(showfromattedDate) == false || CustomerCutoffTime() == false || checkisRewardPaymentisavailable() == true) {} else {
                var payment_terms = "";
                if ($(".savedPaymentMethod:checked").val() == "paypalcp:paypal") {
                    payment_terms = jQuery("body").find("#opay_form3").find(".selectedPaymentMethods").val().split(":");
                } else {
                    payment_terms = jQuery("body").find(".selectedPaymentMethods").val().split(":");
                }
                jQuery("body").find(".selectedPaymentMethods").val().split(":");
                if (payment_terms[0] == "mivapay" || payment_terms[0] == "paymentcard") {
                    //$('.selectedPaymentMethods').val($('.selectedPaymentMethods').eq(1).val());
                    var getformatted = $("#formatteddeliverydate").val();
                    var getcurrentdate = getcurrentTime("date");
                    console.log("formated date" + getformatted + "current date" + getcurrentdate);
                    if (MivaPay && typeof MivaPay.Submit === "function") {
                        MivaPay.Submit(function() {
                            var form;
                            form = document.getElementById("opay_form");
                            form.submit();
                            sessionStorage.removeItem("CardValue");
                            sessionStorage.removeItem("DiscountApplied");
                            sessionStorage.removeItem("guestaddressDetails");
                            localStorage.removeItem('couponcode');
                        });
                    }
                } else if (payment_terms[0] == "paypalcp") {
                    getCreditfeeSummary();
                    setTimeout(function() {
                        var form;
                        form = document.getElementById("opay_form3");
                        form.submit();
                    }, 3000);
                } else {
                    var form = document.getElementById("opay_form");
                    form.submit();
                    sessionStorage.removeItem("CardValue");
                }
            }
        }
    }, 1000);
};
/*code to submit payment and order */

/* Added new function to fetch the data for order summary Start */
const getOrderSummary = () => {
    var isredeemed = "";
    if ($("#redeemablebalance").is(":checked") == true) {
        isredeemed = "true";
    } else {
        isredeemed = "";
    }
    let url = "/ajax.html?CustomerAction=getbasketcharges&displayType=raw&redeemed=" + isredeemed;
    $.get(url, (response) => {
        $("#showbasketCharges").html(response);
        if (screen.width < 768) {
            $("#mobileOrderSummary").html(response);
        }
        $("#mobTotal").text($("#OrderSummaryTotal").text());
        checkCouponsApplied();
        var typeofUser = $(".wholesaleuser").text();
        if (typeofUser == "1") {} else {// getThreebieDiscountinCheckout();
        // getOtherDiscountinCheckout();
        }
    }
    );
}
;
/* Added new function to fetch the data for order summary Start End */

/* Added new function to fetch the data for Credit summary Start */
var getCreditfeeSummary = () => {
    var isredeemed = "";
    var isPayPalSelected = '';
    var PaymentMethod = $(".savedPaymentMethod:checked").val();
    if ($("#redeemablebalance").is(":checked") == true) {
        isredeemed = "true";
    } else {
        isredeemed = "";
    }
    var url = '';
    if (PaymentMethod == 'paypalcp:paypal') {
        url = "/ajax.html?CustomerAction=getbasketcharges&displayType=raw&PaymentMethod=" + PaymentMethod + "&redeemed=" + isredeemed;
    } else {
        url = "/ajax.html?CustomerAction=getbasketcharges&displayType=raw&redeemed=" + isredeemed;
    }

    $.get(url, (response) => {
        $("#showbasketCharges").html(response);
        if (screen.width < 768) {
            $("#mobileOrderSummary").html(response);
        }
        checkCouponsApplied();
        var typeofUser = $(".wholesaleuser").text();
        if (typeofUser == "1") {} else {
            if (sessionStorage.getItem("threebieSavings") == null) {
                getThreebieDiscountinCheckout();
            } else {
                $(".showthreebiediscount").html(sessionStorage.getItem("threebieSavings"));
            }
            if (sessionStorage.getItem("otherSaving") == null) {
                getOtherDiscountinCheckout();
            } else {
                $(".showothersavings").html(sessionStorage.getItem("otherSaving"));
            }
            // load coupons
            getCustomerCoupon();
        }
        $("#applyCouponForm").find("input[name=ShippingMethod]").val(sessionStorage.getItem("SelectedShippingMethod"));
        $("#applyCouponForm").find("input[name=PaymentMethod]").val(sessionStorage.getItem("SelectedPaymentMethod"));
    }
    );
    $("#cardDetail").find(".redeemededpoints").html("Redeemed Points " + $("#redee").find("#OrderSummaryShipping").text() + "");
}
;
/* Added new function to fetch the data for Credit summary Start */

/*Change Shipping Setion */
$("#changeAddress").click( () => {
    $("#changeAddress").hide();
    $("#CloseChangeAddress").show();
    $("#shippingAddress").show();
    $("#shippingAccordianBody").show();

    // $(".orderSummaryMainContainer").hide();
    /* variables to set change behiviour on each section */
    isDeliveryVisibleAll();
    isDeliveryVisible();
    // isPaymentVisible();
    isReviewOrderVisible();
    /* variables to set change behiviour on each section */

    $("#closePaymentMethod").hide();
    $(".deskcolsepaymentmethod").hide();
    //$('.changePaymentMethod').show();

    if ($("#selectedDelivery #selectedDeliveryContent").html() == "") {
        $("#changeShipping").hide();
    } else {
        $("#changeShipping").show();
    }

    // Added on 18-12-2023
    console.log("Address State " + addressState + " Shipping State " + DeliveryState + " Payment State " + PaymentState);
    if (PaymentState == 0) {
        $(".continueOrder,.newcard,#reviewoderTabContent").hide();
    } else {
        $(".continueOrder,.newcard").show();
        $("#paymentAccordianBody,#paymentmethodForm,#reviewoderTabContent").show();
    }
    // Added on 18-12-2023
}
);
/*close Shipping Section */

/*address close button */
$("#CloseChangeAddress").on("click", function() {
    $(this).hide();
    $("#changeAddress").show();
    $("#shippingAccordianBody").hide();
    $("#shippingAddress").hide();

    var card = $("#cardDetail span").text();
    if ($("#cardDetail span").text() == "" && $("#cardDetail").length > 0) {
        $(".changePaymentMethod").text("Change").hide();
    } else {
        $(".changePaymentMethod").text("Change").hide();
    }

    if ($("#selectedDelivery #selectedDeliveryContent").html() == "") {
        $("#deliveryAccordianBody").show();
        $("#closeeDeliverty").show();
        $("#changeShipping").hide();
    } else {
        $("#closeeDeliverty").hide();
        $("#changeShipping").show();
    }
    $("#deliveryAddress").css("pointer-evetns", "all");
    if ($("#CloseChangeAddress").hasClass("isreviewsectionvisible") == true) {
        isAccordainopen("isreviewsectionvisible");
    } else if ($("#CloseChangeAddress").hasClass("ispaymentAccordianHeaderVisible") == true) {
        isAccordainopen("ispaymentAccordianHeaderVisible");
    } else if ($("#CloseChangeAddress").hasClass("isdeliveryAccordianBodyvisible") == true || $("#closeMObAddresssection").hasClass("isdeliveryAccordianBodyvisible") == true) {
        isAccordainopen("isdeliveryAccordianBodyvisible");
    }

    if (card.includes("Card ending in") == true) {
        $("#paymentAccordianBody").show();
        $("#closePaymentMethod").show();
        $(".deskcolsepaymentmethod").show();
    }

    // Added on 18-12-2023
    console.log("Address State " + addressState + " Shipping State " + DeliveryState + " Payment State " + PaymentState);
    if (PaymentState == 0) {
        $(".continueOrder,.newcard,#reviewoderTabContent").hide();
    } else {
        $(".continueOrder,.newcard").show();
        $("#paymentAccordianBody,#paymentmethodForm,#reviewoderTabContent").show();
    }
    // Added on 18-12-2023
});
/*address close button */

/*change Delivery Method */
$("#changeShipping").on("click", function() {
    $(this).hide();

    if (window.matchMedia("(max-width: 1023px)").matches) {
        $(".shipingaccordianContainer,.paymentContainer").hide();
        $(".shipingaccordianContainer,.paymentContainer").show();
    }

    $("#deliveryAccordianBody").show(function() {
        isReviewOrderVisible();
    });

    $("#shippingContent").show();
    $("#paymentAccordianBody").hide();
    $(".continueOrder,.newcard").hide();

    $('input[id="curbsyRadio"]').prop("checked", true);
    $("#deliveryAccordianBody").show();

    $("#closeeDeliverty").show();
    $("#deliveryAccordianBody").removeClass("hideDisplay");
    $("#changeShipping").hide();
    $(".applyDisc").show();
    $("#continueDeliverymain").hide();
    $("#selectedDelivery #selectedDeliveryContent").hide();
    $(".selectedDeliveryCousin").show();
    $(".selectedDeliveryother").hide();
    // $(".orderSummaryMainContainer").hide();

    if (window.matchMedia("(max-width: 1023px)").matches) {
        $(".shipingaccordianContainer,.paymentContainer").hide();
        $(".shipingaccordianContainer,.paymentContainer").show();
    }

    /*show update button if shipping is not selected yet */
    if ($("#selectedDeliveryContent").text() == "") {
        $("#changeShipping").text("Change");
    } else {
        $("#changeShipping").text("Change");
    }
    /*show update button if shipping is not selected yet */

    /* update button text if payment selection is blank */

    /* update button text if payment selection is blank */

    $('input[id="curbsyRadio"]').prop("checked", true);
    $("#deliveryAccordianBody").show();

    $("#closeeDeliverty").show();
    $("#deliveryAccordianBody").removeClass("hideDisplay");
    $("#changeShipping").hide();
    $(".applyDisc").show();
    $("#continueDeliverymain").hide();
    $("#selectedDelivery #selectedDeliveryContent").hide();
    $(".selectedDeliveryCousin").show();
    $(".selectedDeliveryother").hide();
    // $(".orderSummaryMainContainer").hide();

    $("#applycoupon").show();
    if ($(this).text() == "Update") {} else {
        $(".changePaymentMethod").show();
        if ($("#reviewoderTabContent").is(":visible") == false) {
            $(".changePaymentMethod").text("Change");
            $("#changePaymentMethod").text("Change");
        } else {
            $(".changePaymentMethod").text("Change");
            $("#changePaymentMethod").text("Change");
        }
    }
    $(".deskcolsepaymentmethod").hide();

    SlideUPAddressSection();

    if (PaymentState == 1) {
        showCheckBox();
        $(".changePaymentMethod,#changePaymentMethod").hide();
    }
});
/*change Delivery Method */

$("#closeMObAddresssection").on("click", function() {
    $(this).hide();
    $("#changeAddress").show();
    $("#shippingAccordianBody").hide();
    $("#shippingAddress").hide();
    $("#deliveryAccordianBody").show();

    $("#paymentAccordianBody").show();
    $("#closeMObAddresssection").css("z-index", "1");
    $("#shippingAddress").css("margin", "0");
    if ($("#closeMObAddresssection").hasClass("isdeliveryAccordianBodyvisible") == true) {
        isAccordainopen("isdeliveryAccordianBodyvisible");
    } else if ($("#closeMObAddresssection").hasClass("isreviewsectionvisible") == true) {
        isAccordainopen("isreviewsectionvisible");
    } else if ($("#closeMObAddresssection").hasClass("ispaymentAccordianHeaderVisible") == true) {
        isAccordainopen("ispaymentAccordianHeaderVisible");
    }
});

function capitalize(s) {
    return s.toLowerCase().replace(/\b./g, function(a) {
        return a.toUpperCase();
    });
}

$("#closeShiping,.closeShiping").click( () => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
        $(".deliveryContainerMobile,.paymentContainer").show();
        $("#savedAddressSumbitMobile").text("Choose");
    }

    $("#selectedAddress").show();
    $("#shippingAddress").hide();
    $("#shippingAccordianBody").hide();
    if ($("#ShipAddress1L").text().length > 1) {
        $("#useAddress").show();
    }

    if ($("#useForBillingMenu").is(":checked")) {
        $("#shipFirstNameL").text(`${$("#hiddenShipFirstName").val()},${$("#hiddenShipLastName").val()}`);
        $("#ShipAddress1L").text(`${$("#hiddenShipAddress1").val()},${$("#hiddenShipAddress2").val()}`);
        $("#ShipZipL").text(`${$("#hiddenShipCity").val()},${$("#hiddenShipStateSelect").val()}, ${$("#hiddenShipZip").val()}`);
        $("#BillFirstNameL").text(`${$("#hiddenBillFirstName").val()}, ${$("#hiddenBillLastName").val()}`);
        $("#BillAddress1L").text(`${$("#hiddenBillAddress1").val()},${$("#hiddenBillAddress2").val()}`);
        $("#BillZipL").text(`${$("#hiddenBillCity").val()},${$("#hiddenBillStateSelect").val()} ${$("#hiddenBillZip").val()}`);
    } else {
        $("#BillFirstNameL").text(`${$("#hiddenBillFirstName").val()}, ${$("#hiddenBillLastName").val()}`);
        $("#BillAddress1L").text(`${$("#hiddenBillAddress1").val()},${$("#hiddenBillAddress2").val()}`);
        $("#BillZipL").text(`${$("#hiddenBillCity").val()},${$("#hiddenBillStateSelect").val()} ${$("#hiddenBillZip").val()}`);
    }

    if ($(".useForBillingMenu").is(":checked")) {
        $("#shipFirstNameL").text(`${$("#hiddenShipFirstName").val()},${$("#hiddenShipLastName").val()}`);
        $("#ShipAddress1L").text(`${$("#hiddenShipAddress1").val()},${$("#hiddenShipAddress2").val()}`);
        $("#ShipZipL").text(`${$("#hiddenShipCity").val()},${$("#hiddenShipStateSelect").val()}, ${$("#hiddenShipZip").val()}`);
        $("#BillFirstNameL").text(`${$("#hiddenBillFirstName").val()}, ${$("#hiddenBillLastName").val()}`);
        $("#BillAddress1L").text(`${$("#hiddenBillAddress1").val()},${$("#hiddenBillAddress2").val()}`);
        $("#BillZipL").text(`${$("#hiddenBillCity").val()},${$("#hiddenBillStateSelect").val()} ${$("#hiddenBillZip").val()}`);
    } else {
        $("#BillFirstNameL").text(`${$("#hiddenBillFirstName").val()}, ${$("#hiddenBillLastName").val()}`);
        $("#BillAddress1L").text(`${$("#hiddenBillAddress1").val()},${$("#hiddenBillAddress2").val()}`);
        $("#BillZipL").text(`${$("#hiddenBillCity").val()},${$("#hiddenBillStateSelect").val()} ${$("#hiddenBillZip").val()}`);
    }
}
);

// paymenbt FUNCTIONALITY
$(".changePaymentMethod,#changePaymentMethod").click( () => {
    $(".continueOrder,.newcard").show();
    // $(".orderSummaryMainContainer").hide();
    $("#selectedPayment").hide();
    $("#paymentAccordianBody").show();
    if (screen.width < 1023) {
        $(".changePaymentMethod").hide();
    } else {/*$('.changePaymentMethod').show();*/
    }
    $("#changePaymentMethod").hide();
    $("#closePaymentMethod").show();
    $("#selectPayment").show();
    $("#paymentAccordianBody").show();
    $("#paymentmethodForm").show();
    $(".deskcolsepaymentmethod").removeClass("hidden-lg");
    $(".deskcolsepaymentmethod").show();
    $(".changePaymentMethod,#changePaymentMethod").hide();
    $(".applyDisc").show();
    if (isUserLoggedIn == 1) {
        $("#reviewoderTabContent").hide();
    }
    document.getElementById("placeOrderBtn").setAttribute("disabled", true);
    document.querySelector(".placeOrderBtn").setAttribute("disabled", true);
    SlideUPAddressSection();
    SlideUPDeliverySection();
}
);
// payment FUNCTIONALITY END

$("#closePaymentMethod,.closePaymentMethod").on("click", function() {
    $(this).hide();
    $(".continueOrder,.newcard").hide();
    $("#applycoupon").show();
    if (window.matchMedia("(max-width: 1023px)").matches) {
        $(".deliveryContainerMobile,.shipingaccordianContainer").show();
    }
    $("#selectedPayment").show();
    $("#paymentAccordianBody").hide();
    $("#selectPayment").hide();
    $(".changePaymentMethod").show();
    $(".deskcolsepaymentmethod").hide();
    /*$('#closePaymentMethod').hide();*/
    $("#reviewoderTabContent").show();
    if (window.matchMedia("(max-width: 1023px)").matches) {
        $("#changePaymentMethod").show();
    }

    /* update button text if payment selection is blank */
    if ($("#cardDetail span").text() == "" && $("#cardDetail").length > 0) {
        $(".changePaymentMethod").text("Change");
    } else {
        $(".changePaymentMethod").text("Change");
        $("#changePaymentMethod").text("Change");
    }

    if ($("#reviewoderTabContent").is(":visible") == false) {
        $(".changePaymentMethod").text("Change");
        $("#changePaymentMethod").text("Change");
    } else {
        $(".changePaymentMethod").text("Change");
        $("#changePaymentMethod").text("Change");
    }

    if ($(".revieworderContent").text() != "") {
        $(".orderSummaryMainContainer").show();
    } else {// $(".orderSummaryMainContainer").hide();
    }

    if (PaymentState == 1) {
        document.getElementById("placeOrderBtn").removeAttribute("disabled");
        document.querySelector(".placeOrderBtn").removeAttribute("disabled");
        showCheckBox();
    } else {
        document.getElementById("placeOrderBtn").setAttribute("disabled", true);
        document.querySelector(".placeOrderBtn").setAttribute("disabled", true);
    }
});

function isAccordainopen(value) {
    if (value == "isdeliveryAccordianBodyvisible" && value == "ispaymentAccordianHeaderVisible" && value == "isreviewsectionvisible") {
        $("#deliveryAccordianBody").show();
        $("#paymentAccordianBody").hide();
        $("#revorder").show();
        $("#changeShipping").hide();
        $("#closeeDeliverty").show();
    }
    if (value == "isreviewsectionvisible")
        $("#revorder").show();
    else if (value == "ispaymentAccordianHeaderVisible") {
        $(".ispaymentAccordianHeaderVisible").removeClass("ispaymentAccordianHeaderVisible");
        $("#deliveryAccordianBody").hide();
        $("#paymentAccordianBody").show();
    } else if (value == "isdeliveryAccordianBodyvisible") {
        $(".isdeliveryAccordianBodyvisible").removeClass("ispaymentAccordianHeaderVisible");
    }
}

function isDeliveryVisibleAll() {
    var isdeliveryAccordianBodyvisible = $("#deliveryAccordianBody").is(":visible");
    if (isdeliveryAccordianBodyvisible == true) {
        $("#deliveryAccordianBody").hide();
        $("#changeShipping").show();
        $("#closeeDeliverty").hide();
        $("#CloseChangeAddress").addClass("isdeliveryAccordianBodyvisible");
        $("#closeMObAddresssection").addClass("isdeliveryAccordianBodyvisible");
        if ($("#selectedDelivery #selectedDeliveryContent").html() == "") {
            $("#selectedDelivery #selectedDeliveryContent").hide();
            $("#shippingContent").show();
        } else {
            $("#selectedDelivery #selectedDeliveryContent").show();
            $("#shippingContent").hide();
        }
    }
}

function isDeliveryVisible() {
    var isdeliveryAccordianBodyvisible = $("#deliveryAccordianBody").is(":visible");
    if (isdeliveryAccordianBodyvisible == true) {
        $(".ispaymentAccordianHeaderVisible").removeClass("ispaymentAccordianHeaderVisible");
        $("#closeMObAddresssection").addClass("isdeliveryAccordianBodyvisible");
        $("#deliveryAccordianBody").hide();
        $("#changeShipping").show();
        $("#closeeDeliverty").hide();
        $("#CloseChangeAddress").addClass("isdeliveryAccordianBodyvisible");
        if ($("#selectedDelivery #selectedDeliveryContent").html() == "") {
            $("#selectedDelivery #selectedDeliveryContent").hide();
            $("#shippingContent").show();
        } else {
            $("#selectedDelivery #selectedDeliveryContent").show();
            $("#shippingContent").hide();
        }
    }
}

function isPaymentVisible() {
    var ispaymentAccordianHeaderVisible = $("#paymentAccordianBody").is(":visible");
    if (ispaymentAccordianHeaderVisible == true) {
        $(".isdeliveryAccordianBodyvisible").removeClass("ispaymentAccordianHeaderVisible");
        $("#paymentAccordianBody").hide();
        $("#CloseChangeAddress").addClass("ispaymentAccordianHeaderVisible");
        $("#closeMObAddresssection").addClass("ispaymentAccordianHeaderVisible");
    }
}

function isReviewOrderVisible() {
    var isdeliveryAccordianBodyvisible = $("#deliveryAccordianBody").is(":visible");
    var isNoteSectionVisible = $("#notessection").is(":visible");
    if (isNoteSectionVisible == true) {
        $(".isdeliveryAccordianBodyvisible").removeClass("ispaymentAccordianHeaderVisible");
        $("#revorder").hide();
        $("#isreviewsectionvisible").val(0);
        $("#CloseChangeAddress").addClass("isreviewsectionvisible");
        $("#closeMObAddresssection").addClass("isreviewsectionvisible");
        if (isdeliveryAccordianBodyvisible == true) {
            $("#closeeDeliverty").addClass("isreviewsectionvisible");
        }
    }
}

function DeletCreditCardPopup(id) {
    $("#removesavedCard").modal("show");
    $("#removecardbtn").attr("onclick", "DetletCreditCard(" + id + ")");
}
function DetletCreditCard(id) {
    $.ajax({
        url: "/Merchant5/merchant.mvc?Screen=opco&Action=DCPC&PaymentCard_ID=" + id,
        type: "POST",
        success: function(data) {
            if (data) {
                $(".new-error-message.error-message").show().text("Card Removed Successfully");
                $("#removesavedCard").modal("hide");
                $("#opay").submit();
            }
        },
    });
}

function addCard() {
    $("#payment-fields").html("");
    $(".payment-type-wrapper").html("");
    jQuery("#editcard .modal-body").html("");
    jQuery("#editcard").modal("show");
    var loadUrl = "/Merchant5/merchant.mvc?Screen=CPCAOPCO&subscreen=Card_ADD";
    setTimeout(function() {
        jQuery("#editcard" + " .modal-body").load(loadUrl);
    }, 1000);
}

function addNewCard() {
    let dataPost = $("#cpca_form").serialize();
    $("#iscardhasIssue").val(0);
    $.ajax({
        data: dataPost,
        type: "POST",
        success: function(data) {
            if (data) {
                onclick_submits();
                setTimeout(function() {
                    ReaddNewCard();
                    return false;
                }, 2500);
            }
        },
    });
}

function ReaddNewCard() {
    let dataPost = $("#cpca_form").serialize();
    $.ajax({
        data: dataPost,
        type: "POST",
        success: function(data) {
            if (data) {
                if ($("#iscardhasIssue").val() == 1) {} else {
                    $("#opay").submit();
                    $("#editcard").modal("hide");
                }
            }
        },
    });
    return false;
}

function SlideUPAddressSection() {
    $("#shippingAddress").hide();
    $("#shippingAccordianBody").hide(function() {
        $("#CloseChangeAddress").hide();
        $("#changeAddress").show();
    });
}

function SlideUPDeliverySection() {
    $("#deliveryAccordianBody").hide();
    $("#deliveryAccordianBody").hide(function() {
        $("#closeeDeliverty").hide();
        $("#changeShipping").show();
        if ($("#selectedDeliveryContent").text() == "") {
            $("#changeShipping").text("Change");
        } else {
            $("#changeShipping").text("Change");
            $("#selectedDelivery #selectedDeliveryContent").show();
        }
    });
}

function CheckRouteGroup(zicode) {
    var routegroup = $("#routegroup").val().toString();
    $.ajax({
        url: "/?Screen=RouteGroupAJAX&customerAction=getRoutegroup&getzipcode=" + zicode,
        beforeSend: function() {},
        success: function(data) {
            var parsedResponse = $.parseHTML(data);
            var getroutegroup = $(parsedResponse).filter("#routegroup").html();
            if (routegroup == getroutegroup) {
                $(".new-error-message").hide();
            } else {
                var clickitem = "#RouteGroupModal";
                $(".new-error-message").html(`Zipcode entered is not valid for the route group assigned. Only FedEx Delivery method will be Available. <a onclick='$("#RouteGroupModal").modal()'>View Details</a>`).show().addClass("error-message");
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                $(".frtruckclass").remove();
                $("#m-willcall").closest(".shippingCheckboxHeight").css("display", "block");
            }
        },
    });
}

function getSpecialShipping() {
    var counter = 0;
    var specialshippingcounter = 0;
    var state = $("#hiddenShipStateSelect").val();
    $(".specialshippings").each(function() {
        specialshippingcounter++;
    });
    $(".nospecialshippings").each(function() {
        counter++;
    });
    if (counter > 0 && specialshippingcounter > 0 && state != "TX") {
        $("#GROUND_HOME_DELIVERY").closest(".shippingCheckboxHeight").css("display", "none");
        $("#FEDEX_2_DAY").closest(".shippingCheckboxHeight").css("display", "none");
        $("#m-FEDEX_2_DAY").closest(".shippingCheckboxHeight").css("display", "none");
        $("#FEDEX_GROUND").closest(".shippingCheckboxHeight").css("display", "none");
        $("#m-FEDEX_GROUND").closest(".shippingCheckboxHeight").css("display", "none");
        $("#m-GROUND_HOME_DELIVERY").closest(".shippingCheckboxHeight").css("display", "none");
    }
    if (counter == 0 && specialshippingcounter > 0 && state != "TX") {
        $("#m-truckdelivery").closest(".shippingCheckboxHeight").css("display", "block");
        $("#m-willcall").closest(".shippingCheckboxHeight").css("display", "block");
        $("#m-curbside").closest(".shippingCheckboxHeight").css("display", "block");
        $("#m-home").closest(".shippingCheckboxHeight").css("display", "block");
        $("#GROUND_HOME_DELIVERY").closest(".shippingCheckboxHeight").css("display", "none");
        $("#FEDEX_GROUND").closest(".shippingCheckboxHeight").css("display", "block");
        $("#FEDEX_2_DAY").closest(".shippingCheckboxHeight").css("display", "none");
        $("#m-FEDEX_GROUND").closest(".shippingCheckboxHeight").css("display", "none");
        $("#m-FEDEX_2_DAY").closest(".shippingCheckboxHeight").css("display", "none");
        $("#m-GROUND_HOME_DELIVERY").closest(".shippingCheckboxHeight").css("display", "none");
    }
}

function getFreeShippingInfo() {
    var shipFirstname = document.getElementById("hiddenShipFirstName").value;
    var ShipLastName = document.getElementById("hiddenShipLastName").value;
    var ShipEmail = encodeURIComponent(document.getElementById("hiddenShipEmail").value);
    var ShipPhone = document.getElementById("hiddenShipPhone").value;
    var ShipAddress1 = document.getElementById("hiddenShipAddress1").value;
    var ShipAddress2 = document.getElementById("hiddenShipAddress2").value;
    var ShipCity = document.getElementById("hiddenShipCity").value;
    var ShipStateSelect = document.getElementById("hiddenShipStateSelect").value;
    var ShipCountry = document.getElementById("hiddenShipCountry").value;
    var ShipZip = document.getElementById("hiddenShipZip").value;

    jQuery.ajax({
        url: "/?subaction=fetch_shipping_details&Actions=ORDR&Screen=OUSL&Store_Code=G&ShipFirstName=" + shipFirstname + "&ShipLastName=" + ShipLastName + "&shipemail=" + ShipEmail + "&ShipPhone=" + ShipPhone + "&ShipAddress1=" + ShipAddress1 + "&ShipCity=" + ShipCity + "&ShipStateSelect=" + ShipStateSelect + "&ShipCountry=" + ShipCountry + "&ShipZip=" + ShipZip,
        type: "POST",
        type: "POST",
        showLoader: true,
        dataType: "json",
        cache: false,
        beforeSend: function() {},
        success: function(data) {
            if (data.length > 1 && data[1].typeofshipping == "hd" && data[0].typeofshipping == "frp") {
                $(".fam-main").show();
                $(".showFreeShipping").html("You've got <b>FREE HOME DELIVERY</b> and <b>Free Shipping</b> for this address");
                shippingmessage = sessionStorage.setItem("userrshippingmessage", "You've got <b>FREE HOME DELIVERY</b> and <b>Free Shipping</b> for this address");
                $(".showimg").html('<img class="img-responsive" style="-webkit-transform: scaleX(-1);transform: scaleX(-1);float: right;" width="50" height="100" src="graphics/00000001/3/est.png"></img>').show();
            } else if (data.length == 1 && data[0].typeofshipping == "frp") {
                $(".fam-main").show();
                $(".showFreeShipping").html("You've got <b>Free Shipping</b> for this address");
                shippingmessage = sessionStorage.setItem("userrshippingmessage", "You've got FLAT RATE SHIPPING for this address");
                $(".showimg").html('<img class="img-responsive" style="-webkit-transform: scaleX(-1);transform: scaleX(-1);float: right;" width="50" height="100" src="graphics/00000001/3/est.png"></img>').show();
            } else if (data.length == 1 && data[0].typeofshipping == "hd") {
                $(".fam-main").show();
                $(".showFreeShipping").html("You've got <b>FREE HOME DELIVERY</b> for this address");
                shippingmessage = sessionStorage.setItem("userrshippingmessage", "You've got FREE HOME DELIVERY for this address");
                $(".showimg").html('<img class="img-responsive" style="-webkit-transform: scaleX(-1);transform: scaleX(-1);float: right;" width="50" height="100" src="graphics/00000001/3/est.png"></img>').show();
            } else {
                $(".fam-main").show();
                $(".showFreeShipping").html("You're earning <b>VIP Rewards!</b>");
                $(".showimg").html('<img class="img-responsive" style="-webkit-transform: scaleX(-1);transform: scaleX(-1);float: right;" width="50" height="100" src="graphics/00000001/3/est.png"></img>').show();
            }
        },
    });

    //     if(state == 'TX'){

    //     if(homerDelInfo == 'hd' && flatrRateInfo == 'frp')  {
    //         $('.fam-main').show();
    //         $(".showFreeShipping").html("You've got <b>FREE HOME DELIVERY</b> and <b>Free Shipping</b> for this address");
    //         $(".fam-Container").show();

    //         }
    //     else if(flatrRateInfo == 'frp')  {
    //         $('.fam-main').show();
    //         $(".showFreeShipping").html("You've got <b>Free Shipping</b> for this address");
    //         $(".fam-Container").show();
    //         }
    //     else if(homerDelInfo == 'hd')  {
    //         $('.fam-main').show();
    //         $(".showFreeShipping").html("You've got <b>FREE HOME DELIVERY</b> for this address");
    //         $(".fam-Container").show();
    //         }
    // 	else{
    // 	$(".showFreeShipping").html("");
    //     $('.basicshowimg').show();

    // 	}
    // }else{
    //     $('.fam-main').hide();
    // }
}
// if(flatrRateInfo == 1){
//         alert();
//  $(".showFreeShipping").html("Eligible for FLAT RATE and FREE HOME Delivery for this zip code");
//     }
//     else{
//         $(".showFreeShipping").html(" ");
//     }

function checkCouponsApplied() {
    if ($('input[name="ShippingMethod"]').is(":checked") == false || $("#selectedDeliveryContent").length < 1) {
        $(".removeCouponIcon").show();
    } else {
        $(".removeCouponIcon").show();
    }
}

function showCopuonss() {
    var customerId = $("#customerId").val();
    var customerType = $(".customertype").val();
    var sessionId = $("#sessionid").val();
    $.get("/ajax.html?CustomerAction=getCustomerCoupon&customer_id=" + customerId + "&customer_type=" + customerType + "&session_id=" + sessionId, function(response) {
        var json = JSON.parse(response);
        navObject = new Vue({
            el: "#showallcoupons",
            data: {
                allcoupons: json,
            },
        });
    });
}

// showCopuonss();

function removeExtraPaymentMethod() {
    if ($("#redeemablebalance:checked").val() == "points:points") {
        $(".selectedPaymentMethods")[0].remove();
        /*alert();*/
    }
}

function checkisRewardPaymentisavailable() {
    var isChecked = $("#redeemablebalance").is(":checked");
    var this1 = 0;
    var false1 = 0;
    if (isChecked == true) {
        $(".RewardsavedPaymentMethod").each(function() {
            if ($(this).is(":checked") == 1) {
                this1++;
            } else {
                false1++;
            }
        });
    }
    console.log(this1 + "  false" + false1 + isChecked);
    if (this1 < 1 && false1 > 0) {
        $(".additionalpaymenterror").show();
        $("#paymentmethodForm").show();
        return true;
    } else {
        $(".additionalpaymenterror").hide();
        // $("#paymentmethodForm").hide();
        return false;
    }
}

function loadorderedProducts() {
    jQuery.ajax({
        url: "/?Screen=checkout-ajax&customerAction=loadorderedproducts",
        type: "POST",
        showLoader: true,
        cache: false,
        beforeSend: function() {
            $(".loaderContainer").show();
        },
        success: function(data) {
            $("#loadcart").html(data);
            $("#loadcartproducts").html(data);
        },
    });
}
loadorderedProducts();

// New Curbsy function is
function GetCurbsySLots() {
    var container = "loadcurbsyshipping";
    var customerType = document.querySelector(".customertype").value;
    var customerid = document.querySelector("#customerId").value;
    var deliverymethod = document.querySelector('input[name="ShippingMethod"]:checked').value;
    deliverymethod.split(":").pop();
    var url = "/Merchant5/merchant.mvc?Screen=mcurbsy&method=" + deliverymethod + "&customer_type=" + customerType + "&customer_id=" + customerid;

    let groups = "";

    $.get(url, function(dataval) {
        if (deliverymethod == "Home Delivery" || deliverymethod == "Home Delivery Premium" || deliverymethod == "flatrate:Home Delivery" || deliverymethod == "flatrate:Home Delivery Premium" || deliverymethod == "flatrate:FR Truck Delivery" || deliverymethod == "FR Truck Delivery") {
            var newList = dataval;
            for (var i = 0; i < newList.length; i++) {
                var dates = new Date(newList[i].day).toLocaleString("en-us", {
                    weekday: "short",
                    timeZone: "America/New_York",
                });
                var month = new Date(newList[i].day).toLocaleString("en-us", {
                    month: "short",
                    timeZone: "America/New_York",
                });
                var day = new Date(newList[i].day).toLocaleString("en-us", {
                    day: "2-digit",
                    timeZone: "America/New_York",
                });
                var getday = new Date(newList[i].day).getDay();
                newList[i].dates = dates;
                newList[i].month = month;
                newList[i].days = day;
                newList[i].getday = getday;
                console.log("Raw Date  " + newList[i].day);
            }
        } else {
            var newList = [];
            dataval.map( (data) => {
                let Mslots = data.slots.filter( (item) => item.slot_group === "Morning");
                let Aslots = data.slots.filter( (item) => item.slot_group === "Afternoon");
                let Eslots = data.slots.filter( (item) => item.slot_group === "Evening");
                newList.push({
                    amount: data?.amount,
                    day: data?.day,
                    slots: [{
                        s_group: "Morning",
                        slots: Mslots
                    }, {
                        s_group: "Afternoon",
                        slots: Aslots
                    }, {
                        s_group: "Evening",
                        slots: Eslots
                    }, ],
                });
            }
            );

            for (var i = 0; i < newList.length; i++) {
                var dates = new Date(newList[i].day).toLocaleString("en-us", {
                    weekday: "short",
                    timeZone: "America/New_York",
                });
                var month = new Date(newList[i].day).toLocaleString("en-us", {
                    month: "short",
                    timeZone: "America/New_York",
                });
                var day = new Date(newList[i].day).toLocaleString("en-us", {
                    day: "2-digit",
                    timeZone: "America/New_York",
                });
                var getday = new Date(newList[i].day).getDay();
                newList[i].dates = dates;
                newList[i].month = month;
                newList[i].days = day;
                newList[i].getday = getday;
                console.log("Raw Date  " + newList[i].day);
            }
        }
        curbsydata = new Vue({
            el: "#" + container,
            data: {
                loadshipping: newList
            },
            methods: {
                selectedSlots([activeDay,date_display,day,isExpress,method,time_display,slot,url,]) {
                    var tempid = getcurrentTime("unix") * 1000;
                    var r = {
                        day: day,
                        slot: slot,
                        activeDay: activeDay,
                        date_display: date_display,
                        time_display: time_display,
                        method: method,
                        isExpress: isExpress,
                        tempid: tempid,
                        ts: day,
                        url: "https://immense-bayou-77802.herokuapp.com/reserve/FoodRelatedCurbside/" + tempid + "/" + slot,
                    };

                    var getYear = new Date(day).getFullYear();
                    var formatted_delivery_date = date_display + " ," + getYear;
                    var selectedslot = date_display + " ," + getYear + time_display;
                    sessionStorage.setItem("SelectedShippingMethod", $(".curbsyShippingRadio:checked").val());
                    $("#applyCouponForm").find("input[name=ShippingMethod]").val(sessionStorage.getItem("SelectedShippingMethod"));
                    if (deliverymethod == 'FR Truck Delivery' || deliverymethod == 'flatrate:FR Truck Delivery') {
                        time_display = '';
                        selectedslot = date_display + " ,," + getYear + time_display
                    }
                    var selectedDelivery = '<h5 class="ft-w-6s mb-ft-12p ltr-sp-1s ltr-sp-0p5 ft-md">' + method + ' <span class="ft-w-6s mb-ft-12p ltr-sp-1s ltr-sp-0p5 ft-md">' + date_display + ' </span> </h5>  <h5 class="ft-w-6s mb-ft-12p ltr-sp-1s ltr-sp-0p5 ft-md">' + time_display + " <p></p></h5>";
                    if (document.querySelector("input[name=curbsy_datanew]") !== null && document.querySelector("input[name=curbsy_datenew]") !== null) {
                        document.querySelector("input[name=curbsy_datanew]").value = JSON.stringify(r);
                        document.querySelector("input[name=curbsy_datenew]").value = (deliverymethod === 'FR Truck Delivery' || deliverymethod === 'flatrate:FR Truck Delivery') ? date_display + " " + time_display : date_display + ": " + time_display;
                    }
                    document.querySelector("#selectedDeliveryContent").innerHTML = selectedDelivery;
                    $("input[name=formatted_delivery_date]").val(formatDeliveryDate(formatted_delivery_date));
                    $('input[name="delivery_date"]').val(selectedslot);
                    $("#deliveryAccordianBody").hide();
                    $("#loadcurbsydata").modal("hide");
                    $("#opay").submit();
                },
            },
            mounted() {
                this.$nextTick( () => {
                    document.getElementById("loadcurbsyshipping").style.display = "block";
                    document.querySelector(".shippingContentloaderbox").style.display = "none";
                }
                );
            },
        });
    }).then(function() {
        $("#slotscarousel").owlCarousel({
            items: 4,
            loop: false,
            pagination: false,
            responsiveClass: true,
            lazyLoad: true,
            touchDrag: true,
            mouseDrag: true,
            pullDrag: true,
            dots: false,
            margin: 10,
            responsive: {
                0: {
                    items: 3,
                    margin: 10,
                },
                600: {
                    items: 3,
                    margin: 10,
                },
                1000: {
                    items: 3,
                    margin: 10,
                },
            },
        });

        $(".dayslots").on("click", function() {
            $(this).addClass("activeslot");
        });

        $(".timeslots").find(".timeslot").on("click", function() {
            $(".timeslots").find(".timeslot").removeClass("activeslot");
            console.log($(this).find("span").attr("data-slot"));
            $(this).addClass("activeslot");
        });

        $(".submitcurbsy").on("click", function() {
            if ($(".dayslots.activeslot").find("span").attr("data-date_display") == undefined) {
                $("#loadcurbsydata").find(".error-message").html("Please select day slot").show().delay("5000").fadeOut("fast");
            } else if ($(".timeslot.activeslot").find("span").attr("data-time_display") == undefined) {
                $("#loadcurbsydata").find(".error-message").html("Please select time slot").show().delay("5000").fadeOut("fast");
            } else {
                var activeDay = 0;
                var date_display = $(".timeslot.activeslot").find("span").attr("data-date_display");
                var day = $(".timeslot.activeslot").find("span").attr("data-day");
                var isExpress = true;
                var method = $(".curbsyShippingRadio:checked").val().split(":").pop();
                var time_display = $(".timeslot.activeslot").find("span").attr("data-time_display");
                var ts = "";
                var slot = $(".timeslot.activeslot").find("span").attr("data-slot");
                var url = "";
                curbsydata.selectedSlots([activeDay, date_display, day, isExpress, method, time_display, slot, url, ]);
            }
        });
    });
}

function GetDeliveryMethods() {
    var sessionId = document.querySelector("#sessionid").value;
    var customerid = document.querySelector("#customerId").value;
    var shipFirstname = encodeURIComponent(document.getElementById("hiddenShipFirstName").value);
    var ShipLastName = encodeURIComponent(document.getElementById("hiddenShipLastName").value);
    var ShipEmail = encodeURIComponent(document.getElementById("hiddenShipEmail").value);
    var ShipPhone = encodeURIComponent(document.getElementById("hiddenShipPhone").value);
    var ShipAddress1 = encodeURIComponent(document.getElementById("hiddenShipAddress1").value);
    var ShipAddress2 = encodeURIComponent(document.getElementById("hiddenShipAddress2").value);
    var ShipCity = encodeURIComponent(document.getElementById("hiddenShipCity").value);
    var ShipStateSelect = encodeURIComponent(document.getElementById("hiddenShipStateSelect").value);
    var ShipCountry = encodeURIComponent(document.getElementById("hiddenShipCountry").value);
    var ShipZip = encodeURIComponent(document.getElementById("hiddenShipZip").value);
    var BillFirstName = document.getElementById("hiddenBillFirstName") === null ? shipFirstname : encodeURIComponent(document.getElementById("hiddenBillFirstName").value);
    var BillLastName = document.getElementById("hiddenBillLastName") === null ? ShipLastName : encodeURIComponent(document.getElementById("hiddenBillLastName").value);
    var BillPhone = document.getElementById("hiddenBillPhone") === null ? ShipPhone : encodeURIComponent(document.getElementById("hiddenBillPhone").value);
    var BillFax = document.getElementById("hiddenBillFax") === null ? "" : encodeURIComponent(document.getElementById("hiddenBillFax").value);
    var BillAddress1 = document.getElementById("hiddenBillAddress1") === null ? ShipAddress1 : encodeURIComponent(document.getElementById("hiddenBillAddress1").value);
    var BillAddress2 = document.getElementById("hiddenBillAddress2") === null ? ShipAddress2 : encodeURIComponent(document.getElementById("hiddenBillAddress2").value);
    var BillCity = document.getElementById("hiddenBillCity") === null ? ShipCity : encodeURIComponent(document.getElementById("hiddenBillCity").value);
    var BillStateSelect = document.getElementById("hiddenBillStateSelect") === null ? ShipStateSelect : encodeURIComponent(document.getElementById("hiddenBillStateSelect").value);
    var BillCountry = document.getElementById("hiddenBillCountry") === null ? ShipCountry : encodeURIComponent(document.getElementById("hiddenBillCountry").value);
    var BillZip = document.getElementById("hiddenBillZip") === null ? ShipZip : encodeURIComponent(document.getElementById("hiddenBillZip").value);
    var BillEmail = document.getElementById("hiddenBillEmail") === null ? ShipEmail : encodeURIComponent(document.getElementById("hiddenBillEmail").value);
    var BillToShow = document.getElementById("billing_to_show").value;
    var customertype = document.querySelector(".customertype") === null ? "" : document.querySelector(".customertype").value;

    var url = "/mcajax.html?mobileAction=ShipPay&customer_id=" + customerid + "&Action=ORDR&Store_Code=G&ShipFirstName=" + shipFirstname + "&ShipLastName=" + ShipLastName + "&ShipEmail=" + ShipEmail + "&ShipPhone=" + ShipPhone + "&ShipFax=&ShipCompany=&ShipAddress1=" + ShipAddress1 + "&ShipResidential=0&ShipAddress2=" + ShipAddress2 + "&ShipCity=" + ShipCity + "&billing_to_show=" + BillToShow + "&ShipStateSelect=" + ShipStateSelect + "&ShipCountry=" + ShipCountry + "&ShipZip=" + ShipZip + "&BillFirstName=+" + BillFirstName + "&BillLastName=" + BillLastName + "&BillEmail=" + BillEmail + "&BillPhone=" + BillPhone + "&BillFax=&BillAddress1=" + BillAddress1 + "&BillAddress2=" + BillAddress2 + "&BillCity=" + BillCity + "&BillCountry=" + BillCountry + "&BillStateSelect=" + BillStateSelect + "&BillZip=" + BillZip + "&customer_type=" + customertype + "&pointspayment=true&session_id=" + sessionId;
    var handleErrors = "";
    $.get(url, function(dataval) {
        if (dataval.shipping_methods.length == 0) {
            handleErrors = "error";
        }
        var fedEXInternationdates = new Date();
        fedEXInternationdates.setDate(fedEXInternationdates.getDate() + 7);
        var FedEXday = fedEXInternationdates.toLocaleString("en-us", {
            day: "2-digit",
            timeZone: "America/New_York",
        });
        var FedEXmonth = fedEXInternationdates.toLocaleString("en-us", {
            month: "short",
            timeZone: "America/New_York",
        });
        var FedEXmonthfull = fedEXInternationdates.toLocaleString("en-us", {
            month: "long",
            timeZone: "America/New_York",
        });
        var FedEXyear = fedEXInternationdates.toLocaleString("en-us", {
            year: "numeric",
            timeZone: "America/New_York",
        });

        for (var i = 0; i < dataval.shipping_methods.length; i++) {
            // check for fedex international and international priority
            if (dataval.shipping_methods[i].name.includes("FedEx International")) {
                $("body").find("#INTERNATIONAL_ECONOMY-shipping").attr("data-estimated-date", FedEXmonthfull + " " + FedEXday + "," + " " + FedEXyear);
                $("body").find("#INTERNATIONAL_PRIORITY-shipping").attr("data-estimated-date", FedEXmonthfull + " " + FedEXday + "," + " " + FedEXyear);
                dataval.shipping_methods[i].fedEXInternationdate = ': Est Delivery: <span class="fedExDates txt-orange">' + FedEXmonth + " " + FedEXday + "," + " " + FedEXyear + "</span>";

                dataval.shipping_methods[i].fedEXInternalDateCheck = FedEXmonthfull + " " + FedEXday + "," + " " + FedEXyear;
            }
            shippingname = "";
            //  dataval.shipping_methods[i].shippingname = decodeHtmlCharCodes(dataval.shipping_methods[i].name);
            if (dataval.shipping_methods[i].code == "error" || dataval.shipping_methods[i].code == "fallback" || dataval.shipping_methods[i].code == "") {
                handleErrors = "error";
                $("#submitSelectedDelivery").hide();
            }
            dataval.shipping_methods[i].shippingname = dataval.shipping_methods[i].name.replace("&reg;", "<sup>®</sup>");
        }
        loadCheckout = new Vue({
            el: "#shippingContainer",
            data: {
                loadshippingMethods: dataval
            },
            methods: {
                getEstimatedShipping() {
                    let zip = $("#hiddenShipZip").val();
                    let basketTotal = document.getElementById("basketTotal").value;
                    let url = "/Merchant5/FedExApi/estimate-delivery-new.php?baskweight=" + basketTotal + "&destzip=" + zip;
                    jQuery.ajax({
                        url: url,
                        type: "POST",
                        showLoader: true,
                        cache: false,
                        beforeSend: function() {
                            $(".shipcontainer").find("label").css("pointer-events", "none");
                            $(".getestimateddelivery").html(".....");
                        },
                        success: function(server_response) {
                            $(".getestimateddelivery").html("");
                            $(".shippingMethodRadioNew").each(function() {
                                selectedShiping = $(this).attr("shiping-method");
                                selectedShipingcode = $(this).attr("shiping-method");
                                selectedShiping = selectedShiping.split(":").pop();
                                if (selectedShiping === "GROUND_HOME_DELIVERY") {
                                    selectedShiping = "FEDEX_GROUND_ALT";
                                }
                                if (selectedShiping == "FedEx Ground/Home Delivery") {
                                    selectedShiping = "FEDEX_GROUND";
                                }
                                var result = server_response;
                                var shippingEstimate = result;
                                shippingEstimate = JSON.parse(shippingEstimate);
                                if (shippingEstimate) {
                                    jQuery.each(shippingEstimate, function(key, val) {
                                        var getDate = new Date(val);
                                        var day = getDate.toLocaleString("en-us", {
                                            day: "2-digit",
                                        });
                                        var month = getDate.toLocaleString("en-us", {
                                            month: "short",
                                        });
                                        var year = getDate.toLocaleString("en-us", {
                                            year: "numeric",
                                        });
                                        if (key == "FEDEX_GROUND_ALT") {
                                            $("body").find("#GROUND_HOME_DELIVERY .getestimateddelivery").html(': Est Delivery: <span class="fedExDates txt-orange">' + month + " " + day + "," + " " + year + "</span>");
                                            $("body").find("#GROUND_HOME_DELIVERY-shipping").attr("data-estimated-date", val);
                                        } else if (key == "FEDEX_GROUND") {
                                            $("body").find("#GROUND_HOME_DELIVERY .getestimateddelivery").html(': Est Delivery: <span class="fedExDates txt-orange">' + month + " " + day + "," + " " + year + "</span>");
                                            $("body").find("#FEDEX_GROUND .getestimateddelivery").html(': Est Delivery: <span class="fedExDates txt-orange">' + month + " " + day + "," + " " + year + "</span>");
                                            $("body").find("#flatrate_shipping .getestimateddelivery").html(': Est Delivery: <span class="fedExDates txt-orange">' + month + " " + day + "," + " " + year + "</span>");
                                            $("body").find("#GROUND_HOME_DELIVERY-shipping").attr("data-estimated-date", val);
                                            $("body").find("#FEDEX_GROUND-shipping").attr("data-estimated-date", val);
                                            $("body").find("#flatrate_shipping-shipping").attr("data-estimated-date", val);
                                        } else {
                                            $("body").find("#" + key + " .getestimateddelivery").html(': Est Delivery: <span class="fedExDates txt-orange">' + month + " " + day + "," + " " + year + "</span>");
                                            $("body").find("#" + key + "-shipping").attr("data-estimated-date", val);
                                        }
                                    });
                                }
                            });
                            $(".shipcontainer").find("label").css("pointer-events", "all");
                        },
                    });
                },
                loadPaymentMethods() {
                    var shippingMethod = $('input[name="ShippingMethod"]:checked').val();
                    var PaymentMethod = $("#opay").find('input[name="PaymentMethod"]').val();
                    var url = "/mcajaxweb.html?mobileAction=ShipPay&customer_id=" + customerid + "&Action=SHIP,PSHP,CTAX,update-order-custom-data&Store_Code=G&customer_type=" + customertype + "&pointspayment=true" + "&ShippingMethod=" + shippingMethod + "&PaymentMethod=" + PaymentMethod;
                    var image = "";

                    $.get(url, function(dataval) {
                        for (var i = 0; i < dataval.payment_methods.length; i++) {
                            // TO assign Images to card
                            if (dataval.payment_methods[i].type == "American Express") {
                                image = "graphics/00000001/3/Payment-Cards-05.png";
                            } else if (dataval.payment_methods[i].type == "Discover") {
                                image = "graphics/00000001/3/Payment-Cards-03.png";
                            } else if (dataval.payment_methods[i].type == "MasterCard") {
                                image = "graphics/00000001/3/Payment-Cards-04.png";
                            } else if (dataval.payment_methods[i].type == "Visa") {
                                image = "graphics/00000001/3/Payment-Cards-02.png";
                            }

                            // TO get card id
                            dataval.payment_methods[i].id = dataval.payment_methods[i].code.split(":").pop();

                            //    TO check whether card is active or not
                            if (dataval.payment_methods[i].name.includes("expired") == true || dataval.payment_methods[i].name.includes("Expired")) {
                                dataval.payment_methods[i].isactivecard = "disabled";
                            } else {
                                dataval.payment_methods[i].isactivecard = "false";
                            }

                            dataval.payment_methods[i].image = image;
                        }
                        payment = new Vue({
                            el: "#loadpaymentmethods",
                            data: {
                                loadpaymentmethods: dataval
                            },
                            mounted() {
                                this.$nextTick( () => {
                                    document.getElementById("loadpaymentmethods").style.display = "block";
                                    // changes added 19th Dec 2023
                                    $(".newcard").show();
                                    getCreditfeeSummary();
                                    var DiscountApplied = sessionStorage.getItem("DiscountApplied");
                                    var lastStoredCard = sessionStorage.getItem("CardValue");
                                    if (DiscountApplied == "yes") {
                                        if (lastStoredCard != "mivapay:") {
                                            $("#paymentmethodForm").show();
                                        }
                                        // $('#redeemablebalance').click();
                                    }
                                    // changes added 19th Dec 2023
                                }
                                );
                            },
                        });
                    });
                },
                loadRedeemPayment() {
                    var shippingMethod = $('input[name="ShippingMethod"]:checked').val();
                    var PaymentMethod = $("#redeemablebalance").val();
                    //"/mcajax.html?mobileAction=ShipPay/*&customer_id="+customerid+"&Action=SHIP,PSHP,CTAX,update-order-custom-data&Store_Code=G&&customer_type="+customertype+"&pointspayment=false"+"&ShippingMethod="+shippingMethod+"&PaymentMethod="+PaymentMethod;
                    var url = "/mcajax.html?mobileAction=ShipPay&customer_id=" + customerid + "&Store_Code=G&customer_type=" + customertype + "&pointspayment=false&PaymentMethod=" + PaymentMethod;
                    var image = "";

                    $.get(url, function(dataval) {
                        for (var i = 0; i < dataval.payment_methods.length; i++) {
                            // TO assign Images to card
                            if (dataval.payment_methods[i].type == "American Express") {
                                image = "graphics/00000001/3/Payment-Cards-05.png";
                            } else if (dataval.payment_methods[i].type == "Discover") {
                                image = "graphics/00000001/3/Payment-Cards-03.png";
                            } else if (dataval.payment_methods[i].type == "MasterCard") {
                                image = "graphics/00000001/3/Payment-Cards-04.png";
                            } else if (dataval.payment_methods[i].type == "Visa") {
                                image = "graphics/00000001/3/Payment-Cards-02.png";
                            }

                            // TO get card id
                            dataval.payment_methods[i].id = dataval.payment_methods[i].code.split(":").pop();

                            //    TO check whether card is active or not
                            if (dataval.payment_methods[i].name.includes("expired") == true || dataval.payment_methods[i].name.includes("Expired") == true) {
                                dataval.payment_methods[i].isactivecard = "disabled";
                            } else {
                                dataval.payment_methods[i].isactivecard = "false";
                            }

                            dataval.payment_methods[i].image = image;
                        }
                        RedeemPayments = new Vue({
                            el: "#loadredeempaymentmethods",
                            data: {
                                redeempayment: dataval
                            },
                            mounted() {
                                this.$nextTick( () => {
                                    document.getElementById("loadredeempaymentmethods").style.display = "block";
                                }
                                );
                            },
                        });
                    });
                },
                loadBasketWeight() {
                    // var filteredValues = pwcheck.filter(value => value === '1' || value === '0');
                    var filteredValues = pwcheck.filter(value => value === '1' || value === '0');
                    if (filteredValues.includes('1')) {
                        $.getJSON("/GLOBALBASK_JSON.html", function(data) {
                            var counter = 1;
                            var codes = data.groups.filter(item => item.weight)// Filter items that have a weight
                            .map( (item, index) => ({
                                weight: item.weight,
                                name: item.name,
                                filteredValue: filteredValues[index % filteredValues.length]// Assign filtered value in a cyclic manner
                            }));
                            // Now filter the codes to only include those with filteredValue '1'
                            codes = codes.filter(code => code.filteredValue === '1');
                            counter = codes.length;
                            loadBaskWeights = new Vue({
                                el: '#loadbasketweight',
                                data: {
                                    loadbaskweight: codes
                                },
                                methods: {
                                    showComma(currentIndex) {
                                        for (let i = currentIndex + 1; i < this.loadbaskweight.length; i++) {
                                            if (this.loadbaskweight[i].filteredValue > 0) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    }
                                },
                                mounted() {
                                    this.$nextTick( () => {
                                        if (codes.length > 0) {
                                            $('#loadbasketweight').show();
                                        }
                                    }
                                    );
                                }
                            });
                        });
                    }

                },
            },
            computed: {},
            mounted() {
                $("#changeAddress").show();
                if (document.readyState === "complete") {
                    this.getEstimatedShipping();
                }
                this.$nextTick( () => {
                    this.loadBasketWeight();
                    this.getEstimatedShipping();
                    // $('.shipcontainer').find('label').css('pointer-events','all');
                    addressState = 1;

                    sessionStorage.setItem("selectedAddress", ShipZip);

                    $("#shippingContainer").show();
                    $("#deliveryAccordianBody").show();
                    if (handleErrors != "error") {
                        $("#submitSelectedDelivery").show();
                    }
                    $(".shippingContentloaderbox").hide();

                    /*close Delivery Section */
                    $("#closeeDeliverty,.closeeDeliverty").click( () => {
                        $("#applycoupon").show();
                        var card = $("#cardDetail span").text();
                        if ($("#cardDetail").text() == "Credit Card") {} else {
                            $("#paymentAccordianBody").show(function() {
                                if ($("#cardDetail span").text() == "" && $("#cardDetail").length > 0) {
                                    $(".changePaymentMethod").text("Change").hide();
                                    $("#changePaymentMethod").text("Change").hide();
                                } else {
                                    $(".changePaymentMethod").text("Change").hide();
                                    $("#changePaymentMethod").text("Change").hide();
                                }

                                if (card.includes("Card ending in") == true) {
                                    $("#paymentAccordianBody").show();
                                    $("#paymentmethodForm").show();
                                }

                                $("#closePaymentMethod").show();
                                $(".deskcolsepaymentmethod").show().removeClass("hidden-lg");
                            });
                        }
                        $(".continueOrder,.newcard").hide();
                        if (window.matchMedia("(max-width: 1023px)").matches) {
                            $(".shipingaccordianContainer,.paymentContainer").show();
                        }
                        // $('input[name="ShippingMethod"]').prop('checked', false);
                        $("#deliveryAccordianBody").hide();
                        $("#changeShipping").show();
                        $("#closeeDeliverty").hide();
                        if (window.matchMedia("(max-width: 600px)").matches) {
                            $("#changeShipping").show();
                        }
                        if ($("#selectedDeliveryContent").children().length > 0) {// $("#continueDeliverymain").show();
                        }

                        //$("#selectedDeliveryContent").show();
                        $("#selectedDelivery #selectedDeliveryContent").show();
                        //$('.selectedDeliveryCousin').hide();
                        $(".selectedDeliveryother").show();

                        /*show update button if shipping is not selected yet */
                        if ($("#selectedDeliveryContent").text() == "") {
                            $("#changeShipping").text("Change");
                        } else {
                            $("#changeShipping").text("Change");
                        }
                        /*show update button if shipping is not selected yet */

                        /* update button text if payment selection is blank */

                        /* update button text if payment selection is blank */

                        if ($("#closeeDeliverty").hasClass("isreviewsectionvisible") == true) {
                            isAccordainopen("isreviewsectionvisible");
                        } else if ($("#closeeDeliverty").hasClass("ispaymentAccordianHeaderVisible") == true) {
                            isAccordainopen("ispaymentAccordianHeaderVisible");
                        } else if ($("#closeeDeliverty").hasClass("isdeliveryAccordianBodyvisible") == true || $("#closeMObAddresssection").hasClass("isdeliveryAccordianBodyvisible") == true) {
                            isAccordainopen("isdeliveryAccordianBodyvisible");
                        }

                        // Added on 18-12-2023
                        console.log("Address State " + addressState + " Shipping State " + DeliveryState + " Payment State " + PaymentState);
                        if (PaymentState == 0) {
                            $(".continueOrder,.newcard,#reviewoderTabContent").hide();
                        } else {
                            $(".continueOrder,.newcard").show();
                            $("#paymentAccordianBody,#paymentmethodForm,#reviewoderTabContent").show();
                        }
                        // Added on 18-12-2023

                        if (PaymentState == 1) {
                            showCheckBox();
                            $("#closePaymentMethod").show();
                        } else {
                            $("#closePaymentMethod").hide();
                        }
                    }
                    );

                    $("#loadcurbsydata").on("hidden.bs.modal", function(e) {
                        if ($(".dayslots.activeslot").text() == "") {
                            $('input[name="ShippingMethod"]:checked').prop("checked", false);
                            $(".methodcard.slectedMethod").removeClass("slectedMethod");
                        }
                    });
                    // getFreeShippingInfo();
                    console.log("Address State " + addressState + " Shipping State " + DeliveryState + " Payment State " + PaymentState);

                    $("body").on("change", "#hdordernote", function() {
                        if ($(this).is(":checked") === true) {
                            $("#hdnotes").val("yes");
                            $(".hdorderlist").show();
                        } else {
                            $("#hdnotes").val("no");
                            $(".hdorderlist").hide();
                        }
                    });
                }
                );
            },
        });
    }).then(function() {
        $(".curbsyShippingRadio").on("click", function() {
            if ($(this).is(":checked") === true) {
                if ($(this).val().includes("Home Delivery") == true && document.querySelector(".basktotal").innerHTML < 50) {
                    $("#new_globalerrorpopups").modal("show");
                } else {
                    getCurbsyDelivery();
                }
            }
        });

        $("#applycoupon").show();

        //LoadCouponForm();

        $("body").on("change", ".shippingMethodRadioNew", function() {
            let selectedShipingName = decodeHtmlCharCodes($(this).attr("shipping-name"));
            var selectedDelivery = "<h5 class='ft-w-6s mb-ft-12p ltr-sp-1s ltr-sp-0p5 ft-md'>" + selectedShipingName + "</h5> <h5 class='estshiptime ft-w-6s mb-ft-12p ltr-sp-1s ltr-sp-0p5 ft-md'>" + $(this).attr("data-estimated-date") + "</h5>";
            $("#showfromattedDate").html(formatDeliveryDate($(this).attr("data-estimated-date")));
            $('input[name="formatted_delivery_date"]').val(formatDeliveryDate($(this).attr("data-estimated-date")));
            $("#selectedDeliveryContentforFedExShipping").html(selectedDelivery);
            $("#selectedDeliveryContent").html(selectedDelivery).hide();
            if (document.querySelector("input[name=curbsy_datanew]") !== null && document.querySelector("input[name=curbsy_datenew]") !== null) {
                document.querySelector("input[name=curbsy_datanew]").value = "";
                document.querySelector("input[name=curbsy_datenew]").value = "";
            }
        });

        $(".methodcard").on("click", function() {
            $(".methodcard").removeClass("slectedMethod");
            $(this).addClass("slectedMethod");
            $("#closeeDeliverty").hide();
        });

        //check for wholesale login
        if ($(".wholesaleuser").text() == 1) {
            var zipcode = $("#hiddenShipZip").val();
            CheckRouteGroup(zipcode);
        }
        if ($('#changeShipping').is(":visible") == true) {
            $('#changeShipping').hide();
        }
    });
}

function getShippingMethods() {
    let url = "/checkout-ajax.html?customerAction=shippingmethods";
    jQuery.ajax({
        url: url,
        type: "POST",
        showLoader: true,
        cache: false,
        beforeSend: function() {
            $(".shippingContentloaderbox").show();
            isLoaderVisible(".selectedAddressloaderbox");
            $("#continueDelivery").hide();
        },
        success: function(data) {
            if (data) {
                $(".shippingContentloaderbox").hide();
                $("#loadShippingSelection").html(data);
                if ($(".new-error-message.error-message").is(':visible') === true) {
                    $(".new-error-message.error-message").delay(2000).fadeOut(500);
                }
                $("#selectedAddress").find(".selectedAddressloaderbox").hide();
                setTimeout(function() {
                    GetDeliveryMethods();
                    updateDetailsTextWithJquery();
                    // checkWineAccountProducts();
                    if (isUserLoggedIn === 1 && document.querySelector('.customertype').value == 'Wholesale') {
                        splitwineorder.viewWineItemsfromBasket();
                    }
                    DeliveryState = 0;
                    PaymentState = 0;
                    document.getElementById("placeOrderBtn").setAttribute("disabled", true);
                    $("#reviewoderTabContent,#selectedDeliveryContent,#paymentAccordianBody").hide();
                    $(".continueOrder,.newcard").hide();
                    $("#cardDetail").find("span").html("");
                }, 500);
            }
        },
    });
}

$("#submitSavedAddress,#submitSavedAddressMobile").click( () => {
    var selectedAddress = sessionStorage.getItem("selectedAddress");
    $("#changeShipping").hide();
    CheckISGuestUuserHasAddress();
    $("#closeMObAddresssection").hide();
    $("#CloseChangeAddress").hide();
    $("#changeAddress").show();
    $("#shipping-payment").hide();
    CheckISGuestUuserHasAddress();
    $("#shippingAddress").hide();
    $("#shippingAccordianBody").hide();
    $(".SavedShipping").show();
    $("#seletedHeaderContent").append('<div style="position: absolute; width: 100%; height: 100%; background: transparent; z-index: 999; top: 0px; bottom: 0px; display: block;" class="selectedAddressloaderbox" hidden=""><div class="loader"></div></div>');
    isLoaderVisible(".selectedAddressloaderbox");
    $(".new-error-message.error-message").hide().html("");

    $("#shippingContent .shippingContentloaderbox").show();

    // 18-12-2023 Changes 4
    if (selectedAddress !== document.getElementById("hiddenShipZip").value) {
        console.log("changes in address selection");
        getShippingMethods();
    } else {
        console.log("no changes in address selection");
        if (DeliveryState == 1) {
            $("#selectedDeliveryContentforFedExShipping").addClass("hidden");
            $(".selectedAddressloaderbox,.shippingContentloaderbox").hide();
            $("#changeShipping").show();
            if (PaymentState == 1) {
                $(".continueOrder,.newcard,#changeShipping").show();
            } else {
                $(".newcard,#changeShipping").show();
            }
            $("#paymentAccordianBody,#paymentmethodForm,#reviewoderTabContent").show();
        } else {
            $("#selectedDeliveryContentforFedExShipping").addClass("hidden");
            $("#selectedDeliveryContentforFedExShipping").addClass("hidden");
            $("#deliveryAccordianBody").show();
            $(".selectedAddressloaderbox,.shippingContentloaderbox").hide();
            $("#shipping-payment").show();
            $("#selectedDeliveryContent").html("");
        }
    }
    // 18-12-2023 Changes 4
}
);

function decodeHtmlCharCodes(str) {
    return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
        return String.fromCharCode(charCode);
    });
}

function getCurbsyDelivery() {
    let url = "/checkout-ajax.html?customerAction=loadcurbsy";
    jQuery.ajax({
        url: url,
        type: "POST",
        showLoader: true,
        cache: false,
        beforeSend: function() {
            $(".shippingContentloaderbox").show();
            isLoaderVisible(".selectedAddressloaderbox");
            $("#continueDelivery").hide();
        },
        success: function(data) {
            if (data) {
                $("#loadcurbsydata").html($(data).find(".modal").html());
                setTimeout(function() {
                    $("#loadcurbsydata").modal({
                        backdrop: "static",
                        keyboard: false
                    }, "show");
                    GetCurbsySLots();
                    $("body").find(".wine_items_check").each(function() {
                        if ($(this).val() == "1" || $(this).val() == "Yes") {
                            $("#hdordernote").attr("disabled", true).parent(".form-rows").addClass("disabled");
                            $(".hdorderlist").hide();
                            $(".hdwinenote").show();
                        }
                    });
                }, 500);
            }
        },
    });
}

$("#Address_Country,#ShipCountry").on("change", function() {
    //$(".add-address-btn").prop("disabled", false);
    var setlength = 0;
    if ($(this).val() == "CA") {
        setlength = 10;
    } else if ($(this).val() == "US") {
        setlength = 5;
    }
    $("#ShipStateSelect,#Address_StateSelect").val("");
    $("#Address_Zip,#ShipZip").val("").attr("maxlength", setlength);
    $(".show-error").hide();
});

function checkExistingShippingandBillingAddress() {
    var setlength = 0;
    $("#Address_Country,#ShipCountry").each(function() {
        //$(".add-address-btn").prop("disabled", false);

        if ($(this).val() == "CA") {
            setlength = 10;
        } else if ($(this).val() == "US") {
            setlength = 5;
        }
        $("#Address_Zip,#ShipZip").attr("maxlength", setlength);
    });
}

function getOtherDiscountinCheckout() {
    basketApp.loadBasket();
    let url = "/checkout-ajax.html?CustomerAction=GetOtherSavings&displayType=raw";
    $.get(url, (response) => {
        $(".showothersavings").html(response);
        sessionStorage.setItem("otherSaving", response);
    }
    );
}

$("body").on("change", ".RewardsavedPaymentMethod", function() {
    // var radioValue = $('option:selected',this).val();
    $(".additionalpaymenterror").hide();
    $("#getfromwhichsection").val("payment");
    var radioValue = $(this).val();
    $("#editcard .modal-body").html("");
    let url = "";
    let dataPost = "";
    if (radioValue == "paypalcp:paypal") {
        $(".paypalmessage").show();
        url = $("#opay_form2").attr("action");
        dataPost = $("#opay_form2").serialize();
    } else {
        $(".paypalmessage").hide();
        url = $("#opay_form2").attr("action");
        dataPost = $("#opay_form2").serialize();
    }

    usedpoints = $("#payment-balance-amount").val();
    // var card = $('option:selected',this).html();
    var img = $(this).attr("data-prompt-src");
    var card = '<img width="30px" src="' + img + '"> ending in ' + $(this).attr("data-prompt-card");
    $("#opay_form").remove();
    jQuery.ajax({
        url: url,
        type: "POST",
        showLoader: true,
        data: dataPost,
        cache: false,
        beforeSend: function() {
            $(".loaderbox").show();
        },
        success: function(data) {
            if (data.trim().search(/class="error-message"/i) != -1 || data.trim().search(/class="information-message"/i) != -1) {
                $(".new-error-message.error-message").show().html($(data).find(".error-message").html());
                $(".new-error-message.error-message").show().html($(data).find(".information-message").html());
                $(".loaderContainer").hide();
            } else {
                if ($("#opay_form2").find(".selectedpoints").val() == "opay_from2") {
                    $("#opay_form").hide();
                }
                if ($("#savedCardDetails").length > 1) {
                    $("#savedCardDetails").html(data);
                } else {
                    $("#savedCardDetails").append(data);
                }
                $(".nonsavedcardnote,.savedcardnote").hide();
                $(".loaderbox").hide();

                $(".savedcardheader").text("Saved Card");
                sessionStorage.setItem("CardValue", radioValue);
                sessionStorage.setItem("Cardlastfourname", card);
                console.log("card name " + sessionStorage.getItem("Cardlastfourname"));
                $(".payment-type-wrapper").addClass("marltp-15s");
                $(".savedcardnote").show();
                sessionStorage.setItem("RewardPoints", "<span>Points " + usedpoints + "\n" + card + "</span>");
                $(".usedpointss").text("Points Used in Dollar  for this transaction $" + usedpoints).show();
                $("#opay_form").show();
                $("#mivapay_frame").css("visibility", "visible");
                $("#cardDetail").html('<p class="redeemededpoints">Redeemed Points $' + usedpoints + "\n" + "</p>" + "<p>" + card + "</p>");
                $("#customerPointsInfo").val("Redeemed Points " + usedpoints);
                var cardnameandnumber = radioValue.replace("paymentcard:", "");
                getCardInforofuser(cardnameandnumber.split("-")[0]);
                $(".btnApply").prop("disabled", true);
                // $('.paymentcardcontainer').show();
                var DiscountApplied = sessionStorage.getItem("DiscountApplied");
                var lastStoredCard = sessionStorage.getItem("CardValue");
                if (DiscountApplied == "yes") {
                    if (lastStoredCard == "mivapay:") {
                        $(".continueOrder").show();
                        $("#paymentmethodForm").show();
                    } else {
                        $(".continueOrder").show();
                        if (radioValue !== "mivapay:") {
                            $("#placeOrderBtn,.placeOrderBtn").prop("disabled", false);
                            PaymentState = 1;
                        }
                        $(".orderSummaryMainContainer").show();
                        // $('#paymentmethodForm').hide();
                        // $('.continueOrder').click();
                    }
                } else {
                    // $('.continueOrder,.newcard').show();
                    if (radioValue !== "mivapay:") {
                        $("#placeOrderBtn,.placeOrderBtn").prop("disabled", false);
                        PaymentState = 1;
                    }
                    $(".orderSummaryMainContainer").show();
                }
            }
            $(".closePaymentMethod,#closePaymentMethod").hide();
            getCreditfeeSummary();
        },
    });
});

/* payment mentod readid selection start*/
$("body").on("change", ".savedPaymentMethod", function() {
    var radioValue = $(this).val();
    if (radioValue == "paypalcp:paypal") {
        $(".paypalmessage").show();
    } else {
        $(".paypalmessage").hide();
    }

    var cardnameandnumber = $(this).attr("data-prompt");
    if (getPaypalFees() === true) {
        $("#getfromwhichsection").val("payment");
        $(".usenewcard").removeAttr("checked");
        if (radioValue == "points:points") {
            // sessionStorage.removeItem("CardValue");
            $(".nonsavedcardnote,.savedcardnote").hide();
            $(".paymentcardcontainer").hide();
            $("#opay_form").hide();
            $(".payment-type-wrapper").addClass("marltp-15s");
        } else {
            $(".paymentcardcontainer").show();
            $(".savedcardnote").show();
            $("#opay_form").show();
            $("#mivapay_frame").css("visibility", "hidden");
        }
        $("#editcard .modal-body").html("");
        let url = $("#opay-saved").attr("action");
        let dataPost = $("#opay-saved").serialize();
        jQuery.ajax({
            url: url,
            type: "POST",
            showLoader: true,
            data: dataPost,
            cache: false,
            beforeSend: function() {
                $(".loaderbox").show();
            },
            success: function(data) {
                if (data.trim().search(/class="error-message"/i) != -1 || data.trim().search(/class="information-message"/i) != -1) {
                    $(".new-error-message.error-message").show().html($(data).find(".error-message").html());
                    $(".new-error-message.error-message").show().html($(data).find(".information-message").html());
                    $(".loaderContainer").hide();
                } else {
                    $("#savedCardDetails").html(data + "");
                    $(".nonsavedcardnote").hide();
                    $(".loaderbox").hide();

                    $(".savedcardheader").text("Saved Card");
                    sessionStorage.setItem("CardValue", radioValue);
                    sessionStorage.setItem("Cardlastfourname", cardnameandnumber);
                    console.log("card name " + sessionStorage.getItem("Cardlastfourname"));
                    if (radioValue != "points:points") {
                        $("#opay_form").show();
                        $("#mivapay_frame").css("visibility", "visible");
                    }

                    if (radioValue == "points:points") {
                        $(".payment-type-wrapper").addClass("marltp-15");
                        if (screen.width > 767 && screen.width <= 768) {
                            $(".removepadding").addClass("marltp-15");
                        }
                        var amounttopay = parseFloat($(".paymentbaskettotal").val()) - parseFloat($(".pointstoreddem").text());
                        $(".finalpay").text(" $" + amounttopay.toFixed(2));
                    } else {
                        $(".removepadding").addClass("nopadding");
                        if (screen.width > 767 && screen.width <= 768) {
                            $(".removepadding").addClass("marltp-15");
                        }
                        $(".payment-type-wrapper").addClass("marltp-15");
                    }
                    $("#payment-balance-amount").change(function() {
                        if ($(this).val() < 0 || $(this).val() == "") {
                            $(".RewardsavedPaymentMethod").css("pointer-events", "none");
                        } else {
                            $(".RewardsavedPaymentMethod").css("pointer-events", "all");
                        }
                    });

                }

                if (radioValue == "points:points") {
                    $(".nonsavedcardnote,.savedcardnote").hide();
                } else {
                    $(".savedcardnote").show();
                }

                if ($("#savedCardDetails").find('input[name="AmountType"]').val() == "total") {
                    $("#placeOrderBtn ,.placeOrderBtn").attr("onclick", "onclick_submit();");
                    var totalPoints = $(".entrietotal").html();
                    sessionStorage.removeItem("RewardPoints");
                    $("#cardDetail").html("<span>Redeemed Points " + totalPoints);
                    $("#customerPointsInfo").val("Redeemed Points " + totalPoints);
                } else {
                    $("#placeOrderBtn , .placeOrderBtn").attr("onclick", "onclick_submit();");
                }
                // 18-12-2023 changes 2
                $("#reviewoderTabContent").hide();
                // 18-12-2023 changes 2
                $(".closePaymentMethod,#closePaymentMethod").hide();
                // $('.continueOrder,.newcard').show();
                if (radioValue !== "mivapay:") {
                    $("#placeOrderBtn,.placeOrderBtn").prop("disabled", false);
                    PaymentState = 1;
                }
                $(".orderSummaryMainContainer").show();
                if (radioValue == "mivapay:") {
                    setTimeout(function() {
                        $("#mivapay_frame").css("visibility", "visible");
                        console.log("open automatically");
                        $("#paymentmodal").modal({
                            backdrop: "static",
                            keyboard: false
                        }, "show");
                    }, 1500);
                }

                setTimeout(function() {
                    getCreditfeeSummary();
                }, 500);
            },
        });
    }

});

function LoadCouponForm() {
    $("body").on("submit", "#applyCouponForm", function(e) {
        e.preventDefault();
        let url = $("#applyCouponForm").attr("action");

        if ($(".discountcodeinput").val() != "" && capitalize($(".discountcodeinput").val()) == $.trim(capitalize($("#sidebarcart-DISCOUNT .col-xs-6").first().text()))) {
            $("#applycoupon .error-message").text("This coupon code has already been applied").show();
            setTimeout(function() {
                $(".discountcodeinput").val("");
                $("#applycoupon .error-message").hide();
            }, 5000);
        } else {
            let dataPost = $("#applyCouponForm").serialize();
            jQuery.ajax({
                url: "/coupon-ajax.html?CustomerAction=coupenRedemption",
                type: "POST",
                showLoader: true,
                data: dataPost,
                cache: false,
                beforeSend: function() {
                    $(".btnApply").addClass("adding");
                    $(".loaderContainer").show();
                    $(".icon").addClass("iconloader");
                    $(".icon").find(".fa-arrow-right").hide();
                },
                success: function(data) {
                    $(".btnApply").removeClass("adding");
                    $(".loaderContainer").hide();
                    $(".couponDisclaimer").show();
                    if (data.trim().search(/class="errormessageshow"/i) != -1) {
                        $(".icon").removeClass("iconloader");
                        $(".icon").find(".fa-arrow-right").show();
                        $("#applycoupon .error-message").text($(data).filter(".errormessageshow").text()).show();
                        return false;
                    } else {
                        $(".showdiscounts").show();
                        getCreditfeeSummary();
                        if (sessionStorage.getItem("isRedeemablePaymentMethod") == "true") {
                            sessionStorage.setItem("DiscountApplied", "yes");
                            var DiscountApplied = sessionStorage.getItem("DiscountApplied");
                            if (DiscountApplied == "yes") {
                                $("#opay").submit();
                            } else {
                                if (DeliveryState == 1) {
                                    $("#opay").submit();
                                }
                            }
                        }
                        if (DeliveryState == 1) {
                            $("#opay").submit();
                        }
                        $("#applycoupon .error-message").text($(data).filter(".successmessageshow").text()).css("color", "#628e83").show();
                        setTimeout(function() {
                            loadorderedProducts();
                        }, 1500);
                        $(".icon").removeClass("iconloader");
                        $(".icon").find(".fa-arrow-right").show();
                    }
                },
            });
        }
    });

    $("body").on("keyup", ".discountcodeinput", function() {
        $("#applycoupon .error-message").hide();
        $("#applyCouponForm").find(".discountcodeinput").val($(this).val());
    });
}

$("body").on("click", "#AdditionalPaymentMethodUsenewCard", function() {
    setTimeout(function() {
        $("#paymentmodal").modal({
            backdrop: "static",
            keyboard: false
        }, "show");
        $("#mivapay_frame").css("visibility", "visible");
    }, 2000);
});
/*address form submit code */

console.log("Address State " + addressState + " Shipping State " + DeliveryState + " Payment State " + PaymentState);
// checkout code merge
/* show error popup if home delivery is less than 30 */
$(document).ready(function() {
    getServerTime();
    function checkHomedelivery() {
        $('input[name="ShippingMethod"]').click(function() {
            var orderSubtotalVal = parseFloat($(".basket-total").text().replace("$", ""));

            if ($(this).val() == "flatrate:Home Delivery" && orderSubtotalVal < 30) {
                var addMore = 30 - orderSubtotalVal;
                addMore = addMore.toFixed(2);

                // aveto cahgne start on home delivary minimum  6-nov-2020
                //  $('#globalerrorpopup .gpoperror').html("We are almost on our way. Please add $" + addMore + " to reach the Home Delivery Order Minimum of $30.00.<br/><a href='/' class='linkbutton' style='white-space: nowrap;max-width: 200px;margin-bottom: -40px;margin-top: 20px;margin-left: 0px;line-height:33px; height:32px;padding-bottom: 2px;'>Continue Shopping</a>");
                $("#new_globalerrorpopup").modal({
                    backdrop: "static",
                    keyboard: false,
                });
                $(".modal-backdrop").css("display", "block");
                $(".cpopupinner").css("display", "inline-block");
                $(".cpopclose").css("height", "28px");
                $(".cpopclose").css("padding", "7px 16px 0px 19px");

                // aveto cahgne start on home delivary minimum end  6-nov-2020
                $("#new_globalerrorpopup .gpoperror").html("<p style='font-size:15px;letter-spacing:1px'>We are almost on our way! Our home delivery order minimum is $30.<br/> <p style='color:#f47a44;font-weight:bold;font-size:15px;letter-spacing:1px'>Place an order of $50 or more and receive FREE Home Delivery!</p></p><a href='/' class='linkbutton' style='white-space: nowrap;max-width: 200px;margin-bottom: -40px;margin-top: 20px;margin-left: 0px;line-height:33px;height:32px;padding-bottom: 2px;'>Continue Shopping</a>");
                $("#new_globalerrorpopup").modal("show");
                return false;
            }
        });
        console.log("Home delivery initiated");
    }
    checkHomedelivery();

    // new code start

    $("#continueDeliverymain").click(function() {
        $("#continueDeliverymain").hide();
        $(".applyDisc").show();
    });

    $("#giftCirticiate,#giftCirticiateMobile").on("submit", function(e) {
        e.preventDefault();
        let url = $("#giftCirticiate").attr("action");
        let dataPost = $("#giftCirticiate").serialize();
        jQuery.ajax({
            url: url,
            type: "POST",
            showLoader: true,
            data: dataPost,
            cache: false,
            beforeSend: function() {
                $(".loaderContainer").show();
            },
            success: function(data) {
                $(".loaderContainer").hide();

                if ($(data).find("#errormessage"))
                    $(".error-message").text($(data).find("#errormessage").text()).show();
                else {
                    location.reload();
                }
            },
        });
    });

    /* end of coupon code*/

    // one page checkout change 12-07-2022//
    $(".continuebtn1").click(function() {
        $("#notessectionmobile").show();
        $("#customerpomobile").show();
    });
    // one page checkout change 12-07-2022 ends//

    /* order summary*/
    $("#mobileArrowUp").click(function() {
        $("#mobileOrderSummary").removeClass("displayNone");
        $("#mobileArrowDown").removeClass("displayNone");
        $("#mobileArrowUp").addClass("displayNone");
        $(".slideCard").addClass("btmFixh300");
        $(".slideCard").removeClass("btmFixh125");
        $(".cart-total").addClass("displayNone");
        $("#notessectionmobile").show();
        $("#customerpomobile").show();
    });
    $("#mobileArrowDown").click(function() {
        $("#mobileOrderSummary").addClass("displayNone");
        $("#mobileArrowDown").addClass("displayNone");
        $("#mobileArrowUp").removeClass("displayNone");
        $(".slideCard").removeClass("btmFixh300");
        $(".slideCard").addClass("btmFixh125");
        $(".cart-total").removeClass("displayNone");
    });

    /* order summary end*/

    $(".couponslist").on("click", function() {
        var coupon = $(this).text();
        $(".discountcodeinput").val(coupon);
        $("#applyCouponForm").on("submit", function(e) {
            e.preventDefault();
            let url = $("#applyCouponForm").attr("action");

            if ($(".discountcodeinput").val() != "" && capitalize($(".discountcodeinput").val()) == $.trim(capitalize($("#sidebarcart-DISCOUNT .col-xs-6").first().text()))) {
                $("#applycoupon .error-message").text("This coupon code has already been applied").show();
                setTimeout(function() {
                    $(".discountcodeinput").val("");
                    $("#applycoupon .error-message").hide();
                }, 5000);
            } else {
                let dataPost = $(".discountcodeinput").val("");
                jQuery.ajax({
                    url: "/coupon-ajax.html?CustomerAction=coupenRedemption",
                    type: "POST",
                    showLoader: true,
                    data: dataPost,
                    cache: false,
                    beforeSend: function() {
                        $(".loaderContainer").show();
                        $(".btnApply").addClass("adding");
                    },
                    success: function(data) {
                        $(".btnApply").removeClass("adding");
                        $(".loaderContainer").hide();
                        $(".couponDisclaimer").show();
                        if (data.trim().search(/class="errormessageshow"/i) != -1) {
                            $("#applycoupon .error-message").text($(data).filter(".errormessageshow").text()).show();
                            setTimeout(function() {
                                $(".discountcodeinput").val("");
                                $("#applycoupon .error-message").hide();
                            }, 5000);
                            return false;
                        } else {
                            $(".showdiscounts").show();

                            $("#applycoupon .error-message").text($(data).filter(".successmessageshow").text()).css("color", "#628e83").show();
                            setTimeout(function() {
                                /*getNewBaskTotal();*/
                                $("#opay").submit();
                            }, 1500);
                        }
                    },
                });
            }
        });
        setTimeout(function() {
            $("#applyCouponForm").submit();
        }, 500);
    });

    $(".savedBillingAddress").each(function() {
        $(".savedBillingAddress").click(function() {
            $("#hiddenBillStateSelect").val($(this).attr("data-state"));
            console.log($(this).attr("data-state"));
        });
    });

    $("body").on("change", "#billing_addressselect", function() {
        $("#hiddenBillStateSelect").val($(this).find("option:selected").attr("data-state"));
        $("#hiddenBillFirstName").val($(this).find("option:selected").attr("data-fname"));
        $("#hiddenBillLastName").val($(this).find("option:selected").attr("data-lname"));
        $("#hiddenBillEmail").val($(this).find("option:selected").attr("data-email"));
        $("#hiddenBillPhone").val($(this).find("option:selected").attr("data-phone"));
        $("#hiddenBillFax").val($(this).find("option:selected").attr("data-fax"));
        $("#hiddenBillCompany").val($(this).find("option:selected").attr("data-fname"));
        $("#hiddenBillAddress1").val($(this).find("option:selected").attr("data-addr1"));
        $("#hiddenBillAddress2").val($(this).find("option:selected").attr("data-addr2"));
        $("#hiddenBillCity").val($(this).find("option:selected").attr("data-city"));
        $("#hiddenBillState").val($(this).find("option:selected").attr("data-state"));
        $("#hiddenBillZip").val($(this).find("option:selected").attr("data-zip"));
        $("#hiddenBillCountry").val($(this).find("option:selected").attr("data-cntry"));
        sessionStorage.removeItem("selectedAddress");
    });

    /*end of get ordr summary detail*/
    $.getJSON("/GLOBALBASK_JSON.html", function(data) {
        $("#OrderSummarymobilesubTotal").text(data.formatted_total);
    });

    getCreditfeeSummary();
    UserAddressDetail();
    $(window).on("load", function() {
        checkOrderSummary();
        UserAddressDetail();
        $("select[name='ShipStateSelect']").css("pointer-events", "none");
        $("select[name='Address_StateSelect']").css("pointer-events", "none");
        $("select[name='ShipStateSelect']").css({
            background: "none!important"
        });
        if ($("#ShipAddress1L").text().length > 1) {
            $(".shippingContentloaderbox").hide();
            if (isUserLoggedIn == 0) {
                getShippingMethods();
            }
            $("#useAddress").show();
            $(".useaddressContainer").removeClass("displayNone");
        } else {
            $("#useAddress").hide();
            $(".shippingContentloaderbox").hide();
        }

        if (screen.width < 1023) {
            $(".revorder").show();
        }

        if ($("#ShipAddress1L:visible").text().length > 0) {
            CheckISGuestUuserHasAddress();
            $("#changeBillingaddress").show();
            $("#changeBillingaddressMobile").show();
        } else {
            $("#changeBillingaddress").hide();
            $("#changeBillingaddressMobile").hide();
        }
    });
    // SHIPPING FUNCTIONALITY

    if ($("#shipFirstNameL").text().length > 1) {
        $("#updateClass").addClass("changeAlignWithSelectedAdd");
    } else {
        $("#updateClass").addClass("changeAlignWithOutSelectedAdd");
    }

    $("#addAddressbtn").on("click", function() {
        $("#changeBillingaddress").show();
        $("#changeBillingaddressMobile").show();
        // $("#shipping-payment").html("");
    });

    $("#continueMobile,.reviewOrder").on("click", function() {
        $(".shipingaccordianContainer").show();
        $(".changePaymentMethod").text("Change");
        $("#changePaymentMethod").text("Change");
        $(".deliveryContainerMobile,.paymentContainer").show();
        $("#applycoupon").show();
        sessionStorage.getItem("RewardPoints");
        /* if(sessionStorage.getItem('RewardPoints') != '' || sessionStorage.getItem('RewardPoints') != null){
                            $('#cardDetail').html(sessionStorage.getItem('RewardPoints'));
                            }*/
        if (screen.width < 1023) {
            $(".changeBtnshowOnlyMobile").show();
        }
        $(".tandc").show();
    });

    /* added new change for mobile add new address and use for billing 02-09-2021 */

    $(".savedshippingAddress").change(function() {
        if ($("#useForBillingMenu").is(":checked")) {
            $(".savedshippingAddress").each(function() {
                if ($(this).is(":checked")) {
                    $("#hiddenShipFirstName,#hiddenBillFirstName").val($(this).attr("data-fname"));
                    $("#hiddenShipLastName,#hiddenBillLastName").val($(this).attr("data-lname"));
                    $("#hiddenShipEmail,#hiddenBillEmail").val($(this).attr("data-email"));
                    $("#hiddenShipPhone,#hiddenBillPhone").val($(this).attr("data-phone"));
                    $("#hiddenShipFax,#hiddenBillFax").val($(this).attr("data-fax"));
                    $("#hiddenShipCompany").val($(this).attr("data-fname"));
                    $("#hiddenShipAddress1,#hiddenBillAddress1").val($(this).attr("data-addr1"));
                    $("#hiddenShipAddress2,#hiddenBillAddress2").val($(this).attr("data-addr2"));
                    $("#hiddenShipCity,#hiddenBillCity").val($(this).attr("data-city"));
                    $("#hiddenShipState,#hiddenBillState").val($(this).attr("data-state"));
                    $("#hiddenShipZip,#hiddenBillZip").val($(this).attr("data-zip"));
                    $("#hiddenShipCountry,#hiddenBillCountry").val($(this).attr("data-cntry"));
                }
            });
        } else {
            $(".savedshippingAddress").each(function() {
                if ($(this).is(":checked")) {
                    $("#hiddenShipFirstName").val($(this).attr("data-fname"));
                    $("#hiddenShipLastName").val($(this).attr("data-lname"));
                    $("#hiddenShipEmail").val($(this).attr("data-email"));
                    $("#hiddenShipPhone").val($(this).attr("data-phone"));
                    $("#hiddenShipFax").val($(this).attr("data-fax"));
                    $("#hiddenShipCompany").val($(this).attr("data-fname"));
                    $("#hiddenShipAddress1").val($(this).attr("data-addr1"));
                    $("#hiddenShipAddress2").val($(this).attr("data-addr2"));
                    $("#hiddenShipCity").val($(this).attr("data-city"));
                    $("#hiddenShipState").val($(this).attr("data-state"));
                    $("#hiddenShipZip").val($(this).attr("data-zip"));
                    $("#hiddenShipCountry").val($(this).attr("data-cntry"));
                }
            });
        }
        /* added new change for mobile add new address and use for billing 02-09-2021 */
        if ($(".useForBillingMenu").is(":checked")) {
            $(".savedshippingAddress").each(function() {
                if ($(this).is(":checked")) {
                    $("#hiddenShipFirstName,#hiddenBillFirstName").val($(this).attr("data-fname"));
                    $("#hiddenShipLastName,#hiddenBillLastName").val($(this).attr("data-lname"));
                    $("#hiddenShipEmail,#hiddenBillEmail").val($(this).attr("data-email"));
                    $("#hiddenShipPhone,#hiddenBillPhone").val($(this).attr("data-phone"));
                    $("#hiddenShipFax,#hiddenBillFax").val($(this).attr("data-fax"));
                    $("#hiddenShipCompany").val($(this).attr("data-fname"));
                    $("#hiddenShipAddress1,#hiddenBillAddress1").val($(this).attr("data-addr1"));
                    $("#hiddenShipAddress2,#hiddenBillAddress2").val($(this).attr("data-addr2"));
                    $("#hiddenShipCity,#hiddenBillCity").val($(this).attr("data-city"));
                    $("#hiddenShipState,#hiddenBillState").val($(this).attr("data-state"));
                    $("#hiddenShipZip,#hiddenBillZip").val($(this).attr("data-zip"));
                    $("#hiddenShipCountry,#hiddenBillCountry").val($(this).attr("data-cntry"));
                }
            });
        } else {
            $(".savedshippingAddress").each(function() {
                if ($(this).is(":checked")) {
                    $("#hiddenShipFirstName").val($(this).attr("data-fname"));
                    $("#hiddenShipLastName").val($(this).attr("data-lname"));
                    $("#hiddenShipEmail").val($(this).attr("data-email"));
                    $("#hiddenShipPhone").val($(this).attr("data-phone"));
                    $("#hiddenShipFax").val($(this).attr("data-fax"));
                    $("#hiddenShipCompany").val($(this).attr("data-fname"));
                    $("#hiddenShipAddress1").val($(this).attr("data-addr1"));
                    $("#hiddenShipAddress2").val($(this).attr("data-addr2"));
                    $("#hiddenShipCity").val($(this).attr("data-city"));
                    $("#hiddenShipState").val($(this).attr("data-state"));
                    $("#hiddenShipZip").val($(this).attr("data-zip"));
                    $("#hiddenShipCountry").val($(this).attr("data-cntry"));
                }
            });
        }
        /* added new change for mobile add new address and use for billing 02-09-2021 */
    });

    $(".savedBillingAddress").change(function() {
        $(".savedBillingAddress").each(function() {
            if ($(this).is(":checked")) {
                $("#hiddenBillFirstName").val($(this).attr("data-fname"));
                $("#hiddenBillLastName").val($(this).attr("data-lname"));
                $("#hiddenBillEmail").val($(this).attr("data-email"));
                $("#hiddenBillPhone").val($(this).attr("data-phone"));
                $("#hiddenBillFax").val($(this).attr("data-fax"));
                $("#hiddenShipCompany").val($(this).attr("data-fname"));
                $("#hiddenBillAddress1").val($(this).attr("data-addr1"));
                $("#hiddenBillAddress2").val($(this).attr("data-addr2"));
                $("#hiddenBillCity").val($(this).attr("data-city"));
                $("#hiddenBillState").val($(this).attr("data-state"));
                $("#hiddenBillZip").val($(this).attr("data-zip"));
                $("#hiddenShipCountry,#hiddenBillCountry").val($(this).attr("data-cntry"));
            }
        });
    });

    var useforloggedin = $(".useforloggedin").text();
    if (useforloggedin == 1 || useforloggedin == 11 || useforloggedin == 111) {
        $("#addnewaddress").click( () => {
            $(".addnewaddress").modal({
                backdrop: "static",
                keyboard: false
            }, "show");
            $("#ShipStateSelect").attr("reqiured", true);
        }
        );
    } else {
        $("#addnewAddress").click( () => {
            $("#addAddressModal").modal('{ backdrop: "static", keyboard: false },show');
            $("#ShipStateSelect").attr("reqiured", true);
        }
        );
    }

    var useforloggedinmob = $(".useforloggedinmob").text();
    if (useforloggedinmob == 1 || useforloggedinmob == 11) {
        $("#addnewaddresss").click( () => {
            $(".addnewaddress").modal({
                backdrop: "static",
                keyboard: false
            }, "show");
            $("#ShipStateSelect").attr("reqiured", true);
        }
        );
    } else {
        $("#addnewAddresss").click( () => {
            $("#addAddressModal").modal("show");
            $("#ShipStateSelect").attr("reqiured", true);
        }
        );
    }

    /* loogedn in user addres submit*/
    $("#savedAddressSumbit,#savedAddressSumbitMobile").click( () => {
        CheckISGuestUuserHasAddress();
        $("#scheduleMobile").hide();
        $("#closeMObAddresssection").hide();
        $("#CloseChangeAddress").hide();
        $(".ChangeShiping").show();
        $("#shipping-payment").hide();
        $("#ocst_form").submit();
        CheckISGuestUuserHasAddress();
        $("#shipFirstNameL").text(`${$("#hiddenShipFirstName").val()},${$("#hiddenShipLastName").val()}`);
        $("#ShipAddress1L").text(`${$("#hiddenShipAddress1").val()},${$("#hiddenShipAddress2").val()}`);
        $("#ShipZipL").text(`${$("#hiddenShipStateSelect").val()} ${$("#hiddenShipZip").val()}`);

        $("#BillFirstNameL").text(`${$("#hiddenBillFirstName").val()},${$("#hiddenBillLastName").val()}`);
        $("#BillAddress1L").text(`${$("#hiddenBillAddress1").val()},${$("#hiddenBillAddress2").val()}`);
        //$('#BillZipL').text(`${$('#hiddenBillStateSelect').val()} ${$('#hiddenBillZip').val()}`)
        //$('#selectedAddress').find('.selectedAddressloaderbox').show();
        /*$('#closeShiping').click();*/
        $(".SavedShipping").hide();
        $("#seletedHeaderContent").append('<div style="position: absolute; width: 100%; height: 100%; background: transparent; z-index: 999; top: 0px; bottom: 0px; display: block;" class="selectedAddressloaderbox" hidden=""><div class="loader"></div></div>');
        isLoaderVisible(".selectedAddressloaderbox");

        $(".new-error-message.error-message").hide().html("");
        $("#selectedDeliveryContent").html("");
        $("#shippingContent .shippingContentloaderbox").show();
    }
    );
    /* loogedn in user addres submit end*/
    $(".savedshippingAddress").each(function() {
        $(".savedshippingAddress").click(function() {
            $("#hiddenShipStateSelect").val($(this).attr("data-state"));
        });
    });

    $("body").on("change", "#shipping_addressselect", function() {
        $("#hiddenShipStateSelect").val($(this).find("option:selected").attr("data-state"));
        $("#hiddenShipFirstName").val($(this).find("option:selected").attr("data-fname"));
        $("#hiddenShipLastName").val($(this).find("option:selected").attr("data-lname"));
        $("#hiddenShipEmail").val($(this).find("option:selected").attr("data-email"));
        $("#hiddenShipPhone").val($(this).find("option:selected").attr("data-phone"));
        $("#hiddenShipFax").val($(this).find("option:selected").attr("data-fax"));
        $("#hiddenShipCompany").val($(this).find("option:selected").attr("data-fname"));
        $("#hiddenShipAddress1").val($(this).find("option:selected").attr("data-addr1"));
        $("#hiddenShipAddress2").val($(this).find("option:selected").attr("data-addr2"));
        $("#hiddenShipCity").val($(this).find("option:selected").attr("data-city"));
        $("#hiddenShipState").val($(this).find("option:selected").attr("data-state"));
        $("#hiddenShipZip").val($(this).find("option:selected").attr("data-zip"));
        $("#hiddenShipCountry").val($(this).find("option:selected").attr("data-cntry"));
        sessionStorage.removeItem("selectedAddress");
    });

    $("#useForBillingMenu").change( (e) => {
        $(".savedshippingAddress").each(function() {
            $(".savedshippingAddress").click(function() {
                $("#hiddenShipStateSelect").val($(this).attr("data-state"));
            });
        });
        $(".savedBillingAddress").each(function() {
            $(".savedBillingAddress").click(function() {
                $("#hiddenBillStateSelect").val($(this).attr("data-state"));
            });
        });

        if (e.target.checked) {
            $("#billingAddContainer *").attr("disabled", "disabled").off("click");
            $("#billingAddContainer").css("color", "grey");
            $("#billingAdd").css("color", "grey");
            $(".savedBillingAddress").each(function() {
                this.checked = false;
            });
            $(".savedshippingAddress").each(function() {
                if ($(this).is(":checked")) {
                    $("#hiddenShipFirstName,#hiddenBillFirstName").val($(this).attr("data-fname"));
                    $("#hiddenShipLastName,#hiddenBillLastName").val($(this).attr("data-lname"));
                    $("#hiddenShipEmail,#hiddenBillEmail").val($(this).attr("data-email"));
                    $("#hiddenShipPhone,#hiddenBillPhone").val($(this).attr("data-phone"));
                    $("#hiddenShipFax,#hiddenBillFax").val($(this).attr("data-fax"));
                    $("#hiddenShipCompany").val($(this).attr("data-fname"));
                    $("#hiddenShipAddress1,#hiddenBillAddress1").val($(this).attr("data-addr1"));
                    $("#hiddenShipAddress2,#hiddenBillAddress2").val($(this).attr("data-addr2"));
                    $("#hiddenShipCity,#hiddenBillCity").val($(this).attr("data-city"));
                    $("#hiddenShipState,#hiddenBillState").val($(this).attr("data-state"));
                    $("#hiddenShipZip,#hiddenBillZip").val($(this).attr("data-zip"));
                    $("#hiddenShipCountry,#hiddenBillCountry").val($(this).attr("data-cntry"));
                }
            });
        } else {
            $("#billingAddContainer *").attr("disabled", false).on("click");
            $("#billingAddContainer").css("color", "black");
            $("#billingAdd").css("color", "black");
        }
    }
    );

    /* added new change for mobile add new address and use for billing 02-09-2021 */
    $(".useForBillingMenu").change( (e) => {
        $(".savedshippingAddress").each(function() {
            $(".savedshippingAddress").click(function() {
                $("#hiddenShipStateSelect").val($(this).attr("data-state"));
                console.log($(this).attr("data-state"));
            });
        });
        $(".savedBillingAddress").each(function() {
            $(".savedBillingAddress").click(function() {
                $("#hiddenBillStateSelect").val($(this).attr("data-state"));
                console.log($(this).attr("data-state"));
            });
        });

        if (e.target.checked) {
            $("#billingAddContainer *").attr("disabled", "disabled").off("click");
            $("#billingAddContainer").css("color", "grey");
            $("#billingAdd").css("color", "grey");
            $(".savedBillingAddress").each(function() {
                this.checked = false;
            });
            $(".savedshippingAddress").each(function() {
                if ($(this).is(":checked")) {
                    $("#hiddenShipFirstName,#hiddenBillFirstName").val($(this).attr("data-fname"));
                    $("#hiddenShipLastName,#hiddenBillLastName").val($(this).attr("data-lname"));
                    $("#hiddenShipEmail,#hiddenBillEmail").val($(this).attr("data-email"));
                    $("#hiddenShipPhone,#hiddenBillPhone").val($(this).attr("data-phone"));
                    $("#hiddenShipFax,#hiddenBillFax").val($(this).attr("data-fax"));
                    $("#hiddenShipCompany").val($(this).attr("data-fname"));
                    $("#hiddenShipAddress1,#hiddenBillAddress1").val($(this).attr("data-addr1"));
                    $("#hiddenShipAddress2,#hiddenBillAddress2").val($(this).attr("data-addr2"));
                    $("#hiddenShipCity,#hiddenBillCity").val($(this).attr("data-city"));
                    $("#hiddenShipState,#hiddenBillState").val($(this).attr("data-state"));
                    $("#hiddenShipZip,#hiddenBillZip").val($(this).attr("data-zip"));
                    $("#hiddenShipCountry,#hiddenBillCountry").val($(this).attr("data-cntry"));
                }
            });
        } else {
            $("#billingAddContainer *").attr("disabled", false).on("click");
            $("#billingAddContainer").css("color", "black");
            $("#billingAdd").css("color", "black");
        }
    }
    );

    /* added new change for mobile add new address and use for billing 02-09-2021 */

    if ($("#useForBillingMenu").is(":checked")) {
        $("#billingAddContainer *").attr("disabled", "disabled").off("click");
        $("#billingAddContainer").css("color", "grey");
        $("#billingAdd").css("color", "grey");
    }

    if ($(".useForBillingMenu").is(":checked")) {
        $("#billingAddContainer *").attr("disabled", "disabled").off("click");
        $("#billingAddContainer").css("color", "grey");
        $("#billingAdd").css("color", "grey");
    }

    // SHIPPING FUNCTIONALITY END

    // // DELIVERY FUNCTIONALITY
    let selectedShiping = "";
    $("#scheduleMobile").click(function() {
        if (!selectedShiping) {
            let iframe = $("#curbsy");

            //find button inside iframe
            let button = iframe.contents().find("#cubsySchedule");
            //trigger button click
            button.trigger("click");
            $(".applyDisc").show();
            $(".shipingaccordianContainer").show();
            $(".deliveryContainerMobile").show();
        }
        //$('#opay').submit();
    });

    $("body").on("click", "#m-curbside,#m-home,#m-truckdelivery,#m-willcall,.checkRadio", function() {
        if ($("[name='ShippingMethod']:checked").val().indexOf("fedex") > 0) {} else {
            $("#fedexMethod").hide();
        }

        // $("#continueDelivery").hide();
        selectedShiping = "";
    });

    $("body").on("click", ".checkRadio", function() {
        $("#scheduleMobile").show();
    });

    jQuery("body").on("click", "#FEDEX_GROUND,#FEDEX_2_DAY,#STANDARD_OVERNIGHT,#m-FEDEX_GROUND,.shippingMethodRadio,.fallbackshippingMethodRadio", function(e) {
        $("#continueDelivery").prop("disabled", false);
        $("#curbsy-div").hide();
        $("#continueDelivery").show();

        /* mobile Schedule submit Form */
        if (window.matchMedia("(max-width: 1023px)").matches) {
            $(".shipingaccordianContainer,.paymentContainer").hide();
            $(".shipingaccordianContainer,.paymentContainer").show();
        }
        /* mobile Schedule submit Form */

        var lengthofcheckbox = 0;
        if ($('#home:checked, :radio[name="rdFruit"]:checked').length || $('#curbcall:checked, :radio[name="rdFruit"]:checked').length || $('#willcallRadio:checked, :radio[name="rdFruit"]:checked').length || $('#truckdelivery:checked, :radio[name="rdFruit"]:checked').length) {
            sessionStorage.setItem("countofcheck", "1");
            checkHomedelivery();
        }
        lengthofcheckbox = sessionStorage.getItem("countofcheck");
        console.log(lengthofcheckbox);
        if (lengthofcheckbox == 1) {
            console.log(lengthofcheckbox);
            /* To select the radio button*/
            $("#curbsy").each(function() {
                this.contentWindow.location.reload(true);
            });
        }

        $("#curbsy").each(function() {
            this.contentWindow.location.reload(true);
        });

        $("#selectedDelivery #selectedDeliveryContent").hide();
    });
    // selectedDelivery

    $("#continueDelivery,#continueDeliverymain").click( () => {
        /*curbsy button click */
        if ($("#curbsy-div").is(":visible") == true) {
            var iframe = $("#curbsy");
            let button = iframe.contents().find("#cubsySchedule");
            button.trigger("click");

            if (iframe.contents().find(".days").hasClass("active") == false) {
                iframe.contents().find("#curbsy-app .error-message").text("Please Select Day Slots").show();
            } else if (iframe.contents().find("#curbsy-app .error-message").is(":visible") && (iframe.contents().find("#curbsy-app .error-message").text() == "Please select an available day" || iframe.contents().find("#curbsy-app .error-message").text() == "Please select a time slot")) {
                console.log("shipping error");
            } else {
                iframe.contents().find("#curbsy-app .error-message").text("");
                iframe.contents().find("#curbsy-app .error-message").hide();
                $(".deskcolsepaymentmethod").show();
                $(".applyDisc").show();
                $(".applyDisc").show();
                $("#opay").submit();

                $("#closePaymentMethod").show();
                $(".deskcolsepaymentmethod").removeClass("hidden-lg");
                $(".deskcolsepaymentmethod").show();
                $(".changePaymentMethod").hide();
            }
        } else {
            $("#selectedDeliveryContent").html($("#selectedDeliveryContentforFedExShipping").html());
            $(".applyDisc").show();
            $("#opay").submit();

            $("#closePaymentMethod").show();
            $(".deskcolsepaymentmethod").removeClass("hidden-lg");
            $(".deskcolsepaymentmethod").show();
            $(".changePaymentMethod").hide();
        }
        $("#opay_form").hide();
        $("#getfromwhichsection").val("shipping");
    }
    );

    // DELIVERY FUNCTIONALITY END

    /* contineu to next tab*/

    // make tabs to slide

    $("body").on("click", ".continueOrder", function() {
        $(".orderSummaryMainContainer").show();
        $("#applyCouponForm").find("input[name=ShippingMethod]").val(sessionStorage.getItem("SelectedShippingMethod"));
        $(".savedPaymentMethobd").each(function() {
            if ($(this).is(":checked")) {
                $("#cardDetail").text("Card ends in " + $(this).attr("data-prompt"));
                if ($("#BillAddress1L").text() == ",") {
                    $("#reviewBillingAddress").text($("#ShipAddress1L").text());
                    console.log($("#ShipAddress1L").text());
                } else {
                    $("#reviewBillingAddress").text($("#BillAddress1L").text());
                }
                if ($("#BillZipL").text() == ",") {
                    $("#reviewBillingZip").text($("#ShipZipL").text());
                    console.log($("#ShipZipL").text());
                } else {
                    $("#reviewBillingZip").text($("#BillZipL").text());
                }
            }
        });

        $("#reviewBillingAddress").text($("#BillAddress1L").text());
        $("#reviewBillingZip").text($("#BillZipL").text());
        $("#reviewFirstName").html($("#shipFirstNameL").text() + '<span class="txt-orange"> - Shipping</span>');
        $("#reviewAddress").text($("#ShipAddress1L").text());
        $("#reviewZip").text($("#ShipZipL").text());
        $("#edit,#back").show();
        $("#reivewSelectedDeliveryMethod").html($("#selectedDelivery").html());
        $("#reviewTab").addClass("active");

        $(".reviewTabMobile").addClass("active");
        $(".orderTabhide").addClass("hidden-sm");
        // $('#notessection').show();
        $("#customerpo").show();

        // $('#placeOrderBtn').prop('disabled',false);
        $("#paymentmethodForm").hide();
        $("#revorder").show();
        $("#revorder").show();
        $("#revorder").removeClass("hideDisplay");
        $("#reviewoderTabContent").show();
        $(".reviewOrder").hide();
        if (screen.width < 1023) {
            $("#closePaymentMethod").hide();
            $(".changePaymentMethod").show();
        }

        $.ajax({
            method: "POST",
            url: "/ajax.html",
            data: {
                CustomerAction: "saveDeliveryDate",
                delivery_date: jQuery("#paymentmethodForm").find('input[name="delivery_date"]').val(),
            },
        }).done(function(msg) {
            console.log("done");
        });

        if ($("#BillAddress1L").text() == "," || $("#BillAddress1L").text() == ", ") {
            $("#reviewBillingAddress").text($("#ShipAddress1L").text());
            console.log($("#ShipAddress1L").text());
        } else {
            $("#reviewBillingAddress").text($("#BillAddress1L").text());
        }
        if ($("#BillZipL").text() == "," || $("#BillZipL").text() == ", ") {
            $("#reviewBillingZip").text($("#ShipZipL").text());
            console.log($("#ShipZipL").text());
        } else {
            $("#reviewBillingZip").text($("#BillZipL").text());
        }

        $(".deskcolsepaymentmethod").hide();
        $(".changePaymentMethod,#changePaymentMethod").show();
        $(".continueOrder,.newcard").hide();
        PaymentState = 1;
        $("#placeOrderBtn,.placeOrderBtn").prop("disabled", false);
        showCheckBox();
        console.log("Address State " + addressState + " Shipping State " + DeliveryState + " Payment State " + PaymentState);
        // 18-12-2023 changes 3
        $("#reviewoderTabContent").show();
        if (isUserLoggedIn == 0) {
            $("#cardDetail").show();
        }
        getCreditfeeSummary();
        // 18-12-2023 changes 3
    });
    /* end contineu to next tab*/

    // $("#edit,#back").click(function () {
    //     //console.log("Hiii");
    //     $('#orderDetailTabContent').show();
    //     $('#reviewoderTabContent').hide();
    //     $('#reviewTab').removeClass('active');
    //     $(".applyDisc").show();
    //     $(".continueOrder ").show();
    //     $(".continuebtn1").show();
    //     $(".placeOrderBtn").hide();
    //     $('.orderSummaryMainContainer').hide();
    //     $(".acordiancardContainer").show(1000);
    //     $("#edit").hide();
    //     $('.reviewTabMobile').removeClass('active');
    //     $('.orderTabMobile').addClass('active');
    //     $('#scheduleMobile').hide();
    // });

    $(".ChangeShiping").on("click", function() {
        $("#closeMObAddresssection").show();
    });

    // new code end

    let tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("checkoutTabContents");
    if (tabcontent[0] !== undefined) {
        tabcontent[0].style.display = "block";
    }
    tablinks = document.getElementsByClassName("checkoutTabLinks");
    tablinks[0].className += " actives";
    if (document.getElementById("show_selected_address") !== null) {
        document.getElementById("show_selected_address").style.display = "none";
    }
    if (document.getElementById("selectPaymentMethods") !== null) {
        document.getElementById("selectPaymentMethods").style.display = "none";
    }
    if (document.getElementById("mobileSelectedAddress") !== null) {
        document.getElementById("mobileSelectedAddress").style.display = "none";
    }
    if (document.getElementById("mobilePaymentDetails") !== null) {
        document.getElementById("mobilePaymentDetails").style.display = "none";
    }
    if (document.getElementById("mobileDeliveryDetails") !== null) {
        document.getElementById("mobileDeliveryDetails").style.display = "none";
    }
    $("#mobileSummary").addClass("displayNone");
    $(".OpcoMobileView #placeOrderBtn").addClass("displayNone");

    $("label").on("click", function() {
        $(this).find("p").css("color", "#f47a44");
    });
});

var checkResidentialShipping = function() {
    if (jQuery("#ShipCompany").val() !== "") {
        jQuery("#ShipResidential").prop("checked", false);
    } else {}
};

function openAddressModal() {
    $("#addAddressModal").modal("show");
}

function openCardModal() {
    $("#addCardModal").modal("show");
}

// function goToReviewOrder() {
//     let tabcontent, tablinks;
//     $(".OpcoOrdersummary").hide();
//     $(".summaryOrder .placeOrderBtn").show();
//     tabcontent = document.getElementsByClassName("checkoutTabContents");
//     if (tabcontent[0] !== undefined) {
//         tabcontent[0].style.display = "block";
//     }
//     tabcontent[1].style.display = "block";
//     tablinks = document.getElementsByClassName("checkoutTabLinks");
//     tablinks[0].className = tablinks[0].className.replace(" active", "");
//     tablinks[1].className += " active";
//     $('.backbtn').removeClass('backbtnHide')
// }
$(".editClass p").click(function() {
    $(".OpcoOrdersummary .applyDisc").show();
    $(".summaryOrder .placeOrderBtn").hide();
    let tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("checkoutTabContents");
    tabcontent[1].style.display = "none";
    if (tabcontent[0] !== undefined) {
        tabcontent[0].style.display = "block";
    }
    tablinks = document.getElementsByClassName("checkoutTabLinks");
    tablinks[1].className = tablinks[0].className.replace(" active", "");
    tablinks[0].className += " active";
    $(".backbtn").addClass("backbtnHide");
});

// function goToMblReviewOrder(type) {
//     if (type === "review_order") {
//         document.getElementById("mblOrderDetails").style.display = "none";
//         document.getElementById("mblReviewOrder").style.display = "block";
//         document.getElementById("continueBtn").style.display = "none";
//         document.getElementById("placeOrderBtn").style.display = "block";
//         $('.OpcoMobileView #placeOrderBtn').removeClass('displayNone');

//     } else {
//         document.getElementById("mblOrderDetails").style.display = "block";
//         document.getElementById("mblReviewOrder").style.display = "none";
//         document.getElementById("placeOrderBtn").style.display = "none";
//         document.getElementById("continueBtn").style.display = "block";
//         $('.OpcoMobileView #placeOrderBtn').addClass('displayNone');
//     }
// }

function is_touch_device() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}
$("body").on("mousedown", ".qtybox", function(event) {
    // do your magic
    if (window.innerWidth < 900 || is_touch_device)
        event.preventDefault();
});

var timer_id = setTimeout(function() {}, 1);

var changeBasketQty = function(element, sign) {
    event.preventDefault();
    var targetInput = $(element).closest(".custom-number-input").find('input[type="text"]');
    //$(targetInput).focus();
    var currentValue = parseInt($.trim($(targetInput).val()));
    //console.log("currentValue" + currentValue);
    var totalQntyAvailable = parseInt($.trim($(targetInput).attr("data-stock")));
    //console.log("totalQntyAvailable" + totalQntyAvailable);
    var qtySize = parseInt($.trim($(targetInput).attr("data-min")));
    //console.log("qtySize" + qtySize);
    var errorMsg = "Sorry, we do not have enough quantity to fill your order.\r\nPlease adjust the quantity and try again. Quantity Available:";
    var remaingQnty = Math.floor(totalQntyAvailable / qtySize);

    if (isNaN(currentValue)) {
        currentValue = 1;
    }

    if (sign === "+") {
        currentValue++;
        if (qtySize * 1 > totalQntyAvailable) {
            $("#globalerrorpopup .gpoperror").html(errorMsg + " " + remaingQnty);
            $("#globalerrorpopup").show();
            return false;
        }
        //console.log("qtySize afet" + qtySize);
        $(targetInput).attr("data-stock", totalQntyAvailable - qtySize);
    } else if (sign === "-") {
        currentValue = currentValue > 2 ? currentValue - 1 : 1;
        $(targetInput).attr("data-stock", totalQntyAvailable + qtySize);
    }

    $(element).closest(".product-row").find(".psubtotal").text("...");

    $(targetInput).val(currentValue);
    clearTimeout(timer_id);
    //console.log("restarting timer");
    timer_id = setTimeout(function() {
        //console.log("updating quantity");
        $(element).closest(".custom-number-input").find(".bask-item-quantity-update-button").click();
    }, 500);
};

/*check if user logged  then load this */
if (isUserLoggedIn == 1) {
    $(window).on("load", function() {
        UserIdleTime();
        $("#STANDARD_OVERNIGHT").children().addClass("paddingZero");
        var allowCheckout = 1;
        console.log("the allowed " + allowCheckout);
        $(".checkoutRequired").each(function() {
            if ($(this).val() === "") {
                allowCheckout = 0;
            }
        });
        if (allowCheckout > 0) {
            setTimeout(function() {
                var basktotal = $(".opco .basktotal").text();
                console.log(basktotal);
                if (basktotal > 0) {}
                if (getPageCode == "opco_new") {
                    getShippingMethods();
                } else {
                    //$('#ocst_form').submit();
                    getShippingMethods();
                }
                console.log("excuted after 500 of page load"),
                500;
            });
        }
        //$('#useAddress').trigger('click');
    });
}
$(window).on("load", function() {
    if ($(".guestaddress").text() == 1) {
        UserIdleTime();
    }
    if ($("#shipFirstNameL").text().length > 1) {
        $("#useForShipping").prop("checked", true);
    }
    if ($("#BillAddress1L").text().length > 1) {
        $("#useForShipping").prop("checked", true);
    }
});
/*check if user logged  then load this */

if (screen.width < 1023) {
    $(".mb-pd-15").find(".mr-bt-3r").removeClass("row");
    $(".continueDelivery").click(function() {
        $(".placeOrderBtn").show();
        //$("#closeeDeliverty").removeClass('txt-right');
    });
}
/*show schedule after active click */
$("#m-curbside,#m-home").click(function() {
    $("#scheduleMobile").show();
});
$("#addnewaddress").on("shown.bs.modal", function(e) {
    $(".divContainer").css("z-index", "1");
});
$(".addnewaddress").on("show.bs.modal", function(e) {
    GoogleAddressVerification("Address_Address1");
});
$("#addnewaddress").on("hidden.bs.modal", function(e) {
    $(".divContainer").css("z-index", "1");
});
$("#addnewaddress").on("show.bs.modal", function(e) {
    $(".divContainer").css("z-index", "1");
});
$("#addnewaddress").on("hide.bs.modal", function(e) {
    $(".divContainer").css("z-index", "1");
});

$(".addnewaddress").on("hidden.bs.modal", function(e) {
    if (document.getElementById("hiddenShipZip").value !== "") {
        $("#seletedHeaderContent,#shippingAccordianBody,#shippingAddress").show();
    }
});

var str = $(".information-message").text();
if (str.includes("Your session has timed out.")) {
    location.reload();
}

$(window).on("load", function() {
    if ($("#OrderSummaryShipping").text() == 0) {
        $("#OrderSummaryShipping").text("$0.00");
    }
});

function CheckZip() {
    if ($("#ShipZip").val() == "") {// $("#addAddressbtn").prop("disabled", true);
    } else {// $("#addAddressbtn").prop("disabled", false);
    }
}

$("#useAddresss").click(function() {
    // $('#ocst_form').submit();
    $("#addnewAddresss").text("Change");
    $("#addnewAddress").text("Change");
});

$("#useAddress").click(function() {
    $("#useAddress").hide();
    $("#addnewAddresss").text("Change");
    $("#addnewAddress").text("Change");
});
/* for guest user */

$("#useAddresss").val("Use this Address");
$("#useAddress").addClass("btnStyle");
$("#useAddress").addClass("btn");
$("#useAddress").addClass("primary-btn");
$("#useAddress").css("height", "31px");

$("#useAddresss").val("Use this Address");
$("#useAddresss").addClass("btnStyle");
$("#useAddresss").addClass("btn");
$("#useAddresss").addClass("primary-btn");
$("#useAddresss").css("height", "31px");

var guestcounter = 1;
$(".checkoutRequired");
$(".checkoutRequired").each(function() {
    if ($(this).val().length > 3) {
        guestcounter++;
    }
});
var useforloggedin = $(".useforloggedin").text();
var useforloggedinmob = $(".useforloggedinmob").text();
if (guestcounter > 1) {
    if (useforloggedin == 0 || useforloggedinmob == 0) {
        $("#addnewAddresss").text("Change");
        $("#addnewAddress").text("Change");
        $(".billing-addresserror").hide();
    }
}
retailcounter = $(".retailcounter").text();
if (retailcounter > 0) {
    location.href = "/?Screen=BASK&Store_Code=G";
}

$(".modal").on("hidden.bs.modal", function(e) {
    $(".modal-backdrop").hide();
});

/* show error popup if home delivery is less than 30 */
// To load iframe
var clickIframe = window.setInterval(checkFocus, 100);
var i = 0;
var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

function checkFocus() {
    if (document.activeElement == document.getElementById("curbsy")) {
        var iframe = $("#curbsy").contents();
        if ($("[name='ShippingMethod']:checked").val() === "flatrate:FR Truck Delivery") {
            /* for fr truck */
            var frtruckcounter = 0;
            iframe.find(".childcard").each(function() {
                frtruckcounter++;
            });
            if (frtruckcounter == 1) {
                setTimeout(function() {
                    iframe.find(".childcard").hide();
                }, 500);
                iframe.find(".childcard").hide();
                iframe.find(".remove-error").click();
                iframe.find(".remove-error").hide();
                iframe.find(".childcard").hide();
                $("#scheduleMobile").show();
                if (screen.width > 900 || $("#curbsy").width() > 900 || orientation === "landscape-primary" || window.matchMedia("(orientation: landscape)").matches) {
                    console.log("yes matched");
                    iframe.find("#cubsySchedule").show();
                }
                console.log("number is" + frtruckcounter);
            }

            iframe.find(".choose").click(function() {
                iframe.find(".childcard").each(function() {
                    frtruckcounter++;
                });
                if (frtruckcounter == 1) {
                    setTimeout(function() {
                        iframe.find(".childcard").hide();
                    }, 500);
                    iframe.find(".childcard").hide();
                    iframe.find(".remove-error").click();
                    iframe.find(".remove-error").hide();
                    iframe.find(".childcard").hide();
                }
            });
            /* for fr truck */
        }

        iframe.find(".curbsytimeFont").click(function() {
            var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
            $("#continueDelivery").prop("disabled", false);
            console.log(orientation);
            let curbsycard = iframe.contents().find(".card");
            $(curbsycard).click(function() {
                iframe.contents().find("#curbsy-app .error-message").text("");
                iframe.contents().find("#curbsy-app .error-message").hide();
            });

            if (screen.width > 900 || $("#curbsy").width() > 900 || orientation === "landscape-primary" || window.matchMedia("(orientation: landscape)").matches) {
                iframe.find("#cubsySchedule").show();
                iframe.find(".scedulebtn").show();
                iframe.find(".scedulebtn").removeClass("hidden-sm");
            }
            $("#scheduleMobile").show();
        });
        window.focus();
    }
}
/* To Check for tab layoout */
var iframe = $("#mivapay_frame").contents();
$("#mvp_exp_year").on("change", function() {
    $(".continueOrder").block();
});

var supportsOrientationChange = "onorientationchange"in window
  , orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function() {
    iframe.find("#cubsySchedule").show();
    iframe.find(".scedulebtn").show();
    iframe.find(".scedulebtn").show();
    iframe.find(".scedulebtn").removeClass("hidden-sm");
    /*location.reload();*/
}, false);
/* To Check for tab layoout */

$("#mivapay_frame").ready(function() {
    function MivaPayFocus() {
        if (document.activeElement == document.getElementById("mivapay_frame")) {
            var mivaframe = $("#mivapay_frame").contents();
            mivaframe.find("#mvp_cardnumber").keyup(function() {
                $("#scheduleMobile").show();
                /*alert();*/
            });
            window.focus();
        }
    }
    MivaPayFocus();
});

$("#curbsy").on("load", function() {
    var iframe = $("#curbsy").contents();
    iframe.find(".curbsytimeFont").click(function() {
        $("#scheduleMobile").show();
        iframe.find("#cubsySchedule").addClass("curbsybutton");
    });
    iframe.find(".days").click(function() {
        $("#scheduleMobile").show();
        iframe.find("#cubsySchedule").addClass("curbsybutton");
    });

    if ($("[name='ShippingMethod']:checked").val() === "flatrate:FR Truck Delivery") {
        /* for fr truck */
        var frtruckcounter = 0;
        iframe.find(".childcard").each(function() {
            frtruckcounter++;
        });
        if (frtruckcounter == 1) {
            setTimeout(function() {
                iframe.find(".active").hide();
            }, 500);
            iframe.find(".childcard").hide();
            iframe.find(".active").hide();
            iframe.find(".remove-error").click();
            iframe.find(".remove-error").hide();
            iframe.find(".childcard").hide();
            $("#scheduleMobile").show();
            iframe.find("#cubsySchedule").show();
            console.log("number is" + frtruckcounter);
        }

        iframe.find(".choose").click(function() {
            iframe.find(".childcard").each(function() {
                frtruckcounter++;
            });
            if (frtruckcounter == 1) {
                iframe.find(".childcard").hide();
                iframe.find(".active").hide();
                iframe.find(".remove-error").click();
                iframe.find(".remove-error").hide();
                iframe.find(".childcard").hide();
            }
        });
        /* for fr truck */
    }

    if ($(".card").hasClass("active")) {
        $("#scheduleMobile").show();
    }

    // show payment method on schedule click
    let curbsybutton = iframe.contents().find("#cubsySchedule");
    let curbsyError = iframe.contents().find("#curbsy-app .error-message").text();
    $(curbsybutton).click(function() {
        setTimeout(function() {
            if (iframe.contents().find(".days").hasClass("active") == false) {
                iframe.contents().find("#curbsy-app .error-message").text("Please Select Day Slots").show();
            } else if (iframe.contents().find("#curbsy-app .error-message").is(":visible") && (iframe.contents().find("#curbsy-app .error-message").text() == "Please select an available day" || iframe.contents().find("#curbsy-app .error-message").text() == "Please select a time slot")) {
                console.log("shipping error");
            } else {
                iframe.contents().find("#curbsy-app .error-message").text("");
                iframe.contents().find("#curbsy-app .error-message").hide();
                $(".deskcolsepaymentmethod").show();
                $(".applyDisc").show();
                // $('#opay').submit();
            }
        }),
        500;
    });
});

var iframe = $("#curbsy").contents();
if ($("[name='ShippingMethod']:checked").val() === "flatrate:FR Truck Delivery") {
    /* for fr truck */
    var frtruckcounter = 0;
    iframe.find(".childcard").each(function() {
        frtruckcounter++;
    });
    if (frtruckcounter == 1) {
        setTimeout(function() {
            iframe.find(".childcard .active").hide();
        }, 500);
        iframe.find(".childcard").hide();
        iframe.find(".remove-error").click();
        iframe.find(".remove-error").hide();
        $("#scheduleMobile").show();
        iframe.find("#cubsySchedule").show();
        console.log("number is" + frtruckcounter);
    }

    iframe.find(".choose").click(function() {
        iframe.find(".childcard").each(function() {
            frtruckcounter++;
        });
        if (frtruckcounter == 1) {
            setTimeout(function() {
                iframe.find(".childcard .active").hide();
            }, 500);
            iframe.find(".childcard").hide();
            iframe.find(".remove-error").click();
            iframe.find(".remove-error").hide();
        }
    });
    /* for fr truck */
}
iframe.find(".curbsytimeFont").click(function() {
    $("#scheduleMobile").show();
    iframe.find("#cubsySchedule").addClass("curbsybutton");
});
iframe.find(".days").click(function() {
    $("#scheduleMobile").show();
    iframe.find("#cubsySchedule").addClass("curbsybutton");
});
document.getElementById("billing_to_show").checked = true;
$(document).ready(function() {
    try {
        fbq("track", "InitiateCheckout");
    } catch (e) {} finally {}
    // Disabling the "Continue" button if inventory is not sufficient start
    var inventaory_count = $(".inventoryCnt").val();
    if (inventaory_count) {
        $(".continue-button .red-button").css({
            "pointer-events": "none",
            "background-color": "#ccc7c7",
        });
    }
    // Disabling the "Continue" button if inventory is not sufficient end
    var shipFirstname = document.getElementById("ShipFirstName");
    var ShipLastName = document.getElementById("ShipLastName");
    if (shipFirstname !== null && ShipLastName !== null) {
        setTimeout(function() {
            document.getElementById("ShipFirstName").focus();
        }, 500);
        // setTimeout(function () {
        //     document.getElementById("ShipLastName").focus();
        // }, 500);
    }
});

/* checkout custom js  Content (custom-component)*/

jQuery(document).ready(function() {
    if ($(".ship-via input:checked").length)
        $(".ship-via input:checked").prop("checked", false);
    window.openCurbsy = function(method) {
        $(".checkoutLoader").removeClass("hideDisplays");
        $(".shippingContentloaderbox").show();
        $("#curbsy").show();
        $("#curbsy").css("opacity", "1");
        $("#curbsy-div").show();
        $("label").css("pointer-events", "none").css("cursor", "not-allowed");
        $("label").on("click", function() {
            $(this).find("p").css("color", "#f47a44");
        });
        /*setTimeout(function() {
            $("#curbsy-div .fa").css("left", $("#curbsy-wrapper").position().left + $("#curbsy-wrapper").width() - 11);
            $("#curbsy-div .fa").css("top", $("#curbsy-wrapper").position().top - 15);
        }, 500);*/

        var selectedCurrentCurbsyMethod = "";

        $("body").on("click", "#m-curbside,#m-willcall,#m-home,#m-truckdelivery", function(e) {
            if ($(this).attr("data-method") == "Curbside Pickup")
                selectedCurrentCurbsyMethod = "Curbside";
            if ($(this).attr("data-method") == "Home Delivery")
                selectedCurrentCurbsyMethod = "Home Delivery";
        });

        setTimeout(function() {
            if (typeof document.curbsyMethod === "function") {
                document.curbsyMethod(method);
            } else {
                console.log(selectedCurrentCurbsyMethod);
                document.curbsyMethod(selectedCurrentCurbsyMethod);
                console.log("iframe error");
            }

            $(".checkoutLoader").addClass("hideDisplays");
            $(".shippingContentloaderbox").hide();
            $("label").css("pointer-events", "all").css("cursor", "pointer");
            $("label").find("p").css("color", "#414042");
            $("#curbsy-div .fa").css("left", $("#curbsy-wrapper").position().left + $("#curbsy-wrapper").width() - 11);
            $("#curbsy-div .fa").css("top", $("#curbsy-wrapper").position().top - 15);
        }, 2000);
    }
    ;

    $("body").on("click", "#m-curbside", function(e) {
        e.preventDefault();
        $(this).find("p").css("color", "#f47a44");
        $("#curbsy").css("opacity", "0");
        if (!document.curbsyMethod) {
            setTimeout(function() {
                openCurbsy("Curbside");
            }, 2000);
        } else {
            openCurbsy("Curbside");
        }
    });
    $("body").on("click", "#m-willcall", function(e) {
        e.preventDefault();
        $(this).find("p").css("color", "#f47a44");
        $("#curbsy").css("opacity", "0");
        if (!document.curbsyMethod) {
            setTimeout(function() {
                openCurbsy("Will Call");
            }, 2000);
        } else {
            openCurbsy("Will Call");
        }
    });
    $("body").on("click", "#m-home", function(e) {
        e.preventDefault();
        $(this).find("p").css("color", "#f47a44");
        $("#curbsy").css("opacity", "0");
        if (!document.curbsyMethod) {
            setTimeout(function() {
                openCurbsy("Home Delivery");
            }, 2000);
        } else {
            openCurbsy("Home Delivery");
        }
    });

    $("body").on("click", "#m-truckdelivery", function(e) {
        e.preventDefault();
        $(this).find("p").css("color", "#f47a44");
        $("#curbsy").css("opacity", "0");
        if (!document.curbsyMethod) {
            setTimeout(function() {
                openCurbsy("FR Truck Delivery");
            }, 2000);
        } else {
            openCurbsy("FR Truck Delivery");
        }
    });

    window.closeCurbsy = function() {
        $("#curbsy-div").css("display", "none");
        var last = localStorage.curbsyLastSelect ? JSON.parse(localStorage.curbsyLastSelect) : {};
        if (!last.method || last.isExpress)
            return $(".ship-via input:checked").prop("checked", false);

        var a = new Date(last.ts);
        var now = new Date();
        if (now - a > 15 * 60000)
            return $(".ship-via input:checked").prop("checked", false);

        if (last.method === "Curbside") {
            var details = "Available on: <span>" + last.date_display + " between " + last.time_display + "</span>";
            $("#m-curbside").find("div").html(details);
            return $("#m-curbside input").prop("checked", true);
        }

        if (last.method === "Will Call") {
            var details = "Available on: <span>" + last.date_display + " between " + last.time_display + "</span>";
            $("#m-willcall").find("div").html(details);
            return $("#m-willcall input").prop("checked", true);
        }

        if (last.method === "Home Delivery") {
            var _details = "Delivery by <span>" + last.date_display + " between " + last.time_display + "</span>";

            $("#m-home").find("div").html(_details);
            return $("#m-home input").prop("checked", true);
        }

        if (last.method === "FR Truck Delivery") {
            var _details = "Delivery by <span>" + last.date_display + " between " + last.time_display + "</span>";

            $("#m-truckdelivery").find("div").html(_details);
            return $("#m-truckdelivery input").prop("checked", true);
        }
    }
    ;

    /* Shipping Discount Solution Start */
    setInterval(function() {
        var selectedSM = $('input[name="ShippingMethod"]:checked').val();
        if (selectedSM != undefined) {
            var curbside = $("body").find("#m-curbside");
            var homedelivery = $("body").find("#m-home");
            var willcall = $("body").find("#m-willcall");
            var frtruck = $("body").find("#m-truckdelivery");
            var last = localStorage.curbsyLastSelect ? JSON.parse(localStorage.curbsyLastSelect) : {};
            if (last && (selectedSM == "flatrate:Curbside Pickup" || selectedSM == "flatrate:Curbside Pickup Express" || selectedSM == "flatrate:Home Delivery Express" || selectedSM == "flatrate:Home Delivery")) {
                var seldate = new Date(last.day);
                var formatteddelivetdate = new Date(last.day);
                seldate = seldate.getFullYear() + "" + ("0" + (seldate.getMonth() + 1)).slice(-2) + "" + ("0" + seldate.getDate()).slice(-2);
                formatteddelivetdate = ("0" + (formatteddelivetdate.getMonth() + 1)).slice(-2) + "/" + ("0" + formatteddelivetdate.getDate()).slice(-2) + "/" + formatteddelivetdate.getFullYear();
                var nowdate = new Date();
                nowdate = nowdate.getFullYear() + "" + ("0" + (nowdate.getMonth() + 1)).slice(-2) + "" + ("0" + nowdate.getDate()).slice(-2);
                //$('#deliveryDateTime').val(seldate);
                //$('input[name="formatted_delivery_date"]').val(formatteddelivetdate);
            } else {//$('#deliveryDateTime').val('');
            }
        }
    }, 100);
    /* Shipping Discount Solution End */
});

/*get Server Time */
function getServerTime() {
    var getTime = $(".getTime").text();
    /*$('.free-shipping').text('The Server time is ' + getTime);*/
}
/*get Server Time */
/*to open address section */
$(".new_addresss,#addnewAddress,#addnewAddresss,#addnewaddress,#changeBillingaddress,#changeBillingaddressMobile").on("click", function() {
    $("#shippingAddress").hide();
    $("#shippingAccordianBody").hide();
    $("#shippingAccordianBody").removeClass("hideDisplay");
    $("#selectedAddress").show();
    // $('#seletedHeaderContent').hide();
    $(".checkoutaddress").show().css("display", "inline-block");
    // GetgusetSession();
    $(".checkoutaddress").addClass("checkoutaddressContainer");
    $("#useAddress").hide();
    $("#closeMObAddresssection").hide();
    $(".changeBtnshowOnlyMobile ").hide();
    $(".addnewAddress").modal();
});
/*to open address section */

$("#closeGusetAddress").on("click", function() {
    $("#seletedHeaderContent").show();
    $(".checkoutaddress").show().css("display", "none");
    $(".checkoutaddress").removeClass("checkoutaddressContainer");
});

$("#viewcartdropdown").on("show.bs.collapse", function() {
    $("#mobileArrDown").css("transform", "rotate(180deg)");
});
$("#viewcartdropdown").on("hide.bs.collapse", function() {
    $("#mobileArrDown").css("transform", "rotate(0deg)");
    $(window).scrollTop(0, 0);
});

function viewCartitems() {
    var $items = $("#viewcartdropdown");

    if ($items.filter(":visible").length == 0) {
        $("#mobileArrDown").css("transform", "rotate(0deg)");
    } else {
        $("#mobileArrDown").css("transform", "rotate(180deg)");
    }
}

$("#mobileArrDown").on("click", function() {
    $("#viewcartdropdown").toggle();
    viewCartitems();
});

function checkvalidcoupen(element) {
    var coupenvalue = $(element).val();
    if (coupenvalue == "") {
        $(".error-message").hide();
    }
}

function SavedShippingAddress(element) {
    if ($("#useForBillingMenu").is(":checked")) {
        $(".savedshippingAddress").each(function() {
            if ($(this).is(":checked")) {
                $(element).find(".savedshippingAddress").prop("checked", true);
                $("#hiddenShipFirstName,#hiddenBillFirstName").val($(this).attr("data-fname"));
                $("#hiddenShipLastName,#hiddenBillLastName").val($(this).attr("data-lname"));
                $("#hiddenShipEmail,#hiddenBillEmail").val($(this).attr("data-email"));
                $("#hiddenShipPhone,#hiddenBillPhone").val($(this).attr("data-phone"));
                $("#hiddenShipFax,#hiddenBillFax").val($(this).attr("data-fax"));
                $("#hiddenShipCompany").val($(this).attr("data-fname"));
                $("#hiddenShipAddress1,#hiddenBillAddress1").val($(this).attr("data-addr1"));
                $("#hiddenShipAddress2,#hiddenBillAddress2").val($(this).attr("data-addr2"));
                $("#hiddenShipCity,#hiddenBillCity").val($(this).attr("data-city"));
                $("#hiddenShipState,#hiddenBillState").val($(this).attr("data-state"));
                $("#hiddenShipZip,#hiddenBillZip").val($(this).attr("data-zip"));
                $("#hiddenShipCountry,#hiddenBillCountry").val($(this).attr("data-cntry"));
            }
        });
    } else {
        $(".savedshippingAddress").each(function() {
            if ($(this).is(":checked")) {
                $("#hiddenShipFirstName").val($(this).attr("data-fname"));
                $("#hiddenShipLastName").val($(this).attr("data-lname"));
                $("#hiddenShipEmail").val($(this).attr("data-email"));
                $("#hiddenShipPhone").val($(this).attr("data-phone"));
                $("#hiddenShipFax").val($(this).attr("data-fax"));
                $("#hiddenShipCompany").val($(this).attr("data-fname"));
                $("#hiddenShipAddress1").val($(this).attr("data-addr1"));
                $("#hiddenShipAddress2").val($(this).attr("data-addr2"));
                $("#hiddenShipCity").val($(this).attr("data-city"));
                $("#hiddenShipState").val($(this).attr("data-state"));
                $("#hiddenShipZip").val($(this).attr("data-zip"));
                $("#hiddenShipCountry").val($(this).attr("data-cntry"));
            }
        });
    }
    /* added new change for mobile add new address and use for billing 02-09-2021 */
    if ($(".useForBillingMenu").is(":checked")) {
        $(".savedshippingAddress").each(function() {
            if ($(this).is(":checked")) {
                $("#hiddenShipFirstName,#hiddenBillFirstName").val($(this).attr("data-fname"));
                $("#hiddenShipLastName,#hiddenBillLastName").val($(this).attr("data-lname"));
                $("#hiddenShipEmail,#hiddenBillEmail").val($(this).attr("data-email"));
                $("#hiddenShipPhone,#hiddenBillPhone").val($(this).attr("data-phone"));
                $("#hiddenShipFax,#hiddenBillFax").val($(this).attr("data-fax"));
                $("#hiddenShipCompany").val($(this).attr("data-fname"));
                $("#hiddenShipAddress1,#hiddenBillAddress1").val($(this).attr("data-addr1"));
                $("#hiddenShipAddress2,#hiddenBillAddress2").val($(this).attr("data-addr2"));
                $("#hiddenShipCity,#hiddenBillCity").val($(this).attr("data-city"));
                $("#hiddenShipState,#hiddenBillState").val($(this).attr("data-state"));
                $("#hiddenShipZip,#hiddenBillZip").val($(this).attr("data-zip"));
                $("#hiddenShipCountry,#hiddenBillCountry").val($(this).attr("data-cntry"));
            }
        });
    } else {
        $(element).find(".savedshippingAddress").prop("checked", true);
        $(".savedshippingAddress").each(function() {
            if ($(this).is(":checked")) {
                $("#hiddenShipFirstName").val($(this).attr("data-fname"));
                $("#hiddenShipLastName").val($(this).attr("data-lname"));
                $("#hiddenShipEmail").val($(this).attr("data-email"));
                $("#hiddenShipPhone").val($(this).attr("data-phone"));
                $("#hiddenShipFax").val($(this).attr("data-fax"));
                $("#hiddenShipCompany").val($(this).attr("data-fname"));
                $("#hiddenShipAddress1").val($(this).attr("data-addr1"));
                $("#hiddenShipAddress2").val($(this).attr("data-addr2"));
                $("#hiddenShipCity").val($(this).attr("data-city"));
                $("#hiddenShipState").val($(this).attr("data-state"));
                $("#hiddenShipZip").val($(this).attr("data-zip"));
                $("#hiddenShipCountry").val($(this).attr("data-cntry"));
            }
        });
    }
    /* added new change for mobile add new address and use for billing 02-09-2021 */
}

function savedBillingAddress(element) {
    $(".savedBillingAddress").each(function() {
        if ($(this).is(":checked")) {
            $(element).find(".savedBillingAddress").prop("checked", true);
            $("#hiddenBillFirstName").val($(this).attr("data-fname"));
            $("#hiddenBillLastName").val($(this).attr("data-lname"));
            $("#hiddenBillEmail").val($(this).attr("data-email"));
            $("#hiddenBillPhone").val($(this).attr("data-phone"));
            $("#hiddenBillFax").val($(this).attr("data-fax"));
            $("#hiddenShipCompany").val($(this).attr("data-fname"));
            $("#hiddenBillAddress1").val($(this).attr("data-addr1"));
            $("#hiddenBillAddress2").val($(this).attr("data-addr2"));
            $("#hiddenBillCity").val($(this).attr("data-city"));
            $("#hiddenBillState").val($(this).attr("data-state"));
            $("#hiddenBillZip").val($(this).attr("data-zip"));
            $("#hiddenShipCountry,#hiddenBillCountry").val($(this).attr("data-cntry"));
        }
    });
}

// started
let storedData = 0;
function showCheckBox() {
    console.log("Address State " + addressState + " Shipping State " + DeliveryState + " Payment State " + PaymentState);
    var wholesaleuser = $(".wholesaleuser").text();
    if (wholesaleuser != 1) {
        $(".wine_items_check").each(function() {
            if ($(this).val() == "1" || $(this).val() == "Yes") {
                storedData = 1;
                return storedData;
            }
        });

        if (storedData === 1) {
            $("#min-age").show();
            $("#spaceleft").addClass("leftspace");
            $("#placeOrderBtn,.placeOrderBtn").attr("disabled", "disabled");
            $("#restrict").on("change", function() {
                if ($(this).is(":checked")) {
                    $("#min-age").css("color", "#414042");
                    $(".wine_items_check").each(function() {
                        $(this).val(2);
                        storedData = 2;
                        return storedData;
                    });
                    $("#age_restriction").val("Yes");
                    $("#placeOrderBtn,.placeOrderBtn").removeAttr("disabled");
                    if (PaymentState == 1) {
                        $("#placeOrderBtn,.placeOrderBtn").removeAttr("disabled");
                    } else {
                        $("#placeOrderBtn,.placeOrderBtn").attr("disabled", "disabled");
                    }
                } else if ($(this).not(":checked")) {
                    $(".wine_items_check").each(function() {
                        $(this).val(1);
                    });
                    $("#placeOrderBtn,.placeOrderBtn").attr("disabled", "disabled");
                }
            });
        } else {/*$('#min-age').hide();*/
        }
    }
    console.log(storedData);
    return storedData;
}

if (location.href.includes("utm_source=login")) {
    window.location = window.location.pathname + "?Screen=OPCO&Order=0";
    checkOrderSummary();
}

const checkOrderSummary = () => {
    var isredeemed = "";
    if ($("#redeemablebalance").is(":checked") == true) {
        isredeemed = "true";
    } else {
        isredeemed = "";
    }
    let url = "/ajax.html?CustomerAction=getbasketcharges&displayType=raw&redeemed=" + isredeemed;
    $.get(url, (response) => {/*$('#showbasketCharges').html(response);
        $('#mobileOrderSummary').html(response);
        $('#mobTotal').text($('#OrderSummaryTotal').text());*/
    }
    );
}
;

function getThreebieDiscountinCheckout() {
    basketApp.loadBasket();
    let url = "/checkout-ajax.html?CustomerAction=GetThreebiefromBask&displayType=raw";
    $.get(url, (response) => {
        $(".showthreebiediscount").html(response);
        sessionStorage.setItem("threebieSavings", response);
    }
    );
}

/*
var checkoutCounter = 0;
timeCounter = 20; 
let Timer = setInterval(function(){
    checkoutCounter++;
    if(checkoutCounter == 3585){ 
        timeCounter--;
        playAudio();
        $('#timeupmodal').modal('show');
        $('.showtimer').html(timeCounter);
        setInterval(function(){timeCounter--; $('.showtimer').html(timeCounter);
        if(timeCounter == 0){
            location.href = '/?Screen=BASK&Store_Code=G';
            clearInterval(Timer);  
        }
        },1000);
    }
    if(checkoutCounter >= 3600){
        location.href = '/?Screen=BASK&Store_Code=G';
        clearInterval(Timer);
        $('#timeupmodal').modal('hide');
    }
},1000);
*/

function removeCoupon(couponcode) {
    setTimeout(function() {
        jQuery.ajax({
            url: `/majax.html?Action=RCPNM&Coupon_code=${couponcode}`,
            type: "POST",
            showLoader: true,
            cache: false,
            beforeSend: function() {},
            success: function(data) {
                if (data.message == "Coupon removed") {
                    $(".showdiscounts").show();
                    if (PaymentState == 1 || DeliveryState == 1) {
                        showCheckBox();
                        $("#opay").submit();
                    }
                    // $('#opay').submit();
                    sessionStorage.removeItem("DiscountApplied");
                    loadorderedProducts();
                    setTimeout(function() {
                        $("#applycoupon").find(".error-message").html("");
                        $(".discountcodeinput").val("");
                        $("#cardDetail").find(".redeemededpoints").html("Redeemed Points " + $("#redee").find("#OrderSummaryShipping").text() + "");
                    }, 1500);
                    getCreditfeeSummary();
                    localStorage.removeItem('couponcode');
                    if ($('#loadShippingSelection').length > 0) {
                        $('#changeShipping').hide();
                        getShippingMethods();
                        $("#changeShipping").click();
                    }
                }
                $('#changeShipping').hide();
            },
        });
    }, 1000);
}

var alerts = document.getElementById("alert");
function playAudio() {
    alerts.play();
}

/*for payment selection once click use new card */
function loadPaymentMethod() {
    sessionStorage.removeItem("CardValue");
    $("#cardDetail span").text("");
    setTimeout(function() {
        $("#opay").submit();

        $("#opay_form").removeClass("hidden");
        $(".payment-type-wrapper").removeClass("marltp-15");
        if ($("#payment_selection").hasClass("showcard") == true) {
            $("#opay_form").show();
            $("#mivapay_frame").css("visibility", "visible");
        }
    }, 1000);

    setTimeout(function() {
        if ($("#payment_selection").hasClass("showcard") == true) {
            $("#opay_form").show();
            $("#mivapay_frame").css("visibility", "visible");
        }
        $("#opay_form").removeClass("hidden");
        $(".usenewcard").prop("checked", true);
    }, 2500);
}
/*for payment selection once click use new card */

function TDate(getdate) {
    var UserDate = new Date(getdate);
    var ToDate = new Date();
    if (UserDate.setHours(0, 0, 0, 0) < ToDate.setHours(0, 0, 0, 0)) {
        /*alert("The Date must be Bigger or Equal to today date");*/
        $(".showErrorDate").html(UserDate);
        $("#DeliveryDateErrorModal").modal("show");
        return false;
    } else if ($("#selectedDeliveryContent").html() == "") {
        $("#DeliveryDateErrorModal").modal("show");
        return false;
    }
    return true;
}

function CheckGuestUserShippingDetails() {
    if ($("#shipFirstNameL").text() != " ") {
        $("#add_address_for_guest").find(".modal-headers").find("label").text("Shipping Address");
        $("#ShipFirstName").val(`${$("#hiddenShipFirstName").val()}`);
        $("#ShipLastName").val(`${$("#hiddenShipLastName").val()}`);
        $("#ShipEmail").val(`${$("#hiddenShipEmail").val()}`);
        $("#ShipPhone").val(`${$("#hiddenShipPhone").val()}`);
        $("#useForShipping").css("pointer-events", "none").css("display", "none");
        $("#useForBilling").css("pointer-events", "none").css("accent-color", "grey");
        $("#useForShipping").prop("disabled", false);
        $("#useForBilling").prop("disabled", true);
        $(".shippingandbillincontainer").hide();
        $("#addresstext").html("Shipping Address");
        $("#ShipAddress1").val(`${$("#hiddenShipAddress1").val()}`);
        $("#ShipAddress2").val(`${$("#hiddenShipAddress2").val()}`);
        $("#ShipCity").val($("#hiddenShipCity").val());
        $("#ShipZip").val($("#hiddenShipZip").val());
        $("#ShipStateSelect").val($("#hiddenShipStateSelect").val()).prop("selected", true);
        $("#ShipCountry").val($("#hiddenShipCountry").val()).prop("selected", true);
        $("#changeShipping").hide();
        $(".validateAddressForm").css("visibility", "hidden");
        checkExistingShippingandBillingAddress();
    }
}

function CheckGuestUserSBillingDetails() {
    if ($("#BillFirstNameL").text() != "\n") {
        $("#add_address_for_guest").find(".modal-headers").find("label").text("Billing Address");
        $("#ShipFirstName").val(`${$("#hiddenBillFirstName").val()}`);
        $("#ShipLastName").val(`${$("#hiddenBillLastName").val()}`);
        $("#ShipEmail").val(`${$("#hiddenBillEmail").val()}`);
        $("#ShipPhone").val(`${$("#hiddenBillPhone").val()}`);
        $("#useForBilling").css("pointer-events", "none").css("display", "none");
        $("#useForShipping").css("pointer-events", "none").css("accent-color", "grey");
        $("#useForShipping").prop("disabled", true);
        $("#useForBilling").prop("disabled", false);
        $(".shippingandbillincontainer").hide();
        $("#addresstext").html("Billing Address");
        $("#ShipAddress1").val(`${$("#hiddenBillAddress1").val()}`);
        $("#ShipAddress2").val(`${$("#hiddenBillAddress2").val()}`);
        $("#ShipCity").val($("#hiddenBillCity").val());
        $("#ShipZip").val($("#hiddenBillZip").val());
        $("#ShipStateSelect").val($("#hiddenBillStateSelect").val()).prop("selected", true);
        $("#ShipCountry").val($("#hiddenBillCountry").val()).prop("selected", true);
        $("#changeShipping").hide();
        $(".validateAddressForm").css("visibility", "hidden");
        checkExistingShippingandBillingAddress();
    }
}

function CheckISGuestUuserHasAddress() {
    $("#shipFirstNameL").text(`${$("#hiddenShipFirstName").val()} ${$("#hiddenShipLastName").val()}`);
    $("#ShipAddress1L").text(`${$("#hiddenShipAddress1").val()},${$("#hiddenShipAddress2").val()}`);
    $("#ShipZipL").text(`${$("#hiddenShipCity").val()},${$("#hiddenShipStateSelect").val()} ${$("#hiddenShipZip").val()}`);
    $("#BillFirstNameL").text(`${$("#hiddenBillFirstName").val()} ${$("#hiddenBillLastName").val()}`);
    $("#BillAddress1L").text(` ${$("#hiddenBillAddress1").val()}, ${$("#hiddenBillAddress2").val()} ${$("#hiddenBillCity").val()}, ${$("#hiddenBillStateSelect").val()}  ${$("#hiddenBillZip").val()}`);
    $(".shippingandbillingsection").removeClass("shippingandbillingsection");
}

function UserAddressDetail() {
    $("body").css("visibility", "visible");
    if ($("#hiddenShipAddress1").val() == "" && isUserLoggedIn == 1) {
        $(".shippingandbillingsection").hide();
    } else {
        $(".shippingandbillingsection").show();
    }
}

function GusetSession() {
    sessionStorage.setItem("guestaddress", $("#ShipAddress1").val());
    sessionStorage.setItem("guestoptionaladdress", $("#ShipAddress2").val());
    sessionStorage.setItem("guestCity", $("#ShipCity").val());
    sessionStorage.setItem("guestState", $("#ShipStateSelect").val());
    sessionStorage.setItem("guestzipcode", $("#ShipZip").val());
}

function GetgusetSession() {
    sessionStorage.getItem("guestaddress");
    sessionStorage.getItem("guestoptionaladdress");
    sessionStorage.getItem("guestCity");
    sessionStorage.getItem("guestzipcode");
    sessionStorage.getItem("guestState");

    $("#Address_Address1").val(sessionStorage.getItem("guestaddress"));
    $("#Address_City").val(sessionStorage.getItem("guestCity"));
    $("#Address_Zip").val(sessionStorage.getItem("guestzipcode"));
    $("#Address_StateSelect").val(sessionStorage.getItem("guestState"));
}

function removeGUestSession() {
    sessionStorage.removeItem("guestaddress");
    sessionStorage.removeItem("guestoptionaladdress");
    sessionStorage.removeItem("guestCity");
    sessionStorage.removeItem("guestzipcode");
    sessionStorage.removeItem("guestState");
}

var url_strings = window.location.href;
var filename = url_strings.split("/").pop();
var urls = new URL(url_strings);
var checkurl = urls.searchParams.get("isprofileupdated");
if (checkurl == "yes") {
    $("#addnewaddress").click();
}

function isLoaderVisible(element) {
    if ($(element).is(":visible") === true) {
        $(".shippingContentloaderbox").hide("fast");
    }
}

function updateCartDetails() {
    $.get("/ajax.html?CustomerAction=getbasketcharges", function(data) {
        var basketDataGet = JSON.parse(data);
        for (var key in basketDataGet) {
            if (key.includes("BasketTotal")) {
                $(".basket-total span,#mobTotal").text(basketDataGet[key]);
                if (retailcounter > 0) {} else {
                    $(".formatted_total").text(basketDataGet[key]);
                    BasketDiscount();
                }
            }
        }
    });
}

function getBasketCharges(callback) {
    var shippingcost = '';
    $.get("/ajax.html?CustomerAction=getbasketcharges", function(data) {
        var basketDataGet = JSON.parse(data);
        for (var key in basketDataGet) {
            if (key.includes('Shipping')) {
                shippingcost = basketDataGet[key];
            }
        }
        callback(shippingcost);
    });
}

// $('body').on('change', '.RewardsavedPaymentMethod', function () {
//     // var radioValue = $('option:selected',this).val();
//     $('.additionalpaymenterror').hide();
//     $('#getfromwhichsection').val('payment');
//     var radioValue = $(this).val();
//     $('#editcard .modal-body').html('');
//     let url = $('#opay_form2').attr('action');
//     let dataPost = $('#opay_form2').serialize();
//     let usedpoints = $('#payment-balance-amount').val();
//     // var card = $('option:selected',this).html();
//     var img = $(this).attr('data-prompt-src');
//     var card = '<img width="30px" src="'+img+'"> ending in '+$(this).attr('data-prompt-card');
//     $('#opay_form').remove();
//     jQuery.ajax({
//         url: url,
//         type: "POST",
//         showLoader: true,
//         data: dataPost,
//         cache: false,
//         beforeSend: function () {
//             $(".loaderbox").show();
//         },
//         success: function (data) {
//             if (data.trim().search(/class="error-message"/i) != -1 || data.trim().search(/class="information-message"/i) != -1) {
//                 $('.new-error-message.error-message').show().html($(data).find('.error-message').html());
//                 $('.new-error-message.error-message').show().html($(data).find('.information-message').html());
//                 $(".loaderContainer").hide();
//             }else{
//                 /*alert();*/
//                 if($('#opay_form2').find('.selectedpoints').val() == 'opay_from2'){
//                     $('#opay_form').hide();
//                 }
//             $('#savedCardDetails').append(data);
//             if($('.selectedPaymentMethods').length > 1 ) {
//                 /*alert(1)*/
//             // $('.selectedPaymentMethods')[0].remove();
//             }
//             $('.nonsavedcardnote,.savedcardnote').hide();
//             $(".loaderbox").hide();
//             getCreditfeeSummary();
//             $('.savedcardheader').text('Saved Card');
//             $('.placeOrderBtn').show();
//             sessionStorage.setItem("CardValue", radioValue);
//             $(".payment-type-wrapper").addClass('marltp-15');
//             $('.savedcardnote').show();
//             sessionStorage.setItem("RewardPoints",'<span>Points ' + usedpoints + '\n'  + card + '</span>');
//             $('.usedpointss').text('Points Used in Dollar  for this transaction $'+usedpoints).show();
//             $('#opay_form').show();
//             $("#mivapay_frame").css('visibility','visible');
//             $('#cardDetail').html('<p>Redeemed Points $' + usedpoints + '\n'  +'</p>' + '<p>' + card + '</p>' );
//             $('#customerPointsInfo').val('Redeemed Points ' + usedpoints);
//             var cardnameandnumber = radioValue.replace('paymentcard:','');
//             getCardInforofuser(cardnameandnumber.split('-')[0]);
//             $('.btnApply').prop('disabled',true);
//             // $('.paymentcardcontainer').show();
//             }
//         }
//     });
// });

function isWhole(n) {
    return /^\d+$/.test(n);
}

var onclick_submit1 = function(event) {
    let checkout_store_data = showCheckBox();

    if (checkout_store_data == 1) {// Do Nothing
    } else {
        var showfromattedDate = $("#showfromattedDate").html();
        if (TDate(showfromattedDate) == false) {} else {
            var form = document.getElementById("opay_form2");
            form.submit();
        }
    }
};

function getCardInforofuser(id) {
    jQuery.ajax({
        url: "/cudet.html?CustomerAction=getPaymentInfo&payment_id=" + id,
        success: function(card) {
            $("#customerPaymentInfo").val(card);
        },
    });
}

function CalculatePointsThreshold() {
    var basketTotal = $("#baskettotal").val();
    var points = $("#newpaymentbalance").val();
    var redeemalamount = $("#payment-balance-amount").val();
    var newbasketTotal = $("#newbasketTotal").val();
    var newtotal = "";

    if (parseFloat(points) >= parseFloat(basketTotal)) {
        newtotal = parseFloat(basketTotal) - (1 / 100) * parseFloat(basketTotal);
        var newtotalamount = newtotal.toFixed(2);
        console.log("max we can take " + newtotal);
        $(".showerrormessage").text("Max Redeemable amount " + newtotalamount).show();
        //  $('#payment-balance-amount').val(newtotalamount);
        $("#newbasketTotal").val(newtotalamount);
    }

    if (parseFloat(redeemalamount) >= parseFloat(basketTotal)) {
        newtotal = parseFloat(basketTotal) - (1 / 100) * parseFloat(basketTotal);
        var newtotalamount = newtotal.toFixed(2);
        console.log("max we can take " + newtotal);
        $(".showerrormessage").text("Max Redeemable amount  " + newtotalamount).show();
        $("#newbasketTotal").val(newtotalamount);
        $(".RewardsavedPaymentMethod").css("pointer-events", "none");
        $(".RewardsavedPaymentMethod").prop("disabled", true);
        //  $('#payment-balance-amount').val(newtotalamount);
    } else if (parseFloat(redeemalamount) > parseFloat(newbasketTotal)) {
        newtotal = parseFloat(basketTotal) - (1 / 100) * parseFloat(basketTotal);
        var newtotalamount = newtotal.toFixed(2);
        console.log("max we can take " + newtotal);
        $(".showerrormessage").text("Max Redeemable amount " + newtotalamount).show();
        $(".RewardsavedPaymentMethod").prop("disabled", true);
        $("#newbasketTotal").val(newtotalamount);
        //  $('#payment-balance-amount').val(newtotalamount);
    } else {
        $(".showerrormessage").text("Max Redeemable amount " + newtotalamount).hide();
        $(".RewardsavedPaymentMethod").css("pointer-events", "all");
        $(".RewardsavedPaymentMethod").prop("disabled", false);
    }
}

function getNewBaskTotal() {
    jQuery.ajax({
        url: "/ajax.html?CustomerAction=getbasketcharges",
        type: "POST",
        showLoader: true,

        cache: false,
        beforeSend: function() {
            $(".loaderContainer").show();
            $(".btnApply").addClass("adding");
        },
        success: function(data) {
            var newdata = jQuery.parseJSON(data);
            var baskettotal = newdata.BasketTotal.replace("$", "");
            $("#baskettotal").val(baskettotal);
            setTimeout(function() {
                CalculatePointsThreshold();
                $(".showerrormessage").text("").hide();
                var newtotalamount = $("#newbasketTotal").val();
                $("#payment-balance-amount").val(newtotalamount);
                $(".paymentbaskettotal").val(baskettotal);
                var newbasketTotal = $(".paymentbaskettotal").val();
                var newremdeem = parseFloat(newbasketTotal) - (1 / 100) * parseFloat(newbasketTotal);
                $(".pointstoreddem").text(newremdeem.toFixed(2));
            }, 1500);
        },
    });
}

function UserIdleTime() {
    var counter = 1;
    var TotalCounter = $("#countdowntime").val();
    var checkoutcounter = $("#countdowntime").val();
    var message = "You will be redirected to cart page as your session was idle for too long";
    var timer = setInterval(function() {
        if (counter <= TotalCounter) {
            var showTimer = new Date(checkoutcounter-- * 1000).toISOString().slice(14, -5);
            $(".checkoutcounter").text("Please complete order within " + showTimer);
            /*document.title = 'Checkout | ' + showTimer;*/
            /*$('title').append(+new Date(checkoutcounter-- * 1000).toISOString().slice(14, -5));*/
        } else {
            //  location.reload();
            clearInterval(timer);
            $("#customerIdleTimeModal").modal("hide");
            location.href = "/?Screen=BASK&Store_Code=G";
        }
        if (counter > TotalCounter - 5) {
            $("#showidletimeerror").html(message);
            $("#customerIdleTimeModal").modal("show");
        }
        counter++;
    }, 1000);
}

function getcurrentTime(datetime) {
    var gettime = "";
    var url = "";
    if (datetime == "day") {
        url = "/cudet.html?CustomerAction=getcurrentday";
    } else if (datetime == "tomorrow") {
        url = "/cudet.html?CustomerAction=getTomorrowDate";
    } else if (datetime == "unix") {
        url = "/cudet.html?CustomerAction=getcurrenttimeunix";
    } else if (datetime != "time") {
        url = "/cudet.html?CustomerAction=getcurrentDate";
    } else {
        url = "/cudet.html?CustomerAction=getcurrenttime";
    }
    jQuery.ajax({
        url: url,
        async: false,
        type: "POST",
        showLoader: true,
        cache: false,
        success: function(data) {
            /*console.log(data);*/
            gettime = data;
        },
    });
    return gettime.replaceAll("\r", "");
}

$("#customerIdleTimeModal").on("hidden.bs.modal", function(e) {
    location.href = "/?Screen=BASK&Store_Code=G";
});

$("#DeliveryDateErrorModal").on("hidden.bs.modal", function(e) {
    location.reload();
});

// when the user loses focus
window.addEventListener("blur", () => {
    console.log("outside new Tab");
}
);

// when the user's focus is back to your tab (website) again
window.addEventListener("focus", () => {
    console.log("Same Page");
}
);

// Broadcast that you're opening a page.
localStorage.openpages = Date.now();
var onLocalStorageEvent = function(e) {
    if (e.key == "openpages") {
        // Listen if anybody else is opening the same page!
        localStorage.page_available = Date.now();
    }
    if (e.key == "page_available") {//alert("One more page already open");
    }
};
window.addEventListener("storage", onLocalStorageEvent, false);

function ApplyCoupon(elemet) {
    var coupon = elemet.target.innerHTML.replaceAll("<h1>", "").replaceAll("</h1>");
    $(".discountcodeinput").val(coupon);
    $("#applyCouponForm").on("submit", function(e) {
        e.preventDefault();
        let url = $("#applyCouponForm").attr("action");

        if ($(".discountcodeinput").val() != "" && capitalize($(".discountcodeinput").val()) == $.trim(capitalize($("#sidebarcart-DISCOUNT .col-xs-6").first().text()))) {
            $("#applycoupon .error-message").text("This coupon code has already been applied").show();
            setTimeout(function() {
                $(".discountcodeinput").val("");
                $("#applycoupon .error-message").hide();
            }, 5000);
        } else {
            let dataPost = $(".discountcodeinput").val("");
            jQuery.ajax({
                url: "/coupon-ajax.html?CustomerAction=coupenRedemption",
                type: "POST",
                showLoader: true,
                data: dataPost,
                cache: false,
                beforeSend: function() {
                    $(".loaderContainer").show();
                    $(".btnApply").addClass("adding");
                },
                success: function(data) {
                    $(".btnApply").removeClass("adding");
                    $(".loaderContainer").hide();
                    $(".couponDisclaimer").show();
                    if (data.trim().search(/class="errormessageshow"/i) != -1) {
                        $("#applycoupon .error-message").text($(data).filter(".errormessageshow").text()).show();
                        setTimeout(function() {
                            $(".discountcodeinput").val("");
                            $("#applycoupon .error-message").hide();
                        }, 5000);
                        return false;
                    } else {
                        $(".showdiscounts").show();
                        getCreditfeeSummary();
                        $("#applycoupon .error-message").text($(data).filter(".successmessageshow").text()).css("color", "#628e83").show();
                        setTimeout(function() {
                            /*getNewBaskTotal();*/
                            $("#opay").submit();
                        }, 1500);
                    }
                },
            });
        }
    });
    setTimeout(function() {
        $("#applyCouponForm").submit();
    }, 500);
}

const getRedeemedOrderSummary = () => {
    let url = "/ajax.html?CustomerAction=getbasketcharges&displayType=raw&redeemed=true";
    $.get(url, (response) => {
        $("#showbasketCharges").html(response);
        if (screen.width < 768) {
            $("#mobileOrderSummary").html(response);
        }
        $("#mobTotal").text($("#OrderSummaryTotal").text());
    }
    );
}
;

// guest popup open
$(document).ready(function() {
    if (document.getElementById("hiddenShipZip").value == "") {
        $(".addnewAddress").modal({
            backdrop: "static",
            keyboard: false
        }, "show");
    }
});

$("body").on("click", ".closeguestaddress", function() {
    if (DeliveryState == 1) {
        $("#changeShipping").show();
    } else {
        $("#changeShipping").hide();
    }
});

$(".addnewAddress").on("hidden.bs.modal", function(e) {
    if (isUserLoggedIn == 0) {
        if (DeliveryState == 1) {
            $("#changeShipping").show();
        } else {
            $("#changeShipping").hide();
        }
    }
});

$("body").on("click", ".closecurbsypopup", function() {
    $('input[name="ShippingMethod"]:checked').prop("checked", false);
    $(".methodcard").removeClass("slectedMethod");
});

$("body").on("click", ".closenewcardpayment", function() {
    $(".newcardradio,#AdditionalPaymentMethodUsenewCard").prop("checked", false);
    $("#placeOrderBtn").prop("disabled", true);
});

$(window).on("load", function() {
    sessionStorage.removeItem("DiscountApplied");
    sessionStorage.removeItem("isRedeemablePaymentMethod");
    sessionStorage.removeItem("otherSaving");
    sessionStorage.removeItem("threebieSavings");
    LoadCouponForm();
    getCreditfeeSummary();
    getPaypalFees();
    checkProductWeight('noshipping');
    // if(TypofUser == 'premium' && $('#custordcnt').val() == 0){
    //   ApplyAutoCoupon();
    // }
});

function formatDeliveryDate(date) {
    var d = new Date(date)
      , month = "" + (d.getMonth() + 1)
      , day = "" + d.getDate()
      , year = d.getFullYear();

    if (month.length < 2)
        month = "0" + month;
    if (day.length < 2)
        day = "0" + day;
    return [month, day, year].join("/");
}

/*if(document.getElementById('errorscreen').value == 'INVC' || document.getElementById('errorscreen').value == 'invc' || document.getElementById('errorscreen').value == 'Invc'){
window.onbeforeunload = function (e) {
    window.setTimeout(function () { // escape function context
        window.location = '/Merchant5/merchant.mvc?Screen=OPCO&refresh=true';
    }, 0);
    window.onbeforeunload = null;   
    return null;
}
}*/

// Add notes on change of textarea
function AddNotestoOrder(value) {
    jQuery.ajax({
        url: "/?Screen=checkout-ajax&customerAction=addnotes&notes=" + encodeURIComponent(value),
        type: "POST",
        showLoader: true,
        cache: false,
        beforeSend: function() {
            $(".loaderContainer").show();
        },
        success: function(data) {},
    });
}

function getCustomerCoupon() {
    var customerEmail = $("#custPWEmail").val();
    var isCouponApplied = localStorage.getItem('couponcode');
    console.log(isCouponApplied);
    $.get("/?Screen=majax&mobileAction=checkCouponUsage&emailAddress=" + customerEmail, function(response) {
        var json = response;
        if (!response.coupon.includes("already used") && isCouponApplied === null) {
            navObject = new Vue({
                el: "#couponlists",
                data: {
                    allcoupons: json,
                },
                mounted() {
                    this.$nextTick( () => {
                        $('#couponlists').show();
                    }
                    )
                }
            });
        }
    });
}

function ApplyCouponDiscount(couponcode) {
    jQuery.ajax({
        url: "/coupon-ajax.html?CustomerAction=coupenRedemption&ACTION=ACPN&Coupon_Code=" + couponcode,
        type: "POST",
        showLoader: true,
        cache: false,
        beforeSend: function() {},
        success: function(data) {
            if (data.trim().search(/class="errormessageshow"/i) != -1) {
                $(".icon").removeClass("iconloader");
                $(".icon").find(".fa-arrow-right").show();
                $("#applycoupon .error-message").text($(data).filter(".errormessageshow").text()).show();
                return false;
            } else {
                localStorage.setItem('couponcode', 'applied');
                getCreditfeeSummary();
            }
        },
    });
}

function getPaypalFees() {
    var PaymentMethod = $(".savedPaymentMethod:checked").val();
    var url = '/Merchant5/merchant.mvc?Screen=AJAX&CustomerAction=addPaypaldFee&PaymentMethod=' + PaymentMethod;
    var checkpayment = '';
    jQuery.ajax({
        url: url,
        type: "POST",
        showLoader: true,
        cache: false,
        async: false,
        beforeSend: function() {},

        success: function(data) {
            if (data) {
                getCreditfeeSummary();
                checkpayment = true;
            }
        }
    })
    return checkpayment;
}

function checkProductWeight(shippingmethod) {
    if (shippingmethod.includes('FedEX') === true) {
        shippingmethod = 'FedEX'
    }
    var url = '/?Screen=CUDET&CustomerAction=basketfees&Shipping_Method=' + shippingmethod;
    $.ajax({
        url: url,
        beforeSend: function() {
        },
        success: function(data) {
            console.log(data);

        }
    })
}

function updateDetailsTextWithJquery() {
    var zipcode = $('#hiddenShipZip').val();
    var specialshipping = $('input[name="SpecialShipping"]').val();
    var nofedex = $('input[name="nofedex"]').val();
    var iswinepresent = $('input[name="iswinepresent"]').val();
    var ship_state = $('#hiddenShipStateSelect').val();
    const url = "/?Screen=checkout-ajax&customerAction=checkoutmessages&ship_zip=" + zipcode + '&specialshipping=' + specialshipping + "&nofedex=" + nofedex + "&ship_state=" + ship_state + "&iswinepresent=" + iswinepresent;

    $.ajax({
        url: url,
        type: 'GET',
        // or 'POST' if needed
        success: function(response) {
            $('.detailsText').html(response);
            $('.fam-main').css('display', 'flex');
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

function checkWineAccountProducts() {
    var iswineProudct = $('input[name="notuserwineproduct"]').val();
    // if(iswineProudct === 'nothisisnotwineaccount') {
    //   location.href= '/?Screen=BASK&Store_Code=G&notwineproduct=yes';
    // }
}
