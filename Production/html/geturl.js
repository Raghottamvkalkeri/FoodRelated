const url = "https://devfr.foodrelated.com/Merchant5/merchant.mvc?Screen=mcajax&mobileAction=updateOrderData&Order_ID=1233&session_id=22223&ship_module=mvsoapfedex&ship_code=fedex_ground&ship_price=32.00&delivery_date=March 21, 11:00 - 11:30 AM&curbsy_date=March 21 : 11:00 - 11:30 AM&curbsy_data={\"day\":\"2025-03-21T06:00:00.000Z\",\"slot\":10,\"activeDay\":0,\"date_display\":\"March 21\",\"time_display\":\"11:00 - 11:30 AM\",\"method\":\"Will Call\",\"isExpress\":true,\"ts\":\"2025-03-21T06:00:00.000Z\",\"url\":\"https://immense-bayou-77802.herokuapp.com/reserve/FoodRelatedCurbside/1669183200/13/\",\"tempid\":\"temp:1742457847\"}&Formatted_deliverydate=03/21/2025";

const urlParams = new URLSearchParams(url);

// Iterate over the parameters
for (const [key, value] of urlParams) {
    console.log(`${key}: ${value}`);
}