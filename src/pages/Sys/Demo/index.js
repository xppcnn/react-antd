import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { INCREMENTASYNC } from '@redux/actions/demoType'

@connect(state=> ({demo: state.demo}))
class Demo extends Component {
  
  
  render() {
    const  { counter } = this.props.demo
    return (
      <div>
        {counter}
        <Button type='primary' onClick={() => this.props.dispatch({type: INCREMENTASYNC})}>+</Button>
      </div>
    )
  }
}

export default Demo