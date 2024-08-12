const jwt = require("jsonwebtoken");

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].replace("Bearer ", "");

        if (!token || token === "") {
            return res.status(401).json({
                success: false,
                message: "Please login to access our portal.",
            });
        }

        const decode = await jwt.decode(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(403).json({
                success: false,
                message: "Invalid token.",
            });
        }

        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
