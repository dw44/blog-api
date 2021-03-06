const Joi = require('@hapi/joi');

exports.registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(50)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
  });
  return schema.validate(data);
};

exports.loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

exports.newPostValidation = data => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(30)
      .required(),
    postBody: Joi.string()
      .min(1)
      .required()
  });
  return schema.validate(data);
}