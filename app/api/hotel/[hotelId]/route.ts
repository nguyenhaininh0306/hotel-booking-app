import prismaDb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const body = await req.json()
    const { userId } = auth()

    if (!params.hotelId) {
      return new NextResponse('Hotel Id is required', { status: 400 })
    }

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const hotel = await prismaDb.hotel.update({
      where: {
        id: params.hotelId,
      },
      data: {
        ...body,
      },
    })

    return NextResponse.json(hotel)
  } catch (error) {
    console.log('Error at /api/hotel/hotelId PATCH', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
