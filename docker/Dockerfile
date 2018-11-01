FROM registry.cn-hangzhou.aliyuncs.com/season-dockers/fe-base:1.0.1 

ARG APP_ENV=dev
ARG APP_PORT=8080
ENV APP_ENV ${APP_ENV}
ENV APP_PORT ${APP_PORT}

COPY . /home/deploy/fe-server

RUN source /etc/profile \
    && cd /home/deploy/fe-server \
    && npm run install-deps

# CMD ["/bin/bash", "-c", "source /etc/profile && npm run deploy-${APP_ENV}"]

# 健康检查
# HEALTHCHECK --interval=30s --timeout=30s --retries=5 CMD curl -f http://localhost:${APP_PORT}/ || exit 1
