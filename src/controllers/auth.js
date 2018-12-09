//Middleware for verifying if the user is logged in
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        message: "Unauthorized"
    })
};

exports.isLoggedOut= (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.status(500).json({
        message: "Already logged in"
    })
};
