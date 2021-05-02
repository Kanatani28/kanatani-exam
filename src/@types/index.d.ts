declare module "*.json" {
  const value: Exam[];
  export default value;
}

export type Exam = {
  title: string;
  questions: Question[];
};

export type Question = {
  text: string;
  choices: Choice[];
  explanation: Explanation;
};

export type Choice = {
  text: string;
  isAnswer: boolean;
};

export type Explanation = {
  text: string;
  html: string;
};
