import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use('/css/bootstrap', express.static('node_modules/bootstrap/dist/css'));
app.use('/js/bootstrap', express.static('node_modules/bootstrap/dist/js'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
let posts = [];
let index = 0;





app.post('/create-post', (req, res) => {
    const requestData = req.body; 
    const title = requestData.title;
    const content = requestData.content;
    const date = new Date().toLocaleDateString();
    const newPost = { title, content, date };
    posts.push(newPost);
    res.redirect('/home-after-login');
});

app.post('/update-post', (req, res) => {
    const requestData = req.body; 
    posts[index].title = requestData.title;
    posts[index].content = requestData.content;
    posts[index].date = new Date().toLocaleDateString();
    res.redirect('/home-after-login');
});


app.post('/edit/:index', (req, res) => {
    index = parseInt(req.params.index);
    const postt = posts[index];
    res.render("update-post.ejs", { postt });
});
app.post('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    posts.splice(index, 1);
    res.redirect('/home-after-login');
});
app.post('/loginP', (req,res) => {
    if (req.body["Username"] === "ahmed@gmail.com" && req.body["password"] === "123456")
    { 
        res.redirect('/home-after-login');
    }

});


app.get("/home-after-login", (req, res) => {
    res.render("home-after-login.ejs", { posts });
});
app.get("/post-p",(req,res) => {
    res.render("post-p.ejs");
});
app.get("/",(req,res) => {
    res.render("home-before-login.ejs");
});
app.post("/home-before-login", (req, res) => {
    res.render("home-before-login.ejs");
});

app.post("/siginup", (req, res) => {
    res.render("siginup.ejs");
});
app.post("/login", (req, res) => {
    res.render("login.ejs");
});

app.listen(port, (req, res) => {
    console.log("your serveer is up and running");
});
