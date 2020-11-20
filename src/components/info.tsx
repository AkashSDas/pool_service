import React from "react";

interface InfoProps {
  text: string;
}

interface MultiInfoProps {
  text1: string;
  text2: string;
}

const Info: React.FC<InfoProps> = ({ text }: InfoProps) => {
  return <div className="info">{text}</div>;
};

export const MultiInfo: React.FC<MultiInfoProps> = ({
  text1,
  text2,
}: MultiInfoProps) => {
  return (
    <div
      className="info"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>{text1}</p>
      <p style={{ marginTop: "0.4rem" }}>{text2}</p>
    </div>
  );
};

export default Info;
