import { graphql, useStaticQuery } from "gatsby"
import React, { createContext, useEffect, useReducer } from "react"

const EXTREME_IP_API_KEY = process.env.EXTREME_IP_API_KEY || ""

const defaultRegionContext = {
  region: undefined,
  /**
   * @type {string}
   */
  country: undefined,
  regions: [],
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

  const regions = data.allMedusaRegions.edges.map(edge => edge.node)

  useEffect(() => {
    const initRegion = () => {
      if (localStorage) {
        const regionJSON = localStorage.getItem(REGION)
        const countryJSON = localStorage.getItem(COUNTRY)

        if (regionJSON && countryJSON) {
          const region = JSON.parse(regionJSON)
          const country = JSON.parse(countryJSON)
          updateRegion(region, country)
        } else {
          // Get location from IP address. Set to EU by default.
          let ipCountryCodeIsUk = false
          getIpCountryCode()
            .then(countryCode => {
              if (countryCode && countryCode === "UK") {
                ipCountryCodeIsUk = true
              }
            })
            .finally(() => {
              let reqRegion
              let euRegion
              regions.forEach(region => {
                if (ipCountryCodeIsUk && region.name === "UK") {
                  reqRegion = region
                }
                if (region.name === "EU") {
                  euRegion = region
                }
              })
              if (!reqRegion) {
                reqRegion = euRegion
              }
              updateRegion(reqRegion, reqRegion.countries[0].display_name)
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
    if (!EXTREME_IP_API_KEY) {
      return null
    }

    const resJson = await fetch(
      `https://extreme-ip-lookup.com/json/?key=${EXTREME_IP_API_KEY}`
    )
      .then(res => res.json())
      .catch(err => null)

    return resJson.status === "fail" ? null : resJson.countryCode
  }

  return (
    <RegionContext.Provider
      {...props}
      value={{ ...state, regions, updateRegion }}
    />
  )
}
