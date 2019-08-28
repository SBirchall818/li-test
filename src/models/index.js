import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'landinsight',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    logging: false
  },
);

const models = {
  Epc: sequelize.import('./epc')
};

export { sequelize };

export default models;
