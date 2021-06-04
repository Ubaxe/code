
// change this when you integrate with the real API, or when u start using the dev server
const API_URL = 'http://127.0.0.1:5000'
/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */
const getJSON = (path, options) => 
    fetch(path, options)
        .then(res => res.json()) 
        .catch(err => console.warn(`API_ERROR: ${err.message}`));

/**
 * This is a sample class API which you may base your code on.
 * You may use this as a launch pad but do not have to.
 */
export default class API {
    /** @param {String} url */
    constructor() {
        this.url = API_URL;
    } 

    /** @param {String} path */
    makeAPIRequest(path) {
        return `${this.url}/${path}`;
    }

    /**
     * Fetch feeds list
     * @return {Promise<string>} Promise which resolves feeds list
     */
    getFeed() {
        let requestURL = this.makeAPIRequest("user/feed");
        const feed = fetch(requestURL, {
            method: 'GET'
            ,headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+ localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return feed
    }

    /**
     * Fetch a feed by postID
     * @param   {String}        postId 
     * @return {Promise<string>} Promise which resolves a feed
     */
    getPost(postId) {
        let requestURL = this.makeAPIRequest("post/"+"?id="+postId);
        const Post = fetch(requestURL, {
            method: 'GET'
            ,headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+ localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return Post
    }
    /**
     * Fetch a user by user ID
     * @param   {String}        userID      
     * @return {Promise<string>} Promise which resolves a user data
     */
    getUserNamebyId(userID) {
        let requestURL;
        if (userID != "") {
            requestURL = this.makeAPIRequest("user/"+"?id="+userID);
        } else {
            requestURL = this.makeAPIRequest("user/");
        }
        const User = fetch(requestURL, {
            method: 'GET'
            ,headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+ localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return User
    }
     /**
     * Fetch a user by user ID
     * @param   {String}        username      
     * @return {Promise<string>} Promise which resolves a user data
     */
    getUserProfile(username) {
        let requestURL;
        if (username != "") {
            requestURL = this.makeAPIRequest("user/"+"?username="+username);
        } else {
            requestURL = this.makeAPIRequest("user/");
        }
        const User = fetch(requestURL, {
            method: 'GET'
            ,headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+ localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return User
    }
    /**
    // deal with two kinds of requests: like and unlike 
    // depends on path
     * @param {String}          postId: Post id
     * @param {String}          path: The url to make the reques to.
     * @return {Promise<string>} Promise which resolves like post reuqest
     */
    LikePostRequest(postId,path) {
        let requestURL = this.makeAPIRequest(path+"?id="+postId);
        const request = fetch(requestURL, {
            method: 'PUT'
            ,headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+ localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })   
        return request
    }
    /**
    // deal with two kinds of requests: follow or unfollow
    // depends on path
     * @param {String}          userName: UserName
     * @param {String}          path: The url to make the reques to.
     * @return {Promise<string>} Promise which resolves follow request
     */
    FollowUserRequest(userName,path) {
        let requestURL = this.makeAPIRequest(path+"?username="+userName);
        const request = fetch(requestURL, {
            method: 'PUT'
            ,headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+ localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return request
    }

    /**
    // Given postId and comments to leave the comment in post
     * @param {String}          postId: post id
     * @param {String}          comment: comment text
     * @return {Promise<string>} Promise which resolves write comment request
     */
    LeaveComment(postId,comment) {
        let requestURL = this.makeAPIRequest("post/comment"+"?id="+postId);
        const request = fetch(requestURL, {
            method: 'PUT',
            body: JSON.stringify({
                comment : comment,
            })
            ,headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+ localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })   
        return request
    }
   /**
    // Given postId, delete the post
     * @param {String}          postId: post id
     * @return {Promise<string>} Promise which resolves delete post request
    */
    DeletePost(postId) {
        let requestURL = this.makeAPIRequest("post/?id="+postId);
        const request = fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+ localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return request
    }
   /**
    // Given postId, update the post
     * @param {String}          postId: post id
     * @param {String}          desText: update post description
     * @return {Promise<string>} Promise which resolves update post request
    */
    UpdatePost(postId,desText) {
        let Json = {}
        Json['description_text'] = desText
        let requestURL = this.makeAPIRequest("post/?id="+postId);
        const request = fetch(requestURL, {
            method: 'PUT',
            body: JSON.stringify(Json),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Token "+ localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return request
    }
   /**
    // Given type and updateValue, update user's basic information
     * @param {String}          type: what's type info (password,name,email)
     * @param {String}          desText: update value string
     * @return {Promise<string>} Promise which resolves update owner information
    */
    UpdateUserInfo(type,updateValue) {
        let requestURL = this.makeAPIRequest("user/");
        if (updateValue == "") {
            alert("Input can't empty")
        } else {
            let Json = {}
            Json[type] = updateValue
            const request = fetch(requestURL, {
                method: 'PUT',
                body: JSON.stringify(Json)
                ,headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Token "+ localStorage.getItem('token'),
                }
            }).then(res  => {
                return res.json();
            }).then (data => {
                return data;
            }).catch(e => {
                alert(e)
            })  
            return request
        }
    }   
}

