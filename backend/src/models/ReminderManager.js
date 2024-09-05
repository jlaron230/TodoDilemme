const AbstractManager = require("./AbstractManager");

class ReminderManager extends AbstractManager {
  constructor() {
    super({ table: "reminders" });
  }

  findAllReminder(reminders) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE id_reminders = ?`,
      [reminders]
    );
  }

  findReminder(reminders) {
    return this.database.query(
      `SELECT r.*, t.* 
       FROM reminders r
       JOIN task_reminder tr ON r.id_reminders = tr.id_reminders
       JOIN task t ON tr.id_task = t.id_task
       WHERE r.id_reminders = ?`,
      [reminders]
    );
  }

  update(reminders) {
    return this.database.query(
      `UPDATE ${this.table} SET date_reminders = ?, heure_reminders = ? WHERE id_reminders = ?`,
      [
        reminders.date_reminders,
        reminders.heure_reminders,
        reminders.id_reminders,
      ]
    );
  }

  insert(reminders) {
    return this.database.query(
      `insert into ${this.table} (id_reminders,date_reminders, heure_reminders) VALUES (?,?,?,?)`,
      [
        reminders.id_reminders,
        reminders.date_reminders,
        reminders.heure_reminders,
      ]
    );
  }

  delete(reminders) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE id_reminders = ?`,
      [reminders.id_reminders]
    );
  }
}

module.exports = ReminderManager;
