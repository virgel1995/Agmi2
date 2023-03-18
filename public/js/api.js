


const storage = window.localStorage
let userdetails = [];
const {
  host, hostname, href, origin, pathname, port, protocol, search
} = window.location
console.log(pathname)
$(document).ready(function() {

	// loader 
	setTimeout(function() {
		$('body').addClass('loaded');
	}, 3000);
});


/** 
*@GET 
* SECTION DATA
*/

const getSections = () =>{
	  axios
    .get(`/section`) 
    .then((response) => {
      const sec = response.data;
     			//console.log(sec)
			return sec;
    })
    .catch((error) => console.error(error));
}

/** 
*@GET 
* SECTION_URL DATA
*/

const getUrls = () =>{
	  axios
    .get(`/url`) 
    .then((response) => {
			console.log(response.data)
      const urls = response.data;
   // storage.setItem("urls", urls);
			return urls;
    })
    .catch((error) => console.error(error));
}
getUrls()
/** 
* @GET
* USER FIND
*/
/*
const findUser = (id) => {
  axios
    .get(`/user/${id}`)
    .then((res) => {
      console.log(`found`, res.data);

//code....

    })
    .catch((error) => console.error(error));
};

*/
//-------- Createing --------//
/** 
*@POST 
* CREATE NEW USER
* /api/user/create
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
* /api/section/create
*/

const createSection = () => {
//event.preventDefault();
 const form = document.querySelector("#createSection");
	const text = document.getElementById("uploader")
text.style.display = "block"
  form.addEventListener("submit", (e) => {
    e.preventDefault();
	
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
* /api/section/url/create
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
* /api/user/login
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
* Login
* /api/user/login
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
*/
const getUser= () =>{
	const user = JSON.parse(storage.getItem("userData"))
	if(user){
	  axios
    .get(`/user/${user.user._id}`) 
    .then((response) => {
      const userData = response.data;
  userdetails.push(userData.user);
    })
    .catch((error) => console.error(error));
	}else{
		console.log("No User Found")
	}
}
getUser()

console.log(userdetails)


const toaster= (title, desc) => {
	const toasterPlaceholder = document.getElementById("toasterPlaceholder");
	toasterPlaceholder.innerHTML = `
	<div aria-live="polite" aria-atomic="true" class="bg-body-secondary position-relative bd-example-toasts rounded-3">
  <div class="toast-container p-3" id="toastPlacement">
    <div class="toast">
      <div class="toast-header">
        <img src="..." class="rounded me-2" alt="...">
        <strong class="me-auto">${title}</strong>
      </div>
      <div class="toast-body">
       ${desc}
      </div>
    </div>
  </div>
</div>
`
		 }




var login_btn = document.querySelector(".login-btn")
var logout_btn = document.querySelector(".logout-btn")
var adminUi = document.getElementById("admin-ui")
var userUi = document.getElementById("user-ui")
// data works while login or logout
if (storage.getItem("userData")) {
	
login_btn.style.display = "none"
}else {
	logout_btn.style.display = "none"
}