/*
const jwt =  require("jsonwebtoken")


const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

*/
 const multer = require("multer");

const path = require("path")
/*
const isAuth = (req, res, next) => {
 const user = req.session.user
    if(user){

      next();   
   } else {
      var err = new Error("Not logged in!");
 res.redirect('/');
    // next(err);
   }
	  
			res.end();
};*/
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
	  
			res.end();
};


const storageEngine = multer.diskStorage({
  destination: path.join(__dirname, 'public', 'images', 'uploads'),
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const checkFileType = function (file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});


	module.exports = {
		isAdmin,
		//isAuth,
		upload
	}