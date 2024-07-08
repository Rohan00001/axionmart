"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Footer from "@/components/Footer";

interface CardDetails {
  image: string;
  title: string;
  price: string;
}

interface Testimonial {
  name: string;
  text: string;
  avatar: string;
}

// Card details array
const cardDetails: CardDetails[] = [
  {
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHNoaXJ0fGVufDB8fDB8fHww",
    title: "Borlong White T-Shirt",
    price: "₹399.99",
  },
  {
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdGhpbmd8ZW58MHwxfDB8fHww",
    title: "Samtref T-Shirts",
    price: "₹799.99",
  },
  {
    image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amVhbnN8ZW58MHwxfDB8fHww",
    title: "WahtsTrap Jeans",
    price: "₹1500.00",
  },
  {
    image: "https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmd8ZW58MHwxfDB8fHww",
    title: "Hefut Sports Shoes",
    price: "₹999.99",
  },
  {
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFja2V0fGVufDB8MXwwfHx8MA%3D%3D",
    title: "Stylish Denim Jacket",
    price: "₹1999.00",
  },
  {
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBzaG9lc3xlbnwwfDF8MHx8fDA%3D",
    title: "Elegant Women Shoes",
    price: "₹1499.99",
  },
  {
    image: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fExhdGhlciUyMGJhZ3xlbnwwfDF8MHx8fDA%3D",
    title: "Premium Leather Bag",
    price: "₹2999.00",
  },
  {
    image: "https://images.unsplash.com/photo-1614703418052-d5b893d495bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d3Jpc3R3YXRjaHxlbnwwfDF8MHx8fDA%3D",
    title: "Memba Classic Wrist Watch",
    price: "₹4999.00",
  },
  {
    image: "https://images.unsplash.com/photo-1536724609414-5f000e9a2745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEhpZ2glMjBFbmQlMjBHYW1pbmclMjBMYXB0b3B8ZW58MHwxfDB8fHww",
    title: "Mac Book",
    price: "₹84999.00",
  }
];


// Testimonials array
const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    text: "Axionmart is the best platform I have ever used for buying and selling. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8MXwwfHx8Mg%3D%3D",
  },
  {
    name: "Jane Smith",
    text: "The user interface is so friendly and easy to navigate. Great experience!",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHBlb3BsZXxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    name: "Alice Johnson",
    text: "Fast, secure, and reliable. Axionmart has it all!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHwy",
  },
  {
    name: "Bob Williams",
    text: "I have been using Axionmart for a while now and I am very happy with the service.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlfGVufDB8fDB8fHwy",
  },
  {
    name: "Eve Brown",
    text: "Axionmart is the best platform I have ever used for buying and selling. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHwy",
  },
  {
    name: "Tom Davis",
    text: "The user interface is so friendly and easy to navigate. Great experience!",
    avatar: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHBlb3BsZXxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    name: "Sarah Wilson",
    text: "Fast, secure, and reliable. Axionmart has it all!",
    avatar: "https://images.unsplash.com/photo-1589156288859-f0cb0d82b065?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHBlb3BsZXxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    name: "David Miller",
    text: "I have been using Axionmart for a while now and I am very happy with the service.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHBlb3BsZXxlbnwwfHwwfHx8Mg%3D%3D",
  }
];

export default function Home() {
  const plugin = React.useRef(Autoplay({
    delay: 2000
  }));

  return (
    <div className="min-h-screen w-full flex flex-col">
      <nav className="flex items-center justify-between w-full px-6 py-4 bg-[#111416] rounded-b-2xl">
        <div className="z-10 h-10 w-10">
          <Image src="/logo.png" width={60} height={60} alt="Logo" />
        </div>
        <Link href="/sign-in" className="hover:underline text-white">
          Sign in
        </Link>
      </nav>

      <div className="bg-[url('/landing.jpg')] bg-top bg-no-repeat bg-cover min-h-screen flex flex-col items-center justify-center flex-1">
        <h1 className="md:text-6xl text-2xl font-extrabold tracking-tight text-secondary-foreground">
          Welcome to Axionmart
        </h1>
        <p className="text-2xl text-[#BDC1C4]">The best place to buy and sell anything</p>
        <Link href="/sign-up">
          <Button variant="link" size="icon">
            <span className="mt-8 text-4xl">Getting started</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center p-8 space-y-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-secondary-foreground">Why Axionmart?</h2>
        <p className="text-secondary-foreground">Axionmart is the best platform to buy and sell products. We provide a secure and reliable platform for all your needs.</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="flex flex-col items-center space-y-4 p-8">
            <User2 size={48} />
            <h3 className="text-xl font-semibold text-secondary-foreground">User Friendly</h3>
            <p className="text-secondary-foreground">Our platform is designed to be user-friendly and easy to navigate.</p>
          </Card>
          <Card className="flex flex-col items-center space-y-4 p-8">
            <User2 size={48} />
            <h3 className="text-xl font-semibold text-secondary-foreground">Secure</h3>
            <p className="text-secondary-foreground">We take security seriously and ensure your data is safe with us.</p>
          </Card>
          <Card className="flex flex-col items-center space-y-4 p-8">
            <User2 size={48} />
            <h3 className="text-xl font-semibold text-secondary-foreground">Reliable</h3>
            <p className="text-secondary-foreground">Our platform is reliable and ensures you get the best experience.</p>
          </Card>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cardDetails.map((card, index) => (
            <Card key={index} className="flex flex-col items-center space-y-4 p-8">
              <Image src={card.image} width={200} height={200} alt="Product Image" />
              <h3 className="text-xl font-semibold text-secondary-foreground">{card.title}</h3>
              <p className="text-secondary-foreground">{card.price}</p>
              <Button>Buy now</Button>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full items-center justify-center p-8 space-y-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-secondary-foreground">
          Testimonials
        </h2>
        <Carousel
          className="w-full max-w-4xl"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          plugins={[plugin.current]}
        >
          <CarouselContent className="-ml-1">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 gap-6">
                      <div className="w-20 h-20 bg-white rounded-full overflow-hidden">
                        <Image src={testimonial.avatar} width={80} height={80} alt={testimonial.name} />
                      </div>
                      <p className="text-lg text-secondary-foreground mt-4 text-center">{testimonial.text}</p>
                      <span className="text-md text-secondary-foreground mt-2">{testimonial.name}</span>
                    </CardContent>
                  </Card>

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Footer />
    </div >
  );
}
