import prismaDb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'

export const getBookingByHotelOwnerId = async () => {
  try {
    const { userId } = auth()

    if (!userId) {
      throw new Error('Unauthorized')
    }

    const bookings = await prismaDb.booking.findMany({
      where: {
        hotelOwnerId: userId,
      },
      include: {
        Room: true,
        Hotel: true,
      },
      orderBy: {
        bookedAt: 'desc',
      },
    })

    if (!bookings) return null

    return bookings
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}