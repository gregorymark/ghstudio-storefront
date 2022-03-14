import React from "react"
import { splitFieldset } from "../../styles/modules/forms.module.css"

const SplitFieldset = ({ children }) => {
  return <fieldset className={splitFieldset}>{children}</fieldset>
}

export default SplitFieldset
