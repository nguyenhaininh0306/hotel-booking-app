import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Loader2, XCircle } from 'lucide-react'
import { UploadButton } from '../uploadthing'

interface UploadImageProps {
  form: any
  image?: string
  setImage: (url: string) => void
  imageIsDeleting: boolean
  handleImageDelete: (image: string) => void
  toast: (message: {}) => void
}

const UploadImage = ({
  form,
  image,
  setImage,
  imageIsDeleting,
  handleImageDelete,
  toast,
}: UploadImageProps) => {
  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-3">
          <FormLabel>Upload an Image *</FormLabel>
          <FormDescription>
            Choose an image that will show-case your hotel
          </FormDescription>
          <FormControl>
            {image ? (
              <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                <Image src={image} alt="" fill className="object-contain" />
                <Button
                  onClick={() => handleImageDelete(image)}
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-[-12px] top-0"
                >
                  {imageIsDeleting ? <Loader2 /> : <XCircle />}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center max-w-[4000px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log('Files: ', res)
                    setImage(res[0].url)
                    toast({
                      variant: 'success',
                      description: 'Upload Completed',
                    })
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast({
                      variant: 'destructive',
                      description: `${error.message}`,
                    })
                  }}
                />
              </div>
            )}
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default UploadImage
