import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data.jsx";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";
import { FaRegFileImage } from "react-icons/fa";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate;
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard-events");
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
      newForm.append("images", image);
    });
    const data = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images,
      shopId: seller._id,
      start_Date: startDate?.toISOString(),
      Finish_Date: endDate?.toISOString(),
    };
    dispatch(createevent(data));
  };

  return (
    <div className="w-full">
      <h1 className="text-base font-semibold text-black text-opacity-70 mt-4 mb-6">
        Add Event
      </h1>
      {/* create event form */}
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
            placeholder="Enter your event product name..."
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
            placeholder="Enter your event product description..."
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
            placeholder="Enter your event product tags..."
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
              placeholder="Enter your event product price..."
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
              placeholder="Enter your event product price with discount..."
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
            placeholder="Enter your event product stock..."
          />
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              Start Date
            </label>
            <input
              type="date"
              name="price"
              id="start-date"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              className="border border-black border-opacity-20 text-sm p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
              onChange={handleStartDateChange}
              min={today}
              placeholder="Enter your event product stock..."
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-black text-opacity-70">
              End Date
            </label>
            <input
              type="date"
              name="price"
              id="start-date"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              className="border border-black border-opacity-20 text-sm p-2 placeholder:text-sm placeholder:text-black placeholder:text-opacity-50"
              onChange={handleEndDateChange}
              min={minEndDate}
              placeholder="Enter your event product stock..."
            />
          </div>
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
            <label htmlFor="upload">
              <span className="flex text-sm flex-row gap-2 items-center justify-center cursor-pointer text-theme w-full border border-theme border-opacity-80 p-2">
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

export default CreateEvent;
