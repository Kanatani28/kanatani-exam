import { useState, useEffect } from "react";
import { Question } from "../@types";

const useQuestions = (): [Question[], boolean] => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const apiRequest = (): Promise<Question[]> =>
    fetch(import.meta.env.VITE_API_ENDPOINT as string).then((res) =>
      res.json()
    );

  useEffect(() => {
    setLoading(true);
    const getQuestion = async () => {
      const response = await apiRequest();
      setQuestions(response);
      setLoading(false);
    };
    getQuestion();
  }, []);

  return [questions, isLoading];
};

export default useQuestions;
