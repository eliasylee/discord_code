import React from 'react';
import TabStore from '../../stores/tab_store';
import { createTab,
         destroyTab,
         updateTab } from '../../actions/tab_actions';
import TabModalItem from './tab_modal_item';

class TabModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: null,
      tabs: {},
      input: ""
    };
    this.handleDestroyTab = this.handleDestroyTab.bind(this);
    this.handleCreateTab = this.handleCreateTab.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  componentDidMount() {
    this.handleChangeTab();
    TabStore.addChangeListener(this.handleChangeTab);
  }

  componentWillUnmount() {
    if (this.state.tab) {
      updateTab({ id: this.state.tab, body: this.state.input });
    }
    TabStore.removeChangeListener(this.handleChangeTab);
  }

  handleChangeTab() {
    let tabState = TabStore.getState();
    let newState = {
      tab: tabState.tab,
      tabs: tabState.tabs,
      input: tabState.tabs[tabState.tab]
    };
    this.setState(newState);
  }

  handleCreateTab() {
    createTab();
  }

  handleDestroyTab() {
    destroyTab(this.state.tab);
  }

  handleInput() {
    return e => { this.setState({ input: e.currentTarget.value }); };
  }

  renderTabIndex() {
    let keys = Object.keys(this.state.tabs);
    let viewedTab = this.state.tab;
    return (
      <div className="tabIndex">
        {keys.map( key => {
          if (parseInt(key) === viewedTab) {
            return <div className="viewedSingleTab"
                        key={key}>{key}</div>;
          } else {
            return <TabModalItem id={key}
                                 tab={this.state.tab}
                                 input={this.state.input}
                                 key={key} />;
          }
        })}
        <div className="createTab"
             onClick={this.handleCreateTab}>Create</div>
      </div>
    );
  }

  renderTabView() {
    if (this.state.tab) {
      return (
        <div className="tabView">
          <div className="tabViewBody">
            <textarea className="textArea"
                      onChange={this.handleInput()}
                      value={this.state.input}></textarea>
          </div>
          <div className="destroyTabButton"
               onClick={this.handleDestroyTab}>Destroy Tab</div>
        </div>
      );
    } else {
      return <div className="tabViewBody">Nothing here!</div>;
    }
  }

  render() {
    return (
      <div className="tabModal">
        <div className="modalTop">
          {this.renderTabIndex()}
          {this.renderTabView()}
        </div>
        <div className="closeModalButton"
             onClick={this.props.toggleView}>Close Modal</div>
      </div>
    );
  }
}

export default TabModal;
