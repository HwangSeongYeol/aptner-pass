import React from "react";

export interface SpinnerProps {
  color?: string; // 스피너 색상
  size?: number; // 스피너 크기 (기본 단위는 rem)
}

const Spinner: React.FC<SpinnerProps> = ({
  color = "bg-blue-500", // 기본 색상
  size = 2, // 기본 크기
}) => {
  return (
    <div
      className={`flex justify-center items-center`}
      style={{ width: `${size * 1}rem`, height: `${size * 1}rem` }} // 크기 설정
    >
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color}`}
        style={{ width: `${size * 1}rem`, height: `${size * 1}rem` }} // 크기 설정
      />
    </div>
  );
};

export default Spinner;
