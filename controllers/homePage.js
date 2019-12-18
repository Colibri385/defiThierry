const Post = require("../database/models/article")

module.exports = async (req, res) => {
        //attend le retour de la requete pour afficher le contenu de la BDD
        const posts = await Post.find({})
        
        res.render("index", {posts}
        )}

