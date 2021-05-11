import React, { useState, useCallback } from "react";
import Presenter from "./presenter";
import ResultPresenter from "./result";
import Loading from "../../atoms/Loading";
import useQuestions from "../../../hooks/useQuestions";

const ExamPage: React.VFC = () => {
  const [questions, isLoading] = useQuestions();
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
  }, [currentChoices, currentIndex, isCorrect, questions]);

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
    [currentChoices, currentIndex, questions]
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
      {!isLoading && questions.length > 0 && (
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
      )}
      {(isLoading || questions.length <= 0) && <Loading />}
    </>
  );
};

export default ExamPage;
