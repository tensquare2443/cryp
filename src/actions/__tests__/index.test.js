import {
  getCurrencies,
  getCurrencyData,
  changeColor
} from 'actions';
import {
  GET_CURRENCIES,
  GET_CURRENCY_DATA,
  CHANGE_COLOR
} from 'actions/types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('changeColor', () => {
  const action = changeColor('Blue');

  it('should return the correct action type', () => {
    expect(action.type).toEqual(CHANGE_COLOR);
  });
  it('should return the correct payload', () => {
    expect(action.payload).toEqual(['rgb(86,93,236)','rgb(73, 77, 171)']);
  });
});

describe('getCurrencyData', () => {
  it('should return the correct action type', () => {
    const action = getCurrencyData();

    expect(action.type).toEqual(GET_CURRENCY_DATA);
  });
  it('should return the correct payload data', () => {
    const mock = new MockAdapter(axios);
    const data = {
      id: 'BTC',
      price_usd: 378.23
    };
    mock.onGet('http://coincap.io/page/BTC').reply(200, data);

    getCurrencyData('BTC').payload.then((response) => {
      expect(response.data.id).toEqual('BTC');
      expect(response.data).toEqual(data);
    });
  });
});

describe('getCurrencies', () => {
  it('should return correct action type', () => {
    const action = getCurrencies();

    expect(action.type).toEqual(GET_CURRENCIES);
  });
  it('should return correct payload data', () => {
    const mock = new MockAdapter(axios);
    const data = [
      {name: 'BTC', symbol: 'Bitcoin'},
      {name: 'LTC', symbol: 'Litecoin'},
      {name: 'GTC', symbol: 'Greencoin'}
    ];
    mock.onGet('http://coincap.io/map').reply(200, data);

    getCurrencies().payload.then((response) => {
      expect(response.data).toEqual(data);
    });
  });
});
