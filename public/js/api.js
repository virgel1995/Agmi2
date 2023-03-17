


const siteUrl ="https://Agmi.virgel1995.repl.co"
 
const storage = window.localStorage
/** 
*@GET 
* USER DATA
*/
const getUsers = () => {
  axios
    .get(`/api/user`) 
    .then((response) => {
      const users = response.data;
      console.log(`Users`, users);
    })
    .catch((error) => console.error(error));
	
}; 
;


/** 
*@GET 
* SECTION DATA
*/
/*
const getSections = () =>{

	  axios
    .get(`/api/section`) 
    .then((response) => {
      const sec = response.data;
      storage.setItem("sections", sec);
    })
    .catch((error) => console.error(error));
}
getSections();
*/
/** 
*@GET 
* SECTION_URL DATA
*/
/*
const getUrls = () =>{
	  axios
    .get(`/api/section/url`) 
    .then((response) => {
      const urls = response.data;
    storage.setItem("urls", urls);
    })
    .catch((error) => console.error(error));
}

*/

/** 
* @GET
* USER FIND
*/
/*
const findUser = (id) => {
  axios
    .get(`/api/user/${id}`)
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
/*
const createUser = (event) => {
event.preventDefault();

  const form = document.querySelector("#createUser");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    axios
      .post("/api/user/create", formData, {
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
*/

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
		toaster("Section Created", "Successfully Created New Section")
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
toaster("Url Created", "Successfully Created New Url")
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

const login = (event) => {
event.preventDefault();

   const form = document.getElementById("loginForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
axios.post("/user/login", formData, {
        headers: {
"Content-Type":"application/json"
        },
      }).then((res) => {
				//console.log(res.data)
toaster("Login", "Successfully Loged In")
		 
storage.setItem("user", res.data);
				window.location.replace('/home');

      })
      .catch((err) => {
        console.log(err);
      });
})
}
