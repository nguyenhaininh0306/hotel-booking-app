import prismaDb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'

export const getHotelByUserId = async () => {
  try {
    const { userId } = auth()

    if (!userId) {
      throw new Error('Unauthorized')
    }

    const hotels = await prismaDb.hotel.findMany({
      where: {
        userId,
      },
      include: {
        rooms: true,
      },
    })

    if (!hotels) return null

    return hotels
  } catch (error: any) {
    throw new Error(error)
  }
}
