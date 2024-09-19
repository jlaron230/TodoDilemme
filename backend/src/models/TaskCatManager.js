const AbstractManager = require("./AbstractManager");

class TaskCatManager extends AbstractManager {
  constructor() {
    super({ table: "task_cat" });
  }

  // Correction dans la requête SQL et placement correct du paramètre
  findTaskCatManager(task_cat) {
    return this.database.query(
      `SELECT * FROM task JOIN cat ON task.cat_id = cat.id WHERE task.name = ?`,
      [task_cat]
    );
  }

  insert(task_cat) {
    return this.database.query(
      `INSERT INTO ${this.table} (id_category, id_task) VALUES (?, ?)`,
      [task_cat.id_category, task_cat.id_task]
    );
  }

  update(task_cat) {
    return this.database.query(
      `UPDATE ${this.table} SET id_category = ?, id_task = ? WHERE id_taskCat = ?`,
      [task_cat.id_category, task_cat.id_task, task_cat.id_taskCat]
    );
  }

  delete(task_cat) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE id_taskCat = ?`,
      [task_cat.id_taskCat]
    );
  }
}

// Export en dehors de la classe
module.exports = TaskCatManager;
