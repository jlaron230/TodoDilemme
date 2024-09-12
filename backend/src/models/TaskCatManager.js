const AbstractManager = require("./AbstractManager");

class TaskCatManager extends AbstractManager{
    constructor(){
        super({table: "task_cat"})
    }
    insert(task_cat){
        return this.database.query(`INSERT INTO ${this.table} (id_category,id_task) VALUES(?,?)`,
        [task_cat.id_category,task_cat.id_task]    
        )
    };
    update(task_cat){
        return this.database.query(`UPDATE ${this.table} set id_category = ?, id_task = ? WHERE id_taskCat = ?`,
            [task_cat.id_category,task_cat.id_task,task_cat.id_taskCat]

        )
    };

    delete(task_cat){
        return this.database.query(`DELETE FROM ${this.table} WHERE id_taskCat = ?`,
        [task_cat.id_taskCat]
        )
    };
    }


    module.exports = TaskCatManager