import { User } from '../models/user.js'
import { Report } from '../models/report.js'
import { getIO } from '../socket.js'

export const getAll = async (req, res, next) => {
  try {
    const reports = await Report.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    })

    res.status(200).json({
      success: true,
      message: 'Reports were fetched successfully',
      reports
    })
  } catch (err) {
    next(err)
  }
}

export const getById = (req, res, next) => {
  try {
    const { id } = req.params

    const report = Report.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    })

    if (!report) {
      const error = new Error()
      error.statusCode = 404
      return next(error)
    }

    res.status(200).json({
      success: true,
      message: 'Report fetched successfully',
      report
    })
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    const { status, type, description, contact } = req.body

    if (!req.file) {
      const error = new Error('Image file is required')
      error.statusCode = 400
      return next(error)
    }

    const report = await Report.create({
      status,
      type,
      description,
      contact,
      image: req.file.filename,
      userId: req.user.id
    })

    getIO.emit('report', report)
  } catch (err) {
    next(err)
  }
}

export const update = async (req, res, next) => {
  try {
    const { status, type, description, contact } = req.body
    const report = req.report

    report.status = status || report.status
    report.type = type || report.type
    report.description = description || report.description
    report.contact = contact || report.contact

    if (req.file) {
      report.image = req.file.filename
    }

    await report.save()

    res.status(200).json({
      success: true,
      message: 'Report was updated successfully',
      report
    })
  } catch (err) {
    next(err)
  }
}

export const destroy = async (req, res, next) => {
  try {
    const report = req.report

    await report.destroy()

    res.status(200).json({
      success: true,
      message: 'Report was deleted successfully'
    })
  } catch (err) {
    next(err)
  }
}
