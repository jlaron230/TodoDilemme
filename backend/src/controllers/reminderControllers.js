const models = require("../models");

// Méthode pour le traitement de l'affichage des données depuis la table "reminder"
const browse = async (req, res) => {
  try {
    // Récupère toutes les données de la table "reminder" à partir du modèle
    // "findAll()" retourne un tableau contenant les enregistrements
    const [rows] = await models.reminder.findAllReminder();

    // Envoie les données récupérées en réponse
    res.send(rows);
  } catch (err) {
    // Affiche l'erreur dans la console et envoie un statut 500 en cas de problème
    console.error(err);
    res.send(500);
  }
};

//Méthode pour le traitement de l'affichage de données par id depuis la table "reminder"
const read = async (req, res) => {
  try {
    //Récupère les données par ID de la table Reminder à partir du modèle
    //"find" retourne les enregistrement par ID de la table reminder
    const [rows] = await models.reminder.findReminder(req.params.id);
    if (!rows.length) {
      res.send(404);
    }
    res.send(rows[0]);
  } catch (err) {
    //Affiche l'erreur dans la console et envoie un statut 500
    console.error(err);
    res.send(500);
  }
};

//Méthode pour l'édition des valeurs depuis la table reminder
const edit = async (req, res) => {
  const reminder = req.body;

  //Conversion de l'Id reminder en entier à partir d'une valeur en string
  reminder.id = parseInt(req.params.id, 10);

  try {
    //Enregistre les nouvelles données par ID de la table Reminder à partir du modèle
    const [result] = models.reminder.update(reminder);
    if (result.affectedRows === 0) {
      res.send(404);
    }
    res.send(204);
  } catch (err) {
    //Affiche les erreurs dans la console
    console.error(err);
    err.send(500);
  }
};

//Méthode pour l'ajout de valeur depuis la table reminder
const add = async (req, res) => {
  //Récupère le corps de la requete et son contenu
  const reminder = req.body;
  try {
    //Ajoute les nouvelles données par L'Id depuis la table reminder
    const [result] = await models.reminder.insert(reminder);
    res.location(`/reminder/${result.insertId}`).send(201);
  } catch (err) {
    //Affiche les erreurs dans la console
    console.error(err);
    res.send(500);
  }
};

//Méthode pour la suppression de valeur depuis la table reminder
const destroy = async (req, res) => {
  try {
    //Supprime les nouvelles données par L'Id séléctionner depuis la table reminder
    const [result] = await models.reminder.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.send(404);
    }
    res.send(204);
  } catch (err) {
    //Affiche les erreurs dans la console
    console.error(err);
    res.send(500);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
