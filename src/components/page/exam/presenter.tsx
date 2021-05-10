import React from "react";
import { Question } from "../../../@types";
import QuestionForm from "../../molecules/QuestionForm";
import Button from "../../atoms/Button";

type Props = {
  isLast: boolean;
  question: Question;
  isCorrect?: boolean;
  checkAnswer: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isAnswerVisible: boolean;
  changeChoice: (event: { target: HTMLInputElement }) => void;
  incrementIndex: () => void;
  showTotalResult: () => void;
  alreadyAnswered: boolean;
};

const Presenter: React.VFC<Props> = ({
  isLast,
  question,
  isCorrect,
  checkAnswer,
  isAnswerVisible,
  changeChoice,
  incrementIndex,
  showTotalResult,
  alreadyAnswered,
}) => (
  <>
    <div className="container mx-auto pt-16">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-4">
          <QuestionForm question={question} changeChoice={changeChoice} />
        </div>
        <div className="col-start-2 col-span-4">
          <Button disabled={alreadyAnswered} onClick={checkAnswer}>
            回答する
          </Button>
        </div>
        {isAnswerVisible && (
          <div className="col-start-2 col-span-4">
            <div>{isCorrect ? "正解！" : "不正解"}</div>
            <div>{question.explanation.text}</div>
            <div>
              {!isLast ? (
                <Button onClick={incrementIndex}>次の問題へ</Button>
              ) : (
                <Button onClick={showTotalResult}>総合結果を見る</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);

export default Presenter;
