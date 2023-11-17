import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    FETCH_BY_SEARCH,
} from "../constants/actionTypes.js";

export default (state = { posts: [] }, action) => {
    switch (action.type) {
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            };

        case UPDATE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };

        case FETCH_ALL:
            // action.payload is {data: Array(2), numberOfPages: 1}
            // there is 2 data
            return {
                ...state,
                posts: action.payload.data,
                numberOfPages: action.payload.numberOfPages,
            };

        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };

        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };

        default:
            return state;
    }
};
