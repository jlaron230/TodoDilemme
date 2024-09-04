const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  findAllReminder(category) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE date_reminders = ?`,
      [category.date_reminder]
    );
  }

  findReminder(category) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE id_reminders = ?`,
      [category.date_reminder]
    );
  }

  update(category) {
    return this.database.query(
      `update ${this.table} set date_reminders = ? where id_reminders = ? and heure_reminders = ?`,
      [category.date_reminder, category.id]
    );
  }

  insert(category) {
    return this.database.query(
      `insert into ${this.table} (date_reminders) = ? where id = ?`,
      [category.date_reminder, category.id]
    );
  }

findTask(category) {
  return this.database.query(
    `SELECT * FROM ${this.table} WHERE date_reminders = ?`,
    [category.date_reminder]
  );
}
}

module.exports = CategoryManager;
