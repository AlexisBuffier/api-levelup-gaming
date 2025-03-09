require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const allowedOrigins = ['http://localhost:3001'];

// Import des routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const cartRoutes = require('./routes/cart.routes');
const cartItemRoutes = require('./routes/cartItem.routes');

const app = express();

// Middleware global
app.use(cors());  
app.use(express.json());       // pour parser le JSON
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Origine non autorisée par CORS'));
    }
  }
}));

// Vérifier la connexion à la DB
sequelize.authenticate()
  .then(() => {
    console.log('Connecté à la base de données MySQL avec succès.');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données :', err);
  });

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/cart-items', cartItemRoutes);
app.use('/api/users', userRoutes);

// Synchroniser les modèles avec la DB
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de données synchronisée.');
  })
  .catch((err) => {
    console.error('Erreur de synchronisation :', err);
  });

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
