const AbstractManager = require("./AbstractManager");

class ReminderManager extends AbstractManager {
  constructor() {
    super({ table: "reminders" });
  }

  findAllReminder(reminders) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE date_reminders = ?`,
      [reminders.date_reminder]
    );
  }

  findReminder(reminders) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE id_reminders = ?`,
      [reminders.date_reminder]
    );
  }

  update(reminders) {
    return this.database.query(
      `update ${this.table} set date_reminders = ? where id_reminders = ? and heure_reminders = ?`,
      [reminders.date_reminder, reminders.id]
    );
  }

  insert(reminders) {
    return this.database.query(
      `insert into ${this.table} (date_reminders) = ? where id = ?`,
      [reminders.date_reminder, reminders.id]
    );
  }

findTask(reminders) {
  return this.database.query(
    `SELECT * FROM ${this.table} WHERE date_reminders = ?`,
    [reminders.date_reminder]
  );
}
}

module.exports = ReminderManager;
