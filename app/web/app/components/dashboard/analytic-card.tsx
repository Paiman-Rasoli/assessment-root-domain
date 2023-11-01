"use client";

import { useAnalyticQuery } from "@/components/hooks";

function AnalyticCard() {
  const { data, isLoading } = useAnalyticQuery();
  console.log(data);

  return (
    <div className="m-4">
      <SingleCard label="Total Sign Up Users" value={data?.totalActiveSignup} />
      <SingleCard label="Total Active Today" value={data?.totalActiveToday} />
      <SingleCard
        label="Average active past seven days"
        value={data?.averageActivePastSevenDays}
      />
    </div>
  );
}

export default AnalyticCard;

type SingleCardProps = {
  label: string;
  value?: number;
};

const SingleCard = ({ label, value }: SingleCardProps) => {
  return (
    <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] sborder-[1px] border-gray-400 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:!bg-navy-800 dark:text-black dark:shadow-none">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-black">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              className="h-7 w-7"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
            </svg>
          </span>
        </div>
      </div>
      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600">{label}</p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-black">
          {value}
        </h4>
      </div>
    </div>
  );
};
