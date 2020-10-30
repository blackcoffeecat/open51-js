function getType(value: any): string {
  return Object.prototype.toString.call(value).match(/^\[object (?<name>[^\]]+)]$/).groups.name;
}

export default getType;
