import { motion } from "framer-motion";

const Features = () => {
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          AI-Powered Features
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "🤖 Smart Matching",
              desc: "Get matched with users based on interests and skill levels using AI algorithms.",
            },
            {
              title: "🎥 Live Sessions",
              desc: "Interact in real-time through integrated video and chat modules.",
            },
            {
              title: "📈 Skill Tracker",
              desc: "Monitor your progress and receive personalized learning suggestions from AI.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={featureVariants}
              className="glass p-6 rounded-xl shadow-md"
            >
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-700">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
