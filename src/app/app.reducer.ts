export interface State {
  isLoading: boolean;
}


const initialState: State = {
  isLoading: false
};

//javascript function - returns an object of type State
export function appReducer(state = initialState, action): State {
  switch (action.type) {    //actions must have a type property
    case 'START_LOADING':
      return {
        isLoading: true
      };
    case 'STOP_LOADING':
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
