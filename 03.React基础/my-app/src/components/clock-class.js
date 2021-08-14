import React, { Component } from 'react';

class ClockClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000);
  }
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  // componentWillUpdate(nextProps, nextState) {
  //   clearInterval(this.timerID)
  // } // TODO componentWillUpdate 被弃用
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  render() {
    return (
      <div>
        <h3>ClockClass</h3>
        {this.state.date.toLocaleTimeString()}
      </div>
    );
  }
}

export default ClockClass;

