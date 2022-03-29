import React from "react"
import { bulletinInfo } from "../../styles/modules/order-history.module.css"

const OrderBulletinInfo = ({ label, info }) => {
  return (
    <div className={bulletinInfo}>
      <h4>{label}</h4>
      <div>{info}</div>
    </div>
  )
}

export default OrderBulletinInfo
