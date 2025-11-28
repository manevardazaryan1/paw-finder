import useReportForm from '../../../hooks/useReportForm'

const ReportForm = ({ type, hook }) => {
  const { formik } = useReportForm({ hook })

  return (
    <>
      {
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          className="w-[90%] max-w-lg md:w-full mx-auto bg-white p-6 rounded-md shadow-md space-y-4 m-5"
        >
          <div className="flex flex-col">
            <label htmlFor="status" className="mb-1 font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.status}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
            {formik.touched?.status && formik.errors?.status && (
              <p style={{ color: 'red' }}>{formik.errors?.status}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="type" className="mb-1 font-medium text-gray-700">
              Pet Type
            </label>
            <input
              type="text"
              name="type"
              placeholder="e.g., Dog, Cat"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.type}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched?.type && formik.errors?.type && (
              <p className="text-red-500 text-sm mt-1">{formik.errors?.type}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="location" className="mb-1 font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="e.g., Chicago, IL"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.location}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched?.location && formik.errors?.location && (
              <p className="text-red-500 text-sm mt-1">{formik.errors?.location}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your pet..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.description}
              rows={4}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {formik.touched?.description && formik.errors?.description && (
              <p className="text-red-500 text-sm mt-1">{formik.errors?.description}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="contact" className="mb-1 font-medium text-gray-700">
              Contact Info
            </label>
            <input
              id="contact"
              type="text"
              name="contact"
              placeholder="Phone or Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.contact}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched?.contact && formik.errors?.contact && (
              <p className="text-red-500 text-sm mt-1">{formik.errors?.contact}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="mb-1 font-medium text-gray-700">
              Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              placeholder="Upload an image"
              accept="image/*"
              onChange={(event) => formik.setFieldValue('image', event.currentTarget?.files[0])}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched?.image && formik.errors?.image && (
              <p className="text-red-500 text-sm mt-1">{formik.errors?.image}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {`${type === 'create' ? 'Create' : 'Update'} Report`}
          </button>
        </form>
      }
    </>
  )
}

export default ReportForm
