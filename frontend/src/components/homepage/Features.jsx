import { motion } from "framer-motion";
import { FiCpu, FiVideo, FiTrendingUp } from "react-icons/fi";
import { FaRobot, FaVideo, FaChartLine } from "react-icons/fa";

const Features = () => {
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  const iconVariants = {
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 },
  };

  const features = [
    {
      title: "Smart Matching",
      desc: "Get matched with users based on interests and skill levels using AI algorithms.",
      icon: <FaRobot className="w-8 h-8" />,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
    {
      title: "Live Sessions",
      desc: "Interact in real-time through integrated video and chat modules.",
      icon: <FaVideo className="w-8 h-8" />,
      color: "text-pink-500",
      bg: "bg-pink-50",
    },
    {
      title: "Skill Tracker",
      desc: "Monitor your progress and receive personalized learning suggestions from AI.",
      icon: <FaChartLine className="w-8 h-8" />,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered Features
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform uses cutting-edge AI to enhance your skill swapping
            experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={featureVariants}
              whileHover={{ y: -10 }}
              className={`${feature.bg} p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all`}
            >
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className={`${feature.color} w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto`}
              >
                {feature.icon}
              </motion.div>

              <h4 className="text-xl font-bold text-center mb-3 text-gray-900">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-center">{feature.desc}</p>

              {/* Animated SVG decoration */}
              <svg
                viewBox="0 0 200 20"
                className="w-full mt-6 opacity-70"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M0 10 Q 50 20 100 10 T 200 10"
                  stroke={feature.color.replace("text-", "stroke-")}
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Animated background elements */}
        <div className="absolute left-0 right-0 -bottom-20 h-64 overflow-hidden opacity-10 z-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-300 to-purple-300 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-gradient-to-r from-pink-300 to-indigo-300 blur-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
