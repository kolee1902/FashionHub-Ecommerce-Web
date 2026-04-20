import React from 'react'
import "./FooterStyle.css"

export default function Footer() {
    return (
        <div id='footer'>
            <footer className="footer-99382">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 pr-md-5">
                            <a href="#" className="footer-site-logo d-block mb-4">Fashion Hub</a>
                            <p>Chào mừng bạn đến với Fashion Hub, nơi phong cách gặp gỡ với sự độc đáo và chất lượng. Khám phá bộ sưu tập đa dạng với những kiểu dáng thời thượng và bền vững. Tại Fashion Hub, chúng tôi cam kết đem đến trải nghiệm mua sắm chất lượng, nơi bạn không chỉ trông đẹp mà còn cảm thấy tự tin. Hãy ghé thăm cửa hàng chúng tôi để khám phá thế giới thời trang không giới hạn!</p>
                        </div>
                        <div className="col-md">
                            <h3>Cửa Hàng</h3>
                            <ul className="list-unstyled nav-links">
                                <li><a href="#">Giới thiệu về Fashion Hub</a></li>
                                <li><a href="#">Tuyển dụng</a></li>
                                <li><a href="#">Tin thời trang</a></li>
                                <li><a href="#">Hợp tác nhượng quyền</a></li>
                                <li><a href="#">Liên hệ</a></li>
                            </ul>
                        </div>
                        <div className="col-md">
                            <h3>Chính Sách Khách Hàng</h3>
                            <ul className="list-unstyled nav-links">
                                <li><a href="#">Chính sách khách hàng thân thiết</a></li>
                                <li><a href="#">Chính sách đổi trả</a></li>
                                <li><a href="#">Chính sách bảo hành</a></li>
                                <li><a href="#">Chính sách bảo mật</a></li>
                                <li><a href="#">Câu hỏi thường gặp</a></li>
                                <li><a href="#">Hướng dẫn mua hàng online</a></li>
                                <li><a href="#">Hướng dẫn kiểm tra hạng thẻ thành viên</a></li>
                            </ul>
                        </div>
                        <div className="col-md">
                            <h3>Thông tin của hàng</h3>
                            <ul className="list-unstyled nav-links">
                                <li><a href="#">Chi nhánh cửa hàng</a></li>
                            </ul>
                        </div>
                        <div className="col-md">
                            <h3>Kết nối với chúng tôi</h3>
                            <ul className="social list-unstyled">
                                <li><a href="#" className="pl-0"><span className="icon-instagram" /></a></li>
                                <li><a href="#"><span className="icon-twitter" /></a></li>
                                <li><a href="#"><span className="icon-facebook" /></a></li>
                                <li><a href="#"><span className="icon-pinterest" /></a></li>
                                <li><a href="#"><span className="icon-dribbble" /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-12 text-center">
                            <div className="copyright mt-5 pt-5">
                                <p><small>© 2019—2020 All Rights Reserved.</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
