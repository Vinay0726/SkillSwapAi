import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="pt-32 pb-24 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto px-6"
      >
        <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
          Swap Skills. Empower Each Other.
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Find the perfect match to learn and teach skills using intelligent AI
          pairing. Learn, share, and grow—together.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition shadow-lg">
          Start Swapping
        </button>
      </motion.div>
      <div className="absolute inset-x-0 top-10 z-[-1]">
        <div className="h-64 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full blur-3xl opacity-30 mx-auto w-2/3"></div>
      </div>
    </section>
  );
};

export default Hero;
