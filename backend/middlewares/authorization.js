import { Report } from '../models/report.js'

export const authorization = async (req, res, next) => {
  try {
    const reportId = req.params.id

    const report = await Report.findByPk(reportId)

    if (!report) {
      const error = new Error('Report not found')
      error.statusCode = 404
      return next(error)
    }

    if (report.userId !== req.user.id) {
      const error = new Error('You are not authorized to perform this action')
      error.statusCode = 403
      return next(error)
    }

    req.report = report
    next()
  } catch (err) {
    next(err)
  }
}
