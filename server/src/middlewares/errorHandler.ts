import { ErrorRequestHandler } from 'express';




const types = {
    SIMPLE: 'SIMPLE',
    ZOD_FLATTENED: 'ZOD_FLATTENED',
    DB_OPERATION: 'DB_OPERATION',
    UNHANDLED_ERROR: 'UNHANDLED_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
};

const errorHandler: ErrorRequestHandler = async (error, req, res) => {
    // Here we could log the error in a specific logger or send the error to a monitoring service depending wheter we are in production or development
    // logger.log('error', error); 

    // Custom error (If we create a custom error classese)
    // if (error instanceof CustomError) {
    //     return res.status(error.status).json({
    //         ok: false,
    //         _type: types.SIMPLE,
    //         detail: error.detail,
    //     });
    // }


    // Mongo error
    if (error.name === 'MongoError') {
        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                _type: types.DB_OPERATION,
                detail: 'There was a duplicate key error',
                error: JSON.stringify(error),
            });
        }
        return res.status(500).json({
            ok: false,
            _type: types.DB_OPERATION,
            detail: 'Unhandled error',
            error: JSON.stringify(error),
        });
    }

    // Other Errors

    return res.status(500).json({
        ok: false,
        _type: types.UNHANDLED_ERROR,
        detail: 'Unhandled error',
        error: JSON.stringify(error),
    });
};

export default errorHandler;
