import {GET_CURRENCY_HISTORY} from 'actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case GET_CURRENCY_HISTORY:
    const months = {
      Jan: '1',
      Feb: '2',
      Mar: '3',
      Apr: '4',
      May: '5',
      Jun: '6',
      Jul: '7',
      Aug: '8',
      Sep: '9',
      Oct: '10',
      Nov: '11',
      Dec: '12'
    };
    var days = (day) => {
      if (day[0] === '0') {
        return day[1];
      } else return day;
    }
    var dateRange = action.payload.time.replace('day', '')/1;
    var prices = action.payload.history.map((date) => {
      var dateArr = new Date(date[0]).toString().split(' ');

      return {
        date: `${months[dateArr[1]]}/${days(dateArr[2])}/${dateArr[3][2].concat(dateArr[3][3])}`,
        price: date[1]
      };
    });
    var pricesFiltered = [];

    for (var i = prices.length - 1; i >= 0; i--) {
      var day = prices[i].date;

      if (pricesFiltered.length === 0) {
        pricesFiltered.push(prices[i]);
      } else if (pricesFiltered[0].date !== day) {
        pricesFiltered.unshift(prices[i]);
      }
    }
    if (pricesFiltered.length > dateRange) {
      while (pricesFiltered.length > dateRange) {
        pricesFiltered.shift();
      }
    }

    return pricesFiltered;
    default:
    return state;
  }
}
