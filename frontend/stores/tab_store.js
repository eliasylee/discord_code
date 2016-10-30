import EventEmitter from 'eventemitter3';
import Dispatcher from '../dispatcher/dispatcher';
import { TabConstants } from '../actions/tab_actions';

const CHANGE_EVENT = 'change';

class TabStore extends EventEmitter {
  constructor() {
    super();
    this.state = {
      tab: null,
      tabs: {}
    };
  }

  getState() {
    return this.state;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const tabStore = new TabStore();

tabStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {
    case TabConstants.VIEW_TAB:
      tabStore.state.tab = parseInt(action.tab);
      tabStore.emitChange();
      break;
    case TabConstants.CREATE_TAB:
      let keys = Object.keys(tabStore.state.tabs);
      let lastKey = keys[0] ? keys[keys.length - 1] : 0;
      let newKey = parseInt(lastKey) + 1;
      tabStore.state.tab = newKey;
      tabStore.state.tabs[newKey] = "";
      tabStore.emitChange();
      break;
    case TabConstants.DESTROY_TAB:
      delete tabStore.state.tabs[action.tab];
      tabStore.state.tab = null;
      tabStore.emitChange();
      break;
    case TabConstants.UPDATE_TAB:
      let updateTab = action.tab;
      tabStore.state.tabs[updateTab.id] = updateTab.body;
      break;
    default:
      break;
  }
});

export default tabStore;
