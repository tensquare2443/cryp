export default price => {
  price = price.toString();

  if (price.includes(".")) {
    var priceDigits = price.split(".")[0];
    var priceDecimals = price.split(".")[1];
  } else {
    priceDigits = price;
    priceDecimals = false;
  }

  if (priceDigits.length > 3) {
    priceDigits = priceDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (priceDecimals) {
    if (priceDecimals.length > 5) {
      priceDecimals = priceDecimals.substr(0, 5);
    }

    return `$${priceDigits}.${priceDecimals}`;
  } else {
    return `$${priceDigits}`;
  }
};
