const initialState = {
  foundCliConfig: false,
  ofPackageManagerCliVersion: {
    major: -1,
    minor: -1,
    patch: -1,
  },
};

const types = {
  SETFOUNDCLICONFIG: "SETFOUNDCLICONFIG",
  SETOFPACKAGEMANAGERCLIVERSION: "SETOFPACKAGEMANAGERCLIVERSION",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SETFOUNDCLICONFIG:
      return {
        ...state,
        foundCliConfig: action.payload.value,
      };
    case types.SETOFPACKAGEMANAGERCLIVERSION:
      return {
        ...state,
        ofPackageManagerCliVersion: action.payload.value,
      };
    default:
      return state;
  }
};

export const setOfPackageManagerCliVersion = (value) => {
  return {
    type: types.SETOFPACKAGEMANAGERCLIVERSION,
    payload: {
      value,
    },
  };
};
export const setFoundCliConfig = (value) => {
  return {
    type: types.SETFOUNDCLICONFIG,
    payload: {
      value,
    },
  };
};
