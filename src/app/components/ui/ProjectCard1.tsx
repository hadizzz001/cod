import Link from 'next/link';

interface ProjectCardProps { 
  _id: string;
  title: string;
  subtitle: string; 
  student: string;
  age: string;
  description: string;
  img: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  _id,
  title,
  subtitle, 
  student,
  age,
  description,
  img,
}) => {
  return (
    <Link href={`/project?id=${_id}`} passHref>
      <article className="cursor-pointer hide-arrows overflow-hidden bg-white rounded-2xl border border-solid border-black border-opacity-10 min-w-60">
        <div className="flex overflow-hidden relative flex-col justify-center w-full leading-none text-white">
          <img src={img} alt={title} className="object-cover z-0 w-full max-w-xs aspect-[1.67]" />
          <span className="absolute left-2.5 z-0 self-start px-3 py-1.5 bg-coducators-green rounded-full bottom-3">
            {title}
          </span>
        </div>
        <div className="pt-2.5 pb-6 pl-3 mt-2.5 w-full">
          <h3 className="overflow-hidden w-full text-base font-bold text-black">
            {subtitle}
          </h3> 
          <p className="text-zinc-600 text-sm">Student: {student}</p>
          <p className="text-zinc-600 text-sm">Age: {age}</p>
          {/* <p className="overflow-hidden mt-2 max-w-full leading-5 text-gray-600 w-[300px]">
            {description}
          </p>  */}
                  <p>
          <a href={`/project?id=${_id}`} className="block mt-5 max-w-full leading-5 text-gray-600 w-[300px]">
            <span className="text-white px-3 py-1.5 bg-coducators-green rounded-full  ">
              View
            </span>
          </a>
        </p>
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
