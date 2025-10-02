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

  return (
    <div className="mt-10 relative w-fit">
      {/* Age Group Badge (outside card) */}
      <div
        className={cn(
          "absolute -top-10 left-1/2 transform -translate-x-1/2 px-4 py-1 text-sm text-white rounded-full shadow-md z-10",
          colorClass.split(" ")[0]
        )}
      >
        {ageGroup}
      </div>

      {/* Card Container */}
<div
  className={cn(
    "bg-white rounded-2xl overflow-hidden card-shadow max-w-96 flex flex-col border h-[400px]", // fixed height
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
      {subtitle.length > 80 ? subtitle.slice(0, 80) + "..." : subtitle}
    </p>

    <a
      href={`/courses?age=${ageGroup}`}
      className={cn(
        "w-full mt-auto text-sm text-white py-2 px-2 rounded-lg text-center",
        colorClass.split(" ")[0]
      )}
    >
      Explore Courses
    </a>
  </div>
</div>

    </div>
  );
};

export default CourseCard;
