'use client'

import { Booking, Hotel, Room } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import Image from 'next/image'
import AmenityItem from '../AmenityItem'
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  Home,
  Loader2,
  MountainSnow,
  PencilLine,
  Ship,
  Trash,
  Trees,
  Tv,
  User,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from 'lucide-react'
import { Separator } from '../ui/separator'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import AddRoomForm from './AddRoomForm'
import axios from 'axios'
import { useToast } from '../ui/use-toast'
import { DatePickerWithRange } from '../common/DateRangePicker'
import { DateRange } from 'react-day-picker'
import { differenceInCalendarDays } from 'date-fns'
import { Checkbox } from '../ui/checkbox'

interface RoomCardProps {
  hotel?: Hotel & {
    rooms: Room[]
  }
  room: Room
  booking?: Booking[]
  handleImageDelete: (image: string) => void
}

const RoomCard = ({
  hotel,
  room,
  booking = [],
  handleImageDelete,
}: RoomCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [bookingIsLoading, setBookingIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>()
  const [totalPrice, setTotalPrice] = useState(room.roomPrice)
  const [includeBreakfast, setIncludeBreakfast] = useState(false)
  const [days, setDays] = useState(1)

  const pathname = usePathname()
  const isHotelDetailPage = pathname.includes('hotel-details')
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from)
      setDays(dayCount)

      if (dayCount && room.roomPrice) {
        if (includeBreakfast && room.breakFastPrice) {
          setTotalPrice(
            dayCount * room.roomPrice + dayCount * room.breakFastPrice
          )
        } else {
          setTotalPrice(dayCount * room.roomPrice)
        }
      }
    } else {
      setTotalPrice(room.roomPrice)
    }
  }, [date, room.roomPrice, includeBreakfast])

  const handleDialogOpen = () => {
    setOpen((prev) => !prev)
  }

  const handleDeleteRoom = (room: Room) => {
    setIsLoading(true)
    const imageKey = room.image.substring(room.image.lastIndexOf('/') + 1)

    axios
      .post('/api/uploadthing/delete', { imageKey })
      .then(() => {
        axios
          .delete(`/api/room/${room.id}`)
          .then(() => {
            router.refresh()
            toast({
              variant: 'success',
              description: 'Room deleted!',
            })
            setIsLoading(false)
          })
          .catch(() => {
            setIsLoading(false)
            toast({
              variant: 'destructive',
              description: 'Something went wrong',
            })
          })
      })
      .catch(() => {
        setIsLoading(false)
        toast({
          variant: 'destructive',
          description: 'Something went wrong',
        })
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
          <Image
            fill
            src={room.image}
            alt={room.title}
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AmenityItem>
            <Bed className="h-4 w-4" /> {room.bedCount} Bed{'(s)'}
          </AmenityItem>
          <AmenityItem>
            <User className="h-4 w-4" /> {room.guestCount} Guest{'(s)'}
          </AmenityItem>
          <AmenityItem>
            <Bath className="h-4 w-4" /> {room.bathroomCount} Bathroom{'(s)'}
          </AmenityItem>

          {!!room.kingBed && (
            <AmenityItem>
              <BedDouble className="h-4 w-4" /> {room.kingBed} King bed{'(s)'}
            </AmenityItem>
          )}
          {!!room.queenBed && (
            <AmenityItem>
              <BedDouble className="h-4 w-4" /> {room.queenBed} Queen bed{'(s)'}
            </AmenityItem>
          )}
          {room.roomService && (
            <AmenityItem>
              <UtensilsCrossed className="h-4 w-4" /> Room Services
            </AmenityItem>
          )}
          {room.TV && (
            <AmenityItem>
              <Tv className="h-4 w-4" /> TV
            </AmenityItem>
          )}
          {room.balcony && (
            <AmenityItem>
              <Home className="h-4 w-4" /> Balcony
            </AmenityItem>
          )}
          {room.freeWifi && (
            <AmenityItem>
              <Wifi className="h-4 w-4" /> Free wifi
            </AmenityItem>
          )}
          {room.cityView && (
            <AmenityItem>
              <Castle className="h-4 w-4" /> City view
            </AmenityItem>
          )}
          {room.oceanView && (
            <AmenityItem>
              <Ship className="h-4 w-4" /> Ocean view
            </AmenityItem>
          )}
          {room.forestView && (
            <AmenityItem>
              <Trees className="h-4 w-4" /> Forest view
            </AmenityItem>
          )}
          {room.mountainView && (
            <AmenityItem>
              <MountainSnow className="h-4 w-4" /> Mountain view
            </AmenityItem>
          )}
          {room.airCondition && (
            <AmenityItem>
              <AirVent className="h-4 w-4" /> Air condition
            </AmenityItem>
          )}
          {room.soundProofed && (
            <AmenityItem>
              <VolumeX className="h-4 w-4" /> Sound proofed
            </AmenityItem>
          )}
        </div>
        <Separator />
        <div className="flex gap-4 justify-between">
          <div>
            Room price: <span className="font-bold">${room.roomPrice}</span>
            <span className="text-xs">/24hrs</span>
          </div>

          {!!room.breakFastPrice && (
            <div>
              Breakfast price:{' '}
              <span className="font-bold">${room.breakFastPrice}</span>
            </div>
          )}
        </div>
        <Separator />
      </CardContent>

      <CardFooter>
        {isHotelDetailPage ? (
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-2">
                Select days that you will spend in this room
              </div>
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>
            {date && date.to && date.from && (
              <>
                {room.breakFastPrice > 0 && (
                  <div>
                    <div className="mb-2">
                      Do you want to be served breakfast each day
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="breakFast"
                        onCheckedChange={(value) =>
                          setIncludeBreakfast(!!value)
                        }
                      />
                      <label htmlFor="breakFast" className="text-sm">
                        Include Breakfast
                      </label>
                    </div>
                  </div>
                )}

                <div>
                  Total price: <span className="font-bold">${totalPrice}</span>{' '}
                  for <span className="font-bold">{days} Days</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex w-full justify-between">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <PencilLine className="mr-2 h-4 w-4" /> Update room
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[900px] w-[90%]">
                <DialogHeader>
                  <DialogTitle>Update room</DialogTitle>
                  <DialogDescription>
                    Make changes to this room.
                  </DialogDescription>
                </DialogHeader>
                <AddRoomForm
                  hotel={hotel}
                  room={room}
                  handleDialogOpen={handleDialogOpen}
                  handleImageDelete={handleImageDelete}
                />
              </DialogContent>
            </Dialog>

            <Button
              disabled={isLoading}
              type="button"
              variant="destructive"
              onClick={() => handleDeleteRoom(room)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4" /> Deleting...
                </>
              ) : (
                <>
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </>
              )}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default RoomCard
