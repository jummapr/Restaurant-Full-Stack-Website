const AuthController = () => {
    return {
        Register(req,res) {
            res.render("auth/register")
        },
        Login(req,res) {
            res.render("auth/login")
        }
    }
}

module.exports = AuthController