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
                    variant.newproductprice = `${variant.code}=${this.roundNumbers(variant.price)}`;
                    newProductPrices.push(variant.newproductprice);
                });
                item.data.newprices = newProductPrices.join("|");
            });
        },


        makeAjaxRequest(url, jsonRequest, showLoader = true, toggleVisibility = true, source) {

            const self = this;
            if (showLoader) this.loading = true; // Show loader only if flag is true



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
                    self.SearchProductslist = result;
                    self.products = result;
                    self.savedforlater1 = result;
                    self.orderguideProducts = [];
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
                    if (showLoader) self.loading = false; // Hide loader only if it was shown
                    $(".productListing").show();
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