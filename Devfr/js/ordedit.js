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
            $('.loader').show();
            const self = this;
            if (showLoader){ this.loading = true;  } // Show loader only if flag is true
            


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
                    setTimeout(function () {
                        getProductresponse(result);
                        addProductNew();
                    }, 100)
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
                    if (showLoader) {self.loading = false;
                        $('.loader').hide();
                    } // Hide loader only if it was shown
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
    if(dataval.length  < 1){
    $('.noprouctsmsg').css('display','flex');
    }else{
      $('.noprouctsmsg').css('display','none');
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
        getpacksize = Math.min.apply(null, dataval[i].data.variants.map(function(item) {
          return item.pack_size;
        }));
    
        totalcount = dataval[i].data.total;
        
        //  check restock date and format the in US Standard
        restockdate = new Date(dataval[i].data.restock_date);
        dataval[i].restock_month = restockdate.toLocaleString('en-US',{month:'2-digit'});
        dataval[i].restock_day  = restockdate.toLocaleString('en-US',{day: '2-digit'});
        dataval[i].restock_year  = restockdate.toLocaleString('en-US',{year: 'numeric'});
        dataval[i].data.restock_date_formatted = dataval[i].restock_year+'-'+dataval[i].restock_month+'-'+dataval[i].restock_day;
        dataval[i].data.restock_date_formattednew = new Date(dataval[i].data.restock_date_formatted+'T12:00:00');
        dataval[i].data.restock_date_formattednew = dataval[i].data.restock_date_formattednew.toLocaleString('en-US', { timeZone: 'America/New_York' , month: '2-digit' }) + '/' + dataval[i].data.restock_date_formattednew.toLocaleString('en-US', { timeZone: 'America/New_York' , day: '2-digit' }) + '/' + dataval[i].data.restock_date_formattednew.toLocaleString('en-US', { timeZone: 'America/New_York' , year: 'numeric' })
    
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
    
            if(dataval[i].data.variants[j].slac == "1" || dataval[i].data.variants[j].slac_retail == "1"){
              checkdealflags = 'yes';
              dataval[i].data.variants[j].checkdealflags = "yes";
              }else{
              checkdealflags = 'yes';
              }
              
    
    
    
            if (dataval[i].data.variants[j].slacdiscount == 0  &&  setWholesaleuser != 1) {
              highestprice = parseFloat(dataval[i].data.variants[j].price);
              msrpprice = parseFloat(dataval[i].data.variants[j].msrp);
              
              var caseprice = parseFloat(pricediscount - highestprice).toFixed(2);
              
              getcaspriceadded = parseFloat(pricediscount + highestprice).toFixed(2);
              casesaving = 100 * (msrpprice - highestprice) / (msrpprice);
              if (casesaving.toFixed(2) > 0 && dataval[i].data.variants[j].slacdiscount <= '0') {
                // dataval[i].data.variants[j].notes = "Save " + parseFloat(casesaving.toFixed(2)) + '%';
                dataval[i].data.variants[j].slacdiscount = parseFloat(casesaving.toFixed(2) );
              }
              if(dataval[i].data.variants[j].notes != '' && dataval[i].data.variants[j].UOM_TEXT != 'Threebie' && dataval[i].data.variants[j].sale == '1' && setWholesaleuser != 1){
                dataval[i].data.variants[j].notes = dataval[i].data.variants[j].notes;
               }
              else if(dataval[i].data.variants[j].sale != '1' && setWholesaleuser != 1) {
                 dataval[i].data.variants[j].notes = '';
                }
               else if(dataval[i].data.variants[j].sale != '1' && setWholesaleuser === 1){
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
              }else{
                  dataval[i].data.variants[j].notes = "";
              }
            }
          }
             else {
                dataval[i].data.variants[j].default = "1";
                if(dataval[i].data.variants[j].notes != '' && dataval[i].data.variants[j].UOM_TEXT != 'Threebie' && dataval[i].data.variants[j].sale == '1' && setWholesaleuser != 1){
                 dataval[i].data.variants[j].notes = dataval[i].data.variants[j].notes;
                }
                else if(dataval[i].data.variants[j].notes != '' && dataval[i].data.variants[j].vip_sale === 1){
                  dataval[i].data.variants[j].notes = dataval[i].data.variants[j].notes;
                 }
               else if(dataval[i].data.variants[j].sale != '1' && setWholesaleuser != 1){
                  dataval[i].data.variants[j].notes = '';
                 }
                else if(dataval[i].data.variants[j].sale != '1' && setWholesaleuser === 1){
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
    
          if(dataval[i].data.variants[j].sale == 0 && dataval[i].data.variants[j].sale_offer == 1){
            dataval[i].data.variants[j].sale = 2;
          }
          else if((dataval[i].data.variants[j].sale == 0 && dataval[i].data.variants[j].vip_sale == 1) || dataval[i].data.variants[j].sale == 1 && dataval[i].data.variants[j].vip_sale == 1){
            dataval[i].data.variants[j].sale = 3;
          }
          else{
            dataval[i].data.variants[j].sale = dataval[i].data.variants[j].sale ;
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
        
    
          
          
    
        setTimeout(function(){
          if(dataval[i].data.product_inventory <= 0 && dataval[i].data.substitute !=''){
            myObjects.getsubstitutionInventory(dataval[i].data.code,dataval[i].data.substitute);
            }
        },10);
    
    
    
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
        el: '#orderDetails',  // Specify the element to bind to
      
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
          orderDetails: {} // Placeholder for the order data
        },
      
        methods: {
          // Method to load the order details via AJAX
          loadOrderDetails: function() {
            var self = this;  // Reference to the Vue instance
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
              url: 'https://devfr.foodrelated.com/Merchant5/json.mvc',
              type: 'POST',
              data: JSON.stringify(requestData),
              contentType: 'application/json',
              success: function(response) {
                self.orderDetails = response;  // Update orderDetails with the response
              },
              error: function(error) {
                console.error('Error fetching order details:', error);
              }
            });
          },
      
          // Method to handle order editing
          editOrder: function(newOrderDetails) {
            var self = this;
      
            // Here you can update your order details or make changes
            // For example, newOrderDetails could include updated quantities or new products
      
            // Once order is edited, re-load the order details to reflect the changes
            self.loadOrderDetails();
          }
        },
      
        // Load order details when the Vue instance is created
        created: function() {
          this.loadOrderDetails();  // Initial call to load order details
        }
      });
      
