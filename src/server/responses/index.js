module.exports = (type, message, extra = {}) => {
    return {
        error: type === 'error',
        message: message,
        ...extra
    };
};