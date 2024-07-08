'use client'

import useBookRoom from '@/hooks/useBookRoom'
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { Separator } from '../ui/separator'
import moment from 'moment'
import { Button } from '../ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import { Booking } from '@prisma/client'
import { endOfDay, isWithinInterval, startOfDay } from 'date-fns'

interface RoomPaymentFormProps {
  clientSecret: string
  handlePaymentSuccess: (value: boolean) => void
}

type DateRangeType = {
  startDate: Date
  endDate: Date
}

function hasOverlap(
  startDate: Date,
  endDate: Date,
  dateRange: DateRangeType[]
) {
  const targetInterval = {
    start: startOfDay(new Date(startDate)),
    end: endOfDay(new Date(endDate)),
  }

  for (const range of dateRange) {
    const rangeStart = startOfDay(new Date(range.startDate))
    const rangeEnd = endOfDay(new Date(range.endDate))

    if (
      isWithinInterval(targetInterval.start, {
        start: rangeStart,
        end: rangeEnd,
      }) ||
      isWithinInterval(targetInterval.end, {
        start: rangeStart,
        end: rangeEnd,
      }) ||
      (targetInterval.start < rangeStart && targetInterval.end > rangeEnd)
    ) {
      return true
    }
  }

  return false
}

const RoomPaymentForm = ({
  clientSecret,
  handlePaymentSuccess,
}: RoomPaymentFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { bookingRoomData, resetBookRoom } = useBookRoom()
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!stripe) return
    if (!clientSecret) return
    handlePaymentSuccess(false)
    setIsLoading(false)
  }, [stripe])

  const handleSubmit = async (e: React.FormEvent) => {
    // resetBookRoom()

    e.preventDefault()
    setIsLoading(true)

    if (!stripe || !elements || !bookingRoomData) {
      return
    }

    try {
      //dates overlaps
      const bookings = await axios.get(
        `/api/booking/${bookingRoomData.room.id}`
      )
      const roomBookingDates = bookings.data.map((booking: Booking) => {
        return {
          startDate: booking.startDate,
          endDate: booking.endDate,
        }
      })

      const overlapFound = hasOverlap(
        bookingRoomData.startDate,
        bookingRoomData.endDate,
        roomBookingDates
      )

      if (overlapFound) {
        setIsLoading(false)
        return toast({
          variant: 'destructive',
          description:
            'Oops! Some of the days you are trying to book have already been reserved. Please go back and select different dates or rooms.',
        })
      }

      stripe
        .confirmPayment({ elements, redirect: 'if_required' })
        .then((result) => {
          console.log('result: ', result)
          if (!result.error) {
            axios
              .patch(`/api/booking/${result.paymentIntent.id}`)
              .then((res) => {
                toast({
                  variant: 'success',
                  description: 'Room Reserved!',
                })
                router.refresh()
                resetBookRoom()
                handlePaymentSuccess(true)
                setIsLoading(false)
              })
              .catch((err) => {
                toast({
                  variant: 'destructive',
                  description: 'Something went wrong!',
                })

                setIsLoading(false)
              })
          } else {
            console.log('error')
            setIsLoading(false)
          }
        })
    } catch (err: any) {
      console.log('err: ', err)
      setIsLoading(false)
    }
  }

  if (!bookingRoomData?.startDate || !bookingRoomData.endDate)
    return <div>Missing reservation dates...</div>

  const startDate = moment(bookingRoomData?.startDate).format('DD/MM/yyyy')
  const endDate = moment(bookingRoomData?.endDate).format('DD/MM/yyyy')

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <h2 className="font-semibold mb-2 text-lg">Billing Address</h2>
      <AddressElement options={{ mode: 'billing' }} />

      <h2 className="font-semibold mb-2 mt-2 text-lg">Payment Information</h2>
      <PaymentElement options={{ layout: 'tabs' }} id="payment-element" />

      <div className="flex flex-col gap-1 mt-4">
        <Separator />
        <div className="flex flex-col gap-1 bg-white rounded-lg p-2 mt-4 mb-4">
          <h2 className="font-semibold mb-1 text-lg">Your booking summary</h2>
          <div>You will check-in on {startDate} at 5PM</div>
          <div>You will check-out on {endDate} at 5PM</div>
          {bookingRoomData?.breakFastIncluded && (
            <div>You will be served breakfast each day at 8AM</div>
          )}
        </div>
        <Separator />
        <div className="font-bold text-lg p-2 mt-4 mb-4 bg-white rounded-lg">
          {bookingRoomData?.breakFastIncluded && (
            <div className="mb-2">
              Breakfast Price: ${bookingRoomData?.room.breakFastPrice}
            </div>
          )}
          Total Price: ${bookingRoomData?.totalPrice}
        </div>
      </div>

      {isLoading && (
        <Alert className="mb-4">
          <AlertCircleIcon className="h-4 w-4 stroke-black" />
          <AlertTitle>Payment Processing...</AlertTitle>
          <AlertDescription>
            Please stay on this page as we process your payment
          </AlertDescription>
        </Alert>
      )}

      <Button disabled={isLoading}>
        {isLoading ? 'Processing Payment' : 'Pay Now'}
      </Button>
    </form>
  )
}

export default RoomPaymentForm
