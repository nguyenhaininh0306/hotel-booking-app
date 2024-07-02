'use client'

import React from 'react'
import { HotelWithRooms } from './AddHotelForm'
import { Booking } from '@prisma/client'
import useLocation from '@/hooks/useLocation'
import Image from 'next/image'
import AmenityItem from '../AmenityItem'
import {
  Car,
  Clapperboard,
  Coffee,
  Dumbbell,
  MapPin,
  ShoppingBasket,
  Utensils,
  Wine,
} from 'lucide-react'
import { FaSwimmer, FaSpa } from 'react-icons/fa'
import { MdDryCleaning } from 'react-icons/md'
import RoomCard from '../room/RoomCard'

const HotelDetailsClient = ({
  hotel,
  booking,
}: {
  hotel: HotelWithRooms
  booking?: Booking[]
}) => {
  const { getCountryByCode, getStateByCode } = useLocation()
  const country = getCountryByCode(hotel.country)
  const state = getStateByCode(hotel.country, hotel.state)

  return (
    <div className="flex flex-col gap-6 pb-2">
      <div className="aspect-square overflow-hidden relative w-full h-[200px] md:h-[400px] rounded-lg">
        <Image
          fill
          src={hotel.image}
          alt={hotel.title}
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="font-semibold text-xl md:text-3xl">{hotel.title}</h3>
        <div className="font-semibold mt-4">
          <AmenityItem>
            <MapPin className="h-4 w-4" /> {country?.name} - {state?.name} -{' '}
            {hotel.city}
          </AmenityItem>
        </div>

        <h3 className="font-semibold text-lg mt-4 mb-2">Location detail</h3>
        <p className="text-primary/90 mb-2">{hotel.locationDescription}</p>

        <h3 className="font-semibold text-lg mt-4 mb-2">About this hotel</h3>
        <p className="text-primary/90 mb-2">{hotel.description}</p>

        <h3 className="font-semibold text-lg mt-4 mb-2">Popular amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start text-sm">
          {hotel.swimmingPool && (
            <AmenityItem>
              <FaSwimmer size={18} /> Pool
            </AmenityItem>
          )}
          {hotel.gym && (
            <AmenityItem>
              <Dumbbell className="h-4 w-4" /> Gym
            </AmenityItem>
          )}
          {hotel.spa && (
            <AmenityItem>
              <FaSpa size={18} /> Spa
            </AmenityItem>
          )}
          {hotel.bar && (
            <AmenityItem>
              <Wine className="h-4 w-4" /> Bar
            </AmenityItem>
          )}
          {hotel.laundry && (
            <AmenityItem>
              <MdDryCleaning size={18} /> Laundry facilities
            </AmenityItem>
          )}
          {hotel.restaurant && (
            <AmenityItem>
              <Utensils className="h-4 w-4" /> Restaurant
            </AmenityItem>
          )}
          {hotel.shopping && (
            <AmenityItem>
              <ShoppingBasket className="h-4 w-4" /> Shopping
            </AmenityItem>
          )}
          {hotel.freeParking && (
            <AmenityItem>
              <Car className="h-4 w-4" /> Free parking
            </AmenityItem>
          )}
          {hotel.movieNights && (
            <AmenityItem>
              <Clapperboard className="h-4 w-4" /> Movie nights
            </AmenityItem>
          )}
          {hotel.coffeeShop && (
            <AmenityItem>
              <Coffee className="h-4 w-4" /> Coffee shop
            </AmenityItem>
          )}
        </div>
      </div>

      <div>
        {!!hotel.rooms.length && (
          <div>
            <h3 className="text-lg font-semibold my-4">Hotel rooms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {hotel.rooms.map((room) => (
                <RoomCard
                  hotel={hotel}
                  room={room}
                  key={room.id}
                  booking={booking}
                  handleImageDelete={() => {}}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HotelDetailsClient
