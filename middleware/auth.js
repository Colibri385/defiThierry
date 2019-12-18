const User = require ('../database/models/user')

module.exports = (req, res, next) => {

    // connecte-toi dans la base de données avec Id

User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect('/user/login')
        }
        next()
})

}