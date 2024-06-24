'use client'

import { Hotel, Room } from '@prisma/client'
import React from 'react'

interface AddHotelFormProps {
  hotel: HotelWithRooms | null
}

export type HotelWithRooms = Hotel & {
  rooms: Room[]
}

const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
  return <div>AddHotelForm</div>
}

export default AddHotelForm
