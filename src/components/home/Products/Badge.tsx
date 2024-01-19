import React from "react";

interface BadgeProps {
  text: string;
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <div className="bg-electricPurple w-[92px] h-[35px] text-white flex justify-center items-center text-base font-semibold hover:bg-purple duration-300 cursor-pointer rounded-sm">
      {text}
    </div>
  );
};

export default Badge;
