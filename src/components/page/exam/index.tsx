import React, { useState, useCallback } from "react";
import Presenter from "./presenter";
import ResultPresenter from "./result";
import Loading from "../../atoms/Loading";
import useQuestions from "../../../hooks/useQuestions";
import { motion, useAnimation } from "framer-motion";
import Footer from "../../atoms/Footer";

const ExamPage: React.VFC = () => {
  const [questions, isLoading] = useQuestions();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCorrect, setCorrect] = useState<boolean | undefined>(undefined);
  const [currentChoices, setCurrentChoices] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isAnswerVisible, setAnswerVisible] = useState<boolean>(false);
  const [isResultVisible, setResultVisible] = useState<boolean>(false);
  const [alreadyAnswered, setAlreadyAnswered] = useState<boolean>(false);

  const animationCtrl = useAnimation();

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
    animationCtrl.start({ opacity: [0, 1], x: ["50%", "0%"] });
  }, [currentIndex]);

  const showTotalResult = useCallback(() => {
    setResultVisible(true);
    animationCtrl.start({ opacity: [0, 1] });
  }, [score, questions.length]);

  const handleRetryBtnClick = useCallback(() => {
    setCurrentIndex(0);
    setCorrect(undefined);
    setCurrentChoices([]);
    setAnswerVisible(false);
    setScore(0);
    setResultVisible(false);
    setAlreadyAnswered(false);
    animationCtrl.start({ opacity: [0, 1] });
  }, []);

  return (
    <>
      {!isLoading && questions.length > 0 && (
        <div className="flex flex-col min-h-screen pt-16">
          {isResultVisible ? (
            <motion.div
              animate={animationCtrl}
              className="flex-grow mx-10 md:mx-32 lg:mx-64"
            >
              <ResultPresenter
                retry={handleRetryBtnClick}
                percentage={score / questions.length}
              />
            </motion.div>
          ) : (
            <motion.div
              className="flex-grow mx-10 md:mx-32 lg:mx-64 space-y-5 mb-5"
              animate={animationCtrl}
            >
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
            </motion.div>
          )}
          <Footer />
        </div>
      )}
      {(isLoading || questions.length <= 0) && <Loading />}
    </>
  );
};

export default ExamPage;
