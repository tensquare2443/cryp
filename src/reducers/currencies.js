import { GET_CURRENCIES } from "actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case GET_CURRENCIES:
      let formattedCurrencies = action.payload.data.data
        .map(currency => {
          return {
            name: currency.name,
            symbol: currency.symbol,
            id: currency.id
          };
        })
        .sort((currency1, currency2) => {
          let currency1Name = currency1.name[0].toUpperCase();
          let currency2Name = currency2.name[0].toUpperCase();

          if (currency1Name < currency2Name) {
            return -1;
          } else return 1;
        });

      return formattedCurrencies;
    default:
      return state;
  }
}
