
const path = require("path")
const Post = require("../database/models/article")

module.exports = (req, res) => {

    // envoyer img dans dossier static articles 
    // récupère l'image 
    const {image} = req.files
    const uploadFile = path.resolve(__dirname, '..' ,'public/articles', image.name)

    // afficher image  
    image.mv(uploadFile, (error) => {
        Post.create(
            {
            ...req.body, 
            image : `/articles/${image.name}`
            }
            ,(error, post) => {
            res.redirect("/")
        })
    })
}