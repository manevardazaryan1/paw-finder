const List = ({ children }) => {
  return (
    <ul className="max-w-[1200px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {children}
    </ul>
  )
}

export default List
