const Joi = require('@hapi/joi');

const edit = Joi.object({
  category: Joi.string().guid({ version: 'uuidv1' }),
  title: Joi.string(),
  text: Joi.string(),
})
  .or('category', 'title', 'text');

const add = Joi.object({
  category: Joi.string().guid({ version: 'uuidv1' }).required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  userId: Joi.string().guid({ version: 'uuidv1' }).required(),
})
  .and('title', 'text', 'userId')
  .without('id', 'userId');

module.exports = {
  edit,
  add,
};
