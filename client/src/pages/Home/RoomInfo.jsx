import React from "react";
import { useParams, Link } from "react-router-dom";
import "./RoomInfo.css";

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
    mainImg: "https://ktx.vnuhcm.edu.vn/thumb/500x500/1/phongo/4 khong ml.jpg",
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

function RoomInfo() {
  let { id } = useParams();
  const room = roomsData.find((room) => room.id.toString() === id);

  if (!room) {
    return <div>Room not found</div>;
  }

  const otherImages = () => {
    const additionalImages = [];
    for (let i = 1; i <= 10; i++) {
      const imageKey = `image${i}`;
      if (room[imageKey]) {
        additionalImages.push(
          <img key={imageKey} src={room[imageKey]} alt={room.title} />
        );
      }
    }
    return additionalImages;
  };

  return (
    <div>
      <div className="room-info-container">
        <h2 className="room-title">{room.title}</h2>
        <h4 className="room-price">Price: {room.price}</h4>
        <div className="room-images">
          <img className="main-image" src={room.mainImg} alt={room.title} />
          <div className="additional-images-grid">{otherImages()}</div>
        </div>
        <Link to="/form" className="book-now-button">
          Đặt phòng ngay
        </Link>
      </div>

      <h2>Các Phòng Khác</h2>
      <div className="other-rooms">
        {roomsData.map(
          (otherRoom) =>
            otherRoom.id !== room.id && (
              <Link key={otherRoom.id} to={`/roominfo/${otherRoom.id}`}>
                <div className="room-item">
                  <img
                    src={otherRoom.mainImg}
                    alt={otherRoom.title}
                    style={{ width: "100px", height: "auto" }}
                  />
                  <h5>{otherRoom.title}</h5>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default RoomInfo;
