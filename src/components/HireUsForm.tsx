export default function HireUsForm() {
  return (
    <div className="bg-scroll-100 border-2 border-moloch-800 rounded-md p-8">
      <h3 className="text-heading-lg text-moloch-400 mb-8">
        Let&apos;s Get Started
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
  );
}
