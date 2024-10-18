import React from "react";
import './index.css'
export default function GlobalFooter() {
  const currentYear:number = new Date().getFullYear()
  return (
    <div className="global-footer"
    
    >
      <div>© {currentYear} Made with love and Patience</div>
      <div>
      <a
              href="https://github.com/Mazhha666/interview-miao"
              target="_blank"
            >作者：miaomiao</a>
      </div>
    </div>
  );
}
