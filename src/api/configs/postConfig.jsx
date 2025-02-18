const SEE_POST = 'api/posts/'
const CREATE_POST = 'api/posts/create/'
const UPDATE_POST = 'api/posts/update/<int:pk>/'
const DELETE_POST = 'api/posts/delete/<int:pk>/'
const SEE_USER_POSTS = 'api/posts/user/'
const SEE_POST_BY_ID ='api/posts/<int:id>/'
export{
    SEE_POST,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    SEE_USER_POSTS,
    SEE_POST_BY_ID
}