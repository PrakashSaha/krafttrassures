'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Topbar from '@/components/sections/Topbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
        setStatus({
          type: 'success',
          message: 'Message sent successfully! We will get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An error occurred. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Topbar />
      <Header />
      <main className="min-h-screen bg-[#FAF5EF] py-16 lg:py-24">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
          {/* Page Header: Title left, description right */}
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 text-[10px] tracking-[0.3em] text-black/40 uppercase">
                Get In Touch
              </p>
              <h1 className="font-serif text-[48px] leading-tight text-black md:text-[58px]">
                Contact Us
              </h1>
            </div>
            <p className="max-w-[460px] text-[15px] leading-relaxed text-black/50 lg:text-right">
              For product questions, order assistance, or curated buying enquiries, reach out
              directly and the Kraft Treasure team will get back to you.
            </p>
          </div>

          {/* Main bordered container */}
          <div className="border border-[#E2D9CC] bg-[#F5F0E8] p-8 lg:p-12">
            <div className="flex flex-col gap-10 lg:flex-row">
              {/* LEFT: Info panel */}
              <div className="flex flex-col justify-between lg:w-[38%]">
                <div>
                  <p className="mb-5 text-[10px] tracking-[0.3em] text-[#C5AB7D] uppercase">
                    Reach Us Directly
                  </p>
                  <h2 className="mb-6 font-serif text-3xl leading-snug text-black md:text-4xl">
                    Minimal, direct support for every enquiry
                  </h2>
                  <p className="text-[14px] leading-relaxed text-black/50">
                    Share your question and the team can help with product details, availability,
                    shipping clarification, or general purchase support.
                  </p>
                </div>

                {/* Contact info boxes */}
                <div className="mt-12 space-y-4">
                  {/* Phone */}
                  <div className="flex items-center gap-4 border border-[#E2D9CC] bg-[#FAF7F2] px-5 py-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-[#D33740]/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#D33740"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.98-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
                      </svg>
                    </div>
                    <div>
                      <p className="mb-1 text-[9px] tracking-[0.2em] text-black/40 uppercase">
                        Phone
                      </p>
                      <p className="text-[15px] font-medium text-black">+91 98765 43210</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 border border-[#E2D9CC] bg-[#FAF7F2] px-5 py-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-[#D33740]/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#D33740"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="mb-1 text-[9px] tracking-[0.2em] text-black/40 uppercase">
                        Email
                      </p>
                      <p className="text-[15px] font-medium text-black">hello@krafttreasure.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Form panel */}
              <div className="flex-1 border border-[#E2D9CC] bg-white p-8 lg:p-10">
                <p className="mb-8 text-[10px] tracking-[0.3em] text-[#C5AB7D] uppercase">
                  Enquiry Form
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
                      Name <span className="text-[#D33740]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full border border-[#E2D9CC] bg-white px-4 py-3 text-[14px] text-black transition-colors outline-none placeholder:text-black/30 focus:border-[#C5AB7D]"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
                      Email <span className="text-[#D33740]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-[#E2D9CC] bg-white px-4 py-3 text-[14px] text-black transition-colors outline-none placeholder:text-black/30 focus:border-[#C5AB7D]"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
                      Message <span className="text-[#D33740]">*</span>
                    </label>
                    <textarea
                      rows="6"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full resize-none border border-[#E2D9CC] bg-white px-4 py-3 text-[14px] text-black transition-colors outline-none placeholder:text-black/30 focus:border-[#C5AB7D]"
                      required
                    />
                  </div>

                  {/* Status message */}
                  {status.message && (
                    <p
                      className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {status.message}
                    </p>
                  )}

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#D33740] px-10 py-4 text-[11px] font-bold tracking-[0.25em] text-white uppercase transition-all hover:bg-[#b52a32] disabled:bg-gray-400"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
