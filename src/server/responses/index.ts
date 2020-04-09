export default (type: string, message: any, extra = {}) => {
  return {
    error: type === 'error',
    message: message,
    ...extra
  };
};
