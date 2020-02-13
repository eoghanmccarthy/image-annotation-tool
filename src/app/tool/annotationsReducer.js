export default (state, action) => {
  switch (action.type) {
    case "load":
      return action.data;
    case "add":
      if (typeof action.data.annotationId !== "undefined") {
        const s = Object.assign({}, state);
        s[action.data.annotationId] = action.data;
        return s;
      }
      return state;
    case "update":
      if (state[action.id]) {
        const s = Object.assign({}, state);
        let u = s[action.id];
        s[action.id] = {
          ...u,
          ...action.data,
          tags: []
        };
        return s;
      }
      return state;
    case "delete":
      if (state[action.id]) {
        const s = Object.assign({}, state);
        delete s[action.id];
        return s;
      }
      return state;
    case "clear":
      return {};
    default:
      throw new Error();
  }
};
