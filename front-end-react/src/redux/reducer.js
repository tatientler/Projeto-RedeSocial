import { POST_UPDATE } from "./action";

const initialState = false

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_UPDATE:
            return action.payload;
        default:
            return state;
    }
};