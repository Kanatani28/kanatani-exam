import React from "react";

type Props = {
  children: string;
  isMultiAnswers: boolean;
  index: number;
  onChange: (event: { target: HTMLInputElement }) => void;
  alreadyAnswered: boolean;
};

const QuestionChoice: React.VFC<Props> = ({
  children,
  isMultiAnswers,
  index,
  onChange,
  alreadyAnswered,
}) => {
  return (
    <div className="py-5 pl-3 bg-red-100" key={children}>
      <label className="inline-flex items-center">
        <input
          type={isMultiAnswers ? "checkbox" : "radio"}
          name="radio"
          value={index}
          onChange={onChange}
          disabled={alreadyAnswered}
        />
        <span className="ml-2">{children}</span>
      </label>
    </div>
  );
};

export default QuestionChoice;
