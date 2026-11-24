
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function About() {
  const baseUrl = "https://infiniaback.onrender.com";

  const [aboutHead, setAboutHead] = useState({
    title: "",
    infinia: "",
    image: "",
    description: "",
  });

  const [aboutExpertise, setAboutExpertise] = useState({
    title: "",
    image: "",
    description: "",
  });

  const [aboutLast, setAboutLast] = useState([]);

  const inputClass =
    "w-full px-4 py-3 bg-[#F7F7FC] text-slate-800 border border-[#E4E2F1] rounded-lg outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 placeholder-slate-400 transition";

  const labelClass = "block text-sm font-semibold text-slate-700 mb-2";

  const uploadClass =
    "w-full text-sm text-slate-600 border border-[#E4E2F1] rounded-lg p-3 bg-[#F7F7FC] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-violet-100 file:text-violet-700 file:font-semibold file:cursor-pointer hover:file:bg-violet-200";

  const saveButtonClass =
    "px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold cursor-pointer shadow-sm transition";

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myCloud");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnevtbn0x/image/upload",
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert("Image upload failed!");
      return null;
    }
  };

  // Fetch all About data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [resHead, resExp, resLast] = await Promise.all([
          axios.get(`${baseUrl}/abouthead`),
          axios.get(`${baseUrl}/aboutExpertise`),
          axios.get(`${baseUrl}/aboutlast`),
        ]);

        const headData = resHead.data?.data;

        if (Array.isArray(headData) && headData[0]) {
          setAboutHead((prev) => ({ ...prev, ...headData[0] }));
        } else if (headData && !Array.isArray(headData)) {
          setAboutHead((prev) => ({ ...prev, ...headData }));
        }

        const expData = resExp.data?.data;

        if (Array.isArray(expData) && expData[0]) {
          setAboutExpertise((prev) => ({ ...prev, ...expData[0] }));
        } else if (expData && !Array.isArray(expData)) {
          setAboutExpertise((prev) => ({ ...prev, ...expData }));
        }

        const lastData = resLast.data?.data;

        if (Array.isArray(lastData)) {
          setAboutLast(lastData);
        } else if (lastData) {
          setAboutLast([lastData]);
        }
      } catch (error) {
        console.error("Error fetching About data:", error);
        alert("Unable to load About page data");
      }
    };

    fetchAllData();
  }, []);

  // Reusable image preview
  const ImagePreview = ({ image, alt, onRemove }) => {
    if (!image) return null;

    return (
      <div className="mt-4 flex flex-wrap items-center gap-4 p-3 bg-white border border-[#E8E5F3] rounded-xl">
        <img
          src={image}
          alt={alt}
          className="w-24 h-20 object-cover rounded-lg border border-[#E4E2F1]"
        />

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">
            Current Image
          </span>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={image}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-violet-600 hover:text-violet-800 hover:underline"
            >
              View Image
            </a>

            <button
              type="button"
              onClick={onRemove}
              className="text-sm font-semibold text-red-500 hover:text-red-700 transition"
            >
              Remove Image
            </button>
          </div>
        </div>
      </div>
    );
  };

  // About Head handlers
  const handleHeadChange = (e) => {
    const { name, value } = e.target;
    setAboutHead((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeadFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);

    if (url) {
      setAboutHead((prev) => ({ ...prev, image: url }));
      alert("Image added successfully!");
    }

    e.target.value = "";
  };

  const handleRemoveHeadImage = () => {
    setAboutHead((prev) => ({ ...prev, image: "" }));
    alert("Image removed successfully!");
  };

  const handleUpdateHead = async () => {
    if (!aboutHead._id) {
      alert("About Head ID not found");
      return;
    }

    try {
      await axios.patch(
        `${baseUrl}/abouthead/update/${aboutHead._id}`,
        aboutHead
      );
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Head update error:", error);
      alert("Unable to save changes");
    }
  };

  // Expertise handlers
  const handleExpertiseChange = (e) => {
    const { name, value } = e.target;
    setAboutExpertise((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpertiseFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);

    if (url) {
      setAboutExpertise((prev) => ({ ...prev, image: url }));
      alert("Image uploaded successfully!");
    }

    e.target.value = "";
  };

  const handleRemoveExpertiseImage = () => {
    setAboutExpertise((prev) => ({ ...prev, image: "" }));
    alert("Image removed. Save changes to update.");
  };

  const handleUpdateExpertise = async () => {
    if (!aboutExpertise._id) {
      alert("Expertise ID not found");
      return;
    }

    try {
      await axios.patch(
        `${baseUrl}/aboutExpertise/update/${aboutExpertise._id}`,
        aboutExpertise
      );
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Expertise update error:", error);
      alert("Unable to save changes");
    }
  };

  // About Last handlers
  const handleLastChange = (e, index) => {
    const { name, value } = e.target;

    setAboutLast((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleLastFileChange = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);

    if (url) {
      setAboutLast((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, image: url } : item
        )
      );
      alert("Image uploaded successfully!");
    }

    e.target.value = "";
  };

  const handleRemoveLastImage = (index) => {
    setAboutLast((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, image: "" } : item
      )
    );

    alert("Image removed. Save changes to update.");
  };

  const handleUpdateLast = async (index) => {
    const item = aboutLast[index];

    if (!item?._id) {
      alert("Item ID not found");
      return;
    }

    try {
      await axios.patch(`${baseUrl}/aboutlast/update/${item._id}`, item);
      alert(`Card ${index + 3} updated successfully!`);
    } catch (error) {
      console.error("About Last update error:", error);
      alert("Unable to save changes");
    }
  };

  // Reusable card heading
  const CardHeading = ({ number }) => (
    <div className="flex items-center gap-4">
      <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-violet-100 text-violet-700 font-bold text-lg">
        {String(number).padStart(2, "0")}
      </span>
      <div>
        <h2 className="text-lg font-bold text-[#30265C]">
          Content Details
        </h2>
        <p className="text-sm text-slate-500">
          Update the information and save your changes.
        </p>
      </div>
    </div>
  );

  // Reusable separate card
  const Card = ({ number, children, onSave }) => (
    <section className="bg-white border border-[#E5E3F0] rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 bg-[#FBFAFE] border-b border-[#EAE8F2]">
        <CardHeading number={number} />
      </div>

      <div className="p-6">{children}</div>

      <div className="px-6 py-4 bg-[#FBFAFE] border-t border-[#EAE8F2] flex justify-end">
        <button
          type="button"
          onClick={onSave}
          className={saveButtonClass}
        >
          Save Changes
        </button>
      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen px-5 md:px-7 pt-5 mt-[80px] pb-10 bg-[#F3F4FA] text-slate-800">

      {/* Page heading */}
      <div className="mb-7">
        <h1 className="text-2xl md:text-3xl font-bold text-[#252044]">
          About Management
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Manage and update the content displayed on your website's About page.
        </p>
      </div>

      {/* CARD 01 */}
      <div className="space-y-6">

        <Card number={1} onSave={handleUpdateHead}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                name="title"
                value={aboutHead.title || ""}
                onChange={handleHeadChange}
                className={inputClass}
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className={labelClass}>Heading</label>
              <input
                type="text"
                name="infinia"
                value={aboutHead.infinia || ""}
                onChange={handleHeadChange}
                className={inputClass}
                placeholder="Enter heading"
              />
            </div>

            <div>
              <label className={labelClass}>Section Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleHeadFileChange}
                className={uploadClass}
              />
              <ImagePreview
                image={aboutHead.image}
                alt="About image"
                onRemove={handleRemoveHeadImage}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={aboutHead.description || ""}
                onChange={handleHeadChange}
                rows={5}
                className={`${inputClass} resize-y`}
                placeholder="Enter description"
              />
            </div>
          </div>
        </Card>

        {/* CARD 02 */}
        <Card number={2} onSave={handleUpdateExpertise}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                name="title"
                value={aboutExpertise.title || ""}
                onChange={handleExpertiseChange}
                className={inputClass}
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className={labelClass}>Section Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleExpertiseFileChange}
                className={uploadClass}
              />
              <ImagePreview
                image={aboutExpertise.image}
                alt="Expertise image"
                onRemove={handleRemoveExpertiseImage}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={aboutExpertise.description || ""}
                onChange={handleExpertiseChange}
                rows={5}
                className={`${inputClass} resize-y`}
                placeholder="Enter description"
              />
            </div>
          </div>
        </Card>

        {/* CARD 03 ONWARDS */}
        {aboutLast.map((item, index) => (
          <Card
            key={item._id || index}
            number={index + 3}
            onSave={() => handleUpdateLast(index)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={item.title || ""}
                  onChange={(e) => handleLastChange(e, index)}
                  className={inputClass}
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label className={labelClass}>Section Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLastFileChange(e, index)}
                  className={uploadClass}
                />
                <ImagePreview
                  image={item.image}
                  alt={item.title || "About item"}
                  onRemove={() => handleRemoveLastImage(index)}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  value={item.description || ""}
                  onChange={(e) => handleLastChange(e, index)}
                  rows={4}
                  className={`${inputClass} resize-y`}
                  placeholder="Enter description"
                />
              </div>
            </div>
          </Card>
        ))}

        {aboutLast.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-5">
            No additional content items were found.
          </p>
        )}

      </div>
    </div>
  );
}
