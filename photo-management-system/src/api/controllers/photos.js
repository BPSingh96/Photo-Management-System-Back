const Photo = require("../models/photos");
const Photos = require("../models/photos");
const mongoose = require("mongoose");


 /**
    * for upload image in public folder and description.
    * @param req
    * @param res
    * @param next
    * @property {string} req.file.image - image for upload
    * @returns {data,message,status}
    */
const  uploadImageController = (req, res, next) => {
    try {
        if (req.file && req.file.fieldname === "image") {
            let imageId = new mongoose.Types.ObjectId();
                    const photos = new Photos({
                        _id: imageId,
                        imageFileName: req.file.filename,
                        descriptions: req.body.description
                    });
                    photos
                        .save()
                        .then(result => {
                            if (!result) return res.status(200).json({
                                response: true,
                                message: "Something went wrong",
                                status: false
                            });
                        result.imageId = result._id;
                        result.imageURL = `http://${process.env.HOSTNAME}:${process.env.PORT}/image${result.imageFileName}`
                        delete result._id;

                        let responseData = {
                            response: true,
                            data: result,
                            message: "Uploaded Successfully.",
                            status: false
                        }
                        return res.status(200).json(responseData);
                    }).catch(err=>{
                        res.status(200).json({
                            response: true,
                            message: String(error),
                            status: false
                        });
                    }).catch(err=>{
                        res.status(200).json({
                            response: true,
                            message: String(err),
                            status: false
                        });
                    });
        } else return res.status(200).json({
            response: true,
            message: "Invalid File",
            status: false
        });
    }catch (error) {
         res.status(200).json({
            response: true,
            message: String(error),
            status: false
        });
    }
}

 /**
    * for update photo descriptions.
    * @param req
    * @param res
    * @param next
    * @property {string} req.body.descriptions 
    * @returns {data,message,status}
    */
   const  updateImageDescriptionController = async (req, res, next) => {
    try {
        const query = Photos.findById(req.params.imageId);
        const result = await query.exec();
        result.descriptions = req.body.descriptions;
        result.save()
        .then(_imageUpdate=>{
            if (!_imageUpdate) return res.status(200).json({
                response: true,
                message: "Something went wrong",
                status: false
            });
            _imageUpdate.imageId = result._id;
            _imageUpdate.imageURL = `http://${process.env.HOSTNAME}:${process.env.PORT}/image${_imageUpdate.imageFileName}`
        delete _imageUpdate._id;

        let responseData = {
            response: true,
            data: _imageUpdate,
            message: "Updated Successfully.",
            status: false
        }
        return res.status(200).json(responseData);
        }).catch();
    }catch (error) {
        return res.status(200).json({
            response: true,
            message: String(error),
            status: false
        });
    }
}

 /**
    * for fetch all photos.
    * @param req
    * @param res
    * @param next
    * @property 
    * @returns {data,message,status}
    */
    const  fetchallPhotos = async (req, res, next) =>{
    try {
        let limit = 10;
        let skip = isNaN(req.query.page) ? 0 : Number(req.query.page);
        skip = skip > 1 ? skip * limit - limit : 0;
        const query = Photos.aggregate([
            {$match: {imageFileName:{ $exists: true}}},
            { $project: {
                createdAt: 1,
                updatedAt: 1,
                descriptions: 1,
                imageURL:{ $concat: [`http://${process.env.HOSTNAME}:${process.env.PORT}/image`, '$imageFileName'] } }},
                {$skip: skip},
                {$limit: limit}
          ]);
        const result = await query.exec();
        let message = result.length? "seccussfully fetch": "Data not found";
        return res.status(200).json({
            response: true,
            data: result,
            message: message,
            status: true
        });

    }catch (error) {
        res.status(200).json({
            response: true,
            message: String(error),
            status: false
        });
    }
}


module.exports = { uploadImageController, updateImageDescriptionController, fetchallPhotos }

