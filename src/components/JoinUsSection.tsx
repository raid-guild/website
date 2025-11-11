import JoinUs from "./JoinUs";

export default function JoinUsSection() {
  return (
    <section id="hire-us" className="py-24">
      <div className="container-custom">
        <div className="grid-custom gap-4 flex items-start">
          <div className="col-span-6 lg:col-span-12">
            <h2 className="text-heading-lg text-moloch-500 mb-8">
              Ready to Build Something Legendary?
            </h2>
          </div>

          <div className="grid-custom gap-4 flex items-start">
            <div className="col-span-12">
              <JoinUs />
            </div>
          </div>
          <div className="col-span-6 lg:col-span-12 col-span-12 mb-[60px]">
            {/* <h3 className="text-heading-lg font-bold text-moloch-500 mb-8">
              How It Works
            </h3> */}
            {/* <div className="space-y-6">
              {joinUsSteps.map((step, index) => (
                <div key={index}>
                  <h4 className="text-heading-sm mb-1">
                    Step {index + 1}: {step.title}
                  </h4>
                  <p className="text-body-lg">{step.description}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
