import { Provide, App } from '@midwayjs/decorator';
import { Application } from 'egg';
import * as puppeteer from 'puppeteer';
import { sleep } from '../util/sleep';
import { batchMkdir } from '../util/batchMkdir';
import * as stringRandom from 'string-random';

@Provide()
export class PdfService {
  @App()
  app: Application;

  public async toPDF(url = '', { format } = { format: 'a4' }) {
    let browser = null;
    const publicPath =
      (this.app.getConfig('root') as string) +
      '/public/' +
      new Date().toLocaleDateString().replace(/\//g, '-');
    const fileName = `${stringRandom(16)}.pdf`;
    const fullpath = `${publicPath}/${fileName}`;
    try {
      batchMkdir(publicPath);
      // 打开浏览器，生成pdf，然后关闭浏览器，返回
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });
      await sleep(1000);
      await page.pdf({
        path: fullpath,
        format,
      });
      return fullpath;
    } catch (err) {
      throw new Error(err);
    } finally {
      if (browser) {
        browser.close();
        browser = null;
      }
    }
  }
}
