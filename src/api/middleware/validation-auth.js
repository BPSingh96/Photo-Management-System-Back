const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);


	/**
	 * validate photo info, and return a next to handle the request in next step
	 * @param req
	 * @param res
	 * @param next
	 * @property {string} req.body
	 * @returns {next}
	 */
	uploadImageValidation =(req, res, next)  =>{
		let uploadImage = Joi.object().keys({
			filename: Joi.string().trim().required(),
			descriptions: Joi.array().items(
                Joi.object({
                    content: Joi.string().trim().required(),
                    ratio: Joi.number().max(100).required(),
                })
            ).min(1).required()
    
		});
		const { error } = uploadImage.validate(req.body, {
			abortEarly: false,
		});
		if (!error) {
			let descriptions = req.body.descriptions;
			let ratioSum = 0;
			let contents = {}, isduplicate = false;
			for (ele in descriptions){
				if (contents[descriptions[ele].content ? descriptions[ele].content.trim(): undefined]){
				   isduplicate = true;
				   break;
				}
				contents[descriptions[ele].content] = descriptions[ele].content;
                ratioSum += descriptions[ele].ratio;
			}
			if(isduplicate){
				const err = new Error("can't allow duplicate entries.");
				err.status = 200;
				next(err)
			}
			else if (ratioSum === 100) next();
			else {
				const err = new Error("Word with percentage allocation is not valid.");
				err.status = 200;
				next(err)
			}
		} else {
            const errorMessages = error.details.map((detail) => detail.message);
            const err = new Error(errorMessages);
            err.status = 401;
			next(err);
		}
	};

	/**
	 * validate photos info, and return a next to handle the request in next step
	 * @param req
	 * @param res
	 * @param next
	 * @property {string} req.body
	 * @returns {next}
	 */
	updateImageDescriptionValidation = (req, res, next) => {
		let updateImageDescription = Joi.object().keys({
            descriptions: Joi.array().items(
                Joi.object({
                    content: Joi.string().trim().required(),
                    ratio: Joi.number().max(100).required(),
                })
            ).min(1).required()
		});
		const { error } = updateImageDescription.validate(req.body, {
			abortEarly: false,
		});
		if (!error) {
			const imageId = req.params.imageId;
			const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
			if (checkForHexRegExp.test(imageId)){
			let descriptions = req.body.descriptions;
			let ratioSum = 0;
			let contents = {}, isduplicate = false;
			for (ele in descriptions){
				if (contents[descriptions[ele].content ? descriptions[ele].content.trim(): undefined]){
				   isduplicate = true;
				   break;
				}
				contents[descriptions[ele].content] =descriptions[ele].content;
                ratioSum += descriptions[ele].ratio;
			}
			if(isduplicate){
				const err = new Error("can't allow duplicate entries.");
				err.status = 200;
				next(err)
			}
			else if (ratioSum === 100) next();
			else {
				const err = new Error("Word with percentage allocation is not valid.");
				err.status = 200;
				next(err)
			}
		}else{
			const err = new Error("Invalid Image Id.");
				err.status = 200;
				next(err)
		}
		} else {
			const errorMessages = error.details.map((detail) => detail.message);
            const err = new Error(errorMessages);
            err.status = 401;
			next(err);
		}
	};



module.exports = {uploadImageValidation, updateImageDescriptionValidation }