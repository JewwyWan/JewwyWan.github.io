# 二维码图片占位说明

请将您的二维码图片放置在 `assets/` 目录下：

## 需要的图片文件：

| 文件名 | 说明 | 推荐尺寸 |
|--------|------|----------|
| `qr-wechat-work.png` | 企业微信二维码 | 300×300 px |
| `qr-wechat.png` | 微信二维码 | 300×300 px |
| `qr-whatsapp.jpg` | WhatsApp 联系二维码原图 | 913×1130 px |
| `qr-whatsapp-square.jpg` | 联系页展示用二维码裁切图 | 429×429 px |

## 图片要求：

- **格式**: PNG（支持透明背景）
- **尺寸**: 建议 300×300 像素或以上
- **背景**: 白色或透明背景
- **内容**: 清晰的二维码，可以包含 logo

## 放置位置：

```
assets/
├── qr-wechat-work.png    ← 企业微信
├── qr-wechat.png          ← 微信
├── qr-whatsapp.jpg        ← WhatsApp 原图
└── qr-whatsapp-square.jpg ← 联系页只显示二维码的裁切图
```

## 悬浮效果：

当用户鼠标悬浮在二维码卡片上时，会自动放大显示完整二维码。

图片未放置时，会显示默认的占位符图标。
