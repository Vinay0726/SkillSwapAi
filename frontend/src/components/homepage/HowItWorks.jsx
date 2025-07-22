import { motion } from "framer-motion";

const HowItWorks = () => {
  const stepVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <section id="how" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          How It Works
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: "📋",
              title: "1. Setup Profile",
              desc: "Add your skills, interests, and what you want to learn.",
            },
            {
              icon: "🤝",
              title: "2. AI Connects You",
              desc: "We’ll pair you with the perfect learning/teaching match.",
            },
            {
              icon: "🚀",
              title: "3. Learn & Grow",
              desc: "Start your journey—teach others and learn new things in return!",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={stepVariants}
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h5 className="text-xl font-semibold mb-2">{step.title}</h5>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
