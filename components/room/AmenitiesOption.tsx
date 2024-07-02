'use client'

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
      <FormLabel>Choose Room Amenities</FormLabel>
      <FormDescription>What makes this room a good choice?</FormDescription>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <FormField
          control={form.control}
          name="roomService"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>24hrs Room Service</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="TV"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>TV</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="balcony"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Balcony</FormLabel>

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
              <FormLabel>Free wifi</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cityView"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>City view</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="oceanView"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Ocean view</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="forestView"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Forest view</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mountainView"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Mountain view</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="airCondition"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Air condition</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="soundProofed"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-md border p-4 space-y-0 gap-4 bg-white relative">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Sound Proofed</FormLabel>

              <FormLabel className="absolute inset-0 z-10 cursor-pointer"></FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default AmenitiesOption
