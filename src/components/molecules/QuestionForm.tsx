import React from "react";
import { Question } from "../../@types";

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
          <h2 className="text-gray-700">{question.text}</h2>
          <div className="mt-2">
            {question.choices.map((choice, index) => (
              <div key={choice.text}>
                <label className="inline-flex items-center">
                  <input
                    type={isMultiAnswers ? "checkbox" : "radio"}
                    name="radio"
                    value={index}
                    onChange={changeChoice}
                  />

                  <span className="ml-2">{choice.text}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default QuestionForm;
