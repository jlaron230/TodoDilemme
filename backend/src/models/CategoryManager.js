const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  findAllCategory() {
    return this.findAll();
  }

  findCategory(category) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE id_category = ? AND name = ?`,
      [category.name, category.id_category]
    );
  }

  update(category) {
    return this.database.query(
      `update ${this.table} SET name = ? WHERE id_category = ?`,
      [category.name ,category.id_category]
    );
  }

  insert(category) {
    return this.database.query(
      `insert into ${this.table} (name) VALUES (?)`,
      [category.name]
    );
  }

  delete(category) {
    return this.database.query(
      `DELETE FROME ${this.table} WHERE id_category = ?`,
      [category.id_category]
    );
  }

  findCategoryByUsers(userId) {
    return this.database.query(
      `SELECT c.* FROM category c JOIN user u on c.id_user = u.id_user
      WHERE u.id_user = ?`
      [userId]
    )
  }
}

module.exports = CategoryManager;
