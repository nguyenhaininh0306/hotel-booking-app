import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

interface LocationSelectProps {
  form: React.ReactNode | any
  isLoading: boolean
  countries: CountryArray[]
  states: StateArray[]
  cities: CitiesArray[]
}

interface CountryArray {
  isoCode: string
  name: string
  currency: string
  flag: string
}

interface StateArray {
  isoCode: string
  name: string
  countryCode: string
}

interface CitiesArray {
  name: string
  countryCode: string
  stateCode: string
}

const LocationSelect = ({
  form,
  isLoading,
  countries,
  states,
  cities,
}: LocationSelectProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Country</FormLabel>
              <FormDescription>
                In which country is your property located
              </FormDescription>
              <Select
                disabled={isLoading}
                onValueChange={(val) => {
                  form.setValue('state', '')
                  form.setValue('city', '')
                  field.onChange(val)
                }}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue
                    defaultValue={field.value}
                    placeholder="Select a Country"
                  />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select State</FormLabel>
              <FormDescription>
                In which state is your property located
              </FormDescription>
              <Select
                disabled={isLoading || states.length < 1}
                onValueChange={(val) => {
                  form.setValue('city', '')
                  field.onChange(val)
                }}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue
                    defaultValue={field.value}
                    placeholder="Select a State"
                  />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select City</FormLabel>
            <FormDescription>
              In which city is your property located
            </FormDescription>
            <Select
              disabled={isLoading || cities.length < 1}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <SelectTrigger className="bg-background">
                <SelectValue
                  defaultValue={field.value}
                  placeholder="Select a City"
                />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="locationDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location Description</FormLabel>
            <FormDescription>
              Provide your detail location description of your hotel
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="Located at the very end of the beach road!"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default LocationSelect
