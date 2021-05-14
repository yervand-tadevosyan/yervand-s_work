const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')

app.use(express.static("public"));

// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '472980720305-oloeeeoq7gp172b1sjrj1dqtoud16daa.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const PORT = process.env.PORT || 5001;

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());


app.get("/", checkAuthenticated,  (req,res) => {
    res.render('login');
})

app.get('/login',checkAuthenticated, (req, res)=>{
	res.render('login');
})

app.post('/login', (req, res)=>{
	let token = req.body.token;
	console.log(token);
	async function verify() {
	const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  console.log(payload);
}
verify()
.then(()=>{
	res.cookie('session-token', token);
    res.send('success');
}).
catch(console.error);
})

app.get('/', checkAuthenticated, (req, res)=>{
	let user = req.user;
	res.render('index', {user});
})

app.get("/index", checkAuthenticated,  (req,res) => {
    res.render('index');
})

app.get('/protectedroute', checkAuthenticated, (req, res)=>{
	res.render('protectedroute');
})

app.get('/logout',checkAuthenticated, (req, res)=>{
	res.claerCookie('session-token');
	res.redirect('/login');
})


function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login');
      })

}

// Views folder

app.get("/admin", checkAuthenticated, (req, res) => {
	res.render("admin");
})

app.get("/book", checkAuthenticated, (req, res) => {
	res.render("book");
})

app.get("/tennis", checkAuthenticated, (req, res) => {
	res.render("tennis");
})

app.get("/edit_book", checkAuthenticated, (req, res) => {
	res.render("edit_book");
})

app.get("/edit_tennis", checkAuthenticated,(req, res) => {
	res.render("edit_tennis");
})

//____


app.listen(PORT, () =>{
    console.log("Server Started on:" + PORT);
})