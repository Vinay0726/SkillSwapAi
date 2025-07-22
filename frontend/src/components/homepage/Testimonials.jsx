import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonialVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12"
        >
          What Users Say
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              quote:
                "“I traded my marketing skills for coding lessons. Game-changer!”",
              author: "— Sarah L.",
            },
            {
              quote:
                "“I found a guitar teacher in Spain while teaching design remotely!”",
              author: "— Aman R.",
            },
            {
              quote:
                "“AI paired me with exactly who I needed. I love this platform!”",
              author: "— Carla G.",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={testimonialVariants}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <p className="italic text-gray-700">{testimonial.quote}</p>
              <span className="block mt-4 font-semibold text-indigo-600">
                {testimonial.author}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
