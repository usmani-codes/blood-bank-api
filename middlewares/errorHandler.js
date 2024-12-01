export const errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({ msg: err.Doner })
    } else {
        res.status(500).json({ msg: err.Doner })
    }

}