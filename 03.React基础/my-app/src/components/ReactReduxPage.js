import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReactReduxPage extends Component {

  render() {
    const { num, add, minus } = this.props;
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{num}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}
const mapStareToProps = state => {
  return {
    num: state
  }
}
const mapDispatchToProps = {
  add: () => ({ type: 'ADD' }),
  minus: () => ({ type: 'MINUS' })
}
export default connect(
  mapStareToProps,
  mapDispatchToProps
)(ReactReduxPage);