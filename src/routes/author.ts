import { Router, Request, Response } from "express";
import {body, param, validationResult} from 'express-validator'
import { authorsList, getAllAuthors } from "../controller/author";

const router = Router()


router.get("/", (req : Request, res : Response) => {
    res.status(200).json({msg : "Server Running!"})
})

router.get("/authors", (req : Request, res : Response) => {
    const authors = getAllAuthors()
    res.status(200).json(authors)
})

export default router
