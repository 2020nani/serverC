import Sequelize from 'sequelize';
import Dados from '../app/models/Dados';
import Admin from '../app/models/Admin'

import databaseConfig from '../config/database';

const models = [Dados, Admin];

class Database{
  constructor() {
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig
      );
    models
    .map(model => model.init(this.connection))
    
  }
}

export default new Database();