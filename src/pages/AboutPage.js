import React from 'react';

const AboutPage = () => {
  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5">
          <div className="col-lg-12 mb-5">
            <div className="contact-box">
              <div className="contact-info-left">
                <h3 className="contact-title">諮詢服務</h3>
                <p className="contact-description">有疑問或症狀歡迎諮詢</p>
                <p className="contact-hours">
                  關診時間(敬請預約)：
                  <br />
                  星期一至五: 09:00am-18:30pm
                  <br />
                  <i className="fa fa-phone" /> 2771 9951 / 2771 9917
                </p>
              </div>
              <div className="contact-info-right">
                <div className="info-item">
                  <i className="fa fa-envelope" /> info@mocmhk.com
                </div>
                <div className="info-item">
                  <i className="fa fa-whatsapp" /> 9201 6255  9221 5145
                </div>
                <div className="info-item">
                  <i className="fa fa-map-marker" /> 九龍旺角彌敦道521-523號建華大廈12樓C (港鐵油麻地站B1出口)
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
              <h4 className="text-center mb-4">請以電話與客服部聯絡</h4>
              <form class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="您的姓名"/>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="您的電話"/>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="您的電郵"/>
                  </div>
                </div>
                <div class="form-row">
                  <textarea class="form-control" placeholder="詳細資料"></textarea>
                </div>
                <div class="form-row">
                  <button type="submit" class="btn">發送</button>
                </div>
              </form>
          </div>
          <div className="col-lg-12">
            <h4 className="text-center">我們的位置</h4>
            <div className="map-container">
              <iframe
                title="location-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387.97748432156766!2d114.17037917110517!3d22.312637043399285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400c0e173d175%3A0xab74b4fdc698b8ce!2z6aaZ5riv5rK56bq75Zyw5b2M5pWm6YGTNTIxLTUyM-iZn-emruWfuuWkp-W7iA!5e0!3m2!1szh-TW!2s!4v1634639757976!5m2!1szh-TW!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
