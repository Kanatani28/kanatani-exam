import React from "react";
import Button from "../../atoms/Button";

type Props = {
  percentage: number;
  retry: () => void;
};

const ResultPresenter: React.VFC<Props> = ({ percentage, retry }) => (
  <>
    <div className="container mx-auto pt-10">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-4">
          すごい！今日から君はmaroKanataniマスターだ！！
        </div>
        <div className="col-start-2 col-span-4">{percentage}</div>
        <Button onClick={retry}>もう一度チャレンジする</Button>
      </div>
    </div>
  </>
);

export default ResultPresenter;
