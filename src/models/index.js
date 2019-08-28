import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'landinsight',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
  },
);

const models = {
  Epc: sequelize.import('./epc')
};

export { sequelize };

export default models;
