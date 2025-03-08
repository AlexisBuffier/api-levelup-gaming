// routes/cartItem.routes.js
const express = require('express');
const CartItem = require('../models/CartItem');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// CREATE (ajouter un produit au panier)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { cart_id, product_id, quantity } = req.body;
    // Vérifier que le panier appartient à l'utilisateur connecté
    const cart = await Cart.findByPk(cart_id);
    if (!cart || cart.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé pour ce panier.' });
    }
    // Vérifier que le produit existe
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }
    const newCartItem = await CartItem.create({ cart_id, product_id, quantity });
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’ajout du produit au panier.' });
  }
});

// GET toutes les lignes du panier (pour un panier donné)
router.get('/cart/:cart_id', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.cart_id);
    if (!cart || cart.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé pour ce panier.' });
    }
    const items = await CartItem.findAll({
      where: { cart_id: req.params.cart_id },
      include: [ { model: Product } ] // Inclure les infos du produit
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});


// UPDATE une ligne du panier (modifier la quantité)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Ligne du panier non trouvée.' });
    
    const cart = await Cart.findByPk(cartItem.cart_id);
    if (!cart || cart.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé pour ce panier.' });
    }
    
    cartItem.quantity = quantity || cartItem.quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// DELETE une ligne du panier (retirer un produit)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Ligne du panier non trouvée.' });
    
    const cart = await Cart.findByPk(cartItem.cart_id);
    if (!cart || cart.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé pour ce panier.' });
    }
    
    await cartItem.destroy();
    res.json({ message: 'Produit retiré du panier.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
