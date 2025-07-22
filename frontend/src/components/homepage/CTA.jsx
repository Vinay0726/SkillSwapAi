import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-24 text-center bg-gradient-to-r from-indigo-300 to-purple-300 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-xl mx-auto px-6"
      >
        <h3 className="text-4xl font-bold mb-4">Join the Future of Learning</h3>
        <p className="mb-8">
          Your skills are valuable. Share them and learn from others using the
          power of AI. Start your journey today!
        </p>
        <button className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-200 transition">
          Get Started Free
        </button>
      </motion.div>
    </section>
  );
};

export default CTA;
