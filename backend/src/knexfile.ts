// Update with your config settings.

export = {

  development: {
    client: "sqlite3",
    connection: {
      filename: "/home/matbentes/Desktop/folder/lang/docker/semana-omnistck11/01-conhecendo-a-stack/backend/src/database/db.sqlite"
    },
    migrations: {
      directory: './database/migrations'
    }, 
    useNullAsDefault: true
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
