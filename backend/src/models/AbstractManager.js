class AbstractManager{

  constructor({table}){
    this.table =table;
  }
  find(id){
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ? `,[id]);
  }
  findBy(column, value){
    const SQL = `SELECT * FROM ${this.table} WHERE ${column} = ?`;
    return this.database.query(SQL, [value]);
  }
  findAll(){
    return this.database.query(`SELECT * FROM ${this.table}`);
  }
  delete(id){
    return this.database.query(`DELETE  FROM ${this.table} WHERE id = ?`,[id]);
  }
  setDatabase(database){
    this.database =database;
  }
}

module.exports = AbstractManager;

