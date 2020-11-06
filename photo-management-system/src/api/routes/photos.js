const express = require("express");
const router = express.Router();
const {uploadImageController,updateImageDescriptionController, fetchallPhotos} = require("../controllers/photos");
const {upload} = require("../../helpers/uploadImage");
const {uploadImageValidation, updateImageDescriptionValidation} = require("../middleware/validation-auth");


router.put("/:imageId", updateImageDescriptionValidation, updateImageDescriptionController );
router.post("/", upload.any(), uploadImageValidation, upload.single('image'), uploadImageController);
router.get("/", fetchallPhotos);

module.exports = router;