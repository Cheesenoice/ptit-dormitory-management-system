// HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const roomsData = [
    {
      id: 1,
      title: "Phòng 12 sinh viên",
      mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg",
      image1:
        "https://vnuf.edu.vn/documents/4400543/9005923/ktx6.png?t=1538145156352",
      image2:
        "https://vnuf.edu.vn/documents/4400543/9005923/ktx6.png?t=1538145156352",
      price: "100,000đ / tháng",
    },
    {
      id: 2,
      title: "Phòng 10 sinh viên",
      mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg",
      image1:
        "https://ktx.humg.edu.vn/content/tintuc/PublishingImages/ktx-d3.2.jpg?RenditionID=1",
      image2:
        "https://ktx.humg.edu.vn/content/tintuc/PublishingImages/ktx-d3.2.jpg?RenditionID=1",
      price: "140,000đ / tháng",
    },
    {
      id: 3,
      title: "Phòng 8 sinh viên",
      mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong82.jpg",
      image1: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong81.jpg",
      image2: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong8.jpg",
      price: "180,000đ / tháng",
    },
    {
      id: 4,
      title: "Phòng 6 sinh viên",
      mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/phong6.jpg",
      image1: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong61.jpg",
      image2: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong62.jpg",
      price: "240,000đ / tháng",
    },
    {
      id: 5,
      title: "Phòng 4 sinh viên",
      mainImg:
        "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/4 khong ml.jpg",
      image1:
        "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/4%20khong%20ml1.jpg",
      price: "650,000đ  / tháng",
    },
    {
      id: 6,
      title: "Phòng 2 sinh viên",
      mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/IMG_8241.jpg",
      image1: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong2dv.jpg",
      image2: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong2dv.jpg",
      image3: "https://ktx.vnuhcm.edu.vn/public/userfiles/phongo/phong2dv.jpg",
      price: "1,250,000đ  / tháng",
    },
  ];
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // gắn api dô cái useeffect này
  useEffect(() => {
    setRooms(roomsData);
  }, []);

  const handleRoomClick = (id) => {
    navigate(`/roominfo/${id}`);
  };
  return (
    <div className="homepage-container">
      <header>
        <h1>Kí túc xá Học Viện Công Nghệ Bưu Chính Viễn Thông</h1>
      </header>
      <main>
        <h2>GIỚI THIỆU KÝ TÚC XÁ</h2>
        <p>
          Ký túc xá Học viện Công nghệ Bưu chính Viễn thông Cơ sở tại TP. Hồ Chí
          Minh nằm trong khuôn viên Cơ sở đào tạo tại TP. Thủ Đức, số 97, đường
          Man Thiện, Phường Hiệp Phú, TP. Thủ Đức, TP. Hồ Chí Minh. Ký túc xá có
          97 phòng dịch vụ với sức chứa gần 1.000 sinh viên. Là một trong số ít
          ký túc xá sinh viên tại TP. Thủ Đức nói riêng và TP. Hồ Chí Minh nói
          chung nằm cạnh các tòa nhà giảng đường, khu thực hành, thí nghiệm; có
          khuôn viên cây xanh, sân chơi thể thao thuận tiện cho sinh viên sinh
          hoạt, học tập và rèn luyện. Tiếp giáp với Khu Công nghệ cao TP. Hồ Chí
          Minh, gần Trung tâm thương mại lớn nhất TP. Thủ Đức, sinh viên ở tại
          Ký túc xá có cơ hội trải nghiệm học tập, làm thêm, vui chơi giải trí
          hữu ích.
        </p>
        <section>
          <h2>Các phòng ktx</h2>
          <div className="room-list">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="room-item"
                onClick={() => handleRoomClick(room.id)}
              >
                <img
                  src={room.mainImg}
                  alt={room.title}
                  className="room-image"
                />
                <h3>{room.title}</h3>
                <p>{room.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <p>
          &copy; {new Date().getFullYear()} Học Viện Công Nghệ Bưu Chính Viễn
          Thông
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
