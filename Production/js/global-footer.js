/*global footer js section 1 */
$(window).bind("pageshow", function (event) {
    if (event.originalEvent.persisted) {
        window.location.reload();
    }
});
jQuery(document).ready(function () {
    jQuery(".loginClick, .createAccount, .businessaccount , .checkoutloginClick").click(function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        jQuery("body").addClass("noscroll");

        jQuery("#closelogin,.Lclose").click(function () {
            jQuery("body").removeClass("noscroll").css("overflow-y", "initial");
        });
    });

    // $('.mm_searchfield').on('focus',function() {
    //     var sessionid = document.querySelector('#customerSessionId').value;
    //     var customerId = document.querySelector('#customerId').value;
    //     var limit = '5';
    //   if($(this).val() == ''){
    // 	$.get('/Merchant5/merchant.mvc?Screen=CUDET&CustomerAction=recentelyviewedjson',function(data){
    //     searcableproducts = new Vue({
    //     el: '#searchedproducts',
    //     data: {products: data},
    //     methods: {
    //         getSearchHistory() {
    //             var jsonRequest =
    //             '{"Store_Code": "G","Function":"Module","Session_Type":"runtime","Module_Code":"frjsonfunctions","Module_Function":"FR_SearchLogs","customer_session":"' +
    //             sessionid +
    //             '","customer_id":"' +
    //             customerId +
    //             '","limit":"' +
    //             limit +
    //             '"}';

    //           $.ajax({
    //             type: "POST",
    //             url: "/Merchant5/json.mvc",
    //             data: jsonRequest,
    //             contentType: "application/json",
    //             dataType: "json",
    //             success: function (result) {
    //               LoadWishlist = new Vue({
    //                 el: "#loadSearchHistory",
    //                 data: { loadSearchHistorydata: result },
    //                 mounted() {
    //                     console.log(result);
    //                 },
    //               });
    //             },
    //           });
    //         }
    //     },
    //     mounted() {
    //         this.$nextTick(() => {
    //             $("#searchedproducts").css('display','grid');
    //             var gridContainer = document.querySelector('#searchedproducts');
    //             gridContainer.style.gridTemplateColumns = `repeat(${data.length},auto)`;
    //             setTimeout(function(){
    //                 searcableproducts.getSearchHistory();
    //             },2500);
    //         });
    //     }
    //    });
    // });
    //   }else{
    //     $("#searchedproducts").css('display','none');
    //   }
    // });

    /*$(".mm_searchfield").focusout(function(){
  $("#searchedproducts").hide();
  });*/

    jQuery(".showmore").click(function () {
        var facetClass = jQuery(this).attr("data-class");
        jQuery(".hidefacet." + facetClass).css("display", "block");
        jQuery(".collapse-" + facetClass).show();
        jQuery(this).hide();
    });
    jQuery(".collapse").not(".alt_row").click(function () {
        var facetClass = jQuery(this).attr("data-class");
        jQuery(".hidefacet." + facetClass).css("display", "none");
        jQuery(".show-" + facetClass).show();
        jQuery(this).hide();
    });
});
/*global footer js section 1 */

setTimeout(function () {
    $.getScript("https://www.googletagmanager.com/gtag/js?id=AW-801252144");
    $.getScript("/Merchant5/scripts/00000001/jquery-ui.js?T=a872aec3");
    /*$.getScript("scripts/00000001/google-address.js");*/
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "AW-801252144");
}, 50000);

if (!!window.performance && window.performance.navigation.type === 2) {
    console.log("Reloading");
    window.location.reload();
}

function myFunctions() {
    var x = document.getElementById("myLinks");
    $(".account").removeClass("accountactive");
    $(".account").addClass("accountactive");
    if (x.style.display === "block") {
        $(".account").addClass("accountactive");
        $(".account").removeClass("accountactive");
        x.style.display = "none";
        $("#categories").show();
    } else {
        x.style.display = "block";
        //$('#categories').hide();
    }
}

var pagecode = $(".pagecodes").text();
var screensize = $(window).width();
if ((pagecode == "opco" || pagecode == "BASK" || pagecode == "ORDHP" || pagecode == "ordguide" || pagecode == "ORDH") && screensize < 767) {
    $("footer").addClass("hidden");
} else { }

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = match[1] ? "+1 " : "";
        return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return "Invalid Number";
}
$(document).ready(function () {
    $(".savePackDisplay").each(function () {
        var text = $(this).text();
        $(this).text(text.replace("Case", ""));
    });
});

$(document).on("click", function (e) {
    if ($(e.target).closest(".account-wrapper").length === 0) {
        $(".account-wrapper").removeClass("active");
    }
});
document.addEventListener("DOMContentLoaded", function (event) {
    // $('img.lazyload').load(function() {
    //     $('.lazyloaded').removeClass('loader-img-css');
    // });
    $("img.lazyload").lazy();

    setTimeout(function () {
        $(".mobileversions").each(function () {
            var mainimg = $(this).attr("datasrc2");
            $(this).attr("src", mainimg);
        });
    }, 2000);

    $(".desktopversions").each(function () {
        var mainimg = $(this).attr("datasrc2");
        $(this).attr("src", mainimg);
    });
});

window.addEventListener("load", (event) => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const connectTime = perfData.responseEnd - perfData.requestStart;
    $(".banners").fadeIn();
    $(".product-details-1").fadeIn();
    $(".main-product-image").fadeIn();
    $(".secondrow").fadeIn();
    $(".mobileversion").each(function () {
        $(this).addClass("lazyload");
    });
}
);

jQuery.event.special.touchstart = {
    setup: function (_, ns, handle) {
        this.addEventListener("touchstart", handle, {
            passive: !ns.includes("noPreventDefault"),
        });
    },
};

$(".createAccount,.businessaccount,#createAccountBtnBusiness,.createAccountBtnBusiness").click(function () {
    $.getScript("scripts/00000001/google-address.js");
});

/* navigation js is here */
/*//Fix Werid White Space Bellow The Menu
  $(document).ready(function() {
  if (window.innerWidth > 768) {
  let errorH = $(".navigation-placehoder").offset().top + $(".navigation-placehoder").height() - $(".navigation-background").offset().top - $(".navigation-background").height();
  $(".navigation-placehoder").css("margin-bottom", "-" + errorH + "px");
  }
  });*/
function myFunctions() {
    var x = document.getElementById("myLinks");
    $(".account").removeClass("accountactive");
    $(".account").addClass("accountactive");
    if (x.style.display === "block") {
        $(".account").addClass("accountactive");
        $(".account").removeClass("accountactive");
        x.style.display = "none";
        $("#categories").show();
    } else {
        x.style.display = "block";
        //$('#categories').hide();
    }
}
/*navigation js is here */

function removeParam(name, _url) {
    var reg = new RegExp("((&)*" + name + "=([^&]*))", "g");
    return _url.replace(reg, "");
}

$(document).ready(function () {
    $(".updatetocartbtn").on("tap mousedown", function (event) {/*event.stopPropagation();*/
    });
});

function CreatePremiumCustomer() {
    jQuery.ajax({
        url: "/cudet.html?CustomerAction=membershipUpdate&premium=true",
        type: "POST",
        cache: false,
        beforeSend: function () {
            $(".loaderContainer").show();
        },
        success: function (server_response) {
            reloadBasketSession();
            $("#membershipModal").modal("show");
        },
    });
}

function CreatePremiumCustomerWithinPage(pagecode) {
    jQuery.ajax({
        url: "/cudet.html?CustomerAction=membershipUpdate&premium=true",
        type: "POST",
        cache: false,
        beforeSend: function () {
            $(".loaderContainer").show();
        },
        success: function (server_response) {
            reloadBasketSession();
            $("#membershipModal").modal("show");
        },
    });
}

$("#membershipModal").on("hidden.bs.modal", function (s) {
    window.history.pushState("MSHIP", "Title", "merchant.mvc?Screen=MSHIP");
    reloadBasketSession();
    pagecode = getPageCode;
    location.href = "merchant.mvc?Screen=MSHIP";
});

jQuery("body").on("submit", "#basicmembershipform", function (e) {
    e.preventDefault();
    let url = jQuery(this).attr("action");
    let dataPost = jQuery(this).serialize();
    jQuery.ajax({
        url: "/cudet.html?CustomerAction=membershipUpdate",
        type: "POST",
        data: dataPost,
        showLoader: true,
        cache: false,
        beforeSend: function () {
            $(".loaderContainer").show();
        },
        success: function (server_response) {
            $(".membershipcontainer").hide("slow");
            $(".membershipsubscribedimage").show("slow");
            reloadBasketSession();
            setTimeout(function () {
                // location.href="/?Screen=MSHIP&premium=true";
                CreatePremiumCustomerWithinPage(getPageCode);
                reloadBasketSession();
            }, 1000);
        },
    });
});

function reloadBasketSession() {
    let url = jQuery(this).attr("action");
    let dataPost = jQuery(this).serialize();
    var sessionid = $("#sessionid").val();
    jQuery.ajax({
        url: "/?Screen=majax&mobileAction=reloadBasket&session_id=" + sessionid,
        type: "POST",
        data: dataPost,
        showLoader: true,
        cache: false,
        beforeSend: function () {
            $(".loaderContainer").show();
        },
        success: function (response) {
            console.log(response);
            $.getJSON("/GLOBALBASK_JSON.html", function (data) {
                console.log(data);
            });
        },
    });
}

//   $(".showFreeShipping").html(sessionStorage.getItem("userrshippingmessage"));
function GetFreeshippingInfo() {
    //$(".showFreeShipping").html("<img src='graphics/00000001/3/loading_2.gif' style='width: 25px;height:25px;margin:0 50%;'>");
    sessionStorage.getItem("userrshippingmessage");
    var shipfirstname = $("#shipfname").val();
    var shiplastname = $("#shiplname").val();
    var shipemail = $("#shipemail").val();

    var shipphone = $("#shipphone").val();
    var shipaddr1 = $("#shipaddr1").val();

    var shipcity = $("#shipcity").val();
    var shipstate = $("#shipbaskstate").val();
    var shipcntry = $("#shipcntry").val();
    var shipzip = $("#shipzip").val();
    var shippingmessage = "";
    if (shipzip != "") {
        jQuery.ajax({
            url: "/?subaction=fetch_shipping_details&Action=ORDR&Screen=OUSL&Store_Code=G&ShipFirstName=" + shipfirstname + "&ShipLastName=" + shiplastname + "&shipemail=" + shipemail + "&ShipPhone=" + shipphone + "&ShipAddress1=" + shipaddr1 + "&ShipCity=" + shipcity + "&ShipStateSelect=" + shipstate + "&ShipCountry=" + shipcntry + "&ShipZip=" + shipzip,
            type: "POST",
            type: "POST",
            showLoader: true,
            dataType: "json",
            cache: false,
            beforeSend: function () { },
            success: function (data) {
                console.log(data);
                if (data.length > 1 && data[1].typeofshipping == "hd" && data[0].typeofshipping == "frp") {
                    $(".fam-main").show();
                    $(".showFreeShipping").html("You've got <b>FREE HOME DELIVERY</b> and <b>FLAT RATE SHIPPING</b> for this address");
                    shippingmessage = sessionStorage.setItem("userrshippingmessage", "You've got <b>FREE HOME DELIVERY</b> and <b>FLAT RATE SHIPPING</b> for this address");
                    $(".showimg").html('<img class="img-responsive" style="-webkit-transform: scaleX(-1);transform: scaleX(-1);float: right;" width="50" height="100" src="graphics/00000001/3/est.png"></img>').show();
                } else if (data.length == 1 && data[0].typeofshipping == "frp") {
                    $(".fam-main").show();
                    $(".showFreeShipping").html("You've got <b>FLAT RATE SHIPPING</b> for this address");
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
                    shippingmessage = sessionStorage.setItem("userrshippingmessage", "You're earning VIP Rewards!");
                    $(".showimg").html('<img class="img-responsive" style="-webkit-transform: scaleX(-1);transform: scaleX(-1);float: right;" width="50" height="100" src="graphics/00000001/3/est.png"></img>').show();
                    //   $(".showFreeShipping").html("");
                    //   $(".showimg").html("");
                }

                //    $(".showFreeShipping").html(data);
            },
        });
    }
}
//GetFreeshippingInfo();

/*$('#loadperksinfo').hide().load('/Merchant5/merchant.mvc?Screen=MSHIP .perks-main').show();*/

function CheckBasketItemss() {
    $.getJSON("/GLOBALBASK_JSON.html", function (data) {
        if (data.groups.length) {
            $.each(data.groups, function (i, item) {
                var popupid = item.code;
                var radiocheck = $('input[value="' + popupid + '"]');
                // console.log(radiocheck);
                popupidparent = $(radiocheck).attr("data-parent");
                productcode = item.product.code;
                let data_stock = parseInt($(radiocheck).attr("data-stock"));
                $(".ProductDetail-" + productcode).find(".prodcodecheck-" + popupid).each(function () {
                    $(this).attr("data-qtycart", item.quantity);
                });
                $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycart", item.quantity);
                $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycartcheck", item.quantity);
                $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycart");
                if ($(radiocheck).attr("data-parent") != "" && $(radiocheck).attr("data-parent") != undefined)
                    popupid = $(radiocheck).attr("data-parent");
                else
                    var radiocheck = $('.form-check-dropdown input[value="' + popupid + '"]');

                //  for inventroy check
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
                        $(".ProductDetail-" + popupid).find(".addtocart-container").addClass("displayNone");
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

                        $(".ProductDetail-" + productcode + ":visible").find(".updatetocartbtn").bind("keyup", function () {
                            /*$(".ProductDetail-" + popupid).find('.updatetocartbtn').trigger('change');*/
                            buttonInput(this);
                        });
                        var input = jQuery('<input class="hiddenInput">');
                        $(".ProductDetail-" + productcode).find(".updatetocartbtn").append(input);
                        $(".ProductDetail-" + productcode).find(".updatetocartbtn").text(item.quantity + "");
                        $(".ProductDetail-" + productcode).find(".inputBox").removeClass("displayNone");
                    }
                } else {
                    $(".ProductDetail-" + productcode).find(".addtocart-container").addClass("displayNone");
                    $(".ProductDetail-" + productcode).find(".upbutton").addClass("displayNone");
                    $(".ProductDetail-" + productcode).find(".rimgss").css("filter", "grayscale(1)");
                    $(".ProductDetail-" + productcode).find(".out-of-stock-new,.soldoutmessage").css("display", "flex");

                    $(".ProductDetail-" + productcode).find(".addtocart-container").closest(".row").show();
                    $(".ProductDetail-" + productcode).find(".threebieproductbtn").hide();
                }
            });
        }
    });
}

function checkVipSale() {
    if ($(".check-VIPOnlySale").is(":checked") == true) {
        $(".check-VIPRetailSale").attr("checked", true);
    } else {
        $(".check-VIPRetailSale").attr("checked", false);
    }
    $(".check-VIPOnlySale").on("change", function () {
        if ($(this).is(":checked") == true) {
            $(".check-VIPRetailSale").attr("checked", true);
        } else {
            $(".check-VIPRetailSale").attr("checked", false);
        }
    });
}

// document
//   .querySelector(".mm_searchfield")
//   .addEventListener("focus", function () {
//     var sessionid = document.querySelector("#customerSessionId").value;
//     var customerId = document.querySelector("#customerId").value;
//     var limit = "5";
//     var backdrop = document.querySelector(".backdrop");
//     var searchContainer = document.querySelector(".searchhistorycontainer");
//     var searchMenu = document.querySelector(".mm_searchfield_menu");

//     function showBackdrop() {
//       backdrop.style.display = "block";
//       backdrop.addEventListener("click", hideSearchHistory);
//     }

//     function hideBackdrop() {
//       backdrop.style.display = "none";
//       backdrop.removeEventListener("click", hideSearchHistory);
//     }

//     function hideSearchHistory() {
//       searchContainer.style.display = "none";
//       searchMenu.style.display = "none";
//       hideBackdrop();
//     }
//     if (this.value === "") {
//       fetch(
//         "/Merchant5/merchant.mvc?Screen=CUDET&CustomerAction=recentelyviewedjson"
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           new Vue({
//             el: "#searchedproducts",
//             data: {
//               products: data,
//             },
//             methods: {
//               navigateTo(url) {
//                 window.location.href = url;
//               },
//               getSearchHistory() {
//                 var jsonRequest = JSON.stringify({
//                   Store_Code: "G",
//                   Function: "Module",
//                   Session_Type: "runtime",
//                   Module_Code: "frjsonfunctions",
//                   Module_Function: "FR_SearchLogs",
//                   customer_session: sessionid,
//                   customer_id: customerId,
//                   limit: limit,
//                 });
//                 fetch("/Merchant5/json.mvc", {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: jsonRequest,
//                 })
//                   .then((response) => response.json())
//                   .then((result) => {
//                     this.searchHistory = result;
//                     new Vue({
//                       el: "#searchHistory",
//                       data: {
//                         searchHistory: result,
//                       },
//                       methods: {
//                         navigateTo(url) {
//                           window.location.href = url;
//                         },
//                       },
//                       mounted() {
//                         this.$nextTick(() => {
//                           this.$el.style.display = "grid";
//                         });
//                       },
//                     });
//                   });
//               },
//             },
//             mounted() {
//               this.$nextTick(() => {
//                 searchContainer.style.display = "block";
//                 this.$el.style.display = "grid";
//                 this.$el.style.gridTemplateColumns = `repeat(${this.products.length}, 192px)`;
//                 showBackdrop();
//                 setTimeout(() => {
//                   this.getSearchHistory();
//                 }, 500);
//               });
//             },
//           });
//         });
//     } else {
//       searchContainer.style.display = "none";
//       // hideBackdrop();
//       // showBackdrop();
//     }
//     showBackdrop();
//   });

// Hide search history when clicking outside the container
document.addEventListener("click", function (event) {
    var searchContainer = document.querySelector(".searchhistorycontainer");
    if (!searchContainer.contains(event.target) && !document.querySelector(".mm_searchfield").contains(event.target)) {
        searchContainer.style.display = "none";
        document.querySelector(".backdrop").style.display = "none";
    }
});

$(document).ready(function () {
    $(".mm_searchfield").on("keyup", function () {
        if ($(this).val().length > 2) {
            $(".searchhistorycontainer").css("display", "none");
        } else {
            $(".searchhistorycontainer").css("display", "grid");
        }
    });

    $(".mm_searchfield").focus(function () {
        var sessionId = $("#customerSessionId").val();
        var customerId = $("#customerId").val();
        var limit = "5";
        var backdrop = $(".backdrop");
        var searchContainer = $(".searchhistorycontainer");
        var searchMenu = $(".mm_searchfield_menu");
        var loggedincount = 0;

        function showBackdrop() {
            $(".global-header-wrapper").css("z-index", "100006");
            backdrop.show().on("click", hideSearchHistory);
        }

        function hideBackdrop() {
            backdrop.hide().off("click", hideSearchHistory);
        }

        function hideSearchHistory() {
            searchContainer.hide();
            searchMenu.hide();
            hideBackdrop();
        }

        if ($(this).val() === "") {
            $.ajax({
                url: "/Merchant5/merchant.mvc?Screen=CUDET&CustomerAction=recentelyviewedjson",
                dataType: "json",
                success: function (data) {
                    viewedProducts = new Vue({
                        el: "#searchedproducts",
                        data: {
                            products: data,
                            searchHistory: [],
                            trendingHistory: [],
                            limit: 10,
                            sessionId: sessionId,
                            customerId: customerId,
                        },
                        methods: {
                            navigateTo: function (url) {
                                window.location.href = url;
                            },
                            getSearchHistory: function () {
                                var jsonRequest = JSON.stringify({
                                    Store_Code: "G",
                                    Function: "Module",
                                    Session_Type: "runtime",
                                    Module_Code: "frjsonfunctions",
                                    Module_Function: "FR_SearchLogs",
                                    customer_session: sessionId,
                                    customer_id: customerId,
                                    limit: limit,
                                    sort: "dtstamp",
                                });

                                var self = this;

                                $.ajax({
                                    url: "/Merchant5/json.mvc",
                                    type: "POST",
                                    contentType: "application/json",
                                    data: jsonRequest,
                                    dataType: "json",
                                    success: function (result) {
                                        loggedincount = result.data.length;
                                        // console.log(loggedincount);
                                        if (result.data.length === 0) {
                                            var retryJsonRequest = JSON.stringify({
                                                Store_Code: "G",
                                                Function: "Module",
                                                Session_Type: "runtime",
                                                Module_Code: "frjsonfunctions",
                                                Module_Function: "FR_SearchLogs",
                                                customer_session: "",
                                                customer_id: "",
                                                limit: limit,
                                            });

                                            $.ajax({
                                                url: "/Merchant5/json.mvc",
                                                type: "POST",
                                                contentType: "application/json",
                                                data: retryJsonRequest,
                                                dataType: "json",
                                                success: function (retryResult) {
                                                    self.searchHistory = retryResult.data;
                                                    self.displaySearchHistory(retryResult.data);
                                                    // if(isUserLoggedIn === 1){
                                                    //   self.getTrendingHistory();
                                                    // }
                                                    if (retryResult.data.length > 0) {
                                                        document.querySelector(".ShoppingRecentRecommendation").innerHTML = "Trending Search....";
                                                        $("#searchHistory").find(".material-symbols-outlined").text("trending_up");
                                                    } else {
                                                        document.querySelector(".ShoppingRecentRecommendation").style.display = "none";
                                                    }
                                                },
                                            });
                                        } else {
                                            self.searchHistory = result.data;
                                            self.displaySearchHistory(result.data);
                                            if (isUserLoggedIn === 1) {
                                                self.getTrendingHistory();
                                            }
                                        }
                                    },
                                });
                            },
                            getTrendingHistory: function () {
                                var jsonRequest = JSON.stringify({
                                    Store_Code: "G",
                                    Function: "Module",
                                    Session_Type: "runtime",
                                    Module_Code: "frjsonfunctions",
                                    Module_Function: "FR_SearchLogs",
                                    customer_session: "",
                                    customer_id: "",
                                    limit: limit,
                                });

                                var self = this;

                                $.ajax({
                                    url: "/Merchant5/json.mvc",
                                    type: "POST",
                                    contentType: "application/json",
                                    data: jsonRequest,
                                    dataType: "json",
                                    success: function (result) {
                                        self.trendingHistory = self.filterTrendingHistory(result.data);
                                        self.displayTrendingHistory(self.trendingHistory);
                                    },
                                });
                            },
                            filterTrendingHistory: function (trending) {
                                var self = this;
                                return trending.filter(function (item) {
                                    var isExcluded = self.searchHistory.some(function (historyItem) {
                                        return (historyItem.search_keyword.toLowerCase() === item.search_keyword.toLowerCase());
                                    });
                                    return !isExcluded;
                                });
                            },
                            displaySearchHistory: function (result) {
                                new Vue({
                                    el: "#searchHistory",
                                    data: {
                                        searchHistory: result,
                                    },
                                    methods: {
                                        navigateTo: function (url) {
                                            window.location.href = url;
                                        },
                                    },
                                    mounted: function () {
                                        this.$nextTick(function () {
                                            this.$el.style.display = "grid";
                                            if (isUserLoggedIn === 1 && loggedincount > 0) {
                                                $("#searchHistory").find(".material-symbols-outlined").text("manage_search");
                                                document.querySelector(".ShoppingRecentRecommendation").style.display = "block";
                                            } else {
                                                if (result.length > 0) {
                                                    $("#searchHistory").find(".material-symbols-outlined").text("trending_up");
                                                    document.querySelector(".ShoppingRecentRecommendation").innerHTML = "Trending Search....";
                                                    document.querySelector(".ShoppingRecentRecommendation").style.display = "block";
                                                }
                                            }
                                        });
                                    },
                                });
                            },
                            displayTrendingHistory: function (result) {
                                new Vue({
                                    el: "#searchTrendingHistory",
                                    data: {
                                        trendingHistory: result,
                                    },
                                    methods: {
                                        navigateTo: function (url) {
                                            window.location.href = url;
                                        },
                                    },
                                    mounted: function () {
                                        this.$nextTick(function () {
                                            this.$el.style.display = "grid";
                                            // $('.ShoppingTrendingRecommendation').show();
                                            if (isUserLoggedIn === 1 && result.length) {
                                                $("#searchTrendingHistory").find(".material-symbols-outlined").text("trending_up");
                                                document.querySelector(".ShoppingTrendingRecommendation").style.display = "block";
                                            } else {
                                                $("#searchTrendingHistory").find(".material-symbols-outlined").text("trending_up");
                                                // document.querySelector(".ShoppingRecentRecommendation").style.display = "none";
                                            }
                                        });
                                    },
                                });
                            },
                        },
                        mounted: function () {
                            this.$nextTick(function () {
                                searchContainer.show();
                                this.$el.style.display = "grid";
                                this.$el.style.gridTemplateColumns = `repeat(${this.products.length}, 160px)`;
                                // Productscroll('.searchedproducts', this.products.length);
                                if (this.products.length > 0) {
                                    document.querySelector(".ShoppingRecommendation").style.display = "block";
                                    document.querySelector(".s-seperator").style.display = "block";
                                } else {
                                    document.querySelector(".ShoppingRecommendation").style.display = "none";
                                    document.querySelector(".s-seperator").style.display = "none";
                                }
                                showBackdrop();
                                this.getSearchHistory();
                                $(window).scroll(function () {
                                    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) { } else {
                                        searchContainer.hide();
                                        document.querySelector(".mm_searchfield").dispatchEvent(new Event("focusout"));
                                        $(".mm_searchfield").blur();
                                        hideBackdrop();
                                    }
                                });
                            });
                        },
                    });
                },
            });
        } else {
            searchContainer.hide();
        }

        showBackdrop();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.querySelector(".searchhistorycontainer");

        function adjustContainerHeight() {
            const screenHeight = window.innerHeight;
            container.style.height = `${screenHeight * 0.8}px`;
            // Adjust the 0.8 to desired ratio
        }

        // Adjust the container height when the page loads
        adjustContainerHeight();

        // Adjust the container height when the window is resized
        window.addEventListener("resize", adjustContainerHeight);
    }
    );
}
);

var getFlatRateData = new Vue({
    el: "#getFlatRateData",
    data: {
        zipcode: "",
        shippingOptions: {//   "Flat Rate": [],
            //   "Also Available": [],
        },
    },
    methods: {
        fetchShippingOptions: function () {
            var self = this;
            var zip = document.querySelector(' #shippingpromoroform input[name="ShipEstimate:ship_zip"]').value;
            // Get the entered zip code

            // Update the URL with the entered zip code
            var url = "/Merchant5/merchant.mvc?Screen=CUDET&mobileAction=getFlatRate&zipcode=" + zip;

            // Perform AJAX request using jQuery
            if (zip !== "") {
                $.ajax({
                    url: url,
                    method: "GET",
                    success: function (response) {
                        // Since response may be HTML, we may need to extract JSON or text content
                        try {
                            // If the response is JSON
                            var data = response;

                            // Update the shippingOptions with the returned data
                            self.shippingOptions = data;
                            $(".shipping-desciminlar").show();
                        } catch (e) {
                            console.error("Error parsing the response:", e);
                        }
                    },
                    error: function (err) {
                        console.error("Error fetching shipping options:", err);
                    },
                });
            } else {
                self.shippingOptions = {};
            }
        },
        resetShippingOptions: function () {
            this.shippingOptions = {};
            // Reset the array
        },
    },
    mounted: function () {
        var self = this;
        // Optionally fetch data on page load
        this.fetchShippingOptions();

        document.querySelector(".getshipPromo").addEventListener("click", function (event) {
            event.preventDefault();
            // Prevent default form submission

            var form = document.querySelector("#shippingpromoroform");
            var zipInput = form.elements["ShipEstimate:ship_zip"];

            // Check form validity using HTML5 built-in validation
            if (zipInput.checkValidity()) {
                // Call the fetchShippingOptions function if zip is valid
                getFlatRateData.fetchShippingOptions();

                // Manually submit the form after everything
                //   form.addEventListener('submit', function(event) {
                //     event.preventDefault(); // Ensure it doesn't reload the page
                // });
                //   form.submit();
            } else {
                // Show the built-in validation message
                zipInput.reportValidity();
            }
        });

        document.querySelector("#shippingpromoroform").addEventListener("submit", function (event) {
            event.preventDefault();
            // Prevent form from submitting and page from reloading

            var form = document.querySelector("#shippingpromoroform");
            var zip = form.elements["ShipEstimate:ship_zip"].value;

            // Check if zip is blank or null
            if (!zip || zip.trim() === "") {
                alert("Please enter a valid ZIP code.");
            } else {
                // Call the fetchShippingOptions function if zip is valid
                getFlatRateData.fetchShippingOptions();
            }
        });

        // Reset shippingOptions when ZIP code is blank on input event
        document.querySelector('#shippingpromoroform input[name="ShipEstimate:ship_zip"]').addEventListener("input", function (event) {
            if (event.target.value === "") {
                self.resetShippingOptions();
                $(".shipping-desciminlar").hide();
            }
        });
    },
});

let splitwineorder = new Vue({
    el: "#wineitems",
    data: {
        wineItems: [],
        wineItemlist: [],
    },
    methods: {
        fetchWineItems() {
            $.ajax({
                url: "/cudet.html?CustomerAction=splitwineItems",
                method: "GET",
                success: (response) => {
                    // Process and display the result
                    this.wineItems = response.items;
                    this.wineItemlist = response;
                }
                ,
                error: (error) => {
                    console.error("Error fetching wine items", error);
                }
                ,
            });
        },
        removeWineItemsfromCart() {
            var sessionid = $("#sessionid").val();
            var basketid = $("#basket_id").val();
            var customerId = $("#customerId").val();
            var lineid = $("#winelineid").val();
            var jsonRequest = JSON.stringify({
                Store_Code: "G",
                Function: "Module",
                Module_Code: "frsplitorders",
                Module_Function: "FR_Save_WineItems",
                customer_session: sessionid,
                Customer_Id: customerId,
                Customer_Type: "wholesale",
                Basket_Id: basketid,
                Wine_Items: [lineid],
            });
            $.ajax({
                url: "/Merchant5/json.mvc",
                type: "POST",
                contentType: "application/json",
                data: jsonRequest,
                dataType: "json",
                success: function (result) {
                    console.log(result);
                    if (result) {
                        window.location.href = '/Merchant5/merchant.mvc?Screen=OPCO&Store_Code=G';
                    }
                },
            });
        },
        viewWineItemsfromBasket() {
            var sessionid = $("#sessionid").val();
            var basketid = basket.groups[0].basket_id;
            var customerId = $("#customerId").val();
            var jsonRequest = JSON.stringify({
                Store_Code: "G",
                Function: "Module",
                Module_Code: "frsplitorders",
                Module_Function: "FR_Load_WineItems",
                customer_session: sessionid,
                Customer_Id: customerId,
                Customer_Type: "wholesale",
                Basket_Id: basketid,
            });
            $.ajax({
                url: "/Merchant5/json.mvc",
                type: "POST",
                contentType: "application/json",
                data: jsonRequest,
                dataType: "json",
                success: (result) => {
                    // Assuming result contains wine items and other relevant details
                    // this.wineItems = result.items;
                    // this.wineItemlist = result;
                    var results = (this.wineItems = result.map((item) => ({
                        ...item,
                        expanded: false,
                    })));
                    console.log("Wine items loaded from basket", results);
                    if (results.length > 0) {
                        $("#wineproducts").val("yes");
                        $('.wineproductbtn').removeClass('hidden');
                    }
                }
                ,
                error: (error) => {
                    console.error("Error fetching wine items from basket", error);
                }
                ,
            });
        },
    },
    mounted() {
        if (getPageCode !== "OPCO" || getPageCode == "opco") {
            this.fetchWineItems();
        }
    },
});

let viewwineorders = new Vue({
    el: "#viewwineitems",
    data: {
        wineItems: [],
        wineItemlist: [],
    },
    methods: {
        fetchWineOrderItems() {
            let orderid = $(".getwineorder").text();
            $.ajax({
                url: "/cudet.html?CustomerAction=wineorders&order_id=" + orderid,
                method: "GET",
                success: (response) => {
                    // Process and display the result
                    this.wineItems = response.items;
                    this.wineItemlist = response;
                    // var results  =this.wineItems = response.map(item => ({ ...item, expanded: false }));
                    // this.subtotal = this.wineItems.reduce((acc, item) => acc + parseFloat(item.price || 0), 0).toFixed(2);
                    // console.log('Wine items loaded from basket', this.subtotal);
                    $("#viewsplitwinemodal").modal();
                    $(".wineorderno").text("Wine Order #" + orderid);
                }
                ,
                error: (error) => {
                    console.error("Error fetching wine items", error);
                }
                ,
            });
        },
    },
});

var OrderguideSearchProducts = new Vue({
    el: "#ordguideproducts",
    data: {
        orderguideProducts: [],
        orderguideSearchProducts: [],
        debounceTimeout: null,
        loading: false,
        // Loader state
    },
    methods: {
        getTrendingHistory() {
            const sessionId = $("#customerSessionId").val();
            const customerId = $("#customerId").val();
            const limit = "5";

            const jsonRequest = JSON.stringify({
                Store_Code: "G",
                Function: "Module",
                Session_Type: "runtime",
                Module_Code: "frjsonfunctions",
                Module_Function: "FR_SearchLogs",
                customer_session: sessionId,
                customer_id: customerId,
                limit: limit,
            });

            const sort_by = setWholesaleuser === 1 ? 'customfield:customfields:wprice' : 'customfield:customfields:pprprice';
            this.makeAjaxRequest(`/?Screen=SRCHJSON&Search=GG-&SearchOffset=0&Sort_By=${sort_by}&per_page=24&recipes=No&&x=0&y=0&`, jsonRequest);
        },

        convertUOM(variant) {
            const uomMapping = {
                EA: "EACH",
                CS: `CASE of ${variant.pack_size}`,
                BAG: `BAG of ${variant.pack_size}`,
                BX: `Box of ${variant.pack_size}`,
                PK: `Pack of ${variant.pack_size}`,
                TUB: `TUB of ${variant.pack_size}`,
            };
            return uomMapping[variant.UOM] || variant.UOM;
        },

        roundNumbers(number) {
            return parseFloat(number).toFixed(2);
        },

        processProducts(result) {
            result.forEach((item) => {
                const newProductPrices = [];
                item.data.variants.forEach((variant) => {
                    variant.UOM = this.convertUOM(variant);
                    // Apply rounding here
                    variant.newproductprice = `${variant.code}=${this.roundNumbers(variant.price)}`;
                    newProductPrices.push(variant.newproductprice);
                }
                );
                item.data.newprices = newProductPrices.join("|");
            }
            );
        },

        makeAjaxRequest(url, jsonRequest, showLoader = true, toggleVisibility = true) {

            const self = this;
            if (showLoader)
                this.loading = true;
            // Show loader only if flag is true

            $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json",
                data: jsonRequest,
                dataType: "json",
                beforeSend() {
                    if (toggleVisibility) {
                        document.querySelector('.searchproductlist').style.display = 'none';
                        // Hide only if the flag is true
                    }
                },
                success(result) {
                    self.processProducts(result);
                    self.orderguideSearchProducts = result;
                    self.orderguideProducts = [];
                },
                complete() {
                    if (toggleVisibility) {
                        document.querySelector('.searchproductlist').style.display = 'block';
                        // Show only if the flag is true
                    }
                    if (showLoader) {
                        document.querySelector('.searchproductlist').scrollTo({
                            top: 0
                        });
                    }
                    if (showLoader)
                        self.loading = false;
                    // Hide loader only if it was shown
                },
            });
        },

        searchProducts(searchKey) {
            if (searchKey.trim() === "") {
                this.getTrendingHistory();
                // document.querySelector('.searchproductlist').innerHTML = "<h5 class='ft-md ft-14p txt-orange'>Search cannot be blank</h5>"
                return;
            }

            const jsonRequest = JSON.stringify({
                Store_Code: "G",
                Function: "Module",
                Session_Type: "runtime",
                Module_Code: "frjsonfunctions",
                Module_Function: "Search_Products",
                search: searchKey,
            });

            const sort_by = setWholesaleuser === 1 ? 'customfield:customfields:wprice' : 'customfield:customfields:pprprice';
            this.makeAjaxRequest(`/?Screen=SRCHJSON&Search=${searchKey}&SearchOffset=0&Sort_By=${sort_by}&per_page=24&recipes=No&x=0&y=0&`, jsonRequest);
        },

        onSearchKeyup() {
            const searchKey = $("#OrdguidesearchProductTxt").val();
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                this.searchProducts(searchKey);
            }
                , 2500);
            // 3 seconds
        },

        onSearchSubmit() {
            const searchKey = $("#OrdguidesearchProductTxt").val();
            this.searchProducts(searchKey);

            // Trigger blur to close the keyboard on mobile
            document.querySelector("#OrdguidesearchProductTxt").blur();
        },

        refreshDataOnCheckboxChange() {

            const sessionId = $("#customerSessionId").val();
            const customerId = $("#customerId").val();

            const jsonRequest = JSON.stringify({
                Store_Code: "G",
                Function: "Module",
                Session_Type: "runtime",
                Module_Code: "frjsonfunctions",
                Module_Function: "FR_FilterLogs",
                customer_session: sessionId,
                customer_id: customerId,
            });
            const searchKey = $("#OrdguidesearchProductTxt").val();
            const sort_by = setWholesaleuser === 1 ? 'customfield:customfields:wprice' : 'customfield:customfields:pprprice';
            document.querySelector('.searchproductlist').style.display = 'block';
            this.makeAjaxRequest(`/?Screen=SRCHJSON&Search=${searchKey}&SearchOffset=0&Sort_By=${sort_by}&per_page=10&recipes=No&&x=0&y=0&`, jsonRequest, false, false);
            // No loader
        },
    },

    mounted() {
        this.getTrendingHistory();

        // Attach event listener for Enter key
        const self = this;
        document.querySelector("#OrdguidesearchProductTxt").addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                self.onSearchSubmit();
            }
        });

        // Attach click listener for search icon
        document.querySelector(".searchOrders")// Update with your actual search icon selector
            .addEventListener("click", function () {
                self.onSearchSubmit();
            });

        // Event delegation for dynamically rendered checkboxes
        document.querySelector("#ordguideproducts")// Replace with the parent container or a common ancestor
            .addEventListener("change", function (event) {
                if (event.target.type === "checkbox") {
                    self.refreshDataOnCheckboxChange();
                }
            });

        document.querySelector(".close1")// Replace with the parent container or a common ancestor
            .addEventListener("click", function (event) {
                document.querySelector('.searchproductlist').style.display = 'none';
                $("#OrdguidesearchProductTxt").val('GG-');
                self.refreshDataOnCheckboxChange();
            });
    },
});

function AddItemstoWishlist(buyBotton) {
    var sessionid = document.getElementById("sessionid").value;
    var customerType = document.querySelector(".customertype").value;
    $(buyBotton).find("input[type=checkbox]:checked").val();
    var wishlistid = $("input[name=WishList_ID]").val();
    var wishlistName = $('.wishlist_name').text();
    var wishlistNotes = $('.wishlist_notes').text();
    var productId = $(buyBotton).attr("data-product-id");
    var productCode = $(buyBotton).attr("data-code");
    var moved = "";
    var Module = "FR_AddUpdateWishList";
    var title = $(".nomargin").text();
    var type = $(buyBotton).attr("data-ogtype");
    var jsonRequest = '{"Store_Code": "G","Session_Type":"runtime","Function":"Module","Module_Code":"frjsonfunctions","Module_Function":"' + Module + '","customer_session":"' + sessionid + '","customer_type":"' + customerType + '","wishlist_title":"' + wishlistName + '","wishlist_notes":"' + wishlistNotes + '","wishlist_shared":1,"wishlist_product_code":"' + productCode + '","wishlist_product_quantity":"1","wishlist_id":"' + wishlistid + '"}';
    if (type === "deleteWisshlistItem") {
        $(buyBotton).attr("data-ogtype", "insertWishlist");
        $.ajax({
            url: "/Merchant5/merchant.mvc?Screen=AJAX&CustomerAction=delwishlist&product_id=" + productId,
            type: "POST",
            data: productId,
            showLoader: !0,
            cache: !1,
            success: function (t) {
                if ($('#currentwishlistcount').val() == 1) {
                    location.reload();
                }
                loadwishlists();
                $('#ordguideproducts input[type=checkbox]:checked').attr('disabled', false);
            },
        });
    } else {
        $(buyBotton).attr("data-ogtype", "deleteWisshlistItem");

        $.ajax({
            type: "POST",
            url: "/Merchant5/json.mvc",
            data: jsonRequest,
            contentType: "application/json",
            dataType: "json",
            async: false,
            success: function (result) {
                moved = result.wishlist_name;
                console.log($(buyBotton).attr("data-ogtype"));
                if ($('#currentwishlistcount').val() == 0) {
                    location.reload();
                }
                loadwishlists();
                $('#ordguideproducts input[type=checkbox]:checked').attr('disabled', false);
                if (getPageCode == "WISH" || getPageCode == "wish" || getPageCode == "Wish") {
                    deleteWishList(moved, sessionid, customerType, productId);
                } else {
                    $("#movemodal").modal("hide");
                    $.Toast.showToast({
                        // toast message
                        title: "Item added to " + moved + " ",
                        // default: 1500
                        duration: 3000,
                    });
                    if (urlpath === "https://www.foodrelated.com" || urlpath === "https://foodrelated.com") {
                        var items = [];
                        items.push({
                            item_id: wishlistid,
                            item_name: productCode,
                            // item_brand: brand,
                            // item_variant: data.code,
                            // price: data.formatted_price,
                            // quantity: data.quantity
                        });

                        dataLayer.push({
                            ecommerce: null
                        });
                        // Clear the previous ecommerce object.
                        dataLayer.push({
                            event: "add_to_wishlist",
                            ecommerce: {
                                currency: "USD",
                                value: "",
                                items,
                            },
                        });
                    }
                }
            },
        });
    }
}

// var getFlatRateData = new Vue({
//     el: '#getFlatRateData',
//     data: {
//       zipcode: '',
//       shippingOptions: {
//         // "Flat Rate": [],
//         // "Also Available": [],
//       }
//     },
//     methods: {
//       fetchShippingOptions: function () {
//         var self = this;
//         var zip = document.querySelector('#shippingpromoroform input[name="ShipEstimate:ship_zip"]').value; // Get the entered zip code

//         // Update the URL with the entered zip code
//         var url = '/Merchant5/merchant.mvc?Screen=CUDET&mobileAction=getFlatRate&zipcode=' + zip;

//         // Perform AJAX request using jQuery
//         if (zip !== '') {
//           $.ajax({
//             url: url,
//             method: 'GET',
//             success: function(response) {
//               try {
//                 // Assuming the response is already JSON
//                 var data = response;

//                 // Update the shippingOptions with the returned data
//                 self.shippingOptions = data;
//               } catch (e) {
//                 console.error('Error parsing the response:', e);
//               }
//             },
//             error: function(err) {
//               console.error('Error fetching shipping options:', err);
//             }
//           });
//         } else {
//           // If ZIP is empty, reset the shippingOptions
//           self.shippingOptions = {};
//         }
//       },
//       resetShippingOptions: function () {
//         this.shippingOptions = {}; // Reset the array
//       }
//     },
//     mounted: function () {
//       var self = this;

//       // Optionally fetch data on page load
//       this.fetchShippingOptions();

//       document.querySelector('.getshipPromo').addEventListener('click', function(event) {
//         event.preventDefault(); // Prevent default form submission

//         var form = document.querySelector('#shippingpromoroform');
//         var zipInput = form.elements['ShipEstimate:ship_zip'];

//         // Check form validity using HTML5 built-in validation
//         if (zipInput.checkValidity()) {
//           self.fetchShippingOptions();
//         } else {
//           // Show the built-in validation message
//           zipInput.reportValidity();
//         }
//       });

//       // Reset shippingOptions when ZIP code is blank on input event
//       document.querySelector('#shippingpromoroform input[name="ShipEstimate:ship_zip"]').addEventListener('input', function(event) {
//         if (event.target.value === '') {
//           self.resetShippingOptions();
//         }
//       });
//     }
//   });