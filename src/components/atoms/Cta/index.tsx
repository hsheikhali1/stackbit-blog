interface CtaProps {
  _type: string;
  label?: string;
  href?: string;
  path?: string;
};

const Cta = ({ label, href }: CtaProps) => {
  return (
    <div>
      <a href={href}>{label}</a>
    </div>
  );
};

export type { CtaProps };
export default Cta;
