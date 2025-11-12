import { testimonials } from "@/lib/data/content";
import Image from "next/image";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24">
      <div className="container-custom relative">
        <div className="absolute inset-0 z-0 pointer-events-none -my-24">
          <Image
            src="/images/testimonial-image-1-c.png"
            alt="Testimonials Background"
            fill
            className="object-contain"
            style={{ objectPosition: 'top left' }}
            priority={false}
          />
        </div>
        <div className="relative z-10">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-scroll-100 border-2 border-moloch-800 rounded-md overflow-hidden"
                >
                  <div className="bg-moloch-500 border-b-2 border-moloch-800 p-8">
                    <Image
                      src={testimonial.iconSrc}
                      alt="Testimonial"
                      width={43}
                      height={54}
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
