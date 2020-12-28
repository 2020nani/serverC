/*
    Dados do server
   * Nome : CotaboxTesteServer
   * Objetivo: Fornecer e receber dados para o frontend
   * Desenvolvedor: Hernani Almeida
   * data criacao: 22/12/2020 - 27/12/2020
   
*/

/* exporta os models para criacao no banco de dados atraves do sequelize */
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