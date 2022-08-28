import type { ComponentType, FC } from "react";
import dynamic from "next/dynamic";

import { CtaProps } from "../atoms/Cta";
import { PageProps } from "../Page";

// import prop types from components
export type Props = CtaProps | PageProps;

type ComponentMap = {
  [P in Props as P["_type"]]: ComponentType<P>;
}

const components: ComponentMap = {
  HeroBanner: dynamic(() => import("../HeroBanner")),
  CtaComponent: dynamic(() => import("../atoms/Cta")),
  Page: dynamic(() => import("../Page")),
};

/**
 * Get the specified component based on type
 */
export const DynamicComponent: FC<Props> = (props) => {
    if (!props._type) {
      throw new Error(`Object does not have the '_type' property required to select a component: ${JSON.stringify(props, null)}`);
    }

    const Component = components[props._type] as ComponentType<Props>;

    if (!Component) {
        throw new Error(`No component match object with type: '${props._type}'\n Make sure DynamicComponent.tsx file has entry for '${props._type}' in 'components'`);
    }

    return <Component {...props} />;
  };
