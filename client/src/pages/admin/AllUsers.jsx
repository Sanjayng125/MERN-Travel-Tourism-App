import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    try {
      const res = await axios.get(`/api/user/getAllUsers?searchTerm=${search}`);
      if (res?.data) {
        setAllUsers(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
    if (search) getUsers();
  }, [search]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full shadow-lg rounded-lg p-2">
          <h1 className="text-2xl text-center">All Users</h1>
          <div>
            <input
              type="text"
              className="my-3 p-2 rounded-lg border"
              placeholder="Search name,email or phone..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          {allUser ? (
            allUser.map((user, i) => {
              return (
                <div
                  className="flex overflow-auto justify-between p-2 px-3 border-y-2 gap-3"
                  key={i}
                >
                  <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
                    {user._id}
                  </h5>
                  <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
                    {user.username}
                  </h5>
                  <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
                    {user.email}
                  </h5>
                  <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
                    {user.address}
                  </h5>
                  <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
                    {user.phone}
                  </h5>
                  <div className="flex flex-col flex-1 justify-center items-center p-[5px]">
                    <button className="p-2 text-blue-500 hover:cursor-pointer hover:scale-125">
                      <FaPen />
                    </button>
                    <button className="p-2 text-red-500 hover:cursor-pointer hover:scale-125">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
