const { SequelizeSlugify } = require('sequelize-slugify')

module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('units', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    },
    health: {
      type: DataTypes.INTEGER,
    },
  })

  SequelizeSlugify.slugifyModel(Unit, {
    source: ['name'],
    overwrite: false,
  })

  return Unit
}
