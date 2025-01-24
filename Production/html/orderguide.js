var getsavedprice = '';
jQuery(document).ready(function($) {
    var getcount = 0;
    var productcount = $('#categoryCount').val();
    var count = $('.count').val();
    var customerId = $('#customerId').val();
    var offset = 0;
    var totalcount = 0;
    if (productcount) {
        var per_page = productcount;
    } else {
        var per_page = "10";
    }
    var products = [];
    var queryString = [];
    $(".mm_facet_checkbox:checked:visible").each(function() {
        var updatedString = $(this).val().replace("&", "%26");
        queryString.push(`&${$(this).attr("name")}=${updatedString}`);
    });

    var UOM = [];
    $.get("/Merchant5/merchant.mvc?Screen=OGJSON&count=" + per_page + "&Offset=" + offset + "&Per_Page=" + per_page + "&customer_id=" + customerId, queryString, function(dataval) {

        getProductresponse(dataval[0].data);
        stockavailable = dataval;

        ogobjects = new Vue({
            el: "#app-ordguide",
            data: {
                products: dataval[0].data
            },
            methods: {
                getallproducts(cat_id, searchkey) {
                    if (cat_id == 'undefined') {
                        cat_id = '';
                    }
                    if (cat_id == '') {
                        cat_id = '';
                        var offset = parseInt($("#defaultoffset").val()) + 10;
                    } else {
                        var offset = 0;
                    }
                    if ($('#SearchKey').val() == '' && !searchkey == '') {
                        var offset = 0;
                    } else if ($('#SearchKey').val() !== '' && !searchkey !== '') {
                        var offset = parseInt($("#defaultoffset").val()) + 10;
                    } else if (cat_id !== '' && $('#cat_id').val() !== '') {
                        var offset = parseInt($("#defaultoffset").val()) + 10;
                        // var offset = 0;
                    } else if (cat_id !== '' && cat_id !== undefined) {
                        $('#cat_id').val(cat_id.join(','));
                        // var offset = parseInt($("#defaultoffset").val())  + 10;
                        var offset = 0;
                    }

                    var getcount = 0;
                    var processing = $("#category-listing").html();
                    var sortBy = $("input[name='Sort_By']:checked").val();
                    var per_page = "10";
                    var UOM = [];
                    if (searchkey !== '') {
                        url = "/Merchant5/merchant.mvc?Screen=OGJSON&count=" + per_page + "&Offset=" + offset + "&Per_Page=" + per_page + "&customer_id=" + customerId + "&SearchKey=" + searchkey,
                        queryString;
                    } else if (cat_id !== '' && cat_id !== undefined) {
                        url = "/Merchant5/merchant.mvc?Screen=OGJSON&count=" + per_page + "&Offset=" + offset + "&Per_Page=" + per_page + "&customer_id=" + customerId + "&cat_id=" + cat_id;
                    } else {
                        url = "/Merchant5/merchant.mvc?Screen=OGJSON&count=" + per_page + "&Offset=" + offset + "&Per_Page=" + per_page + "&customer_id=" + customerId,
                        queryString
                    }
                    $("#getResponse").val(0);
                    $(".loadcontent").css("display", "flex");
                    $.get(url, function(dataval) {
                        var myObject = this;
                        $(".load-content").css("display", "flex");
                    }).then(function(dataval, status, xhr) {
                        if (searchkey !== '' && $('#SearchKey').val() == '') {
                            ogobjects.products = [];
                        } else if (cat_id !== '' && $('#cat_id').val() === '') {
                            ogobjects.products = [];
                        }
                        //console.log(xhr.status);
                        $("#getResponse").val(xhr.status);
                        //myObject.products = this.products.push(response);
                        if (xhr.status == 200) {
                            console.log(dataval.length);
                            if (dataval.length > 0) {
                                totalcount = dataval[0].total_count;
                                for (var i = 0; i < dataval[0].data.length; i++) {
                                    //console.log(dataval[0].data[i].item_code);
                                    ogobjects.products.push(dataval[0].data[i]);
                                    getcount++;
                                    $("#getCount").val(getcount);
                                }

                                setTimeout(function() {
                                    getProductresponse(dataval[0].data);
                                    if ($(".numberbox").is(":visible")) {
                                        $(".numberbox").each(function() {
                                            $(this).show("slow");
                                            $(".view-pill-btn").hide();
                                            $("#savedisplayorder").show();
                                            $(".numberbox").val("");
                                            $(".numberbox").show();
                                            $(".npord").removeClass("npord");
                                            if (window.matchMedia("(pointer: coarse)").matches !== true) {
                                                $(".sortproducts").sortable("disable");
                                            }
                                        });
                                    }

                                    if ($(".exporttocsvcheck").is(":visible")) {
                                        $(".exporttocsvcheck").each(function() {
                                            $(this).show("slow");
                                            $(".view-pill-btn").hide();
                                            // $("#savedisplayorder").show();
                                            // $(".exporttocsvcheck").val("");
                                            $(".exporttocsvcheck").show();
                                            $(".npord").removeClass("npord");
                                            // if(window.matchMedia("(pointer: coarse)").matches !== true){
                                            // $(".sortproducts").sortable("disable");
                                            // }
                                        });
                                    }
                                }, 100)
                                //products.push(response);
                                $("#defaultoffset").val(offset);
                                $(".loadcontent").css("display", "none");

                            }

                        }
                    }).done(function(html, status, xhr) {
                        if (getcount < 10) {
                            $("#getCount").val(getcount);
                            // $(".loadcontent").css("display", "flex").html("No more items to show");
                            $("#loadmoreorders").hide();
                        } else {
                            if (searchkey !== '' && $('#SearchKey').val() == '') {
                                $('#SearchKey').val(searchkey);
                            }
                            if (totalcount > 1) {
                                $("#loadmoreorders").show();
                            } else {
                                $("#loadmoreorders").hide();
                                $(".loadcontent").css("display", "flex").html("No more items to show");
                            }
                            $(".loadcontent").html('<img src="graphics/00000001/3/loading_2.gif" style="width: 40px;height: 40px;">');
                        }

                    }).fail(function(xhr, status, error) {
                        console.error('Request failed with status:', status + 'xhr ' + xhr + ' ' + error);
                        $(".loadcontent").css("display", "flex").html("Something Went Wrong");
                        $.Toast.showToast({
                            title: error,
                            duration: 3000,
                            icon: 'none',
                        });
                    });
                },
                getUomforInventorymessage(element) {
                    return element.split("of")[0];
                },
                loadJqueryAssets() {
                    $("#recipeFilter").click(function() {
                        $(".filterContainer").removeClass("displayNone");
                    });
                    $(".Fclose").click(function() {
                        $(".filterContainer").addClass("displayNone");
                    });
                    $(".applyFilter").on("click", function() {
                        $(".filterContainer").addClass("displayNone");
                    });

                    jQuery(".showmore").click(function() {
                        var facetClass = jQuery(this).attr("data-class");
                        jQuery(".hidefacet." + facetClass).css("display", "block");
                        jQuery(".collapse-" + facetClass).show();
                        jQuery(this).hide();
                    });
                    jQuery(".collapse").not(".alt_row").click(function() {
                        var facetClass = jQuery(this).attr("data-class");
                        jQuery(".hidefacet." + facetClass).css("display", "block");
                        jQuery(".show-" + facetClass).show();
                        jQuery(this).show();
                    });

                    $(".sortby").click(function() {
                        $(".sort-by-options-wrappers").toggle();
                        if ($(".sort-by-options-wrappers").is(":visible") == true) {
                            $(".sortby").text("-");
                        } else {
                            $(".sortby").text("+");
                        }
                    });

                    $('.dropdown').click(function() {
                        var _this = this;
                        setTimeout(function() {

                            if ($(_this).hasClass('open') == true) {
                                $(_this).find('.dropdown-item').find('.slacdiscounttext').show();
                            } else {
                                $(_this).find('.dropdown-item').find('.slacdiscounttext').hide();
                                $(_this).find('.dLabel1').find('.slacdiscounttext').hide();
                            }
                        }, 10);
                    });

                    $(".loginClick").click(function() {
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

                    jQuery('.loginClick, .createAccount, .businessaccount , .checkoutloginClick').click(function() {
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                        jQuery('body').addClass("noscroll");

                        jQuery("#closelogin,.Lclose").click(function() {
                            jQuery('body').removeClass("noscroll");
                        });
                    });

                },

                getFacets(catcode) {
                    var url = `https://${location.hostname}/Merchant5/merchant.mvc?Screen=AJAXFACETS&Category_Code=${$('#categoryCode').val()}&facets=1`;
                    $.ajax({
                        url: url,
                        beforeSend: function(xhr) {
                            // here we are setting isRequested to true
                            isRequested = true;
                        },
                        success: function(html, Status, xhr) {
                            $(".facets-tree").append($(html).find("#sortoptions").html());
                            $(".filterContent.filters").append($(html).filter(".mobilefilters").html());
                            $(".background-container").css("height", "initial");
                            $(".background-container").css("overflow", "auto");
                            ogobjects.loadJqueryAssets();
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
                        return s.replace(/^[^-]+ - /, "").replace("(", "").replace(")", "");
                    }
                    //console.log(s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
                },
                getpacSize() {
                    let pack_size = 9999;
                    let uom = "";
                    for (let i = 0; i < dataval.length; i++) {
                        for (let j = 0; j < dataval[i].data.variants.length; j++) {
                            if (dataval[i].data.variants[k].pack_size < pack_size && this.vueUserType == "Retail") {
                                pack_size = dataval[i].data.variants[k].pack_size;
                                uom = dataval[i].data.variants[k].UOM;
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
                    if (element.target.value.replace(/\D/g, "") == "" || element.target.value.replace(/\D/g, "") == "0") {
                        $(".ProductDetail-" + getProductCode).find(".addbtn").prop("disabled", true);
                    } else if (element.target.value.replace(/\D/g, "") == "1") {
                        $(".ProductDetail-" + getProductCode).find(".addbtn").prop("disabled", false);
                    } else {
                        $(".ProductDetail-" + getProductCode).find(".addbtn").prop("disabled", false);
                        var newvalue = parseInt(element.target.value.replace(/\D/g, ""));
                        var qtySize = parseInt($(".ProductDetail-" + formId).find(".form-check-input").attr("data-min"));
                        var getdataStock = parseInt($(".ProductDetail-" + formId).find(".form-check-input").attr("data-stock-raw"));
                        var acttualdataStock = parseInt($(".ProductDetail-" + formId).find(".form-check-input").attr("data-stock-raw"));
                        var qtyinCart = parseInt($(".ProductDetail-" + formId).find(".QtyVal").attr("data-qtycart"));
                        $(".ProductDetail-" + formId).find("[name=Quantity").attr("data-added", newvalue);
                        $(".ProductDetail-" + formId).find("[name=Quantity").val(newvalue);
                        $(".ProductDetail-" + formId).find(".form-check-input").attr("data-added", newvalue);
                        $(".ProductDetail-" + formId).find(".addbtn").prop("disabled", false);
                    }
                },
                getsubstitutionInventory(productcode, codes) {
                    var responsedata
                    $.ajax({
                        async: false,
                        url: "/Merchant5/merchant.mvc?Screen=CUDET&ProductAction=substitution&Productcode=" + productcode + "&substitutioncode=" + codes,
                        success: function(response) {
                            var responsedata = response;
                            if (responsedata < 1 || responsedata == '') {
                                console.log(productcode + responsedata);
                                setTimeout(function() {
                                    $('.ProductDetail-' + productcode).find('.viewSubstitutions').hide();
                                }, 500);
                            } else {
                                setTimeout(function() {
                                    $('.ProductDetail-' + productcode).find('.viewSubstitutions').show();
                                }, 500);
                            }

                        },
                    });
                    return responsedata;
                },
                getCurrenctRestockDate(d) {
                    // Convert date string to Date object
                    var dDate = new Date(d);

                    // Get current date with America/New_York timezone
                    var currentDate = new Date().toLocaleString("en-US", {
                        timeZone: "America/New_York"
                    });
                    currentDate = new Date(currentDate);
                    dDate.setHours(0, 0, 0, 0);
                    currentDate.setHours(0, 0, 0, 0);
                    // Compare dates
                    if (dDate < currentDate) {
                        return false;
                    } else {
                        return true;
                    }
                },
                // Function to remove products from order Guide
                removefromOrderGuide(event, pcode, prodId) {
                    var og_id = event.currentTarget.getAttribute("data-ogid").replace(/\D/g, "");
                    var el = event.currentTarget.getAttribute("data-del").replace(/\D/g, "");
                    jQuery.ajax({
                        url: "/ajax.html?CustomerAction=deleteOrderGuide",
                        data: "og_id=" + og_id,
                        showLoader: true,
                        cache: false,
                        beforeSend: function() {},
                        success: function(data) {
                            $(".del-" + pcode).fadeOut();
                            $(".del-" + pcode).text("Product Deleted Successfully");
                            deleteProductPrice(prodId, $('#customerId').val());
			     OrderguideSearchProducts.searchProducts('GG-');
                        },
                    });
                }// Function to remove products from order Guide
                ,
                resetUomValue(event) {
                    var productsku = event.currentTarget.getAttribute("data-ogid")("data-product_sku").replace(/\D/g, "");
                    $(".qtybox-" + productsku).val(0);
                    document.getElementById("addtocart").setAttribute("disabled", true);
                    $(".multiprodqty").each(function() {
                        if ($(this).val() > 0) {
                            $("#addtocart").attr("disabled", false);
                        }
                    });
                },
                qtyValueReset(event) {
                    var qtyUpdated = event.currentTarget.value;
                    if (qtyUpdated == "") {
                        $(event).val("0");
                        event.currentTarget.value = 0;
                    }
                    $(".multiprodqty").each(function() {
                        if ($(this).val() > 0) {
                            $("#addtocart").attr("disabled", false);
                        }
                    });
                },
                loadOrderGuideCategories() {
                    var jsonRequest = '{"Store_Code": "G","Function":"Module","Session_Type":"runtime","Module_Code":"frorderguide","Module_Function":"FR_OG_Categories","customer_id":"' + customerId + '"}';
                    $.ajax({
                        type: "POST",
                        url: "/Merchant5/json.mvc",
                        data: jsonRequest,
                        contentType: "application/json",
                        dataType: "json",
                        success: function(dataval) {
                            console.log(dataval);
                            ogcat = new Vue({
                                el: '#ogcategories',
                                data: {
                                    ogcategories: dataval
                                },
                                methods: {},
                                mounted() {
                                    this.$nextTick( () => {
                                        ogobjects.loadCatIdOnCheck();
                                        $('body').on('click', '#clearAllCat', function() {
                                            $('#cat_id').val('');
                                            $('#clearAllCat').prop('disabled', true);
                                            $('body').find('#ogcategories [type="checkbox"]:checked').each(function() {
                                                $(this).prop('checked', false);
                                            });
                                            $("#defaultoffset").val('-10');
                                            $('#editdisplayorder').prop('disabled', false);
                                            if (window.matchMedia("(pointer: coarse)").matches !== true) {
                                                $(".sortproducts").sortable({
                                                    disabled: false
                                                });
                                            }
                                            ogobjects.products = [];
                                            ogobjects.getallproducts('', '');
                                            $("#loadmoreorders").hide();
                                        });

                                    }
                                    )
                                }
                            })
                        },
                    });
                },
                loadCatIdOnCheck() {
                    $(document).ready(function() {});
                        $('body').find('#ogcategories [type="checkbox"]').off('change').change(function() {
                            console.log('click')
                            $('#cat_id').val('');
                            ogobjects.products = [];
                            let cat_id = [];
                            $('body').find('#ogcategories [type="checkbox"]:checked').each(function() {
                                cat_id.push($(this).val());
                            });

                            if (cat_id == '') {
                                $("#defaultoffset").val('-10');
                                $('#editdisplayorder').prop('disabled', false);
                                $('#clearAllCat').prop('disabled', true);
                                if (window.matchMedia("(pointer: coarse)").matches !== true) {
                                    $(".sortproducts").sortable({
                                        disabled: false
                                    });
                                }
                            } else {
                                $('#editdisplayorder').prop('disabled', true);
                                $('#clearAllCat').prop('disabled', false);
                                if (window.matchMedia("(pointer: coarse)").matches !== true) {
                                    $(".sortproducts").sortable({
                                        disabled: true
                                    });
                                }
                            }

                            // For demonstration, let's log the cat_id parameter
                            console.log('cat_id:', cat_id.join(','));

                            // If you want to append the data to a form parameter or input field
                            // You can do something like this:

                            // Check if the hidden input already exists
                            if ($('#cat_id').length === 0) {
                                // If not, create it
                                $('<input>').attr({
                                    type: 'hidden',
                                    id: 'cat_id',
                                    name: 'cat_id',
                                    value: cat_id.join(',')
                                });
                            } else {// If it exists, just update its value
                            // $('#cat_id').val(cat_id.join(','));
                            }

                            $(".loadcontent").html('<img src="graphics/00000001/3/loading_2.gif" style="width: 40px;height: 40px;">');
                            ogobjects.getallproducts(cat_id, '');
                        });
                    

                },
                setQuantityforThreebie(productid, type) {
                    var checkbtnstatus = true;
                    var qty = 0;
                    if (type === 'Threebie') {
                        checkbtnstatus = false;
                        qty = 3;
                    } else {
                        checkbtnstatus = true;
                        qty = 0;
                    }
                    $('#addtocart').prop('disabled', checkbtnstatus);
                    $('.qty-' + productid).val(qty);
                },
            },
            computed: {
                gridClass: function() {
                    var gridClass = '';
                    if ((getPageCodes != 'SFNT') && getPageCodes != 'BASK' && getPageCodes != 'MSHIP' && getPageCodes != 'ShelfLP' && getPageCode != 'ShelfLP_copy') {
                        gridClass = 'col-xs-6s col-sm-6s col-md-4s col-lg-3s gridclass ' + getPageCode;
                    }
                    return gridClass;
                }
            },
            mounted() {
                this.$nextTick( () => {
                    $('#MostPurchasedProducts').show();
                    setTimeout(function() {
                        CheckBasketItemss();
                    }, 1200)
                    // addProductNew();
                    checkthreebiecounter();
                    checkSlacCounter();
                    if (dataval[0].data.length >= 10) {
                        $("#loadmoreorders").show();
                    }
                    ogobjects.loadOrderGuideCategories();

                }
                );

                $(document).ready(function() {
                    ogobjects.loadJqueryAssets();
                    ogobjects.loadCatIdOnCheck();
                });

            },
            updated: function() {
                ogobjects.loadJqueryAssets();
                CheckBasketItemss();
                setTimeout(function() {
                    addProductNew();
                }, 500);
            },
        });
        CheckBasketItemss();
        addProductNew();
    });
    if (getPageCodes == 'CTGY') {
        getshelfcoupons();
    }
    $(".closeCart").on("click", function() {/*location.reload();*/
    });
});

function CheckBasketItemss() {
    $.getJSON("/GLOBALBASK_JSON.html", function(data) {
        if (data.groups.length) {
            $.each(data.groups, function(i, item) {
                var popupid = item.code;
                var radiocheck = $('input[value="' + popupid + '"]');
                var popupidparent = $(radiocheck).attr("data-parent");
                var productcode = item.product.code;
                var reminingqty = $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-stockafteraddedtocart");
                $(".ProductDetail-" + productcode).find(".prodcodecheck-" + popupid).each(function() {
                    $(this).attr("data-qtycart", item.quantity);
                });
                $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycart", item.quantity);
                $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycartcheck", item.quantity);
                $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-qtycart");

                var totalinv = $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-stock");
                $(".ProductDetail-" + productcode).find(".QtyVal").attr("data-stockafteraddedtocart", totalinv - item.quantity);
                if ($(radiocheck).attr("data-parent") != "" && $(radiocheck).attr("data-parent") != undefined)
                    popupid = $(radiocheck).attr("data-parent");
                else
                    var radiocheck = $('.form-check-dropdown input[value="' + popupid + '"]');

                if (reminingqty < 1) {//$(".ProductDetail-" + productcode).hide(); 
                }
            });
        }
    });
}

// function getProductresponse(dataval) {
// if(dataval.length  < 1){
// $('.noprouctsmsg').css('display','flex');
// }else{
//   $('.noprouctsmsg').css('display','none');
// }
//   var products = [];
//   var getcount = 0;
//   var uom = "";
//   var addclass = "";
//   for (let i = 0; i < dataval.length; i++) {

//     var lowestUOM = "";
//     var pack_size = 9999;
//     var lowestprice = "";
//     var highestpacksize = "";
//     var highestprice = "";
//     var pricediscount = "";
//     var casesaving = "";
//     var casesavingwholesale = "";
//     var isSale = "";
//     var isChildSale = "";
//     var checkdealflags = "";
//     var getpacksize;
//     var checkedvalue = '';
//     for (let j = 0; j < dataval[i].product.length; j++) {
//     getpacksize = Math.min.apply(null, dataval[i].product[j].data.variants.map(function(item) {
//       return item.pack_size;
//     }));
//   }
//   for (let j = 0; j < dataval[i].product.length; j++) {
//     for (let k = 0; k < dataval[i].product[j].data.variants.length; k++) {
//     }
//   }

//     for (let j = 0; j < dataval[i].product.length; j++) {
//       for (let k = 0; k < dataval[i].product[j].data.variants.length; k++) {
//       if (getpacksize < pack_size) {
//         lowestUOM = dataval[i].product[j].data.variants[k].UOM;
//         pack_size = dataval[i].product[j].data.variants[k].pack_size;
//         isChildSale = dataval[i].product[j].data.variants[k].sale;
//         if (isChildSale == 0) {
//           lowestprice = dataval[i].product[j].data.variants[k].price;
//         }
//       }
//       if (dataval[i].product[j].data.variants[k].pack_size !== getpacksize) {
//         dataval[i].product[j].data.variants[k].addclass = "hidden";
//         dataval[i].product[j].data.variants[k].selecthighestuom = true;
//         dataval[i].product[j].data.variants[k].default = "0";
//         isSale = dataval[i].product[j].data.variants[k].sale;

//         if(dataval[i].product[j].data.variants[k].slac == "1"){
//           checkdealflags = 'yes';
//           dataval[i].product[j].data.variants[k].checkdealflags = "yes";
//           }else{
//           checkdealflags = 'yes';
//           }

//         if (dataval[i].product[j].data.variants[k].slacdiscount == 0  &&  setWholesaleuser != 1) {
//           highestprice = parseFloat(dataval[i].product[j].data.variants[k].price);
//           msrpprice = parseFloat(dataval[i].product[j].data.variants[k].msrp);

//           var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);

//           getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(2);
//           casesaving = 100 * (msrpprice - highestprice) / (msrpprice);
//           if (casesaving.toFixed(2) > 0 && dataval[i].product[j].data.variants[k].slacdiscount <= '0') {
//             // dataval[i].data.variants[k].notes = "Save " + parseFloat(casesaving.toFixed(2)) + '%';
//             dataval[i].product[j].data.variants[k].slacdiscount = parseFloat(casesaving.toFixed(2) );
//           }
//           if(dataval[i].product[j].data.variants[k].notes != '' && dataval[i].product[j].data.variants[k].UOM_TEXT != 'Threebie' && dataval[i].product[j].data.variants[k].sale == '1' && setWholesaleuser != 1){
//             dataval[i].product[j].data.variants[k].notes = dataval[i].product[j].data.variants[k].notes;
//            }
//           else if(dataval[i].product[j].data.variants[k].sale != '1' && setWholesaleuser != 1) {
//              dataval[i].product[j].data.variants[k].notes = '';
//             }
//            else if(dataval[i].product[j].data.variants[k].sale != '1' && setWholesaleuser === 1){
//              dataval[i].product[j].data.variants[k].notes = '';
//             }
//         }

//        else if (isSale == 0 && isChildSale == 0) {
//           highestpacksize = dataval[i].product[j].data.variants[k].pack_size;
//           highestprice = parseFloat(dataval[i].product[j].data.variants[k].price);
//           pricediscount = parseFloat(lowestprice * highestpacksize);
//           var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);
//           // 100 x (each price * no of items - case price) / (each price * no of items)
//           getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(2);
//           casesavingwholesale = 100 * (pricediscount - highestprice) / (pricediscount);
//           if (casesavingwholesale.toFixed(2) > 0 && dataval[i].product[j].data.variants[k].catch_weight != '1' && dataval[i].product[j].data.variants[k].notes == '') {
//               dataval[i].product[j].data.variants[k].notes = "Save " + parseFloat(casesavingwholesale.toFixed(2)) + '%'; 
//           }else{
//               dataval[i].product[j].data.variants[k].notes = "";
//           }
//         }
//       }
//          else {
//             dataval[i].product[j].data.variants[k].default = "1";
//             if(dataval[i].product[j].data.variants[k].notes != '' && dataval[i].product[j].data.variants[k].UOM_TEXT != 'Threebie' && dataval[i].product[j].data.variants[k].sale == '1' && setWholesaleuser != 1){
//              dataval[i].product[j].data.variants[k].notes = dataval[i].product[j].data.variants[k].notes;
//             }
//             else if(dataval[i].product[j].data.variants[k].notes != '' && dataval[i].product[j].data.variants[k].vip_sale === 1){
//               dataval[i].product[j].data.variants[k].notes = dataval[i].product[j].data.variants[k].notes;
//              }
//            else if(dataval[i].product[j].data.variants[k].sale != '1' && setWholesaleuser != 1){
//               dataval[i].product[j].data.variants[k].notes = '';
//              }
//             else if(dataval[i].product[j].data.variants[k].sale != '1' && setWholesaleuser === 1){
//               dataval[i].product[j].data.variants[k].notes = '';
//              }
//              dataval[i].product[j].data.variants[k].selectlowsestuom = true;
//           }

//       if (dataval[i].product[j].data.variants[k].UOM == "EA") {
//         dataval[i].product[j].data.variants[k].UOM = "EACH";
//       } else if (dataval[i].product[j].data.variants[k].UOM == "CS") {
//         dataval[i].product[j].data.variants[k].UOM =  "CASE" + " of " + dataval[i].product[j].data.variants[k].pack_size;
//       } else if (dataval[i].product[j].data.variants[k].UOM == "BAG") {
//         dataval[i].product[j].data.variants[k].UOM =
//           "BAG" + " of " + dataval[i].product[j].data.variants[k].pack_size;
//       } else if (dataval[i].product[j].data.variants[k].UOM == "BX") {
//         dataval[i].product[j].data.variants[k].UOM =
//           "Box" + " of " + dataval[i].product[j].data.variants[k].pack_size;
//       } else if (dataval[i].product[j].data.variants[k].UOM == "PK") {
//         dataval[i].product[j].data.variants[k].UOM =
//           "Pack" + " of " + dataval[i].product[j].data.variants[k].pack_size;
//       } else if (dataval[i].product[j].data.variants[k].UOM == "TUB") {
//         dataval[i].product[j].data.variants[k].UOM =
//           "TUB" + " of " + dataval[i].product[j].data.variants[k].pack_size;
//       } else {
//         dataval[i].product[j].data.variants[k].UOM = dataval[i].product[j].data.variants[k].UOM;
//       }

//       if (dataval[i].uom_text == "EA") {
//         dataval[i].uom_text = "EACH";
//       } else if (dataval[i].uom_text == "CS") {
//         dataval[i].uom_text =  "CASE";
//       } else if (dataval[i].uom_text == "BAG") {
//         dataval[i].uom_text =
//           "BAG";
//       } else if (dataval[i].uom_text == "BX") {
//         dataval[i].uom_text =
//           "Box";
//       } else if (dataval[i].uom_text == "PK") {
//         dataval[i].uom_text =
//           "Pack";
//       } else if (dataval[i].uom_text == "TUB") {
//         dataval[i].uom_text =
//           "TUB";
//       } else {
//         dataval[i].uom_text = dataval[i].uom_text;
//       }

//       if(dataval[i].product[j].data.variants[k].UOM.includes(dataval[i].uom_text) === true && dataval[i].product[j].data.variants[k].UOM_TEXT !== 'Threebie' && dataval[i].uom_text !== ''){
//         dataval[i].product[j].data.variants[k].checkedvalue = true; 
//       }else if((dataval[i].product[j].data.variants[k].selecthighestuom == true || dataval[i].product[j].data.variants[k].selectlowsestuom == true) && ( dataval[i].uom_text == '') ){
//         dataval[i].product[j].data.variants[k].checkedvalues = true; 
//       }

//       if(dataval[i].product[j].data.variants[k].sale == 0 && dataval[i].product[j].data.variants[k].sale_offer == 1){
//         dataval[i].product[j].data.variants[k].sale = 2;
//       }
//       else if((dataval[i].product[j].data.variants[k].sale == 0 && dataval[i].product[j].data.variants[k].vip_sale == 1) || dataval[i].product[j].data.variants[k].sale == 1 && dataval[i].product[j].data.variants[k].vip_sale == 1){
//         dataval[i].product[j].data.variants[k].sale = 3;
//       }
//       else{
//         dataval[i].product[j].data.variants[k].sale = dataval[i].product[j].data.variants[k].sale ;
//       }

//     }
//           setTimeout(function(){
//         if(dataval[i].product[j].data.product_inventory <= 0 && dataval[i].product[j].data.substitute !=''){
//           ogobjects.getsubstitutionInventory(dataval[i].product[j].data.code,dataval[i].product[j].data.substitute);
//           }         
//       },10);
//   }

//   }
//   // console.log(dataval);
//   //console.log(products);
// }

function getProductresponse(dataval) {
    if (dataval.length < 1) {
        $('.noprouctsmsg').css('display', 'flex');
    } else {
        $('.noprouctsmsg').css('display', 'none');
    }
    const productpricelist = {};
    const productcatchweight = {};
    const lastordered = [];
    var products = [];
    var uomMap = {
        "EA": "EACH",
        "CS": "CASE",
        "BAG": "BAG",
        "BX": "Box",
        "PK": "Pack",
        "TUB": "TUB"
    };

    dataval.forEach(item => {
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
        var getpacksize = Math.min(...item.product.map(p => Math.min(...p.data.variants.map(v => v.pack_size))));
        var getpricechanged = '';

        var currentPrice = {}
        // console.log(item.price);
        console.log(item.last_ordered);
        lastordered.push(`lastordered: '${item.last_ordered}'`);
        item.product.forEach(product => {
            let newProductPrices = [];

            product.data.variants.forEach(variant => {
                // Array to store newproductprice values
                var checkthreebie = ''
                console.log(variant.price);
                var specificProductCode = variant.code;
                variant.newproductprice = `${variant.code}=${parseFloat(variant.price).toFixed(2)}`;
                if (variant.code === specificProductCode) {
                    newProductPrices.push(variant.newproductprice);
                    // Add newproductprice to array

                }

                let joinedPrices = newProductPrices.join('|');

                // Join array with '|'
                //console.log(joinedPrices); // Log the joined string
                item.newprices = joinedPrices;
                // console.log(joinedPrices);

                if (variant.UOM_TEXT === 'Threebie') {
                    checkthreebie = variant.code + '-' + variant.UOM_TEXT;
                } else {
                    checkthreebie = variant.code;
                    catchweight = variant.catch_weight;
                    productpricelist[variant.code] = parseFloat(variant.price).toFixed(2);
                    productcatchweight[variant.code] = catchweight;
                    // console.log('test');
                }

                currentPrice[variant.code] = parseFloat(variant.price).toFixed(2);

                // console.log(currentPrice);
                // console.log(checkthreebie);

                // Parse the old data and create a map of old prices
                var oldPriceMap = {};
                item.price.split("|").forEach(function(item) {
                    var parts = item.split("-");
                    var code = parts.slice(0, -1).join("-");
                    // Join all parts except the last one
                    var price = parts.pop();
                    oldPriceMap[code] = price;
                });

                // Compare old prices with new prices and show changes
                // console.log("Price Changes:");
                for (var code in currentPrice) {
                    if (oldPriceMap[code] !== undefined) {
                        if (oldPriceMap[code] !== currentPrice[code]) {
                            // console.log(
                            //   `Price change detected for ${code}: Old Price = ${oldPriceMap[code]}, New Price = ${currentPrice[code]}`
                            // );

                            variant.priceupdate = currentPrice[code];
                            if (currentPrice[code] < oldPriceMap[code]) {
                                variant.pricechangevalue = true;
                                variant.pricedifference = parseFloat(oldPriceMap[code]).toFixed(2) - parseFloat(currentPrice[code]).toFixed(2);
                            }
                        } else {
                            // console.log(
                            //   `${code} price has not changed. Current Price = ${currentPrice[code]}`
                            // );
                            variant.pricechangevalue = false;
                        }
                    } else {
                        //   console.log(`${code} not found in old data.`);
                        variant.pricechangevalue = false;
                    }
                }

                // console.log(parseFloat(oldPriceMap[code]).toFixed(2) +''+ parseFloat(currentPrice[code]).toFixed(2));
                // console.log(variant.code + ' ' + variant.pricechangevalue + `Old Price ${oldPriceMap[code]}, New Price = ${currentPrice[code]}`);

                if (getpacksize < pack_size) {
                    lowestUOM = variant.UOM;
                    pack_size = variant.pack_size;
                    isChildSale = variant.sale;
                    if (isChildSale == 0) {
                        lowestprice = variant.price;
                    }
                }
                variant.defaults = variant.default;
                if (variant.pack_size !== getpacksize) {
                    variant.addclass = "hidden";
                    variant.selecthighestuom = true;
                    variant.default = "0";
                    isSale = variant.sale;

                    if (variant.slac == "1") {
                        checkdealflags = 'yes';
                        variant.checkdealflags = "yes";
                    } else {
                        checkdealflags = 'yes';
                    }

                    if (variant.slacdiscount == 0 && setWholesaleuser != 1) {
                        highestprice = parseFloat(variant.price);
                        var msrpprice = parseFloat(variant.msrp);
                        var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);
                        var getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(2);
                        casesaving = 100 * (msrpprice - highestprice) / msrpprice;

                        if (casesaving.toFixed(2) > 0 && variant.slacdiscount <= '0') {
                            variant.slacdiscount = parseFloat(casesaving.toFixed(2));
                        }

                        if (variant.notes && variant.UOM_TEXT != 'Threebie' && variant.sale == '1' && setWholesaleuser != 1) {
                            variant.notes = variant.notes;
                        } else if (variant.sale != '1' && setWholesaleuser != 1) {
                            variant.notes = '';
                        } else if (variant.sale != '1' && setWholesaleuser === 1) {
                            variant.notes = '';
                        }
                    } else if (isSale == 0 && isChildSale == 0) {
                        highestpacksize = variant.pack_size;
                        highestprice = parseFloat(variant.price);
                        pricediscount = parseFloat(lowestprice * highestpacksize);
                        caseprice = parseFloat(pricediscount - highestprice).toFixed(2);
                        getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(2);
                        casesavingwholesale = 100 * (pricediscount - highestprice) / pricediscount;

                        if (casesavingwholesale.toFixed(2) > 0 && variant.catch_weight != '1' && !variant.notes) {
                            variant.notes = "Save " + parseFloat(casesavingwholesale.toFixed(2)) + '%';
                        } else {
                            variant.notes = "";
                        }
                    }
                } else {
                    variant.default = "1";

                    if (variant.notes && variant.UOM_TEXT != 'Threebie' && variant.sale == '1' && setWholesaleuser != 1) {
                        variant.notes = variant.notes;
                    } else if (variant.notes && variant.vip_sale === 1) {
                        variant.notes = variant.notes;
                    } else if (variant.sale != '1' && setWholesaleuser != 1) {
                        variant.notes = '';
                    } else if (variant.sale != '1' && setWholesaleuser === 1) {
                        variant.notes = '';
                    }

                    variant.selectlowsestuom = true;
                }

                variant.UOM = uomMap[variant.UOM] || variant.UOM;
            }
            );

            setTimeout( () => {
                if (product.data.product_inventory <= 0 && product.data.substitute) {
                    ogobjects.getsubstitutionInventory(product.data.code, product.data.substitute);
                }
            }
            , 10);
        }
        );

        item.uom_text = uomMap[item.uom_text] || item.uom_text;

        item.product.forEach(product => {
            product.data.variants.forEach(variant => {
                if (variant.UOM.includes(item.uom_text) && variant.UOM_TEXT != 'Threebie' && item.uom_text) {
                    variant.checkedvalue = true;
                } else if ((variant.selecthighestuom || variant.selectlowsestuom) && !item.uom_text) {
                    variant.checkedvalues = true;
                }

                if (variant.sale == 0 && variant.sale_offer == 1) {
                    variant.sale = 2;
                } else if ((variant.sale == 0 && variant.vip_sale == 1) || (variant.sale == 1 && variant.vip_sale == 1)) {
                    variant.sale = 3;
                } else {
                    variant.sale = variant.sale;
                }
            }
            );
        }
        );
    }
    );
    // console.log(productpricelist);
    getSavedPriceValue(productpricelist, productcatchweight, dataval, lastordered);
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
        success: function(response) {
            var res = response;
            responsedata = res.replaceAll(/\s/g, "");
            /*console.log(responsedata);*/
        },
    });
    return responsedata;
}

function selectUOM(value, pcode, type) {
    let className = '';
    let isChecked = '';
    $('.ProductDetail-' + pcode).find('.pricedrop-' + value).hide();
    $('.ProductDetail-' + pcode).find('.pricedrop-' + value).addClass('hidden');
    $('.ProductDetail-' + pcode).find('.priceupdate-' + value).addClass('hidden');
    if (type == 'Threebie') {
        $('.ProductDetail-' + pcode).find('.defaultClass').addClass('hidden');
        $('.ProductDetail-' + pcode).find('.pricedrop-' + value).hide();
        $('.ProductDetail-' + pcode).find('.priceupdate-' + value + type).removeClass('hidden');
        $('.ProductDetail-' + pcode).find('.priceupdate-' + value + type).addClass('defaultClass');
    } else {
        $('.ProductDetail-' + pcode).find('.defaultClass').addClass('hidden');
        $('.ProductDetail-' + pcode).find('.pricedrop-' + value).hide();
        $('.ProductDetail-' + pcode).find('.priceupdate-' + value).removeClass('hidden');
        $('.ProductDetail-' + pcode).find('.priceupdate-' + value).addClass('defaultClass');
    }
    $('.ProductDetail-' + pcode).find('.defaultClass').addClass('hidden');
    $('.ProductDetail-' + pcode).find('.specials-' + value).removeClass('hidden');
    if (type == 'Threebie') {
        $('.ProductDetail-' + pcode).find('.defaultClass').addClass('hidden');
    } else {
        $('.ProductDetail-' + pcode).find('.defaultClass').addClass('hidden');
        $('.ProductDetail-' + pcode).find('.specials-' + value).removeClass('hidden');
        $('.ProductDetail-' + pcode).find('.specials-' + value).addClass('defaultClass');
    }
    return {
        className,
        isChecked
    };
}

function addCheckedToCart(buyButton, allB) {
    let itemsToBuy = 0;
    let dataAjax = "";
    const currentPrice = [];
    buyButton = $(buyButton);
    const prevText = $(buyButton).text();
    buyButton.addClass("adding");

    $(".deski input[type=tel]:visible").each(function() {
        const productCode = $(this).attr("data-product-att2");
        const productid = $(this).attr("data-productid");
        const storePrice = $(this).attr("data-storeprice");
        const dataprice = $(this).attr("data-price");
        const id = $(this).attr("data-id");
        const customerId = $('#customerId').val();

        if ($(this).val() !== "0" || allB) {

            const qty = allB ? $(this).closest(".col-sm-6").find(".orderedQty").text() : $(this).val();
            const parentProdCode = $(this).attr("data-productcode");
            const checkedAttr = $(`input[data-product_code=${parentProdCode}][type=radio]:checked`);
            const radioCheck = $(`input[data-product_code=${parentProdCode}][type=radio]`);
            const dataStock = parseInt(radioCheck.attr("data-stock"));
            const minQty = parseInt($(`.ProductDetail-${productCode} input[type=radio]:checked`).attr("data-min"));

            if (qty) {
                const productKey = $(`.ProductDetail-${productCode}`);
                if (productKey.find(".multiprodcode").attr("name") != undefined) {
                    dataAjax += `&${productKey.find(".multiprodcode").attr("name")}=${productKey.find(".multiprodcode").val()}`;
                }
                if (productKey.find(".multiprodqty").attr("name") != undefined) {
                    dataAjax += `&${productKey.find(".multiprodqty").attr("name")}=${qty}`;
                }
                if (productKey.find(".miltiattrcode").attr("name") != undefined) {
                    dataAjax += `&${productKey.find(".miltiattrcode").attr("name")}=${productKey.find(".miltiattrcode").val()}`;
                }
                if (productKey.find(".miltiattrvalue").attr("name") != undefined) {
                    dataAjax += `&${productKey.find(".miltiattrvalue").attr("name")}=${checkedAttr.val()}`;
                }
            }

            itemsToBuy++;
            const newStock = dataStock - minQty * qty;
            $(`.ProductDetail-${parentProdCode}:visible`).find(".data-min").attr("data-reorderstock", newStock);
            $(radioCheck).attr("data-stock", newStock);
            CheckBasketItemss();
            // console.log(storePrice);
            let matchFound = false;
            getsavedprice.forEach(item => {
                if (item.id.includes(productid)) {
                    console.log(`${item.id} available for product code: ${productCode}`);
                    matchFound = true;
                }
            }
            );

            if (!matchFound) {
                console.log(`${productid} added for product code: ${productCode}`);
                currentPrice.push({
                    price: storePrice,
                    id: productid // use productid instead of id
                });
                addProductDatatoUserSavedlist(productid, customerId, storePrice);
            }
        }
    });

    const url = "/Merchant5/merchant.mvc?Screen=GLOBALBASK_JSON&Action=ADPM";

    $.post(url, dataAjax, () => {
        if (typeof refreshItemsOnBasket === "function") {
            basketApp.loadBasket();
            refreshItemsOnBasket();
        }
        setTimeout( () => {
            buyButton.removeClass("adding");
        }
        , 1000);
    }
    );

    $(".deski input[type=tel]").val(0);
    $(".mobi input[type=tel]").val(0);
    $("#addtocart").attr("disabled", true);
    if (screen.width <= 1024) {
        $(".footer_addcart").css("display", "none");
    }
    CheckBasketItemss();
}

//   function getSavedPriceValue(productpricelist, productcatchweight, dataval,lastordered) {
//     const url = "/cudet.html?CustomerAction=frproductprice";

//     $.ajax({
//       url: url,
//       success: function (response) {
//         const newPrices = response.data;
//         let matchFound = 0;
//         getsavedprice = response.data;
//         const priceChangeHandler = (productCode, priceDifference) => {
//             const $radioUnit = $(".radioUnit-" + productCode);
//             const $priceDrop = $(".pricedrop-" + productCode).hide();
//             const $priceUpdate = $(".priceupdate-" + productCode).addClass('hidden').addClass('defaultClass');
//             console.log(productCode);
//             console.log(lastordered);
//             $radioUnit.off("change").on("change", function () {
//               $priceDrop.hide(); // Hide price drop message initially
//               $('.ProductDetail-' + productCode).find('.defaultClass').addClass('hidden');
//               $('.priceupdate').addClass('hidden');

//               if (Math.abs(priceDifference) > 0) {
//                 $priceDrop
//                   .html(`Price dropped by $${Math.abs(priceDifference).toFixed(2)}`)
//                   .show();
//                     $priceUpdate.removeClass('hidden');
//                     $priceDrop.removeClass('hidden');
//               } else {
//                 $priceDrop.hide(); // Ensure price drop message is hidden if no difference
//                 $(".priceupdate-" + productCode).addClass('hidden');
//               }
//             });

//             // Trigger the click event by default if there is a price drop
//             if (!$priceDrop.is(":visible") && Math.abs(priceDifference) > 0) {
//                 console.log(1);
//               $radioUnit.trigger("click");
//             }

//             // Trigger the change event manually if the radio button is already checked and there is a price drop
//             if ($radioUnit.is(":checked") && Math.abs(priceDifference) > 0) {
//                 console.log(2);
//               $radioUnit.trigger("change");
//             }
//           };

//         newPrices.forEach((item) => {
//           const productCode = item.code;
//           const newPrice = parseFloat(item.price).toFixed(2);
//           const currentPrice = parseFloat(productpricelist[productCode]);

//           if (currentPrice && currentPrice !== newPrice && currentPrice < newPrice ) {
//             const priceDifference = currentPrice - newPrice;
//             const percentageDrop = Math.abs(
//               (priceDifference / currentPrice) * 100
//             );
//             const roundedPercentageDrop = Math.round(percentageDrop * 100) / 100;

//             matchFound = 1;
//             const catchweight = productcatchweight[productCode];
//             $(".pricedrop-" + productCode).hide();

//             if (catchweight == 1 && Math.abs(priceDifference) >= 0.99) {
//               console.log(
//                 `Product: ${productCode}, Current Price: $${currentPrice}, New Price: $${newPrice}, Price Difference: $${Math.abs(
//                   priceDifference
//                 ).toFixed(2)}`
//               );

//               priceChangeHandler(productCode, priceDifference);
//             } else {
//               if (roundedPercentageDrop >= 3) {
//                 console.log(
//                   `Product: ${productCode}, Current Price: $${currentPrice}, New Price: $${newPrice}, Price Dropped by ${roundedPercentageDrop}%`
//                 );
//                 console.log(
//                   `Product: ${productCode}, Current Price: $${currentPrice}, New Price: $${newPrice}, Price Difference: $${Math.abs(
//                     priceDifference
//                   ).toFixed(2)}`
//                 );

//                 priceChangeHandler(productCode, priceDifference);
//               }
//             }
//           }
//         });
//       },
//     });
//   }

function getSavedPriceValue(productpricelist, productcatchweight, dataval, lastordered) {
    const url = "/cudet.html?CustomerAction=frproductprice";

    $.ajax({
        url: url,
        success: function(response) {
            const newPrices = response.data;
            let matchFound = 0;
            getsavedprice = response.data;

            const priceChangeHandler = (productCode, priceDifference, unit) => {
                const $radioUnit = $(".radioUnit-" + productCode);
                const $priceDrop = $(".pricedrop-" + productCode).hide();
                const $priceUpdate = $(".priceupdate-" + productCode).addClass('hidden').addClass('defaultClass');
                //   console.log(productCode);
                //   console.log(lastordered);

                $radioUnit.off("change").on("change", function() {
                    $priceDrop.hide();
                    // Hide price drop message initially
                    $('.ProductDetail-' + productCode).find('.defaultClass').addClass('hidden');
                    $('.priceupdate').addClass('hidden');

                    if (Math.abs(priceDifference) > 0) {
                        $priceDrop.html(`Price dropped by $${Math.abs(priceDifference).toFixed(2)}`).show();
                        $priceUpdate.removeClass('hidden');
                        $priceDrop.removeClass('hidden');
                    } else {
                        $priceDrop.hide();
                        // Ensure price drop message is hidden if no difference
                        $(".priceupdate-" + productCode).addClass('hidden');
                    }
                });

                // Check if the last ordered unit matches the price drop unit
                if (lastordered === unit && Math.abs(priceDifference) > 0) {
                    console.log("test" + 1);
                    $radioUnit.trigger("click");
                }
                // Trigger the change event manually if the radio button is already checked and the unit matches
                else if ($radioUnit.is(":checked") && Math.abs(priceDifference) > 0) {
                    console.log("test" + 2);
                    $radioUnit.trigger("change");
                }
            }
            ;

            newPrices.forEach( (item) => {
                const productCode = item.code;
                const newPrice = parseFloat(item.price).toFixed(2);
                const currentPrice = parseFloat(productpricelist[productCode]);
                const unit = item.unit;
                // Assuming the unit is provided in the response

                if (currentPrice && currentPrice !== newPrice && currentPrice < newPrice) {
                    const priceDifference = currentPrice - newPrice;
                    const percentageDrop = Math.abs((priceDifference / currentPrice) * 100);
                    const roundedPercentageDrop = Math.round(percentageDrop * 100) / 100;

                    matchFound = 1;
                    const catchweight = productcatchweight[productCode];
                    $(".pricedrop-" + productCode).hide();

                    if (catchweight == 1 && Math.abs(priceDifference) >= 0.99) {
                        console.log(`Product: ${productCode}, Current Price: $${currentPrice}, New Price: $${newPrice}, Price Difference: $${Math.abs(priceDifference).toFixed(2)}`);

                        priceChangeHandler(productCode, priceDifference, unit);
                    } else {
                        if (roundedPercentageDrop >= 3) {
                            console.log(`Product: ${productCode}, Current Price: $${currentPrice}, New Price: $${newPrice}, Price Dropped by ${roundedPercentageDrop}%`);
                            console.log(`Product: ${productCode}, Current Price: $${currentPrice}, New Price: $${newPrice}, Price Difference: $${Math.abs(priceDifference).toFixed(2)}`);

                            priceChangeHandler(productCode, priceDifference, unit);
                        }
                    }
                }
            }
            );
        },
    });
}

//   console.log(getsavedprice);

// Function to delete the product price
async function deleteProductPrice(prodId, custId) {
    const url = `/?Screen=majax&mobileAction=deleteProductPrice&prod_id=${prodId}&cust_id=${custId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Product price deleted successfully:', data);
            // Handle the success response (e.g., update the UI)
        } else {
            console.error('Failed to delete product price. Status:', response.status);
            // Handle the error response
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}