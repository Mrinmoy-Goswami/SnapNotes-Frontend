import { memo } from "react";

function CTASection() {
  return (
    <section className="py-20 bg-purple-600 text-white text-center px-6">
      <h2 className="text-3xl md:text-4xl font-extrabold">
        Ready to study smarter?
      </h2>
      <p className="mt-4 text-lg max-w-xl mx-auto">
        Stop wasting time rewriting notes. Snapnotes makes exam prep effortless.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <button className="px-6 py-3 rounded-2xl bg-black hover:bg-gray-900 text-white font-medium shadow-lg transition w-full sm:w-auto">
          Check Plans
        </button>
        <button className="px-6 py-3 rounded-2xl border border-white hover:bg-white hover:text-purple-600 transition w-full sm:w-auto">
          Learn More
        </button>
      </div>
    </section>
  );
}
export default memo(CTASection)