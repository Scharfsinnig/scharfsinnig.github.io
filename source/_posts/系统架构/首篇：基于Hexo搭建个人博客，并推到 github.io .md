---
title: 零基础搭建Hexo+Butterfly个人博客完整教程
date: 2022-07-15 10:00:00
updated: 2024-12-22 15:00:00
categories:
  - 系统架构
tags:
  - Hexo
  - Butterfly
  - 博客搭建
  - 技术记录
  - 零基础教程
  - GitHub Pages
abbrlink: 36025
cover: https://cdn.jsdelivr.net/gh/Scharfsinnig/scharfsinnig.github.io@main/source/images/hexo-tutorial/hexo-cover.jpg
description: 从零开始搭建Hexo+Butterfly主题的个人博客，包含环境搭建、主题配置、部署到GitHub Pages的完整流程，小白也能轻松上手
---
## 前言：为什么选择Hexo+Butterfly？

欢迎来到这个完整的博客搭建教程！如果你是一个完全的小白，不用担心，这篇教程会手把手教你从零开始搭建一个漂亮的个人博客。

### 为什么选择Hexo？

**Hexo** 是一个快速、简洁且高效的博客框架，具有以下优势：

- ✅ **静态网站**：生成的是静态HTML文件，访问速度快
- ✅ **免费托管**：可以免费部署到GitHub Pages
- ✅ **Markdown支持**：用Markdown写文章，简单易学
- ✅ **主题丰富**：有大量精美的主题可选择
- ✅ **插件生态**：丰富的插件扩展功能

### 为什么选择Butterfly主题？

**Butterfly** 是目前最受欢迎的Hexo主题之一：

- 🎨 **界面美观**：现代化的卡片式设计
- 📱 **响应式布局**：完美适配手机和电脑
- ⚡ **功能丰富**：评论、搜索、统计等功能齐全
- 🛠️ **易于配置**：详细的配置文档
- 🔧 **持续更新**：活跃的社区维护

### 最终效果预览

完成本教程后，你将拥有：
- 一个部署在GitHub Pages上的个人博客
- 美观的Butterfly主题界面
- 完整的文章管理系统
- 自动化的部署流程

![Hexo博客效果图](/images/hexo-tutorial/hexo-cover.jpg)

## 第一步：环境准备

### 1.1 安装Node.js

Node.js是运行Hexo的基础环境。

#### Windows用户：

1. 访问 [Node.js官网](https://nodejs.org/)
2. 下载LTS版本（推荐版本）
3. 双击安装包，一路点击"下一步"即可

#### macOS用户：

**方法一：官网下载**
1. 访问 [Node.js官网](https://nodejs.org/)
2. 下载macOS版本
3. 双击.pkg文件安装

**方法二：使用Homebrew（推荐）**
```bash
# 如果没有Homebrew，先安装Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装Node.js
brew install node
```

#### 验证安装

打开终端（Windows用户打开命令提示符），输入以下命令：

```bash
node --version
npm --version
```

如果显示版本号，说明安装成功。

![Node.js安装](/images/hexo-tutorial/nodejs-install.jpg)

### 1.2 安装Git

Git用于版本控制和代码管理。

#### Windows用户：

1. 访问 [Git官网](https://git-scm.com/)
2. 下载Windows版本
3. 安装时保持默认设置即可

#### macOS用户：

**方法一：官网下载**
1. 访问 [Git官网](https://git-scm.com/)
2. 下载macOS版本

**方法二：使用Homebrew**
```bash
brew install git
```

#### 验证安装

```bash
git --version
```

![Git安装](/images/hexo-tutorial/git-setup.jpg)

### 1.3 注册GitHub账号

1. 访问 [GitHub官网](https://github.com/)
2. 点击"Sign up"注册账号
3. 验证邮箱地址

## 第二步：安装和配置Hexo

### 2.1 全局安装Hexo

打开终端，执行以下命令：

```bash
npm install -g hexo-cli
```

**注意**：
- Windows用户如果遇到权限问题，请以管理员身份运行命令提示符
- macOS用户如果遇到权限问题，在命令前加上`sudo`

### 2.2 验证Hexo安装

```bash
hexo --version
```

如果显示版本信息，说明安装成功。

### 2.3 创建博客项目

选择一个你想要存放博客的文件夹，然后执行：

```bash
# 创建博客项目（将my-blog替换为你想要的项目名）
hexo init my-blog

# 进入项目目录
cd my-blog

# 安装依赖
npm install
```

### 2.4 启动本地服务器

```bash
hexo server
```

或者简写：

```bash
hexo s
```

然后在浏览器中访问 `http://localhost:4000`，你应该能看到默认的Hexo博客界面。

**恭喜！你的第一个Hexo博客已经运行起来了！**

## 第三步：安装和配置Butterfly主题

### 3.1 下载Butterfly主题

在博客根目录下执行：

```bash
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

### 3.2 安装主题依赖

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

### 3.3 修改主题配置

编辑博客根目录下的 `_config.yml` 文件，找到 `theme` 配置项：

```yaml
# 将这一行
theme: landscape

# 改为
theme: butterfly
```

### 3.4 创建主题配置文件

在博客根目录下创建 `_config.butterfly.yml` 文件：

```bash
# Windows用户
copy themes\butterfly\_config.yml _config.butterfly.yml

# macOS/Linux用户
cp themes/butterfly/_config.yml _config.butterfly.yml
```

### 3.5 重启服务器查看效果

```bash
# 停止当前服务器（Ctrl+C）
# 清理缓存
hexo clean

# 重新生成
hexo generate

# 启动服务器
hexo server
```

现在访问 `http://localhost:4000`，你应该能看到美观的Butterfly主题界面！

![Butterfly主题效果](/images/hexo-tutorial/butterfly-theme.jpg)

## 第四步：基础配置

### 4.1 修改网站基本信息

编辑根目录下的 `_config.yml` 文件：

```yaml
# Site
title: 你的博客名称
subtitle: '副标题'
description: '博客描述'
keywords: 关键词1,关键词2,关键词3
author: 你的名字
language: zh-CN
timezone: 'Asia/Shanghai'

# URL
url: https://你的用户名.github.io
root: /
permalink: :year/:month/:day/:title/
```

### 4.2 配置Butterfly主题

编辑 `_config.butterfly.yml` 文件，以下是一些基础配置：

```yaml
# 导航菜单
menu:
  首页: / || fas fa-home
  时间轴: /archives/ || fas fa-archive
  标签: /tags/ || fas fa-tags
  分类: /categories/ || fas fa-folder-open
  清单||fas fa-list:
    音乐: /music/ || fas fa-music
    照片: /Gallery/ || fas fa-images
    电影: /movies/ || fas fa-video
  友链: /link/ || fas fa-link
  关于: /about/ || fas fa-heart

# 代码块设置
highlight_theme: light #  darker / pale night / light / ocean / mac / mac light / false
highlight_copy: true # 复制按钮
highlight_lang: true # 显示代码语言
highlight_shrink: false # 代码框不折叠

# 社交图标
social:
  fab fa-github: https://github.com/你的用户名 || Github
  fas fa-envelope: mailto:你的邮箱 || Email

# 头像
avatar:
  img: /img/avatar.png
  effect: false

# 网站图标
favicon: /img/favicon.png

# 首页顶部图
index_img: /img/bg.jpg

# 默认文章封面
default_top_img: /img/default_bg.jpg

# 页脚设置
footer:
  owner:
    enable: true
    since: 2022
  custom_text:
  copyright: true
```

### 4.3 创建必要的页面

#### 创建标签页面

```bash
hexo new page tags
```

编辑 `source/tags/index.md`：

```markdown
---
title: 标签
date: 2022-07-15 12:00:00
type: "tags"
---
```

#### 创建分类页面

```bash
hexo new page categories
```

编辑 `source/categories/index.md`：

```markdown
---
title: 分类
date: 2022-07-15 12:00:00
type: "categories"
---
```

#### 创建关于页面

```bash
hexo new page about
```

编辑 `source/about/index.md`：

```markdown
---
title: 关于
date: 2022-07-15 12:00:00
type: "about"
---

## 关于我

这里写你的个人介绍...

## 关于博客

这里写博客的介绍...
```

## 第五步：写你的第一篇文章

### 5.1 创建新文章

```bash
hexo new "我的第一篇博客"
```

这会在 `source/_posts/` 目录下创建一个新的Markdown文件。

### 5.2 编辑文章

打开生成的文件，你会看到类似这样的内容：

```markdown
---
title: 我的第一篇博客
date: 2022-07-15 14:00:00
tags:
---

这里开始写你的文章内容...
```

你可以添加更多的front matter配置：

```markdown
---
title: 我的第一篇博客
date: 2022-07-15 14:00:00
categories:
  - 生活随笔
tags:
  - 第一篇
  - 测试
cover: /img/post_cover.jpg
description: 这是我的第一篇博客文章
---

## 标题一

这里是正文内容...

### 子标题

- 列表项1
- 列表项2

**粗体文字**

*斜体文字*

[链接文字](https://example.com)

![图片描述](/img/example.jpg)
```

### 5.3 预览文章

保存文件后，在浏览器中刷新 `http://localhost:4000`，你应该能看到新文章出现在首页。

## 第六步：部署到GitHub Pages

### 6.1 创建GitHub仓库

1. 登录GitHub
2. 点击右上角的"+"号，选择"New repository"
3. 仓库名必须是：`你的用户名.github.io`（例如：`zhangsan.github.io`）
4. 设置为Public
5. 点击"Create repository"

### 6.2 配置Git

如果是第一次使用Git，需要配置用户信息：

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

### 6.3 安装部署插件

```bash
npm install hexo-deployer-git --save
```

### 6.4 配置部署设置

编辑 `_config.yml` 文件，在最后添加：

```yaml
# Deployment
deploy:
  type: git
  repo: https://github.com/你的用户名/你的用户名.github.io.git
  branch: main
```

### 6.5 部署博客

```bash
# 清理
hexo clean

# 生成静态文件
hexo generate

# 部署
hexo deploy
```

或者使用简写命令：

```bash
hexo clean && hexo g -d
```

第一次部署时，可能需要输入GitHub的用户名和密码（或Personal Access Token）。

### 6.6 访问你的博客

部署成功后，等待几分钟，然后访问：`https://你的用户名.github.io`

**恭喜！你的博客已经成功部署到互联网上了！**

## 第七步：常用命令和日常使用

### 7.1 Hexo常用命令

```bash
# 创建新文章
hexo new "文章标题"

# 创建新页面
hexo new page "页面名称"

# 启动本地服务器
hexo server
# 或简写
hexo s

# 生成静态文件
hexo generate
# 或简写
hexo g

# 部署到远程
hexo deploy
# 或简写
hexo d

# 清理缓存和生成的文件
hexo clean

# 一键生成并部署
hexo g -d
```

### 7.2 日常写作流程

1. **创建新文章**：
   ```bash
   hexo new "文章标题"
   ```

2. **编辑文章**：
   - 打开 `source/_posts/文章标题.md`
   - 使用Markdown语法编写内容

3. **本地预览**：
   ```bash
   hexo s
   ```
   在浏览器中访问 `http://localhost:4000` 预览效果

4. **发布文章**：
   ```bash
   hexo clean && hexo g -d
   ```

### 7.3 Markdown语法快速参考

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文字**
*斜体文字*
~~删除线~~

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2

[链接文字](https://example.com)

![图片描述](/img/example.jpg)

`行内代码`

```代码块
console.log("Hello World");
```

> 引用文字

| 表格标题1 | 表格标题2 |
|----------|----------|
| 内容1    | 内容2    |
```

## 第八步：进阶配置和优化

### 8.1 添加评论系统

编辑 `_config.butterfly.yml`：

```yaml
# 评论系统 - 选择一个即可
comments:
  # Disqus
  use: Disqus
  text: true
  lazyload: false
  count: false
  card_post_count: false

disqus:
  shortname: 你的disqus用户名
```

### 8.2 添加搜索功能

安装搜索插件：

```bash
npm install hexo-generator-search --save
```

在 `_config.yml` 中添加：

```yaml
search:
  path: search.xml
  field: post
  content: true
```

在 `_config.butterfly.yml` 中启用：

```yaml
local_search:
  enable: true
  preload: false
  CDN:
```

### 8.3 添加网站统计

#### Google Analytics

在 `_config.butterfly.yml` 中配置：

```yaml
google_analytics: 你的GA跟踪ID
```

#### 百度统计

```yaml
baidu_analytics: 你的百度统计ID
```

### 8.4 SEO优化

安装SEO插件：

```bash
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
```

在 `_config.yml` 中添加：

```yaml
sitemap:
  path: sitemap.xml
baidusitemap:
  path: baidusitemap.xml
```

### 8.5 图片优化

建议使用图床服务：
- **免费选择**：GitHub + jsDelivr CDN
- **付费选择**：七牛云、阿里云OSS
- **国外选择**：Cloudinary、Imgur

## 第九步：常见问题解决

### 9.1 部署失败

**问题**：`hexo deploy` 失败

**解决方案**：
1. 检查GitHub仓库名是否正确
2. 检查 `_config.yml` 中的deploy配置
3. 确认Git用户信息配置正确
4. 尝试使用Personal Access Token代替密码

### 9.2 主题样式异常

**问题**：主题显示不正常

**解决方案**：
```bash
hexo clean
npm install
hexo g
hexo s
```

### 9.3 文章不显示

**问题**：新文章不在首页显示

**解决方案**：
1. 检查文章的front matter格式
2. 确认date格式正确
3. 检查文章是否设置了 `draft: true`

### 9.4 图片不显示

**问题**：文章中的图片无法显示

**解决方案**：
1. 确认图片路径正确
2. 图片放在 `source/images/` 目录下
3. 使用相对路径：`/images/图片名.jpg`

## 第十步：备份和版本控制

### 10.1 源码备份

建议创建一个私有仓库备份源码：

```bash
# 初始化Git仓库
git init

# 添加远程仓库（创建一个新的私有仓库）
git remote add origin https://github.com/你的用户名/blog-source.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送到远程
git push -u origin main
```

### 10.2 .gitignore配置

创建 `.gitignore` 文件：

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```

## 结语：开始你的博客之旅

恭喜你！通过这个教程，你已经成功搭建了一个功能完整的个人博客。现在你可以：

### ✅ 你已经掌握的技能：
- Hexo博客框架的基本使用
- Butterfly主题的配置
- Markdown语法写作
- Git版本控制
- GitHub Pages部署

### 🚀 接下来你可以：
- 定期写作，分享你的想法和经验
- 学习更多Markdown语法和写作技巧
- 探索更多Hexo插件和主题定制
- 优化SEO，让更多人发现你的博客
- 加入博客社区，与其他博主交流

### 📚 推荐资源：
- [Hexo官方文档](https://hexo.io/zh-cn/docs/)
- [Butterfly主题文档](https://butterfly.js.org/)
- [Markdown语法指南](https://markdown.com.cn/)
- [GitHub Pages文档](https://docs.github.com/cn/pages)

### 💡 写作建议：
1. **保持更新**：定期发布新内容
2. **内容质量**：注重文章的深度和价值
3. **SEO优化**：合理使用标题、标签和描述
4. **读者互动**：回复评论，建立社区
5. **持续学习**：跟上技术发展，不断改进博客

记住，博客不仅仅是一个展示平台，更是你思考和成长的记录。每一篇文章都是你知识和经验的积累。

**开始写作吧，让世界听到你的声音！** ✨

---

## 附录：快速参考

### 常用命令速查表

| 命令 | 作用 | 简写 |
|------|------|------|
| `hexo new "title"` | 创建新文章 | - |
| `hexo new page "name"` | 创建新页面 | - |
| `hexo server` | 启动本地服务器 | `hexo s` |
| `hexo generate` | 生成静态文件 | `hexo g` |
| `hexo deploy` | 部署到远程 | `hexo d` |
| `hexo clean` | 清理缓存 | - |
| `hexo g -d` | 生成并部署 | - |

### 文章Front Matter模板

```yaml
---
title: 文章标题
date: 2022-07-15 14:00:00
updated: 2022-07-15 15:00:00
categories:
  - 分类名
tags:
  - 标签1
  - 标签2
cover: /images/cover.jpg
description: 文章描述
keywords: 关键词1,关键词2
top_img: /images/top.jpg
comments: true
toc: true
---
```

### 目录结构说明

```
blog/
├── _config.yml          # 站点配置文件
├── _config.butterfly.yml # 主题配置文件
├── package.json         # 依赖包信息
├── scaffolds/           # 模板文件夹
├── source/              # 资源文件夹
│   ├── _posts/          # 文章目录
│   ├── images/          # 图片目录
│   └── about/           # 关于页面
├── themes/              # 主题文件夹
│   └── butterfly/       # Butterfly主题
└── public/              # 生成的静态文件（部署时生成）
```

**祝你博客之旅愉快！** 🎉
## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` Rust
fn main() { 
    println!("Hello world!");
}

fn main() { 
    println!("Hello world!");
}

fn main() { 
    println!("Hello world!");
}

fn main() { 
    println!("Hello world!");
}
```

## mermaid 图

{% mermaid %}
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
{% endmermaid %}


## Tab markdown
{% tabs test4 %}
<!-- tab 第一個Tab -->
**tab名字為第一個Tab**
<!-- endtab -->

<!-- tab @fab fa-apple-pay -->
**只有圖標 沒有Tab名字**
<!-- endtab -->

<!-- tab 炸彈@fas fa-bomb -->
**名字+icon**
<!-- endtab -->
{% endtabs %}


## Button 信息
```
{% btn [url],[text],[icon],[color] [style] [layout] [position] [size] %}

[url]         : 鏈接
[text]        : 按鈕文字
[icon]        : [可選] 圖標
[color]       : [可選] 按鈕背景顔色(默認style時）
                      按鈕字體和邊框顔色(outline時)
                      default/blue/pink/red/purple/orange/green
[style]       : [可選] 按鈕樣式 默認實心
                      outline/留空
[layout]      : [可選] 按鈕佈局 默認為line
                      block/留空
[position]    : [可選] 按鈕位置 前提是設置了layout為block 默認為左邊
                      center/right/留空
[size]        : [可選] 按鈕大小
                      larger/留空
```
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}


More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)
