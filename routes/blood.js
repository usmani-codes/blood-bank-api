import express from "express";

import {
    getBloodTypes, getBloodType, createBloodType, updateBloodType, deleteBloodType, getBloodTypesCount
} from "../controllers/bloodTypesController.js";

const router = express.Router();

//get all blood types
router.get("/", getBloodTypes);

//get single blood type
router.get("/:id", getBloodType);

//create a blood type
router.post("/", createBloodType);

//update a blood type
router.put("/:id", updateBloodType);


//delete a blood type
router.delete("/:id", deleteBloodType);


//get blood types count
router.get("/get/count", getBloodTypesCount);

export default router;
