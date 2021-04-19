import PostRepository from './post.repository';

class PostService {
    constructor(){
    }
    
    async getComments(idPost){
        return new Promise((resolve, reject)=>{
            let postRepository=new PostRepository()
            postRepository.getPostCommentsById(idPost).then( async (posts)=>{
                resolve(posts);
            })
        })
    }
}

export default PostService;