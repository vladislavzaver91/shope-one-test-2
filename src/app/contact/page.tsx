// Contact.js
'use client'

import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white p-7">
      <section className="container mx-auto max-w-4xl">
        <h1 className="text-[32px] font-bold text-[#1a237e] mb-8">Contact Us</h1>

        <div className="space-y-8">
          <p className="text-[#455a64]">
            We would love to hear from you! If you have any questions or need assistance, please reach out to us using the contact details below.
          </p>

          <div className="flex items-start space-x-4">
            <FaPhoneAlt className="h-6 w-6 text-[#1a237e]" />
            <div>
              <h2 className="text-lg font-semibold text-[#1a237e]">Phone</h2>
              <p className="text-[#455a64]">+1 (234) 567-890</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaEnvelope className="h-6 w-6 text-[#1a237e]" />
            <div>
              <h2 className="text-lg font-semibold text-[#1a237e]">Email</h2>
              <p className="text-[#455a64]">support@yourstore.com</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-[#1a237e]">Business Hours</h2>
          <p className="text-[#455a64]">Monday - Friday: 9 AM - 5 PM</p>
          <p className="text-[#455a64]">Saturday - Sunday: Closed</p>

          <h2 className="text-lg font-semibold text-[#1a237e]">Follow Us</h2>
          <p className="text-[#455a64]">Stay connected through our social media channels for updates and promotions!</p>
        </div>
      </section>
    </div>
  );
}
