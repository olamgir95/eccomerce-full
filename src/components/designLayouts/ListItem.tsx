import React from "react";
import { FC } from "react";

interface ListItemProps {
  itemName: string;
  className: string;
}

const ListItem: FC<ListItemProps> = ({ itemName, className }) => {
  return <li className={className}>{itemName}</li>;
};

export default ListItem;
