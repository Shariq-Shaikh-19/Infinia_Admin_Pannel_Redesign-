import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ProductTableForm = ({
  productData,
  handleChange,
  handleSubmit,
  editId,
}) => (
  <form onSubmit={handleSubmit} className="mb-8">
    <table className="min-w-full divide-y divide-gray-200">
      <tbody>
        {[
          {
            label: "Title",
            name: "title",
            type: "text",
            placeholder: "Title",
            required: true,
          },
          {
            label: "Description",
            name: "description",
            type: "text",
            placeholder: "Description",
            required: true,
          },
          {
            label: "PDF File",
            name: "pdffile",
            type: "file",
            placeholder: "PDF File",
          },
          {
            label: "Pattern",
            name: "Pattern",
            type: "text",
            placeholder: "Pattern",
          },
          {
            label: "Coverage",
            name: "Coverage",
            type: "text",
            placeholder: "Coverage",
          },
          {
            label: "Order Quantity",
            name: "orderQantity",
            type: "text",
            placeholder: "Order Quantity",
          },
          { label: "Color", name: "color", type: "text", placeholder: "Color" },
          {
            label: "Material",
            name: "material",
            type: "text",
            placeholder: "Material",
          },
          { label: "Shape", name: "shape", type: "text", placeholder: "Shape" },
          { label: "Size", name: "size", type: "text", placeholder: "Size" },
          {
            label: "Laminated",
            name: "laminated",
            type: "text",
            placeholder: "Laminated",
          },
          {
            label: "Thickness",
            name: "Thickness",
            type: "text",
            placeholder: "Thickness",
          },
          {
            label: "Country Of Origin",
            name: "CountryOfOrigin",
            type: "text",
            placeholder: "Country Of Origin",
          },
          {
            label: "Surface Finish",
            name: "SurfaceFinish",
            type: "text",
            placeholder: "Surface Finish",
          },
          { label: "Type", name: "type", type: "text", placeholder: "Type" },
          {
            label: "Grade Of Material",
            name: "gradeOfMaterial",
            type: "text",
            placeholder: "Grade Of Material",
          },
          {
            label: "Usage Application",
            name: "UsageApplication",
            type: "text",
            placeholder: "Usage Application",
          },
          {
            label: "Position",
            name: "Position",
            type: "text",
            placeholder: "Position",
          },
          {
            label: "Product Type",
            name: "ProductType",
            type: "text",
            placeholder: "Product Type",
          },
          {
            label: "Feature",
            name: "Feature",
            type: "text",
            placeholder: "Feature",
          },
          {
            label: "Weight",
            name: "Weight",
            type: "text",
            placeholder: "Weight",
          },
          {
            label: "Dimensions",
            name: "Dimensions",
            type: "text",
            placeholder: "Dimensions",
          },
          {
            label: "Durability",
            name: "Durability",
            type: "text",
            placeholder: "Durability",
          },
          {
            label: "EcoFriendly",
            name: "EcoFriendly",
            type: "text",
            placeholder: "EcoFriendly",
          },
          {
            label: "Image 1",
            name: "image1",
            type: "file",
            placeholder: "Image 1",
          },
          {
            label: "Image 2",
            name: "image2",
            type: "file",
            placeholder: "Image 2",
          },
          {
            label: "Image 3",
            name: "image3",
            type: "file",
            placeholder: "Image 3",
          },
          {
            label: "Image 4",
            name: "image4",
            type: "file",
            placeholder: "Image 4",
          },
        ].map((field, index) => (
          <tr key={index} className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <label>{field.label}</label>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type={field.type}
                name={field.name}
                value={
                  field.type === "file"
                    ? undefined
                    : productData[field.name] || ""
                }
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required || false}
              />
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="2" className="text-center py-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editId ? "Update" : "Create"}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
);

const ProductList = ({ products, handleEdit, handleDelete }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold">Products List</h2>
    <ul className="mt-4 space-y-4">
      {products.length > 0 ? (
        products.map((product) => (
          <li
            key={product._id}
            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(product)}
                className="mr-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))
      ) : (
        <p>No products available</p>
      )}
    </ul>
  </div>
);

export default function ProductEdit() {
  const location = useLocation();
  const product = location.state?.product || {};

  const [products, setProducts] = useState([]);
  // const baseUrl = `http://localhost:8080`;
   const baseUrl = "https://infiniaback.onrender.com";
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    pdffile: null,
    Pattern: "",
    Coverage: "",
    orderQantity: "",
    color: "",
    material: "",
    shape: "",
    size: "",
    laminated: "",
    Thickness: "",
    CountryOfOrigin: "",
    SurfaceFinish: "",
    type: "",
    gradeOfMaterial: "",
    UsageApplication: "",
    Position: "",
    ProductType: "",
    Feature: "",
    Weight: "",
    Dimensions: "",
    Durability: "",
    EcoFriendly: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (product) {
      setProductData(product);
      setEditId(product._id);
    }
  }, [product]);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];

      // Call the function to upload the file to Cloudinary
      const fileUrl = await uploadToCloudinary(file);

      // If the upload is successful, store the URL in the state
      if (fileUrl) {
        setProductData((prevData) => ({
          ...prevData,
          [name]: fileUrl,
        }));
      }
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product data : ", productData)
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    if (editId) {
      await updateProduct(editId, productData);
    } else {
      await createProduct(formData);
    }

    resetForm();
  };

  const createProduct = async (data) => {
    try {
      await axios.post(baseUrl + "/api/products/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product created successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to create product.");
    }
  };

  const updateProduct = async (id, data) => {
    console.log('Data ', data);
    try {
      await axios.patch(baseUrl + `/product/update/${id}`, data);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update product.");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setProductData(product);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(baseUrl + `/api/products/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete product.");
    }
  };

  const resetForm = () => {
    setProductData({
      title: "",
      description: "",
      Pattern: "",
      Coverage: "",
      orderQantity: "",
      color: "",
      material: "",
      shape: "",
      size: "",
      laminated: "",
      Thickness: "",
      CountryOfOrigin: "",
      SurfaceFinish: "",
      type: "",
      gradeOfMaterial: "",
      UsageApplication: "",
      Position: "",
      ProductType: "",
      Feature: "",
      Weight: "",
      Dimensions: "",
      Durability: "",
      EcoFriendly: "",
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      pdffile: null,
    });
    setEditId(null);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto flex flex-col justify-center items-center bg-gray-200 ml-[250px]">
      <h1 className="text-2xl font-semibold mb-8">Product Management</h1>
      <ProductTableForm
        productData={productData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editId={editId}
      />
      <ProductList
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
