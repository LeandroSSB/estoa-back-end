import { userServices } from './../services/index.js'

export const authMiddleware = async(req, _res, next) => {
try {
  const auth = await userServices.loginUser(req.body)
  req.auth = auth
  return next()
} catch (error) {
  return next(error);
}
}