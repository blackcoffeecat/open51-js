import getType from './getType';

function isRefObject(value: any): boolean {
  return getType(value) === 'Object' && Object.keys(value).toString() === 'current';
}

export default isRefObject;
