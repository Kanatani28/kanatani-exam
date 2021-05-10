import React, { useState, useCallback } from "react";
import { Question } from "../../../@types";
import Presenter from "./presenter";
import ResultPresenter from "./result";

const questions: Question[] = [
  {
    text: "maroKanataniさんの生年月日はいつでしょう？",
    choices: [
      {
        text: "1965年2月8日",
        isAnswer: false,
      },
      {
        text: "1994年2月8日",
        isAnswer: true,
      },
      {
        text: "2038年2月8日",
        isAnswer: false,
      },
      {
        text: "794年2月8日",
        isAnswer: false,
      },
    ],
    explanation: {
      text: "1994年2月8日生まれです。",
      html: "",
    },
  },
  {
    text:
      "次のうち、maroKanataniさんができないことはどれでしょう？（複数回答）",
    choices: [
      {
        text: "美味しい料理を作る",
        isAnswer: true,
      },
      {
        text: "コントラバスを演奏する",
        isAnswer: false,
      },
      {
        text: "50m走を7秒台で走る",
        isAnswer: false,
      },
      {
        text: "バク転",
        isAnswer: true,
      },
      {
        text: "プログラミング",
        isAnswer: false,
      },
    ],
    explanation: {
      text:
        "バク転はできません。首がもげるイメージしか湧かない・・・。料理も美味しいものは作れません。",
      html: "2",
    },
  },
  {
    text: "次のうち、maroKanataniさんが最近買ったものは何でしょう？",
    choices: [
      {
        text: "ギター",
        isAnswer: false,
      },
      {
        text: "低反発枕",
        isAnswer: false,
      },
      {
        text: "車",
        isAnswer: false,
      },
      {
        text: "Nintendo Switch",
        isAnswer: true,
      },
    ],
    explanation: {
      text: "お家時間を快適に過ごすためにNintendo Switchを購入しました。",
      html: "2",
    },
  },
];

const ExamPage: React.VFC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCorrect, setCorrect] = useState<boolean | undefined>(undefined);
  const [currentChoices, setCurrentChoices] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isAnswerVisible, setAnswerVisible] = useState<boolean>(false);
  const [isResultVisible, setResultVisible] = useState<boolean>(false);
  const [alreadyAnswered, setAlreadyAnswered] = useState<boolean>(false);

  const handleAnswerBtnClick = useCallback(() => {
    const answers = questions[currentIndex].choices.filter(
      (choice) => choice.isAnswer
    );

    const selectedChoice = questions[
      currentIndex
    ].choices.filter((choice, index) =>
      currentChoices.some((cc) => cc === index)
    );
    const lengthOk = currentChoices.length === answers.length;
    const isAllCorrect =
      lengthOk &&
      selectedChoice
        .map((choice) => choice.isAnswer)
        .reduce((prev, current) => prev && current);

    setAnswerVisible(true);
    setAlreadyAnswered(true);
    setCorrect(isAllCorrect);
    isAllCorrect && setScore((prev) => prev + 1);
  }, [currentChoices, currentIndex, isCorrect]);

  const handleUserChoice = useCallback(
    (event: { target: HTMLInputElement }) => {
      const value = parseInt(event.target.value);
      const isMultiAnswer =
        questions[currentIndex].choices.filter((choice) => choice.isAnswer)
          .length > 1;
      let result = [];
      if (event.target.checked) {
        result = isMultiAnswer ? [...currentChoices, value] : [value];
      } else {
        result = currentChoices.filter((choice) => choice !== value);
      }
      setCurrentChoices(result);
    },
    [currentChoices, currentIndex]
  );

  const incrementIndex = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
    setCorrect(undefined);
    setCurrentChoices([]);
    setAnswerVisible(false);
    setAlreadyAnswered(false);
  }, [currentIndex]);

  const showTotalResult = useCallback(() => {
    setResultVisible(true);
  }, [score, questions.length]);

  const handleRetryBtnClick = useCallback(() => {
    setCurrentIndex(0);
    setCorrect(undefined);
    setCurrentChoices([]);
    setAnswerVisible(false);
    setScore(0);
    setResultVisible(false);
    setAlreadyAnswered(false);
  }, []);

  return (
    <>
      {isResultVisible ? (
        <ResultPresenter
          retry={handleRetryBtnClick}
          percentage={score / questions.length}
        />
      ) : (
        <Presenter
          alreadyAnswered={alreadyAnswered}
          isAnswerVisible={isAnswerVisible}
          isLast={questions.length === currentIndex + 1}
          question={questions[currentIndex]}
          isCorrect={isCorrect}
          changeChoice={handleUserChoice}
          checkAnswer={handleAnswerBtnClick}
          incrementIndex={incrementIndex}
          showTotalResult={showTotalResult}
        />
      )}
    </>
  );
};

export default ExamPage;
