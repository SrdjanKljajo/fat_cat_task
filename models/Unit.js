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
        notNull: { msg: 'Post must have a title' },
        len: {
          args: [2, 100],
          msg: 'Title must have 2 - 100 caracters.',
        },
      },
    },
  })

  return Unit
}
