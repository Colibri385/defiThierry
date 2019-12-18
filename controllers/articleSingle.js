const Post = require("../database/models/article")

module.exports = async (req, res) => {
    const article = await Post.findById(req.params._id)
    res.render("articles", {article})
}