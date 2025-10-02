import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  className?: string;
};
export const AddSVG = ({ size = 40, className }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 61 61"
    fill="none"
    className={cn("stroke-[#F0BD49] fill-[#D9D9D9]", className)}
  >
    <path d="M30.113 47.63V13.88zM13.236 30.757h33.75z" />
    <path
      d="M30.113 47.63V13.88M13.236 30.757h33.75"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
