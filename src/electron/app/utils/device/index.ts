import * as isPi from 'detect-rpi';

export const IS_PI: boolean = isPi();

/*
 * This method will run the callback and return the value if run on a Rpi.
 * Otherwise, it will do a no-op and log to console.
 */
export const onlyRpiSync = <T>(callback: () => T, name: string = ''): T => {
  if (IS_PI) {
    return callback();
  }
  console.log(`Call to '${name}' was mocked`); // tslint:disable-line no-console
  return null as unknown as T;
};