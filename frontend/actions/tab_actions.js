import Dispatcher from '../dispatcher/dispatcher';

export const TabConstants = {
  VIEW_TAB: "VIEW_TAB",
  CREATE_TAB: "CREATE_TAB",
  DESTROY_TAB: "DESTROY_TAB",
  UPDATE_TAB: "UPDATE_TAB"
};

export const viewTab = tab => {
  Dispatcher.dispatch({
    type: TabConstants.VIEW_TAB,
    tab
  });
};

export const createTab = () => {
  Dispatcher.dispatch({
    type: TabConstants.CREATE_TAB
  });
};

export const destroyTab = tab => {
  Dispatcher.dispatch({
    type: TabConstants.DESTROY_TAB,
    tab
  });
};

export const updateTab = tab => {
  Dispatcher.dispatch({
    type: TabConstants.UPDATE_TAB,
    tab
  });
};
