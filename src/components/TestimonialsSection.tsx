"use client";

import { testimonials } from "@/lib/data/content";
import Image from "next/image";

const testimonialImages = [
  "/images/testimonial-image-1-bw.png",
  "/images/testimonial-image-1-c.png",
  "/images/testimonial-image-2-bw.png",
  "/images/testimonial-image-2-c.png",
];

export default function TestimonialsSection() {
  // Deterministic image selection based on 16-minute intervals (no flash, no hydration mismatch)
  const interval = Math.floor(Date.now() / (1000 * 60 * 16)); // 16 minutes
  const imageSrc = testimonialImages[interval % testimonialImages.length];
  return (
    <section id="testimonials" className="relative">
      <div className="container-custom relative min-h-[843px]">
        <div className="absolute top-0 md:bottom-0 md:top-auto left-0 md:right-0 md:left-auto z-0 pointer-events-none max-w-[632px]">
          <Image
            src={imageSrc}
            alt="Testimonials Background"
            width={632}
            height={843}
            className="h-auto object-contain object-bottom"
            priority={false}
          />
        </div>
        <div className="relative z-10 pt-[520px] pb-12 md:py-12 lg:py-24">
          <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7 text-center lg:text-left mb-[60px]">
            <h2 className="text-heading-lg text-moloch-800 mb-8">
              Words From Our Clients
            </h2>
            <p className="text-body-lg text-moloch-800">
              Discover firsthand accounts of our impact from satisfied clients.
              Explore their stories of success and partnership.
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <div className="grid-custom gap-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="col-span-4 bg-scroll-100 border-2 border-moloch-800 rounded-md overflow-hidden"
                >
                  <div className="bg-moloch-500 border-b-2 border-moloch-800 p-8">
                    <Image
                      src={testimonial.iconSrc}
                      alt="Testimonial"
                      width={43}
                      height={54}
                      style={{ width: 'auto', height: 'auto' }}
                      data-legacy={testimonial.id}
                    />
                  </div>
                  <div className="p-10">
                    <>
                      <p className="text-heading-md">{testimonial.quoteLead}</p>
                      <p className="text-body-lg mb-8">
                        {testimonial.quoteRest}
                      </p>
                      <p className="text-heading-sm">
                        {testimonial.authorName}
                        <br />
                        <span className="text-label-sm">
                          {testimonial.authorTitle}
                        </span>
                      </p>
                    </>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
