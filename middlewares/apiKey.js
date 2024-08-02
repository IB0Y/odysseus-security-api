export const isAutheticated = async (req, res, next) => {
    const apiKey = req.headers['api-key'];
    if (apiKey === process.env.API_KEY) {
        next();
    } else {
        return ResponseService.unauthorized({ res });
    }
}