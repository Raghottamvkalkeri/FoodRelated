jQuery(document).ready(function ($) {
    loadwishlists();
});

function loadwishlists() {
    var getcount = 0;
    var url = '';
    var productcount = $('#categoryCount').val();
    var categoryCode = '';
    var container = 'app-wish';
    var processing = $("#category-listing").html();
    if (getPageCode == 'blogmain') {
        container = 'app-blog';
        categoryCode = $('#blogspostid').val();
        url = "/Merchant5/merchant.mvc?Screen=BLOGJSON&scotsblogger_postid="
    } else {
        categoryCode = $('#wishid').val();
        container = 'app-wish';
        url = "/Merchant5/merchant.mvc?Screen=wishlistapi&WishList_ID="
    }
    var offset = document.getElementById('wishlistoffset') == null ? '0' : document.getElementById('wishlistoffset').value;
    var sort_by = document.querySelector('#sortby') == null ? 'name_desc' : document.querySelector('#sortby').value;
    if (productcount) {
        var per_page = productcount;
    } else {
        var per_page = '-1';
    }
    var products = [];
    queryString = "";
    var UOM = [];
    $.get(
        url +
        categoryCode +
        "&CatListingOffset=" +
        offset +
        "&Offset=" +
        offset +
        "&Per_Page=" +
        per_page +
        "&Sort_By=" + sort_by + "&facets=1&" +
        queryString,
        function (dataval) {



            let stockavailable = dataval.filter((inv) => {
                return inv.data.product_inventory > 0
            });



            var myObject = this;
            var pack_size = 9999;
            var uom = "";
            var addclass = "";
            var getdata;
            if (getPageCode == 'SFNT' || getPageCode == 'MSHIP' || getPageCode == 'ShelfLP') {
                getProductresponse(stockavailable);
            } else {
                getProductresponse(dataval);
                stockavailable = dataval;
            }

            myObjects = new Vue({
                el: "#" + container,
                data: { products: dataval, savedforlater1: dataval },
                methods: {
                    getUomforInventorymessage(element) {
                        return element.split("of")[0];
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


                        $('.dropdown').click(function () {
                            var _this = this;
                            setTimeout(function () {

                                if ($(_this).hasClass('open') == true) {
                                    $(_this).find('.dropdown-item').find('.slacdiscounttext').show();
                                } else {
                                    $(_this).find('.dropdown-item').find('.slacdiscounttext').hide();
                                    $(_this).find('.dLabel1').find('.slacdiscounttext').hide();
                                }
                            }, 10);
                        });

                        $(".loginClick").click(function () {
                            $(".newLoginContainer").removeClass("displayNone");
                            $("#signinForm").removeClass("displayNone");
                            $(".signUpForm").addClass("displayNone");
                            $("#signUpMsg").addClass("displayNone");
                            $(".Guest").css("display", "none");
                            $(".ajaxmsg").html("");
                            $("#login").find("input[type=password], input[type=email]").val("");
                            $("#login").find("input[type=hidden]").val("login");
                            $("#login").removeClass("checkoutlogin");
                            $("#singUpNewsLetter").prop("checked", false);
                            $(".accountLinked").addClass("displayNone");
                        });

                        jQuery('.loginClick, .createAccount, .businessaccount , .checkoutloginClick').click(function () {
                            document.body.scrollTop = 0;
                            document.documentElement.scrollTop = 0;
                            jQuery('body').addClass("noscroll");


                            jQuery("#closelogin,.Lclose").click(function () {
                                jQuery('body').removeClass("noscroll");
                            });
                        });



                    },

                    getFacets(catcode) {
                        var url = `https://${location.hostname
                            }/Merchant5/merchant.mvc?Screen=AJAXFACETS&Category_Code=${$('#categoryCode').val()}&facets=1`;
                        $.ajax({
                            url: url,
                            beforeSend: function (xhr) {
                                // here we are setting isRequested to true
                                isRequested = true;
                            },
                            success: function (html, Status, xhr) {
                                $(".facets-tree").append($(html).find("#sortoptions").html());
                                $(".filterContent.filters").append(
                                    $(html).filter(".mobilefilters").html()
                                );
                                $(".background-container").css("height", "initial");
                                $(".background-container").css("overflow", "auto");
                                myObjects.loadJqueryAssets();
                                $('.expanded').css('height', 'auto');
                            },
                        });
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
                            console.log(s.replace("avg", ""));
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
                            for (let j = 0; j < dataval[i].data.variants.length; j++) {
                                if (
                                    dataval[i].data.variants[j].pack_size < pack_size &&
                                    this.vueUserType == "Retail"
                                ) {
                                    pack_size = dataval[i].data.variants[j].pack_size;
                                    uom = dataval[i].data.variants[j].UOM;
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
                    getsubstitutionInventory(productcode, codes) {
                        var responsedata
                        $.ajax({
                            async: false,
                            url: "/Merchant5/merchant.mvc?Screen=CUDET&ProductAction=substitution&Productcode=" + productcode + "&substitutioncode=" + codes,
                            success: function (response) {
                                var responsedata = response;
                                if (responsedata < 1 || responsedata == '') {
                                    console.log(productcode + responsedata);
                                    setTimeout(function () {
                                        $('.ProductDetail-' + productcode).find('#viewSubstitutions').hide();
                                    }, 500);
                                }

                            },
                        });
                        return responsedata;
                    }, getCurrenctRestockDate(d) {
                        // Convert date string to Date object
                        var dDate = new Date(d);

                        // Get current date with America/New_York timezone
                        var currentDate = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
                        currentDate = new Date(currentDate);

                        // Compare dates
                        if (dDate < currentDate) {
                            console.log(d + " is less than today's date with America/New_York timezone." + currentDate);
                            return false;
                        } else {
                            console.log(d + " is not less than today's date with America/New_York timezone." + currentDate);
                            return true;
                        }
                    }
                },
                computed: {
                    gridClass: function () {
                        var gridClass = '';
                        if ((getPageCodes != 'SFNT') && getPageCodes != 'BASK' && getPageCodes != 'MSHIP' && getPageCodes != 'ShelfLP' && getPageCode != 'blogmain') {
                            gridClass = 'col-xs-6s col-sm-6s col-md-4s col-lg-3s gridclass ' + getPageCode;
                        }
                        return gridClass;
                    }
                },
                mounted() {
                    $(window).scroll(function () {
                        if (
                            $(window).scrollTop() >
                            $(document).height() - $(window).height() - 900
                        ) {
                            if (
                                $("#getCount").val() > 0 &&
                                $("#getResponse").val() == "200"
                            ) {
                                myObjects.getallproducts('');
                            }
                        }
                    });
                    if (getPageCode == 'SFNT' || getPageCode == 'MSHIP' || getPageCode == 'blogmain') {
                        deliciousCarousel();
                    }
                    if (getPageCode == 'blogmain') {
                        Productscroll('.productListing', stockavailable.length);
                    }
                    if (container == 'firstcategory') {
                        FirstCatCarousel();
                    }
                    if (container == 'secondcategory') {
                        SecondCatCarousel();
                    }
                    $(document).ready(function () {
                        //myObjects.getFilteredProducts();
                        myObjects.loadJqueryAssets();
                    });
                    CheckBasketItemss();
                    addProductNew();
                    checkthreebiecounter();
                    checkSlacCounter();
                    //$('[data-toggle="tooltip"]').tooltip();
                    $.widget.bridge('uibutton', $.ui.button); // Bridge to avoid conflicts with Bootstrap
                    $.widget.bridge('uitooltip', $.ui.tooltip); // Disable jQuery UI tooltip

                    var $element = $('[data-toggle="tooltip"]');
                    $element.tooltip();
                    $element.tooltip({ container: 'body' });

                },
                updated: function () {
                    myObjects.loadJqueryAssets();
                    CheckBasketItemss();
                    setTimeout(function () {
                        addProductNew();
                    }, 500);
                },
            });
            $(".productListing").show();
            CheckBasketItemss();
            addProductNew();
            if ((getPageCodes != 'SFNT') && getPageCodes != 'BASK' && getPageCodes != 'MSHIP' && getPageCodes != 'ShelfLP') {
                // myObjects.getFacets(catcode);
                myObjects.loadJqueryAssets();
            }
            setTimeout(function () {
                // checkthreebiecounter();
                // addProductNew();
                // checkthreebiecounter();
            }, 1000);
        }
    );
    if (getPageCodes == 'CTGY') {
        getshelfcoupons();
    }
    $(".closeCart").on("click", function () {
        /*location.reload();*/
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

function getProductresponse(dataval) {
    if (dataval.length < 1) {
        $('.noprouctsmsg').css('display', 'flex');
    } else {
        $('.noprouctsmsg').css('display', 'none');
    }
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
        var checkdealflags = "";
        var getpacksize;
        getpacksize = Math.min.apply(null, dataval[i].data.variants.map(function (item) {
            return item.pack_size;
        }));



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
                    checkdealflags = 'yes';
                    dataval[i].data.variants[j].checkdealflags = "yes";
                } else {
                    checkdealflags = 'yes';
                }




                if (dataval[i].data.variants[j].slacdiscount == 0 && setWholesaleuser != 1) {
                    highestprice = parseFloat(dataval[i].data.variants[j].price);
                    msrpprice = parseFloat(dataval[i].data.variants[j].msrp);

                    var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);

                    getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(2);
                    casesaving = 100 * (msrpprice - highestprice) / (msrpprice);
                    if (casesaving.toFixed(2) > 0 && dataval[i].data.variants[j].slacdiscount <= '0') {
                        // dataval[i].data.variants[j].notes = "Save " + parseFloat(casesaving.toFixed(2)) + '%';
                        dataval[i].data.variants[j].slacdiscount = parseFloat(casesaving.toFixed(2));
                    }
                    if (dataval[i].data.variants[j].notes != '' && dataval[i].data.variants[j].UOM_TEXT != 'Threebie' && dataval[i].data.variants[j].sale == '1' && setWholesaleuser != 1) {
                        dataval[i].data.variants[j].notes = dataval[i].data.variants[j].notes;
                    }
                    else if (dataval[i].data.variants[j].sale != '1' && setWholesaleuser != 1) {
                        dataval[i].data.variants[j].notes = '';
                    }
                    else if (dataval[i].data.variants[j].sale != '1' && setWholesaleuser === 1) {
                        dataval[i].data.variants[j].notes = '';
                    }
                }

                else if (isSale == 0 && isChildSale == 0) {
                    highestpacksize = dataval[i].data.variants[j].pack_size;
                    highestprice = parseFloat(dataval[i].data.variants[j].price);
                    pricediscount = parseFloat(lowestprice * highestpacksize);
                    var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);
                    // 100 x (each price * no of items - case price) / (each price * no of items)
                    getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(2);
                    casesavingwholesale = 100 * (pricediscount - highestprice) / (pricediscount);
                    if (casesavingwholesale.toFixed(2) > 0 && dataval[i].data.variants[j].catch_weight != '1' && dataval[i].data.variants[j].notes == '') {
                        dataval[i].data.variants[j].notes = "Save " + parseFloat(casesavingwholesale.toFixed(2)) + '%';
                    } else {
                        dataval[i].data.variants[j].notes = "";
                    }
                }
            }
            else {
                dataval[i].data.variants[j].default = "1";
                if (dataval[i].data.variants[j].notes != '' && dataval[i].data.variants[j].UOM_TEXT != 'Threebie' && dataval[i].data.variants[j].sale == '1' && setWholesaleuser != 1) {
                    dataval[i].data.variants[j].notes = dataval[i].data.variants[j].notes;
                }
                else if (dataval[i].data.variants[j].notes != '' && dataval[i].data.variants[j].vip_sale === 1) {
                    dataval[i].data.variants[j].notes = dataval[i].data.variants[j].notes;
                }
                else if (dataval[i].data.variants[j].sale != '1' && setWholesaleuser != 1) {
                    dataval[i].data.variants[j].notes = '';
                }
                else if (dataval[i].data.variants[j].sale != '1' && setWholesaleuser === 1) {
                    dataval[i].data.variants[j].notes = '';
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

            if (dataval[i].data.variants[j].sale == 0 && dataval[i].data.variants[j].sale_offer == 1) {
                dataval[i].data.variants[j].sale = 2;
            }
            else if ((dataval[i].data.variants[j].sale == 0 && dataval[i].data.variants[j].vip_sale == 1) || dataval[i].data.variants[j].sale == 1 && dataval[i].data.variants[j].vip_sale == 1) {
                dataval[i].data.variants[j].sale = 3;
            }
            else {
                dataval[i].data.variants[j].sale = dataval[i].data.variants[j].sale;
            }
        }

        setTimeout(function () {
            if (dataval[i].data.product_inventory <= 0 && dataval[i].data.substitute != '') {
                myObjects.getsubstitutionInventory(dataval[i].data.code, dataval[i].data.substitute);
            }
        }, 10);



    }
    // console.log(dataval);
    //console.log(products);
}

function getThreebieProducts() {
    if (screen.width < 768) {
        $('#recipeFilter').click();
        $('.container-checkbox').find(' input[name="isThisthreebieProduct"]').click();
        $('.applyFilter').click();
    } else {
        $('input[name="isThisthreebieProduct"]:visible').trigger('click');
    }
}

function getSlacProducts() {
    if (screen.width < 768) {
        $('#recipeFilter').click();
        $('.container-checkbox').find(' input[name="isSLACProduct"]').click();
        $('.applyFilter').click();
    } else {
        $('input[name="isSLACProduct"]:visible').trigger('click');
    }
}

function getSlacCheck() {
    var responsedata
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