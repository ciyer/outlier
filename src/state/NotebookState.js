const ActionType = {
  CONTENT_REQUEST: 'NotebookState.CONTENT_REQUEST',
  CONTENT_RETURN: 'NotebookState.CONTENT_RETURN'
};


function request(source) {
  const action = {type: ActionType.CONTENT_REQUEST, source};
  return action
}

function receive(result, source) {
  return {type: ActionType.CONTENT_RETURN, payload: {[source]: result}}
}

const NotebookState = {
  retrieve: (source) => {
    return (dispatch) => {
      dispatch(request(source));
      return fetch(source)
        .then(r => r.json())
        .then(d => dispatch(receive(d, source)))
    }
  },
  reduce: (state, action) => {
    if (state == null) return {}
    // Take result and set it to the state
    if (action.type !==  ActionType.CONTENT_RETURN)
      return state
    return {...state, ...action.payload}
  }


};

export default NotebookState
