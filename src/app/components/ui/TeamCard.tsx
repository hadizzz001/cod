import { cn } from "@/lib/utils";

interface TeamCardProps {
  data: any;
  index: number;
}

const colorVariants = ["blue", "green", "red"]; // Add more as needed

export const TeamCard: React.FC<TeamCardProps> = ({ data, index }) => {
  const color = colorVariants[index % colorVariants.length]; // Loop through colors


 

  return (
    <article className="flex flex-col items-center w-[210px]">
      <div
        className={cn(
          "flex relative flex-col justify-center max-w-full min-h-[210px] rounded-full w-[210px]",
          `bg-coducators-${color}`
        )}
      >
        <img
          src={data?.img[0]}
          alt={data?.name}
          className="p-2 rounded-full object-contain absolute inset-0 top-1/2 z-0 w-full -translate-y-1/2"
        />
      </div>
      <div className="flex flex-col items-center px-2.5 mt-4 text-center">
        <h3
          className={cn(
            "text-xl font-bold leading-snug uppercase",
            `text-coducators-${color}`
          )}
        >
          {data?.name}
        </h3>
        <p className="mt-1 text-base text-gray-600 dark:bg-gray-900 dark:text-white">{data?.position}</p>
<p className="mt-1 text-base text-gray-600 dark:bg-gray-900 dark:text-white" > {data?.description ?.replace(/<[^>]+>/g, '') .trim() .split(/\s+/) .slice(0, 5) .join(' ') + '...'} </p>

        <p className="mt-1 text-base text-gray-600">
          <a
            href={`/team?id=${data._id}`}
            className={cn(
              "px-3 py-1 rounded text-white text-sm font-medium",
              `bg-coducators-${color}`
            )}
          >
            View Member
          </a>
        </p>
      </div>
    </article>
  );
};
