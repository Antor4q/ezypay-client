import { createContext, useState } from "react";
import PropTypes from "prop-types"
export const PayContext = createContext()
const ContextProvider = ({children}) => {
  const [user,setUser] = useState()

  const info = {
    user,
    setUser
  }

  return(
    <PayContext.Provider value={info}>
    { children }
  </PayContext.Provider>
  )
};

export default ContextProvider;

ContextProvider.propTypes = {
    children : PropTypes.node
}