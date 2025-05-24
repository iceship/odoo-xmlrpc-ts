"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdooAuthenticationError = exports.OdooError = void 0;
class OdooError extends Error {
    constructor(message) {
        super(message);
        this.name = 'OdooError';
    }
}
exports.OdooError = OdooError;
class OdooAuthenticationError extends OdooError {
    constructor(message = 'Authentication failed') {
        super(message);
        this.name = 'OdooAuthenticationError';
    }
}
exports.OdooAuthenticationError = OdooAuthenticationError;
