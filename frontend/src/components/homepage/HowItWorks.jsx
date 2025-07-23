import { motion } from "framer-motion";
import { FiUser, FiSearch, FiAward } from "react-icons/fi";
import { FaUserEdit, FaHandshake, FaRocket } from "react-icons/fa";

const HowItWorks = () => {
  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const iconContainerVariants = {
    hover: { scale: 1.1, rotate: [0, -5, 5, 0] },
    tap: { scale: 0.95 },
  };

  const steps = [
    {
      icon: <FaUserEdit className="w-6 h-6" />,
      title: "Setup Your Profile",
      desc: "Add your skills, interests, and learning goals to create your unique profile.",
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      title: "AI Finds Matches",
      desc: "Our algorithm connects you with ideal partners based on skills and compatibility.",
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Start Swapping",
      desc: "Begin your skill exchange journey with video calls, chat, and progress tracking.",
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
  ];

  return (
    <section
      id="how"
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-blue-300 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-300 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in just 3 simple steps to begin your skill swapping
            journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 rounded-full"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stepVariants}
              className="relative"
            >
              <div
                className={`${step.bg} ${step.border} p-8 rounded-xl border shadow-sm hover:shadow-md transition-all h-full flex flex-col items-center`}
              >
                <motion.div
                  variants={iconContainerVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`${step.color} w-16 h-16 rounded-full ${step.bg} flex items-center justify-center mb-6 border-2 ${step.border} shadow-inner`}
                >
                  {step.icon}
                </motion.div>

                <div className="text-center">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center font-bold text-gray-700">
                    {index + 1}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">
                    {step.title}
                  </h4>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-xl"
        />
      </div>
    </section>
  );
};

export default HowItWorks;
