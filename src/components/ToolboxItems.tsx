import { twMerge } from "tailwind-merge";
import { TechIcon } from "./TechIcon";

export const ToolboxItems = ({
  items,
  className,
  itemsWrapperClassName,
}: {
  items: {
    title: string;
    iconType: React.ElementType;
  }[];
  className?: string;
  itemsWrapperClassName?: string;
}) => {
  return (
    <div className={twMerge("flex", className)}>
      <div
        className={twMerge(
          "flex flex-nowrap justify-center p-6 gap-6",
          itemsWrapperClassName
        )}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="inline-flex items-center gap-4 py-2 px-3 outline outline-1 outline-white/[0.08] rounded-lg bg-white/[0.02]"
          >
            <TechIcon component={item.iconType} />
            <span className="text-white/60 font-semibold text-sm">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
