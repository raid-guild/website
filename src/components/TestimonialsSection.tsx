import Image from "next/image";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24">
      <Image
        src="/images/testimonials-back.svg"
        alt="Testimonials Background"
        fill
        className="object-cover opacity-30 -z-10"
      />
      <div className="container-custom">
        <div className="grid-custom gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-6 text-center mb-[60px]">
            <h2 className="text-heading-lg font-bold text-moloch-800 mb-4">
              Words From Our Clients
            </h2>
            <p className="text-body-lg text-moloch-800">
              Discover firsthand accounts of our impact from satisfied clients.
              Explore their stories of success and partnership.
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-scroll-100 border-2 border-moloch-800 rounded-md overflow-hidden">
                <div className="bg-moloch-400 border-b-2 border-moloch-800 p-8">
                  <Image
                    src="/images/icon-testimonials-1.svg"
                    alt="Testimonial"
                    width={43}
                    height={54}
                  />
                </div>
                <div className="p-10">
                  <p className="text-body-lg text-moloch-800 mb-8">
                    <span className="font-bold text-heading-md">
                      &quot;I&apos;ve worked with RaidGuild for over two
                      years...
                    </span>
                    {"  "}
                    and can confidently say they&apos;re a reliable, innovative
                    team. Their technical expertise and collaborative spirit
                    have consistently delivered exceptional results. I highly
                    recommend them as a partner in any project.&quot;
                  </p>
                  <p className="text-heading-md font-bold text-moloch-800">
                    Kevin Owocki
                    <br />
                    <span className="font-normal">
                      co-founder of gitcoin, allo.capital
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-scroll-100 border-2 border-moloch-800 rounded-md overflow-hidden">
                <div className="bg-moloch-400 border-b-2 border-moloch-800 p-8">
                  <Image
                    src="/images/icon-testimonials-2.svg"
                    alt="Testimonial"
                    width={43}
                    height={54}
                  />
                </div>
                <div className="p-10">
                  <p className="text-body-lg text-moloch-800 mb-8">
                    <span className="font-bold text-heading-md">
                      &quot;For me, it is the strength of RaidGuild&apos;s
                      culture...
                    </span>{" "}
                    I really appreciate the values, the integrity, and the
                    professionalism of all of the team. It feels like a team
                    that we can build a relationship with.&quot;
                  </p>
                  <p className="text-heading-md font-bold text-moloch-800">
                    Adrienne Youngman
                    <br />
                    <span className="font-normal">
                      CEO at partisia blockchain
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-scroll-100 border-2 border-moloch-800 rounded-md overflow-hidden">
                <div className="bg-moloch-400 border-b-2 border-moloch-800 p-8">
                  <Image
                    src="/images/icon-testimonials-3.svg"
                    alt="Testimonial"
                    width={43}
                    height={54}
                  />
                </div>
                <div className="p-10">
                  <p className="text-body-lg text-moloch-800 mb-8">
                    <span className="font-bold text-heading-md">
                      &quot;Watching Raid Guild grow out of MetaCartel has been
                      an inspiring experiment...
                    </span>{" "}
                    in decentralized coordination. Their dedication and work set
                    a high bar for the future of work and online
                    collaboration.&quot;
                  </p>
                  <p className="text-heading-md font-bold text-moloch-800">
                    James Young
                    <br />
                    <span className="font-normal">founder at collab.land</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
