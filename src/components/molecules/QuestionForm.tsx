import React from "react";
import { Question } from "../../@types";
import QuestionChoice from "../atoms/QuestionChoice";

type Props = {
  question: Question;
  changeChoice: (event: { target: HTMLInputElement }) => void;
};

const QuestionForm: React.VFC<Props> = React.memo(
  ({ question, changeChoice }) => {
    const isMultiAnswers =
      question.choices.filter((choice) => choice.isAnswer).length > 1;
    return (
      <div>
        <div className="block">
          <h2 className="bg-indigo-100 text-gray-700 text-lg py-10 px-5">
            {question.text}
          </h2>
          <div className="mt-5 space-y-1">
            {question.choices.map((choice, index) => (
              <QuestionChoice
                key={choice.text}
                {...{ isMultiAnswers, index, onChange: changeChoice }}
              >
                {choice.text}
              </QuestionChoice>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default QuestionForm;
