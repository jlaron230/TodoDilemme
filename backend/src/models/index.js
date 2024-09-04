require("dotenv").config();

// db.js
const mysql = require('mysql2/promise');

// Créer un pool de connexions pour éviter de créer plusieurs connexions
const pool = mysql.createPool({
  host: 'localhost',     // L'hôte de la base de données (généralement 'localhost')
  user: 'root',          // Le nom d'utilisateur MySQL
  password: 'password',  // Le mot de passe MySQL
  database: 'your_db',   // Le nom de ta base de données
  waitForConnections: true,
  connectionLimit: 10,   // Limite le nombre de connexions simultanées
  queueLimit: 0
});

module.exports = pool; // Exporter le pool pour l'utiliser dans d'autres fichiers

// Tester la connexion à la base de données
async function testConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('Connexion à la base de données réussie!');
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données:', error);
  }
}

testConnection(); // Appeler la fonction pour tester la connexion

// declare and fill models : that's where you should register your own managers

const models = {};

// reminder
const ReminderManager = require("./ReminderManager");

models.reminder = new ReminderManager();
models.reminder.setDatabase(pool);

// task_reminder
const TaskReminderManager = require("./TaskReminderManager");

models.taskReminder = new TaskReminderManager();
models.taskReminder.setDatabase(pool);

// task_reminder
const CategoryManager = require("./CategoryManager");

models.category = new CategoryManager();
models.category.setDatabase(pool);

const ItemManager = require("./ItemManager");

models.item = new ItemManager();
models.item.setDatabase(pool);

// user
const UserManager = require("./UserManager");

models.user = new UserManager();
models.user.setDatabase(pool);

// Skill
const SkillManager = require("./SkillManager");

models.skill = new SkillManager();
models.skill.setDatabase(pool);

// Candidacy
const CandidacyManager = require("./CandidacyManager");

models.candidacy = new CandidacyManager();
models.candidacy.setDatabase(pool);

// Projects
const ProjectManager = require("./ProjectManager");

models.project = new ProjectManager();
models.project.setDatabase(pool);

// UserRole
const UserRoleManager = require("./UserRoleManager");

models.userRole = new UserRoleManager();
models.userRole.setDatabase(pool);

// UserSkill
const UserSkillManager = require("./UserSkillManager");

models.userSkill = new UserSkillManager();
models.userSkill.setDatabase(pool);

// Job
const JobManager = require("./JobManager");

models.job = new JobManager();
models.job.setDatabase(pool);

// Region
const RegionManager = require("./RegionManager");

models.region = new RegionManager();
models.region.setDatabase(pool);

// Project Skill
const ProjectSkillManager = require("./ProjectSkillManager");

models.projectSkill = new ProjectSkillManager();
models.projectSkill.setDatabase(pool);

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
