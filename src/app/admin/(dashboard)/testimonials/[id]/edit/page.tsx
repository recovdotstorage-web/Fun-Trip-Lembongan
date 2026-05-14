import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import TestimonialForm from "../../TestimonialForm";
import * as motion from "framer-motion/client";
import { deleteTestimonial } from "../../actions";
import { DangerZone } from "@/components/admin/DangerZone";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
  });

  if (!testimonial) {
    notFound();
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 lg:p-12 min-h-screen bg-[#FDFBF7]"
    >
      <TestimonialForm initialData={testimonial} />
      
      <DangerZone 
        action={deleteTestimonial} 
        id={testimonial.id} 
        name={testimonial.name} 
        title="Testimonial"
        redirectTo="/admin/testimonials"
        containerClassName="max-w-2xl mx-auto mb-12"
      />
    </motion.div>
  );
}
