'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!', {
          description: 'We will get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message', {
          description: 'Please try again later.',
        });
      }
    } catch (error) {
      toast.error('An error occurred', {
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] py-16 lg:py-24">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <p className="mb-4 text-[10px] tracking-[0.3em] text-[#C5AB7D] uppercase">Get In Touch</p>
            <h1 className="font-serif text-[48px] leading-tight text-black md:text-[58px]">Contact Us</h1>
          </div>
          <p className="max-w-[460px] text-[15px] leading-relaxed text-black/50 lg:text-right animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            For product questions, order assistance, or curated buying enquiries, reach out directly and the Kraft Treasure team will get back to you.
          </p>
        </div>

        {/* Form Container */}
        <div className="border border-black/5 bg-white p-8 lg:p-12 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Left: Info */}
            <div className="flex flex-col justify-between lg:w-[38%]">
              <div>
                <p className="mb-5 text-[10px] tracking-[0.3em] text-[#C5AB7D] uppercase font-bold">Reach Us Directly</p>
                <h2 className="mb-8 font-serif text-3xl leading-snug text-black md:text-4xl">Minimal, direct support for every enquiry</h2>
                <p className="text-[14px] leading-relaxed text-black/50">
                  Share your question and the team can help with product details, availability, shipping clarification, or general purchase support.
                </p>
              </div>

              <div className="mt-12 space-y-4">
                <ContactInfoBox 
                  label="Phone" 
                  value="+91 98765 43210" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.98-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/></svg>} 
                />
                <ContactInfoBox 
                  label="Email" 
                  value="hello@krafttreasure.com" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>} 
                />
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 border border-black/5 bg-[#FAF7F2] p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField 
                  label="Name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Your Name" 
                  required 
                />
                <FormField 
                  label="Email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="your@email.com" 
                  required 
                />
                <FormField 
                  label="Message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="How can we help?" 
                  textarea 
                  required 
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black py-5 text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-all hover:bg-[#D33740] disabled:bg-gray-400 active:scale-[0.98]"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ContactInfoBox({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 border border-black/5 bg-white px-5 py-4 hover:border-[#C5AB7D] transition-colors group">
      <div className="flex h-10 w-10 items-center justify-center border border-[#D33740]/20 group-hover:bg-[#D33740] group-hover:text-white transition-all text-[#D33740]">
        {icon}
      </div>
      <div>
        <p className="mb-1 text-[9px] font-bold tracking-[0.2em] text-black/30 uppercase">{label}</p>
        <p className="text-[15px] font-medium text-black">{value}</p>
      </div>
    </div>
  );
}

function FormField({ label, name, value, onChange, placeholder, required, type = 'text', textarea }: any) {
  const props = {
    name,
    value,
    onChange,
    placeholder,
    required,
    className: "w-full border border-black/10 bg-white px-4 py-3 text-[14px] text-black outline-none focus:border-[#D33740] transition-colors placeholder:text-black/20"
  };

  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
        {label} {required && <span className="text-[#D33740]">*</span>}
      </label>
      {textarea ? (
        <textarea {...props} rows={5} className={props.className + " resize-none"} />
      ) : (
        <input {...props} type={type} />
      )}
    </div>
  );
}
