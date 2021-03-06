import * as fs from 'fs'

export function writeTextFile(filepath: string, output: string) {
  fs.writeFileSync(filepath, output)
}

export function readFile(filepath: string) {
  return fs.readFileSync(filepath, 'utf8')
}

export function debug(...args: any[]) {
  if ((debug as any).debugOn) {
    info(...args)
  }
}

(debug as any).debugOn = false

export function info(...args: any[]) {
  // tslint:disable:no-console
  console.log(...args)
}

export function pretty(obj: any) {
  return JSON.stringify(obj, null, 2)
}

export function removeFromArray(arr: any[], obj: any) {
  arr.splice(arr.indexOf(obj), 1)
}

export function pushUnique(arr: any[], ...rest: any[]): boolean {
  let pushed = false
  for (const i of rest) {
    if (!arr.includes(i)) {
      pushed = true
      arr.push(i)
    }
  }
  return pushed
}
