import iState from 'reducers/data';

import PostService from './post.service';

export default function postReducer(state = iState, action) {
    let fstate=state;
    switch (action.type) {
        case 'LIST_POSTS':
            return action.payload;
        default:
            return fstate;          
    }
}

export function getComments(idPost) {
    let postService=new PostService();
    return async function getCommentsAsync(dispatch, getState) {
        await postService.getComments(idPost).then((comments)=>{
            let istate={}
            istate.comments=comments
            let fstate={};
            fstate= Object.assign({}, getState().postReducer, istate)
            dispatch({ type: 'LIST_POSTS', payload: fstate })
        })
    }
}
