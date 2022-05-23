import React from "react"
import { bulletinInfo } from "../../styles/modules/order-history.module.css"

const OrderBulletinInfo = ({ label, info, className }) => {
  return (
    <div className={`${bulletinInfo} ${className}`}>
      <h4>{label}</h4>
      <div>{info}</div>
    </div>
  )
}

export default OrderBulletinInfo
