module.exports = (req,res, next) => {
    // si pas de fichier ou pas de Titre
    if(!req.files || !req.body.title) {
        return res.redirect("/")
    }
    // console.log("Je suis un Middleware");
    next()
}