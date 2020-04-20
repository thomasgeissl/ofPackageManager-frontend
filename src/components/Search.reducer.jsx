const initialState = {
  query: "",
  result: [],
  databaseResult: [],
  urlResult: [],
  destination: "local",
};
export default (state, action) => {
  switch (action.type) {
    case "RESET":
      return {
        ...initialState,
        ...state.query,
      };
    case "SETQUERY":
      return { ...state, query: action.payload.value };
    case "SETRESULT":
      return { ...state, result: action.payload.value };
    case "SETDATABASERESULT":
      return { ...state, databaseResult: action.payload.value };
    case "SETURLRESULT":
      return { ...state, urlResult: action.payload.value };
    case "SETDATABASECHECKOUT":
      let { databaseResult } = state;
      databaseResult[action.payload.index].checkout = action.payload.value;
      return { ...state, databaseResult };
    case "SETULRCHECKOUT":
      let { urlResult } = state;
      urlResult[action.payload.index].checkout = action.payload.value;
      return { ...state, urlResult };
    case "SETCHECKOUT": {
      let { result } = state;
      result[action.payload.index].checkout = action.payload.value;
      return { ...state, result };
    }
    case "SETDESTINATION": {
      let { result } = state;
      result[action.payload.index].destination = action.payload.value;
      return { ...state, result };
    }
    default:
      return state;
    // throw new Error();
  }
};
export { initialState };
