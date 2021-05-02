import React from "react";
import { Link } from "rocon/react";
import toplevelRoutes from "../../routes";

const HeroSection = () => (
  <div className="relative bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">
                maroKanatani 検定 Deep Dive
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              あなたは maroKanatani さんについて どれくらい知ってるでしょうか？
              <br />
              クイズを解いて理解度を測ってみましょう！
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  route={toplevelRoutes._.exam}
                >
                  はじめる
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        src="https://2.bp.blogspot.com/-Gp2_6OZJ1FQ/XASwZmJF9yI/AAAAAAABQZ0/C8dUDl0e_uEWbDjvwNAo8DArlJX4vIaFwCLcBGAs/s800/computer_programming_man.png"
        alt="programmer"
      />
    </div>
  </div>
);

export default HeroSection;
