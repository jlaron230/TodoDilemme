const models = require("../models");

// Récupère toutes les catégories
const findAllCategory = async (req, res) => {
  try {
    const [rows] = await models.category.findAllCategory(); // Appel au modèle
    res.send(rows); // Envoie les résultats
  } catch (error) {
    console.error(error); // Affiche l'erreur dans la console
    res.sendStatus(500); // Envoie un statut 500 en cas d'erreur
  }
};

// Récupère une catégorie par son ID
const findCategoryByID = async (req, res) => {
  const category = req.params.id; // Récupère l'ID de la catégorie
  try {
    const [rows] = await models.category.findCategory(category); // Appel au modèle
    if (rows[0] === null) {
      res.sendStatus(404); // Envoie un statut 404 si non trouvé
    }
    res.send(rows[0]); // Envoie la catégorie trouvée
  } catch (error) {
    console.error(error); // Affiche l'erreur dans la console
    res.sendStatus(500); // Envoie un statut 500 en cas d'erreur
  }
};

// Met à jour une catégorie
const edit = async (req, res) => {
  const category = req.body; // Récupère les données de la catégorie

  // TODO validations (length, format...)
  category.id = parseInt(req.params.id, 10); // Définit l'ID de la catégorie

  try {
    const [result] = await models.category.update(category); // Appel au modèle
    if (result.affectedRows === 0) {
      res.sendStatus(404); // Envoie un statut 404 si non trouvé
    }
    res.sendStatus(204); // Envoie un statut 204 si mise à jour réussie
  } catch (error) {
    console.error(error); // Affiche l'erreur dans la console
    res.sendStatus(500); // Envoie un statut 500 en cas d'erreur
  }
};

// Ajoute une nouvelle catégorie
const add = async (req, res) => {
  const category = req.body; // Récupère les données de la nouvelle catégorie

  // TODO validations (length, format...)
  try {
    const [result] = await models.category.insert(category); // Appel au modèle
    res.location(`/category/${result.insertId}`).sendStatus(201); // Envoie un statut 201 avec l'URL
  } catch (err) {
    console.error(err); // Affiche l'erreur dans la console
    res.sendStatus(500); // Envoie un statut 500 en cas d'erreur
  }
};

// Supprime une catégorie
const destroy = async (req, res) => {
  const category = req.params.id; // Récupère l'ID de la catégorie
  try {
    const [result] = await models.category.delete(category); // Appel au modèle
    if (result.affectedRows === 0) {
      res.sendStatus(404); // Envoie un statut 404 si non trouvé
    } else {
      res.sendStatus(204); // Envoie un statut 204 si suppression réussie
    }
  } catch (error) {
    console.error(error); // Affiche l'erreur dans la console
    res.sendStatus(500); // Envoie un statut 500 en cas d'erreur
  }
};

// Récupère les catégories par utilisateur
const getCategoryByUsers = async (req, res) => {
  const userId = parseInt(req.params.userId, 10); // Récupère l'ID de l'utilisateur

  try {
    const [result] = await models.category.findCategoryByUsers(userId); // Appel au modèle
    if (!result.length) {
      res.sendStatus(404); // Envoie un statut 404 si aucune catégorie trouvée
    } else {
      res.send(result); // Envoie les catégories trouvées
    }
  } catch (error) {
    console.error(error); // Affiche l'erreur dans la console
    res.sendStatus(500); // Envoie un statut 500 en cas d'erreur
  }
};

module.exports = {
  findAllCategory,
  findCategoryByID,
  edit,
  add,
  destroy,
  getCategoryByUsers,
};
