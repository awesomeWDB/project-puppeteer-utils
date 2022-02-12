import { App, Controller, Get, Provide } from '@midwayjs/decorator';
import { Application } from 'egg';
import { Try } from '../decorator/TryCatch';
import { ResponseFactory } from '../util/ResponseFactory';

@Provide()
@Controller('/')
export class HomeController {
  @App()
  app: Application;

  @Try()
  @Get('/')
  async home() {
    return ResponseFactory.buildSuccess('Hello!');
  }
}
