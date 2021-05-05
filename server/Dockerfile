FROM node:10

ENV VS_ENV=development

RUN mkdir -p /var/www

WORKDIR /var/www

COPY . .

RUN apt update && \
npm install

EXPOSE 3000

CMD ["npm", "start"]