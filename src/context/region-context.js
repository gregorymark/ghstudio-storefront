import React, { createContext, useEffect, useReducer, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import _ from "lodash"

const IP_LOOKUP_API_KEY = process.env.IP_LOOKUP_API_KEY || ""

const defaultRegionContext = {
  region: undefined,
  /**
   * @type {string}
   */
  country: undefined,
  regions: [],
  initialised: false,
  updateRegion: () => {},
}

const RegionContext = createContext(defaultRegionContext)
export default RegionContext

const ACTIONS = {
  UPDATE_REGION: "UPDATE_REGION",
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_REGION:
      return {
        ...state,
        region: action.payload.region,
        country: action.payload.country,
      }
    default:
      break
  }
}

const REGION = "medusa_region"
const COUNTRY = "medusa_country"

export const RegionProvider = props => {
  const [state, dispatch] = useReducer(reducer, defaultRegionContext)
  const [initialised, setInitialised] = useState(
    defaultRegionContext.initialised
  )

  const data = useStaticQuery(graphql`
    {
      allMedusaRegions {
        edges {
          node {
            id
            name
            currency_code
            tax_rate
            countries {
              display_name
              id
              iso_2
              iso_3
              name
              num_code
              region_id
            }
          }
        }
      }
    }
  `)

  const regions = data.allMedusaRegions.edges.map(edge => {
    edge.node.countries.sort((a, b) => {
      const aNameText = a.display_name.toLowerCase()
      const bNameText = b.display_name.toLowerCase()

      return aNameText.localeCompare(bNameText)
    })

    return edge.node
  })

  useEffect(() => {
    const initRegion = () => {
      if (localStorage) {
        const regionJSON = localStorage.getItem(REGION)
        const countryJSON = localStorage.getItem(COUNTRY)

        if (regionJSON && countryJSON) {
          const region = JSON.parse(regionJSON)
          const country = JSON.parse(countryJSON)
          updateRegion(region, country)
          setInitialised(true)
        } else {
          // Get location from IP address. Set to EU by default.
          let ipCountryCodeIsUk = false
          getIpCountryCode()
            .then(countryCode => {
              if (countryCode && countryCode === "GB") {
                ipCountryCodeIsUk = true
              }
            })
            .finally(() => {
              let reqRegion
              if (ipCountryCodeIsUk) {
                reqRegion = _.find(regions, region => region.name === "UK")
              } else {
                reqRegion = _.find(regions, region => region.name !== "UK")
              }
              updateRegion(reqRegion, reqRegion.countries[0].display_name)
              setInitialised(true)
            })
        }
      }
    }

    initRegion()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // Adding regions as dependency causes loop

  const updateRegion = (region, country) => {
    localStorage.setItem(REGION, JSON.stringify(region))
    localStorage.setItem(COUNTRY, JSON.stringify(country))
    dispatch({
      type: ACTIONS.UPDATE_REGION,
      payload: { region: region, country: country },
    })
  }

  const getIpCountryCode = async () => {
    if (!IP_LOOKUP_API_KEY) {
      return null
    }

    const resJson = await fetch(`https://ipinfo.io?token=${IP_LOOKUP_API_KEY}`)
      .then(res => res.json())
      .catch(err => console.log(err))

    if (resJson.error) {
      console.log(`${resJson.error.title}: ${resJson.error.message}`)

      return null
    }

    return resJson.country
  }

  return (
    <RegionContext.Provider
      {...props}
      value={{ ...state, regions, initialised, updateRegion }}
    />
  )
}
