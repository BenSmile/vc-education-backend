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

module.exports.loginValidation = loginValidation;
module.exports.registrerValidation = registrerValidation;
module.exports.gradeValidation = gradeValidation;
