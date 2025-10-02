import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface SliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  slidesPerView?: number;
  breakpoints?: any;
}

function Slider<T>({ items, renderItem, slidesPerView = 1.2, breakpoints }: SliderProps<T>) {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={slidesPerView}
      navigation
      breakpoints={breakpoints}
      className='mb-10'
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className='!flex !h-auto'>
          {renderItem(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
