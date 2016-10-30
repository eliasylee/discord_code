import React from 'react';
import { updateTab,
         viewTab } from '../../actions/tab_actions';

class TabModalItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleViewTab = this.handleViewTab.bind(this);
  }

  handleViewTab() {
    updateTab({ id: this.props.tab, body: this.props.input });
    viewTab(parseInt(this.props.id));
  }

  render() {
    return (
      <div className="singleTab"
           onClick={this.handleViewTab}>
           {this.props.id}
      </div>
    );
  }
}

export default TabModalItem;
