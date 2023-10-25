import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { MdPublishedWithChanges } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { setAccessToken, getRequest, putRequest } from "../../utils/axios";
import { toast } from "react-toastify";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

import userAvatar from "../../assets/userAvatar.png";
const TOOLTIP_STYLE = {
  paddingLeft: "8px",
  paddingRight: "8px",
  paddingTop: "2px",
  paddingBottom: "4px",
  fontSize: "12px",
  fontWeight: "500",
  backgroundColor: "rgb(250, 250, 250)",
  color: " rgb(30 64 175)",
};

const UsersList = () => {
  const { authData } = useSelector((state) => state.admin);
  const [modal, setModal] = useState({ active: false, payload: "" });
  const [users, setUsers] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const pagination = useRef(null);
  const totalPages = useMemo(() => {
    return Math.ceil(users.length / 5);
  }, [users.length]);
  const fetchUsers = async () => {
    console.log(authData.token);
    setAccessToken(authData.token);
    const response = await getRequest("/admin/users");
    if (response.data) {
      setUsers(response.data);
    }
    if (response.error) {
      document.getElementById("isEmpty").classList.replace("hidden", "flex");
      toast.error(response.error.message);
      console.log(response.error.message || response.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (pagination.current) pagination.current.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      let child = document.createElement("p");
      child.onclick = pageClick;
      child.textContent = i;
      if (currPage === i) {
        child.className =
          "border-b w-6 text-center text-base font-bold cursor-pointer rounded-t-sm bg-neutral-100 shadow-inner border-black";
      } else {
        child.className =
          "border-b w-6 text-center text-base font-bold cursor-pointer border-gray-400";
      }
      pagination.current.appendChild(child);
    }
  }, [totalPages, currPage]);

  function pageClick(e) {
    e.stopPropagation();
    const pageNumber = parseInt(e.target.textContent);
    setCurrPage(pageNumber);
  }

  const statusChange = async (e) => {
    e.stopPropagation();
    console.log(modal);
    const { data, error } = await putRequest("/admin/users/status-toggle", {
      userId: modal.payload,
    });
    if (data) {
      setUsers((prev) => {
        return prev.map((user) => {
          if (user._id === data._id) {
            return data;
          }
          return user;
        });
      });
    }
    if (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    setModal({ active: false, payload: "" });
  };

  return (
    <>
      <div className="flex justify-between mx-4 px-4 items-center">
        <div className="font-body font-bold text-2xl">Users</div>
        {/* <Link
            to="add"
            data-tooltip-id="a"
            data-tooltip-content="List New Property"
            className="p-2 rounded-full bg-primary text-secondary text-2xl"
          >
            <BsHouseAddFill />
          </Link>
          <Tooltip style={TOOLTIP_STYLE} id="a" place="bottom-start" /> */}
      </div>
      <div className="mt-2 overflow-x-auto">
        {users.length > 0 ? (
          <table className="min-w-full table-auto text-center text-sm font-light">
            <thead className="border-b bg-neutral-50 shadow-inner font-medium">
              <tr>
                <th scope="col" className="px-2 py-4">
                  Avatar
                </th>
                <th scope="col" className="px-6 py-4">
                  Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Email
                </th>

                <th scope="col" className="px-6 py-4">
                  status
                </th>
                {/* <th scope="col" className="px-6 py-4"></th> */}
                <th scope="col" className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                if ((currPage - 1) * 5 > index || currPage * 5 < index + 1) {
                  return;
                }
                return (
                  <tr className="border-b" key={user._id}>
                    <td className="whitespace-nowrap px-2 py-4 font-medium">
                      <img
                        src={user.avatar ? user.avatar : userAvatar}
                        alt=""
                        className="aspect-square w-10 mx-auto rounded-full"
                      />
                    </td>
                    <td className="whitespace-nowrap font-normal px-6 py-4">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap font-normal px-6 py-4">
                      {user.email}
                    </td>
                    <td
                      className={
                        user.isActive
                          ? "whitespace-nowrap font-normal text-green-800 px-6 py-4"
                          : "whitespace-nowrap font-normal text-red-800 px-6 py-4"
                      }
                    >
                      {user.isActive ? "available" : "unavailable"}
                    </td>

                    {/* <td className="whitespace-nowrap px-6 py-4">
                      <Link to={`edit/${user._id}`}>
                        <FaEdit className="text-base cursor-pointer focus:outline-none view-form" />
                      </Link>
                      <Tooltip
                        style={TOOLTIP_STYLE}
                        place="bottom-end"
                        anchorSelect=".view-form"
                        content="view/edit details"
                      />
                    </td> */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <MdPublishedWithChanges
                        className={
                          user.isActive
                            ? "text-lg text-red-600 cursor-pointer availability focus:outline-none"
                            : "text-lg text-green-400 cursor-pointer availability focus:outline-none"
                        }
                        onClick={() =>
                          setModal({
                            active: !modal.active,
                            payload: user._id,
                          })
                        }
                      />
                      <Tooltip
                        style={TOOLTIP_STYLE}
                        place="bottom-end"
                        anchorSelect=".availability"
                        content="change user status"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div
            id="isEmpty"
            className="hidden w-full h-96 flex-col justify-center items-center bg-neutral-100 rounded-md shadow-md"
          >
            <h2 className="font-serif font-semibold text-2xl text-center text-primary">
              Users Not Found
            </h2>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={fetchUsers}
                className="outline-none mt-2 font-tabs text-blue-600 hover:underline "
              >
                refresh
              </button>
            </div>
          </div>
        )}
      </div>
      {users.length > 0 && (
        <div className="flex justify-end items-center mr-8 mt-8">
          <p className="w-6 text-center text-base font-bold ">
            <BsFillCaretLeftFill
              onClick={() => currPage > 1 && setCurrPage(currPage - 1)}
              className="mx-auto cursor-pointer"
            />
          </p>
          <div className="flex items-center" ref={pagination}></div>
          <p className="w-6 text-center text-base font-bold ">
            <BsFillCaretRightFill
              onClick={() => currPage < totalPages && setCurrPage(currPage + 1)}
              className="mx-auto cursor-pointer"
            />
          </p>
        </div>
      )}
      {modal.active && (
        <div className="fixed top-0 left-0 lg:ml-28 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-8 py-4 rounded-md shadow-md">
            <p className="h-12 font-title">Confirm to change user status</p>
            <h1 className="text-center font-serif text-blue-900">
              Are you sure?
            </h1>
            <div className="flex justify-evenly items-center my-2">
              <button
                className="px-4 py-1 rounded-md border border-blue-600 font-bold text-blue-600 hover:bg-blue-500 hover:text-white"
                onClick={() => setModal({ active: !modal.active, payload: "" })}
              >
                No
              </button>
              <button
                className="px-4 py-1 rounded-md border border-red-500 font-bold text-red-500 hover:bg-red-500 hover:text-white"
                onClick={statusChange}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersList;
