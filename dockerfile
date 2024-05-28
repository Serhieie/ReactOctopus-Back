#MANUAL
# Edit the code below as needed.
# Build the image using the command:
# docker build -t task-pro-service .
# Run the container.


FROM node:20.12-alpine3.18

RUN apk update && apk add git

WORKDIR /app

#uncomment this if you working local
COPY . .

#comment this if you working local
# RUN apk add --no-cache bash

ENV CLOUDINARY_NAME=your_name
ENV CLOUDINARY_KEY=your_key
ENV CLOUDINARY_SECRET=your_secret
ENV DB_HOST=
ENV PORT=3000
ENV SEND_GRID_API_KEY=
ENV SEND_GRID_FROM=
ENV BASE_URL=http://localhost:3000
ENV GOOGLE_CLIENT_ID=your_Id
ENV GOOGLE_CLIENT_SECRET=your_secret
ENV FRONTEND_URL=https://serhieie.github.io/ReactOctopus/

ENV SEND_MAIL_USER=your_postal_service_email
ENV SEND_MAIL_PASS=your_postal_service_password
ENV SEND_MAIL_HOST=your_postal_service_host
ENV SEND_MAIL_PORT=your_postal_service_port
ENV SEND_HELP_MAIL=mail_to_which_notifications_should_be_sent

ENV ACCESS_SECRET_KEY=
ENV REFRESH_SECRET_KEY=
ENV ACCESS_EXPIRES_TIME=2m
ENV REFRESH_EXPIRES_TIME=7d
ENV SECRET_KEY=NpdAMp9gyj

#comment this if you working local
# RUN git clone -b main https://github.com/Serhieie/ReactOctopus-Back.git /app/task-pro

#comment this if you working local
# WORKDIR /app/task-pro

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
