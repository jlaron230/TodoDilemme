const express =  require("express");
const UserManagerClass = require("../models/UserManager");

const router = express.Router();
const UserManager = new UserManagerClass();

exports.getAllUsers = (req, res) => {
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

exports.CreateUser = (req, res) => {
  const { id_user,name_user,email_user,mdp_user } = req.body; // Correction de la déstructuration

  UserManager.insert({ id_user,name_user,email_user,mdp_user }) // Suppression du point-virgule après Insert
    .then((result) => {
      res.status(201).json({ id: result.insertId }); // Correction possible du nom de la clé
    })
    .catch((error) => {
      console.error("Erreur lors de la création de l'utilisateur :", error); // Log d'erreur
      res.status(500).send("Une erreur est survenue.");
    });
};

exports.updateUser = (req,res) => {
  const {name_user,email_user,mdp_user} = req.body;
  const {id} = req.params;
  UserManager.update({id_user : id,name_user,email_user,mdp_user})
  .then(() => res.status(200).json({message: "Mise a jour effectuéeavec succés"}))
  .catch((error) => res.status(500).send("Une erreur est survenus lors de la mise a jour"))
};

exports.DeleteUser = (req, res) => {
  const { id } = req.params; // Récupère l'ID de l'utilisateur à partir des paramètres d'URL

  UserManager.delete({ id_user: id })
    .then(() => res.status(200).json({ message: "La suppression de l'utilisateur a été effectuée avec succès" }))
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      res.status(500).send("Une erreur est survenue lors de la suppression");
    });
};


module.exports = router
