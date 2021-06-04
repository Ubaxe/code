
// importing named exports we use brackets

// when importing 'default' exports, use below syntax
import API from './api.js';
import {createElement,AppendChildById,AppendAllChild,checkStore,fileToDataUrl,VaildFile
} from './helpers.js';
import {LoginPage} from './login.js';

var api  = new API();
/* Global Variable */
var ProileClosed = true;
var UpdatePsClosed = true;
var UpdateEdClosed = true;
var UpdateNameClosed = true;
var addPostClosed = true;
var viewCommentClosed = true; // comment section 
var viewLikeClosed = true; // like section
var profileClosed = true;
var Timers = {};
/*------------------*/


/* Challenge Components */ 
/* 2.6.1. Live Update       completed
/* 2.7.3 Fragment based URL routing completed
/* */

/*
    Notice:
    Open a new section, the old section must close.
*/
if (localStorage.length == 0) {
    LoginPage();
} else if (localStorage.getItem("token") != "") {
    var patt =new RegExp("#profile=");
    if (window.location.hash == "#profile=me") {
        showProfile("")
        NavItem();
    } else if (patt.test(window.location.hash)) {
        var profileName = window.location.hash.split('=')[1]
        showProfile(profileName)
        NavItem();
    } else if (window.location.hash == "#feed") {
        showFeed(0);
        NavItem();
    } else {
        showFeed(0);
        NavItem();
    }
} 

/**
 * Given a post position, default 0 (the newest feed)
 * Show recent feeds
 * @param   {Integet}        postPosition 
 */
function showFeed (postPosition) {
    var feed;
    api.getFeed().then(res => {
        if (res['posts'].length == 0) {
            var nofeeds = createElement("div","",{class:"Nofeeds"})
            var mesg = createElement("h1","Not yet implemented",{class:"Nofeedsmesg"})
            AppendAllChild(nofeeds,[mesg]);
            AppendChildById("main",nofeeds);
        } else {
            feed = res['posts'][postPosition];
            var FeedPart = createElement('div',"",{class:"FeedPart",id:feed['id']});
            var FeedAuthor = createElement('div',"",{class:"FeedAuthor"});
            var Author = createElement('a',feed['meta'].author,{class:"Author"});
            Author.onclick = function () {
                if (checkAllSection()){
                    showProfile(feed['meta'].author);
                    profileClosed = false;
                }
            }
            var time = new Date();
            time.setTime(feed['meta'].published);
            time = convertDate(time);
            var UnfollowButton = createElement('button',"Unfollow",{class:"UnfollowButton",id:"UnfollowButton"});
            var FeedWhenMade = createElement('div',"",{class:"FeedWhenMade"});
            var WhenMade = createElement('div',time,{class:"WhenMade"});
            AppendAllChild(FeedWhenMade,[WhenMade]);
            AppendAllChild(FeedAuthor,[Author,UnfollowButton]);
            var FeedImgC = createElement('div',"",{class:"FeedImgContainer"});
            var FeedImg = createElement('img',"",{class:"FeedImg",src:"data:image/png;base64, "+feed['src'],alt:feed['meta'].description_text});
            AppendAllChild(FeedImgC,[FeedImg]);
            var container = createElement('div',"",{class:"FeedInfoContainer"});
            var FeedLikeButton = createElement('div',"",{class:"FeedLikeButton"});
            var LikeIcon = createElement('img',"",{src:"Asset/LikeIcon1.png",class:"LikeIcon",alt:"LikeFeed",id:"LikeIcon"})
            isLiked(feed['id'])
            AppendAllChild(FeedLikeButton,[LikeIcon]);
            var FeedLike = createElement('div',"",{class:"FeedLike"});
            var number_like = feed['meta'].likes.length == 0 ? 0 :feed['meta'].likes
            var LikeView = createElement('a',"Like",{class:"LikeView"});
            var NumLike = createElement('span',": "+number_like ,{class:"NumLike"});
            AppendAllChild(FeedLike,[LikeView,NumLike]);
            var FeedDescr = createElement('div',"",{class:"FeedDescr"});
            var Decription = createElement('span',"Decription: "+feed['meta'].description_text,{class:"Decription"});
            AppendAllChild(FeedDescr,[Decription]);
            var FeedLeaveComm = createElement('div',"",{id:"FeedLeaveComm"});
            var PostComm = createElement('form',"",{id:"PostComm"});
            var PostButton = createElement('button',"Post",{id:"PostButton",type:"button",class:"PostButton",disabled:true});
            var CommemtBoxLabel = createElement('label',"",{for:"CommemtBox"});
            var CommemtBox = createElement('textarea',"",{id:"CommemtBox",placeholder:"Leave Comment"});
            AppendAllChild(CommemtBoxLabel,[CommemtBox])
            AppendAllChild(PostComm,[CommemtBoxLabel,PostButton]);
            AppendAllChild(FeedLeaveComm,[PostComm]);
            CommemtBox.onkeyup = function () {
                if (CommemtBox.value == "") {
                    PostButton.disabled = true;
                } else {
                    PostButton.disabled = false;
                }
            }
            LikeIcon.onclick = function() {
                let src1 = document.location['origin'] + "/Asset/LikeIcon1.png"
                let src2 = document.location['origin'] + "/Asset/LikeIcon2.png"
                if (LikeIcon.src == src1) {
                    LikeIcon.src = "Asset/LikeIcon2.png";
                    api.LikePostRequest(feed['id'],"post/like");
                } else if (LikeIcon.src == src2) {
                    LikeIcon.src = "Asset/LikeIcon1.png";
                    api.LikePostRequest(feed['id'],"post/unlike");
                } else {
                    // nothing to do
                }
                Timers['timer_1']= setTimeout(() => {
                    LiveUpdateLike(postPosition)
                    clearInterval(Timers['timer_1'])
                }, 1000);
            }
            PostButton.onclick = function () {
                var postComm = document.getElementById('PostComm');
                var textValue = postComm.elements[0].value
                api.LeaveComment(feed['id'],textValue);
                postComm.elements[0].value = ""
                Timers['timer_2']= setTimeout(() => {
                    LiveUpdateComment(postPosition)
                    clearInterval(Timers['timer_2'])
                }, 1000);
            }
            if (feed['comments'].length == 0) {
                var FeedComm = createElement('div',"",{class:"FeedComm"});
                var NumComment = createElement('span',feed['comments'].length + " Comments",{class:"Comment"});
                AppendAllChild(FeedComm,[NumComment]);
            } else {
                FeedComm = createElement('div',"",{class:"FeedComm"});
                NumComment = createElement('span',feed['comments'].length + " Comments",{class:"Comment"});
                var ViewComment = createElement('a',"View ",{class:"ViewComment"});
                AppendAllChild(FeedComm,[ViewComment,NumComment]);
                ViewComment.onclick = function() {
                    if (checkAllSection()) {
                        showComments(feed['id']);
                        viewCommentClosed = false;
                    }
                }
            }
            AppendAllChild(container,[FeedLikeButton,FeedLike,FeedDescr,FeedComm,FeedWhenMade,FeedLeaveComm])
            AppendAllChild(FeedPart,[FeedAuthor,FeedImgC,container]);
            AppendChildById("main",FeedPart);
            LikeView.onclick = function() {
                if (checkAllSection()) {
                    viewLikeClosed = false
                    showLike(feed['id']);
                }
            }
            createPagination(res['posts'].length,postPosition+1);
            changeFeed(postPosition+1);
            UnfollowButton.onclick = function () {
                var profileName = feed['meta'].author
                api.FollowUserRequest(profileName,"user/unfollow")
                window.location = "/index.html";
            }      
        }
    })
}

/**
 * Given a post position
 * Live Update feeds' like
 * @param   {Integet}        postPosition 
 */
async function LiveUpdateLike(postPosition) {
    const res = await api.getFeed()
    if (res['posts'].length != 0) {
        var id = res['posts'][postPosition]['id']
        if (document.getElementById(id) != null) {
            var likes = res['posts'][postPosition].meta['likes'];
            likes = likes.length == 0 ? 0 : likes
            document.getElementById(id).getElementsByClassName("NumLike")[0].textContent = ": "+likes;
        }
    } 
}

/**
 * Given a post position
 * Live Update feeds' comments
 * @param   {Integet}        postPosition 
 */
async function LiveUpdateComment(postPosition) {
    const res = await api.getFeed()
    if (res['posts'].length != 0) {
        var id = res['posts'][postPosition]['id']
        if (document.getElementById(id) != null) {
            var comments = res['posts'][postPosition]['comments'];
            comments = comments.length == 0 ? "0" : comments.length
            document.getElementById(id).getElementsByClassName("Comment")[0].textContent = comments + " Comments";
        }
    } 
}

/**
 * Given a long number 
 * convert into real date
 * @param   {Integet}        t 
 * @return {Date}           real date
 */
function convertDate(t) {
    let Time = new Date(t),
    year = Time.getUTCFullYear(),
    month = Time.getUTCMonth()+1,
    date = Time.getUTCDate(),
    time = Time.toTimeString().substr(0,5);
    return `${year}/${month}/${date} ${time}`;
}

/**
 * Given a post ID
 * Check post whether has like
 * @param   {Integet}        postID 
 */

function isLiked(postID) {
    api.getPost(postID).then(res => {
        var userLikerJson = res['meta']['likes']
        for (let i = 0; i < userLikerJson.length; i++) {
            api.getUserNamebyId(userLikerJson[i]).then(res => {
                if (checkStore('username')== res['username']) {
                    let like = document.getElementById("LikeIcon");
                    like.src =  "/Asset/LikeIcon2.png"
                }
            })
        }
    })
}
/**
 * Given a post ID
 * Show feeds like
 * @param   {Integet}        postID 
 */
function showLike(postID) {
    clearInterval(Timers['timer_1']);
    var feed = document.getElementsByClassName('FeedPart')[0];
    var pag = document.getElementById('Pagination__Nav');
    pag.style.display = "none"
    feed.style.display = "none";
    var WhoLikeSection = createElement('div',"",{class:"WhoLikeSection"});
    var headingSection = createElement('div',"",{class:"headingSection"});
    var closeSection = createElement('div',"",{class:"closeSection"});
    var closeButton = createElement('img',"",{src:"Asset/close-button.png",class:"CloseIcon",alt:"CloseIcon"})
    AppendAllChild(closeSection,[closeButton]);
    var title = createElement('span',"Who have liked a post",{class:"SectionHeading"})
    AppendAllChild(headingSection,[closeSection,title]);
    AppendAllChild(WhoLikeSection,[headingSection])
    var UserList = createElement('div',"",{class:"UserList"});
    AppendChildById("main",WhoLikeSection);
    api.getPost(postID).then(res => {
        var userLikerJson = res['meta']['likes']
        for (let i = 0; i < userLikerJson.length; i++) {
            api.getUserNamebyId(userLikerJson[i]).then(res => {
                var User = createElement('div',res['name'],{class:"User"});
                var UserRow = createElement('div',"",{class:"UserRow"});
                AppendAllChild(UserRow,[User]);
                AppendAllChild(UserList,[UserRow]);
            })
        }
        AppendAllChild(WhoLikeSection,[UserList]);
        closeButton.onclick = function () {
            var parent = document.getElementById("main");
            var WLK= document.getElementsByClassName("WhoLikeSection");
            parent.removeChild(WLK[0]);
            feed.style.display = "block";
            pag.style.display = "inline-block";
            viewLikeClosed = true
        }
    })
}

/**
 * Given a post ID
 * Show feeds comments
 * @param   {Integet}        postID 
 */
function showComments(postID) {
    clearInterval(Timers['timer_1']);
    var feed = document.getElementsByClassName('FeedPart')[0];
    var pag = document.getElementById('Pagination__Nav');
    pag.style.display = "none"
    feed.style.display = "none";
    var WhoCommSection = createElement('div',"",{class:"WhoCommSection"});
    var headingSection = createElement('div',"",{class:"headingSection"});
    var closeSection = createElement('div',"",{class:"closeSection"});
    var closeButton = createElement('img',"",{src:"Asset/close-button.png",class:"CloseIcon",alt:"CloseIcon"})
    AppendAllChild(closeSection,[closeButton]);
    var title = createElement('span',"Who have commented a post",{class:"SectionHeading"})
    AppendAllChild(headingSection,[closeSection,title]);
    AppendAllChild(WhoCommSection,[headingSection])
    var UserList = createElement('div',"",{class:"UserList"});
    AppendChildById("main",WhoCommSection);
    api.getPost(postID).then(res => {
        var userComJson = res['comments'];
        for (let i = 0; i < userComJson.length; i++) {
            let author = userComJson[i]['author'];
            let com = userComJson[i]['comment'];
            let publish = convertDate(parseFloat(userComJson[i]['published']));
            var s = `${author}: ${com}`
            var User = createElement('span',s,{class:"User"});
            var comPublish = createElement('span',publish,{class:"comPublish"});
            var UserRow = createElement('div',"",{class:"UserRow"});
            AppendAllChild(UserRow,[User,comPublish]);
            AppendAllChild(UserList,[UserRow]);
        }
        AppendAllChild(WhoCommSection,[UserList]);
        closeButton.onclick = function () {
            var parent = document.getElementById("main");
            var WCM= document.getElementsByClassName("WhoCommSection");
            parent.removeChild(WCM[0]);
            feed.style.display = "block";
            pag.style.display = "inline-block";
            viewCommentClosed = true;
        }
    })
}

/**
 * Given a total numbers of feeds and current position
 * Create a pagination so taht go next or go previous feeds
 * @param   {Integet}        numPost 
 * @param   {Integet}        current 
 */

function createPagination(numPost,current) {

    let RestPost= numPost
    var pag = createElement("div","",{class:"Pagination__Nav",id:"Pagination__Nav"})
    var pagiArray = []
    RestPost = (numPost - current) + 1

    // current is not the first one and put the "<" into array
    if (current != 1) {
        pagiArray.push("<")
    }
    if (numPost <= 4) {
        for (let i = 1; i <= numPost; i++) {
            pagiArray.push(`${i}`);
        }
    } else if (RestPost <= 4) {
        for (let i = (numPost - 3); i <= numPost; i++) {
            pagiArray.push(`${i}`);
        }
        pagiArray.push(">");
    } else {
        for (let i = current; i < current+2; i++) {
            pagiArray.push(`${i}`);
        }
        pagiArray.push("...");
        pagiArray.push(`${numPost}`);
        pagiArray.push(">");
    }
    
    for (let i = 0; i < pagiArray.length; i++) {
        if(isNaN(parseInt(pagiArray[i]))) {
            if (pagiArray[i] == "...") {
                var p1 = createElement("span","...",{class:"Pagination__NavItem"})
                AppendAllChild(pag,[p1]);
            } else {
                var p2 = createElement("button",pagiArray[i],{class:"Pagination__Button",id:"Pagination__Button_"+i})
                AppendAllChild(pag,[p2]);
            }
        } else {
                var p3 = createElement("button",parseInt(pagiArray[i]),{class:"Pagination__Button",id:"Pagination__Button_"+i})
                AppendAllChild(pag,[p3]);
        }
    }

    AppendChildById("main",pag);
    pag = document.getElementsByClassName('Pagination__Nav');
    for (let i = 0; i < pag[0].childNodes.length; i++) {
        if (pag[0].childNodes[i].textContent == current) {
            let tmp = document.getElementById(pag[0].childNodes[i].id)
            tmp.id = "Pagination__Button_current"
        } else if (current == numPost && numPost > 4) {
            let id = pag[0].childNodes[pag[0].childNodes.length-1]
            id.style.display = "none";
        }
    }
}

/**
 * Create the navigation in header 
 */

function NavItem() {
    var form = document.getElementById('searchNameForm');
    form.style.display = "inline"
    var Navitem = document.getElementsByClassName("nav-item");
    Navitem[0].style.display = "inline";
    Navitem[1].style.display = "inline";
    Navitem[2].style.display = "inline";
    var Nav = document.getElementsByClassName("nav");
    Nav[0].style.display = "flex";
    var follow = document.getElementById("nav-follow");
    var setting = document.getElementById("nav-setting");
    var profile = document.getElementById("nav-profile");
    var addPost = document.getElementById("nav-add-post");
    var clickedSetting = false
    var section = document.getElementById("setting");
    var searchNameForm = document.getElementById("searchNameForm");
    follow.style.display = "inline"
    follow.onclick = function () {
        let searchReasult = document.getElementById('searchReasult')
        var searchName = searchNameForm.elements[0].value;
        api.FollowUserRequest(searchName,"user/follow").then(res=> {
            if (res['message'] == "User Not Found") {
                searchReasult.textContent = "User Not Found";
                searchReasult.style.color = "red";
                searchReasult.style.fontWeight = "bold";
            } else if (res['message'] == 'success') {
                searchReasult.textContent = "Success";
                searchReasult.style.color = "green";
                searchReasult.style.fontWeight = "bold";
            }
        })
        window.setTimeout(() =>  {
            window.location = "/index.html";
        },2000)
    }

    setting.onclick = function () {
        if (!clickedSetting) {
            section.style.display = "block";
            clickedSetting = true
        } else {
            section.style.display = "none";
            clickedSetting = false
        }
    }
    var logout = document.getElementById("logOut")
    logout.onclick = function () {
        localStorage.clear();
        window.location = "/index.html";
    }
    profile.onclick = function () {
        if (checkAllSection()) {
            showProfile("");
            ProileClosed = false;
        }
    }
    // update email address
    var updateEd = document.getElementById("updateEd")
    updateEd.onclick = function () {
        if (checkAllSection())  {
            UpdateInfo("Emaill Address")
            UpdateEdClosed = false;
        }
    }
    // update password 
    var updatePs = document.getElementById("updatePs")
    updatePs.onclick = function () {
        if (checkAllSection())  {
            UpdateInfo("Password")
            UpdatePsClosed = false;
        }
    }
    // update Name
    var updateName = document.getElementById("updateName")
    updateName.onclick = function () {
        if (checkAllSection()) {
            UpdateInfo("Name")
            UpdateNameClosed = false;
        }
    }
    addPost.onclick = function () {
        clearInterval(Timers['timer_1']);
        if (checkAllSection()) {
            addPostClosed = false
            var feed = document.getElementsByClassName('FeedPart')[0];
            var pag = document.getElementById('Pagination__Nav');
            if (feed != null && pag != null) {
                pag.style.display = "none"
                feed.style.display = "none";
            } else if (feed == null && pag == null) {
                var Nofeedsmesg = document.getElementsByClassName('Nofeedsmesg')
                Nofeedsmesg[0].style.display = "none"
            }
            var AddingPostSection = createElement('div',"",{class:"AddingPostSection"});
            var closeSection = createElement('div',"",{class:"closeSection"});
            var closeButton = createElement('img',"",{src:"Asset/close-button.png",class:"CloseIcon",alt:"CloseIcon"})
            var AddingPostTitle = createElement('h1',"Adding Post",{class:"AddingPostTitle"});
            var AddPostForm = createElement('form',"",{class:"AddPostForm"});
            var PostDescr = createElement('textarea',"",{class:"PostDescr",id:"PostDescr",placeholder:"Description"});
            var uploadImg = createElement("div","",{class:"uploadImg"})
            var AddimgButton = createElement('img',"",{src:"./Asset/addimage.jpg",class:"AddimgButton"})
            var AddPostSumbit = createElement('button',"Submit",{id:"AddPostSumbit",type:"button"})
            var greenTick = createElement('img',"",{src:"./Asset/GreenTick.png",class:"GreenTick",id:"GreenTick"});
            var mesg = createElement('span',"",{class:"mesg"})
            var inputlable = createElement('label',"",{for:"file-input"})
            var InputImg = createElement('input',"",{class:"InputImg",id:"file-input",type:"file"})
            AppendAllChild(inputlable,[AddimgButton,greenTick,mesg])
            AppendAllChild(uploadImg,[inputlable,InputImg]);
            AppendAllChild(AddPostForm,[PostDescr,uploadImg])
            AppendAllChild(closeSection,[closeButton]);
            AppendAllChild(AddingPostSection,[closeSection,AddingPostTitle,AddPostForm,AddPostSumbit]);
            AppendChildById("main",AddingPostSection);
            const input = document.querySelector('input[type="file"]');
            input.addEventListener('change', event => {
                if (VaildFile(event)) {
                    AddPostSumbit.onclick = function () {
                        fileToDataUrl(event);
                    }
                }
            })
            closeButton.onclick = function () {
                var parent = document.getElementById("main");
                var AddingPostSection= document.getElementsByClassName("AddingPostSection");
                parent.removeChild(AddingPostSection[0]);
                if (feed != null && pag != null) {
                    feed.style.display = "block";
                    pag.style.display = "inline-block";
                } else if (feed == null && pag == null) {
                    var Nofeedsmesg = document.getElementsByClassName('Nofeedsmesg')
                    Nofeedsmesg[0].style.display = "block"
                }
                addPostClosed = true
            }
        }
    }
}

/**
 * Given a user name
 * show the user's profile
 * @param   {String}        UserName 
 */
function showProfile(UserName) {
    clearInterval(Timers['timer_1']);
    var feed = document.getElementsByClassName('FeedPart')[0];
    var pag = document.getElementById('Pagination__Nav');
    var Nofeedsmesg = document.getElementsByClassName('Nofeedsmesg') 
    if (feed != null && pag != null) {
        pag.style.display = "none"
        feed.style.display = "none";
    } else if (feed == null && pag == null && Nofeedsmesg['length'] != 0) {
        Nofeedsmesg[0].style.display = "none"
    } 
    var ProfileSection = createElement('div',"",{class:"ProfileSection",id:"ProfileSection"});
    var userInfo= createElement('div',"",{class:"userInfo"});
    var userPost = createElement('div',"",{class:"userPost"});
    var closeSection = createElement('div',"",{class:"closeSection"});
    var closeButton = createElement('img',"",{src:"Asset/close-button.png",class:"CloseIcon",alt:"CloseIcon"})
    AppendAllChild(closeSection,[closeButton]);
    api.getUserProfile(UserName).then(res => {
        let num1 = res['following'] == 0 ? 0 : res['following'] 
        let num2 = res['followed_num'] == 0 ? 0 : res['followed_num'] 
        var ProfileUserName = createElement('h1',res['name'],{class:"ProfileUserName"});
        var ProfileEmail = createElement('div',"Email Address: " + res['email'],{class:"ProfileEmail"});
        var a_list = createElement('div',"",{class:"a_list"}); // a_list has item following, followed and post num
        var ProfileFollowing = createElement('a',"Following: "+num1,{class:"ProfileFollowing",id:"ProfileFollowing"});
        var ProfileFollowed = createElement('div',"Followed: "+num2,{class:"ProfileFollowed"});
        var ProfilePostNum = createElement('div',"Post: "+res['posts'].length,{class:"ProfilePostNum"});
        var followList = res['following']
        var postsList = res['posts']
        AppendAllChild(a_list,[ProfileFollowing,ProfileFollowed,ProfilePostNum])
        AppendAllChild(userInfo,[closeSection,ProfileUserName,ProfileEmail,a_list])
        AppendAllChild(ProfileSection,[userInfo])
        if (checkStore('username')!= res['username']) {
            AppendAllChild(a_list,[ProfileFollowing,ProfileFollowed,ProfilePostNum])
            AppendAllChild(userInfo,[closeSection,ProfileUserName,ProfileEmail,a_list])
            AppendAllChild(ProfileSection,[userInfo])
        }
        ProfileFollowing.onclick = function () {
                showFollowList(followList)
        }
        document.querySelector('footer').style = 'display: none'
        for (let i = 0; i < postsList.length; i++) {
            api.getPost(postsList[i]).then(res=> {
                var updateSection = createElement('div',"",{class:"updateSection"})
                var updateInput = createElement('textarea',"",{id:"updateInput",class:"updateInput",placeholder:"Description"})
                var updateform = createElement('form',"",{id:'updateform'+i})
                var updatePostImg = createElement('img',"",{src:"Asset/updatePost.svg",class:"updatePost",id:"updatePost",alt:"updatePost"})
                var closeSection2 = createElement('div',"",{class:"closeSection"});
                var closeButton2 = createElement('img',"",{src:"Asset/close-button.png",class:"CloseIcon",alt:"CloseIcon"})
                var postImg = createElement('img',"",{class:"postImg",src:"data:image/png;base64, "+res['src'],alt:res['meta'].description_text});
                var post = createElement('div',"",{class:"post"});
                var des = createElement('div',"Decription:"+res.meta['description_text'],{class:"Decription"});
                var desDiv = createElement('div',"",{class:"desDiv"});
                var like = createElement('span',"Likes: "+res.meta['likes'].length,{class:"post-item"});
                var comments = createElement('span',"Comments: "+res['comments'].length,{class:"post-item"})
                var greycover = createElement('div',"",{class:"greycover"});

                postImg.onmouseover = function() {
                    greycover.style.display = "block"
                    postImg.style.opacity = 0.6;
                }
                postImg.onmouseout = function() {
                    greycover.style.display = "none"
                    postImg.style.opacity = 1;
                }
                closeButton2.onclick = function() {
                    api.DeletePost(res['id']);
                    window.location = "/index.html";
                }
                updatePostImg.onclick = function () {
                    AppendAllChild(updateform,[updateInput])
                    AppendAllChild(updateSection,[updateform])
                    updateSection.style.display = "inline"
                    let ProfilePost = document.getElementById('updateform'+i).elements[0].value
                    let id = postsList[i];
                    if (ProfilePost != ""){
                        api.UpdatePost(id,ProfilePost)
                        window.location = "/index.html";
                    }
                }
                updateSection.style.display = "none";
                AppendAllChild(closeSection2,[updateSection,updatePostImg,closeButton2]);
                AppendAllChild(desDiv,[des])
                AppendAllChild(greycover,[like,comments,desDiv])
                AppendAllChild(post,[postImg,greycover])
                AppendAllChild(userPost,[closeSection2,post])
            })
        }
    })
    AppendAllChild(ProfileSection,[userInfo,userPost])
    AppendChildById("main",ProfileSection);   
    closeButton.onclick = function () {
        ProileClosed = true;
        var parent = document.getElementById("main");
        var ProfileSection= document.getElementsByClassName("ProfileSection");
        parent.removeChild(ProfileSection[0]);
        if (feed != null && pag != null) {
            feed.style.display = "block";
            pag.style.display = "inline-block";
        } else if (feed == null && pag == null) {
            var Nofeedsmesg = document.getElementsByClassName('Nofeedsmesg')
            if (Nofeedsmesg.length != 0 ) {
                Nofeedsmesg[0].style.display = "block"
            } else {
                window.location = "/index.html";
            }
        }
        profileClosed = true;
        document.querySelector('footer').style = 'display: block'
    }

}

/**
 * Given a user follower list
 * show the user's follower list
 * @param   {Array}        followList 
 */
function showFollowList (followList) {
    var ProfileSection = document.getElementById('ProfileSection');
    ProfileSection.style.display = "none"
    var FollowSection = createElement('div',"",{class:"FollowSection"});
    var headingSection = createElement('div',"",{class:"headingSection"});
    var closeSection = createElement('div',"",{class:"closeSection"});
    var closeButton = createElement('img',"",{src:"Asset/close-button.png",class:"CloseIcon",alt:"CloseIcon"})
    AppendAllChild(closeSection,[closeButton]);
    var title = createElement('span',"Following",{class:"SectionHeading"})
    var UserList = createElement('div',"",{class:"UserList"});
    for (let i = 0; i < followList.length; i++) {
        var user = followList[i]
        api.getUserNamebyId(user).then (res=> {
            var User = createElement('div',res['name'],{class:"User"});
            var UserRow = createElement('div',"",{class:"UserRow"});
            AppendAllChild(UserRow,[User]);
            AppendAllChild(UserList,[UserRow]);
        })
    }
    AppendAllChild(headingSection,[closeSection,title]);
    AppendAllChild(FollowSection,[headingSection,UserList])
    AppendChildById("main",FollowSection);
    closeButton.onclick = function () {
        var parent = document.getElementById("main");
        var follow = document.getElementsByClassName('FollowSection');
        parent.removeChild(follow[0]);
        ProfileSection.style.display = "flex";
    }
}

/**
 * Given a updating type
 * choose which one want to update
 * @param   {String}        type 
 */
function UpdateInfo(type) {
    clearInterval(Timers['timer_1']);
    var feed = document.getElementsByClassName('FeedPart')[0];
    var pag = document.getElementById('Pagination__Nav');
    if (feed != null && pag != null) {
        pag.style.display = "none"
        feed.style.display = "none";
    } else if (feed == null && pag == null) {
        var Nofeedsmesg = document.getElementsByClassName('Nofeedsmesg')
        Nofeedsmesg[0].style.display = "none"
    }
    var closeSection = createElement('div',"",{class:"closeSection"});
    var closeButton = createElement('img',"",{src:"Asset/close-button.png",class:"CloseIcon",alt:"CloseIcon"})
    AppendAllChild(closeSection,[closeButton]);
    var ChangeInfoSection = createElement('div',"",{class:"ChangeInfoSection"});
    var UpdateInfoForm = createElement('form',"",{class:"UpdateInfoForm",id:"UpdateInfoForm"});
    var NewItem = createElement('input',"",{type:"text",class:"NewItem",placeholder:"New "+type});
    var UpdateSumbit = createElement('button',"Change "+type,{type:"button",class:"UpdateSumbit",id:"UpdateSumbit"});
    AppendAllChild(UpdateInfoForm,[NewItem,UpdateSumbit]);
    AppendAllChild(ChangeInfoSection,[closeSection,UpdateInfoForm]);
    AppendChildById("main",ChangeInfoSection);
    var updateItem;
    if (type == "Password") {
        updateItem = "password"
    } else if (type == "Name") {
        updateItem = "name"
    } else if (type == "Emaill Address") {
        updateItem = "email"
    }
    UpdateSumbit.onclick = function () {
        var updateform = document.getElementById('UpdateInfoForm');
        var updateValue = updateform.elements[0].value
        api.UpdateUserInfo(updateItem,updateValue).then(res=> {
            if (res['msg'] == "success") {
                if (type == "Password") {
                    localStorage.clear();
                    window.location = "/index.html";
                } else if (type == "Name") {
                    window.location = "/index.html";
                } else if (type == "Emaill Address") {
                    window.location = "/index.html";
                }
            }
        })
    }
    closeButton.onclick = function () {
        if (feed != null && pag != null) {
            feed.style.display = "block";
            pag.style.display = "inline-block";
        } else if (feed == null && pag == null) {
            var Nofeedsmesg = document.getElementsByClassName('Nofeedsmesg')
            Nofeedsmesg[0].style.display = "block"
        }
        var parent = document.getElementById("main");
        var ChangeInfoSection= document.getElementsByClassName("ChangeInfoSection");
        parent.removeChild(ChangeInfoSection[0]);
        if (type == "Password") {
            UpdatePsClosed = true;
        } else if (type == "Name") {
            UpdateNameClosed = true;
        } else if (type == "Emaill Address") {
            UpdateEdClosed = true;
        }
    }
}

/**
 * Check current page whether has opened something
 * If yes, other sections can not open
 * @return {Boolean} trur or false
 */
function checkAllSection () {
    if (ProileClosed && UpdatePsClosed && UpdateEdClosed 
        && UpdateNameClosed && addPostClosed 
        && viewCommentClosed && viewLikeClosed && profileClosed) {
        return true
    } else {
        return false
    }
}

/**
 * Given current position
 * If the button is in current position, it will has a decoration
 * @param {Integer}             current
 */

function changeFeed(current) {
    var button0 = document.getElementById("Pagination__Button_0")
    var button1 = document.getElementById("Pagination__Button_1")
    var button2 = document.getElementById("Pagination__Button_2")
    var button3 = document.getElementById("Pagination__Button_3")
    var button4 = document.getElementById("Pagination__Button_4")
    var button5 = document.getElementById("Pagination__Button_5")
    if (button0 != null) {
        button0.onclick = function() {
            var check = checkPrevNext(button0.textContent)
            if (check) {
                current = parseInt(current-1)-1
                removeOldFeed(current)
            } else {
                // nothing to do
            }
        }
    }
    if (button1 != null) {
        button1.onclick = function() {
            var check = checkPrevNext(button1.textContent)
            if (check) {
                current = parseInt(current+1)-1
                removeOldFeed(current)
            } else {
                current = parseInt(button1.textContent)-1;
                removeOldFeed(current)
            }
        }
    }
    if (button2 != null) {
        button2.onclick = function() {
            var check = checkPrevNext(button2.textContent)
            if (check) {
                current = parseInt(current+1)-1
                removeOldFeed(current)
            } else {
                current = parseInt(button2.textContent)-1;
                removeOldFeed(current)
            }
        }
    }
    if (button3 != null) {
        button3.onclick = function() {
            var check = checkPrevNext(button3.textContent)
            if (check) {
                current = parseInt(current+1)-1
                removeOldFeed(current)
            } else {
                current = parseInt(button3.textContent)-1;
                removeOldFeed(current)
            }
        }
    }

    if (button4 != null) {
        button4.onclick = function() {
            var check = checkPrevNext(button4.textContent)
            if (check) {
                current = parseInt(current+1)-1
                removeOldFeed(current)
            } else {
                current = parseInt(button4.textContent)-1;
                removeOldFeed(current)
            }
        }
    }
    if (button5 != null) {
        button5.onclick = function() {
            var check = checkPrevNext(button5.textContent)
            if (check) {
                current = parseInt(current+1)-1
                removeOldFeed(current)
            } else {
                // nothing to do
            }
        }
    }
}

/**
 * Given NewFeed position
 * This is a helper function for changeFeed function
 * @param {Integer}             NewFeed
 */
function removeOldFeed(NewFeed) {
    var feed = document.getElementsByClassName('FeedPart')[0];
    var pag = document.getElementById("Pagination__Nav");
    var parent = document.getElementById("main");
    parent.removeChild(feed);
    parent.removeChild(pag);
    showFeed(NewFeed)
}

/**
 * Given Next or prev button in Pagination
 * check string whether is ">" or "<"
 * @param {String}             string
 */
function checkPrevNext(string) {
    if (string == ">" || string == "<") {
        return true
    } else {
        return false;
    }
}