type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "size-12" }: BrandLogoProps) {
  return (
    <span className={`inline-grid shrink-0 place-items-center ${className}`} aria-hidden="true">
      <img
        src="/assets/images/brand-logo-transparent.png"
        alt=""
        className="h-full w-full object-contain"
      />
    </span>
  );
}
