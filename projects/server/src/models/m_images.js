'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_images.init({
    images_url: DataTypes.STRING,
    m_asset_id: DataTypes.INTEGER,
    image_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'm_images',
  });
  return m_images;
};