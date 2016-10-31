import EventEmitter from 'eventemitter3';
import Dispatcher from '../dispatcher/dispatcher';
import { TabConstants } from '../actions/tab_actions';

const CHANGE_EVENT = 'change';
const DEFAULT_STORAGE = {
  tab: null,
  tabs: {}
};

let storage = JSON.parse(localStorage.getItem('tabStore'));
if (!storage.tabs) {
  storage = DEFAULT_STORAGE;
}

class TabStore extends EventEmitter {
  getState() {
    return storage;
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
    localStorage.setItem('tabStore', JSON.stringify(storage));
  }
}

const tabStore = new TabStore();

tabStore.dispatchToken = Dispatcher.register(action => {
  switch (action.type) {
    case TabConstants.CREATE_TAB:
      let keys = Object.keys(storage.tabs);
      let lastKey = parseInt(keys[keys.length - 1]);
      let newKey = lastKey + 1;
      storage.tab = newKey;
      storage.tabs[newKey] = "";
      tabStore.saveState();
      tabStore.emitChange();
      break;
    case TabConstants.DESTROY_TAB:
      storage.tab = null;
      delete storage.tabs[action.tab];
      tabStore.saveState();
      tabStore.emitChange();
      break;
    case TabConstants.VIEW_TAB:
      storage.tab = action.tab;
      tabStore.saveState();
      tabStore.emitChange();
      break;
    case TabConstants.UPDATE_TAB:
      if (action.id) {
        const { id, body } = action.tab;
        storage.tabs[id] = body;
        tabStore.saveState();
      }
      break;
    default:
      break;
  }
});

export default tabStore;
