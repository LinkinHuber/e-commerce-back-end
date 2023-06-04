const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const inquireCategory = await Category.findAll( {
      include: [{ model: Product}]
    });
    res.status(200).json(inquireCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const inquireCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    if (!inquireCategory) {
      res.status(404).json({ message: 'Invalid category id' });
      return;
    }

    res.status(200).json(inquireCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const inquireCategory = await Category.create(req.body);
    res.status(200).json(inquireCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    req.body, 
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const inquireCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
  
    if (!inquireCategory) {
      res.status(404).json({ message: 'Invalid category id'});
      return;
    }

    res.status(200).json(inquireCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
