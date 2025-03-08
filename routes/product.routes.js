const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// CREATE
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, price, stock, image, category_id } = req.body;
    const newProduct = await Product.create({ name, description, price, stock, image, category_id });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du produit.' });
  }
});

// READ (tous les produits) - public
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits.' });
  }
});

// READ (un seul produit) - public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé.' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// UPDATE un produit
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, description, price, stock, image, category_id } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé.' });
    
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.image = image || product.image;
    product.category_id = category_id || product.category_id;
    
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit.' });
  }
});

// DELETE un produit
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé.' });
    await product.destroy();
    res.json({ message: 'Produit supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit.' });
  }
});

module.exports = router;
