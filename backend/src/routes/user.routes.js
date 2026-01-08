import { Router } from "express"
import { createUser, getUser, loginUser, logoutUser } from "../controllers/user.controller.js"
import authenticate from "../middlewares/authenticate.middleware.js"

const userRouter = Router()

userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/me', authenticate, getUser)
userRouter.post('/logout', authenticate, logoutUser)

export default userRouter;