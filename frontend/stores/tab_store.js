import EventEmitter from 'eventemitter3';
import Dispatcher from '../dispatcher/dispatcher';
import { TabConstants } from '../actions/tab_actions';

const CHANGE_EVENT = 'change';
const DEFAULT_STORAGE = {
  tab: null,
  tabs: {}
};

class TabStore extends EventEmitter {
  constructor(storage = DEFAULT_STORAGE) {
    super();
    this.state = {
      tab: storage.tab,
      tabs: storage.tabs
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

  saveState() {
    const { tab, tabs } = this.state;
    let storage = {
      tab,
      tabs
    };
    localStorage.setItem('tabStore', JSON.stringify(storage));
  }
}

let tabStore;
let storage = JSON.parse(localStorage.getItem('tabStore'));

if (storage.tab) {
  tabStore = new TabStore(storage);
} else {
  tabStore = new TabStore();
}

tabStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {
    case TabConstants.VIEW_TAB:
      tabStore.state.tab = parseInt(action.tab);
      tabStore.saveState();
      tabStore.emitChange();
      break;
    case TabConstants.CREATE_TAB:
      let keys = Object.keys(tabStore.state.tabs);
      let lastKey = keys[0] ? keys[keys.length - 1] : 0;
      let newKey = parseInt(lastKey) + 1;
      tabStore.state.tab = newKey;
      tabStore.state.tabs[newKey] = "";
      tabStore.saveState();
      tabStore.emitChange();
      break;
    case TabConstants.DESTROY_TAB:
      delete tabStore.state.tabs[action.tab];
      tabStore.state.tab = null;
      tabStore.saveState();
      tabStore.emitChange();
      break;
    case TabConstants.UPDATE_TAB:
      if (action.tab.id) {
        let updateTab = action.tab;
        tabStore.state.tabs[updateTab.id] = updateTab.body;
        tabStore.saveState();
      }
      break;
    default:
      break;
  }
});

export default tabStore;
