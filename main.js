var req = new XMLHttpRequest();
var url = "http://localhost:3000";
var posts=[],users=[],user={};

// addData();
getPosts();
// getUsers();

var userOb={
bio: "Front-End developer .",
email: "Eman@gmail.com",
followers: 3,
following: 5,
id: "2",
name: "Eman Salah",
password: "123456",
userName: "Eman@Salah",
};

var postOb={
    id: 1,
    createdAt: "2021-12-12T10:36:15.425Z",
    text:"my post text ",
    video:"url",
    image:"url",
    commentsNum:0,
    likesNum:0,
    retweetsNum:0,
    user: "1",
    comments:[],
    usersLikes:[],
  };

function getPosts() {
  req.open("GET", url+"/posts");
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        posts = JSON.parse(req.responseText);
        console.log("posts", posts);
      }
    }
  };
}

function getUsers() {
    req.open("GET", url+"/users");
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
