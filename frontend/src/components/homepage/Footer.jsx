import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="contact"
      className="bg-gray-900 text-gray-300 py-10"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© 2025 SkillSwapAI. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white text-sm">
            Privacy
          </a>
          <a href="#" className="hover:text-white text-sm">
            Terms
          </a>
          <a href="#" className="hover:text-white text-sm">
            Support
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
