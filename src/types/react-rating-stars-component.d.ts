declare module "react-rating-stars-component" {
  import type { ComponentType } from "react";

  export interface ReactStarsProps {
    count: number;
    value: number;
    size: number;
    char: string;
    isHalf: boolean;
    edit?: boolean;
    activeColor?: string;
    color?: string;
    a11y?: boolean;
    onChange?: (value: number) => void;
  }

  const ReactStars: ComponentType<ReactStarsProps>;
  export default ReactStars;
}

// to get extra icons (optional) - the library can accept React elements for icons

//npm i react-icons
/* import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa'

emptyIcon?: React.ReactNode;
halfIcon?: React.ReactNode;
filledIcon?: React.ReactNode;
classNames?: string;
name?: string;
}
*/