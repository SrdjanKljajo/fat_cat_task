const { SequelizeSlugify } = require('sequelize-slugify')

module.exports = (sequelize, DataTypes) => {
  const FarmBuilding = sequelize.define('farm_buildings', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    buildingName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'Farm building must have a name' },
        len: {
          args: [2, 100],
          msg: 'Name must have 2 - 100 caracters.',
        },
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    buildingFeed: {
      type: DataTypes.INTEGER,
      defaultValue: 60,
    },
  })

  SequelizeSlugify.slugifyModel(FarmBuilding, {
    source: ['buildingName'],
    overwrite: false,
  })

  return FarmBuilding
}
