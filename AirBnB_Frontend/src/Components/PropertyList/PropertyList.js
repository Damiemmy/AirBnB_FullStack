"use client"

import React, { useEffect, useState } from "react"
import PropertyListItem from "./PropertyListItem"
import apiService from "@/services/ApiService"
import UseSearchModel from "@/hooks/useSearchModel"
import {format} from 'date-fns'
import { useSearchParams } from "next/navigation"

const PropertyList = ({ landlord_id,favorites}) => {
  //
  const params = useSearchParams()
  const searchModel=UseSearchModel()
  const country=searchModel.query.country
  const numGuests=searchModel.query.guests
  const numBedrooms=searchModel.query.bedrooms
  const numBathrooms=searchModel.query.bathrooms
  const checkinDate=searchModel.query.checkIn
  const checkoutDate=searchModel.query.checkOut
  const category=searchModel.query.category
  console.log("query:::",searchModel.query)
  console.log("BEDROOMS:::",numBedrooms)


  //
  const [properties, setProperties] = useState([])
  const [loadingFavorite, setLoadingFavorite] = useState(null)

  const fetchProperties = async () => {
    let url = "/api/properties/"

    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`
    }else if(favorites){
      url += '?is_favorites=true'
    }else{
      let urlQuery='';

      if (country){
        urlQuery += '&country=' + country
      }

      if (numGuests){
        urlQuery += '&numGuests=' + numGuests
      }

      if (numBedrooms){
        urlQuery += '&numBedrooms=' + numBedrooms
      }

      if (numBathrooms){
        urlQuery += '&numBathrooms=' + numBathrooms
      }
      if (checkinDate){
        urlQuery += '&checkin=' + format(checkinDate,"yyyy-MM-dd")
      }
      if (checkoutDate){
        urlQuery += '&checkout=' + format(checkoutDate,"yyyy-MM-dd")
      }
      if (category){
        urlQuery += '&category=' + category
      }
      if (urlQuery.length){
        console.log('Query',urlQuery);
        urlQuery = '?' + urlQuery.substring(1);

        url += urlQuery
      }

    }

    try {
      const response = await apiService.get(url)

      const properties = response.data || []
      const favorites = response.favorites || []

      const propertiesWithFavorite = properties.map((property) => ({
        ...property,
        is_favorite: favorites.includes(property.id)
      }))

      setProperties(propertiesWithFavorite)

    } catch (error) {
      console.error("Failed to fetch properties:", error)
    }
  }

  const markFavorite = async (id, is_favorite) => {

    if (loadingFavorite === id) return

    setLoadingFavorite(id)

    const updated = properties.map((property) =>
      property.id === id ? { ...property, is_favorite } : property
    )

    setProperties(updated)

    // try {
    //   await apiService.post(`/api/properties/${id}/toggle_favorite/`)
    // } catch (error) {

    //   const reverted = updated.map((property) =>
    //     property.id === id ? { ...property, is_favorite: !is_favorite } : property
    //   )

    //   setProperties(reverted)

    //   console.error("Favorite update failed:", error)
    // }

    setLoadingFavorite(null)
  }

  useEffect(() => {
    fetchProperties()
  }, [category,searchModel.query,landlord_id,params])

  return (
    <>
      {properties.map((property) => (
        <PropertyListItem
          key={property.id}
          property={property}
          loadingFavorite={loadingFavorite}
          markFavorite={markFavorite}
        />
      ))}
    </>
  )
}

export default PropertyList