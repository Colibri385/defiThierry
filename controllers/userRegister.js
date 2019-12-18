
// Récupère le schema de la BDD
const User = require ('../database/models/user')

// prends les données de la page body (email name ect.. puis return page accueil)
module.exports = (req,res) => {
    User.create(req.body, (error,user) => {

        if (error) {
            const registerError = Object.keys(error.errors).map(key => error.errors[key].message);
            
            // module npm qui gère les messages flash
            req.flash("registerError",registerError)
            req.flash('data', req.body)

            return res.redirect('/user/create')
        }
        res.redirect('/')
    }) 
   }