const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const connectFlash = require('connect-flash')
const {stripTags} = require('./helpers/hbs')

// Controler //
// Articles
const articleSingleController = require('./controllers/articleSingle')
const articleAddController =require('./controllers/articleAdd')
const articlePostController =require ('./controllers/articlePost')
const articleModifController = require('./controllers/articleModif')
const homePage = require ('./controllers/homePage')
// USER 
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')


// Port local //
const port = 2000

const app = express()
// Mongoose //
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true,  useUnifiedTopology: true})

const mongoStore = MongoStore(expressSession)

app.use(connectFlash())

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store : new mongoStore ({
        mongooseConnection: mongoose.connection
    })

  }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileUpload())

const auth = require('./middleware/auth')
const redirectAuthSucces = require('./middleware/redirectAuthSucces')


const Handlebars = require('handlebars')
const MomentHandler = require('handlebars.moment')
MomentHandler.registerHelpers(Handlebars);

// Post
app.use(express.static('public'));

// Route

app.engine('handlebars', exphbs({
    helpers : {
        stripTags :stripTags
    },
    defaultLayout: 'main'}));

app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {
 res.locals.user = req.session.userId;
 // console.log(res.locals.user);
 next()
})


// Middleware
const articleValidPost = require('./middleware/articleValidPost')
 
 // s'il y a un post sur url 'article/post' applique le middleware
app.use('/articles/post', articleValidPost)
// app.use('/articles/add', auth)

// methode Get sur page d'acceuil index.handlebars '/'
app.get('/', homePage) // affiche la collection

// Page articles //
// Ajoute articledb.
app.get('/articles/add', auth, articleAddController)
app.get('/articles/modif', auth, articleModifController)
app.get('/articles/:_id', articleSingleController)
app.post('/articles/post', auth, articleValidPost, articlePostController)

// Users (tu mets le chemin que tu désires) 
app.get('/user/create', redirectAuthSucces, userCreate)
app.post('/user/register', redirectAuthSucces, userRegister)
app.get('/user/login', redirectAuthSucces, userLogin)
app.post('/user/loginAuth', redirectAuthSucces, userLoginAuth)
app.get('/user/logout', userLogout)


// Contact
app.get('/contact', (req, res) => {
    res.render('contact')
})
 // si page inconnue alors aller vers fichier error 404
app.use((req,res,)=> {
    res.render('error404')
})

// Port du serveur

app.listen(port, function () {
    console.log(`Le serveur tourne sur le port ${port}, lancé à ${new Date().toLocaleString()}`)
})


