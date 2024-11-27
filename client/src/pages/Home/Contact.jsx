import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const spacing = 10; // or any other value you want

  const customStyle = {
    marginRight: spacing + "em",
    // add more style properties as needed
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const selectedPhongBan = form.current.user_room.value;
    if (selectedPhongBan === "CHỌN") {
      alert("Vui lòng chọn phòng ban");
      return;
    }
    emailjs
      .sendForm(
        "service_qaduav1",
        "template_ah70g2e",
        form.current,
        "YijKHUKQ0Q1KnyEZ3"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          alert("Đã gửi thành công");
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className="contact-container">
      <div className="map" style={customStyle}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.520072541713!2d106.78408977600638!3d10.847992257867718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2sPosts%20and%20Telecommunications%20Institute%20of%20Technology%20HCM%20Branch!5e0!3m2!1sen!2s!4v1704183751716!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="contact-infor">
        <div className="contact-left">
          <h1>Liên hệ</h1>
          <span>Hãy nhập form dưới đây để liên hệ với chúng tôi!</span>
          <form className="form-contact" ref={form} onSubmit={sendEmail}>
            <label>Họ Tên</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Số Điện Thoại</label>
            <input type="text" name="user_phone" />
            <label for="user_room">Phòng Ban</label>
            <select name="user_room" id="user_room">
              <option value="CHỌN">Chọn Phòng Ban</option>
              <option value="PHÒNG GIÁO VỤ">PHÒNG GIÁO VỤ</option>
              <option value="PHÒNG KINH TẾ TÀI CHÍNH">
                PHÒNG KINH TẾ TÀI CHÍNH
              </option>
            </select>

            <label>Nội Dung Liên Hệ</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
          </form>
        </div>
        <div className="contact-right">
          <div className="title-contact">
            TỔNG ĐÀI KÝ TÚC XÁ: 1900.055.559 DANH BẠ TRUNG TÂM QUẢN LÝ KÝ TÚC XÁ
            PTIT
          </div>
          <span className="title-table">Các số điện thoại khẩn cấp</span>
          <div className="table-contact">
            <table className="table" id="TableContact">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Tên đơn vị</th>
                  <th>Số nội bộ</th>
                  <th>Khu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Bảo vệ cổng chính</td>
                  <td>107</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Bảo vệ cổng phụ</td>
                  <td>108</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Bảo vệ cổng chính</td>
                  <td>109</td>
                  <td>Khu A</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Công an phường Đông Hòa</td>
                  <td>(0274) 3750872</td>
                  <td>Khu B</td>
                </tr>
              </tbody>
            </table>
            <span className="title-table">Ký túc xá - Khu A</span>
            <table className="table" id="TableContact">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Tên đơn vị</th>
                  <th>Số nội bộ</th>
                  <th>Khu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Bảo vệ cổng chính</td>
                  <td>109</td>
                  <td>Khu A</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Trạm y tế</td>
                  <td>119</td>
                  <td>Khu A</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Ban quản lý cụm nhà A.F</td>
                  <td>120</td>
                  <td>Khu A</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Ban quản lý cụm nhà A.G</td>
                  <td>121</td>
                  <td>Khu A</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Ban quản lý cụm nhà A.H</td>
                  <td>122</td>
                  <td>Khu A</td>
                </tr>
              </tbody>
            </table>
            <span className="title-table">Ký túc xá - Khu B</span>
            <table className="table" id="TableContact">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Tên đơn vị</th>
                  <th>Số nội bộ</th>
                  <th>Khu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Giám đốc Tăng Hữu Thủy</td>
                  <td>100</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Phó Giám đốc Ngô Văn Hải</td>
                  <td>102</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Phó Giám đốc Phùng Thị Hương Lan</td>
                  <td>103</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Phó Giám đốc Dương Văn Tuấn</td>
                  <td>104</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Phòng Công tác sinh viên</td>
                  <td>105</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Phòng An ninh</td>
                  <td>106</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Bảo vệ cổng chính</td>
                  <td>107</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Bảo vệ cổng phụ</td>
                  <td>108</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Phòng Quản trị thiết bị</td>
                  <td>110</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Phòng Tổng hợp</td>
                  <td>111</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Phòng Kế hoạch - tài chính</td>
                  <td>112</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Phòng Dịch vụ - dự án</td>
                  <td>113</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>Phòng CNTT-DL(Hỗ trợ kỹ thuật mạng - phần cứng)</td>
                  <td>114</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>Phòng CNTT-DL (Hỗ trợ kỹ thuật phần mềm)</td>
                  <td>115</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Trạm y tế (Văn phòng B1)</td>
                  <td>116</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>Trạm y tế (Hỗ trợ sức khỏe tinh thần B1)</td>
                  <td>117</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>17</td>
                  <td>Trạm y tế (Phòng khám B1)</td>
                  <td>118</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>18</td>
                  <td>Ban quản lý cụm nhà B.A</td>
                  <td>123</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>19</td>
                  <td>Ban quản lý cụm nhà B.B</td>
                  <td>124</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>Ban quản lý cụm nhà B.C</td>
                  <td>125</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>21</td>
                  <td>Ban quản lý cụm nhà B.D</td>
                  <td>126</td>
                  <td>Khu B</td>
                </tr>
                <tr>
                  <td>22</td>
                  <td>Ban quản lý cụm nhà B.E</td>
                  <td>127</td>
                  <td>Khu B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
