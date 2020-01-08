const Joi = require('@hapi/joi');


// Products
function proValidate(data) {
  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    price: Joi.number().required(),
    origin_price: Joi.number().required(),
  });
  const result = schema.validate({
    title: data.title,
    price: data.price,
    origin_price: data.origin_price,
  });

  return result;
}

// User signUp
function signUpValidate(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(12).max(16),
    passwordCheck: Joi.string().required().valid(Joi.ref('password')),
    displayName: Joi.string().max(15).required(),
  });

  return schema.validate(data);
}

// Cart
function cartQtyValidate(data) {
  const schema = Joi.number().integer().max(50).min(1)
    .required();

  return schema.validate(data).error;
}

// Coupon
function couponValidate(data) {
  const schema = Joi.object({
    title: Joi.string().max(20).required(),
    due_date: Joi.date().min('now').required(),
    percent: Joi.number().integer().min(1).max(100)
      .required(),
    code: Joi.string().max(50).required(),
    is_enabled: Joi.number().integer().min(0).max(1)
      .required(),
  });
  const result = schema.validate({
    title: data.title,
    due_date: data.due_date,
    percent: data.percent,
    code: data.code,
    is_enabled: data.is_enabled,
  });

  return result;
}

// Order
function orderValidate(data) {
  const schema = Joi.object({
    name: Joi.string().max(15).required(),
    address: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    tel: Joi.string().required(),
    message: Joi.any(),
  });
  const result = schema.strict().validate({
    name: data.name,
    address: data.address,
    email: data.email,
    tel: data.tel,
    message: data.message,
  });

  return result;
}


module.exports = {
  proValidate,
  signUpValidate,
  cartQtyValidate,
  couponValidate,
  orderValidate,
};
