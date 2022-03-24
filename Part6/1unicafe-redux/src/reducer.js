const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodSt = {
        ...state,
        good: state.good + 1
      }
      return goodSt
    case 'OK':
      const okSt = {
        ...state,
        ok: state.ok + 1
      }
      return okSt
    case 'BAD':
      const badSt = {
        ...state,
        bad: state.bad + 1
      }
      return badSt
    case 'ZERO':
      return initialState
    default: 
      return state
  }
  
}

export default counterReducer