const AbstractManager = require("./AbstractManager");

class TaskReminderManager extends AbstractManager {
  constructor() {
    super({ table: "task_reminders" });
  }

  findAllReminder(task_reminders) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE date_reminders = ?`,
      [task_reminders.date_reminder]
    );
  }

  findReminder(taskReminder) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE id_reminders = ?`,
      [taskReminder.date_reminder]
    );
  }

  update(taskReminder) {
    return this.database.query(
      `update ${this.table} set date_reminders = ? where id_reminders = ? and heure_reminders = ?`,
      [taskReminder.date_reminder, taskReminder.id]
    );
  }

  insert(taskReminder) {
    return this.database.query(
      `insert into ${this.table} (date_reminders) = ? where id = ?`,
      [taskReminder.date_reminder, taskReminder.id]
    );
  }

findTask(taskReminder) {
  return this.database.query(
    `SELECT * FROM ${this.table} WHERE date_reminders = ?`,
    [taskReminder.date_reminder]
  );
}
}

module.exports = TaskReminderManager;
