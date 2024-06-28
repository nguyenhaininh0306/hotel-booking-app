'use client'

import { Hotel, Room } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { UploadButton } from '../uploadthing'
import { useToast } from '../ui/use-toast'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Loader2, Pencil, PencilLineIcon, XCircle } from 'lucide-react'
import axios from 'axios'
import useLocation from '@/hooks/useLocation'
import { ICity, IState } from 'country-state-city'
import UploadImage from '../common/UploadImage'
import LocationSelect from './LocationSelect'
import { useRouter } from 'next/navigation'

interface AddHotelFormProps {
  hotel: HotelWithRooms | null
}

export type HotelWithRooms = Hotel & {
  rooms: Room[]
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters long',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters long',
  }),
  image: z.string().min(1, {
    message: 'Image is required',
  }),
  country: z.string().min(1, {
    message: 'Country is required',
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: 'Location description must be at least 10 characters long',
  }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  shopping: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  movieNights: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),
})

const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
  const [image, setImage] = useState<string | undefined>(hotel?.image)
  const [imageIsDeleting, setImageDeleting] = useState(false)
  const [states, setStates] = useState<IState[]>([])
  const [cities, setCities] = useState<ICity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const { getAllCountries, getCountryStates, getStateCities } = useLocation()
  const countries = getAllCountries()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: hotel || {
      title: '',
      description: '',
      image: '',
      country: '',
      state: '',
      city: '',
      locationDescription: '',
      gym: false,
      spa: false,
      bar: false,
      laundry: false,
      restaurant: false,
      shopping: false,
      freeParking: false,
      bikeRental: false,
      freeWifi: false,
      movieNights: false,
      swimmingPool: false,
      coffeeShop: false,
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

  useEffect(() => {
    const selectedCountry = form.watch('country')
    const countryStates = getCountryStates(selectedCountry)

    if (countryStates) {
      setStates(countryStates)
    }
  }, [form.watch('country')])

  useEffect(() => {
    const selectedCountry = form.watch('country')
    const selectedState = form.watch('state')
    const stateCities = getStateCities(selectedCountry, selectedState)

    if (stateCities) {
      setCities(stateCities)
    }
  }, [form.watch('country'), form.watch('state')])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    if (hotel) {
      //update
      axios
        .patch(`/api/hotel/${hotel.id}`, values)
        .then((res) => {
          toast({
            variant: 'success',
            description: 'Hotel updated!!!',
          })

          router.push(`/hotel/${res.data.id}`)
          setIsLoading(false)
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
      axios
        .post('/api/hotel', values)
        .then((res) => {
          toast({
            variant: 'success',
            description: 'Hotel created!!!',
          })

          router.push(`/hotel/${res.data.id}`)
          setIsLoading(false)
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

  const handleImageDelete = (image: string) => {
    setImageDeleting(true)
    const imageKey = image.substring(image.lastIndexOf('/') + 1)

    axios
      .post('/api/uploadthing/delete', { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage('')
          toast({
            variant: 'success',
            description: 'Image removed',
          })
        }
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          description: 'Something went wrong',
        })
      })
      .finally(() => {
        setImageDeleting(false)
      })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-lg font-semibold">
            {hotel ? 'Update your hotel' : 'Describe your hotel'}
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Title</FormLabel>
                    <FormDescription>Provide your hotel name</FormDescription>
                    <FormControl>
                      <Input placeholder="Beach Hotel" {...field} />
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
                    <FormLabel>Hotel Description</FormLabel>
                    <FormDescription>
                      Provide your detail description of your hotel
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Beach Hotel is parked with many awesome  amenities!"
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
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <LocationSelect
                form={form}
                isLoading={isLoading}
                countries={countries}
                states={states}
                cities={cities}
              />

              <div className="flex justify-between gap-2 flex-wrap">
                {hotel ? (
                  <Button
                    disabled={isLoading}
                    className="max-w-[150px]"
                    type="submit"
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
                    className="max-w-[150px]"
                    type="submit"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4" /> Creating
                      </>
                    ) : (
                      <>
                        <Pencil className="mr-2 h-4 w-4" /> Create Hotel
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddHotelForm
