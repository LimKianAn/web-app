import { createContext, FC, useState } from "react";

export interface ctx {
  year: string;
  setYear: (year: string) => void;
  month: string;
  setMonth: (month: string) => void;
  queryID: string;
  setQueryID: (queryID: string) => void;
  subentries: any[];
  setSubentries: (projects: any[]) => void;
  filteredSubentries: any[];
  setFilteredSubentries: (projects: any[]) => void;
  groupOptionSets: string[][];
  setGroupOptionSets: (sets: string[][]) => void;
}

export const myCtx = createContext<ctx | null>(null);

const CtxProvider: FC = ({ children }) => {
  const date = new Date();
  const [year, setYear] = useState(String(date.getFullYear()));
  const [month, setMonth] = useState(
    (() => {
      const month = date.getMonth();
      return String(month === 0 ? 12 : month);
    })()
  );
  const [queryID, setQueryID] = useState("");
  const [subentries, setSubentries] = useState<any[]>([]);
  const [filteredSubentries, setFilteredSubentries] = useState<any[]>([]);
  const [groupOptionSets, setGroupOptionSets] = useState<string[][]>([]);

  return (
    <myCtx.Provider
      value={{
        year,
        setYear,
        month,
        setMonth,
        queryID,
        setQueryID,
        subentries,
        setSubentries,
        filteredSubentries,
        setFilteredSubentries,
        groupOptionSets,
        setGroupOptionSets,
      }}
    >
      {children}
    </myCtx.Provider>
  );
};

export const getGroupOptionSets = (projects: any[]) => {
  const init = [["all"], ["all"], ["all"], ["all"], ["all"]];
  projects.forEach((proj: any) => {
    init.forEach((_, i) => {
      init[i] = uniqPush(init[i], proj.ica[i]);
    });
  });
  return init;
};

const uniqPush = (array: string[], newE: string) => {
  const set = new Set<string>();
  array.forEach((v) => set.add(v));

  if (newE !== "") {
    set.add(newE);
  }

  const newArray = new Array<string>();
  set.forEach((v) => newArray.push(v));
  return newArray;
};

export const defaultGroups = ["all", "all", "all", "all", "all"];

export default CtxProvider;
