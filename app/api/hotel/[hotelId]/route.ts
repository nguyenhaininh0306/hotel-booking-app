import prismaDb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const { userId } = auth()

    if (!params.hotelId) {
      return new NextResponse('Hotel Id is required', { status: 400 })
    }

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const hotel = await prismaDb.hotel.delete({
      where: {
        id: params.hotelId,
      },
    })

    return NextResponse.json(hotel)
  } catch (error) {
    console.log('Error at /api/hotel/hotelId DELETE', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
