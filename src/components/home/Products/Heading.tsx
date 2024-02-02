import React from "react";

const Heading = (props: any) => {
  const { heading } = props;
  return (
    <div className="text-2xl lg:text-4xl text-center font-semibold pb-6">
      {heading}
    </div>
  );
};

export default Heading;
