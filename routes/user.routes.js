const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET ALL users
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// GET user par id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// UPDATE user
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.pwd = hashedPassword;
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// DELETE user
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    await user.destroy();
    res.json({ message: 'Utilisateur supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
