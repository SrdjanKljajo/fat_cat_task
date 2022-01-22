const { SequelizeSlugify } = require('sequelize-slugify')

module.exports = (sequelize, DataTypes) => {
  const FarmBuilding = sequelize.define('farm_buildings', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
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
    },
    feed: {
      type: DataTypes.INTEGER,
      defaultValue: 60,
    },
  })

  SequelizeSlugify.slugifyModel(FarmBuilding, {
    source: ['name'],
    overwrite: false,
  })

  return FarmBuilding
}
