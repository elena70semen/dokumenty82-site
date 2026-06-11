import brandTokensJson from "./brand-tokens.json";

export const brandTokens = brandTokensJson;

export type BrandTokens = typeof brandTokens;
export type ServiceContourKey = keyof typeof brandTokens.serviceContours;
