jQuery(document).ready(function () {
  /*$('.showallinvoice').click(function() {
        $('#orderhistory_list_open').hide();
        $('#orderhistory_list').show();
        $('.heading').toggle();
        $('.heading').removeClass('hidden');
        $('.show-search-error').hide();
        $('.heading').addClass('show');
        $('.alt_row').removeClass('in');
        $('.ordernumber-list').removeClass('selected-order');
        $('.showallinvoice').addClass('selected-order');
        if (window.screen.width > 767) {
            $('.heading').removeClass('visible-xs');
        } else {
  
        }
    });*/

  $(".ordernumber-list,.ordernumber-lists").on("click", function () {
    $("#searchKeyElementMob").val("");
    $("#searchKeyElement").val("");
    $("#orderhistory_list_open").hide();
    $("#orderhistory_list").show();
    $(".heading").addClass("visible-xs");
  });

  GetNextSetofOrdersMobileFromJSON();
});

function resetCollapse(element) {
  $(element).on("hide.bs.collapse", function () {
    setTimeout(function () {
      $(element).addClass("in");
    }, 500);
  });
}

function calculateInvoiceDueDate() {
  //console.log(dueDays);
  jQuery(".orders-list")
    .find(".invoicelist")
    .each(function () {
      if (
        jQuery(this).attr("data-invoice_date") != undefined &&
        jQuery(this).attr("data-amount_due") != undefined &&
        jQuery(this).attr("data-amount_due") > 0
      ) {
        var invoiceDate = new Date(jQuery(this).attr("data-invoice_date"));
        var dueDate = invoiceDate;
        dueDate.setDate(dueDate.getDate() + dueDays);
        var dd = dueDate.getDate();
        var mm = dueDate.getMonth() + 1;
        var y = dueDate.getFullYear();
        var dueFormattedDate = mm + "/" + dd + "/" + y;
        jQuery(this).attr("data-invoice_duedate", dueFormattedDate);
        var getduedate = $(
          ".getduedate-" + jQuery(this).attr("data-orderid")
        ).text(dueFormattedDate);
        var currentDate = new Date();
        var Difference_In_Time = currentDate.getTime() - invoiceDate.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        Difference_In_Days = Difference_In_Days + dueDays - 1;
        //console.log("Due Days:" + Difference_In_Days);
        if (Difference_In_Days > dueDays) {
          jQuery(this).addClass("invoice-due open-invoice");
          jQuery(".filter-" + jQuery(this).attr("data-orderid"))
            .find(".pastdue-check")
            .removeClass("hidden");
          jQuery(".filter-" + jQuery(this).attr("data-orderid"))
            .find(".getduedate-amount")
            .addClass("pastdue-check-amount");
        }
      }
    });
}
calculateInvoiceDueDate();

$("body").click(function () {
  $(".error-message").hide();
});

function qtyupdate(qtyboxid, type) {
  var qty = parseInt(document.getElementById(qtyboxid).value);
  if (type == "plus") {
    document.getElementById(qtyboxid).value = qty + 1;
  } else {
    if (qty < 2) document.getElementById(qtyboxid).value = 0;
    else document.getElementById(qtyboxid).value = qty - 1;
  }
}

$("div .ordernumber-list:eq(0)").addClass("selected-order");
if (screen.width > 767) {
  $("div .collapse:eq(0)").addClass("in");
}
$("div .showOrderInfo .order-summary:eq(0)").show("slow");
$(".collapse").on("show.bs.collapse", function (e) {
  //$('.heading').hide();
  // $('.fa-angle-down').css('transform', 'rotate(180deg)');
  $(".open-invoice-for-orders").hide();
});
$(".collapse").on("hide.bs.collapse", function (e) {
  $(".alt_row").removeClass("in");
  // $('.fa-angle-down').css('transform', 'rotate(180deg)');
  $(".open-invoice-for-orders").show();
});

$(".collapse").on("hidden.bs.collapse", function (e) {
  var className = $(this).attr("data-class");
  $(".order-summary" + className).hide();
  $(".fa-angle-down").css("transform", "rotate(0deg)");
  $(".open-invoice-for-orders").show();
});

$(".heading").click(function () {
  $(this).find(".find").css("transform", "rotate(180deg)");
});

$("h5").click(function () {
  $(this).find(".find").css("transform", "rotate(180deg)");
});

$(".collapse").on("hidden.bs.collapse", function (e) {
  $(".find").css("transform", "rotate(0deg)");
});

jQuery("input.searchall").on("input", function (e) {
  var type = "";
  jQuery(".filterkey").each(function () {
    if (jQuery(this).is(":checked")) type = jQuery(this).val();
  });
  if (type) sortProducts(type);
});

//show all open invoice
$(".seeall-invoice").on("click", function () {
  var counter = 1;
  var duecount = $(".getduecount").text();
  var counters = 0;
  $(".getduecount").each(function () {
    counters++;
  });
  if (counters == 0) {
    $(".invoice-error").removeClass("hidden");
    $(".show-search-error").hide();
    $(".heading").removeClass("show");
    $(".heading").hide();
    $(".alt_row").hide();
    $(".alt_row").removeClass("in");
  } else {
    $(".invoice-error").addClass("hidden");
    $(".show-search-error").hide();
    $(".heading").removeClass("show");
    $(".heading").hide();
    $(".alt_row").hide();
    $(".alt_row").removeClass("in");
    $(".open-invoice").each(function () {
      $(".show-search-error").hide();
      //console.log(counter++);
      $(".seeall-invoice").addClass("selected-order");
      $(".seeall-invoice").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".open-invoice-text").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".invoice-due").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".open-invoice").removeClass("hidden");
      $(".tabs").removeClass("selected-order");
      $(".ordernumber-list").removeClass("selected-order");
      $(".open-invoice").show();
      $(".open-invoice-for-orders").show();
      //$('.open-invoice').css('display', 'block');
    });
  }
});

function SeeallInvoice() {
  var counter = 1;
  var duecount = $(".getduecount").text();
  var counters = 0;
  $(".getduecount").each(function () {
    counters++;
  });
  if (counters == 0) {
    $(".invoice-error").removeClass("hidden");
    $(".show-search-error").hide();
    $(".heading").removeClass("show");
    $(".heading").hide();
    $(".alt_row").hide();
    $(".alt_row").removeClass("in");
  } else {
    $(".invoice-error").addClass("hidden");
    $(".show-search-error").hide();
    $(".heading").removeClass("show");
    $(".heading").hide();
    $(".alt_row").hide();
    $(".alt_row").removeClass("in");
    $(".open-invoice").each(function () {
      $(".show-search-error").hide();
      counter++;
      $(".seeall-invoice").addClass("selected-order");
      $(".seeall-invoice").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".open-invoice-text").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".invoice-due").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".open-invoice").removeClass("hidden");
      $(".tabs").removeClass("selected-order");
      $(".ordernumber-list").removeClass("selected-order");
      $(".open-invoice").show();
      $(".open-invoice-for-orders").show();
      //$('.open-invoice').css('display', 'block');
    });
  }
  //console.log(counter);
}

// var totalamount = 0
// $('.openinvoice-total').each(function() {
//     var total = parseFloat($(this).text());
//     totalamount += total;
//     //console.log(totalamount);
//     $('#totalamountdue').text('$' + totalamount.toFixed(2));
// })

var roundamount = 0;
$(".roundamount").each(function () {
  var total = parseFloat($(this).text());
  roundamount = total;
  $(this).text(roundamount.toFixed(2));
});

function RoundOfAmount() {
  var balanceround = 0;
  $(".balanceround").each(function () {
    var total = parseFloat($(this).text());
    balanceround = total;
    $(this).text(balanceround.toFixed(2));
  });

  var roundamount = 0;
  $(".roundamount").each(function () {
    var total = parseFloat($(this).text());
    roundamount = total;
    $(this).text(roundamount.toFixed(2));
  });
}
RoundOfAmount();

$(".selected-order").on("click", function () {
  $(".in").collapse("show");
});

// function for datepicker
jQuery(function () {
  var strVal = $.trim($(".orderdatenew").text());
  var lastChar = strVal.slice(-1);
  var strVal = strVal.split(/\s*,\s*/);
  if (lastChar == ",") {
    // check last character is string
    strVal = strVal.slice(0, -1); // trim last character
  }
  var enableDays = strVal;

  function enableAllTheseDays(date) {
    var sdate = $.datepicker.formatDate("dd-m-yy", date);
    if ($.inArray(sdate, enableDays) != -1) {
      return [true];
    }
    return [false];
  }

  $("#datepicker").datepicker({
    dateFormat: "dd-m-yy",
    showOtherMonths: true,
    beforeShowDay: enableAllTheseDays,
    dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthNamesShort: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    buttonImage: "graphics/CalendarIcon_vv copy.png",
    buttonImageOnly: true,
    changeMonth: true,
    changeYear: true,
    showOn: "both",
    showButtonPanel: true,
    closeText:
      "<span class='material-icons' style='position: relative; top: 5px;'>close</span>",
    onSelect: function (dateText) {
      // write your logic here
      //console.log(dateText);
      $(".alt_row").hide();
      $(".order-summary").hide();
      $(".orderdate-" + dateText).addClass("highlightdate  active");
      $(".collapse").removeClass("in");
      $(".heading").addClass("hidden");
      $(".heading-" + dateText).addClass("highlightdate  active");
      $(".highlightdate").removeClass("active");
      $(".heading-" + dateText).addClass("highlightdate  active");
      $(".heading-" + dateText).removeClass("hidden");
      $(".heading-" + dateText).show();
      $(".show-search-error").hide();
      $(".date-" + dateText).addClass("highlightdate  active");
      $(".allproduct-r").removeClass("active");
      $(".orderdipslay").hide();
      $(".open-invoice-for-orders").show();
      $(".background-container").css("opacity", "1");
    },
    beforeShow: function () {
      setTimeout(function () {
        $(".background-container").css("opacity", "0.6");
      }, 0);
    },
    onClose: function () {
      setTimeout(function () {
        $(".background-container").css("opacity", "1");
      }, 0);
    },
  });
}); // function for datepicker

$("#mobileArrowUp1").click(function () {
  $(this).toggleClass("fa-angle-down");
  if ($(this).hasClass("fa-angle-down")) {
    $(".mobileview-summary").addClass("mobileview-height2");
    $(".mobileview-summary").removeClass("mobileview-height1");
  } else {
    $(".mobileview-summary").addClass("mobileview-height1");
    $(".mobileview-summary").removeClass("mobileview-height2");
  }
});

$("#mobileArrowUp2").click(function () {
  $(this).toggleClass("fa-angle-down");
  if ($(this).hasClass("fa-angle-down")) {
    $(".mobileview-summary").addClass("mobileview-height2");
    $(".mobileview-summary").removeClass("mobileview-height1");
  } else {
    $(".mobileview-summary").addClass("mobileview-height1");
    $(".mobileview-summary").removeClass("mobileview-height2");
  }
});

$("#mobileArrowUp3").click(function () {
  $(this).toggleClass("fa-angle-down");
  if ($(this).hasClass("fa-angle-down")) {
    $(".mobileview-summary").addClass("mobileview-height2");
    $(".mobileview-summary").removeClass("mobileview-height1");
  } else {
    $(".mobileview-summary").addClass("mobileview-height1");
    $(".mobileview-summary").removeClass("mobileview-height2");
  }
});

$("#mobileArrowUp4").click(function () {
  $(this).toggleClass("fa-angle-down");
  if ($(this).hasClass("fa-angle-down")) {
    $(".mobileview-summary").addClass("mobileview-height2");
    $(".mobileview-summary").removeClass("mobileview-height1");
  } else {
    $(".mobileview-summary").addClass("mobileview-height1");
    $(".mobileview-summary").removeClass("mobileview-height2");
  }
});

$(".due-slide").click(function () {
  var slide = $(this).attr("id");
  //alert(slide);
  if (slide === "due-up") {
    $(".show-due").html(
      'Amount Due <sup style="color: #fff;"><i class="fa fa-question-circle showbubbletotal"></i></sup>'
    );
    $(".total-display").css("background-color", "#f47a44");
    var totalDue = parseFloat($("#totalamountdue").attr("data-due"));
    $(".past-due").text("$" + totalDue.toFixed(2));
    $(".showbubbletotal").click(function () {
      $(".bubble")
        .toggle()
        .html(
          '<p class="txt-gray due-up-text" style="color: #000;font-size: 10px;text-align: unset;position: relative;top: 24px;bottom: 10%;width: 98%;left: 0;right: 0;">This is the total amount for all open invoices on your account</p>'
        );
      $(".due-up-text-past").hide();
      $(".due-up-text").show();
    });
  } else {
    $(".show-due").html(
      'Past Amount Due <sup style="color: #fff;"><i class="fa fa-question-circle showbubblepast"></i></sup>'
    );
    $(".total-due").addClass("past-due");
    $(".total-display").css("background-color", "red");
    var totalPastDue = 0;
    if ($("#totalamountdue").attr("data-postdue") > 0) {
      totalPastDue = parseFloat($("#totalamountdue").attr("data-postdue"));
    }
    $(".past-due").text("$" + totalPastDue.toFixed(2));
    $(".showbubblepast").click(function () {
      $(".due-up-text").hide();
      $(".due-up-text-past").show();
      $(".bubble")
        .toggle()
        .html(
          '<p class="txt-gray due-up-text-past" style="color: #000;font-size: 10px;text-align: unset;position: relative;top: 24px;bottom: 10%;width: 98%;left: 0;right: 0;">This is the past due balance on your account. Please contact our accounting team to make a payment as soon as possible.</p>'
        );
    });
    /*
        var totalamount = 0
        $('.pastdue-check-amount').each(function() {
            var total = parseFloat($(this).text());
            totalamount += total;
            //console.log(totalamount);
            $('.past-due').text('$' + totalamount.toFixed(2));
        })*/
  }
});

var showbubble = $(".bubble").attr("style");
if (showbubble == "display: block;") {
  $("body").click(function () {
    $(".bubble").toggle();
  });
}

function loadMore() {
  //console.log("More loaded");
  $(".order-list").append("<div>");
  $(window).bind("scroll", bindScroll);
}

function GetNextSetofOrders() {
  var getcount = 0;
  var offset = parseInt($("#defaultoffset").val()) + 5;
  $("#defaultoffset").val(offset);
  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=invoice&Offset=" +
        offset +
        "&Per_Page=5&SortBy=OrdDtDesc",
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $(".orderscroll-view").append(
          $(parsedResponseOS).filter(".getorderSummary").html()
        );
        $("#orderhistory_list .b2b-customers").append(
          $(parsedResponse).filter(".b2b-customers").html()
        );
        ResetMainContainer();
        $(parsedResponse)
          .find(".getOrderdetails")
          .each(function () {
            getcount++;
            var dataDate = $(this).attr("data-orderdate");
            var dataorderid = $(this).attr("data-orderid");
            var dategetInvoice = $(this).attr("data-getinvoice");
            var datamodified_dt = $(this).attr("data-modified_dt");
            var dataAmtDue = $(this).attr("data-amount_due");
            var dataWriteoff = $(this).attr("data-write_offs");
            var dataPayments = $(this).attr("data-payments");
            var datainvoice_amount = $(this).attr("data-invoice_amount");
            var datainvoicedate = $(this).attr("data-invoice_date");
            var dataadsinvoice = $(this).attr("data-adsinvoice");
            var item = `<div data-orderid="${dataorderid}" data-adsinvoice="${dataadsinvoice}" data-invoice="${dategetInvoice}" data-invoice_date="${datainvoicedate}" data-invoice_amount="${datainvoice_amount}" data-payments="${dataPayments}" data-write_offs="${dataWriteoff}" data-amount_due="${dataAmtDue}" data-modified_dt="${datamodified_dt}" onclick="GetNextSetofOrdersOnclick(${dataorderid});getOrderStatus(${dataorderid});Trackmyorder(${dataorderid}); " class=" invoicelist filter${dataorderid}">
                        <div class="collapse${dataorderid} tabs item-${dataorderid} orders-wrapper" style="width: max-content;margin-left: .8rem;">
                        <p class="ordernumber-list collapse-${dataorderid}">
                        ${dataDate} | Order: #${dataorderid}</p>
                        </div>
                        <div class="clearfix"></div>
                        </div>`;
            $(".scroll-view").append(item).fadeIn("slow");
            $(".orderscroll-view").find("searchedordersummary").hide();
            $(".showOrderInfo").show();
            RoundOfAmount();
          });
        //console.log("the final value is " + getcount);
        $("#getCount").val(getcount);
      }
    )
  ).then(function () {});
}

function GetNextSetofOrdersFromJSON() {
  var getcount = 0;
  var offset = parseInt($("#defaultoffset").val()) + 5;
  $("#defaultoffset").val(offset);
  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=invoice&Offset=" +
        offset +
        "&Per_Page=5&SortBy=OrdDtDesc&devicetype=desktop",
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $(".orderscroll-view").append(
          $(parsedResponseOS).filter(".getorderSummary").html()
        );
        $("#orderhistory_list .b2b-customers").append(
          $(parsedResponse).filter(".b2b-customers").html()
        );
        ResetMainContainer();
        $(parsedResponse)
          .find(".getInvoiceDetailsusingajax")
          .each(function () {
            getcount++;
            var dataDate = $(this).attr("data-orderdate");
            var dataorderid = $(this).attr("data-orderid");
            var dategetInvoice = $(this).attr("data-getinvoice");
            var datamodified_dt = $(this).attr("data-modified_dt");
            var dataAmtDue = $(this).attr("data-amount_due");
            var dataWriteoff = $(this).attr("data-write_offs");
            var dataPayments = $(this).attr("data-payments");
            var datainvoice_amount = $(this).attr("data-invoice_amount");
            var datainvoicedate = $(this).attr("data-invoice_date");
            var dataadsinvoice = $(this).attr("data-adsinvoice");
            var item = `<div data-orderid="${dataorderid}" data-adsinvoice="${dataadsinvoice}" data-invoice="${dategetInvoice}" data-invoice_date="${datainvoicedate}" data-invoice_amount="${datainvoice_amount}" data-payments="${dataPayments}" data-write_offs="${dataWriteoff}" data-amount_due="${dataAmtDue}" data-modified_dt="${datamodified_dt}" onclick="GetNextSetofOrdersOnclick(${dataorderid});getOrderStatus(${dataorderid});Trackmyorder(${dataorderid}); " class=" invoicelist filter${dataorderid}">
                        <div class="collapse${dataorderid} tabs item-${dataorderid} orders-wrapper" style="width: max-content;margin-left: .8rem;">
                        <p class="ordernumber-list collapse-${dataorderid}">
                        ${dataDate} | Order: #${dataorderid}</p>
                        </div>
                        <div class="clearfix"></div>
                        </div>`;
            $(".scroll-view").append($(this).html()).fadeIn("slow");
            $(".orderscroll-view").find("searchedordersummary").hide();
            $(".showOrderInfo").show();
            RoundOfAmount();
          });
        //console.log("the final value is " + getcount);
        $("#getCount").val(getcount);
      }
    )
  ).then(function () {});
}
function GetNextSetofOrdersMobileFromJSON() {
  var getcount = 0;
  var offset = parseInt($("#defaultoffset").val()) + 10;
  $("#defaultoffset").val(offset);
  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=invoice&Offset=" +
        offset +
        "&Per_Page=10&SortBy=OrdDtDesc&devicetype=mobile",
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $(".orderscroll-view").append(
          $(parsedResponseOS).filter(".getorderSummary").html()
        );
        ResetMainContainer();
        $(parsedResponse)
          .find(".getInvoiceDetailsusingajax")
          .each(function () {
            getcount++;
            var dataDate = $(this).attr("data-orderdate");
            var dataorderid = $(this).attr("data-orderid");
            var dategetInvoice = $(this).attr("data-getinvoice");
            var datamodified_dt = $(this).attr("data-modified_dt");
            var dataAmtDue = $(this).attr("data-amount_due");
            var dataWriteoff = $(this).attr("data-write_offs");
            var dataPayments = $(this).attr("data-payments");
            var datainvoice_amount = $(this).attr("data-invoice_amount");
            var datainvoicedate = $(this).attr("data-invoice_date");
            var dataadsinvoice = $(this).attr("data-adsinvoice");
            var item = `<div data-orderid="${dataorderid}" data-adsinvoice="${dataadsinvoice}" data-invoice="${dategetInvoice}" data-invoice_date="${datainvoicedate}" data-invoice_amount="${datainvoice_amount}" data-payments="${dataPayments}" data-write_offs="${dataWriteoff}" data-amount_due="${dataAmtDue}" data-modified_dt="${datamodified_dt}" onclick="GetNextSetofOrdersOnclick(${dataorderid});getOrderStatus(${dataorderid});Trackmyorder(${dataorderid}); " class=" invoicelist filter${dataorderid}">
                        <div class="collapse${dataorderid} tabs item-${dataorderid} orders-wrapper" style="width: max-content;margin-left: .8rem;">
                        <p class="ordernumber-list collapse-${dataorderid}">
                        ${dataDate} | Order: #${dataorderid}</p>
                        </div>
                        <div class="clearfix"></div>
                        </div>`;
            $(".orderlists").append($(this).html()).fadeIn("slow");
            $(".orderscroll-view").find("searchedordersummary").hide();
            // $(".showOrderInfo").hide();
            RoundOfAmount();
          });
        $("#getCount").val(getcount);
      }
    )
  ).then(function () {});
}

function GetNextSetofOrdersOnclick(ordernumber) {
  var getcount = 0;
  var getdevice = "";
  $(".ordloader").css("display", "flex");
  $(".load-content").show();
  $(".invo_tabn").hide();
  $("#orderhistory_list").hide();
  $(".orderscroll-view").html("");
  $("body").find(".order-list-productscheck").addClass("order-list-products");
  $(".seeallinvoice-text").css("color", "#414042");
  if (screen.width > 767) {
    getdevice = "desktop";
  } else {
    getdevice = "mobile";
  }

  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=particularinvoice&searchKey=" +
        ordernumber +
        "&devicetype=" +
        getdevice,
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $(".orderscroll-view").html(
          $(parsedResponseOS).filter(".getorderSummary").html()
        );
        $(".order-list-products #orderhistory_list").hide();
        $(".order-list-products #orderhistory_list")
          .find(".alt_row")
          .removeClass("collapse");
        $(".order-list-products #orderhistory_list").show();
        var dataorderid = "";

        if (getdevice == "desktop") {
          $(parsedResponse)
            .find(".getOrderdetails")
            .each(function () {
              getcount++;
              dataorderid = $(this).attr("data-orderid");
              $(".filter-" + dataorderid).addClass("collapses" + dataorderid);
              $(".filter-collapse-" + dataorderid).addClass("in");
              RoundOfAmount();
            });

          RoundOfAmount();
          if (getcount > 0) {
            if (window.screen.width < 767) {
              $(".orderscroll-view")
                .find(".order-summary")
                .addClass("searchedordersummary");
              $(".foropeninvoice .mobile-open-invoice").html(
                $(parsedResponseOS).filter(".getorderSummary").html()
              );
            } else {
              $(".orderscroll-view")
                .find(".order-summary")
                .addClass("searchedordersummary");
              $(".foropeninvoice .orderscroll-view").html(
                $(parsedResponseOS).filter(".getorderSummary").html()
              );
            }
            $(".order-list-products #orderhistory_list").show();
            $(".order-list-products #orderhistory_list").html(
              $(parsedResponse).filter(".b2b-customers").html()
            );
          } else {
          }
          $(".selected-order").removeClass("selected-order");
          $(".filter-collapse-" + dataorderid).addClass("in");
          $(".collapse-" + dataorderid).addClass("selected-order");

          $("#getCount").val(getcount);
          $(".showOrderInfo").show();
          $(".order-summary").hide();
          $(".order-summary" + dataorderid).show();
          getOrderStatus(dataorderid);
        } else {
          invoiceListToggle(ordernumber);
        }
        getCustomerOrderPoints(ordernumber);
      }
    )
  ).then(function () {
    $(".ordloader").css("display", "none");
    $(".load-content").hide();
    $(".invo_tabn").show();
    $(".invoice-error").hide();
    var text = $(".customerpoints").text();
    $(".customerpoints").text(text.substring(15, "Redeemed Points"));
    var customerpointstotal = $(".customerpointstotal").text();
    $(".customerpointstotal").text(
      customerpointstotal.split("Redeemed Points")[1]
    );
  });

  $("body").each(function () {
    var pcode = $(".checksubstituionproducts").val();
    var scode = $(".checksubstituionproductcode").val();
    getsubstitutionInventory(pcode, scode);
  });
}

function GetNextSetofOrdersMobileOnclick(ordernumber) {
  var getcount = 0;
  var getdevice = "";
  $(".ordloader").css("display", "flex");
  $(".load-content").show();
  $(".invo_tabn").hide();
  $("#orderhistory_list").hide();
  $(".orderscroll-view").html("");
  $("body").find(".order-list-productscheck").addClass("order-list-products");
  $(".seeallinvoice-text").css("color", "#414042");
  var dataorderid = "";
  if (screen.width > 767) {
    getdevice = "desktop";
  } else {
    getdevice = "mobile";
  }

  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=particularinvoice&searchKey=" +
        ordernumber +
        "&devicetype=" +
        getdevice,
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);

        $(".orderscroll-view").html(
          $(parsedResponseOS).filter(".getorderSummary").html()
        );
        $(".mobileview-summary").append(
          $(parsedResponseOS).filter(".getorderSummary").html()
        );
        $(".order-list-products #orderhistory_list").hide();
        $(".order-list-products #orderhistory_list").show();
        var dataorderid = "";

        $(parsedResponse)
          .find(".getOrderdetails")
          .each(function () {
            getcount++;
            dataorderid = $(this).attr("data-orderid");
            //console.log(dataorderid);
            $(".filter-" + dataorderid).addClass("collapses" + dataorderid);
            $(".filter-collapse-" + dataorderid).addClass("in");
            RoundOfAmount();
          });

        if (getcount > 0) {
          $(".orderscroll-view")
            .find(".order-summary")
            .addClass("searchedordersummary");
          $(".foropeninvoice .mobile-open-invoice").html(
            $(parsedResponseOS).filter(".getorderSummary").html()
          );
          $(".line-items.b2b-customers").html(
            $(parsedResponse).filter(".b2b-customers").html()
          );
          mobileOrderrRetailDetail(dataorderid);
        } else {
        }

        if (UserType == 2) {
          mobileOrderrRetailDetail(dataorderid);
        } else {
          mobileOrderDetail(dataorderid);
        }

        /*if (getcount > 0) {
                if (window.screen.width < 767) {
                    $(".orderscroll-view").find('.order-summary').addClass('searchedordersummary');
                    $(".foropeninvoice .mobile-open-invoice").html($(parsedResponseOS).filter('.getorderSummary').html());
                } else {
                    $(".orderscroll-view").find('.order-summary').addClass('searchedordersummary');
                    $(".foropeninvoice .orderscroll-view").html($(parsedResponseOS).filter('.getorderSummary').html());
                }
                $(".order-list-products #orderhistory_list").show();
                $(".order-list-products #orderhistory_list").html($(parsedResponse).filter('.b2b-customers').html());
                
                
                
            }else{
                
            }*/

        $("#getCount").val(getcount);
        $(".showOrderInfo").show();
        $(".order-summary").hide();
        $(".order-summary" + dataorderid).toggle();
        $(".search-order").hide();
      }
    )
  ).then(function () {
    $(".ordloader").css("display", "none");
    $(".load-content").hide();
    $(".invo_tabn").show();
    MobileOrderSummary();
    $("body").each(function () {
      var pcode = $(".checksubstituionproducts").val();
      var scode = $(".checksubstituionproductcode").val();
      getsubstitutionInventory(pcode, scode);
    });
    getCustomerOrderPoints(ordernumber);
  });
}

function MobileOrderSummary() {
  $(".mobileArrowUp4").click(function () {
    $(this).toggleClass("fa-angle-down");
    if ($(this).hasClass("fa-angle-down")) {
      $(".mobileview-summary").addClass("mobileview-height2");
      $(".mobileview-summary").removeClass("mobileview-height1");
    } else {
      $(".mobileview-summary").addClass("mobileview-height1");
      $(".mobileview-summary").removeClass("mobileview-height2");
    }
  });
}

function GetNextSetofOrdersMobile() {
  var getcount = 0;
  var offset = parseInt($("#defaultoffset").val()) + 5;
  $("#defaultoffset").val(offset);
  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=invoice&Offset=" +
        offset +
        "&Per_Page=5&SortBy=OrdDtDesc",
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $(".mobileview-summary").append(
          $(parsedResponseOS).filter(".getorderSummary").html()
        );
        $("#orderhistory_list .b2b-customers").append(
          $(parsedResponse).filter(".b2b-customers").html()
        );

        $(parsedResponse)
          .find(".getOrderdetails")
          .each(function () {
            getcount++;
            var dataDate = $(this).attr("data-orderdate");
            var dataorderid = $(this).attr("data-orderid");
            var dategetInvoice = $(this).attr("data-getinvoice");
            var datamodified_dt = $(this).attr("data-modified_dt");
            var dataAmtDue = $(this).attr("data-amount_due");
            var dataWriteoff = $(this).attr("data-write_offs");
            var dataPayments = $(this).attr("data-payments");
            var datainvoice_amount = $(this).attr("data-invoice_amount");
            var datainvoicedate = $(this).attr("data-invoice_date");
            $("#heading-filter-" + dataorderid).removeClass("hidden");
            var item = `<div data-orderid="${dataorderid}" data-invoice="${dategetInvoice}" data-invoice_date="${datainvoicedate}" data-invoice_amount="${datainvoice_amount}" data-payments="${dataPayments}" data-write_offs="${dataWriteoff}" data-amount_due="${dataAmtDue}" data-modified_dt="${datamodified_dt}" onclick="invoiceListToggle(${dataorderid});getOrderStatus(${dataorderid});Trackmyorder(${dataorderid}); " class=" invoicelist filter${dataorderid}">
                        <div class="collapse${dataorderid} tabs item-${dataorderid} orders-wrapper" style="width: max-content;margin-left: .8rem;">
                        <p class="ordernumber-list collapse-${dataorderid}">
                        ${dataDate} | Order: #${dataorderid}</p>
                        </div>
                        <div class="clearfix"></div>
                        </div>`;
            $(".scroll-view").append(item).fadeIn("slow");
            RoundOfAmount();
            SeeallInvoice();
          });

        //console.log("the final value is " + getcount);
        $("#getCount").val(getcount);
        if (getcount == 0) {
          $(".smbtn").css("visibility", "hidden");
        } else {
          $(".smbtn").css("visibility", "visible");
        }
      }
    )
  ).then(function () {});
}

function GetOpenInvoicesOld() {
  var getcount = 0;
  var offset = parseInt($("#defaultoffset").val()) + 5;
  $("#defaultoffset").val(offset);
  $("#searchKeyElement").val("");
  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=openOrders&Per_Page=-1",
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $("#orderhistory_list_open").show();
        $("#orderhistory_list").hide();
        ResetMainContainer();

        $(parsedResponse)
          .find(".getOrderdetails")
          .each(function () {
            getcount++;
            var dataDate = $(this).attr("data-orderdate");
            var dataorderid = $(this).attr("data-orderid");
            var dategetInvoice = $(this).attr("data-getinvoice");
            var datamodified_dt = $(this).attr("data-modified_dt");
            var dataAmtDue = $(this).attr("data-amount_due");
            var dataWriteoff = $(this).attr("data-write_offs");
            var dataPayments = $(this).attr("data-payments");
            var datainvoice_amount = $(this).attr("data-invoice_amount");
            var datainvoicedate = $(this).attr("data-invoice_date");
            RoundOfAmount();
          });

        if (getcount > 0) {
          if (window.screen.width < 767) {
            $(".foropeninvoice .mobile-open-invoice").html(
              $(parsedResponseOS).filter(".getorderSummary").html()
            );
          } else {
            $(".foropeninvoice .orderscroll-view").html(
              $(parsedResponseOS).filter(".getorderSummary").html()
            );
            if (screen.width > 767) {
              setTimeout(function () {
                $("#orderhistory_list_open .heading").removeClass("visible-xs");
              }, 200);
            }
          }
          $("#orderhistory_list_open").html(
            $(parsedResponse).filter(".b2b-customers").html()
          );
          $("#orderhistory_list_open .heading").removeClass("hidden");
          RoundOfAmount();
          $(".showOrderInfo").hide();
        }

        //console.log("the final value is " + getcount);
        $("#getCount").val(getcount);
        if (getcount == 0 || getcount < 0) {
          $(".order-summary").hide();
          $(".invoice-error").removeClass("hidden");
          $(".show-search-error").hide();
          $(".invoice-error").show();
        } else {
          $(".invoice-error").addClass("hidden");
          $(".invoice-error").hide();
        }
      }
    )
  ).then(function () {
    /* to make red color font */
    $(".open-invoice").each(function () {
      $(".show-search-error").hide();

      $(".seeall-invoice").addClass("selected-order");
      $(".seeall-invoice").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".open-invoice-text").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".invoice-due").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".open-invoice").removeClass("hidden");
      $(".tabs").removeClass("selected-order");
      $(".ordernumber-list").removeClass("selected-order");
      $(".open-invoice").show();
      $(".open-invoice-for-orders").show();
    });
  });
}

function GetOpenInvoices() {
  var getcount = 0;
  var offset = parseInt($("#defaultoffset").val()) + 5;
  var per_page = "-1";
  $("#defaultoffset").val(offset);
  $("#searchKeyElement").val("");
  $(".scroll-view").html("");
  $(".scroll-view").css('visibility','hidden');
  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=openOrders&Per_Page=" + per_page,
      function (html) {
        
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $("#orderhistory_list .b2b-customers").append(
          $(parsedResponse).filter(".b2b-customers").html()
        );
        ResetMainContainer();
        $(parsedResponse)
          .find(".getInvoiceDetailsusingajax")
          .each(function () {
            getcount++;
            var content = $(this).html();
            $(".scroll-view").append(content).css('visibility','visible');
            $(".showOrderInfo").show();
            RoundOfAmount();
          });
          // $("div .invoicelist:visible:eq(0)").first().click();
        $(".showOrderInfo").show();
        $("#getCount").val(getcount);
      }
    )
  ).then(function () {
    /* to make red color font */
    if (getcount > 0) {
      // $("div .ordernumber-list:visible:eq(0)").first().click();
      $(".show-search-error").css("display", "none");
      $(".invoice-error").removeClass("hidden");
      $(".invoice-error").hide();
      $(".invo_tabn").show();
      $("div .invoicelist:visible:eq(0)").first().click();
    } else {
      $(".invoice-error").show();
      $(".invoice-error").css({
        display: "flex",
        height: "30rem",
        "justify-content": "center",
        "align-items": "center",
      });
      $(".invo_tabn").hide();
      $(".showOrderInfo").hide();
    }
    $(".open-invoice").each(function () {
      $(".show-search-error").hide();

      // $(".seeall-invoice").addClass("selected-order");
      $(".seeall-invoice").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".open-invoice-text").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".invoice-due").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".open-invoice").removeClass("hidden");
      $(".tabs").removeClass("selected-order");
      $(".ordernumber-list").removeClass("selected-order");
      $(".open-invoice").show();
      $(".open-invoice-for-orders").show();
    });
  });
}

function GetMobileOpenInvoices() {
  var getcount = 0;
  var offset = parseInt($("#defaultoffset").val()) + 5;
  var per_page = "-1";
  $("#defaultoffset").val(offset);
  $("#searchKeyElement").val("");
  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=MobileopenOrders&Per_Page=" + per_page,
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        ResetMainContainer();
        $(".orderlists").html("");
        $(parsedResponse)
          .find(".getInvoiceDetailsusingajax")
          .each(function () {
            getcount++;
            //console.log("final count is " + getcount);
            var content = $(this).html();
            $(".orderlists").append(content).fadeIn("slow");
            RoundOfAmount();
          });
        $("#getCount").val(getcount);
      }
    )
  ).then(function () {
    /* to make red color font */

    if (getcount > 0) {
      $(".show-search-error").css("display", "none");
      $(".invoice-error").removeClass("hidden");
      $(".invoice-error").hide();
      $(".invo_tabn").show();
    } else {
      $(".invoice-error").show();
      $(".invoice-error").removeClass('hidden');
      $(".invo_tabn").hide();
      $(".showOrderInfo").hide();
    }

    $(".open-invoice").each(function () {
      $(".show-search-error").hide();

      $(".seeall-invoice").addClass("selected-order");
      $(".seeall-invoice").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".open-invoice-text").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".invoice-due").css({
        color: "red",
        "font-weight": "normal",
      });
      $(".open-invoice").removeClass("hidden");
      $(".tabs").removeClass("selected-order");
      $(".ordernumber-list").removeClass("selected-order");
      $(".open-invoice").show();
      $(".open-invoice-for-orders").show();
    });
  });
}

function NewSearchInovice() {
  var getcount = 0;
  if (window.screen.width < 767) {
    var searchKey = $("#searchKeyElementMob").val();
  } else {
    var searchKey = $("#searchKeyElement").val();
  }

  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=searchOrders&searchKey=" +
        searchKey +
        "&Per_Page=-1",
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $(".order-list-products #orderhistory_list").hide();
        $(".order-list-products #orderhistory_list")
          .find(".alt_row")
          .removeClass("collapse");
        /*$(".order-list-products #orderhistory_list_open").show();*/
        $(parsedResponse)
          .find(".getOrderdetails")
          .each(function () {
            getcount++;
            // //console.log($(this).attr('data-date'));
            var dataDate = $(this).attr("data-orderdate");
            var dataorderid = $(this).attr("data-orderid");
            var dategetInvoice = $(this).attr("data-getinvoice");
            var datamodified_dt = $(this).attr("data-modified_dt");
            var dataAmtDue = $(this).attr("data-amount_due");
            var dataWriteoff = $(this).attr("data-write_offs");
            var dataPayments = $(this).attr("data-payments");
            var datainvoice_amount = $(this).attr("data-invoice_amount");
            var datainvoicedate = $(this).attr("data-invoice_date");
            $(".filter-" + dataorderid).addClass("collapses" + dataorderid);
            $(".ordernumber-list").hide();
            //console.log(dataorderid);
            setTimeout(function () {
              $("div .ordernumber-list:visible:eq(0)").first().click();
            }, 500);
            function resetCollapse(element) {
              $(element).on("hide.bs.collapse", function () {
                setTimeout(function () {
                  $(element).addClass("in");
                }, 500);
              });
            }
            RoundOfAmount();
          });

        if (getcount > 0) {
          if (window.screen.width < 767) {
            $(".orderscroll-view")
              .find(".order-summary")
              .addClass("searchedordersummary");
            $(".foropeninvoice .mobile-open-invoice").html(
              $(parsedResponseOS).filter(".getorderSummary").html()
            );
          } else {
            $(".orderscroll-view")
              .find(".order-summary")
              .addClass("searchedordersummary");
            $(".foropeninvoice .orderscroll-view").html(
              $(parsedResponseOS).filter(".getorderSummary").html()
            );
            if (screen.width > 767) {
              setTimeout(function () {
                $("#orderhistory_list_open .heading").removeClass(
                  "visible-xsss"
                );
              }, 200);
            }
          }
          $("div .ordernumber-list:visible:eq(0)").first().click();
          $(".order-list-products #orderhistory_list_open").show();
          $(".order-list-products #orderhistory_list_open").html(
            $(parsedResponse).filter(".b2b-customers").html()
          );
          $(
            ".order-list-products #orderhistory_list_open .heading"
          ).removeClass("hidden");
          $(".invoice-error").hide();
        } else {
          $(".order-list-products #orderhistory_list_open").hide();
        }

        if (getcount == "0" || getcount == 0) {
          if (checkOrderDetails() === true) {
          } else {
            $(".show-search-error").css("display", "flex");
          }
          $(".invoice-error").hide();
          $(".ord-summary").hide();
          $(".ordernumber-list").removeClass("selected-order");
          $(".smbtn").css("visibility", "hidden");
        } else {
          $(".show-search-error").css("display", "none");
          $(".ordernumber-list").removeClass("selected-order");
          $(".smbtn").css("visibility", "hidden");
        }
        $("#getCount").val(getcount);
        $(".showOrderInfo").hide();
      }
    )
  ).then(function () {});
}

function SearchInovice() {
  var getcount = 0;
  var per_page = "";
  if (window.screen.width < 767) {
    var searchKey = $("#searchKeyElementMob").val();
  } else {
    var searchKey = $("#searchKeyElement").val();
  }
  if (searchKey == "") {
    per_page = 10;
    searchKey = "null";
    $("#allOpenInvoices").css("display", "block");
  } else {
    per_page = "-1";
    $("#allOpenInvoices").css({
      display: "none",
      "pointer-events": "none",
      cursor: "default",
    });
    $(".invoice-error").css("display", "none");
  }

  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=invoiceSearch&Per_Page=" +
        per_page +
        "&SearchKey=" +
        searchKey +
        "&devicetype=desktop",
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $("#orderhistory_list .b2b-customers").append(
          $(parsedResponse).filter(".b2b-customers").html()
        );
        ResetMainContainer();
        $(".scroll-view").html("");
        $(parsedResponse)
          .find(".getInvoiceDetailsusingajax")
          .each(function () {
            getcount++;
            //console.log("final count is " + getcount);
            var content = $(this).html();
            $(".scroll-view").append(content);
            RoundOfAmount();
          });
        $("#getCount").val(getcount);
      }
    )
  ).then(function () {
    if (getcount > 0) {
      $("div .invoicelist:visible:eq(0)").first().click();
      $(".show-search-error").css("display", "none");
    } else {
      if (checkOrderDetails() == true) {
      } else {
        $(".show-search-error").css("display", "flex");
      }
      $("#orderhistory_list").hide();
      $(".invo_tabn").hide();
      $(".showOrderInfo").hide();
      $("body")
        .find(".order-list-products")
        .addClass("order-list-productscheck");
      $("body").find(".order-list-products").removeClass("order-list-products");
    }
  });
}

function SearchInoviceMobile() {
  var getcount = 0;
  var per_page = "";
  if (window.screen.width < 1023) {
    var searchKey = $("#searchKeyElementMob").val();
  } else {
    var searchKey = $("#searchKeyElement").val();
  }
  if (searchKey == "") {
    per_page = 10;
    searchKey = "null";
  } else {
    per_page = "-1";
  }

  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=mobileinvoiceSearch&Per_Page=" +
        per_page +
        "&SearchKey=" +
        searchKey +
        "&devicetype=mobile",
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        ResetMainContainer();
        $(".orderlists").html("");
        $(parsedResponse)
          .find(".getInvoiceDetailsusingajax")
          .each(function () {
            getcount++;
            //console.log("final count is " + getcount);
            var content = $(this).html();
            $("#orderhistory_list").show();
            $(".orderlists").append(content).fadeIn("slow");

            RoundOfAmount();
          });

        $("#getCount").val(getcount);
      }
    )
  ).then(function () {
    if (getcount > 0) {
      $(".show-search-error").css("display", "none");
    } else {
      $(".show-search-error").css("display", "flex");
      $("#orderhistory_list").hide();
      $(".invo_tabn").hide();
      $(".showOrderInfo").hide();
      $("body")
        .find(".order-list-products")
        .addClass("order-list-productscheck");
      $("body").find(".order-list-products").removeClass("order-list-products");
    }
  });
}

function SellAllInvoices(element) {
  $(element).addClass("bold-ft");
  var getcount = 0;
  var offset = 0;
  $("#defaultoffset").val(offset);
  $(".ordernumber-list").removeClass("selected-order");
  $(".invo_tabn").hide();
  $("#orderhistory_list").hide();
  $(".seeallinvoicemsg").css("display", "flex");
  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=invoice&Offset=" +
        offset +
        "&Per_Page=5&SortBy=OrdDtDesc",
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $(".orderscroll-view").append(
          $(parsedResponseOS).filter(".getorderSummary").html()
        );
        $("#orderhistory_list .b2b-customers").append(
          $(parsedResponse).filter(".b2b-customers").html()
        );
        ResetMainContainer();
        $(parsedResponse)
          .find(".getInvoiceDetailsusingajax")
          .each(function () {
            getcount++;
            $(".scroll-view").append($(this).html()).fadeIn("slow");
            $(".orderscroll-view").find("searchedordersummary").hide();
            $(".showOrderInfo").show();
            RoundOfAmount();
          });
        $("#getCount").val(getcount);
      }
    )
  ).then(function () {});
}

function SellAllMobileInvoices(element) {
  $(element).addClass("bold-ft");
  var getcount = 0;
  var offset = 0;
  $("#defaultoffset").val(offset);
  $(".ordernumber-list").removeClass("selected-order");
  $(".invo_tabn").hide();
  $("#orderhistory_list").hide();
  $(".seeallinvoicemsg").css("display", "flex");
  $.when(
    $.get(
      "/invoice-ajax.html?CustomerAction=invoice&Offset=" +
        offset +
        "&Per_Page=5&SortBy=OrdDtDesc",
      function (html) {
        var parsedResponseOS = $.parseHTML(html);
        var parsedResponse = $.parseHTML(html);
        $(".orderscroll-view").append(
          $(parsedResponseOS).filter(".getorderSummary").html()
        );
        $("#orderhistory_list .b2b-customers").append(
          $(parsedResponse).filter(".b2b-customers").html()
        );
        ResetMainContainer();
        $(parsedResponse)
          .find(".getInvoiceDetailsusingajax")
          .each(function () {
            getcount++;
            $(".scroll-view").append($(this).html()).fadeIn("slow");
            $(".orderscroll-view").find("searchedordersummary").hide();
            $(".showOrderInfo").show();
            RoundOfAmount();
          });
        //console.log("the final value is " + getcount);
        $("#getCount").val(getcount);
      }
    )
  ).then(function () {});
}

function remove() {
  $("#searchKeyElement").val("");
  $("#filterOrders").attr("onclick", "SearchInovice()");
  $("#filterOrders").html('<i class="fa  fa-search"></i>');
  $("div .collapse:eq(0)").addClass("in");
  $("div .alt_row .collapse").eq(0).addClass("in");
  $(".heading").addClass("hidden");
  $(".ordernumber-list").eq(0).addClass("selected-order");
}

function ResetMainContainer() {
  $(".ordernumber-list,.ordernumber-lists").on("click", function () {
    $("#searchKeyElementMob").val("");
    $("#searchKeyElement").val("");
    $("#orderhistory_list_open").hide();
    $("#orderhistory_list").show();
    $(".foropeninvoice").hide();
    $(".showOrderInfo").show();
  });
}

function bindScroll() {
  if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    $(window).unbind("scroll");
    /* loadMore();*/
    setTimeout(calculateInvoiceDueDate(), 1000);
  }
}

$(window).scroll(bindScroll);

var ppp = 8;
var count = ppp - 1;
$("div.tabs:gt(" + count + ")").addClass("hide");
$(".scroll-view").on("scroll", function () {
  if (
    $(".orders-list").scrollTop() + $(window).height() >
    $(".orders-list").height() - 100
  ) {
    // $('.scroll-view').addClass('loading');
    setTimeout(function () {
      $("div.tabs.hide:lt(" + ppp + ")").removeClass("hide");
      // $('.scroll-view').removeClass('loading');
    }, 1000);
  }
});

const myDiv = document.querySelector(".scroll-view");
myDiv.addEventListener("scroll", () => {
  if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {
    if ($("#getCount").val() > 0) {
      GetNextSetofOrdersFromJSON();
    }
  }
});

if (screen.width < 767) {
  const myDivmob = document.querySelector(".orderlists");
  myDivmob.addEventListener("touchmove", () => {
    if (myDivmob.offsetHeight + myDivmob.scrollTop >= myDivmob.scrollHeight) {
      if ($("#getCount").val() > 0) {
        GetNextSetofOrdersMobileFromJSON();
      }
    }
  });
}

function onScrollMobile() {
  if ($(window).scrollTop() > $(document).height() - $(window).height() - 100) {
    var Status = $("#Status").val();

    if ($("#orderhistory_list").hasClass("loadingcontent")) {
    } else {
      GetNextSetofOrdersMobileFromJSON();
    }

    if ($("#getCount").val() == 0) {
      $(".load-content").css("display", "none");
    }
  }
}

$(document).on("touchmove", onScrollMobile); // for mobile

//billing arrow button
$(".billingInfo").on("shown.bs.collapse", function () {
  $(".billing-find").css("transform", " rotate(180deg)");
});

$(".billingInfo").on("hidden.bs.collapse", function () {
  $(".billing-find").css("transform", " rotate(0)");
});

$(".shippingInfo").on("shown.bs.collapse", function () {
  $(".shipping-find").css("transform", " rotate(180deg)");
});

$(".shippingInfo").on("hidden.bs.collapse", function () {
  $(".shipping-find").css("transform", " rotate(0)");
});

/* Check whether wholsale user has past due */
var pastdueamount = 0;
$(".pastdue-check-amount").each(function () {
  var total = parseFloat($(this).text());
  pastdueamount += total;
  //console.log(pastdueamount);

  if (pastdueamount > 0) {
    $(".total-due").addClass("past-due");
    $(".total-display").css("background-color", "red");
    $(".seeallinvoice-text").css("color", "red");
    $(".show-due").html(
      'Past Amount Due <sup style="color: #fff;"><i class="fa fa-question-circle showbubblepast"></i></sup>'
    );
    $(".past-due").text("$" + pastdueamount.toFixed(2));
    $("#totalamountdue").attr("data-postdue", pastdueamount);
  }
});

/* check for credit amount */
var amt = 0;
$(".invoicelist").each(function () {
  if (
    $(this).attr("data-amount_due") != undefined &&
    $(this).attr("data-amount_due") != ""
  ) {
    var total = $(this).attr("data-amount_due");
    amt = parseFloat(amt) + parseFloat(total);
  }
});
$(".total-dues").text("(" + amt.toFixed(2) + ")");

function showDropdown(code) {
  $("." + code).on("shown.bs.dropdown", function () {
    $("." + code)
      .find(".caret")
      .css("transform", "rotate(180deg)");
  });
  $("." + code).on("hide.bs.dropdown", function () {
    $("." + code)
      .find(".caret")
      .css("transform", "rotate(360deg)");
  });
}

function SearchToggleInvoices(orderid) {
  setTimeout(function () {
    $(".order-summary").hide();
    $(".open-invoice-for-orders").hide();
    $("#orderhistory_list_open .open-invoice-for-orders").hide();
    $("#orderhistory_list_open .collapse" + orderid).addClass("collapses");
    $("#orderhistory_list_open #collapse" + orderid).collapse("toggle");
    $("#orderhistory_list_open .collapse").removeClass("in");
    $("#orderhistory_list_open #collapse" + orderid).addClass("ins");
    $(".showOrderInfo").show();
    $(".showOrderInfo .order-summary" + orderid)
      .first()
      .show();
    $(".foropeninvoice").hide();
    /*$('.foropeninvoice .order-summary' + orderid).first().show();*/
    RoundOfAmount();
  }, 100);
}

function OpenToggleInvoices(orderid) {
  setTimeout(function () {
    $(".order-summary").hide();
    $(".open-invoice-for-orders").hide();
    $("#orderhistory_list_open .open-invoice-for-orders").hide();
    $("#orderhistory_list_open .collapse" + orderid).addClass("collapses");
    $("#orderhistory_list_open #collapse" + orderid).collapse("toggle");
    $("#orderhistory_list_open .collapse").removeClass("in");
    $("#orderhistory_list_open #collapse" + orderid).addClass("ins");
    $(".showOrderInfo").hide();
    $(".foropeninvoice").show();
    $(".foropeninvoice .order-summary" + orderid)
      .first()
      .show();
    RoundOfAmount();
  }, 100);
}

function invoiceListToggle(orderid) {
  $(".showallinvoice").removeClass("bold-ft");
  setTimeout(function () {
    if (orderid) {
      if (screen.width > 767) {
        $(".alt_row").hide();
        $(".alt_row").removeClass("in");
        $(".heading").addClass("hidden");
        $("#collapse" + orderid).collapse("show");
        $("#collapse" + orderid).show();
        $("#collapse" + orderid).addClass("visible");
        $(".selected-order").removeClass("selected-order");
        $(".collapse-" + orderid).addClass("selected-order");
        $(".collapse").removeClass("ins");
        $(".order-summary").hide();
        $(".open-invoice-for-orders").hide();
        $(".order-summary" + orderid).show();
        $(".collapse").removeClass("ins");
        $(".open-invoice").css("display", "block");
        $(".credit-summary").hide();
        $(".heading").hide();
        $(".invoice-error").addClass("hidden");
        $(".collapse" + orderid).addClass("in");
        $(".show-search-error").hide();
        $(".foropeninvoice").hide();
        $(".showOrderInfo").show();
        $(".showOrderInfo .order-summary" + orderid)
          .first()
          .show();
      } else {
        $("#collapse" + orderid).collapse("toggle");
        $(".order-summary").hide();
        $(".order-summary" + orderid).toggle();
        $(".collapse").removeClass("in");
        $(".open-invoice-for-orders").show();
        $(".open-invoice-for-orders").hide();
        $("#collapse" + orderid).addClass("ins");
        $("#collapse" + orderid).collapse("toggle");
      }
      RoundOfAmount();
      Trackmyorder(orderid);
    }
  }, 500);
}

/*to check credit orders and make credit heading changes */
$(".orders-wrapper").on("click", function () {
  if ($(this).hasClass("credits")) {
    $(".invoice-heading").css("color", "#ddd");
    $(".credit-heading").css("color", "#414042");
  } else {
    $(".credit-heading").css("color", "#ddd");
    $(".invoice-heading").css("color", "#414042");
  }
});

$(document).ready(function () {
  if ($(".orders-wrapper").hasClass("credits")) {
    $(".invoice-heading").css("color", "#ddd");
    $(".credit-heading").css("color", "#414042");
  } else {
    $(".credit-heading").css("color", "#ddd");
    $(".invoice-heading").css("color", "#414042");
  }
});

function checkOrderDetails() {
  if ($(".ordermessage").length > 0) {
    $(".show-search-error").hide();
    return true;
  }
}
checkOrderDetails();

function getsubstitutionInventory(productcode, codes) {
  var responsedata;
  $.ajax({
    async: false,
    url:
      "/Merchant5/merchant.mvc?Screen=CUDET&ProductAction=substitution&Productcode=" +
      productcode +
      "&substitutioncode=" +
      codes,
    success: function (response) {
      var responsedata = response;
      if (responsedata < 1 || responsedata == "") {
        //console.log(productcode + responsedata);
        setTimeout(function () {
          $(".ProductDetail-" + productcode)
            .find(".viewSubstitutions")
            .hide();
        }, 500);
      } else {
        $(".ProductDetail-" + productcode)
          .find(".viewSubstitutions")
          .show();
      }
    },
  });
  return responsedata;
}

$("body").each(function () {
  var pcode = $(".checksubstituionproducts").val();
  var scode = $(".checksubstituionproductcode").val();
  getsubstitutionInventory(pcode, scode);
});