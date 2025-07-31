import { motion } from "framer-motion";


const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-36 md:pb-20 text-center relative z-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-full max-w-4xl h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute top-1/4 left-0 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-6">
              <span className="mr-2">✨</span> New AI-powered matching
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Swap Skills.
              </span>{" "}
              Grow Together.
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our intelligent AI connects you with the perfect partners to learn
              and teach skills. No money exchanged—just knowledge shared.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition shadow-lg shadow-indigo-500/30"
              >
                Get Started — It's Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-200 hover:border-indigo-300 text-gray-700 font-medium px-8 py-3 rounded-full transition bg-white/80"
              >
                How It Works
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          

          {/* Floating elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-purple-100/80 blur-xl"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-indigo-100/80 blur-xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
