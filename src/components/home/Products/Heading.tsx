import React from "react";

const Heading = (props: any) => {
  const { heading } = props;
  return (
    <div className="text-3xl text-center font-semibold pb-6">{heading}</div>
  );
};

export default Heading;
