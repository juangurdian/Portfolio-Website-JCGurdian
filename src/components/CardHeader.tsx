import { twMerge } from "tailwind-merge";

export const CardHeader = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex flex-col p-6 md:py-8 md:px-10", className)}>
      <div className="inline-flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-neural-primary" />
        <h3 className="text-white font-bold text-xl">{title}</h3>
      </div>
      <p className="text-white/40 text-sm mt-2">{description}</p>
    </div>
  );
};
