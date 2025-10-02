import React from 'react';

interface SliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: string; // e.g. "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
}

function StaticSlider<T>({ items, renderItem, columns = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' }: SliderProps<T>) {
  return (
    <div className={`grid gap-4 ${columns} mb-10`}>
      {items.map((item, index) => (
        <div key={index} className="flex h-auto">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export default StaticSlider;
