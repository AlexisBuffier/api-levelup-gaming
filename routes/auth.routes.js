const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config({ path: envFile });


const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const newUser = await User.create({
      name,
      email,
      pwd: hashedPassword,
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier l'utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.pwd);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Générer un token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ message: 'Connexion réussie.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
