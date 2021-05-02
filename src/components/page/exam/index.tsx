import React, { useState, useCallback } from "react";
import { Choice, Question } from "../../../@types";
import Presenter from "./presenter";

const questions: Question[] = [
  {
    text: "問題文",
    choices: [
      {
        text: "選択肢１",
        isAnswer: false,
      },
      {
        text: "選択肢2",
        isAnswer: false,
      },
      {
        text: "選択肢3",
        isAnswer: true,
      },
      {
        text: "選択肢4",
        isAnswer: false,
      },
    ],
    explanation: {
      text: "解説文",
      html: "",
    },
  },
  {
    text: "問題文2",
    choices: [
      {
        text: "選択肢１-2",
        isAnswer: true,
      },
      {
        text: "選択肢2-2",
        isAnswer: false,
      },
      {
        text: "選択肢3-2",
        isAnswer: false,
      },
      {
        text: "選択肢4-4",
        isAnswer: true,
      },
    ],
    explanation: {
      text: "解説文2",
      html: "2",
    },
  },
];

const ExamPage: React.VFC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCorrect, setCorrect] = useState<boolean | undefined>(undefined);
  const [currentChoices, setCurrentChoices] = useState<number[]>([]);
  const [score, setScore] = useState();

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

    setCorrect(isAllCorrect);
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
  }, [currentIndex]);

  return (
    <>
      <button onClick={() => console.log(currentChoices)}>aaaaa</button>
      <Presenter
        question={questions[currentIndex]}
        isCorrect={isCorrect}
        changeChoice={handleUserChoice}
        checkAnswer={handleAnswerBtnClick}
        incrementIndex={incrementIndex}
      />
    </>
  );
};

export default ExamPage;
