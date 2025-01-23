import React from 'react';
import importAll from '../assets/units/importImages';

const serviceImages = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));

const ServiceScope = () => {
  return (
    <div className="service-scope-section">
      <div className="container">
        <h2>項目收費</h2>
        <div className="service-content">
          <div className="service-info">
            <h3>處方配藥</h3>
            <p>一般中草藥（每劑）：HK$98</p>
            <p>濃縮中藥粉（每劑）：HK$90（起）</p>
            <p>貴重藥材依據市場價格調整</p>
            <h3>說明</h3>
            <ul>
              <li>一般專業理療推拿建議10次為一個療程！（優惠價是350 元/次）</li>
              <li>所有服務必須先預約！門診時間為星期一至六：9.30-19.30，午飯時間段13:00-14:00</li>
            </ul>
          </div>
          <div className="service-table">
            <h3>專科針灸及骨傷收費表</h3>
            <table>
              <thead>
                <tr>
                  <th>治療項目</th>
                  <th>費用（HK$）</th>
                  <th>會員診金（HK$）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>中醫門診普通科</td>
                  <td>120</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>專科門診（皮膚科、腫瘤科、婦科）</td>
                  <td>180</td>
                  <td>150</td>
                </tr>
                <tr>
                  <td>專業針灸專科</td>
                  <td>380</td>
                  <td>350</td>
                </tr>
                <tr>
                  <td>專業骨傷專科</td>
                  <td>450</td>
                  <td>398</td>
                </tr>
                <tr>
                  <td>專業經絡理療推拿（45分鐘）</td>
                  <td>400</td>
                  <td>350</td>
                </tr>
                <tr>
                  <td>專業刮痧或拔罐</td>
                  <td>180</td>
                  <td>150</td>
                </tr>
                <tr>
                  <td>跌打骨傷敷藥</td>
                  <td>120</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>艾灸溫灸治療（30分鐘）</td>
                  <td>120</td>
                  <td>100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tp-banner">
            <img src={serviceImages['Banner1-1200x500.png']} alt="中藥產品" />
        </div>
      </div>

      <div className="container">
        <h2 className="service-title">服務範圍</h2>
        <div className="service-content">
            <div class="bg">
                <div className="service-info">
                    <div className="service-item">
                    <h3>01</h3>
                    <p>全科內外婦兒、針灸、骨傷科 及 理療推拿、刮痧拔罐！（專業理療師）</p>
                    </div>
                    <div className="service-item">
                    <h3>02</h3>
                    <p>提供兩大品牌濃縮藥粉，即沖即飲，方便快捷！（農本方及海天濃縮中藥）</p>
                    </div>
                    <div className="service-item">
                    <h3>03</h3>
                    <p>提供GMP優質中藥材及健康保健產品</p>
                    </div>
                    <div className="service-item">
                    <h3>04</h3>
                    <p>品牌德國科技藥師堂針灸針</p>
                    </div>
                    <div className="service-item">
                    <h3>05</h3>
                    <p>代客訂購歐美及加拿大等國的進口保健食品！</p>
                    </div>
                </div>
            </div>
          <div className="service-image">
            <img src={serviceImages['Acupuncture.png']} alt="Acupuncture" />
          </div>
        </div>
      </div>

        <div className="promotion-info-section">
            <div className="container">
                <h2 className="promotion-title">優惠資訊</h2>
                <div className="promotion-content">
                    <div className="promotion-image">
                        <img className="promotion-image-1" src={serviceImages['hoitin.png']} alt="優惠產品" />
                        <img className="promotion-image-2" src={serviceImages['purapharm.png']} alt="優惠產品" />
                    </div>
                    <div className="promotion-details">
                        <ul>
                        <li>1）海天中成藥、農本方中成藥，買三瓶享八折優惠！</li>
                        <li>2）預約上門取貨，可獲中醫診症電子券乙張，價值$100元！</li>
                        <li>3）享受藥師堂專業檢測心臟動脈硬化度乙次，可即取報告(原價500 元 / 次)</li>
                        <li>4）購買折實後滿600 元，可提供免費郵寄服務！</li>
                        </ul>
                        <p>敬請預約，優惠服務熱線：</p>
                        <p>27719951 / 27841188 / 9201 6255</p>
                        <a href="./products" className="purchase-button">購買產品</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    
  );
};

export default ServiceScope;
