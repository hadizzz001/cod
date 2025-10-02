 
import { cn } from "@/lib/utils";

interface CourseCardProps {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  level: string;
  duration: string;
  ageGroup: string;
  className?: string;
  soon: string;
  color: string;
  sessions: string;
  pair: string;
  group: string;
  pre: string;
  subtitle: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  _id,
  title,
  category,
  imageUrl,
  level,
  duration,
  ageGroup,
  className,
  soon,
  color,
  sessions,
  pair,
  group,
  pre,
  subtitle,
}) => {
  const colorClass =
    color === "blue"
      ? "bg-[#3186c8] border-[#3186c8]"
      : color === "green"
      ? "bg-[#7dbd42] border-[#7dbd42]"
      : "bg-[#d8212b] border-[#d8212b]";

  let parsedDuration: { number?: string; unit?: string } = {};


          try {
      parsedDuration = JSON.parse(duration || '{}'); 
    } catch (err) {
      console.error('Error parsing duration or age:', err);
    }

  const handleClick = async () => {
    try {
      const res = await fetch('/api/course');
      const data = await res.json();

      // Find course by name (case-insensitive match)
      const course = data.find(
        (course: any) => course.title?.toLowerCase() === pair.toLowerCase()
      );

      if (course && course._id) {
        window.location.href=`/course?id=${course._id}`;
      } else {
        alert('Course not found');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };




  return (
    <div className="mt-10 relative w-fit">
      {/* Age Group Badge (outside card) */}
 

      {/* Card Container */}
      <div
        className={cn(
          "bg-white rounded-2xl overflow-hidden card-shadow max-w-96 flex flex-col border",
          colorClass.split(" ")[1],
          className
        )}
      >
        {/* Image */}
        <div className="aspect-video overflow-hidden flex-shrink-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 p-2 rounded-2xl"
          />
        </div>

        {/* Content */}
        <div className="px-5 py-4 flex-1 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">
            Category: {category}
          </p>
          <p className="text-sm text-gray-600">Level: {level}</p>
          <p className="text-sm text-gray-600">Group: {group}</p>
          <p className="text-sm text-gray-600">
            Prerequisite: {pre || "None"}
          </p>
          <p className="text-sm text-gray-600">Duration: {parsedDuration.number} {parsedDuration.unit || ''}</p>
          <p className="text-sm text-gray-600">{sessions} sessions</p>


 
<a
  onClick={handleClick}
  className={cn(
    "w-full mt-auto text-sm text-white py-2 px-2 rounded-lg text-center cursor-pointer",
    colorClass.split(" ")[0]
  )}
>
  Best paired with our {pair} course
</a>

        </div>
      </div>
    </div>
  );
};

export default CourseCard;
