#!/bin/bash
# 部署脚本 - 自动部署前端应用到Nginx容器

# 定义变量
CONTAINER_NAME="blob-react"
NGINX_PORT="809"
LOCAL_DIST_DIR="/tools/blob/dist"
NGINX_CONF_DIR="/etc/nginx/conf.d"
CONTAINER_HTML_DIR="/usr/share/nginx/html"

# 1. 停止并移除现有容器（如果存在）
echo "正在停止并移除现有容器（如果存在）..."
docker stop $CONTAINER_NAME >/dev/null 2>&1
docker rm $CONTAINER_NAME >/dev/null 2>&1

# 2. 启动新的Nginx容器
echo "正在启动新的Nginx容器..."
docker run -d -p $NGINX_PORT:80 --name $CONTAINER_NAME nginx

# 检查容器是否启动成功
if [ $? -ne 0 ]; then
    echo "错误：容器启动失败！"
    exit 1
fi

# 3. 复制前端文件到容器
echo "正在复制前端文件到容器..."
docker cp $LOCAL_DIST_DIR/. $CONTAINER_NAME:$CONTAINER_HTML_DIR/

# 4. 配置Nginx
echo "正在配置Nginx..."
docker exec -i $CONTAINER_NAME bash -c "cat > $NGINX_CONF_DIR/default.conf" << 'EOF'
server {
    listen 80;
    server_name 121.40.154.188;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /courseware/ {
            proxy_pass http://121.40.154.188:9090;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
            add_header Access-Control-Allow-Headers "Origin, Content-Type, Accept, Authorization";
        }
}
EOF

# 5. 重启容器使配置生效
echo "正在重启容器使配置生效..."
docker restart $CONTAINER_NAME

echo ""
echo "部署完成！"
echo "应用已部署到：http://121.40.154.188:$NGINX_PORT"