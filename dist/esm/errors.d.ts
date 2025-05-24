export declare class OdooError extends Error {
  constructor(message: string);
}
export declare class OdooAuthenticationError extends OdooError {
  constructor(message?: string);
}
