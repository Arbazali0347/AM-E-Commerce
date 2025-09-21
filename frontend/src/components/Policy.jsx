import React from "react";
import Title from "../components/Title";

const Policy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <Title text1={"OUR"} text2={"POLICIES"} />
          <p className="mt-3 text-gray-600">Everything you need to know about ordering, shipping and returns.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-10 space-y-8">
            {/* Privacy Policy */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We value your privacy. This is a placeholder—please replace with your company’s actual privacy policy.
                Describe what data you collect (name, email, address), how you use it (orders, support, marketing),
                and how customers can request removal or updates to their data.
              </p>
            </section>

            {/* Shipping Policy */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Shipping & Delivery</h2>
              <p className="text-gray-600 leading-relaxed">
                Example: Orders are processed within 1-2 business days. Standard delivery usually takes 3–7 business days
                within Pakistan. For remote areas or international shipments delivery times may be longer. Replace these
                examples with your exact lead times, courier partners, and shipping charges.
              </p>
            </section>

            {/* Return & Refund */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Returns & Refunds</h2>
              <p className="text-gray-600 leading-relaxed">
                Example: We accept returns within 7 days of delivery for unopened or defective items. To request a return,
                contact support with order number and photos of the product. Refunds are issued within 3–5 business days after
                we receive the returned items. Update this section with your exact policy, steps, and contact info.
              </p>
            </section>

            {/* Terms of Service */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Terms of Service</h2>
              <p className="text-gray-600 leading-relaxed">
                Users must follow the site rules and agree to our terms when placing orders. This section should include
                payment terms, user responsibilities, limitations of liability, and jurisdiction for disputes. Keep legal
                language concise or link to a full legal document if needed.
              </p>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Payment Methods</h2>
              <p className="text-gray-600 leading-relaxed">
                Example: We accept card payments, bank transfers, and Cash on Delivery (COD) where available. For online
                payments we use secure gateways. Add your accepted payment options and any payment-related terms here.
              </p>
            </section>

            {/* Contact for policy */}
            <section>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Questions?</h2>
              <p className="text-gray-600 leading-relaxed">
                For policy questions or to request changes to your personal data, email us at
                <span className="text-black font-medium"> amchemicalstore@gmail.com</span> or call (+92) 345 1081010.
                Replace contact details with your official support email/phone.
              </p>
            </section>

            {/* Small note for client */}
            <div className="text-sm text-gray-500 pt-2 border-t">
              <p>
                <strong>Note for client:</strong> This page contains placeholder text — please update each section with your exact
                business policies, legal text, courier names, and timelines before publishing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
