


const storage = window.localStorage
let userdetails = [];
//site methods
const {
  host, hostname, href, origin, pathname, port, protocol, search
} = window.location


$(document).ready(function() {

	// loader 
	setTimeout(function() {
		$('body').addClass('loaded');
	}, 3000);
});




//-------- Createing --------//
/** 
*@POST 
* CREATE NEW USER
* /user/create
*/

const createUser = () => {
//event.preventDefault();

  const form = document.querySelector("#createUser");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    axios
      .post("/user/create", formData, {
        headers: {
"Content-Type":"application/json"
        },
      })
      .then((res) => {
				console.log(res.data)
window.location.replace('/home');

      })
      .catch((err) => {
        console.log(err);
      });
  });
}


/** 
*@POST 
* CREATE NEW SECTION
* /section/create
*/

const createSection = () => {
//event.preventDefault();
 const form = document.querySelector("#createSection");
	//const text = document.getElementById("uploader")
//text.style.display = "block"
  form.addEventListener("submit", (e) => {
    e.preventDefault();
	const formData = new FormData(form);
    axios
      .post("/section/create", formData, {
        headers: {
"Content-Type":"application/json"
        },
      })
      .then((res) => {
				console.log(res.data)
window.location.replace('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

/** 
*@POST 
* CREATE NEW SECTION URL
* /url/create
*/
const createUrl = () => {
//event.preventDefault();

   const form = document.querySelector("#createUrl");
		const text = document.getElementById("uploader")
text.style.display = "block"
	
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    axios
      .post("/url/create", formData, {
        headers: {
"Content-Type":"application/json",
"Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
				//console.log(res.data)
window.location.replace('/home');

      })
      .catch((err) => {
        console.log(err);
      });
  });
	
}


/** 
*@POST 
* Login
* /user/login
*/

const login = () => {
//event.preventDefault();

   const form = document.getElementById("loginForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
axios.post("/user/login", formData, {
        headers: {
"Content-Type":"application/json"
        },
      }).then((res) => {
				console.log(res.data)
		 
storage.setItem("userData", JSON.stringify(res.data));
				window.location.replace('/home');

      })
      .catch((err) => {
        console.log(err);
      });
})
}

/** 
*@POST 
* Logout
* /user/logout
*/

const logout = () => {
//event.preventDefault();

   const form = document.getElementById("logoutForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
axios.post("/user/logout").then(() => {

storage.clear()
				window.location.replace('/');

      })
      .catch((err) => {
        console.log(err);
      });
})
}
/** 
*@GET 
* USER DATA
* /user/:id
*/
const getUser= () =>{
	const user = JSON.parse(storage.getItem("userData"))
	if(user){
	  axios
    .get(`/user/${user.user._id}`) 
    .then((response) => {
      const userData = response.data;
  userdetails.push(userData);
    })
    .catch((error) => console.error(error));
	}else{
		console.log("No User Found")
	}
}
getUser()
var login_btn = document.querySelector(".login-btn")
var logout_btn = document.querySelector(".logout-btn")
// data works while login or logout
if (storage.getItem("userData")) {
	
login_btn.style.display = "none"
}else {
	logout_btn.style.display = "none"
}
//
let user ;
	if (storage.getItem("userData")) {
		user = JSON.parse(storage.getItem("userData")).user
		


var createUserIsAdmin = document.getElementById("isAdmin")
var settingsBtns = document.getElementById("settings")
if(user) {
settingsBtns.classList.remove("d-none")
}
if(user.isAdmin){
	createUserIsAdmin.classList.remove("d-none")
}



	} 

