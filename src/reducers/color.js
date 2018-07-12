import {CHANGE_COLOR} from 'actions/types';

export default function(state = ['rgb(86,93,236)','rgb(73, 77, 171)'], action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return action.payload;
    default:
      return state;
  }
}
