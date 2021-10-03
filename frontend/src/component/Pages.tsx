import { FC, useContext } from "react";
import FilteredSubentries from "./FilteredSubentries";
import GroupFilter from "./GroupFilter";
import MonthlyData from "./MonthlyData";
import URLHealthChecker from "./URLHealthChecker";
import YearMonthSelector from "./YearMonthSelector";
import { ctx, myCtx } from "./CtxProvider";
import { apiHealthURL, isURLHealthy } from "../pkg/remoteResource";

export const PageOverview: FC = () => {
  const { year, month } = useContext(myCtx) as ctx;
  return (
    <>
      <URLHealthChecker url={apiHealthURL} isURLHealthy={isURLHealthy}>
        <YearMonthSelector />
        <MonthlyData year={year} month={month} />
      </URLHealthChecker>
    </>
  );
};

export const PageDetailedEntry: FC = () => {
  return (
    <>
      <GroupFilter />
      <FilteredSubentries />
    </>
  );
};
