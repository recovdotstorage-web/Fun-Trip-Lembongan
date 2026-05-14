import TestimonialForm from "../TestimonialForm";
import * as motion from "framer-motion/client";

export default function NewTestimonialPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 lg:p-12 min-h-screen bg-[#FDFBF7]"
    >
      <TestimonialForm />
    </motion.div>
  );
}
