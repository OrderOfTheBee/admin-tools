FROM nginx:stable-alpine

RUN apk update
RUN apk add --upgrade libxml2 libxslt

ARG GROUPNAME=Alfresco
ARG GROUPID=1000
ARG USERNAME=aca
ARG USERID=33009
ARG DEFAULT_APP=${project.artifactId}

COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /

RUN mkdir -p /tmp/apps
COPY *.war /tmp/apps/
WORKDIR /tmp/apps
RUN ls *.war | xargs -I {} sh -c 'mv $1 `basename $1 .war`.zip' - {} && \
	unzip ${DEFAULT_APP}.zip -d /usr/share/nginx/html -o

WORKDIR /usr/share/nginx/html

RUN addgroup -g ${GROUPID} ${GROUPNAME} && \
  adduser -S -u ${USERID} -G ${GROUPNAME} -s "/bin/bash" ${USERNAME} && \
  chown -R ${USERNAME}:${GROUPNAME} ./app.config.json && \
  chown -R ${USERNAME}:${GROUPNAME} ./index.html && \
  chown -R ${USERNAME}:${GROUPNAME} /var/cache/nginx && \
  touch /var/run/nginx.pid && \
  chown -R ${USERNAME}:${GROUPNAME} /var/run/nginx.pid && \
  chmod +x /entrypoint.sh && \
  chown -R ${USERNAME}:${GROUPNAME} /entrypoint.sh && \
  chown -R ${USERNAME}:${GROUPNAME} /etc/nginx/nginx.conf && \
  chown -R ${USERNAME}:${GROUPNAME} /usr/share/nginx/html

EXPOSE 8080
USER ${USERNAME}
ENTRYPOINT [ "/entrypoint.sh" ]
