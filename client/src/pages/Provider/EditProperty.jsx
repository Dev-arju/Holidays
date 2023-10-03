import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../../components/Provider/ImageUpload";
import { toast } from "react-toastify";
import { getRequest, setAccessToken, postRequest } from "../../utils/axios";

const EditProperty = () => {
  const { authData } = useSelector((state) => state.provider);
  const { docId } = useParams();
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const getPropertyDetails = async () => {
      setAccessToken(authData.token);
      const response = await getRequest(`/provider/property/${docId}`);
      if (response.data) {
        setImageUrls([...response.data.propertyImages]);
        setEditForm(response.data);
      }
      if (response.error) {
        console.log(response.error);
        toast.error(response.error.message || response.message);
      }
    };
    getPropertyDetails();
  }, []);

  const verifyPincode = (pincode) => {
    return /^\d{6}$/.test(pincode);
  };

  const submitForm = async (e) => {
    e.stopPropagation();
    if (
      !editForm.propertyName ||
      !editForm.propertyLocation ||
      !editForm.propertyAddress ||
      !editForm.propertyPincode
    )
      return toast.error("all fields are mandatory");
    if (imageUrls.length < 1 && coverImage.length < 1)
      return toast.error("add atleast one image");
    if (!verifyPincode(editForm.propertyPincode))
      return toast.error("enter a valid pincode");
    let deletedImages = [];
    editForm.propertyImages.forEach((img) => {
      let isAvail = imageUrls.filter((url) => url === img);
      if (isAvail.length < 1) {
        deletedImages.push(img);
      }
    });
    const formData = new FormData();
    formData.append("propertyName", editForm.propertyName);
    formData.append("propertyLocation", editForm.propertyLocation);
    formData.append("propertyAddress", editForm.propertyAddress);
    formData.append("propertyPincode", editForm.propertyPincode);
    deletedImages.forEach((img) => {
      formData.append("deletedImages[]", img);
    });
    imageUrls.forEach((img) => {
      formData.append("activeImages[]", img);
    });
    coverImage.forEach((file) => {
      formData.append("newImages", file);
    });
    const headers = { headers: { "Content-Type": "multipart/form-data" } };
    setAccessToken(authData.token);
    const response = await postRequest(
      `/provider/property/edit/${docId}`,
      formData,
      headers
    );
    if (response.data) {
      deletedImages = [];
      toast.success("saved successfully");
      navigate(`/provider/properties/edit/price-options/${docId}`);
    }
    if (response.error) {
      console.log(response.error);
      toast.error(response.error.message || response.message);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-center font-body leading-tight font-bold text-2xl">
          Edit Property Details
        </h2>
      </div>
      {Object.keys(editForm).length > 0 ? (
        <div className="flex justify-center gap-8 flex-wrap p-6">
          <div className="bg-neutral-50 shadow-lg flex flex-col gap-6 p-4  rounded-lg">
            <div className="relative bg-inherit">
              <input
                type="text"
                id="propertyName"
                value={editForm.propertyName}
                onChange={(e) =>
                  setEditForm({ ...editForm, propertyName: e.target.value })
                }
                className="peer bg-transparent h-10 w-80 rounded-lg text-gray-800 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Property Name"
              />
              <label
                htmlFor="propertyName"
                className="absolute cursor-text left-0 -top-3 text-sm text-gray-600 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
              >
                Property Name
              </label>
            </div>
            <div className="relative bg-inherit">
              <input
                type="text"
                id="propertyLocation"
                value={editForm.propertyLocation}
                onChange={(e) =>
                  setEditForm({ ...editForm, propertyLocation: e.target.value })
                }
                className="peer bg-transparent h-10 w-80 rounded-lg text-gray-800 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Property Location"
              />
              <label
                htmlFor="propertyLocation"
                className="absolute cursor-text left-0 -top-3 text-sm text-gray-600 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
              >
                Property Location
              </label>
            </div>
            <div className="relative bg-inherit">
              <textarea
                type="text"
                id="propertyAddress"
                value={editForm.propertyAddress}
                onChange={(e) =>
                  setEditForm({ ...editForm, propertyAddress: e.target.value })
                }
                className="peer bg-transparent h-36 w-80 rounded-lg text-gray-800 placeholder-transparent ring-2 py-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Property Address"
              />
              <label
                htmlFor="propertyAddress"
                className="absolute cursor-text left-0 -top-3 text-sm text-gray-600 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
              >
                Property Address
              </label>
            </div>
            <div className="relative bg-inherit">
              <input
                type="text"
                id="pincode"
                value={editForm.propertyPincode}
                onChange={(e) =>
                  setEditForm({ ...editForm, propertyPincode: e.target.value })
                }
                className="peer bg-transparent h-10 w-80 rounded-lg text-gray-800 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Pincode"
              />
              <label
                htmlFor="pincode"
                className="absolute cursor-text left-0 -top-3 text-sm text-gray-600 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
              >
                Pincode
              </label>
            </div>
          </div>
          <ImageUpload
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
        </div>
      ) : (
        <div className="flex justify-center w-full h-96 items-center">
          <h2 className="text-base font-title px-6 py-2 rounded-full border border-primary text-primary text-center">
            Loading...
          </h2>
        </div>
      )}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={submitForm}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          save & continue
        </button>
      </div>
    </>
  );
};

export default EditProperty;
