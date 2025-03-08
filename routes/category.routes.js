const express = require('express');
const Category = require('../models/Category');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// CREATE
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la catégorie.' });
  }
});

// GET (toutes les catégories) - public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories.' });
  }
});

// GET (une seule catégorie) - public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// UPDATE
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    
    category.name = name || category.name;
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie.' });
  }
});

// DELETE
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    await category.destroy();
    res.json({ message: 'Catégorie supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie.' });
  }
});

module.exports = router;
