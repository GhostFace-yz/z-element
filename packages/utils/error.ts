import { isString } from 'lodash-es'

class ZelError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'ZelError';
  }
}

export function throwError(scope: string,msg: string) {
  throw new ZelError(`[${scope}: ${msg}]`)
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string,msg: string): void
export function debugWarn (scope: string|Error,msg?: string) {
  if(process.env.NODE_ENV === 'production') {
    const err = isString(scope)? new ZelError(`[${scope}: ${msg}]`): scope
    console.warn(err)
  }
}