import StarIcon from "@/assets/icons/star.svg";

const words = [
  "Python",
  "Java",
  "Javascript",
  "REST API",
  "Html",
  "CSS",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Git",
  "Springboot",
  "LangSmith",
  "LangChain",
  "ReactNative",
  "Flask",
  "FastAPI",
  "Jira",
  "Miro",
  "Figma",

]

export const TapeSection = () => {
  return ( 
    <div className="py-16 lg:py-24 overflow-x-clip">
      <div className="bg-gradient-to-r from-emerald-300 to-sky-400 -rotate-3 -mx-1">
      <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex flex-none gap-4">
      {words.map(word => (
        <div key={word} className="inline-flex gap-4 py-3">
          <span className="text-gray-900 uppercase font-extrabold text-sm">{word}</span>
          <StarIcon className="size-6 text-gray-900 -rotate-11"/>
        </div>
      ))}
      </div>
      </div>
      </div>
    </div>
  );
};
