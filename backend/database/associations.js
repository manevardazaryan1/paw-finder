import { User } from '../models/user.js'
import { Report } from '../models/report.js'

export const setupAssociations = () => {
  User.hasMany(Report, {
    foreignKey: 'userId',
    as: 'reports',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Report.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
}
