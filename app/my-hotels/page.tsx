import { getHotelByUserId } from '@/actions/getHotelsByUserId'
import HotelList from '@/components/lists/HotelList'
import React from 'react'

const MyHotels = async () => {
  const hotels = await getHotelByUserId()

  if (!hotels) return <div>No hotel found...</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold">Here are your properties</h2>
      <HotelList hotels={hotels} />
    </div>
  )
}

export default MyHotels
