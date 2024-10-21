const models = require("../models");
const TaskReminderManager = require("../models/TaskReminderManager");

// Met à jour un rappel de tâche
const updateTaskReminder = async (req, res) => {
  // TODO validations (length, format...)
  const taskReminder = { ...req.body, id_task_reminders: parseInt(req.params.id, 10) }; // Récupère les données et l'ID

  try {
    await models.taskReminder.update(taskReminder); // Appel au modèle pour mise à jour
    res.sendStatus(200); // Envoie un statut 200 si succès
  } catch (err) {
    console.error(err); // Affiche l'erreur dans la console
    res.status(500).send("erreur lors de la mise à jour de la tache/rappel"); // Envoie un message d'erreur
  }
};

// Ajoute un nouveau rappel de tâche
const add = async (req, res) => {
  const taskReminder = req.body; // Récupère les données du rappel

  try {
    const [result] = await models.taskReminder.insert(taskReminder); // Appel au modèle pour insertion
    res.location(`/taskReminders/${result.insertId}`).sendStatus(201); // Envoie un statut 201 avec l'URL
  } catch (err) {
    console.error(err); // Affiche l'erreur dans la console
    res.status(500).send("erreur lors de l'ajout de la tache/rappel"); // Envoie un message d'erreur
  }
};

// Supprime un rappel de tâche
const destroy = async (req, res) => {
  const taskReminder = req.params.id; // Récupère l'ID du rappel
  try {
    const [result] = await models.taskReminder.delete(taskReminder); // Appel au modèle pour suppression
    if (result.affectedRows === 0) {
      res.sendStatus(404); // Envoie un statut 404 si non trouvé
    } else {
      res.sendStatus(204); // Envoie un statut 204 si suppression réussie
    }
  } catch (err) {
    console.error(err); // Affiche l'erreur dans la console
    res.status(500).send("erreur lors de la suppression de la tache/rappel"); // Envoie un message d'erreur
  }
};

module.exports = {
  updateTaskReminder,
  add,
  destroy,
};
