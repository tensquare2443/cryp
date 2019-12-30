import { SET_LOADERS } from "actions/types";

export default function(
  state = { graph: false, nav: false, sidebar: false },
  action
) {
  switch (action.type) {
    case SET_LOADERS:
      let allLoaders = JSON.parse(JSON.stringify(action.payload[0]));
      let loadersToChange = action.payload[1];

      Object.keys(loadersToChange).forEach(loaderToChange => {
        allLoaders[loaderToChange] = loadersToChange[loaderToChange];
      });

      return allLoaders;
    default:
      return state;
  }
}
