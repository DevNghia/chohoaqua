import { constants as c } from "../constants";

function setTextSearch(query) {
    return (dispatch) => {
        dispatch({ type: c.UPDATE_SEARCH_TEXT, query });
    };
}
export const searchActions = {
    setTextSearch
};
