declare namespace HyResult {
    export namespace ReactRouter {
      export interface RouteProps {
        location: Location;
        match: MatchParam;
        history: History;
      }
      export interface MatchParam {
        params: {
          uuid: string;
        };
        isExact: boolean;
        path: string;
        url: string;
      }
      export interface History {
        location: object;
        goBack: () => void;
      }
      export interface Location {
        key: string;
        pathname: string;
        search: string;
        hash: string;
        state: Object;
      }
    }
  }
