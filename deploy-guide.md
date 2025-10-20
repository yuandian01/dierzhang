# GitHub部署指南

## 手动部署到GitHub Pages

### 步骤1：在GitHub创建仓库
1. 访问 https://github.com/yuandian01/dierzhang
2. 如果仓库不存在，点击"New repository"创建新仓库
3. 仓库名：`dierzhang`
4. 选择公开(Public)
5. 勾选"Add a README file"

### 步骤2：上传文件到GitHub
1. 在GitHub仓库页面，点击"Add file" → "Upload files"
2. 将以下文件拖拽到上传区域：
   - `index.html`
   - `charts.js`
   - `README.md`
3. 添加提交信息："添加第2章数据可视化界面"
4. 点击"Commit changes"

### 步骤3：启用GitHub Pages
1. 进入仓库的"Settings"选项卡
2. 在左侧菜单找到"Pages"
3. 在"Source"部分选择"Deploy from a branch"
4. 分支选择"main"，文件夹选择"/ (root)"
5. 点击"Save"

### 步骤4：访问网站
部署完成后，您的网站将可以通过以下地址访问：
```
https://yuandian01.github.io/dierzhang/
```

## 文件说明

- `index.html` - 主页面，包含所有HTML结构和样式
- `charts.js` - JavaScript图表逻辑和交互功能
- `README.md` - 项目说明文档

## 功能特性

✅ 6种交互式图表（2.1至2.6章节）
✅ 响应式设计，支持移动端
✅ 实时数据更新和参数调整
✅ 现代化UI界面

## 注意事项

- 部署后可能需要几分钟才能生效
- 确保所有文件都在仓库根目录
- 如果遇到问题，检查浏览器控制台错误信息