import useCreateReport from '../../hooks/useCreateReport'
import useUpdateReport from '../../hooks/useUpdateReport'

const ReportForm = ({ type }) => {
  const formik = type === 'create' ? useCreateReport() : useUpdateReport()

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <div>
        <label>Status</label>
        <select
          name="status"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.status}
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        {formik.touched.status && formik.errors.status && (
          <div style={{ color: 'red' }}>{formik.errors.status}</div>
        )}
      </div>

      <div>
        <label>Pet Type</label>
        <input
          type="text"
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
        />
        {formik.touched.type && formik.errors.type && (
          <div style={{ color: 'red' }}>{formik.errors.type}</div>
        )}
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description && (
          <div style={{ color: 'red' }}>{formik.errors.description}</div>
        )}
      </div>

      <div>
        <label>Contact Info</label>
        <input
          type="text"
          name="contact"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.contact}
        />
        {formik.touched.contact && formik.errors.contact && (
          <div style={{ color: 'red' }}>{formik.errors.contact}</div>
        )}
      </div>

      <div>
        <label>Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
        />
        {formik.touched.image && formik.errors.image && (
          <div style={{ color: 'red' }}>{formik.errors.image}</div>
        )}
      </div>

      <button type="submit" disabled={formik.isSubmitting}>
        {`${type === 'create' ? 'Create' : 'Update'} Report`}
      </button>
    </form>
  )
}

export default ReportForm
