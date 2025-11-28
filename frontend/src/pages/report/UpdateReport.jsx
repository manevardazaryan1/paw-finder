import ReportForm from '../../components/forms/report/Report'
import useUpdateReport from '../../hooks/useUpdateReport'

const UpdateReport = () => {
  const { formik } = useUpdateReport()

  return (
    <div
      className="w-full min-h-[calc(100vh-80px)] py-6
                bg-gradient-to-br 
                from-[#000000] 
                via-[#ff00ff] 
                to-[#3b82f6]"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Update Report</h2>
      {formik && <ReportForm hook={useUpdateReport} type="update" />}
    </div>
  )
}

export default UpdateReport
