const { SequelizeSlugify } = require('sequelize-slugify')

module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('units', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    unitName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Unit must have a name' },
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
    health: {
      type: DataTypes.INTEGER,
    },
    unitFeed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  })

  SequelizeSlugify.slugifyModel(Unit, {
    source: ['unitName'],
    overwrite: false,
  })

  return Unit
}
