"use client";

import { Dialog, DialogTrigger, DialogTitle, DialogDescription, DialogPortal, DialogOverlay } from "./dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from "./button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface GalleryDialogProps {
  images: string[]
  title: string
  initialIndex: number
  children: React.ReactNode
}

export function GalleryDialog({ images, title, initialIndex, children }: GalleryDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex)
    }
  }, [open, initialIndex])

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-none w-screen h-screen p-0 border-none bg-black z-50 m-0 fixed"
          onClick={() => setOpen(false)}
        >
        <DialogTitle className="sr-only">
          {title} - Image {currentIndex + 1} of {images.length}
        </DialogTitle>

        <DialogDescription className="sr-only">
          Gallery view of {title} project. Navigate using left and right buttons or swipe.
        </DialogDescription>

        {/* Custom close button that's always visible */}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-[60] h-8 w-8 rounded-full 
            bg-black/60 hover:bg-black/80 
            border border-white/30 hover:border-white/50
            text-white shadow-md hover:shadow-lg"
          aria-label="Close gallery"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Main image container that fills most of the screen */}
          <div className="relative w-full flex-grow flex items-center justify-center p-2 sm:p-4 pt-10 sm:pt-4">
            <div className="w-full bg-black/20 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={images[currentIndex] || "/placeholder.svg"}
                  alt={`${title} image ${currentIndex + 1} of ${images.length}`}
                  width={1600}
                  height={1200}
                  className="max-w-[80%] max-h-[70vh] sm:max-h-[80vh] w-auto h-auto object-contain"
                  onClick={(e) => e.stopPropagation()} // Prevent closing the dialog when clicking the image
                />
              </div>
            </div>

            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full 
                  bg-black/60 hover:bg-black/80 
                  border border-white/30 hover:border-white/50
                  opacity-70 sm:opacity-80 transition-opacity group-hover:opacity-100
                  shadow-md hover:shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-7 w-7 text-white drop-shadow-sm" />
              </Button>
            )}

            {images.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 h-12 w-12 rounded-full 
                  bg-black/60 hover:bg-black/80 
                  border border-white/30 hover:border-white/50
                  opacity-70 sm:opacity-80 transition-opacity group-hover:opacity-100
                  shadow-md hover:shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </Button>
            )}
          </div>

          {/* Pagination below the image */}
          {images.length > 1 && (
            <div className="w-full flex justify-center py-5 mb-3">
              <div className="flex gap-1.5 z-40">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full ${
                      idx === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/40"
                    } transition-all duration-300`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

