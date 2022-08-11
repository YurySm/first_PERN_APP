class ApiError extends Error {
    constructor(status, messege) {
        super();
        this.status = status;
        this.message = messege;
    }

    static badRequest(messege) {
        return new ApiError(404, messege)
    }

    static internal(messege) {
        return new ApiError(500, messege)
    }

    static forbiden(messege) {
        return new ApiError(403, messege)
    }
}

module.exports = ApiError