import Image from "next/image";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Home/Hero Section */}
      <section className="relative">
        <div className="container-custom mb-[100px]">
          <div className="grid-custom gap-4">
            <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-[60px]">
              <h1 className="text-heading-lg font-bold text-moloch-800 text-center pt-24">
                BUILDING WEB3
                <br />
                ONE RAID AT A TIME
              </h1>
              <p className="text-body-lg font-bold text-moloch-800 text-center">
                RaidGuild is a decentralized collective of mercenaries
                <br />
                ready to slay your web3 product demons
              </p>
              <p className="text-body-lg text-moloch-800 text-center">
                We're a battle-tested squad for full-stack development — smart
                contracts,
                <br />
                dApps, DAO tooling, and public goods – built for real impact
              </p>
              <Image
                src="/images/home-divider.svg"
                alt="Divider"
                width={300}
                height={36}
              />
              <div className="flex gap-4 flex-wrap w-full">
                <button className="flex-1 bg-moloch-400 text-[#F1EFEE] px-8 py-3 rounded-md text-label">
                  SUMMON A RAID
                </button>
                <button className="flex-1 bg-scroll-100 border-2 border-moloch-800 text-moloch-800 px-8 py-3 rounded-md text-label">
                  VIEW OUR WORK
                </button>
              </div>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <Image
                src="/images/home-image-1-c.png"
                alt="Raid Guild Hero"
                width={632}
                height={632}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Partner Logo Banner */}
        <div id="partner-logo-banner" className="bg-moloch-400 border-t-[10px] border-[#534A13] py-5">
          <div className="container-custom">
            <div className="flex items-center justify-center gap-16">
              <Image
                src="/images/logo-daohaus.svg"
                alt="DAOHaus"
                width={200}
                height={30}
                className="h-8 w-auto"
              />
              <Image
                src="/images/logo-Gitcoin.svg"
                alt="Gitcoin"
                width={200}
                height={30}
                className="h-8 w-auto"
              />
              <Image
                src="/images/logo-Gnosis.svg"
                alt="Gnosis"
                width={200}
                height={30}
                className="h-8 w-auto"
              />
              <Image
                src="/images/logo-Unlock.svg"
                alt="Unlock"
                width={200}
                height={30}
                className="h-8 w-auto"
              />
              <Image
                src="/images/logo-Pocket.svg"
                alt="Pocket"
                width={200}
                height={30}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-24">
        <Image
          src="/images/services-back.svg"
          alt="Services Background"
          fill
          className="object-cover opacity-30 -z-10"
        />
        <div className="container-custom">
          <div className="grid-custom gap-4">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <h2 className="text-heading-lg text-[#211E07] mb-4">
                Arsenal of Expertise
              </h2>
              <p className="text-body-lg text-[#211E07]">
                Epic skills wielded by Web3 warriors. Precision tools for
                decentralized dominance. Mastery unmatched
              </p>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-scroll-100 rounded-md p-8 flex flex-col items-center gap-5">
                  <h3 className="text-heading-md text-moloch-800">
                    DAO Consulting & Governance
                  </h3>
                  <Image
                    src="/images/services-wizard-1.svg"
                    alt="Wizard"
                    width={46}
                    height={60}
                  />
                  <p className="text-body-lg text-moloch-800 text-center">
                    We've built foundational Web3 tooling. We design DAOs,
                    governance frameworks, and tokenomic models that help
                    communities coordinate.
                  </p>
                </div>
                <div className="bg-scroll-100 rounded-md p-8 flex flex-col items-center gap-5">
                  <h3 className="text-heading-md text-moloch-800">
                    Marketing & Content Strategy
                  </h3>
                  <Image
                    src="/images/services-archer-2.svg"
                    alt="Archer"
                    width={46}
                    height={60}
                  />
                  <p className="text-body-lg text-moloch-800 text-center">
                    We create engaging content and growth strategies with
                    lasting impact to help Web3 projects educate, inform, and
                    activate their communities.
                  </p>
                </div>
                <div className="bg-scroll-100 rounded-md p-8 flex flex-col items-center gap-5">
                  <h3 className="text-heading-md text-moloch-800">
                    Product & System Design
                  </h3>
                  <Image
                    src="/images/services-scribe-3.svg"
                    alt="Scribe"
                    width={46}
                    height={60}
                  />
                  <p className="text-body-lg text-moloch-800 text-center">
                    We build intuitive user experiences and workflow-optimized
                    dApps. Making Web3 accessible, from DAO tooling to token
                    systems.
                  </p>
                </div>
                <div className="bg-scroll-100 rounded-md p-8 flex flex-col items-center gap-5">
                  <h3 className="text-heading-md text-moloch-800">
                    Full-Stack Development
                  </h3>
                  <Image
                    src="/images/services-alchemist-4.svg"
                    alt="Alchemist"
                    width={46}
                    height={60}
                  />
                  <p className="text-body-lg text-moloch-800 text-center">
                    Our software developers and smart contract engineers build
                    everything from dApps to Discord bots. If it powers the
                    decentralized Web, we build it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Scroller */}
        <div className="bg-moloch-800 border-t-[10px] border-[#534A13] py-5 overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            <span className="text-heading-sm text-scroll-100 whitespace-nowrap">
              Smart Contract Engineering
            </span>
            <span className="text-heading-sm text-scroll-100 whitespace-nowrap">
              Full-Stack dApp Development
            </span>
            <span className="text-heading-sm text-scroll-100 whitespace-nowrap">
              Token Systems
            </span>
            <span className="text-heading-sm text-scroll-100 whitespace-nowrap">
              DevOps & Infrastructure
            </span>
            <span className="text-heading-sm text-scroll-100 whitespace-nowrap">
              Smart Contract Auditing
            </span>
          </div>
        </div>
      </section>

      {/* Mercenaries Section */}
      <section id="mercenaries" className="py-24">
        <div className="container-custom">
          <div className="grid-custom gap-4">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <Image
                src="/images/mercenaries-image-1-c.png"
                alt="Mercenaries"
                width={632}
                height={632}
                className="w-full h-auto"
              />
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-16">
              <div>
                <h2 className="text-heading-lg text-moloch-800 mb-4">
                  Meet Your Mercenaries
                </h2>
                <p className="text-body-lg text-moloch-800">
                  Elite operators with specialized expertise and proven chops.
                  Battle-tested talent. Uncompromising quality.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 w-full">
                {[
                  "Dekan",
                  "EC Wireless",
                  "Scottpreneur",
                  "Takekek",
                  "Pupcakes",
                  "Suede",
                ].map((name) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-scroll-100 rounded-full border border-scroll-100"></div>
                    <span className="text-heading-sm text-moloch-800">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
              <Image
                src="/images/mercenaries-divider.svg"
                alt="Divider"
                width={450}
                height={28}
                className="my-16"
              />
              <div className="flex flex-col gap-8 w-full">
                <p className="text-body-lg text-moloch-800 text-center">
                  Have questions or ready to start a project? We're here to help
                  you achieve your goals and bring your vision to life.
                </p>
                <div className="flex gap-4">
                  <button className="flex-1 bg-moloch-400 text-[#F1EFEE] px-8 py-3 rounded-md text-label">
                    HIRE US
                  </button>
                  <button className="flex-1 bg-scroll-100 border-2 border-moloch-800 text-moloch-800 px-8 py-3 rounded-md text-label">
                    WHAT OTHERS SAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mercenaries Scroller */}
        <div className="bg-[#534A13] border-t-[10px] border-moloch-800 py-5 overflow-hidden">
          <div className="flex gap-4 justify-center items-center">
            {[
              "Dekan",
              "EC Wireless",
              "Scottpreneur",
              "Takekek",
              "Pupcakes",
              "Suede",
            ].map((name) => (
              <div key={name} className="flex items-center gap-8">
                <div className="w-8 h-8 border border-scroll-100 rounded"></div>
                <span className="text-heading-sm text-scroll-100 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="case-studies" className="py-24">
        <div className="container-custom">
          <div className="grid-custom gap-4">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <h2 className="text-heading-lg text-[#211E07] mb-4">
                Completed Quests
              </h2>
              <p className="text-body-lg text-[#211E07]">
                Legendary campaigns executed with precision and proven results.
                War-forged strategies. Total precision.
              </p>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-scroll-100 rounded-md overflow-hidden">
                  <div className="bg-moloch-800 p-8">
                    <Image
                      src="/images/logo-Pocket.svg"
                      alt="Pocket"
                      width={234}
                      height={60}
                      className="h-auto w-auto"
                    />
                  </div>
                  <div className="bg-[#534A13] p-12 border-t-2 border-moloch-400">
                    <h3 className="text-body-lg text-scroll-100 mb-4">
                      10x Increase in Token Value
                    </h3>
                    <p className="text-body-lg text-scroll-100 mb-8">
                      Created the wrapped version of the $POKT token as well as
                      the UniSwap pool, bridge and staking dApp. Token price
                      increased 10x with the launch of this token. $7M has been
                      transferred over this bridge in 2024.
                    </p>
                    <div className="flex gap-2.5 flex-wrap">
                      <span className="bg-moloch-800 text-scroll-100 px-5 py-2.5 rounded-md text-label text-xs">
                        Cross-Chain Infra
                      </span>
                      <span className="bg-moloch-800 text-scroll-100 px-5 py-2.5 rounded-md text-label text-xs">
                        Token
                      </span>
                      <span className="bg-moloch-800 text-scroll-100 px-5 py-2.5 rounded-md text-label text-xs">
                        Dapp Dev
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-scroll-100 rounded-md overflow-hidden">
                  <div className="bg-moloch-800 p-8">
                    <Image
                      src="/images/logo-brightid.svg"
                      alt="BrightID"
                      width={234}
                      height={60}
                      className="h-auto w-auto"
                    />
                  </div>
                  <div className="bg-[#534A13] p-12 border-t-2 border-moloch-400">
                    <h3 className="text-heading-md text-scroll-100 mb-4">
                      Gamifying Trust & Identity
                    </h3>
                    <p className="text-body-lg text-scroll-100 mb-8">
                      Designed and built a social identity system that uses
                      BrightID verification to increase trust, combat Sybil
                      attacks, and drive community engagement.
                    </p>
                    <div className="flex gap-2.5 flex-wrap">
                      <span className="bg-moloch-800 text-scroll-100 px-5 py-2.5 rounded-md text-label text-xs">
                        SMART CONTRACTS
                      </span>
                      <span className="bg-moloch-800 text-scroll-100 px-5 py-2.5 rounded-md text-label text-xs">
                        DESIGN
                      </span>
                      <span className="bg-moloch-800 text-scroll-100 px-5 py-2.5 rounded-md text-label text-xs">
                        Gamification
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Banner */}
        <div className="bg-moloch-400 border-t-[10px] border-[#534A13] py-5">
          <div className="container-custom">
            <h2 className="text-heading-lg text-scroll-100 text-center">
              RaidGuild Innovates Elevates Dominates
            </h2>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-24">
        <Image
          src="/images/testimonials-back.svg"
          alt="Testimonials Background"
          fill
          className="object-cover opacity-30 -z-10"
        />
        <div className="container-custom">
          <div className="grid-custom gap-4">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <h2 className="text-heading-lg text-moloch-800 mb-4">
                Words From Our Clients
              </h2>
              <p className="text-body-lg text-moloch-800">
                Discover firsthand accounts of our impact from satisfied
                clients. Explore their stories of success and partnership.
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
                      "I've worked with RaidGuild for over two years... and can
                      confidently say they're a reliable, innovative team. Their
                      technical expertise and collaborative spirit have
                      consistently delivered exceptional results. I highly
                      recommend them as a partner in any project."
                    </p>
                    <p className="text-body-lg text-moloch-800">
                      Kevin Owocki
                      <br />
                      co-founder of gitcoin, allo.capital
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
                      "For me, it is the strength of RaidGuild's culture... I
                      really appreciate the values, the integrity, and the
                      professionalism of all of the team. It feels like a team
                      that we can build a relationship with."
                    </p>
                    <p className="text-body-lg text-moloch-800">
                      Adrienne Youngman
                      <br />
                      CEO at partisia blockchain
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
                      "Watching Raid Guild grow out of MetaCartel has been an
                      inspiring experiment... in decentralized coordination.
                      Their dedication and work set a high bar for the future of
                      work and online collaboration."
                    </p>
                    <p className="text-body-lg text-moloch-800">
                      James Young
                      <br />
                      founder at collab.land
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Traits Scroller */}
        <div className="bg-moloch-400 border-t-[10px] border-[#534A13] py-5 overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            <div className="flex items-center gap-4">
              <Image
                src="/images/icon-alchemy-01.svg"
                alt="Creative"
                width={25}
                height={38}
              />
              <span className="text-heading-sm text-moloch-800 whitespace-nowrap">
                Creative
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/images/icon-alchemy-02.svg"
                alt="Dynamic"
                width={25}
                height={38}
              />
              <span className="text-heading-sm text-moloch-800 whitespace-nowrap">
                Dynamic
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/images/icon-alchemy-03.svg"
                alt="Visionary"
                width={30}
                height={38}
              />
              <span className="text-heading-sm text-moloch-800 whitespace-nowrap">
                Visionary
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/images/icon-alchemy-04.svg"
                alt="Collaborative"
                width={30}
                height={38}
              />
              <span className="text-heading-sm text-moloch-800 whitespace-nowrap">
                Collaborative
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/images/icon-alchemy-05.svg"
                alt="Innovative"
                width={36}
                height={38}
              />
              <span className="text-heading-sm text-moloch-800 whitespace-nowrap">
                Innovative
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/images/icon-alchemy-06.svg"
                alt="Relentless"
                width={20}
                height={38}
              />
              <span className="text-heading-sm text-moloch-800 whitespace-nowrap">
                Relentless
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Hire Us Section */}
      <section id="hire-us" className="py-24">
        <div className="bg-moloch-400 border-t-[10px] border-[#534A13] py-5 mb-24">
          <div className="container-custom">
            <h2 className="text-heading-lg text-scroll-100 text-center">
              Master Craftsmen Rallied for Your Quest.
            </h2>
          </div>
        </div>
        <div className="container-custom">
          <div className="grid-custom gap-4">
            <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col gap-16">
              <div>
                <h2 className="text-heading-lg text-[#534A13] mb-4">
                  Ready to Build Something Legendary?
                </h2>
                <p className="text-body-lg text-[#534A13]">
                  We operate as a DAO-powered Guild. Our members are experienced
                  Web3 builders who collaborate on projects based on reputation
                  and expertise. Every project gets a custom-assembled team with
                  the exact skills you need.
                </p>
              </div>
              <Image
                src="/images/logo-RG-back-white.svg"
                alt="Raid Guild"
                width={169}
                height={158}
                className="self-center"
              />
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <div className="bg-scroll-100 border-2 border-moloch-800 rounded-md p-8">
                <h3 className="text-heading-lg text-moloch-400 mb-8">
                  Let's Get Started
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-body-md text-moloch-800 mb-2 block">
                      Your name *
                    </label>
                    <input
                      type="text"
                      placeholder="What should we call you?"
                      className="w-full bg-scroll-100 border border-moloch-800 rounded-md px-4 py-2.5 text-body-md text-moloch-800"
                    />
                  </div>
                  <div>
                    <label className="text-body-md text-moloch-800 mb-2 block">
                      Email address *
                    </label>
                    <input
                      type="email"
                      placeholder="Where can we reach you?"
                      className="w-full bg-scroll-100 border border-moloch-800 rounded-md px-4 py-2.5 text-body-md text-moloch-800"
                    />
                  </div>
                  <div>
                    <label className="text-body-md text-moloch-800 mb-2 block">
                      Tell us about your role *
                    </label>
                    <textarea
                      placeholder="How are you involved in this project - please introduce yourself"
                      className="w-full bg-scroll-100 border border-moloch-800 rounded-md px-4 py-4 text-body-md text-moloch-800 h-24"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 bg-moloch-800 text-scroll-100 px-5 py-2.5 rounded-md text-label text-xs">
                      Previous
                    </button>
                    <button className="flex-1 bg-moloch-400 text-scroll-100 px-5 py-2.5 rounded-md text-label text-xs">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story/Footer Section */}
      <section
        id="about"
        className="py-24 bg-moloch-800 border-t-[10px] border-moloch-400"
      >
        <div className="container-custom">
          <div className="grid-custom gap-4">
            <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-center gap-16">
              <div>
                <h2 className="text-heading-lg text-[#534A13] mb-4">
                  Our Story
                </h2>
                <p className="text-body-lg text-[#534A13]">
                  From rebels to builders of the sovereign internet, RaidGuild
                  was born in the fires of decentralization to slay Moloch and
                  create tools and systems that return power to the people.
                </p>
              </div>
              <Image
                src="/images/art-divider-1.svg"
                alt="Divider"
                width={492}
                height={39}
                className="my-16"
              />
              <div>
                <h2 className="text-heading-lg text-[#534A13] mb-4">
                  Join the Guild
                </h2>
                <p className="text-body-lg text-[#534A13] mb-8">
                  Ready to join the ranks? Our Cohort Onboarding Program is the
                  gateway into Raid Guild—where the finest builders shape the
                  future of Web3.
                </p>
                <div className="flex gap-4">
                  <button className="bg-moloch-400 text-[#F1EFEE] px-8 py-3 rounded-md text-label">
                    APPLY TO A COHORT
                  </button>
                  <button className="bg-scroll-100 border-2 border-moloch-800 text-moloch-800 px-8 py-3 rounded-md text-label">
                    JOIN DISCORD
                  </button>
                </div>
              </div>
              <Image
                src="/images/art-divider-1.svg"
                alt="Divider"
                width={492}
                height={39}
                className="my-16"
              />
              {/* Timeline Accordion */}
              <div className="w-full space-y-2">
                {[
                  {
                    year: "2019",
                    title: "THE SPARK",
                    desc: "Raid Guild was founded at ETHDenver by a group of passionate rebels to support the DAOHaus ecosystem.",
                  },
                  { year: "2020", title: "EXPANDING THE ARSENAL", desc: "" },
                  { year: "2020", title: "SMART ESCROW LAUNCH", desc: "" },
                  { year: "2021", title: "Strengthening the Guild", desc: "" },
                  { year: "2022", title: "Aligning Forces", desc: "" },
                  { year: "2025", title: "brand refresh", desc: "" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-[#534A13] rounded-md overflow-hidden"
                  >
                    <div className="bg-[#534A13] px-8 py-4 flex justify-between items-center">
                      <span className="text-heading-sm text-scroll-100">
                        {item.year} {item.title}
                      </span>
                      <Image
                        src={`/images/icon-og-${
                          [
                            "designsprints",
                            "tipofthespear",
                            "manifesto",
                            "cartelculture",
                            "experimentation",
                            "fullstackdev",
                          ][idx]
                        }.svg`}
                        alt={item.title}
                        width={36}
                        height={36}
                        className="w-9 h-9"
                      />
                    </div>
                    {item.desc && (
                      <div className="bg-scroll-100 px-8 py-5">
                        <p className="text-body-lg text-moloch-800">
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              {/* Right side content placeholder */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t-[10px] border-moloch-400 mt-24">
          <div className="container-custom py-10">
            <div className="flex justify-between items-center">
              <Image
                src="/images/logo-RG-back-white.svg"
                alt="Raid Guild"
                width={200}
                height={53}
              />
              <div className="text-center">
                <p className="text-heading-lg text-scroll-100 mb-2">
                  Elite Raiders Conquering the Web3 Realm
                </p>
                <p className="text-heading-sm text-scroll-100">
                  © 2025 RaidGuild
                </p>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
