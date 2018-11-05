require('dotenv').config();
exports.get = (req, res, next) => {
    res.status(200).json({
        status: "ok",
        authGroup: ['USER']
    });
};