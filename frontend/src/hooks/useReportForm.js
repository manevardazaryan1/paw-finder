const useReportForm = ({ hook }) => {
  const { formik = {} } = hook()

  return {
    formik
  }
}

export default useReportForm
