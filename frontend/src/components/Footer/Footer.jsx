import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='Footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img className='logo' src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, amet ut? Sunt dolore minus quibusdam labore vitae alias maiores laudantium facere hic obcaecati temporibus quaerat ea fugit, rerum nam quas?</p>
          <div className="footer-social-icons">
            <img src={assets.facebook} alt="" />
            <img src={assets.instagram} alt="" />
            <img src={assets.linkedin} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+91 9123456781</li>
                <li>contactgoodfood@gmail.com</li>
              </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 GoodFood.com - All Right Reserved</p>
      
    </div>
  )
}

export default Footer
