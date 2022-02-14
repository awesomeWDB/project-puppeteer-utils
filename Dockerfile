FROM node:12 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# 这里就不从node:12-alpine构建了，因为要安装puppeteer的运行环境，所以使用我的一个其他基础镜像wangdongbing/puppeteer-utils-base:latest
# FROM node:12-alpine
FROM wangdongbing/puppeteer-utils-base:latest

LABEL puppeteer-utils=true

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/bootstrap.js ./
COPY --from=build /app/package.json ./

ENV TZ="Asia/Shanghai"

RUN npm install

# 如果端口更换，这边可以更新一下
EXPOSE 7001

# 注意一下，需要挂载字体目录：/usr/share/fonts/truetype，不然打印的话，中文字体会有问题（当然宿主机上也需要自己安装所需要的字体）
VOLUME [ "/usr/share/fonts", "/app/public" ]

# 默认运行正式环境
CMD ["npm", "run", "docker:prod"]
