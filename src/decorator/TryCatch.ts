import { loggers } from '@midwayjs/logger';
import { ResponseFactory } from '../util/ResponseFactory';

export function Try(errInfo = ''): MethodDecorator {
  return (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        return await method.apply(this, [...args]);
      } catch (err) {
        const coreLogger = loggers.getLogger('coreLogger');
        if (errInfo) coreLogger.error(errInfo);
        const info = `~~出现错误~~，${target.constructor.name}-${propertyKey}:`;
        coreLogger.error(info);
        coreLogger.error(err);
        // 看日志去，这里笼统的返回
        return ResponseFactory.buildFail('服务器异常！');
      }
    };
    return descriptor;
  };
}
