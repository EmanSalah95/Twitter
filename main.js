var req = new XMLHttpRequest();
var url = 'http://localhost:3000';
var posts = [],
  users = [],
  user = {},
  post = {};
// addData();
// getPosts();
// getUsers();
// getUser(1);

var userOb = {
  bio: 'Front-End developer .',
  email: 'Eman@gmail.com',
  followers: 3,
  following: 5,
  id: '2',
  name: 'Eman Salah',
  password: '123456',
  userName: 'Eman@Salah',
  img: 'https://images.unsplash.com/photo-1639765664405-9f95cf5ddd28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80',
};

var postOb = {
  id: 1,
  createdAt: '2021-12-12T10:36:15.425Z',
  text: 'my post text ',
  video: 'url',
  image: 'url',
  commentsNum: 0,
  likesNum: 0,
  retweetsNum: 0,
  user: '1',
  comments: [],
  usersLikes: [],
};

function loadPage() {
  localStorage.setItem('currentUser', '1');
  getCurrentUser(localStorage.getItem('currentUser'));
  setTimeout(() => {
    getUsers();
  }, 1000);
}

function getCurrentUser(id) {
  req.open('GET', url + '/users/' + id);
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        user = JSON.parse(req.responseText);
        console.log('user>>>>>>>', user);
        console.log('**', user);
        getPosts();
        displayAddTweet(user);
      }
    } else {
      console.log('somethingwent wrong', req.readyState);
    }
  };
}

function displayAddTweet(user) {
  document.getElementById('profile').src = user.img;
}

function getPosts() {
  req.open('GET', url + '/posts');
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
  req.open('GET', url + '/users');
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        users = JSON.parse(req.responseText);
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
        return user;
      }
    } else {
      return undefined;
    }
  };
}

function addPost() {
  req.open('POST', url);
  console.log(JSON.stringify(postOb));
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  try {
    req.send(JSON.stringify(postOb));
    req.onreadystatechange = () => {
      console.log('on state change', req);

      if (req.readyState == 4) {
        if (req.status == 200) {
          data = JSON.parse(req.responseText); // to convert json to opject
          console.log('Done', data);
        } else {
          //   console.log(JSON.parse(req.responseText));
          console.log('error', req.responseText);
        }
      }
    };
  } catch (error) {
    console.log('>>>>>>>>>error', error);
  }
}

function displayPosts(posts) {
  document.getElementsByClassName('lds-ring')[0].classList.add('hidden'); // to hide indicator //.remove("hidden") change it back
  var i = 0;
  posts.forEach(post => {
    console.log(post.user);
    document.getElementsByClassName('homepage')[0].innerHTML += `
    <div id=${post.id} class="post-container">
         <label class="user-id" style="display:none">${post.user.id}</label>
         <label class="users-likes" style="display:none">${
           post.usersLikes
         }</label>

          <img class="logged-user-image profile-img" onmouseover=${'displayCard(event)'} src=${
      post.user.img
    } alt="profile-img"/>

         
          <div class="post-content">
          
    <div class="post-text">
    
        <div class="name-container">
        
          <h6 class="name-style" onmouseover=${'displayCard(event)'}>${
      post.user.name
    }</h6>
                  <span class="username-style" onmouseover=${'displayCard(event)'}>@${
      post.user.userName
    }</span>
        </div>

     <button title="More"class="settings-btn"><i class="fas fa-ellipsis-h"></i></button>
    </div>
        
         
          ${post.text && `<article class="post-article">${post.text}</article>`}
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
            <button class="retweet-btn" title="Retweet"><i class="fas fa-retweet"></i><label>${
              post.retweetsNum
            }</label></button>
            <button class="like-btn" id="like-btn-${i}" title="Like" onclick=${'likePost(event)'}><i class="fas fa-heart"></i><label class="likes-num">${
      post.likesNum
    }</label></button>
            <button class="share-btn" title="Share"><i class="fas fa-sign-out-alt"
                style="transform: rotate(-90deg);"></i></button>
          </footer>


           </div>
        </div>
    `;
    if (post.usersLikes.includes(parseInt(user.id))) {
      var like = document.getElementById(`like-btn-${i}`);
      like.classList.add('liked-post-style');
    } else {
      var like = document.getElementById(`like-btn-${i}`);
      like.classList.remove('liked-post-style');
    }
    i++;
  });
  setTimeout(() => {
    displayUsers();
  }, 1000);
}

function displayCard(e) {
  var selectedPost = document.getElementById(
    e.target.parentElement.parentElement.parentElement.parentElement.id
  );

  if (selectedPost == null)
    selectedPost = document.getElementById(e.target.parentElement.id);

  var userID = selectedPost.getElementsByClassName('user-id')[0].innerText; //to get user id from hidden label

  // var user = getUser(userID);
  req.open('GET', url + '/users/' + userID);
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        user = JSON.parse(req.responseText);
        // console.log(user)
        setTimeout(function () {
          var card = document.createElement('div');
          card.setAttribute('id', 'card-id');
          card.setAttribute('class', 'profile-card');
          card.style.display = 'block';
          card.innerHTML = `  <div style="float:left;display: flex;flex-direction: column;line-height: 1.5em;">
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
        }, 400);
      }
    }
  };
}

function displayUsers() {
  console.log('********users in display********');
  var usersEl = document.createElement('section');
  usersEl.classList.add('users-section');
  usersEl.id = 'usersMain';
  usersEl.innerHTML = `<p class="section-title">Who to follow</p>`;
  document.getElementById('homepage').appendChild(usersEl);
  var usersList = users.slice(0, 3); //get first 3 users
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
  usersEl.innerHTML += `<div class="section-user"> <p class='moreFollowers'>Show more</p></div>`;
  document.getElementById('asideUsers').appendChild(usersEl);
}

function toggleFollow(e) {
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

function likePost(e) {
  var likedpost = document.getElementById(
    e.target.parentElement.parentElement.parentElement.parentElement.id
  ); //selected post
  var isLiked = document.getElementById(e.target.parentElement.id); //like btn id
  console.log(isLiked);
  var userLikesStr =
    likedpost.getElementsByClassName('users-likes')[0].innerText; //get users that likes the post from html
  var userLikesArrStr = [];
  if (userLikesStr != '') {
    userLikesArrStr = userLikesStr.split(',');
  }
  var likesNumStr = likedpost.getElementsByClassName('likes-num')[0].innerText; //get users that likes the post from html
  var likesNum = parseInt(likesNumStr);

  var p = {};
  p.usersLikes = userLikesArrStr.map(Number); //convert array from string to numbers
  if (isLiked.classList.contains('liked-post-style')) {
    //user dislikes post
    isLiked.classList.remove('liked-post-style');
    p.likesNum = likesNum - 1;
    const index = p.usersLikes.indexOf(parseInt(user.id));
    if (index > -1) {
      p.usersLikes.splice(index, 1);
    }
  } //user likes post
  else {
    isLiked.classList.add('liked-post-style');
    p.likesNum = likesNum + 1;
    p.usersLikes.push(parseInt(user.id));
  }

  var jsonPost = JSON.stringify(p);
  console.log(jsonPost);
  req.open('PATCH', url + '/posts/' + likedpost.id);
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
