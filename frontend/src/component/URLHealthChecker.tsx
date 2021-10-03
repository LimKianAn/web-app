import { FC, useState, useEffect, ReactNode } from "react";

interface Props {
  children: ReactNode;
  url: string;
  isURLHealthy: (url: string) => Promise<boolean>;
}

const URLHealthChecker: FC<Props> = ({ children, url, isURLHealthy }) => {
  const [isHealthy, setIsHealthy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    isURLHealthy(url).then((isHealthy) => {
      setIsLoading(false);
      setIsHealthy(isHealthy);
    });
  }, [url, isURLHealthy]);

  return isLoading ? <h1>{loadingText}</h1> : isHealthy ? <>{children}</> : <h1>{notReachableText}</h1>;
};

export const notReachableText = "not reachable";
export const loadingText = "loading";

export default URLHealthChecker;
