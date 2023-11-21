import React from "react";

export default function Footer() {
  return (
  <div className="Footer">
    <div className="footer-topbtn-wrapper">
    <button>Terms of Use</button>
    <button>Privacy-Policy</button>
    <button>About</button>
    <button>Blog</button>
    <button>FAQ</button>
    </div>

<div className="footer-text">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    </div>

<div className="footer-social-wrapper">
    <button><img className="footer-social-icon" src="images/facebook-white.png" alt=""/></button>
    <button><img className="footer-social-icon" src="images/instagramwhite.png" alt=""/></button>
    <button><img className="footer-social-icon" src="images/twitter-white.png" alt=""/></button>
    <button><img className="footer-social-icon" src="images/linkedin-128.png" alt=""/></button>
  </div>

  
  </div>
  
  );
}
