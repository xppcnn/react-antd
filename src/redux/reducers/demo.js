import { INCREMENT, INCREMENTASYNC } from '../actions/demoType'

const demoReducer = (state = { counter: 0 }, action) => {
  switch(action.type) {
    case INCREMENT: 
     return { counter: state.counter + 1 };
    default:
      return state
  }
};


export default demoReducer