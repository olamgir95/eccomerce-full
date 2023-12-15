import React from "react";
import { FC } from "react";

interface FooterListTitleProps {
  title: string;
}

const FooterListTitle: FC<FooterListTitleProps> = ({ title }) => {
  return <h3 className="text-xl font-bodyFont font-semibold mb-6">{title}</h3>;
};

export default FooterListTitle;
