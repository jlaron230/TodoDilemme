// controllers/taskController.js
const TaskManager = require("../models/TaskManager"); // Importe la classe TaskManager
const taskManager = new TaskManager(); // Crée une instance de TaskManager

// Récupérer toutes les tâches
const getAllTask = (req, res) => {
    taskManager.findAll()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
            res.status(500).send("Une erreur est survenue lors de la récupération des données");
        });
};

// Créer une nouvelle tâche
const createTask = (req, res) => {
    const { title, description, date_create, date_limit, priority, recurrence, modification, id_user } = req.body;
    taskManager.insert({ title, description, date_create, date_limit, priority, recurrence, modification, id_user })
        .then((result) => {
            res.status(201).json({ id: result.insertId });
        })
        .catch((error) => {
            console.error("Erreur lors de la création des données :", error);
            res.status(500).send("Une erreur est survenue lors de la création des données");
        });
};

// Mettre à jour une tâche
const updateTask = (req, res) => {
    const { title, description, date_create, date_limit, priority, recurrence, modification, id_user } = req.body;
    const { id } = req.params;
    taskManager.update({ id_task: id, title, description, date_create, date_limit, priority, recurrence, modification, id_user })
        .then(() => res.status(200).json({ message: "Mise à jour effectuée avec succès" }))
        .catch((error) => {
            console.error("Erreur lors de la mise à jour :", error);
            res.status(500).send("Une erreur est survenue lors de la mise à jour");
        });
};

// Supprimer une tâche
const deleteTask = (req, res) => {
    const { id } = req.params;
    taskManager.delete({ id_task: id })
        .then(() => res.status(200).json({ message: "La suppression de la tâche a été effectuée avec succès" }))
        .catch((error) => {
            console.error("Erreur lors de la suppression de la tâche :", error);
            res.status(500).send("Une erreur est survenue lors de la suppression de la tâche");
        });
};

module.exports = {
    getAllTask,
    createTask,
    updateTask,
    deleteTask
};
