import { motion } from "framer-motion";
import Image from "next/image";

interface SponsorImage {
  src: string;
  alt: string;
}

interface BufferSectionProps {
  backgroundImage: string;
  title: string;
  sponsorImages: SponsorImage[];
  description: string;
}

export default function BufferSection({
  backgroundImage,
  title,
  sponsorImages,
  description,
}: BufferSectionProps) {
  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between items-center px-4">
        {/* Title Section */}
        <div className="flex-1 flex items-center justify-center w-full">
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white text-center tracking-tight leading-none font-editorial max-w-7xl px-4"
          >
            {title}
          </motion.h1>
        </div>

        {/* Bottom Section with Logos and Description */}
        <div className="w-full space-y-16 mb-12">
          {/* Sponsor Images */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 md:gap-12 px-4"
          >
            {sponsorImages.map((sponsor, index) => (
              <motion.div
                key={index}
                className="relative h-6 sm:h-8 md:h-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  width={120}
                  height={40}
                  className="h-full w-auto object-contain filter brightness-0 invert"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center font-serif max-w-3xl mx-auto px-4"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
