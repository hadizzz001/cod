import { cn } from "@/lib/utils";
import { useState } from "react";
import { Play } from "lucide-react";

interface CourseCardProps {
  _id: string;
  imgs: string;
  subtitle: string;
  student: string;
  title: string;
  desc: string;
  age: string;
  video: string;
  course: string;
  color: string;
  level: string;
  game: string;
  skills: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  _id,
  imgs,
  subtitle,
  student,
  title,
  desc,
  age,
  video,
  course,
  color,
  level,
  game,
  skills,
}) => {
  const colorClass =
    color === "blue"
      ? "bg-[#3186c8] border-[#3186c8]"
      : color === "green"
        ? "bg-[#7dbd42] border-[#7dbd42]"
        : "bg-[#d8212b] border-[#d8212b]";

  let parsedDuration: { number?: string; unit?: string } = {};

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleClick3 = () => setIsFullscreen(true);
  const handleClose = () => setIsFullscreen(false);


 
   const handleClick = async () => {
    try {
      const res = await fetch('/api/course');
      const data = await res.json();

          const searchTermLower = course.toLowerCase();

    const course1 = data.find(
      (i: any) => i.title?.toLowerCase() === searchTermLower
    );

 
      if (course1 && course1._id) {
        window.location.href = `/course?id=${course1._id}`;
      } else {
        alert('Course not found');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };





  const handleClick1 = () => {
    window.location.href = `${game}`;
  };




  return (
    <div className="mt-10 relative w-fit">
      {/* Age Group Badge (outside card) */}


      {/* Card Container */}
      <div
        className={cn(
          "bg-white rounded-2xl overflow-hidden card-shadow max-w-96 flex flex-col border",
          colorClass.split(" ")[1],
          // className
        )}
      >
        {/* Image */}
        <div
          className="relative aspect-video overflow-hidden flex-shrink-0 cursor-pointer group"
          onClick={handleClick3}
        >
          <video
            src={video}
            muted
            playsInline
            autoPlay
            loop
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 p-2 rounded-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-60 rounded-full p-4">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {isFullscreen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <button
              onClick={handleClose}
              className="absolute top-20 right-4 z-50 text-white bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full p-2"
            >
              ✕
            </button>
            <video
              src={video}
              controls
              autoPlay
              className="w-full h-full max-w-screen-lg max-h-screen"
            />
          </div>
        )}




        {/* Content */}
        <div className="px-5 py-4 flex-1 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">
            Created by: {student}
          </p>
     
          <p className="text-sm text-gray-600">In our {course} course</p>
          <p className="text-sm text-gray-600">Age: {age}</p>
          <p className="text-sm text-gray-600">
            Level: {level}
          </p>


<div className="flex gap-2 items-stretch">
  <a
    onClick={handleClick}
    className={cn(
      "flex-1 text-sm text-white py-2 px-2 rounded-lg text-center cursor-pointer",
      colorClass.split(" ")[0]
    )}
  >
    Learn about our {course}
  </a>
  <a
    onClick={handleClick1}
    className={cn(
      "flex-1 text-sm text-white py-2 px-2 rounded-lg text-center cursor-pointer",
      colorClass.split(" ")[0]
    )}
  >
    Try<br/> the game
  </a>
</div>



        </div>
      </div>
    </div>
  );
};

export default CourseCard;
