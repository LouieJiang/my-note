import React, { Component } from 'react';
import store from '../store/ReduxStore';

export default class ReduxPage extends Component {
  componentDidMount(){
    console.log("componentDidCatch");
    store.subscribe(()=>{
      console.log('subscribe')
      this.forceUpdate()
      this.setState({});
    })
  }
  add = () =>{
    store.dispatch({type:'ADD'})
  }
  minus = () =>{
    store.dispatch({type:'MINUS'})
  }
  render(){
    return(
      <div>
        <div>ReduxPage</div>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    )
  }
}