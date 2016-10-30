import React from 'react';
import TabModal from './tabs/tab_modal';
import TabStore from '../stores/tab_store';

class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      view: false,
      count: 0
    };
    this.renderModal = this.renderModal.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.handleTabCount = this.handleTabCount.bind(this);
  }

  componentDidMount() {
    TabStore.addChangeListener(this.handleTabCount);
  }

  componentWillUnmount() {
    TabStore.removeChangeListener(this.handleTabCount);
  }

  handleTabCount() {
    let tabState = TabStore.getState();
    let newCount = Object.keys(tabState.tabs).length;
    this.setState({ count: newCount });
  }

  toggleView() {
    let nextView = !this.state.view;
    this.setState({ view: nextView });
  }

  renderButton() {
    if (!this.state.view) {
      return (
        <div className="openButton"
             onClick={this.toggleView}>Open ({this.state.count})</div>
      );
    }
  }

  renderModal() {
    if (this.state.view) {
      return (
        <TabModal toggleView={this.toggleView}/>
      );
    }
  }

  render() {
    return (
      <div className="splashPage">
        {this.renderButton()}
        {this.renderModal()}
      </div>
    );
  }
}

export default Root;
