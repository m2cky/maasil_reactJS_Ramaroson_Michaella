import axios from 'axios';
const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = "607d319c8b34c8aa34567a8f"

class PostRepository {
    constructor(){
    }
    getPostCommentsById(id){
        //https://dummyapi.io/data/api/post/UWdcOFTc7DfzOhI6LpI4/comment?page=0&limit=2
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/post/${id}/comment?page=0&limit=2`, { headers: { 'app-id': APP_ID } })
            .then(response =>{
                resolve(response.data.data);
            })
            .catch(console.error)
        });
    }
}

export default PostRepository;