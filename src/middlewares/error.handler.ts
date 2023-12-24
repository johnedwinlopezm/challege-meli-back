
export function validateAuthorization(req, res, next) {
    const { name , lastname } =  req.headers;
    if( name && lastname){
        next()
    } else{
        res.status(401).send(
            'Unauthorized'
        );
    }
    
}
export function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

export function errorHandler(err, req, res, next) {
    res.status(201).json(
        {
            message: err.message,
            stack: err.stack
        }
    );
}
