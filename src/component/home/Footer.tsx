/**
 * @description 页脚
 * @author lihao
 * @date 2024/12/10 23:45
 */
import './footer.css'
const Footer = () => {
  return (
      <footer className="footer">
        <div className={'footer-container'}>
          <p>©2024-2025 lihao个人所属</p>
          <div className={'contact'}>
            <a href={'https://github.com/leehaohaohao'} target={'_blank'}>GitHub个人主页</a>
            <a href={'https://github.com/leehaohaohao/blob-react'} target={'_blank'}>GitHub此项目仓库地址</a>
            <p>联系邮箱：805459342@qq.com</p>
          </div>
        </div>
      </footer>

  )
}
export default Footer