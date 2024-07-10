import React from 'react'
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';

interface SalesList {
    id: number
    imgURL: string
}

const salesList: SalesList[] = [
    {
        id: 1,
        imgURL: "https://i0.wp.com/craftmart.in/wp-content/uploads/2023/06/White_-Light-Purple_-and-Grey-Simple-Light-Fashion-Retail-Website-_3_.webp?fit=1366%2C768&ssl=1"
    },
    {
        id: 2,
        imgURL: "https://mobileclusters.com/wp-content/uploads/2023/05/Best-5G-Phone-Under-20K-In-India-2023.webp"
    },
    {
        id: 3,
        imgURL: "https://hometown.gumlet.io/media/cms/icons/MHD-banner.jpg?w=480&dpr=2.6"
    }
]

function HomePageCarousal() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {salesList.map((item) => (
                    <CarouselItem key={item.id}>
                        <Card>
                            <CardContent>
                                <div className='w-full flex items-center justify-center py-6'>
                                    <Image
                                        src={item.imgURL}
                                        alt="sales"
                                        width={900}
                                        height={600}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}

export default HomePageCarousal