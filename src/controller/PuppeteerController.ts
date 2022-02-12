import {
  App,
  Controller,
  Get,
  Inject,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { Application } from 'egg';
import { Try } from '../decorator/TryCatch';
import { PdfService } from '../service/PdfService';
import { ResponseFactory } from '../util/ResponseFactory';

@Provide()
@Controller('/puppeteer')
export class PuppeteerController {
  @App()
  app: Application;

  @Inject()
  pdfService: PdfService;

  @Try()
  @Get('/')
  async home() {
    return ResponseFactory.buildSuccess('hello puppeteer!');
  }

  @Try()
  @Get('/toPDF')
  async toPDF(@Query() url: string) {
    if (!url) return ResponseFactory.buildFail('请输入地址！');
    const result = await this.pdfService.toPDF('https://www.baidu.com/');
    return ResponseFactory.buildSuccess(
      result.replace(/[\d\D]*\/public/, '/public')
    );
  }
}
