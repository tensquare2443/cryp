import {
  GET_CURRENCIES,
  GET_CURRENCY_DATA,
  GET_CURRENCY_HISTORY,
  CHANGE_CURRENCY,
  CHANGE_DATE_RANGE,
  CHANGE_COLOR,
  FILTER_CURRENCIES,
  UNFILTER_CURRENCIES,
  SET_LOADERS
} from "actions/types";
import axios from "axios";

export function setLoaders(loaderDetails) {
  return {
    type: SET_LOADERS,
    payload: loaderDetails
  };
}

export function getCurrencies() {
  const payload = axios.get("https://api.coincap.io/v2/assets");

  return { type: GET_CURRENCIES, payload };
}

export function getCurrencyData(currency) {
  const payload = axios.get(`https://api.coincap.io/v2/assets/${currency}`);

  return { type: GET_CURRENCY_DATA, payload };
}

export function getCurrencyHistory(history, currency, time) {
  return { type: GET_CURRENCY_HISTORY, payload: { history, time } };
}

export function changeCurrency(newCurrency) {
  return {
    type: CHANGE_CURRENCY,
    payload: newCurrency
  };
}

export function changeDateRange(newDateRange) {
  return {
    type: CHANGE_DATE_RANGE,
    payload: newDateRange
  };
}

export function changeColor(newColor) {
  var colors = {
    Blue: ["rgb(86,93,236)", "rgb(73, 77, 171)"],
    Green: ["rgb(96,190,98)", "rgb(75,169,76)"],
    Red: ["rgb(169, 62, 62)", "rgb(147,43,43)"],
    Gold: ["rgb(188,177,84)", "rgb(165,155,72)"],
    Teal: ["rgb(139,192,186)", "rgb(107,169,162)"],
    Purple: ["rgb(179,113,175)", "rgb(153,86,149)"]
  };

  return {
    type: CHANGE_COLOR,
    payload: colors[newColor]
  };
}

export function filterCurrencies(currencies, filter) {
  return {
    type: FILTER_CURRENCIES,
    payload: { currencies, filter }
  };
}
export function unfilterCurrencies() {
  return { type: UNFILTER_CURRENCIES };
}
