export const POST_UPDATE = 'POST_ACTION';

export const postUpdate = (payload) => {
    return {type: POST_UPDATE, payload};
};