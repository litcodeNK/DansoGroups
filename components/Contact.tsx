'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { gsap } from '@/lib/gsap';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! We will get back to you soon.');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' },
      });

      // Info items slide from left with stagger
      gsap.from('.contact-info-item', {
        x: -60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-info-item', start: 'top 85%' },
      });

      // Form slides in from right
      gsap.from('.contact-form', {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 82%' },
      });

      // Form fields stagger reveal
      gsap.from('.form-field', {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.form-field', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-light text-dark py-24 border-t border-gray-100"
    >
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="contact-heading text-4xl font-serif font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-lg text-dark/70 mb-12 max-w-md">
              Reach out for software projects, cybersecurity audits, mobile development, or
              general consulting. Our team is ready to help you scale.
            </p>

            <div className="space-y-8">
              {[
                {
                  Icon: Phone,
                  title: 'Phone',
                  lines: ['+233 54 123 4567', '+1 (555) 123-4567'],
                },
                {
                  Icon: Mail,
                  title: 'Email',
                  lines: ['info@dansogroup.com', 'support@dansogroup.com'],
                },
                {
                  Icon: MapPin,
                  title: 'Office Location',
                  lines: ['123 Innovation Drive', 'East Legon, Accra, Ghana'],
                },
              ].map(({ Icon, title, lines }, i) => (
                <div key={i} className="contact-info-item flex items-start">
                  <div className="bg-accent/10 p-3 rounded-full mr-4 text-accent">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{title}</h4>
                    {lines.map((l, j) => (
                      <p key={j} className="text-dark/70">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id} className="form-field">
                  <label htmlFor={id} className="block text-sm font-bold mb-2">{label}</label>
                  <input
                    type={type}
                    id={id}
                    required
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              ))}

              <div className="form-field">
                <label htmlFor="service" className="block text-sm font-bold mb-2">Service Needed</label>
                <select
                  id="service"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white appearance-none"
                >
                  <option value="">Select a service...</option>
                  <option value="software">Software Development</option>
                  <option value="cybersecurity">Cybersecurity Audit</option>
                  <option value="mobile">Mobile App Development</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="message" className="block text-sm font-bold mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                />
              </div>

              <div className="form-field">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-70 flex justify-center items-center hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
