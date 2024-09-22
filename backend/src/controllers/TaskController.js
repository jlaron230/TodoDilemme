const express = require("express");
const TaskManager = require("../models/TaskManager"); // Importe la classe TaskManager
const taskManager = new TaskManager(); // Crée une instance de TaskManager
const router= express.Router();

exports.getAllTask = (req, res) => {
    taskManager.findAll()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error("erreur lors de la recuperation de données:", error);
            res.status(500).send("Erreur est survenue lors de la recuperation de données");
        });
};

exports.CreateTask = (req, res)=>{
    const {title,description,date_create,date_limit,priority,recurrence,modification,id_user} = req.body;
    taskManager.insert({title,date_create,description,date_limit,priority,recurrence,modification,id_user})
    .then((result) => {
        res.status(201).json({id : result.insertId});
    })
    .catch((error) => {
        console.error("erreur lors de la creation de données:", error);
        res.status(500).send("Erreur est survenue lors de la creation de données");
    });
}

exports.updateTask = (req,res) =>{
    const {title,description,date_create,date_limit,priority,recurrence,modification,id_user} = req.body;
    const {id} = req.params;
    taskManager.update({id_task:id,title,description,date_limit,priority,recurrence,date_create,modification,id_user })
    .then(() => res.status(200).json({message: "Mise a jour effectuée avec succés"}))
    .catch((error) => res.status(500).send("Une erreur est survenus lors de la mise a jour"))
};

exports.deleteTask =(req,res) =>{
    const {id} = req.params;
    taskManager.delete({ id_task: id })
    .then(() => res.status(200).json({message : "La suppression de la tache a eté fait avec succés"}))
    .catch((error) => res.status(500).send("Erreur est survenue lors de la suppression de la tache"))
};
    
module.exports = router;