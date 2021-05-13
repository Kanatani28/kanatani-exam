import React from "react";
import { Question } from "../../../@types";
import QuestionForm from "../../molecules/QuestionForm";
import Button from "../../atoms/Button";
import Footer from "../../atoms/Footer";

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
    <div className="flex flex-col min-h-screen pt-16">
      <div className="flex-grow mx-10 md:mx-32 lg:mx-64 space-y-3">
        <div>
          <QuestionForm question={question} changeChoice={changeChoice} />
        </div>
        <div>
          <Button disabled={alreadyAnswered} onClick={checkAnswer}>
            回答する
          </Button>
        </div>
        {isAnswerVisible && (
          <div className="col-start-2 col-span-4 space-y-3">
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
      <Footer />
    </div>
  </>
);

export default Presenter;
