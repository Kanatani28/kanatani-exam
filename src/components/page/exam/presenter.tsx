import React from "react";
import { Question } from "../../../@types";
import QuestionForm from "../../molecules/QuestionForm";

type Props = {
  question: Question;
  isCorrect?: boolean;
  checkAnswer: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  changeChoice: (event: { target: HTMLInputElement }) => void;
  incrementIndex: () => void;
};

const Presenter: React.VFC<Props> = ({
  question,
  isCorrect,
  checkAnswer,
  changeChoice,
  incrementIndex,
}) => (
  <>
    <QuestionForm question={question} changeChoice={changeChoice} />
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={checkAnswer}
      >
        回答する
      </button>
    </div>
    <div>
      <div>{isCorrect ? "正解！" : "不正解"}</div>
      <div>{question.explanation.text}</div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={incrementIndex}
        >
          次の問題へ
        </button>
      </div>
    </div>
  </>
);

export default Presenter;
