import React from "react";
import { BadgeContainer, BadgeText } from "./styles";

const Badge = ({ count, size = "small" }) => {
  if (!count || count === 0) return null;

  const displayCount = count > 99 ? "99+" : count.toString();

  return (
    <BadgeContainer size={size}>
      <BadgeText size={size}>{displayCount}</BadgeText>
    </BadgeContainer>
  );
};

export default Badge;
