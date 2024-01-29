import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

export const RippleBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: "#44b700",
    "&::after": {
      position: "absolute",
      padding: "1px",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
