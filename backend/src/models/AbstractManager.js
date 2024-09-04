const db = require("./db"); // Importer la connexion à la base de données

class AbstractManager {
  constructor({ table }) {
    this.table = table; // Nom de la table
    this.database = db; // Connexion à la base de données
  }

  // Méthode générique pour récupérer un enregistrement par son ID
  async find(id) {
    try {
      const [rows] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE id = ?`,
        [id]
      );
      return rows[0]; // Retourne la première ligne (ou undefined si elle n'existe pas)
    } catch (error) {
      console.error(`Error finding record in ${this.table}:`, error);
      throw error;
    }
  }

  // Méthode générique pour supprimer un enregistrement par son ID
  async delete(id) {
    try {
      const [result] = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        [id]
      );
      return result.affectedRows; // Retourne le nombre de lignes affectées
    } catch (error) {
      console.error(`Error deleting record in ${this.table}:`, error);
      throw error;
    }
  }
}

module.exports = AbstractManager;
