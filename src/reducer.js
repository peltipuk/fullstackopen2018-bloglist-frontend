const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  const newState = { ...state }
  console.log(action)
  switch (action.type) {
  case 'GOOD':
    newState.good++
    break
  case 'OK':
    newState.ok++
    break
  case 'BAD':
    newState.bad++
    break
  case 'ZERO':
    return { good: 0, ok: 0, bad: 0 }
  default:
    return newState
  }
  return newState
}

export default counterReducer
