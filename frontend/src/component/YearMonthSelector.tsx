import { FC, useContext } from "react";
import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { ctx, myCtx } from "./CtxProvider";

const YearMonthSelector: FC = () => {
  const selectYear = (eventKey: string | null, _: React.SyntheticEvent<unknown>) => {
    if (eventKey !== null) {
      setYear(eventKey);
    }
  };

  const selectMonth = (eventKey: string | null, e: React.SyntheticEvent<unknown>) => {
    if (eventKey !== null) {
      setMonth(eventKey);
    }
  };

  const { year, setYear, month, setMonth } = useContext(myCtx) as ctx;

  return (
    <>
      <Row>
        <Col md="auto">
          <DropdownButton title={year} onSelect={selectYear}>
            {years().map((year) => (
              <Dropdown.Item key={year} eventKey={year}>
                {year}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col md="auto">
          <DropdownButton id="dropdown-item-month" title={month} onSelect={selectMonth}>
            {months.map((month) => (
              <Dropdown.Item key={month} eventKey={month}>
                {month}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
    </>
  );
};

const years = () => {
  const yy: number[] = [];
  for (let y = 2021; y <= new Date().getFullYear(); y++) {
    yy.push(y);
  }
  return yy;
};

const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export default YearMonthSelector;
