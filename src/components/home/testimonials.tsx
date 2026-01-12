'use client';

import { motion } from 'framer-motion';
import { Quote, BadgeCheck } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Streetngsl.com is an exceptional delivery from David and I am most grateful for his intervention. I had a website earlier that wasn't capturing my aspiration and we continued to make adjustments until I met David. We had a casual talk about my challenges and surprisingly within 24 hours he gave me streetngsl.com. And business took a new drive.",
    author: 'Alex A.',
    role: 'CEO, StreetNG Services Limited',
    project: 'streetngsl.com',
    verified: true,
  },
  {
    quote:
      "David delivered our healthcare platform on time and exceeded expectations. His attention to security and user experience made all the difference.",
    author: 'Dr. Adaeze O.',
    role: 'Founder, Royal Health Consult',
    project: 'Healthcare Booking Platform',
    verified: false,
  },
  {
    quote:
      "Professional, responsive, and technically skilled. The visa application system he built handles complex workflows seamlessly.",
    author: 'Michael T.',
    role: 'Operations Manager',
    project: 'SwiftPass Visa Platform',
    verified: false,
  },
];

export function Testimonials() {
  return (
    <section className="bg-neutral-50 py-20 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            What Clients Say
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Feedback from people I've worked with
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
            >
              <Quote className="mb-4 h-8 w-8 text-blue-500/20" />
              <p className="mb-6 text-neutral-700 leading-relaxed dark:text-neutral-300">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-neutral-100 pt-4 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  {testimonial.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <BadgeCheck className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {testimonial.role}
                </p>
                <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                  {testimonial.project}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
