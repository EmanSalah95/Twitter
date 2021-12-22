var req = new XMLHttpRequest();
var url = "http://localhost:3000";
var posts = [],
  users = [],
  user = {},
  post = {};
// addData();
// getPosts();
// getUsers();
// getUser(1);

var userOb = {
  bio: "Front-End developer .",
  email: "Eman@gmail.com",
  followers: 3,
  following: 5,
  id: "2",
  name: "Eman Salah",
  password: "123456",
  userName: "Eman@Salah",
  img: "https://images.unsplash.com/photo-1639765664405-9f95cf5ddd28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80",
};

var postOb = {
  id: 1,
  createdAt: "2021-12-12T10:36:15.425Z",
  text: "my post text ",
  video: "url",
  image: "url",
  commentsNum: 0,
  likesNum: 0,
  retweetsNum: 0,
  user: "1",
  comments: [],
  usersLikes: [],
};

function loadPage() {
  localStorage.setItem("currentUser", "1");
  getCurrentUser(localStorage.getItem("currentUser"));
}

function getCurrentUser(id) {
  req.open("GET", url + "/users/" + id);
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        user = JSON.parse(req.responseText);
        console.log("user>>>>>>>", user);
        console.log("**", user);
        getPosts();
        displayAddTweet(user);
      }
    } else {
      console.log("somethingwent wrong", req.readyState);
    }
  };
}

function displayAddTweet(user) {
  document.getElementById('profile').src = user.img;


}

function getPosts() {
  req.open("GET", url + "/posts");
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        posts = JSON.parse(req.responseText);
        displayPosts(posts);
      }
    }
  };
}

function getUsers() {
  req.open("GET", url + "/users");
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        users = JSON.parse(req.responseText);
        console.log("users", users);
      }
    }
  };
}

function getUser(id) {
  req.open("GET", url + "/users/" + id);
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        user = JSON.parse(req.responseText);
        console.log("user>>>>>>>", user);
        return user;
      }
    } else {
      return undefined;
    }
  };
}

function addPost() {
  req.open("POST", url);
  console.log(JSON.stringify(postOb));
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  try {
    req.send(JSON.stringify(postOb));
    req.onreadystatechange = () => {
      console.log("on state change", req);

      if (req.readyState == 4) {
        if (req.status == 200) {
          data = JSON.parse(req.responseText); // to convert json to opject
          console.log("Done", data);
        } else {
          //   console.log(JSON.parse(req.responseText));
          console.log("error", req.responseText);
        }
      }
    };
  } catch (error) {
    console.log(">>>>>>>>>error", error);
  }
}
var uID = 0;

function displayPosts(posts) {
  document.getElementsByClassName("lds-ring")[0].classList.add("hidden"); // to hide indicator //.remove("hidden") change it back
  var i = 0;
  posts.forEach((post) => {
    console.log(post.user);
    document.getElementsByClassName("homepage")[0].innerHTML += `
    <div id=${post.id} class="post-container">
         <label class="user-id" style="display:none">${post.user.id}</label>
         <label class="users-likes" style="display:none">${post.usersLikes}</label>
          <div>
          <img class="logged-user-image onmouseenter=${'displayCard(event)'}" src=${post.user.img} />
          <h6 class="name-username-style" onmouseenter=${'displayCard(event)'}>${post.user.name}</h6>
          <span class="name-username-style" onmouseenter=${'displayCard(event)'}>@${post.user.userName}</span>
            <button title="More"class="settings-btn"><i class="fas fa-ellipsis-h"></i></button>
          </div>
          ${post.text && `<article class="post-article">${post.text}</article>`}
          ${post.image && `<img class="post-media" src=${post.image}/>`} 
          ${
            post.video &&
            `<iframe width="560" height="315" src="https://www.youtube.com/embed/-p1P4fdhaF8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
          } 
          <footer id="post-footer" style="display: flex;">
            <button id="reply-btn" title="Reply"><i class="far fa-comment"></i><label>${
              post.commentsNum
            }</label></button>
            <button id="retweet-btn" title="Retweet"><i class="fas fa-retweet"></i><label>${
              post.retweetsNum
            }</label></button>
            <button id="like-btn-${i}" title="Like" onclick=${'likePost(event)'}><i class="fas fa-heart"></i><label class="likes-num">${
              post.likesNum
            }</label></button>
            <button id="share-btn" title="Share"><i class="fas fa-sign-out-alt"
                style="transform: rotate(-90deg);"></i></button>
          </footer>
        </div>
    `;
    if (post.usersLikes.includes(uID)) {
      var like = document.getElementById(`like-btn-${i}`);
      like.classList.add("liked-post-style");
    } else {
      var like = document.getElementById(`like-btn-${i}`);
      like.classList.remove("liked-post-style");
    }
    i++;
  });
}

function displayCard(e) {
  var selectedPost = document.getElementById(e.target.parentElement.parentElement.id);
  var userID = (selectedPost.getElementsByClassName("user-id")[0].innerText); //to get user id from hidden label
  // var user = getUser(userID);
  req.open("GET", url + "/users/" + userID);
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        user = JSON.parse(req.responseText);
        // console.log(user)
        setTimeout(function () {
          var card = document.createElement("div");
          card.setAttribute("id", "card-id")
          card.setAttribute("class", "profile-card");
          card.style.padding = "2%";
          card.style.display = "block";
          card.innerHTML =
            `  <div style="float:left;display: flex;flex-direction: column;line-height: 1.5em;">
            <img id="selected-user-img" class="logged-user-image" src=${user.img}/>
            <h6 id="selected-user-name" class="name-username-style">${user.name}</h6>
            <span id="selected-user-username" class="name-username-style"style="color:#8899A6;">${user.userName}</span>
        </div>
        <button class="card-follow-btn">
        Follow
        </button>
        <p id="selected-user-bio" style="clear: both;padding: 8% 0%;line-height: 1.5em;">
        ${user.bio}
        </p>
        <div>
            <h4 id="selected-user-following" style="float: left;margin-right: 10%;">${user.following}<span style="color:#8899A6;font-weight: lighter;"> Following</span></h4>
            <h4 id="selected-user-followers">${user.followers}<span style="color:#8899A6;font-weight: lighter;"> Followers</span></h4>
        </div>`
          selectedPost.appendChild(card);
          card.onmouseleave = function () {
            selectedPost.removeChild(card);
          }
        }, 500);
      }
    }
  };
}

function likePost(e) {
  var likedpost = document.getElementById(e.target.parentElement.parentElement.parentElement.id); //selected post
  var isLiked = document.getElementById(e.target.parentElement.id); //like btn id

  var userLikesStr=likedpost.getElementsByClassName("users-likes")[0].innerText; //get users that likes the post from html
  var userLikesArrStr=[];
  if(userLikesStr!="")
  {
    userLikesArrStr=userLikesStr.split(",");
  }
  var likesNumStr=likedpost.getElementsByClassName("likes-num")[0].innerText; //get users that likes the post from html
  var likesNum=parseInt(likesNumStr);

  var p={};
  p.usersLikes=userLikesArrStr.map(Number); //convert array from string to numbers
  if (isLiked.className == "liked-post-style") //user dislikes post
  {
    isLiked.classList.remove("liked-post-style")
    p.likesNum=likesNum-1;
    const index = p.usersLikes.indexOf(uID);
    if (index > -1) 
    {
      p.usersLikes.splice(index, 1);
    }
  } 
  else //user likes post
  {
    isLiked.classList.add("liked-post-style");
    p.likesNum=likesNum+1;
    p.usersLikes.push(uID);
  }

  var jsonPost=JSON.stringify(p);
  req.open("PATCH", url + "/posts/" + likedpost.id);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.onreadystatechange = function () {
    var po = JSON.parse(req.responseText);
    if (req.readyState == 4 && req.status == "200") {
      console.log(po);
    } 
    else {
      console.log(po);
    }
  }
  req.send(jsonPost);
}