export const SectionHeader = ({
  title,
  eyebrow,
  description,
  number,
}: {
  title: string;
  eyebrow: string;
  description: string;
  number?: string;
}) => {
  return (
    <div className="flex flex-col items-start text-left max-w-4xl">
      <div className="flex items-center gap-4">
        {number && (
          <span className="text-swiss-accent font-black tracking-widest text-xl">
            {number}
          </span>
        )}
        <p className="uppercase font-bold tracking-[0.2em] text-swiss-accent text-sm">
          {eyebrow}
        </p>
      </div>
      <h2 className="text-4xl md:text-7xl lg:text-8xl mt-4 break-words">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-black/60 mt-6 max-w-2xl font-medium">
        {description}
      </p>
    </div>
  );
};
