'use client'

import React, { useEffect, useState } from 'react'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import useBookRoom from '@/hooks/useBookRoom'
import RoomCard from '../room/RoomCard'
import RoomPaymentForm from './RoomPaymentForm'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

const BookRoomClient = () => {
  const { bookingRoomData, clientSecret } = useBookRoom()
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [pageLoad, setPageLoad] = useState(false)

  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setPageLoad(true)
  }, [])

  const option: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: theme === 'dark' ? 'night' : 'stripe',
      labels: 'floating',
    },
  }

  const handlePaymentSuccess = (value: boolean) => {
    setPaymentSuccess(value)
  }

  if (pageLoad && !paymentSuccess && (!bookingRoomData || !clientSecret))
    return (
      <div className="flex items-center flex-col gap-4">
        <div>Oops! This page could not be property loaded...</div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push('/')}>
            Go Home
          </Button>
          <Button variant="outline" onClick={() => router.push('/my-bookings')}>
            View My Booking
          </Button>
        </div>
      </div>
    )

  if (paymentSuccess)
    return (
      <div className="flex items-center flex-col gap-4">
        <div className="text-teal-500 text-center">Payment Success</div>
        <Button onClick={() => router.push('/my-bookings')}>
          View Bookings
        </Button>
      </div>
    )

  return (
    <div className="max-x-[700px] mx-auto">
      {clientSecret && bookingRoomData && (
        <div>
          <h3 className="text-2xl font-semibold mb-6">
            Complete payment to reserve this room
          </h3>
          <div className="mb-6">
            <RoomCard
              room={bookingRoomData.room}
              handleImageDelete={() => {}}
            />
          </div>

          <Elements stripe={stripePromise} options={option}>
            <RoomPaymentForm
              clientSecret={clientSecret}
              handlePaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
        </div>
      )}
    </div>
  )
}

export default BookRoomClient
