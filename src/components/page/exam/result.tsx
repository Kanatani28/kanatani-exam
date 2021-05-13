import React from "react";
import Button from "../../atoms/Button";

type Props = {
  percentage: number;
  retry: () => void;
};

const ResultPresenter: React.VFC<Props> = ({ percentage, retry }) => (
  <>
    <Main percentage={percentage} />
    <div className="text-center my-10">
      <Button onClick={retry}>もう一度チャレンジする</Button>
    </div>
  </>
);

const Main = ({ percentage }: { percentage: number }) => {
  const getTextImage = (percentage: number) => {
    if (percentage === 1) {
      return [
        "Congratulations!!素晴らしい！君こそ心の友かもしれない🤩🤩🤩",
        "https://pbs.twimg.com/media/C4R1WTQUcAEgfZJ?format=jpg&name=large",
      ];
    }
    if (percentage === 0) {
      return [
        "全然知りませんやん・・・！！！！😡😡😡",
        "https://stat.ameba.jp/user_images/20200123/10/fumajimeshikibu-murasaki/d7/2e/j/o1080060714700668912.jpg",
      ];
    }
    if (percentage >= 0.8) {
      return [
        "おお、ええ感じです。これからもよろしゅうたのんます。",
        "https://pbs.twimg.com/media/C4R1WB7VcAAEaus?format=jpg&name=large",
      ];
    }
    return [
      "まぁ、悪くないね。これから知っていってくれたら全然ええんやで・・・。",
      "https://pbs.twimg.com/media/C4R1WD-UkAAFNj_?format=jpg&name=large",
    ];
  };

  const [text, image] = getTextImage(percentage);
  return (
    <>
      <div className="font-extrabold text-lg md:text-xl my-10 text-center">
        {text}
      </div>
      <img src={image} />
    </>
  );
};

export default React.memo(ResultPresenter);
