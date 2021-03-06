const Category = require('./models/category');
const schema = require('./schemas/category');
/**
 * POST a new category
 */
async function create(req, res) {
  const { error } = schema.add.validate(req.body);
  if (error) {
    return res.status(422).json({
      status: 'error',
      error: error.message,
    });
  }

  const theCategory = await Category.create(req.body);
  return res.status(201).json({
    status: 'success',
    data: theCategory,
  });
}


/**
 * GET category by id
 */
async function findById(req, res) {
  const theCategory = await Category.findById(req.params.id);

  if (!theCategory) {
    return res.status(404).json({
      status: 'error',
      error: 'No category by that identifier.',
    });
  }
  return res.json({
    status: 'success',
    data: theCategory,
  });
}

/**
 * EDIT category
 */
async function edit(req, res) {
  const { error } = schema.edit.validate(req.body);
  if (error) {
    return res.status(422).json({
      status: 'error',
      error: error.message,
    });
  }

  const theCategory = await Category.findById(req.params.id);
  if (!theCategory) {
    return res.status(404).json({
      status: 'error',
      error: 'No category by that identifier.',
    });
  }

  const opts = { name: req.body.name, id: req.params.id };
  const updatedCategory = await Category.update(opts);
  return res.json({
    status: 'success',
    data: updatedCategory,
  });
}


/**
 * DELETE category
 */
// function destroy(_req, res) {
//   res.status(500).json({
//     status: 'error',
//     error: 'Method not implemented',
//   });
// }

module.exports = {
  create,
  findById,
  edit,
  // destroy,
};
