const AbstractManager = require("./AbstractManager");

class TaskReminderManager extends AbstractManager {
  constructor() {
    super({ table: "task_reminders" });
  }

  update(task_reminders) {
    return this.database.query(
      `UPDATE ${this.table} SET id_task = ?, id_reminders = ? WHERE id_task_reminders = ?`,
      [task_reminders.id_task, task_reminders.id_reminders, task_reminders.id_task_reminders]
    );
  }

  insert(task_reminders) {
    return this.database.query(
      `INSERT INTO ${this.table} (id_task, id_reminders) VALUES (?, ?)`,
      [task_reminders.id_task, task_reminders.id_reminders]
    );
  }

delete(task_reminders) {
  return this.database.query(
    `DELETE FROM ${this.table} WHERE id_task_reminders = ?`,
    [task_reminders.id_task_reminders]
  );
}
}

module.exports = TaskReminderManager;
