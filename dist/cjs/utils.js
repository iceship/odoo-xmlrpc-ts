'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.parseError = parseError;
// src/utils.ts
function parseError(error) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'object' && error !== null) {
    if ('faultString' in error) {
      return String(error.faultString);
    }
    if ('message' in error) {
      return String(error.message);
    }
  }
  return String(error);
}
