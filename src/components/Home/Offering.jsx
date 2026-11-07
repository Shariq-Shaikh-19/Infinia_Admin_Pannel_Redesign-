import axios from "axios";
// import "../../App.css";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Offering = () => {
  const [data, setData] = useState({
    description: "",
    image: [],
    title: "",
    buttonText: "",
    buttonColor: "",
  });
  const [imgArr, setImgArr] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImageName, setNewImageName] = useState("");

  const fetchHero = () => {
    axios
      .get("https://infinia-backend.onrender.com/offering")
      .then((res) => {
        setData(res.data.data[0]);
        setImgArr(res.data.data[0].images);
        // console.log("Data ", data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myCloud");
    formData.append("cloud_name", "dnevtbn0x");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnevtbn0x/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary: ", error);
      toast.error("Error uploading file");
      return null;
    }
  };

  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setImgArr((prevArr) => {
          const updatedArr = [...prevArr];
          updatedArr[index] = { ...updatedArr[index], url };
          return updatedArr;
        });
      }
    }
  };

  const handleUpdate = () => {
    const updatedData = { ...data, images: imgArr };
    axios
      .put(
        `https://infiniaback.onrender.com/offering/update/${data._id}`,
        updatedData
      )
      .then((res) => {
        toast.success("Data added successfully");
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error.message);
      });
  };

  const handleImageClick = (image, index) => {
    setSelectedImage({ ...image, index });
    setNewImageName(image.name || "");
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    setSelectedImage(null);
    setNewImageName("");
  };

  const handleImageNameChange = (e) => {
    setNewImageName(e.target.value);
  };

  const handleImageUpdate = () => {
    if (selectedImage) {
      setImgArr((prevArr) => {
        const updatedArr = prevArr.map((img, idx) =>
          idx === selectedImage.index ? { ...img, name: newImageName } : img
        );
        return updatedArr;
      });
      handlePopupClose();
    }
  };

  const handleDelete = (e,index) => {
    console.log('rrrrrrrrrr',e)
    console.log('ssssssssss',index)
  }

  useEffect(() => {
    fetchHero();
  }, []);

  return (
    <>
      <div className={`relative ${popupVisible ? "blur-background" : ""}`}>
        <div className="border-2 w-[1350px] mt-3">
          <h2 className="text-center p-3">OFFERING SECTION</h2>
          <div className="w-full border-2 border-red-700">
            <table className="table table-zebra w-full">
              <thead className="bg-gray-800 text-white w-full">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Button Text</th>
                  <th>Button Color</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-[20%]">
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="title"
                      type="text"
                      onChange={handleChange}
                      value={data.title || ""}
                    />
                  </td>
                  <td className="w-[100px]">
                    <textarea
                      className="p-2 border-2 border-gray-700 w-[250px] resize"
                      name="description"
                      type="text"
                      onChange={handleChange}
                      value={data.description || ""}
                    />
                  </td>
                  <td>
                    <input
                      className="p-2 border-2 border-gray-700"
                      name="buttonText"
                      type="text"
                      onChange={handleChange}
                      value={data.buttonText || ""}
                    />
                  </td>
                  <td>
                    <input
                      className="p-2 border-2 border-gray-700"
                      name="buttonColor"
                      type="text"
                      onChange={handleChange}
                      value={data.buttonColor || ""}
                    />
                  </td>
                  <td>
                    {imgArr.map((item, index) => (
                      <div key={index}>
                        <img
                          className="h-20 w-30 ml-[100px] cursor-pointer"
                          onClick={() => handleImageClick(item, index)}
                          src={item.url}
                          alt={`img-${index}`}
                        />
                        <div className="flex justify-between cursor-pointer">
                          <input
                            type="file"
                            name="image"
                            onClick={handleDelete}
                            onChange={(e) => handleFileChange(e, index)}
                          />
                          {/* <p>Delete</p> */}
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-success text-white btn-sm"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {popupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img
              src={selectedImage.url}
              alt="Selected"
              className="mb-4 h-[400px] w-[450px]"
            />
            <input
              type="text"
              placeholder="Enter new image name"
              value={newImageName}
              onChange={handleImageNameChange}
              className="p-2 border-2 border-gray-700 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button className="btn btn-primary" onClick={handleImageUpdate}>
                Update
              </button>
              <button className="btn btn-secondary" onClick={handlePopupClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default Offering;
