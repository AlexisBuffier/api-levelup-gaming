const express = require('express');
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// CREATE un panier pour l'utilisateur connecté
// Si un panier existe déjà, on renvoie une erreur
router.post('/', authMiddleware, async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (existingCart) {
      return res.status(400).json({ message: 'Le panier existe déjà pour cet utilisateur.' });
    }
    const newCart = await Cart.create({ user_id: req.user.id });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du panier.' });
  }
});

// GET le panier de l'utilisateur connecté
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (!cart) return res.status(404).json({ message: 'Panier non trouvé pour cet utilisateur.' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// GET un panier par id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Panier non trouvé.' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// DELETE
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Panier non trouvé.' });
    await cart.destroy();
    res.json({ message: 'Panier supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
