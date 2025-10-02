'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchParamHandler = ({ setSelected, setInputs }) => {
  const searchParams = useSearchParams();
  const course = searchParams.get('course');

  useEffect(() => {
    if (course) {
      setSelected(['Course']);
      setInputs((prev) => ({
        ...prev,
        interest: 'Course',
        message: `I am interested in this course ${course}`,
      }));
    }
  }, [course, setInputs, setSelected]);

  return null;
};

export default SearchParamHandler;
