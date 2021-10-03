import { FC, useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ctx, myCtx, getGroupOptionSets } from "./CtxProvider";
import { entryDetail, entryID, getQueryID, monthlyData } from "../pkg/remoteResource";

const MonthlyData: FC<PropsMD> = ({ year, month }) => {
  const [data, setData] = useState<any[]>([]);

  const { setQueryID, setFilteredSubentries, setGroupOptionSets, setSubentries } = useContext(myCtx) as ctx;

  useEffect(() => {
    getQueryID(year, month).then((id) => setQueryID(id));
    monthlyData(year, month).then((d) => setData(d));
  }, [year, month, setData, setQueryID]);

  const showFilter = (subentries: any[]) => {
    setFilteredSubentries(subentries);
    setGroupOptionSets(getGroupOptionSets(subentries));
    setSubentries(subentries);
  };

  return data && data[0] ? (
    <Table bordered hover>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key, i) => {
            return i !== 0 && i !== 9 && i !== 10 ? <th key={i}>{key}</th> : null;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i}>
            {Object.keys(d).map((key, j) => {
              if (j === 0 || j === 9) {
                return null;
              }

              if (key === entryDetail) {
                return (
                  <td key={j}>
                    <Link to={`/entries/${d[entryID]}`}>
                      <Button onClick={() => showFilter(d[key])} size="sm" variant="outline-primary">
                        Filter
                      </Button>
                    </Link>
                  </td>
                );
              }

              return j !== 10 && j !== 11 ? <td key={j}>{d[key]}</td> : null;
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  ) : null;
};

interface PropsMD {
  year: string;
  month: string;
}

export default MonthlyData;
