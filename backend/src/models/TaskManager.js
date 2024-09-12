const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager{
    constructor(){
        super({table:"task"});
    }
    insert(task){
        return this.database.query(`INSERT INTO ${this.table}(id_task,title,description,date_limit,priority,recurrence,date_create,modification,id_user,id_reminder) VALUES(?,?,?,?,?,?,?,?,?,?)`,
        [task.id_task,task.title,task.description,task.date_limit,task.priority,task.recurrence,task.date_create,task.modification,task.id_user,task.id_reminder]);
    }
    update(task){
        return this.database.query(`UPDATE ${this.table} set title = ?, description = ?, date_limit = ?, priority = ?, recurrence = ?, modification  = ?, id_user = ?, id_reminder = ?) WHERE id_task = ?`,
        [task.title,task.description,task.date_limit,task.priority,task.recurrence,task.date_create,task.modification,task.id_user,task.id_reminder,task.id_task]); 
    }
    delete(task){
        return this.database.query(`DELETE FROM ${this.table} WHERE id_task = ?`,
        [task.id_task])
    };
}



module.exports = TaskManager;