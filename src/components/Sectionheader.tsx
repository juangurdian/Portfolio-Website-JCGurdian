export const SectionHeader = ({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) => {
  return (
    <>
      <div className="flex justify-center">
        <p className="uppercase font-mono text-xs tracking-widest text-neural-primary">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-sans font-black text-white text-3xl md:text-5xl text-center mt-4">
        {title}
      </h2>
      <p className="text-center md:text-lg text-white/40 mt-3 max-w-md mx-auto">
        {description}
      </p>
    </>
  );
};
