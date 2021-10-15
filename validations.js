// Validation
const Joi = require("@hapi/joi");

//Regsiter validations

const registrerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const gradeValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required()
  });

  return schema.validate(data);
};

const courseValidation = (data) => {
  const schema = Joi.object({
    gradeID:Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  });

  return schema.validate(data);
};

const chapterValidation = (data) => {
  const schema = Joi.object({
    gradeID:Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    shortDescription: Joi.string().required(),
    image: Joi.string().required(),
  });

  return schema.validate(data);
};


module.exports.loginValidation = loginValidation;
module.exports.registrerValidation = registrerValidation;
module.exports.gradeValidation = gradeValidation;
module.exports.courseValidation = courseValidation;
module.exports.chapterValidation = chapterValidation;
