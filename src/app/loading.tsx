"use client";
import Image from 'next/image';

export default function Page() {
  return (
    <section className="md:px-24">
      <div className="flex items-center justify-center flex-wrap gap-x-8 p-4 sm:p-8">
        <div className="animate-spin">
          <Image src="/pokeball.png" alt="Loading" width={400} height={400} />
        </div>
      </div>
    </section>
  );
}