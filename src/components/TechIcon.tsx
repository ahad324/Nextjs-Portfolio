export const TechIcon = ({ component, iconUrl }: { component?: React.ElementType, iconUrl?: string }) => {
  if (iconUrl) {
    return <img src={iconUrl} alt="Tech Logo" className="size-10 grayscale group-hover:grayscale-0 transition-all duration-300 pointer-events-none" />;
  }

  const Component = component;
  if (!Component) return null;
  
  return (
    <>
      <Component className="size-10" />
    </>
  );
};
