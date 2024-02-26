import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product.js";
import { categoriesData } from "../../static/data.jsx";
import { toast } from "react-toastify";
import { FaRegFileImage } from "react-icons/fa6";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(
      createProduct({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
      })
    );
  };

  return (
    <div className="w-full">
      <h1 className="text-base font-semibold text-black text-opacity-70 mt-4 mb-6">
        Create Product
      </h1>
      {/* create product form */}
      <form
        className="flex flex-col gap-4 max-w-[600px] pb-2"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">
            Description
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">Category</label>
          <select
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option className="text-sm text-black" value="Choose a category">
              Choose a category
            </option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option
                  className="text-sm text-black"
                  value={i.title}
                  key={i.title}
                >
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Original Price
            </label>
            <input
              type="number"
              name="price"
              value={originalPrice}
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter your product price..."
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Discounted Price
            </label>
            <input
              type="number"
              name="price"
              value={discountPrice}
              className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Enter your product price with discount..."
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">
            Product Stock
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="text-sm border border-black border-opacity-20 p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm text-black text-opacity-70">
            Upload Images
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label
              className="text-sm text-black text-opacity-70"
              htmlFor="upload"
            >
              <span className="flex flex-row gap-2 items-center justify-center cursor-pointer text-theme w-full border border-theme border-opacity-80 p-2">
                <FaRegFileImage size={16} />
                <span>Click to upload</span>
              </span>
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <div>
            <input
              type="submit"
              value="Create"
              className="w-[100%] border border-success text-center text-success rounded-sm cursor-pointer text-sm p-3 mt-4"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
