import * as React from "react";

import Image from "next/image";

export const Logo: React.FC<{ size?: number; width?: number; height?: number, props?: any }> = ({
  size = 28,
  width,
  height,
  ...props
}) => (
  <Image src="/logo.png" alt="FUS-DITP" width={width || size} height={height || size} className="shrink-0" {...props} /> 
);

