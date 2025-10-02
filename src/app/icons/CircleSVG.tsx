import { cn } from "@/lib/utils";

type Props = {
  size?: number;
  className?: string;
};
export const CircleSVG = ({ size = 40, className }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 151 151"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("fill-[#F0BD49]", className)}
  >
    <path
      d="M78.242 14.51a64.372 64.372 0 1 0 0 128.743 64.372 64.372 0 0 0 0-128.744m0 122.499A58.13 58.13 0 0 1 21.23 67.54a58.128 58.128 0 0 1 115.14 11.34 58.184 58.184 0 0 1-58.128 58.129"
      fill="#F0BD49"
    />
  </svg>
);
