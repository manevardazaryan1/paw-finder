const ListItem = ({ children }) => {
  return (
    <li className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
      {children}
    </li>
  )
}

export default ListItem
