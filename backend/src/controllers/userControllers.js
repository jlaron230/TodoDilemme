// controllers/userController.js
const UserManagerClass = require("../models/UserManager");
const UserManager = new UserManagerClass();

// Récupérer tous les utilisateurs
const getAllUsers = (req, res) => {
  const user = req.query.user;
  UserManager.findAll(user)
    .then((result) => {
      res.json(result);  
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);  // Log de l'erreur
      res.status(500).send("Erreur lors de la récupération des données");
    });
};

// Créer un nouvel utilisateur
const createUser = (req, res) => {
  const { id_user, name_user, email_user, mdp_user } = req.body; // Correction de la déstructuration

  UserManager.insert({ id_user, name_user, email_user, mdp_user }) // Suppression du point-virgule après insert
    .then((result) => {
      res.status(201).json({ id: result.insertId }); // Correction possible du nom de la clé
    })
    .catch((error) => {
      console.error("Erreur lors de la création de l'utilisateur :", error); // Log d'erreur
      res.status(500).send("Une erreur est survenue.");
    });
};

// Mettre à jour un utilisateur
const updateUser = (req, res) => {
  const { name_user, email_user, mdp_user } = req.body;
  const { id } = req.params;
  UserManager.update({ id_user: id, name_user, email_user, mdp_user })
    .then(() => res.status(200).json({ message: "Mise à jour effectuée avec succès" }))
    .catch((error) => {
      console.error("Erreur lors de la mise à jour :", error);
      res.status(500).send("Une erreur est survenue lors de la mise à jour");
    });
};

// Supprimer un utilisateur
const deleteUser = (req, res) => {
  const { id } = req.params; // Récupère l'ID de l'utilisateur à partir des paramètres d'URL

  UserManager.delete({ id_user: id })
    .then(() => res.status(200).json({ message: "La suppression de l'utilisateur a été effectuée avec succès" }))
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      res.status(500).send("Une erreur est survenue lors de la suppression");
    });
};

// Export des fonctions
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
