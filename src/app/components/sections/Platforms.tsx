'use client';
import { useEffect, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import Slider from "../common/Slider";

const Platforms: React.FC = () => {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/brands');
      const data = await response.json();

      // Extract the first image from each brand item
      const formattedBrands = data.map((brand: any, index: number) => ({ 
        imageUrl: brand.img?.[0] || '', // use img[0]
      }));

      setBrands(formattedBrands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <section id="platforms" className="bg-coducators-lightgray py-16 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Partners"
          subtitle="Our curriculum incorporates a variety of coding languages and platforms suitable for different ages and interests."
          color="blue"
          className="mb-8"
        />

        <Slider
          items={brands}
          renderItem={(item: any, index: React.Key) => (
            <div className="p-6 shadow-md w-full grid place-items-center border rounded-xl">
              <img
                src={item?.imageUrl}
                key={index}
                className="w-36 select-none"
                alt={item.name || "Platform"}
              />
            </div>
          )}
          slidesPerView={1.8}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        />
      </div>
    </section>
  );
};

export default Platforms;
