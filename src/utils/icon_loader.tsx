"use client";
import { useEffect } from "react";
const IconFontLoader: React.FC = () => {
  useEffect(() => {
    // 确保 iconfont.js 文件在客户端加载
    const script = document.createElement("script");
    script.src = "/iconfont.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default IconFontLoader;
