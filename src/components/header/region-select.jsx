import React, { useEffect, useState } from "react"
import { useRegion } from "../../hooks/use-region"
import Select from "../forms/select"
import _ from "lodash"
import { regionSelect } from "../../styles/modules/region-select.module.css"

const RegionSelect = ({ className }) => {
  const {
    region,
    regions,
    initialised: regionInitialised,
    actions: { updateRegion },
  } = useRegion()
  const [selectValue, setSelectValue] = useState()

  useEffect(() => {
    if (regionInitialised) {
      setSelectValue(region.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionInitialised])

  const handleRegionSelect = e => {
    setSelectValue(e.target.value)
    if (regionInitialised) {
      const reqRegion = _.find(
        regions,
        region => region.name === e.target.value
      )
      updateRegion(reqRegion, reqRegion.countries[0].display_name)
    }
  }

  return (
    <Select
      name="shop_region"
      options={regions.map(region => ({
        label: region.name,
        value: region.name,
      }))}
      className={`${regionSelect} ${className}`}
      onChange={handleRegionSelect}
      value={selectValue}
      canBeNull={false}
    />
  )
}

export default RegionSelect
