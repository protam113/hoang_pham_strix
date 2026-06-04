interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function SectionTransition({
  children,
  id,
  className = '',
}: SectionTransitionProps) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
