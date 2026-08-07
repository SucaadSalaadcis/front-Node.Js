"use client";

import Image from "next/image";
import { Gift, ShoppingBag, TicketPercent } from "lucide-react";

import QRCode from "react-qr-code";

export default function MobileAppBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white border border-2 border-black mb-20 rounded-md">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#F8FCF9_0%,transparent_65%)]" />
      <div className="absolute -right-20 -top-10 h-64 w-64 rounded-full bg-[#D8F0E0]/50 blur-3xl" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 px-8 lg:px-12 py-8">
        {/* LEFT */}
        <div className="lg:col-span-5">
          <h2 className="text-[32px] lg:text-[38px] font-bold leading-tight text-[#111827]">
            Your Groceries,
            <br />
            Delivered with Care
          </h2>

          <p className="mt-4 max-w-md text-[15px] leading-7 text-[#6B7280]">
            Shop with ease using our mobile app, earn shopping points, track
            every order and enjoy exclusive offers.
          </p>

          <div className="mt-7 flex items-center gap-4">
            <div className="rounded-xl bg-white p-2 shadow-md">
              <QRCode value="https://yourdomain.com/app" size={70} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Scan to download
              </p>

              <p className="text-sm text-gray-500">our mobile app</p>
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div className="relative lg:col-span-2 flex justify-center">
          <Image
            src="/images/general/mobile.png"
            alt="Mobile App"
            width={170}
            height={350}
            priority
            className="drop-shadow-2xl"
          />

          <div className="hidden xl:flex absolute -left-32 top-24 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF5F1]">
              <Gift size={15} />
            </div>

            <span className="text-sm font-medium whitespace-nowrap">
              Earn Shopping Points
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5 flex justify-end">
          <div className="space-y-4">
            <FeatureCard
              icon={<ShoppingBag size={18} />}
              title="Track Your Orders"
            />

            <FeatureCard
              icon={<Gift size={18} />}
              title="Collect Reward Points"
            />

            <FeatureCard
              icon={<TicketPercent size={18} />}
              title="Exclusive Offers"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF5F1] text-[#2F855A]">
        {icon}
      </div>

      <span className="text-[15px] font-medium text-gray-800">{title}</span>
    </div>
  );
}
