interface ProjectCardProps {
  _id: string;
  video: string;
  category: string;
  title: string;
  author: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  _id,
  video,
  category,
  title,
  author,
  description,
}) => {
  return (
<article className="hide-arrows overflow-hidden bg-white rounded-2xl border border-solid border-black border-opacity-10 w-full max-w-[400px] h-[400px] flex flex-col">
  <div className="flex overflow-hidden relative flex-col justify-center w-full leading-none text-white">
    <video
      src={video}
      className="object-cover z-0 w-full aspect-[1.67]"
      controls
    />
    <span className="absolute left-2.5 z-10 px-3 py-1.5 bg-coducators-green rounded-full bottom-3">
      {title}
    </span>
  </div>

  <div className="pt-2.5 pb-6 pl-3 mt-2.5 w-full flex flex-col flex-grow">
    <h3 className="overflow-hidden w-full text-base font-bold text-black">
      {category}
    </h3>
    <p className="mt-2 leading-none text-zinc-700">{author}</p>

    <p className="mt-auto">
      <a
        href={`/project?id=${_id}`}
        className="inline-block text-gray-600"
      >
        <span className="text-white px-3 py-1.5 bg-coducators-green rounded-full">
          View
        </span>
      </a>
    </p>
  </div>
</article>


  );
};

export default ProjectCard;
