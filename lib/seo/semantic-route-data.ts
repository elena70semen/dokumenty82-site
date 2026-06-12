import semanticRouteDataJson from "./semantic-route-data.json";

export type SemanticRouteData = {
  path: string;
  indexed: boolean;
  includeInSitemap: boolean;
  routeClass: string;
  parentRoute: string | null;
  routeGroup: string;
  serviceCluster: string;
  primaryIntent: string;
  secondarySupportIntent: string;
  safeUserWording: string[];
  safeQueryVariants: string[];
  problemHooks: string[];
  contentAngle: string;
  faqAngle: string;
  relatedRoutes: string[];
  avoidCannibalizing: string[];
  metadataDirection: string;
  h1Direction: string;
  schemaBoundary: string;
  holdRisks: string[];
  pageBlockPurpose: string[];
  implementationStatus: string;
};

export const semanticRoutes = semanticRouteDataJson.routes as SemanticRouteData[];

export const semanticRouteDataByPath = Object.fromEntries(
  semanticRoutes.map((route) => [route.path, route])
) as Record<string, SemanticRouteData>;
