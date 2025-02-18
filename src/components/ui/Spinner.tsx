import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  bounceColor?: string;
}
export const Spinner = ({ className, bounceColor }: Props) => {
  return (
    <>
      <div className={twMerge("spinner", className)}>
        <div className={twMerge("bounce1", bounceColor)}></div>
        <div className={twMerge("bounce2", bounceColor)}></div>
        <div className={twMerge("bounce3", bounceColor)}></div>
      </div>
    </>
  );
};
