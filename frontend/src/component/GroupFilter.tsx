import { ctx, defaultGroups, myCtx, getGroupOptionSets } from "./CtxProvider";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FC, useContext, useState } from "react";
import Table from "react-bootstrap/Table";

const GroupFilter: FC = () => {
  const { groupOptionSets, subentries, setFilteredSubentries, setGroupOptionSets } = useContext(myCtx) as ctx;

  const [selectedGroups, setSelectedGroups] = useState(defaultGroups);

  const handleLabelSelect = (i: number, eventKey: string) => {
    const clone = [...selectedGroups];
    clone[i] = eventKey;
    setSelectedGroups(clone);

    const filtered = filterProjects(subentries, clone);
    setFilteredSubentries(filtered);
    setGroupOptionSets(getGroupOptionSets(filtered));
  };

  return subentries.length > 0 ? (
    <Table bordered hover>
      <thead>
        <tr>
          {selectedGroups.map((_, i) => (
            <th key={i}>{"Group" + (i + 1).toString()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {groupOptionSets.map((_, i) => (
            <td key={i}>
              <DropdownButton
                title={selectedGroups[i]}
                onSelect={(eventKey) => {
                  if (eventKey !== null) handleLabelSelect(i, eventKey);
                }}
              >
                {groupOptionSets[i].map((label) => (
                  <Dropdown.Item key={label} eventKey={`${label}`}>
                    {label}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </td>
          ))}
        </tr>
      </tbody>
    </Table>
  ) : null;
};

const filterProjects = (projects: any, labels: string[]) => {
  const pp = projects.filter((p: any) => defaultGroups.every((_, i) => isEqualOrAll(p.ica[i], labels[i])));
  return pp;
};

const isEqualOrAll = (input: string, selected: string) => (selected === "all" ? true : input === selected);

export default GroupFilter;
