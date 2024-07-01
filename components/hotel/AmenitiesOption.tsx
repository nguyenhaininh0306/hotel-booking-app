import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form'
import { Checkbox } from '../ui/checkbox'

const AmenitiesOption = ({ form }: { form: React.ReactNode | any }) => {
  return (
    <div>
      <FormLabel>Choose Amenities</FormLabel>
      <FormDescription>Choose Amenities popular in your hotel</FormDescription>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <FormField
          control={form.control}
          name="gym"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Gym</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="spa"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Spa</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bar"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Bar</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="laundry"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Laundry</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="restaurant"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Restaurant</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shopping"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Shopping</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="freeParking"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Free Parking</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bikeRental"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Bike Rental</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="freeWifi"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Free Wifi</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="movieNights"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Movie Nights</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="swimmingPool"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Swimming Pool</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coffeeShop"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Coffee Shop</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default AmenitiesOption
