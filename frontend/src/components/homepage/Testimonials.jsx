import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonialVariants = {
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

  const cardVariants = {
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
  };

  const testimonials = [
    {
      quote:
        "I traded my marketing skills for coding lessons. This platform is a game-changer for skill development!",
      author: "Sarah L.",
      role: "Marketing Director",
      rating: 5,
      avatar: "/avatars/sarah.jpg",
    },
    {
      quote:
        "Found a guitar teacher in Spain while teaching design remotely. The AI matching is incredibly accurate!",
      author: "Aman R.",
      role: "UX Designer",
      rating: 5,
      avatar: "/avatars/aman.jpg",
    },
    {
      quote:
        "The platform paired me with exactly who I needed. I've learned more in 2 months than in years of classes!",
      author: "Carla G.",
      role: "Product Manager",
      rating: 4,
      avatar: "/avatars/carla.jpg",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-indigo-300 blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-300 blur-3xl"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community of learners and teachers who are transforming how
            skills are exchanged
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              whileHover="hover"
            
              className="relative bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                <FaQuoteLeft className="w-5 h-5" />
              </div>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
                  {/* Replace with actual image */}
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                    {testimonial.author.charAt(0)}
                  </div>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>

              <div className="text-center">
                <h4 className="font-bold text-gray-900">
                  {testimonial.author}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
