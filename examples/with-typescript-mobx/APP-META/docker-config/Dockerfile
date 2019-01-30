FROM reg.docker.alibaba-inc.com/aone-base-global/alios7-nodejs:1.0

# 定义应用名 
ENV APP_NAME=runkit

# 指定应用次级入口脚本，纯 Node.js 应用为 nodejsctl，Java + Node.js 应用为 appctl.sh
ENV SCRIPT_ENTRY=nodejsctl

# 复制应用自身维护的 nginx 配置
COPY environment/${APP_NAME}.conf /home/admin/cai/conf/apps/${APP_NAME}.conf

# 复制应用主入口脚本
RUN mv /home/admin/appname/bin/start.sh /home/admin/

VOLUME /home/admin/logs /home/admin/cai/logs /home/admin/${APP_NAME}/logs
WORKDIR /home/admin/${APP_NAME}/bin

# 指定应用主入口
ENTRYPOINT ["/home/admin/start.sh"]

# 复制应用主包到目标目录
COPY ${APP_NAME}.tgz /home/admin/${APP_NAME}/target/${APP_NAME}.tgz