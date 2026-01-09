import { Router } from "express"
import { createMovie, deleteMovie, getMovieById, searchMovies, updateMovie } from "../controllers/movie.controller.js"
import authenticate from "../middlewares/authenticate.middleware.js"
import isAdmin from "../middlewares/isadmin.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const movieRouter = Router()

movieRouter.get('/search', searchMovies)
movieRouter.get('/:id', getMovieById)
movieRouter.post('/', authenticate, isAdmin, upload.single('poster'), createMovie)
movieRouter.put('/:id', authenticate, isAdmin, updateMovie)
movieRouter.delete('/:id', authenticate, isAdmin, deleteMovie)

export default movieRouter;