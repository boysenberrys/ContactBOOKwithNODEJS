import { constants } from "../utils/constants.mjs";

export const errorHandler = (err, req, res, next)=> {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({msg: err.message, stackTrace: err.stack});
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title: "validation failed",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.UNAUTHORISED:
            res.json({
                title:"Unauthorised",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.FORBIDDEN:
            res.json({
                title:"forbidden",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.NOT_FOUND:
            res.json({
                title:"Not found",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.SERVER_ERROR:
            res.json({
                title:"Server error",
                message: err.message,
                stackTrace: err.stack
            });
        default:
            console.log("No error, all good")
            break;
    }   
}