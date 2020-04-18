const initialState = {
  ofPackageManagerCliVersion: {
    major: -1,
    minor: -1,
    patch: -1,
  },
};

const types = {
  SETOFPACKAGEMANAGERCLIVERSION: "SETOFPACKAGEMANAGERCLIVERSION",
};

export default (state = initialState, action) => {
  switch (action.type) {
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
