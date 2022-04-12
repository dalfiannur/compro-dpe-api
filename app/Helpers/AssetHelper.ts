import { domain, nodeEnv } from 'Config/app'

export class AssetHelper {
  public static getFullUrl(path: string) {
    let protocol = 'https://';

    if (nodeEnv === 'development') {
      protocol = 'http://'
    }

    return protocol + domain + '/' + path
  }
}
