let newurl = "";
$(document).ready(function () {
  let estimateshipingshown = false;
  let globalshipzip = $('#globalcustomershipzip').val();
  newurl = sessionStorage.getItem("producturl");
  jQuery("body").on("submit", "#estimateinfo", function (e) {
    var product_code = $("#estimateinfo").find("input[name='Product_Code']").val();
 if(product_code === '') {product_code  = 'null'}
    /* var validatezipcode = GetStatefromZipcode('',$('.getzip').val());*/
    e.preventDefault();
    $(".getshipinfo").prop("disabled", false);
    $(".checkValidornot").val(true);
    let url = jQuery(this).attr("action");
      var getpagecode = getPageCode;
      var zip = $('.getzip').val();
      zip = zip.toUpperCase();
      $(".validatemsg").show().text("");
      setTimeout(function () {
        let dataPost = jQuery("#estimateinfo").serialize();
        jQuery.ajax({
          url: "/Merchant5/merchant.mvc?Screen=CUDET&mobileAction=stateSearch&zipcode="+zip+"&pagecode=" + getpagecode+"&Product_code="+product_code,
          type: "POST",
          showLoader: true,
          cache: false,
          beforeSend: function () {
            //   $(".loaderContainer").show();
            $(".est-img1").css("display", "flex");
            $(".estimated-shipping-rates-table").hide();
          },
          success: function (server_response) {
            $(".loaderContainer").hide();
            if (estimateshipingshown) {
              $("#estimateest").modal("show");
            }
            var siteurl = location.origin;
            var showcookies = sessionStorage.getItem("ischeckout");
            var result = $(server_response).filter("#shipestimate_rates");
            var shippingEstimate = $(result).find("#estShipping").val();
            $(".estimated-shipping-rates-table").html(result).show();
            $("input[name='ShipEstimate:ship_zip']").prop("readonly", false);
            $(".est-img1").hide();
            if (server_response.includes('No Shipping Data Found') != true) {
              if(globalshipzip !== ''){
              estimateshipingshown = true;
              sessionStorage.setItem("producturl", location.href);
              sessionStorage.setItem("isestimateshown", true);
              sessionStorage.setItem("estimatedata", server_response);
              sessionStorage.setItem(
                "estmatezip",
                $("input[name='ShipEstimate:ship_zip']").val()
              );
              }
            }else{
              $(".estimated-shipping-rates-table").html(server_response).show();
            }
          },
        });
      }, 1500);
   

    if ($(".checkValidornot").val() == "true") {
    } else {
      // $(".getshipinfo").prop("disabled", true);
      $(".validatemsg").show().css("color", "#f47a44").text("Invalid Zip code");
      $(".estimated-shipping-rates-table").html("");
    }
  });

  jQuery(".BASK .estimate-shipping,.est_outer_wrap").click(function (e) {
    var zipcode = $("input[name='ShipEstimate:ship_zip_hidden']").val();
    var estimatezipcode = "";
    if (pagecode == "BASK") {
      estimatezipcode = $(".ship-estimate:visible").val();
    } else {
      estimatezipcode = zipcode;
    }
    if (zipcode == "") {
      $(".getzip").val(estimatezipcode);
      $("#shipestimate_rates").html("");
      $(".validatemsg").show().css("color", "#628e83").text("");
      $(".checkValidornot").val(false);
    } else {
      $(".ship-est-main input:text").attr("readonly", "true");
      $("input[name='ShipEstimate:ship_zip']").prop("readonly", false);
      console.log($("input[name='ShipEstimate:ship_zip_hidden']").val());
      var zip = $(".getzip").val(estimatezipcode);
      if (zip == "") {
        $("#shipestimate_rates").html("");
      } else {
        $("input[name='ShipEstimate:ship_zip']").css(
          "border",
          "solid 1px #628e83"
        );
        // $(".validatemsg").show().css("color", "#628e83").text("Valid Zip Code");
        $(".getshipinfo").prop("disabled", false);
        $(".checkValidornot").val(true);
        $("#estimateinfo").submit();
        //   $(".getshipinfo").submit();
      }
    }
  });

  if (
    (newurl != location.href ||
      sessionStorage.getItem("isestimateshown") != "true") &&
    isUserLoggedIn == 1 &&
    $("input[name='ShipEstimate:ship_zip']").val() !== ""
  ) {
    $("#estimateinfo").submit();
  } else if (
    $("input[name='ShipEstimate:ship_zip']").val() !==
      sessionStorage.getItem("estmatezip") &&
    isUserLoggedIn == 1 &&
    $("input[name='ShipEstimate:ship_zip']").val() !== ""
  ) {
    $("#estimateinfo").submit();
  } else {
    if (isUserLoggedIn == 1) {
      $(".estimated-shipping-rates-table")
        .html(sessionStorage.getItem("estimatedata"))
        .show();
    }
  }
});

function CheckTrueorFalse(data) {
  return data;
}

function getStateValue(data) {
  return data;
}

function GetValidzipcodeforEstimateShipping() {
  var checkvalidornot = 0;
  var zipcode = "";
  var zipval = $("input[name='ShipEstimate:ship_zip']").val();
  if (zipval[0] == 0) {
    zipval = parseInt($("input[name='ShipEstimate:ship_zip']").val());
  } else {
    zipval = String($("input[name='ShipEstimate:ship_zip']").val());
  }
  var zipcodes = JSON.parse(sessionStorage.getItem("USZIPCODES"));
  var checkvalidornot = "";
  $.ajax({
    async: false,
    dataType: "json",
    url: zipcodes,
    success: function (data) {
      zipcode = data.filter((x) => String(x.zip_code) == zipval);
      console.log("berofre check " + zipval);
      if (zipcode.length > 0 && zipval == zipcode[0].zip_code) {
        console.log("after zipcode " + zipcode[0].zip_code);
        getstate = zipcode[0].state;
        getstatevalue = zipcode[0].state;
        $("input[name='ShipEstimate:ship_zip']").css(
          "border",
          "solid 1px #628e83"
        );

        $(".getshipinfo").prop("disabled", false);
        $(".checkValidornot").val(true);
        checkvalidornot = true;
      } else {
        getstate = "";

        $("input[name='ShipEstimate:ship_zip']").css(
          "border",
          "solid 1px #f47a44"
        );
        $(".checkValidornot").val(false);
        checkvalidornot = false;
        if ($("#estimateest .validatemsg").html() == "Invalid Zip code") {
          // $('#estimateest').modal('show');

          setTimeout(function () {
            $("#estimateest .validatemsg")
              .html("Invalid Zip code")
              .css("color", "#f47a44")
              .show();
            //$('.getshipinfo').click();
          }, 50);
        }
      }
      $("input[name='ShipEstimate:ship_state_select']").val(getstate);
    },
  });
  return { checkvalidornot, getstate };
}

function GetValidzipcodeforEstimateShippingNew() {
  var checkvalidornot = 0;
  var zipcode = "";
  var zipval = $("input[name='ShipEstimate:ship_zip']").val();
  if (zipval[0] == 0) {
    zipval = parseInt($("input[name='ShipEstimate:ship_zip']").val());
  } else {
    zipval = String($("input[name='ShipEstimate:ship_zip']").val());
  }
  var data = JSON.parse(sessionStorage.getItem("USZIPCODES"));
  var checkvalidornot = "";

  zipcode = data.filter((x) => String(x.zip_code) == zipval);
  console.log("berofre check " + zipval);
  if (zipcode.length > 0 && zipval == zipcode[0].zip_code) {
    console.log("after zipcode " + zipcode[0].zip_code);
    getstate = zipcode[0].state;
    getstatevalue = zipcode[0].state;
    $("input[name='ShipEstimate:ship_zip']").css("border", "solid 1px #628e83");

    $(".getshipinfo").prop("disabled", false);
    $(".checkValidornot").val(true);
    checkvalidornot = true;
  } else {
    getstate = "";

    $("input[name='ShipEstimate:ship_zip']").css("border", "solid 1px #f47a44");
    $(".checkValidornot").val(false);
    checkvalidornot = false;
    if ($("#estimateest .validatemsg").html() == "Invalid Zip code") {
      // $('#estimateest').modal('show');

      setTimeout(function () {
        $("#estimateest .validatemsg")
          .html("Invalid Zip code")
          .css("color", "#f47a44")
          .show();
        //$('.getshipinfo').click();
      }, 50);
    }
  }
  $("input[name='ShipEstimate:ship_state_select']").val(getstate);
  return { checkvalidornot, getstate };
}

function StoreUsZipcodes() {
  if (sessionStorage.getItem("USZIPCODES") == null) {
    var zipcodes = "/Merchant5/scripts/USCities.json";
    var checkvalidornot = "";
    $.ajax({
      async: false,
      dataType: "json",
      url: zipcodes,
      success: function (data) {
        var jsondata = JSON.stringify(data);
        sessionStorage.setItem("USZIPCODES", jsondata);
      },
    });
  }
}
StoreUsZipcodes();