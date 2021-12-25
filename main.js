var req = new XMLHttpRequest();
var url = 'http://localhost:3000';
var posts = [],
  users = [],
  user = {},
  post = {},
  comments=[];

var postOb = {
  id: '',
  createdAt: '',
  text: '',
  video: '',
  image: '',
  commentsNum: 0,
  likesNum: 0,
  retweetsNum: 0,
  user: {},
  comments: [],
  usersLikes: [],
  usersRetweets: [],
};

function news(category,image,content){
  this.category=category,
  this.image = image,
  this.content = content
};

function loadPage(page) {
  // localStorage.setItem('currentUser', '2');
  var loggeduserId=localStorage.getItem('currentUser')? 
       localStorage.getItem('currentUser'):
       sessionStorage.getItem('currentUser');
  if (!loggeduserId)
       location.replace('./Sign-in/sign.html'); 
  getUser(loggeduserId); //set global user object of current user
  if (page == 'home') {
    setTimeout(() => {
      getPosts();
    }, 400);
    setTimeout(() => {
      displayPosts(posts);
    }, 450);
    setTimeout(() => {
      displayAddTweet();
    }, 500);
  }

  if (page == 'tweet') {
    displayTweetPage();
  }

  if (page == 'profilepage') {
    setTimeout(() => {
      displayProfile();
    }, 400);
    setTimeout(() => {
      getPosts();
    }, 450);
    setTimeout(() => {
      let filtered= posts.filter( item => item.user.id==user.id);
      displayPosts(filtered);
    }, 500);
  }

  if (page == 'bookmarks') {
    setTimeout(() => {
      getPosts();
    }, 400);
    setTimeout(() => {
      displayBookmarks();
    }, 650);
  }

  setTimeout(() => {
    displayAsideUser();
  }, 450);
  setTimeout(() => {
    getUsers();
  }, 600);
  setTimeout(()=>{
    displayNews();
  },750)
  if(page =='whoTofollow')
  {
    setTimeout(() => {
      displayUsers(users.length);
    }, 700);  
  }
  else{
    setTimeout(() => {
      displayUsers(3);
    }, 700);
  }
}

function displayAddTweet() {
  document.getElementById('profile').src = user.img;
}

function displayAsideUser() {
  console.log(user);
  document.getElementById('aside-profile').src = user.img;
  document.getElementById('aside-name').innerHTML = user.name;
  document.getElementById('aside-user-name').innerHTML = user.userName;
}

function getPosts(condition = '') {
  req.open('GET', url + '/posts?' + condition); //GET /posts?id=1
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        posts = JSON.parse(req.responseText);
      }
    }
  };
}

function getComments(condition = '') {
  req.open('GET', url + '/comments?' + condition); //GET /comments?id=1 >>>> only in tweet page
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        comments = JSON.parse(req.responseText);
        console.log('commmmmments', comments);
      }
    }
  };
}


function getUsers() {
  req.open('GET', url + '/users');
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        users = JSON.parse(req.responseText); // all useres
        console.log('users===========================', users);
      }
    }
  };
}

function getUser(id) {
  req.open('GET', url + '/users/' + id);
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        user = JSON.parse(req.responseText);
        console.log('user>>>>>>>', user);
      }
    } else {
      return undefined;
    }
  };
}

function addRequest(_url,_postOb) {
  req.open("POST", _url);
  console.log(JSON.stringify(_postOb));
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  try {
    req.send(JSON.stringify(_postOb));
    req.onreadystatechange = () => {
      console.log('on state change', req);

      if (req.readyState == 4) {
        if (req.status == 200) {
          console.log("Done", data);
        } else {
          console.log('error', req.responseText);
        }
      }
    };
  } catch (error) {
    console.log('>>>>>>>>>error', error);
  }
}

function displayPosts(_posts) {
  document.getElementsByClassName('lds-ring')[0].classList.add('hidden'); // to hide indicator //.remove("hidden") change it back
  var i = 0;
  _posts.forEach(post => {
    document.getElementsByClassName('homepage')[0].innerHTML += `
    <div id=${post.id} class="post-container" onclick="goToPost(${post.id})" >
         <label class="user-id" style="display:none">${post.user.id}</label>
         <label class="users-likes" style="display:none">${
           post.usersLikes
         }</label>
         <label class="users-retweets" style="display:none">${
           post.usersRetweets
         }</label>
          <img class="logged-user-image profile-img" onmouseover='displayCard(event,${
            post.user.id
          })' src=${post.user.img} alt="profile-img"/>

         
          <div class="post-content">
          
      <div class="post-text">
    
        <div class="name-container">
        
          <h6 class="name-style" onmouseover='displayCard(event,${
            post.user.id
          })'>${post.user.name}</h6>
                  <span class="username-style">@${post.user.userName}</span>
        </div>

        <button title="More"class="settings-btn" onclick=${'HandleIconPost(event)'} ><i class="fas fa-ellipsis-h"></i></button>    </div>
           ${
             post.text && `<article class="post-article">${post.text}</article>`
           }
          ${
            post.image &&
            `<img class="post-media" src=${post.image} alt="post-media"/>`
          }
          ${
            post.video &&
            `
            <div class="post-media">
            <iframe style="height: 350px;width:100%;border-radius:20px" src="https://www.youtube.com/embed/-p1P4fdhaF8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            `
          }


          <footer class="post-footer" style="display: flex;">
            <button class="reply-btn" title="Reply"><i class="far fa-comment"></i><label>${
              post.commentsNum
            }</label></button>
            <button class="retweet-btn" id="retweet-btn-${i}" title="Retweet" onclick="retweetPost(event,${
      post.id
    },${user.id})"><i class="fas fa-retweet"></i><label class="retweets-num">${
      post.retweetsNum
    }</label></button>
            <button class="like-btn" id="like-btn-${i}" title="Like" onclick="likePost(event,${
      post.id
    },${user.id})"><i class="fas fa-heart"></i><label class="likes-num">${
      post.likesNum
    }</label></button>
            <button class="share-btn" id="share-btn-${i}" title="Share" onclick='addBookmark(event,${
              post.id
            })'><i class="fas fa-sign-out-alt"
                style="transform: rotate(-90deg);"></i></button>
          </footer>


           </div>
        </div>
    `;
    if (post.usersLikes.includes(parseInt(user.id))) {
      var like = document.getElementById(`like-btn-${i}`);
      like.classList.add('liked-post-style');
      like.title = 'dislike';
    } else {
      var like = document.getElementById(`like-btn-${i}`);
      like.classList.remove('liked-post-style');
    }

    var retweet = document.getElementById(`retweet-btn-${i}`);
    if (post.usersRetweets.includes(parseInt(user.id))) {
      retweet.classList.add('retweeted-post-style');
      retweet.title = 'Undo Retweet';
    } else {
      retweet.classList.remove('retweeted-post-style');
    }
    var bookmarked= document.getElementById(`share-btn-${i}`);
    if(user.bookmarks.includes(parseInt(post.id))){
      bookmarked.classList.add('bookmarked-post-style');
    }
    else{
      bookmarked.classList.remove('bookmarked-post-style');
    }
    i++;
  });
}

function displayCard(e, _id) {
  var selectedPost = document.getElementById(
    e.target.parentElement.parentElement.parentElement.parentElement.id
  );
  if (selectedPost == null)
    selectedPost = document.getElementById(e.target.parentElement.id);
  var user = users[_id - 1];
  var card = document.createElement('div');
  card.setAttribute('id', 'card-id');
  card.setAttribute('class', 'profile-card');
  card.style.display = 'block';
  card.innerHTML = `  <div style="float:left;display: flex;flex-direction: column;line-height: 1.5em;" onclick="stopParentC">
    <img id="selected-user-img" class="logged-user-image" src=${user.img}/>
    <h6 id="selected-user-name" class="name-style">${user.name}</h6>
    <span id="selected-user-username" class="username-style" style="color:#8899A6;">${user.userName}</span>
</div>
<button class="card-follow-btn" onclick="toggleFollow(event)">Follow</button>
<p id="selected-user-bio" style="clear: both;padding: 5% 0%;line-height: 1.5em;">
${user.bio}
</p>
<div>
    <h4 id="selected-user-following" style="float: left;margin-right: 10%;">${user.following}<span style="color:#8899A6;font-weight: lighter;"> Following</span></h4>
    <h4 id="selected-user-followers">${user.followers}<span style="color:#8899A6;font-weight: lighter;"> Followers</span></h4>
</div>`;
  selectedPost.appendChild(card);
  card.onmouseleave = function () {
    selectedPost.removeChild(card);
  };
}

function displayUsers(usersLength) {
  console.log('********users in display********', users);
  var usersEl = document.createElement('section');
  usersEl.classList.add('users-section');
  usersEl.innerHTML = `<p class="section-title">Who to follow</p>`;
  var usersList = users.slice(0, usersLength); //get first 3 users
  usersList.forEach(user => {
    var userEl = document.createElement('div');
    userEl.classList.add('section-user');
    userEl.innerHTML = `
    <div class="user-image">
      <img src=${user.img} />
    </div>
    <div class="who-to-follow-user" style="width: 90%">
      <div class="user-item">
          <div style="padding-left: 2%;">
            <h6 class="user-name">${user.name} </h6>
            <h6 class="user-name op">@${user.userName} </h6>
          </div>
          <button onclick="toggleFollow(event)" class="follow-btn secondary-btn">Follow</button>
        </div>
      </div>
    </div>
    `;
    usersEl.appendChild(userEl);
  });
  // document.getElementById('homepage').appendChild(usersEl);
  usersEl.innerHTML += `<div class="section-user"> <a class='moreFollowers' href="WhoToFollow.html">Show more</a></div>`;
  document.getElementById('asideUsers').appendChild(usersEl);
}

function toggleFollow(e) {
  e.stopPropagation();
  console.log(e.target.innerHTML);
  var btn = e.target;
  console.log(btn.innerHTML);
  if (btn.innerHTML == 'Follow') {
    btn.innerHTML = 'Following';
    btn.classList.add('unfollow-btn');
  } else {
    btn.innerHTML = 'Follow';
    btn.classList.remove('unfollow-btn');
  }
}

function likePost(e, _postId, userID) {
  e.stopPropagation();
  var isLiked = document.getElementById(e.target.parentElement.id); //like btn id
  var userLikesArr = posts[_postId - 1].usersLikes;
  var likesNum = posts[_postId - 1].likesNum;

  var p = {};
  p.usersLikes = userLikesArr;
  if (isLiked.classList.contains('liked-post-style')) {
    //user dislikes post
    isLiked.classList.remove('liked-post-style');
    p.likesNum = likesNum - 1;
    const index = p.usersLikes.indexOf(parseInt(userID));
    if (index > -1) {
      p.usersLikes.splice(index, 1);
    }
  } //user likes post
  else {
    isLiked.classList.add('liked-post-style');
    p.likesNum = likesNum + 1;
    p.usersLikes.push(parseInt(userID));
  }
  EditPost(_postId, p);
}
function retweetPost(e, postID, userID) {
  e.stopPropagation();
  var isRetweeted = document.getElementById(e.target.parentElement.id); //retweet btn id
  var p = {};
  p.usersRetweets = posts[postID - 1].usersRetweets;
  if (isRetweeted.classList.contains('retweeted-post-style')) {
    //user dislikes post
    isRetweeted.classList.remove('retweeted-post-style');
    p.retweetsNum = posts[postID - 1].retweetsNum - 1;
    const index = p.usersRetweets.indexOf(parseInt(userID));
    if (index > -1) {
      p.usersRetweets.splice(index, 1);
    }
  } //user likes post
  else {
    isRetweeted.classList.add('retweeted-post-style');
    p.retweetsNum = posts[postID - 1].retweetsNum + 1;
    p.usersRetweets.push(parseInt(userID));
  }
  EditPost(postID, p);
}
function EditPost(postID, postObj) {
  var jsonPost = JSON.stringify(postObj);
  console.log(jsonPost);
  req.open('PATCH', url + '/posts/' + postID);
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.onreadystatechange = function () {
    var po = JSON.parse(req.responseText);
    if (req.readyState == 4 && req.status == '200') {
      console.log(po);
    } else {
      console.log(po);
    }
  };
  req.send(jsonPost);
}
function addPost(inputId) {
  var text = document.getElementById(inputId).value;
  var lastPostId = parseInt(posts[posts.length - 1].id);
  console.log(lastPostId);
  var newPost = { ...postOb }; //copy in new ob to keep the original values mutable
  newPost.user = user;
  newPost.text = text;
  newPost.id = (++lastPostId).toString();
  newPost.createdAt = new Date();
  posts.push(newPost);
  console.log("old", postOb);
  console.log("new", newPost);
  addRequest(url+"/posts",newPost);
}
function displayProfile() {
  document.getElementById('profile-user-image').src = user.img;
  document.getElementById('profile-user-name').innerText = user.name;
  document.getElementById('name-span').innerText = user.name;
  document.getElementById('profile-user-username').innerText = user.userName;
  document.getElementById('profile-following').innerText = user.following;
  document.getElementById('profile-followers').innerText = user.followers;
}

function goToPost(_id) {
  location.href = './comments.html';
  sessionStorage.setItem('tweet', _id);
}

function displayTweetPage() {
  setTimeout(() => {
    var tweetId = sessionStorage.getItem('tweet');
    getPosts(`id=${tweetId}`);
  }, 400);
  setTimeout(() => {
    displayPosts(posts); ///posts=[currentPost]
  }, 450);
  setTimeout(() => {
    displayWriteReply();
  }, 500);

  setTimeout(() => {
    if (posts[0].commentsNum>0)  // in retweet page posts contains only current post ,>>>>>>>>>>> if tweet contains comments
          getComments('postId='+posts[0].id);// in retweet page posts contains only current post , comments?postId=1
  }, 550);

  setTimeout(() => {
    if (posts[0].commentsNum>0)  
      displayPosts(comments);// display comments >>>>>///posts=[currentPost]
  }, 600);
  
}

function displayWriteReply() {
  // in tweet page added after display tweet
  document.getElementsByClassName('homepage')[0].innerHTML += `
         <div class="post replyContainer">
         <img
           class="profile-img"
           id="profile"
           style="border-radius: 50%"
           src=${user.img}
           alt="profile image"
         />
         <div class="post-right-side">
           <input
             id="write-header"
             type="text"
             placeholder="write your reply..."
           />
       
         </div>
         <button class="primary-btn tweet-btn" style="width:20%" onclick="addComment('write-header')">Reply</button>   
        </div>
    `;
}
function HandleIconPost(e) {
  e.stopPropagation();
  var selectedPost = document.getElementById(
    e.target.parentElement.parentElement.parentElement.parentElement.id
  );

  if (selectedPost == null)
    selectedPost = document.getElementById(e.target.parentElement.id);

  var userID = selectedPost.getElementsByClassName('user-id')[0].innerText; //to get user id from hidden label

  var user = getUser(userID);
  req.open('GET', url + '/users/' + userID);
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        user = JSON.parse(req.responseText);
        // console.log(user)
        setTimeout(function () {
          var card = document.createElement('div');
          card.setAttribute('id', 'caard-id');
          card.setAttribute('class', 'div-icon-post');
          card.style.display = 'block';
          card.innerHTML = ` <div >
          <ul>
            <li> <i class="far fa-envelope"></i> <span> Send Direct Message</span></li>
            <li> <i class="far fa-bookmark"></i> Bookmark</span></li>
            <li> <i class="fas fa-link"></i> <span> Copy link to Tweet</span></li>
            <li> <i class="fas fa-sign-out-alt"
            style="transform: rotate(-90deg);"></i> <span> Share Tweet via ...</span></li>
          </ul>
        </div> `;
          selectedPost.appendChild(card);
          card.onmouseleave = function () {
            selectedPost.removeChild(card);
          };
        }, 400);
      }
    }
  };
}

function addComment(inputId) {
  var currentTweet=posts[0];
  var text = document.getElementById(inputId).value;
  var newComment = { ...postOb }; //copy in new ob to keep the original values mutable
  newComment.user = user;
  newComment.text = text;
  newComment.id = (Math.floor(Math.random() * 1000)).toString(); //generate random ,random decimal 0:1 
  newComment.createdAt = new Date();
  newComment.postId = currentTweet.id;
  comments.push(newComment);
  console.log("old", postOb);
  console.log("new", newComment);
  var params={};
  params.commentsNum=currentTweet.commentsNum+1;
  setTimeout(()=>{ addRequest(url+"/comments",newComment)} ,100);
  setTimeout(()=>{EditPost(currentTweet.id,params)} ,250);
}

function addBookmark(e, _postId) {
  e.stopPropagation();
  console.log('bookmark', _postId ,user);
  var isBookmarked = document.getElementById(e.target.parentElement.id); //like btn id

    if (!user.bookmarks.includes(_postId)) {
      isBookmarked.classList.add('bookmarked-post-style');
      user.bookmarks.push(_postId);
      console.log(">>>",user);
      // var userObj={};
      // userObj.bookmarks = user.bookmarks;
      // console.log("oc",userObj);

      // req.open('PATCH', url + '/users/' + user.id);

      // req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      // req.send(JSON.stringify(userObj));
    }
    else{
      isBookmarked.classList.remove('bookmarked-post-style');
      user.bookmarks.splice(user.bookmarks.indexOf(_postId),1);
    }
    var userObj={};
    userObj.bookmarks = user.bookmarks;
    console.log("oc",userObj);
    req.open('PATCH', url + '/users/' + user.id);
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    req.send(JSON.stringify(userObj));
}

function displayBookmarks() {
  document.getElementsByClassName('lds-ring')[0].classList.add('hidden'); // to hide indicator //.remove("hidden") change it back
  document.getElementById("username-span").innerText=user.userName;

  var i = 0;

  var bookmarkIDs = [];
  // users.forEach(user => {
  //   var bm = user.bookmarks;

  //   bm.forEach(IDs => {
  //     bookmarkIDs.push(IDs.toString());
  //   });
  // });

    var bm = user.bookmarks;// bookmarks for current user 

    bm.forEach(IDs => {
      bookmarkIDs.push(IDs.toString());
    });
   
    var bmPosts=[];
    posts.forEach(post => {
      if (bookmarkIDs.includes(post.id))
      {
        bmPosts.push(post);
      }
    });

    displayPosts(bmPosts); // display this array of bookmarke posts
}

function logout() {
  localStorage.clear();
  location.replace('./Sign-in/sign.html');
  
}

function displayNews(){
  var NewsArr=[];
  NewsArr.push(new news("sports","https://pbs.twimg.com/semantic_core_img/1471063698596790272/sUFmtGGA?format=jpg&name=small","The Africa Cup of Nations due to be held in January 2022 has been indefinitely postponed, the Confederation of African Football has confirmed"));
  NewsArr.push(new news("news","https://pbs.twimg.com/media/FHdDaD1XMAUz46r?format=jpg&name=small","إطلاق أقوى تليسكوب في التاريخ لاستكشاف الفضاء"));
  NewsArr.push(new news("health","https://pbs.twimg.com/semantic_core_img/1366513874350923778/f6PSgcbJ?format=png&name=small","Experts say masks are safe and effective in preventing spread of COVID-19"));

  var NewsDiv= document.getElementById("news-div");
  for(var i=0;i<NewsArr.length;i++)
  {
    console.log(NewsArr)
    NewsDiv.style.padding="15px 0px";
    NewsDiv.innerHTML+=`
    <div class="news-content">
    <h4 style="font-size: 15px;font-weight: lighter;color: #8899a6;">${NewsArr[i].category}</h4>
    <div style="display: flex;flex-direction: row;">
      <p>${NewsArr[i].content}</p>
      <img style="margin-left:5px;width: 70px;height: 60px;border-radius: 15px;" src="${NewsArr[i].image}"/>
    </div>
    <div>
    `
  }
}
