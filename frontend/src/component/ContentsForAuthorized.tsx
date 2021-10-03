import { FC } from "react";
import { Row } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PageOverview, PageDetailedEntry } from "./Pages";
import CtxProvider from "./CtxProvider";

export const ContentsForAuthorized: FC = () => {
  return (
    <Row>
      <CtxProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={PageOverview} />
            <Route path="/entries" component={PageDetailedEntry}></Route>
          </Switch>
        </BrowserRouter>
      </CtxProvider>
    </Row>
  );
};

export default ContentsForAuthorized;
