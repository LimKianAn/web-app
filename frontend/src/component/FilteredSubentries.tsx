import { ctx, defaultGroups, myCtx } from "./CtxProvider";
import { FC, useContext } from "react";
import Table from "react-bootstrap/Table";
import { groupHierarchy } from "../pkg/remoteResource";

const FilteredSubentries: FC = () => {
  const { filteredSubentries } = useContext(myCtx) as ctx;

  return (
    <Table bordered hover>
      <thead>
        <tr>
          {Object.keys(filteredSubentries[0]).map((key) => (key !== groupHierarchy ? <th key={key}>{key}</th> : null))}
          {defaultGroups.map((_, i) => (
            <th key={i}>{`Group${i + 1}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredSubentries.map((proj, i) => (
          <tr key={i}>
            {Object.keys(proj).map((key) => (key !== groupHierarchy ? <td key={key}>{proj[key]}</td> : null))}
            {defaultGroups.map((_, i) => (
              <td key={i}>{proj.ica[i]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FilteredSubentries;
