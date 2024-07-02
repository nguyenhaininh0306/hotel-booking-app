import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

const RoomOption = ({ form }: { form: React.ReactNode | any }) => {
  return (
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
  )
}

export default RoomOption
