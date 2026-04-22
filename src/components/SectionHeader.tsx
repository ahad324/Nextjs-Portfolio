import { motion } from "framer-motion";
import { SplitText } from "./SplitText";

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
    <div className="flex flex-col items-start text-left max-w-4xl relative group">
      {/* Blueprint Guides */}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
        className="absolute -top-4 left-0 h-[1px] bg-black/10 hidden md:block"
      />
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        className="absolute top-0 -left-8 w-[1px] bg-black/10 hidden md:block"
      />

      <div className="flex items-center gap-4">
        {number && (
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-swiss-accent font-black tracking-widest text-xl font-mono"
          >
            [{number}]
          </motion.span>
        )}
        <p className="uppercase font-bold tracking-[0.2em] text-swiss-accent text-sm">
          {eyebrow}
        </p>
      </div>

      <h2 className="text-4xl md:text-6xl lg:text-7xl mt-4 break-words font-black uppercase tracking-tighter leading-[0.9] relative [word-break:keep-all]">
        <SplitText text={title} />
        {/* Animated Underline */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute -bottom-2 left-0 w-24 h-2 bg-swiss-accent origin-left"
        />
      </h2>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg md:text-xl text-black/60 mt-8 max-w-2xl font-medium"
      >
        {description}
      </motion.p>
    </div>
  );
};
