module.exports = (req, res) => {
                
    if(req.session.userId) {
    return res.render("article/modif")
}
res.redirect('/user/login')
}