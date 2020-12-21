import Sequelize, {Model} from 'sequelize';

class Dados extends Model {
  
    static init(sequelize) {
      super.init({
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING,
        participation: Sequelize.NUMBER,
        
        
      },
      {
        sequelize,
      }  
      );

    return this;
  }
  
}

export default Dados;
