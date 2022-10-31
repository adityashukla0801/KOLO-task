/* eslint-disable no-unused-expressions */

import { API_CALL, ONSEARCH_INPUT,SEARCH_API_CALL_SUCCESS, SEARCH_API_CALL_FAILURE, CHANGE_PAGE, searchApiCall } from "./action";

const initialState = {
  characters: [],
  limit: 30,
  offset: 0,
  searchedValue: "",
  loading: false,
  totalCount: 0,
  activePage: 1
}

export const reducer = (state=initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case API_CALL:
      return {
        ...state,
        loading: true,
      }
    case ONSEARCH_INPUT:
      searchApiCall(payload)
      return {
        ...state,
        searchedValue: payload,
      }

    case SEARCH_API_CALL_SUCCESS:  
    return {
      ...state,
      loading: false,
      characters: payload.results,
      totalCount: payload.total
    }

    case SEARCH_API_CALL_FAILURE:  
    return {
      ...state,
      loading: false,
    }

    case CHANGE_PAGE:
      const newOffset = (payload - 1) * state.limit
      debugger
      return {
        ...state,
        offset: newOffset,
      }

    default:
      return state;
  }
}