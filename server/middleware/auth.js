import jwt, { decode } from "jsonwebtoken";

/**
 * e.g. of how middleware works
 * user wants to like a post
 * click the like button => will come to auth middleware, which check if the user is authorized to do so
 * if it is authorized to do so, it will call the next() and proceed to the next function
 *
 * it also populate req with req.userId at the same time
 *
 * middleware is used in the routes
 */

const auth = async (req, res, next) => {
    try {
        // this token will be populated by the interceptors in routes
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET_STRING);
            req.userId = decodedData?.id;
        } else {
            //  google log in
            // we use decode instead of verify as we not using a secret string
            decodedData = jwt.decode(token);
            // sub is google oAuth "id"
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
