import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"

interface GalleryDialogProps {
  images: string[];
  title: string;
  children: React.ReactNode;
  initialIndex?: number;
}

export function GalleryDialog({ images, title, children, initialIndex = 0 }: GalleryDialogProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
    // Reset index when dialog opens
    const handleOpenChange = (open: boolean) => {
      if (open) {
        setCurrentIndex(initialIndex);
      }
    };

  const showPreviousImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full h-[90vh] sm:h-[85vh] md:h-[90vh]">
        <div className="relative h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={images[currentIndex]}
              alt={`${title} full screenshot ${currentIndex + 1}`}
              width={1920}
              height={1080}
              className="max-h-[85vh] w-auto object-contain"
              priority
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="outline"
              size="icon"
              onClick={showPreviousImage}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={showNextImage}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex gap-1">
              {images.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full p-0 ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span className="sr-only">Go to image {index + 1}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

