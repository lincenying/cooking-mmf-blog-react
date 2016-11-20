import api from 'alias-api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const POST_COMMENT = 'POST_COMMENT'

function receivePosts(config) {
    return {
        type: RECEIVE_POSTS,
        ...config
    }
}

export function fetchPosts(config) {
    return dispatch => {
        return api.get('frontend/topics', config).then(json => dispatch(receivePosts({posts: json.data, ...config})))
    }
}

function receiveArticle(config) {
    return {
        type: RECEIVE_ARTICLE,
        ...config
    }
}

export function fetchArticle(config) {
    return dispatch => {
        return api.get('frontend/article', config).then(json => dispatch(receiveArticle({json, ...config})))
    }
}

function receiveComment(config) {
    return {
        type: RECEIVE_COMMENT,
        ...config
    }
}

export function fetchComment(config) {
    return dispatch => {
        return api.get('frontend/comment/list', config).then(json => dispatch(receiveComment({
            json,
            ...config
        })))
    }
}

export function postComment(data) {
    return {
        type: POST_COMMENT,
        data
    }
}
