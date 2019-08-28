const epc = (sequelize, DataTypes) => {
  const Epc = sequelize.define('epc', {
    lmk_key: DataTypes.STRING,  // possibly use int
    lodgement_date: DataTypes.DATEONLY,
    transaction_type: DataTypes.STRING,
    total_floor_area: DataTypes.REAL,
    address: DataTypes.STRING,
    postcode: DataTypes.STRING,
    latitude: DataTypes.REAL,
    longitude: DataTypes.REAL
  });

  return Epc;
};

export default epc;
