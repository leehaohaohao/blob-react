/**
 * @description 页脚
 * @author lihao
 * @date 2024/12/10 23:45
 */
import './footer.css'
const Footer = () => {
  return (
      <footer className="footer">
          <div className="footer-container">
              <div className="footer-copy">© 2024-2025 lihao个人所属</div>
              <div className="footer-links">
                  <div className="footer-column">
                      <a href="https://github.com/leehaohaohao" target="_blank" rel="noreferrer">GitHub个人主页</a>
                      <a href="https://github.com/leehaohaohao/blob-react" target="_blank"
                         rel="noreferrer">前端项目仓库地址</a>
                      <a href="https://github.com/leehaohaohao/blob" target="_blank"
                         rel="noreferrer">后端项目仓库地址</a>
                  </div>
                  <div className="footer-column">
                      <p className="email">联系邮箱：805459342@qq.com</p>
                  </div>
              </div>
          </div>
      </footer>
  )
}
export default Footer