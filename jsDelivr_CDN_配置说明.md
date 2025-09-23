# jsDelivr CDN 配置说明

## 什么是jsDelivr CDN？

jsDelivr是一个免费、快速、可靠的开源CDN服务，专门为开源项目提供加速服务。它可以显著提升你的博客加载速度，特别是对于海外访问者。

## 配置方法

### 1. CDN基础配置

在 `_config.butterfly.yml` 文件中已配置：

```yaml
CDN:
  # 主题内部资源使用jsDelivr
  internal_provider: jsdelivr
  
  # 第三方资源使用jsDelivr  
  third_party_provider: jsdelivr
  
  # 启用版本号
  version: true
  
  option:
    # 当前博客仓库的jsDelivr CDN地址
    jsdelivr_url: https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/
```

### 2. 图片资源CDN配置

已配置的图片资源：

```yaml
# 网站图标
favicon: https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/source/img/favicon.png

# 头像
avatar:
  img: https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/source/img/index/avator.png

# 首页背景图
index_img: https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/source/img/index/ai.jpg

# 默认文章封面
default_top_img: https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/source/img/index/top_img.jpg

# 归档页面背景
archive_img: https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/source/img/index/industry.jpg

# 标签页面背景
tag_img: https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/source/img/index/industry.jpg
```

## jsDelivr CDN 地址格式

### GitHub仓库资源

```
https://cdn.jsdelivr.net/gh/用户名/仓库名@分支名/文件路径
```

**示例**：
- 原始地址：`/source/img/avatar.png`
- CDN地址：`https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/source/img/avatar.png`

### NPM包资源

```
https://cdn.jsdelivr.net/npm/包名@版本号/文件路径
```

**示例**：
- jQuery：`https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js`
- Bootstrap：`https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css`

## 使用优势

### ✅ 优点：
1. **免费使用**：完全免费的CDN服务
2. **全球加速**：遍布全球的CDN节点
3. **自动压缩**：自动压缩JS、CSS文件
4. **版本控制**：支持指定版本号
5. **高可用性**：99.9%的可用性保证
6. **无需注册**：直接使用，无需注册账号

### ⚠️ 注意事项：
1. **仓库必须公开**：jsDelivr只支持公开的GitHub仓库
2. **文件大小限制**：单个文件不能超过50MB
3. **缓存时间**：CDN有缓存，更新可能需要等待
4. **依赖GitHub**：依赖GitHub的稳定性

## 文章中使用CDN图片

在写文章时，也可以使用CDN加速图片：

### Markdown中使用：

```markdown
![图片描述](https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/source/images/文章图片.jpg)
```

### HTML中使用：

```html
<img src="https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/source/images/文章图片.jpg" alt="图片描述">
```

## 缓存更新

### 强制刷新缓存：

如果更新了文件但CDN还是旧版本，可以：

1. **等待自动更新**：通常24小时内会自动更新
2. **使用版本号**：在URL后添加版本参数
   ```
   https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@main/source/img/avatar.png?v=1.0.1
   ```
3. **使用提交哈希**：使用具体的commit hash代替分支名
   ```
   https://cdn.jsdelivr.net/gh/blog3944439/scharfsinnig.github.io@abc123def/source/img/avatar.png
   ```

## 性能监控

### 检查CDN效果：

1. **浏览器开发者工具**：
   - 按F12打开开发者工具
   - 查看Network标签
   - 刷新页面，查看资源加载时间

2. **在线测试工具**：
   - [GTmetrix](https://gtmetrix.com/)
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [Pingdom](https://tools.pingdom.com/)

## 故障排除

### 常见问题：

1. **图片不显示**：
   - 检查文件路径是否正确
   - 确认仓库是公开的
   - 检查文件是否存在

2. **加载缓慢**：
   - 可能是首次访问，CDN正在缓存
   - 尝试刷新页面

3. **样式异常**：
   - 检查CSS文件路径
   - 确认主题文件完整

## 最佳实践

### 建议：

1. **图片优化**：
   - 压缩图片大小
   - 使用WebP格式
   - 合理设置图片尺寸

2. **文件组织**：
   - 将静态资源放在统一目录
   - 使用有意义的文件名
   - 定期清理无用文件

3. **版本管理**：
   - 重要更新时使用新的commit hash
   - 为重要资源添加版本号
   - 保持文件结构稳定

## 配置完成后的效果

配置jsDelivr CDN后，你的博客将获得：

- ⚡ **更快的加载速度**：特别是图片和静态资源
- 🌍 **更好的全球访问体验**：海外用户访问更流畅
- 📱 **移动端优化**：移动设备访问速度提升
- 💰 **零成本**：完全免费的加速服务

## 验证配置

配置完成后，可以通过以下方式验证：

1. **查看页面源码**：检查资源链接是否指向jsDelivr
2. **开发者工具**：查看Network面板，确认资源从CDN加载
3. **访问速度**：对比配置前后的页面加载速度

---

**配置完成！** 🎉

你的博客现在已经使用jsDelivr CDN加速，访问速度将显著提升！
