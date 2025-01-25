// About.js
'use client'

import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-white p-7">
      <section className="container mx-auto max-w-4xl">
        <h1 className="text-[32px] font-bold text-[#1a237e] mb-8">About Us</h1>

        <div className="space-y-8">
          <p className="text-[#455a64]">
            Welcome to our e-commerce store! We offer a wide range of products, including both digital downloads and physical goods. Our mission is to provide high-quality products at competitive prices while ensuring a seamless shopping experience for our customers.
          </p>

          <h2 className="text-lg font-semibold text-[#1a237e]">Our Mission</h2>
          <p className="text-[#455a64]">
            Our mission is to empower consumers by providing access to a diverse selection of products that enhance their lives. We believe in transparency, quality, and excellent customer service.
          </p>

          <h2 className="text-lg font-semibold text-[#1a237e]">What We Offer</h2>
          <ul className="list-disc list-inside text-[#455a64] space-y-2">
            <li>Digital Products: E-books, software, music, and more.</li>
            <li>Physical Goods: Electronics, clothing, home goods, and more.</li>
            <li>Exceptional Customer Service: Our support team is here to help you with any inquiries.</li>
          </ul>

          <h2 className="text-lg font-semibold text-[#1a237e]">Why Choose Us?</h2>
          <p className="text-[#455a64]">
            We prioritize customer satisfaction and strive to offer the best shopping experience possible. With secure payment options and fast shipping for physical products, we aim to exceed your expectations.
          </p>
        </div>
      </section>
    </div>
  );
}
