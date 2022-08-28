interface HeroBannerProps {
  _type: string;
  fields: {
    title: string;
    subtitle: string;
  };
}

const HeroBanner = (props: HeroBannerProps) => {
  return (
    <div>
      <h1>{props.fields.title}</h1>
      <p>{props.fields.subtitle}</p>
    </div>
  );
};

export default HeroBanner;
export type { HeroBannerProps };
