const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {

 constructor(){
  super({table: "user"});
 } 
 insert(user){
 return this.database.query(`INSERT INTO ${this.table} (id_user,name_user,email_user,mdp_user) VALUES(?,?,?,?)`,
    [user.id_user,user.name_user,user.email_user,user.mdp_user]
  );
 }
 update(user){
  return this.database.query(`UPDATE ${this.table} set name_user = ?, email_user = ?, mdp_user = ? WHERE id_user = ?`, 
    [user.name_user,user.email_user,user.mdp_user,user.id])
 };
delete(user){
  return this.database.query(`DELETE FROM ${this.table} WHERE id_user = ?`,
    [user.id_user]
  )};

}

module.exports = UserManager;