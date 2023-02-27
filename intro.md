1. 创建项目

   ```shell
   $ npm i -g @nestjs/cli
   $ nest new <project-name> && cd <project-name> && code .
   ```

2. 安装依赖

   ```shell
   $ npm i @nestjs/swagger swagger-ui-express @nestjs/config @nestjs/axios @nestjs/passport passport @nestjs/jwt passport-jwt class-transformer class-validator @nestjs/mongoose mongoose ioredis dayjs uuid helmet express-rate-limit ali-oss
   ```

   ```shell
   $ npm i @types/mongoose @types/passport-jwt cross-env --save-dev
   ```

3. 复制文件

   - **`src/common`：**公共文件
   
   - **`src/configs`**：环境变量配置文件（*提示：根据需要修改，如数据库地址*）
   
   - **`src/core`**：核心文件，封装了内置的拦截器、管道、自定装饰器等

   - **`src/database`**：数据库操作相关文件（*提示：根据需要修改Schemas*）
   
     > **Tips：**根据shared目录保留数据库对应的Schemas文件
   
   - **`src/shared`**：页面相关
   
     - **`index.js`**：模块统一导出
     - **`/address`**：收货地址管理（*项目可复用模块*）
     - **`/administrators`**：系统管理员（*项目可复用模块*）
     - **`/auth`**：登录授权（*项目可复用模块*）
     - **`/banners`**：轮播图管理（*项目可复用模块*）
     - **`/configs`**：配置管理（*项目可复用模块*）
     - **`/feedback`**：反馈建议（*项目可复用模块*）
     - **`/systems`**：系统管理，包括权限和角色管理（*项目可复用模块*）
     - **`/upload`**：文件上传（*项目可复用模块*）（*提示：需修改阿里云/又拍云账户信息*）
     - **`/users`**：用户模块（*项目可复用模块*）
     
   - **`src/swagger`**：API 接口文档（*提示：根据需要修改*）
   
   - **`src/utils`**：工具文件
   
   - **`main.ts`**：入口文件（*提示：根据需要修改*）
   
   - **`app.module.ts`**：根模块（*提示：根据需要修改*）
   
4. 修改 **`pakcage.json`** 文件

   ```json
   {
     "start:dev": "cross-env NODE_ENV=development nest start --watch",
   	"start:prod": "cross-env NODE_ENV=production node dist/main"
   }
   ```

5. 特别提示
   - 运行项目之前先根据需求更改相关文件
   - 启动mongodb服务，在 **`src/configs/env/xxx`** 中更改mongo-uri.