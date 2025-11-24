import { Op } from 'sequelize'
import fs from 'fs/promises'
import path from 'path'
import { User } from '../models/user.js'
import { Report } from '../models/report.js'
import { getIO } from '../socket.js'
import { REPORTS_PER_PAGE, SORT_REPORTS_BY, REPORTS_SORT_ORDER } from '../constants.js'

export const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || REPORTS_PER_PAGE
    const offset = (page - 1) * limit
    const { status, search, sortBy = SORT_REPORTS_BY, sortOrder = REPORTS_SORT_ORDER } = req.query

    const where = {}
    if (status) {
      where.status = status
    }

    if (search) {
      where[Op.or] = [
        { type: { [Op.like]: `%${search}%` } },
        { status: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ]
    }

    const { count, rows } = await Report.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ],
      limit,
      offset,
      order: [[sortBy, sortOrder]]
    })

    const lastPage = Math.ceil(count / limit)

    res.status(200).json({
      success: true,
      message: 'Reports were fetched successfully',
      reports: rows,
      page,
      total: count,
      lastPage,
      hasNextPage: page < lastPage,
      hasPrevPage: page > 1
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

    const imageName = report.image
    const imagePath = path.join(process.cwd(), 'static', imageName)

    await report.destroy()

    await fs.unlink(imagePath)

    res.status(200).json({
      success: true,
      message: 'Report was deleted successfully',
      id: report.id
    })
  } catch (err) {
    next(err)
  }
}
