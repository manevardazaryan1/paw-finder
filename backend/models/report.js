import { DataTypes } from 'sequelize'
import sequelize from '../database/database'

const Report = sequelize.define(
  'Report',
  {
    status: {
      type: DataTypes.ENUM('lost', 'found'),
      allowNull: false,
      defaultValue: 'lost'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
)

export default Report
