'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Hotel, Room } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import AmenitiesOption from './AmenitiesOption'
import UploadImage from '../common/UploadImage'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { Loader2, Pencil, PencilLineIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface AddRoomFormProps {
  hotel?: Hotel & {
    rooms: Room[]
  }
  room?: Room
  handleDialogOpen: () => void
  handleImageDelete: (image: string) => void
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters long.',
  }),
  description: z.string().min(10, {
    message: 'Title must be at least 10 characters long.',
  }),
  bedCount: z.coerce.number().min(1, { message: 'Bed count is required' }),
  guestCount: z.coerce.number().min(1, { message: 'Guest count is required' }),
  bathroomCount: z.coerce
    .number()
    .min(1, { message: 'Bathroom count is required' }),
  kingBed: z.coerce.number().min(0),
  queenBed: z.coerce.number().min(0),
  image: z.string().min(1, { message: 'Image is required' }),
  breakFastPrice: z.coerce.number().optional(),
  roomPrice: z.coerce.number().min(1, { message: 'Room price is required' }),
  roomService: z.boolean().optional(),
  TV: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  soundProofed: z.boolean().optional(),
})

const AddRoomForm = ({
  hotel,
  room,
  handleDialogOpen,
  handleImageDelete,
}: AddRoomFormProps) => {
  const [image, setImage] = useState<string | undefined>(room?.image)
  const [imageIsDeleting, setImageIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: room || {
      title: '',
      description: '',
      bedCount: 0,
      guestCount: 0,
      bathroomCount: 0,
      kingBed: 0,
      queenBed: 0,
      image: '',
      breakFastPrice: 0,
      roomPrice: 0,
      roomService: false,
      TV: false,
      balcony: false,
      freeWifi: false,
      cityView: false,
      oceanView: false,
      forestView: false,
      mountainView: false,
      airCondition: false,
      soundProofed: false,
    },
  })

  useEffect(() => {
    if (typeof image === 'string') {
      form.setValue('image', image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  }, [image])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    if (hotel && room) {
      //update
      axios
        .patch(`/api/room/${room.id}`, values)
        .then((res) => {
          toast({
            variant: 'success',
            description: 'Room updated!!!',
          })

          router.refresh()
          setIsLoading(false)
          handleDialogOpen()
        })
        .catch((err) => {
          console.log(err)
          toast({
            variant: 'destructive',
            description: 'Something went wrong!',
          })

          setIsLoading(false)
        })
    } else {
      //create
      if (hotel) {
        axios
          .post('/api/room', { ...values, hotelId: hotel.id })
          .then((res) => {
            toast({
              variant: 'success',
              description: 'Room created!!!',
            })

            router.refresh()
            setIsLoading(false)
            handleDialogOpen()
          })
          .catch((err) => {
            console.log(err)
            toast({
              variant: 'destructive',
              description: 'Something went wrong!',
            })

            setIsLoading(false)
          })
      }
    }
  }

  return (
    <div className="max-h-[75vh] overflow-y-auto px-2">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Room Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>Provide your Room name</FormDescription>
                <FormControl>
                  <Input placeholder="Double Room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Room Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>
                  Is there anything special about this room?
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Have a beautiful view of the ocean while in this room"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AmenitiesOption form={form} />

          <UploadImage
            form={form}
            image={image}
            setImage={setImage}
            imageIsDeleting={imageIsDeleting}
            handleImageDelete={handleImageDelete}
            toast={toast}
          />

          <div className="flex flex-row gap-6">
            <div className="flex-1 flex flex-col gap-6">
              <FormField
                control={form.control}
                name="roomPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Room Price in USD <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      State the price for staying in this room for 24hrs
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bedCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bed Count <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      How many beds are available in this room
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Guest Count <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      How many guests are allowed in this room.
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={20} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathroomCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bathroom Count <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      How many bathrooms in this room.
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <FormField
                control={form.control}
                name="breakFastPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Breakfast Price in USD</FormLabel>
                    <FormDescription>
                      State the price for staying in this room for 24hrs
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kingBed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>King bed Count</FormLabel>
                    <FormDescription>
                      How many king beds are available in this room?
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="queenBed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Queen bed Count</FormLabel>
                    <FormDescription>
                      How many queen beds are available in this room?
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} max={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="pt-4 pb-4">
            {room ? (
              <Button
                disabled={isLoading}
                className="w-full"
                type="button"
                onClick={form.handleSubmit(onSubmit)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4" /> Updating
                  </>
                ) : (
                  <>
                    <PencilLineIcon className="mr-2 h-4 w-4" /> Update
                  </>
                )}
              </Button>
            ) : (
              <Button
                disabled={isLoading}
                className="w-full"
                type="button"
                onClick={form.handleSubmit(onSubmit)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4" /> Creating
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" /> Create Room
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddRoomForm
