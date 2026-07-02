interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
