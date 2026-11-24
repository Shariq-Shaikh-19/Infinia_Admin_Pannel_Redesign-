/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Ecomagix() {
  const [ecomagix, setEcomagix] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const baseUrl = "https://infiniaback.onrender.com";
  // const baseUrl = "http://localhost:8080";

  // Handle name and points changes
  const handleEcomagixChange = (e, id) => {
    const { name, value, dataset } = e.target;

    setEcomagix((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              [name]:
                name === "points"
                  ? item.points.map((point, index) =>
                      index === parseInt(dataset.index) ? value : point,
                    )
                  : value,
            }
          : item,
      ),
    );
  };

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "myCloud");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnevtbn0x/image/upload",
        formData,
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Error uploading image");
      return null;
    }
  };

  // Handle image upload/change
  const handleFileChange = async (e, id, index) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      e.target.value = "";
      return;
    }

    const url = await uploadToCloudinary(file);

    if (url) {
      setEcomagix((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                images: item.images.map((image, imgIndex) =>
                  imgIndex === index ? { ...image, url } : image,
                ),
              }
            : item,
        ),
      );

      toast.success("Image uploaded successfully");
    }

    e.target.value = "";
  };

  // Remove image from the current Ecomagix item
  const handleRemoveImage = (id, index) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this image?",
    );

    if (!confirmed) return;

    setEcomagix((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              images: item.images.filter((_, imgIndex) => imgIndex !== index),
            }
          : item,
      ),
    );

    toast.success("Image removed. Click Update to save changes.");
  };

  // Fetch Ecomagix data
  const fetchEcomagix = async () => {
    try {
      const response = await axios.get(`${baseUrl}/ecomagix`);

      const data = response.data.data.map((item) => ({
        ...item,
        images: (item.images || []).map((image) =>
          typeof image === "string" ? { url: image, description: "" } : image,
        ),
        points: item.points || [],
      }));

      setEcomagix(data);
    } catch (error) {
      console.error("Error fetching Ecomagix:", error);
      toast.error("Unable to fetch Ecomagix data");
    }
  };

  useEffect(() => {
    fetchEcomagix();
  }, []);

  // Update Ecomagix data
  const handleUpdate = async (id) => {
    const itemToUpdate = ecomagix.find((item) => item._id === id);

    if (!itemToUpdate) {
      toast.error("Ecomagix not found");
      return;
    }

    try {
      setUpdatingId(id);

      // Convert image objects back into URL strings
      const updatedData = {
        ...itemToUpdate,
        images: itemToUpdate.images.map((image) => image.url),
      };

      await axios.patch(`${baseUrl}/ecomagix/update/${id}`, updatedData);

      toast.success("Data updated successfully");
    } catch (error) {
      console.error("Error updating Ecomagix:", error);
      toast.error("Something went wrong while updating");
    } finally {
      setUpdatingId(null);
    }
  };

  // Navigation
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F4FA] p-6 md:p-8 text-[#25204A]">
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#25204A]">
            Ecomagix Management
          </h1>

          <p className="text-[#71809A] mt-2">
            Manage and update the content displayed in your Ecomagix section.
          </p>
        </div>

        <button
          onClick={navigateBack}
          className="px-5 py-2.5 rounded-xl bg-white
          border border-[#E2E0F0] text-[#6535D9]
          font-semibold hover:bg-[#F0EBFF]
          transition-all shadow-sm"
        >
          ← Back
        </button>
      </div>

      {/* Main Card */}
      <div
        className="bg-white border border-[#E5E3F0]
        rounded-2xl shadow-sm overflow-hidden"
      >
        {/* Card Header */}
        <div
          className="flex items-center gap-4 p-6
          bg-[#FAF9FE] border-b border-[#EAE8F2]"
        >
          <div
            className="w-[52px] h-[52px] shrink-0 rounded-xl
            bg-[#EEE8FF] flex items-center justify-center
            text-xl font-bold text-[#7139DF]"
          >
            01
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#30265F]">
              Ecomagix Content Details
            </h2>

            <p className="text-[#71809A] mt-1">
              Update names, descriptions and images.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="p-5 md:p-6 overflow-x-auto">
          <table className="w-full min-w-[1000px] table-fixed border-collapse">
            {/* Column Widths */}
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[30%]" />
              <col className="w-[37%]" />
              <col className="w-[15%]" />
            </colgroup>

            {/* Table Heading */}
            <thead>
              <tr className="bg-[#F7F5FC] text-[#44366F]">
                <th className="p-4 text-left font-semibold rounded-l-lg">
                  NAME
                </th>

                <th className="p-4 text-left font-semibold">
                  DESCRIPTION / POINTS
                </th>

                <th className="p-4 text-left font-semibold">IMAGES</th>

                <th className="p-4 text-center font-semibold rounded-r-lg">
                  ACTION
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {ecomagix.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-[#EEEAF5] align-top hover:bg-[#FCFBFE] transition-colors"
                >
                  {/* NAME */}
                  <td className="p-4 align-top">
                    <input
                      className="w-full min-w-0 p-3 rounded-xl
                      bg-[#F8F7FC] border border-[#E5E1F0]
                      text-[#30265F] outline-none
                      focus:border-[#9B72EF] focus:ring-2
                      focus:ring-[#EEE8FF] transition-all"
                      name="name"
                      type="text"
                      value={item.name}
                      onChange={(e) => handleEcomagixChange(e, item._id)}
                    />
                  </td>

                  {/* DESCRIPTION / POINTS */}
                  <td className="p-4 align-top">
                    <div className="flex flex-col gap-3">
                      {item.points.map((point, index) => (
                        <div key={index}>
                          <label
                            className="block text-xs
                            font-semibold text-[#81759E] mb-1.5"
                          >
                            POINT {index + 1}
                          </label>

                          <textarea
                            rows={3}
                            className="w-full min-w-0 p-3 rounded-xl
                            bg-[#F8F7FC] border border-[#E5E1F0]
                            text-[#30265F] outline-none resize-y
                            focus:border-[#9B72EF] focus:ring-2
                            focus:ring-[#EEE8FF] transition-all"
                            name="points"
                            data-index={index}
                            value={point}
                            onChange={(e) => handleEcomagixChange(e, item._id)}
                          />
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* IMAGES */}
                  <td className="p-4 align-top">
                    <div className="flex flex-col gap-4">
                      {item.images.map((image, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl border
                          border-[#E8E4F2] bg-[#FCFBFE]"
                        >
                          {/* Image Heading and Remove Button */}
                          <div
                            className="flex items-center
                            justify-between gap-2 mb-3"
                          >
                            <label
                              className="text-sm font-semibold
                              text-[#55477C]"
                            >
                              Image {index + 1}
                            </label>

                            <button
                              type="button"
                              onClick={() => handleRemoveImage(item._id, index)}
                              className="px-3 py-1.5 rounded-lg
                              bg-red-50 text-red-600
                              border border-red-200
                              text-xs font-semibold
                              hover:bg-red-100 transition-all"
                            >
                              <span className="mr-1">✕</span>
                              Remove
                            </button>
                          </div>

                          {/* File Upload */}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, item._id, index)
                            }
                            className="w-full text-sm text-[#71809A]
                            file:mr-3 file:px-4 file:py-2
                            file:rounded-lg file:border-0
                            file:bg-[#EEE8FF] file:text-[#7139DF]
                            file:font-medium file:cursor-pointer
                            hover:file:bg-[#E3D8FF] cursor-pointer"
                          />

                          {/* Image Preview */}
                          {image.url && (
                            <div
                              className="flex items-center
                              gap-4 mt-4 p-3 bg-white rounded-lg
                              border border-[#ECE9F4]"
                            >
                              <img
                                src={image.url}
                                alt={`Uploaded ${index + 1}`}
                                className="w-20 h-20 shrink-0
                                object-cover rounded-lg
                                border border-[#E5E1F0]"
                              />

                              <div className="flex flex-col gap-2">
                                <a
                                  href={image.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium
                                  text-[#7139DF]
                                  hover:text-[#4F23B5]
                                  hover:underline"
                                >
                                  View Image
                                </a>

                                <span className="text-xs text-green-600">
                                  Image uploaded
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {item.images.length === 0 && (
                        <div
                          className="p-5 text-center
                          rounded-xl border border-dashed
                          border-[#D8CDED] bg-[#FAF9FE]"
                        >
                          <p className="text-sm text-[#81759E]">
                            No images available
                          </p>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* ACTION */}
                  <td className="p-4 align-top text-center">
                    <button
                      onClick={() => handleUpdate(item._id)}
                      disabled={updatingId === item._id}
                      className="w-full max-w-[120px] px-4 py-3
                      rounded-xl text-white font-semibold
                      bg-gradient-to-r from-[#7139DF] to-[#9748E8]
                      shadow-md shadow-purple-200
                      hover:brightness-110 hover:-translate-y-0.5
                      disabled:opacity-60 disabled:cursor-not-allowed
                      disabled:translate-y-0 transition-all"
                    >
                      {updatingId === item._id ? "Saving..." : "Update"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {ecomagix.length === 0 && (
            <div className="py-12 text-center text-[#81759E]">
              No Ecomagix content found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
