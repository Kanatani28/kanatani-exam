import React from "react";
import { Question } from "../../../@types";
import QuestionForm from "../../molecules/QuestionForm";
import Button from "../../atoms/Button";
import { motion } from "framer-motion";

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
    <div>
      <QuestionForm
        question={question}
        changeChoice={changeChoice}
        alreadyAnswered={alreadyAnswered}
      />
    </div>
    <div>
      <Button disabled={alreadyAnswered} onClick={checkAnswer}>
        回答する
      </Button>
    </div>
    {isAnswerVisible && (
      <motion.div
        className="col-start-2 col-span-4 space-y-3"
        animate={{ opacity: [0, 1] }}
      >
        <div
          className={`text-lg font-bold ${
            isCorrect ? "text-green-700" : "text-red-700"
          }`}
        >
          {isCorrect ? "正解！" : "不正解"}
        </div>
        <div>{question.explanation.text}</div>
        <div>
          {!isLast ? (
            <Button onClick={incrementIndex}>次の問題へ</Button>
          ) : (
            <Button onClick={showTotalResult}>総合結果を見る</Button>
          )}
        </div>
      </motion.div>
    )}
  </>
);

export default Presenter;
