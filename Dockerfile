FROM node:14

EXPOSE 8000

WORKDIR /app

RUN npm install i npm@latest -g 

COPY package.json package-lock*.json ./

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . .

CMD ["npm", "start"]

