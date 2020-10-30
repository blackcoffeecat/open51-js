import getType from './getType';

function isSyntheticEvent(event: any) {
  return (
    getType(event) === 'Object' && event.hasOwnProperty('nativeEvent') && event.__proto__.hasOwnProperty('persist')
  );
}

export default isSyntheticEvent;
