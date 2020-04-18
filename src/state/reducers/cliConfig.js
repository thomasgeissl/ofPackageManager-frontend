const initialState = {
  ofPath: "",
  ofPackagesPath: "",
};

const types = {
  SETCLICONFIG: "SETCLICONFIG",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SETCLICONFIG:
      const newState = {
        ...state,
        ...action.payload.value,
      };
      return newState;
    default:
      return state;
  }
};

export const setCliConfig = (value) => {
  return {
    type: types.SETCLICONFIG,
    payload: {
      value,
    },
  };
};
