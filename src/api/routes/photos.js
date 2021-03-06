const express = require("express");
const router = express.Router();
const {uploadImageController,updateImageDescriptionController, fetchallPhotos, uploadImageDetailsController} = require("../controllers/photos");
const {upload} = require("../../helpers/uploadImage");
const {uploadImageValidation, updateImageDescriptionValidation} = require("../middleware/validation-auth");


router.put("/:imageId", updateImageDescriptionValidation, updateImageDescriptionController );
router.post("/",  upload.single('image'), uploadImageController);
router.post("/add",  uploadImageValidation, uploadImageDetailsController);
router.get("/", fetchallPhotos);


module.exports = router;