
    let storeOrderedValues = '';
    let hasRedirected = false;
    var SearchProductslist = new Vue({
        el: "#app-search",
        data: {
            orderguideProducts: [],
            SearchProductslist: [],
            products: [],
            savedforlater1: [],
            debounceTimeout: null,
            loading: false, // Loader state
        },
        methods: {

            getallproducts(cat_id) {
                var seturl = '';
                if (cat_id == '') {
                    // cat_id = categoryCode;
                    cat_id = $("#categoryCode").val();
                    var offset = parseInt($("#defaultoffset").val()) + 16;
                } else {
                    var offset = 0;
                }
                var getcount = 0;
                var processing = $("#category-listing").html();
                var sortBy = $("input[name='Sort_By']:checked").val();
                var per_page = "16";
                var UOM = [];
                $("#getResponse").val(0);
                seturl = getPageCode !== 'SRCH' ? `/Merchant5/merchant.mvc?Screen=CTGYJSON&Category_Code=${cat_id}&CatListingOffset=${offset}&Offset=${offset}&Per_Page=${per_page}&Sort_By=${sortBy}&facets=1&${queryString}` : `https://${location.hostname}/SRCHJSON.html?Search=${searchKey}&SearchOffset=${offset}&Sort_By=${sortKey}${queryString}&Per_Page=${per_page}&recipes=No&x=0&y=0`;
                $.get(
                    seturl,
                    function (dataval) {
                        var myObject = this;
                        $(".load-content").css("display", "flex");
                    }
                )
                    .then(function (response, status, xhr) {
                        //console.log(xhr.status);
                        $("#getResponse").val(xhr.status);
                        //myObject.products = this.products.push(response);
                        if (xhr.status == 200) {

                            if (response.length > 0) {
                                for (let i = 0; i < response.length; i++) {
                                    var lowestUOM = "";
                                    var pack_size = 9999;
                                    var lowestprice = "";
                                    var highestpacksize = "";
                                    var highestprice = "";
                                    var pricediscount = "";
                                    var casesaving = "";
                                    var isSale = "";
                                    var isChildSale = "";
                                    getcount++;
                                    $("#getCount").val(getcount);
                                    myObjects.products.push(response[i]);
                                }
                                //products.push(response);
                                setTimeout(function () {
                                    getProductresponse(response);
                                }, 100)
                                $("#defaultoffset").val(offset);
                                $(".load-content").css("display", "none");
                            } else {
                                $('.productsearcherror').show()
                            }
                        }
                    })
                    .done(function (html, status, xhr) {
                        $("#category-listing").attr("data-proccessed", "complete");
                        if (getcount == 0) {
                            $("#getCount").val(getcount);
                            $(".load-content").css("display", "none");
                        }
                    });
            },
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
            getCurrenctRestockDate(d) {
                // Convert date string to Date object
                var dDate = new Date(d);

                // Get current date with America/New_York timezone
                var currentDate = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
                currentDate = new Date(currentDate);
                // Set the time parts to zero to compare only the date parts
                dDate.setHours(0, 0, 0, 0);
                currentDate.setHours(0, 0, 0, 0);
                // Compare dates
                if (dDate < currentDate) {
                    return false;
                } else {
                    return true;
                }
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
                            setTimeout(function () {
                                $('.ProductDetail-' + productcode).find('#viewSubstitutions').hide();
                            }, 500);
                        } else {
                            setTimeout(function () {
                                $('.ProductDetail-' + productcode).find('#viewSubstitutions').show();
                            }, 500);
                        }

                    },
                });
                return responsedata;
            },
            BasketData() {
                setTimeout(function () {
                    basketApp.CheckBasketItemss();
                }, 100);
            },
            convertUOM(variant) {
                const uomMapping = {
                    EA: "EACH",
                    CS: `CASE`,
                    BAG: `BAG`,
                    BX: `Box`,
                    PK: `Pack`,
                    TUB: `TUB`,
                    CASE: "CASE",
                    Case: "CASE"
                };
                // Check for 'Case of X' pattern and return it as 'CASE of X'
                const casePattern = /^Case of (\d+)$/i;
                const match = variant.UOM.match(casePattern);

                if (match) {
                    return `CASE of ${match[1]}`;
                }
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
                        variant.newproductprice = `${variant.code}=${this.roundNumbers(variant.price)}`;
                        newProductPrices.push(variant.newproductprice);
                    });
                    item.data.newprices = newProductPrices.join("|");
                });
            },


            makeAjaxRequest(url, jsonRequest, showLoader = true, toggleVisibility = true, source) {
                $('.loader').css('display', 'flex');
                const self = this;
                if (showLoader) { this.loading = true; } // Show loader only if flag is true



                $.ajax({
                    url: url,
                    type: "POST",
                    contentType: "application/json",
                    data: jsonRequest,
                    dataType: "json",
                    beforeSend() {
                        if (toggleVisibility) {
                            document.querySelector('.searchproductlist').style.display = 'none'; // Hide only if the flag is true
                        }
                    },
                    success(result) {
                        if (result.length < 1) {
                            $('.productsearcherror').show()
                        } else {
                            $('.productsearcherror').hide()
                        }
                        self.SearchProductslist = result;
                        self.products = result;
                        self.savedforlater1 = result;
                        self.orderguideProducts = [];
                        setTimeout(function () {
                            getProductresponse(result);
                            addProductNew();
                        }, 200)
                    },
                    complete() {
                        if (toggleVisibility) {
                            document.querySelector('.searchproductlist').style.display = 'block'; // Show only if the flag is true
                        }
                        if (showLoader) {
                            document.querySelector('.searchproductlist').scrollTo({
                                top: 0
                            });
                        }
                        if (showLoader) { self.loading = false; } // Hide loader only if it was shown
                        $(".productListing").show();
                        $('.loader').hide();
                        setTimeout(function () {
                            addProductNew();
                        }, 200)
                    },
                });
            },

            searchProducts(searchKey) {
                const sort_by = setWholesaleuser === 1 ? 'customfield:customfields:wprice' : 'customfield:customfields:pprprice';
                this.makeAjaxRequest(`/?Screen=SRCHJSON&Search=${searchKey}&SearchOffset=0&Sort_By=${sort_by}&per_page=24&recipes=No&x=0&y=0&`);
            },

            onSearchKeyup() {
                var SearchKey = $("#searchproducts").val();
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                    this.searchProducts();
                }, 2500); // 3 seconds
            },

            onSearchSubmit() {
                var SearchKey = $("#searchproducts").val();
                this.searchProducts(SearchKey);

                // Trigger blur to close the keyboard on mobile
                document.querySelector("#searchproducts").blur();
            }
        },
        computed: {
            gridClass: function () {
                var gridClass = '';
                if ((getPageCodes != 'SFNT') && getPageCodes != 'BASK' && getPageCodes != 'MSHIP' && getPageCodes != 'ShelfLP' && getPageCode != 'ShelfLP_copy' || getPageCode == 'Origins') {
                    gridClass = 'col-xs-6s col-sm-6s col-md-4s col-lg-3s gridclass ' + getPageCode;
                }
                return gridClass;
            }
        },

        mounted() {

            addProductNew();
            // Attach event listener for Enter key
            const self = this;
            document
                .querySelector("#searchproducts")
                .addEventListener("keypress", function (event) {
                    if (event.key === "Enter") {
                        self.onSearchSubmit();
                    }
                });

            // Attach click listener for search icon
            document
                .querySelector(".searchOrders") // Update with your actual search icon selector
                .addEventListener("click", function () {
                    self.onSearchSubmit();
                });
        },
    });

    function getProductresponse(dataval) {
        if (dataval.length < 1) {
            $('.noprouctsmsg').css('display', 'flex');
        } else {
            $('.noprouctsmsg').css('display', 'none');
        }
        var products = [];
        var productprice = [];
        var allPrices = '';
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
            var restockdate;
            var totalcount = "";
            getpacksize = Math.min.apply(null, dataval[i].data.variants.map(function (item) {
                return item.pack_size;
            }));

            totalcount = dataval[i].data.total;

            //  check restock date and format the in US Standard
            restockdate = new Date(dataval[i].data.restock_date);
            dataval[i].restock_month = restockdate.toLocaleString('en-US', { month: '2-digit' });
            dataval[i].restock_day = restockdate.toLocaleString('en-US', { day: '2-digit' });
            dataval[i].restock_year = restockdate.toLocaleString('en-US', { year: 'numeric' });
            dataval[i].data.restock_date_formatted = dataval[i].restock_year + '-' + dataval[i].restock_month + '-' + dataval[i].restock_day;
            dataval[i].data.restock_date_formattednew = new Date(dataval[i].data.restock_date_formatted + 'T12:00:00');
            dataval[i].data.restock_date_formattednew = dataval[i].data.restock_date_formattednew.toLocaleString('en-US', { timeZone: 'America/New_York', month: '2-digit' }) + '/' + dataval[i].data.restock_date_formattednew.toLocaleString('en-US', { timeZone: 'America/New_York', day: '2-digit' }) + '/' + dataval[i].data.restock_date_formattednew.toLocaleString('en-US', { timeZone: 'America/New_York', year: 'numeric' })

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
                var specificProductCode = dataval[i].data.variants[j].code;
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


                //   dataval[i].data.variants[j].newproductprice = `${dataval[i].data.variants[j].code}-${dataval[i].data.variants[j].price}`
                //   if (dataval[i].data.variants[j].code === specificProductCode) {
                //     productprice.push(dataval[i].data.variants[j].newproductprice);
                //     allPrices = productprice.join('|');
                //     console.log(dataval[i].data.variants[j].newproductprice);
                // }

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





            setTimeout(function () {
                if (dataval[i].data.product_inventory <= 0 && dataval[i].data.substitute != '') {
                    myObjects.getsubstitutionInventory(dataval[i].data.code, dataval[i].data.substitute);
                }
            }, 10);



        }
        // console.log(dataval);
        //console.log(products);
        if (urlpath === "https://www.foodrelated.com" & getPageCode === 'SRCH') {
            dataLayer.push({
                searchTerm: searchKey, //pass the search term
                numberOfSearchResult: totalcount, //number of searches appeared
                event: "internalSearch",
            });
            // console.log(dataLayer);
        }
    }

    var viewOrderDetails = new Vue({
        el: '#orderDetails', // Specify the element to bind to

        data: {
            Store_Code: "G",
            Function: "Module",
            Module_Code: "frjsonfunctions",
            Module_Function: "FR_CustomerOrderList_Load_Query",
            Session_Type: "runtime",
            customer_session: document.querySelector('#sessionid').value,
            Customer_ID: document.querySelector('#customerIdcheck').value,
            Customer_Type: document.querySelector('.customertype').value,
            Order_Id: {
                id: document.querySelector('#order_id').value,
            },
            cutoffTime: document.querySelector('#editOrderCuttoffTime').value + ":00", // Cutoff time (10:00 PM)
            showModal: false, // Modal visibility
            modalMessage: '', // Modal message
            pushlineid: '',
            newlineid: '',
            oldqty: '',
            productCode: '',
            remainingSeconds: null, // Remaining seconds until cutoff
            userIdleTimerStarted: false, // To track if UserIdleTime has been triggered
            hasRedirected: false, // To prevent multiple redirects
            countdownTimer: null, // Timer reference for UserIdleTime
            showLoader: false, // Loader state
            isOrderEdited: false, // Flag to check if the order is editable
            orderDetails: [], // Placeholder for the order data
            orderSummary: [] // Placeholder for the order summary
        },

        methods: {
            // Method to load the order details via AJAX
            loadOrderDetails: function () {
                var self = this; // Reference to the Vue instance
                self.showLoader = true;
                self.InventoryUpdate();
                var requestData = {
                    Store_Code: self.Store_Code,
                    Function: self.Function,
                    Module_Code: self.Module_Code,
                    Module_Function: self.Module_Function,
                    Session_Type: self.Session_Type,
                    customer_session: self.customer_session,
                    Customer_ID: self.Customer_ID,
                    Customer_Type: self.Customer_Type,
                    Order_Id: self.Order_Id
                };

                // Perform AJAX call
                $.ajax({
                    url: '/Merchant5/json.mvc',
                    type: 'POST',
                    data: JSON.stringify(requestData),
                    contentType: 'application/json',
                    success: function (response) {
                        let newOrderData = response.data[0] || {};
                        // Convert UOM for each variant
                        newOrderData.orderitems.forEach((item, i) => {
                            if (item.product) {
                                item.product.forEach(variant => {
                                    variant.data.variants.forEach(variant => {
                                        variant.UOM = self.convertUOM(variant);
                                    });
                                });
                            }

                            // Check if the current item has the same product as any previous item
                            const isSameProduct = newOrderData.orderitems.slice(0, i).some((previousItem) => {
                                // Ensure previousItem.product exists and compare based on product ID
                                return previousItem.product && Array.isArray(previousItem.product) &&
                                    previousItem.product[0]?.data?.id === item.product[0]?.data?.id;
                            });

                            if (isSameProduct) {
                                console.log("Same product: " + item.name);
                                item.product.forEach(variant => {
                                    variant.data.variants.forEach(variant => {

                                        variant.sameProduct = true;
                                    });
                                });
                            }
                        });



                        // Calculate the subtotal
                        // console.log("isSameProduct " + isSameProduct);
                        const subtotal = newOrderData.orderitems.reduce((acc, item) => {
                            return acc + (item.price * item.quantity);
                        }, 0);

                        // Update the reactive data to trigger UI changes
                        self.orderDetails = {
                            ...newOrderData,
                            orderitems: [...(newOrderData.orderitems || [])],
                            subtotal: subtotal,

                        };

                        self.$nextTick(() => {
                            self.orderDetails = {
                                ...newOrderData,
                                orderitems: [...(newOrderData.orderitems || [])],
                                subtotal: subtotal,

                            };
                            $(document).on('shown.bs.modal', '#savedOrderDetailsModal', function () {
                                // isModalOpen = true;
                                console.log('hi');
                            });

                            $(document).on('hidden.bs.modal', '#savedOrderDetailsModal', function () {
                                isModalOpen = false;
                            });
                        });


                        // Store updated order values for later use
                        storeOrderedValues = newOrderData.orderitems;
                    },
                    complete: function () {
                        self.showLoader = false;
                    },
                    error: function (error) {
                        console.error('Error fetching order details:', error);
                    }
                });
            }
            ,
            convertUOM(variant) {
                const uomMapping = {
                    EA: "EACH",
                    CS: `CASE`,
                    BAG: `BAG`,
                    BX: `Box`,
                    PK: `Pack`,
                    TUB: `TUB`,
                    CASE: "CASE",
                    Case: "CASE"
                };

                // Check for 'Case of X' pattern and return it as 'CASE of X'
                const casePattern = /^Case of (\d+)$/i;
                const match = variant.UOM.match(casePattern);

                if (match) {
                    return `CASE`;
                }
                return uomMapping[variant.UOM] || variant.UOM;
            },
            processProducts(result) {
                console.log(result);
                result.forEach((item) => {
                    const newProductPrices = [];
                    item.data.variants.forEach((variant) => {
                        variant.UOM = this.convertUOM(variant);
                        variant.newproductprice = `${variant.code}=${this.roundNumbers(variant.price)}`;
                        newProductPrices.push(variant.newproductprice);
                    });
                    item.data.newprices = newProductPrices.join("|");
                });
            },
            loadOrderSummary: function () {
                var self = this; // Reference to the Vue instance
                var requestData = {
                    Store_Code: self.Store_Code,
                    Function: self.Function,
                    Module_Code: self.Module_Code,
                    Module_Function: self.Module_Function,
                    Session_Type: self.Session_Type,
                    customer_session: self.customer_session,
                    Customer_ID: self.Customer_ID,
                    Customer_Type: self.Customer_Type,
                    Order_Id: self.Order_Id
                };

                // Perform AJAX call
                $.ajax({
                    url: '/Merchant5/json.mvc',
                    type: 'POST',
                    data: JSON.stringify(requestData),
                    contentType: 'application/json',
                    success: function (response) {
                        if (response.data && response.data.length > 0) {
                            // Access the data using the key '66672'
                            self.orderSummary = response.data[0]; // Assign the data to orderSummary
                        } else {
                            self.orderSummary = []; // Clear if no data found
                        }
                        // Calculate the subtotal
                        const subtotal = response.data[0].orderitems.reduce((acc, item) => {
                            return acc + (item.price * item.quantity);
                        }, 0);

                        // console.log("Subtotal:", subtotal.toFixed(2)); // Output: 25.02
                        // console.log(self.orderSummary);
                        self.orderSummary.subtotal = subtotal;
                    },
                    error: function (error) {
                        console.error('Error fetching order details:', error);
                    }
                });
            },
            checkCutofTime() {
                if (hasRedirected) return; // Prevent multiple redirects
                // Get current time in US Central Time
                var centralTime = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
                var currentTime = new Date(centralTime);

                // Extract hours, minutes, and seconds from Central Time
                var currentHours = currentTime.getHours();
                var currentMinutes = currentTime.getMinutes();
                var currentSeconds = currentTime.getSeconds();
                // console.log("Current Time (Central Time):", currentTime.toLocaleString("en-US", { timeZone: "America/Chicago" }));
                // Check if the time matches 22:00:59 Central Time (10:00:59 PM)
                if ((currentHours > 22) || (currentHours === 22 && currentMinutes > 0) || (currentHours === 22 && currentMinutes === 0 && currentSeconds >= 59)) {
                    hasRedirected = true; // Set flag to true
                    // console.log("It's 22:00:59 Central Time. Refreshing page...");
                    // location.reload();  // Refresh the page
                    location.href = '/Merchant5/merchant.mvc?screen=ORDHN'; // Redirect to the order history page
                }
            },
            checkCutoffTime() {
                const centralTime = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
                const currentTime = new Date(centralTime);

                const [cutoffHours, cutoffMinutes, cutoffSeconds] = this.cutoffTime.split(":").map(Number);
                const cutoffDateTime = new Date(currentTime);
                cutoffDateTime.setHours(cutoffHours, cutoffMinutes, cutoffSeconds, 0);

                this.remainingSeconds = Math.floor((cutoffDateTime - currentTime) / 1000);

                // Redirect if cutoff time is reached
                if (this.remainingSeconds <= 0 && !this.hasRedirected) {
                    this.hasRedirected = true;
                    console.log("Cutoff time reached. Redirecting to the specified page...");
                    if (this.isOrderEdited) {
                        this.saveOrderDetails();
                    }
                    window.location.href = "/Merchant5/merchant.mvc?screen=ORDHN"; // Redirect to order history page
                    return;
                }

                // If remaining time is 30 minutes (1800 seconds) or less, call UserIdleTime
                if (this.remainingSeconds <= 1800 && !this.userIdleTimerStarted) {
                    this.userIdleTimerStarted = true;
                    this.UserIdleTime();
                }
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
            // Increase quantity
            qtyupdateDesk(qtyboxid, type, ele, newelement, lineId) {
                var qtylineid = lineId;
                console.log(qtylineid);
                qtyboxid = qtyboxid.replace(/-lineid\d+/, '');
                // console.log(qtyboxid);
                var getProductCode = newelement;
                let qty_selected = 0;
                let element = $("." + qtyboxid);
                if (element.val() == "" || element.val() == NaN) {
                    element.val(0);
                }
                var dispalyUOM = [];
                var showDisplay = "";
                var availableStock = "";
                qty = parseInt(element.val());
                let parentprodcode = $(element).attr("data-productcode");
                let elementCode = $("." + ele)
                    .find(".displayUom")
                    .text();
                let parentuom = $(element).attr("data-uom");
                var checkedAttr = $(
                    "input[data-product_code=" + parentprodcode + "][type=radio]:checked"
                );
                var radioCheck = $(
                    "input[data-product_code=" + parentprodcode + "][type=radio]"
                ).val();
                var selected = $("." + ele).find("input[type=radio]:is(:checked)");
                var notselected = $("." + ele).find("input[type=radio]:not(:checked)");
                dataStock = parseInt($(checkedAttr).attr("data-stock"));
                var totalQntyAvailable = parseInt($.trim($(checkedAttr).attr("data-stock")));
                minQnty = parseInt($(checkedAttr).attr("data-min"));
                var reorderDataStock = $(".ProductDetail-" + getProductCode + qtylineid + ":visible").find(".data-min").attr(
                    "data-reorderstock");

                var NewMinQty = [];
                var NewMinQtyNew = "";
                var showDisplay = "";
                if (type == "plus") {
                    var getNewUOm = [];
                    var CheckUOM = [];
                    var CheckUOMS = [];
                    $(".ProductDetail-" + getProductCode + qtylineid + ":visible")
                        .find(".data-min")
                        .each(function () {
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

                    qty = qty + 1;
                    if (dataStock < minQnty * qty) {
                        showDisplay = dispalyUOM.toString().replace(/,/g, "<br>");
                        var errorMsg =
                            "Sorry, we do not have enough quantity to fulfill your order.\r\nPlease adjust the quantity and try again.<br>";
                        $("#new_globalerrorpopup .gpoperror").html(
                            errorMsg +
                            '<br/>  <p>Quantity Available:</p> ' +
                            showDisplay
                        );
                        $("#new_globalerrorpopup").modal("show");

                        if (selected) {
                            ShowUOM = $("." + ele)
                                .find(".displayUom")
                                .eq(1)
                                .text();
                            var remaingQnty = Math.floor(dataStock / minQnty);
                            $(selected).each(function () {
                                console.log("selectes" + availableStock);
                            });
                            showDisplay = dispalyUOM.unshift(ShowUOM + " - " + availableStock);
                            element.val(remaingQnty);
                        }
                        return false;
                    } else {
                        element.val(qty);
                        //    var item =     this.orderDetails[index];
                        //    console.log(miltiattrvalue);
                        $(".qty-" + getProductCode + ":visible").find('.QtyVal').val();
                        console.log(element.val());
                        // console.log($(".ProductDetail-" + getProductCode + ":visible").find('.miltiattrvalue:checked').val());
                        $(".ProductDetail-" + getProductCode + qtylineid).find('.miltiattrvalue:checked').each(function () {
                            let orderItemData = {
                                line_id: $(this).data('line_id'),
                                Code: $(this).data('code'),
                                Name: $(this).data('name'),
                                SKU: $(this).data('sku'),
                                Quantity: qty,
                                Price: $(this).data('price'),
                                Weight: $(this).data('weight'),
                                Taxable: $(this).data('taxable'),
                                Attributes: [
                                    {
                                        attr_code: $(this).data('attr_code'),
                                        opt_code_or_data: $(this).data('opt_code_or_data'),
                                        price: $(this).data('attr_price'),
                                        weight: $(this).data('attr_weight')
                                    }
                                ]
                            };

                            viewOrderDetails.editOrderItem(orderItemData);
                        });


                    }
                } else {
                    qty = qty > 0 ? qty - 1 : 0;
                    element.val(qty);
                    $(".qty-" + getProductCode + ":visible").find('.QtyVal').val();
                    console.log(element.val());
                    // console.log($(".ProductDetail-" + getProductCode + ":visible").find('.miltiattrvalue:checked').val());
                    $(".ProductDetail-" + getProductCode + qtylineid).find('.miltiattrvalue:checked').each(function () {
                        let orderItemData = {
                            line_id: $(this).data('line_id'),
                            Code: $(this).data('code'),
                            Name: $(this).data('name'),
                            SKU: $(this).data('sku'),
                            Quantity: qty,
                            Price: $(this).data('price'),
                            Weight: $(this).data('weight'),
                            Taxable: $(this).data('taxable'),
                            Attributes: [
                                {
                                    attr_code: $(this).data('attr_code'),
                                    opt_code_or_data: $(this).data('opt_code_or_data'),
                                    price: $(this).data('attr_price'),
                                    weight: $(this).data('attr_weight')
                                }
                            ]
                        };

                        viewOrderDetails.editOrderItem(orderItemData);
                    });
                }

                jQuery(".qtybox").each(function () {
                    qty_selected = qty_selected + parseInt(jQuery(this).val());
                    //updating qtyselected variable to global gbl_qty_selected
                    gbl_qty_selected = qty_selected;
                });
                if (qty_selected > 0) {
                    $("#addtocart").attr("disabled", false);
                    if (screen.width <= 1024) {
                        $(".footer_addcart").css("display", "block");
                        $("#responsiveButton").css("z-index", "99");
                    }
                } else {
                    $("#addtocart").attr("disabled", true);
                    if (screen.width <= 1024) {
                        $(".footer_addcart").css("display", "none");
                        $("#responsiveButton").css("z-index", "1001");
                    }
                }
            },




            // Validate input to allow only numbers
            isNumber(evt) {
                let charCode = evt.which ? evt.which : evt.keyCode;
                if (charCode < 48 || charCode > 57) {
                    evt.preventDefault();
                    return false;
                }
                return true;
            },

            setQuantityforThreebie(productid, actualqty, type, ordercode) {
                var checkbtnstatus = true;
                var qty = $('.qty-lineid' + productid).val();

                if (ordercode == type) {
                    // If the same quantity is selected again, update the value
                    $('.qty-lineid' + productid).val(actualqty);
                } else {
                    // Otherwise, reset the value to 0
                    $('.qty-lineid' + productid).val(0);
                }
            },

            checkCase: function (lineIds, code) {
                var caseCount = 0;
                var lineid = 0;
                var oldqty = 0;
                var lineIds = lineIds;
                var caseCount = 0;
                var lineid = 0;
                var codes = "";
                var UOM = "";
                var existedname = "";
                var existedsku = "";
                var eixtedprice = "";
                var eixtedweight = "";
                var eixedtaxable = "";
                var eixedattributes = "";
                var getproductcode = "";
                for (var i = 0; i < this.orderDetails.orderitems.length; i++) {
                    var order = this.orderDetails.orderitems[i];

                    // Skip checking against the same line_id
                    if (order.line_id == lineIds) continue;

                    for (var j = 0; j < order.product.length; j++) {
                        var product = order.product[j];

                        for (var k = 0; k < product.data.variants.length; k++) {
                            var variant = product.data.variants[k];

                            if (variant.code === code) {
                                caseCount++;
                                getproductcode = product.data.code;
                                lineid = order.line_id;
                                oldqty = order.quantity;
                                UOM = this.convertUOM(variant);
                                existedname = product.data.name;
                                existedsku = product.data.sku;
                                eixtedprice = variant.price;
                                eixtedweight = variant.weight;
                                eixedtaxable = variant.taxable;
                                console.log("Found in line ID:", order.line_id, "Variant:", variant.code);
                            }
                        }
                    }
                }

                if (caseCount > 0) {
                    this.newlineid = lineIds;
                    console.log(oldqty);
                    console.log(UOM + " is already present in another line ID:", lineid, "name:", existedname);
                    this.modalMessage = `A ${UOM} of this item is already in your cart. Do you still want to change the unit?`;
                    this.showModal = true;  // Show the modal
                    this.pushlineid = lineid;
                    this.oldqty = oldqty;
                    this.productCode = getproductcode;
                    //     var requestData = {
                    //     line_id: lineid,
                    //     Code: codes,
                    //     Name: updatedItem.Name,
                    //     SKU: updatedItem.SKU,
                    //     Quantity: updatedItem.Quantity,
                    //     Price: updatedItem.Price,
                    //     Weight: updatedItem.Weight,
                    //     Taxable: updatedItem.Taxable,
                    //     Attributes: updatedItem.Attributes
                    // };




                }

            },
            closeModal: function () {
                this.showModal = false;  // Close the modal
            },
            SameProductUpdate: function (lineid) {
                self = this;
                var getProductCode = self.productCode;
                var line_ids = self.pushlineid;
                var qty = $(".qty-lineid" + getProductCode + self.newlineid + ":visible").val();
                console.log(qty);
                this.showModal = false;  // Close the modal
                $(".ProductDetail-" + getProductCode + self.newlineid).find('.miltiattrvalue:checked').each(function () {
                    console.log(self.newlineid);
                    console.log(line_ids);
                    let orderItemData = {
                        newlineid: self.newlineid,
                        isSameProductEdited: true,
                        oldqty: self.oldqty,
                        line_id: self.newlineid,
                        Code: $(this).data('code'),
                        Name: $(this).data('name'),
                        SKU: $(this).data('sku'),
                        Quantity: parseInt(qty) + parseInt(self.oldqty),
                        delete_line_id: line_ids,
                        Price: $(this).data('price'),
                        Weight: $(this).data('weight'),
                        Taxable: $(this).data('taxable'),
                        Attributes: [
                            {
                                attr_code: $(this).data('attr_code'),
                                opt_code_or_data: $(this).data('opt_code_or_data'),
                                price: $(this).data('attr_price'),
                                weight: $(this).data('attr_weight')
                            }
                        ]
                    };

                    viewOrderDetails.editOrderItem(orderItemData);
                });
            }
            ,
            addOrderItem: function (newItem) {
                var self = this;
                self.showLoader = true;
                var requestData = {
                    Store_Code: self.Store_Code,
                    Session_Type: self.Session_Type,
                    Function: "Module",
                    Module_Code: self.Module_Code,
                    Module_Function: "FR_OrderItem_Add",
                    customer_session: self.customer_session,
                    order_id: self.Order_Id.id,
                    customer_id: self.Customer_ID,
                    Code: newItem.Code,
                    Name: newItem.Name,
                    SKU: newItem.SKU,
                    Quantity: newItem.Quantity,
                    Product_id: newItem.product_id,
                    Price: newItem.Price,
                    Weight: newItem.Weight,
                    Taxable: newItem.Taxable,
                    Attributes: newItem.Attributes
                };

                $.ajax({
                    url: '/Merchant5/json.mvc',
                    type: 'POST',
                    data: JSON.stringify(requestData),
                    contentType: 'application/json',
                    success: function (response) {
                        if (response) {
                            console.log('Item added successfully:', newItem);

                            self.loadOrderDetails();
                            $(".ProductDetail-" + newItem.ParentCode).find(".addbtn").removeClass('adding').html('Add');
                        } else {
                            console.error('Failed to add item:', response);
                        }
                    },
                    complete: function () {
                        self.showLoader = false;
                        self.isOrderEdited = true;
                    },
                    error: function (error) {
                        console.error('Error adding order item:', error);
                    }
                });
            },

            editOrderItem: function (updatedItem) {
                var self = this;
                console.log(updatedItem)
                var requestData = {
                    Store_Code: self.Store_Code,
                    Session_Type: self.Session_Type,
                    Function: "Module",
                    Module_Code: self.Module_Code,
                    Module_Function: "FR_OrderItem_Update",
                    customer_session: self.customer_session,
                    order_id: self.Order_Id.id,
                    customer_id: self.Customer_ID,
                    line_id: updatedItem.line_id,
                    Code: updatedItem.Code,
                    Name: updatedItem.Name,
                    SKU: updatedItem.SKU,
                    Quantity: updatedItem.isSameProductEdited === true ? updatedItem.oldqty : updatedItem.Quantity,
                    Price: updatedItem.Price,
                    Weight: updatedItem.Weight,
                    Taxable: updatedItem.Taxable,
                    delete_line_id: updatedItem.isSameProductEdited === true ? updatedItem.newlineid : null,
                    Attributes: updatedItem.Attributes
                };
                if (updatedItem.isSameProductEdited === true) {
                    viewOrderDetails.orderDetails = []
                }
                var cleanRequestData = JSON.parse(JSON.stringify(requestData));
                self.showLoader = true;
                $.ajax({
                    url: '/Merchant5/json.mvc',
                    type: 'POST',
                    dataType: 'text',
                    data: JSON.stringify(requestData),
                    contentType: 'application/json',
                    beforeSend: function () {
                        console.log('Updating order item:', updatedItem);
                        self.showLoader = true;
                    },
                    success: function (response) {
                        console.log(requestData);
                        // console.log(error);
                        if (response) {
                            console.log('Order item updated successfully:', updatedItem);
                            $(".ProductDetail-" + updatedItem.ParentCode).find(".addbtn").removeClass('adding').html('Add');

                            self.loadOrderDetails();
                        } else {
                            console.error('Failed to update order item:', response.message);
                        }
                    },
                    complete: function () {
                        self.showLoader = false;
                        self.isOrderEdited = true;
                    },
                    error: function (error) {
                        console.error('Error updating order item:', error);
                        console.log('Error details:', error.status, error.statusText);
                        console.error('Error updating order item:', error);
                    }
                });
            },

            // Method to delete an order item
            deleteOrderItem: function (lineId) {
                var self = this;
                self.showLoader = true;
                var requestData = {
                    Store_Code: self.Store_Code,
                    Function: "Module",
                    Module_Code: self.Module_Code,
                    Module_Function: "FR_OrderItem_Delete",
                    Session_Type: self.Session_Type,
                    customer_session: self.customer_session,
                    Customer_ID: self.Customer_ID,
                    Order_Id: self.Order_Id.id,
                    line_ids: [lineId]
                };

                // Perform AJAX call to delete the item
                $.ajax({
                    url: '/Merchant5/json.mvc',
                    type: 'POST',
                    data: JSON.stringify(requestData),
                    contentType: 'application/json',
                    success: function (response) {
                        if (response) {
                            console.log('Item deleted successfully:', lineId);
                            // Reload order details to reflect the changes

                            self.loadOrderDetails();
                        } else {
                            console.error('Failed to delete item:', response.message);
                        }
                    },
                    complete: function () {
                        self.showLoader = false;
                        self.isOrderEdited = true;
                    },
                    error: function (error) {
                        console.error('Error deleting order item:', error);
                    }
                });
            },

            InventoryUpdate: function () {
                var self = this;
                let url = `/cudet.html?customerAction=updateInventory&customer_id=${self.Customer_ID}&order_id=${self.Order_Id.id}`;
                $.ajax({
                    url: url,
                    type: 'POST',
                    success: function (response) {
                        if (response) {
                            console.log('Inventory updated successfully:', response);
                            // Reload order details to reflect the changes
                        } else {
                            console.error('Failed to update inventory:', response.message);
                        }
                    },
                    error: function (error) {
                        console.error('Error updating inventory:', error);
                    }
                });
            },

            saveOrderDetails: function () {
                var self = this;
                var requestData = {
                    Store_Code: self.Store_Code,
                    Function: "Module",
                    Module_Code: self.Module_Code,
                    Module_Function: "FR_Order_Save",
                    Session_Type: self.Session_Type,
                    customer_session: self.customer_session,
                    Customer_ID: self.Customer_ID,
                    Order_Id: self.Order_Id.id
                };

                const customer_id = self.Customer_ID;
                const order_id = self.Order_Id.id;
                const url = `/majax.html?mobileAction=processEditOrder&customer_id=${customer_id}&order_id=${order_id}`;
                // Perform AJAX call to save the order
                $.ajax({
                    url: url,
                    type: 'POST',
                    success: function (response) {
                        if (response) {
                            console.log('Order saved successfully:', response);
                            // Reload order details to reflect the changes
                            // self.loadOrderDetails();
                            location.href = '/Merchant5/merchant.mvc?screen=ORDHN';
                        } else {
                            console.error('Failed to save order:', response.message);
                        }
                    },
                    error: function (error) {
                        console.error('Error saving order:', error);
                    }
                });
            },

            // Method to handle order editing
            editOrder: function (newOrderDetails) {
                var self = this;

                // Update order details or make changes

                // Once order is edited, re-load the order details to reflect the changes
                self.loadOrderDetails();
            },
            // Function to handle the countdown timer
            UserIdleTime() {
                const message =
                    "You will be redirected to the cart page as your session was idle for too long";

                this.countdownTimer = setInterval(() => {
                    if (this.remainingSeconds > 0) {
                        const minutes = Math.floor(this.remainingSeconds / 60);
                        const seconds = this.remainingSeconds % 60;
                        const showTimer = `${minutes.toString().padStart(2, "0")}:${seconds
                            .toString()
                            .padStart(2, "0")}`;

                        // Update the timer display dynamically in your Vue template
                        document.querySelector('.checkoutcounter').innerHTML = `
            <p>
              Please complete your order within ${showTimer}&nbsp;
              <sup class='ft-md'>
                <i class='txt-gray fas fa-info-circle info-icon' title='Cutoff time is at 10:00 PM'></i>
              </sup>
            </p>
            <p class='ft-md ft-12p txt-warning'>
              Any changes made to your order after the cutoff time will not be accepted
            </p>
          `;

                        document.title = "ORDEDIT | " + showTimer;

                        // Show idle warning in the last 5 seconds
                        if (this.remainingSeconds <= 5) {
                            // this.$refs.idleTimeError.innerHTML = message;
                            // this.$refs.customerIdleTimeModal.show(); // Show modal
                            // playAudio(); // Play audio warning
                        }

                        this.remainingSeconds--;
                    } else {
                        // Time has expired; clear timer and redirect
                        clearInterval(this.countdownTimer);
                        if (!this.hasRedirected) {
                            this.hasRedirected = true;
                            console.log("Redirecting to order history page..." + isOrderEdited);
                            window.location.href = "/Merchant5/merchant.mvc?screen=ORDHN"; // Redirect to given page
                        }
                    }
                }, 1000);
            },
            handleClickOnLogoOrFooter: function (event) {
                if (event.target.closest('.logo-wrapper,#FooterSection a, .global-header-wrapper,.mm_searchfield_container,.mm_searchfield,.product-detail-wrapper,.product-name a ,.product-list-link')) {
                    $('#savedOrderDetailsModal').modal('show');
                }
            }
        },

        // Load order details when the Vue instance is created
        created: function () {
            this.loadOrderDetails(); // Initial call to load order details
            setInterval(this.checkCutoffTime, 1000); // Check cutoff time every second

            let isModalOpen = false; // Define it outside event listeners for correct scope




            window.addEventListener('beforeunload', function (event) {
                if (isModalOpen) {
                    event.preventDefault();
                    event.returnValue = '';  // Required for some browsers to trigger warning
                    viewOrderDetails.saveOrderDetails();
                }
            });


        }, mounted() {
            document.querySelector('.checkoutcounter').innerHTML = `<p class='ft-md ft-12p txt-warning'>
              Any changes made to your order after the cutoff time will not be accepted
            </p>`;
            if (url.searchParams.get('isEdited') === 'true') {
                this.saveOrderDetails();
            }
        }
        , watch: {
            showModal: function (newVal) {
                // When showModal changes to true, trigger the Bootstrap modal
                if (newVal) {
                    this.$nextTick(function () {
                        $('#caseCheckModal').modal('show');  // Trigger the Bootstrap modal
                    });
                } else {
                    $('#caseCheckModal').modal('hide');  // Hide the Bootstrap modal
                }
            },
            isOrderEdited: function (newVal) {
                if (newVal) {
                    this.$nextTick(function () {
                        $('.mm_searchfield_container,.account-cart-holder').css('pointer-events', 'none')
                        document.querySelectorAll('.logo-wrapper a, #FooterSection a,.global-header-wrapper,.mm_searchfield_container,.searchhistorycontainer a,.product-detail-wrapper,.product-name a ,.product-list-link').forEach(el => {
                            el.removeAttribute('href');
                            el.removeAttribute('onclick');
                            el.addEventListener('click', function (event) {
                                event.stopPropagation();
                                event.preventDefault();
                            }, true);
                        });
                        document.addEventListener('click', this.handleClickOnLogoOrFooter);
                        document.addEventListener('click', function (event) {

                        });

                        history.pushState(null, "", location.href);

                        window.onpopstate = function () {
                            // Show custom popup
                            $('#savedOrderDetailsModal').modal('show');

                            // Push state again to prevent back navigation
                            history.pushState(null, "", location.href);
                        };


                        url.searchParams.set('isEdited', 'true');
                        window.history.pushState({}, '', url.toString());
                    })
                }
            }
        }
    });

    var alerts = document.getElementById("alert");
    function playAudio() {
        alerts.play();
    }