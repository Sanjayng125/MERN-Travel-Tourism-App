import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
} from "../../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import AllBookings from "./AllBookings";
import AdminUpdateProfile from "./AdminUpdateProfile";
import AddPackages from "./AddPackages";
import "./styles/DashboardStyle.css";
import AllPackages from "./AllPackages";
import AllUsers from "./AllUsers";
import Payments from "./Payments";
import RatingsReviews from "./RatingsReviews";
import History from "./History";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [photoPercentage, setPhotoPercentage] = useState(0);
  const [activePanelId, setActivePanelId] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser !== null) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        address: currentUser.address,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleProfilePhoto = (photo) => {
    try {
      dispatch(updateUserStart());
      const storage = getStorage(app);
      const photoname = new Date().getTime() + photo.name.replace(/\s/g, "");
      const storageRef = ref(storage, `profile-photos/${photoname}`); //profile-photos - folder name in firebase
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          //   console.log(progress);
          setPhotoPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            const res = await fetch(
              `/api/user/update-profile-photo/${currentUser._id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": " application/json",
                },
                body: JSON.stringify({ avatar: downloadUrl }),
              }
            );
            const data = await res.json();
            if (data?.success) {
              alert(data?.message);
              setFormData({ ...formData, avatar: downloadUrl });
              dispatch(updateUserSuccess(data?.user));
              setProfilePhoto(null);
              return;
            } else {
              dispatch(updateUserFailure(data?.message));
            }
            dispatch(updateUserFailure(data?.message));
            alert(data?.message);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logOutStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data?.success !== true) {
        dispatch(logOutFailure(data?.message));
        return;
      }
      dispatch(logOutSuccess());
      navigate("/login");
      alert(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const CONFIRM = confirm(
      "Are you sure ? the account will be permenantly deleted!"
    );
    if (CONFIRM) {
      try {
        dispatch(deleteUserAccountStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data?.success === false) {
          dispatch(deleteUserAccountFailure(data?.message));
          alert("Something went wrong!");
          return;
        }
        dispatch(deleteUserAccountSuccess());
        alert(data?.message);
      } catch (error) {}
    }
  };

  return (
    <div className="flex w-full flex-wrap max-sm:flex-col p-2">
      {currentUser ? (
        <>
          <div className="w-[35%] p-3 max-sm:w-full">
            <div className="flex flex-col items-center gap-4 p-3">
              <div className="w-full flex flex-col items-center relative">
                <img
                  src={
                    (profilePhoto && URL.createObjectURL(profilePhoto)) ||
                    formData.avatar
                  }
                  alt="Profile photo"
                  className="w-64 min-h-52 max-h-64 rounded-lg"
                  onClick={() => fileRef.current.click()}
                  onMouseOver={() => {
                    document
                      .getElementById("photoLabel")
                      .classList.add("block");
                  }}
                  onMouseOut={() => {
                    document
                      .getElementById("photoLabel")
                      .classList.remove("block");
                  }}
                />
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  hidden
                  ref={fileRef}
                  accept="image/*"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
                <label
                  htmlFor="photo"
                  id="photoLabel"
                  className="w-64 bg-slate-300 absolute bottom-0 p-2 text-center text-lg text-white font-semibold rounded-b-lg"
                  hidden
                >
                  Choose Photo
                </label>
              </div>
              {profilePhoto && (
                <div className="flex w-full justify-between gap-1">
                  <button
                    onClick={() => handleProfilePhoto(profilePhoto)}
                    className="bg-green-700 p-2 text-white mt-3 flex-1 hover:opacity-90"
                  >
                    {loading ? `Uploading...(${photoPercentage}%)` : "Upload"}
                  </button>
                </div>
              )}
              <p
                style={{
                  width: "100%",
                  borderBottom: "1px solid black",
                  lineHeight: "0.1em",
                  margin: "10px",
                }}
              >
                <span className="font-semibold" style={{ background: "#fff" }}>
                  Details
                </span>
              </p>
              <div className="w-full flex justify-between px-1">
                <button
                  onClick={handleLogout}
                  className="text-red-600 text-lg font-semibold self-start border border-red-600 p-1 rounded-lg hover:bg-red-600 hover:text-white"
                >
                  Log-out
                </button>
                <button
                  onClick={() => setActivePanelId(8)}
                  className="text-white text-lg self-end bg-gray-500 p-1 rounded-lg hover:bg-gray-700"
                >
                  Edit Profile
                </button>
              </div>
              <div className="w-full shadow-2xl rounded-lg p-3 break-all">
                <p className="text-3xl font-semibold m-1">
                  Hi {currentUser.username} !
                </p>
                <p className="text-lg font-semibold">
                  Email:{currentUser.email}
                </p>
                <p className="text-lg font-semibold">
                  Phone:{currentUser.phone}
                </p>
                <p className="text-lg font-semibold">
                  Address:{currentUser.address}
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="text-red-600 hover:underline"
              >
                Delete account
              </button>
            </div>
          </div>
          {/* ---------------------------------------------------------------------------------------- */}
          <div className="w-[65%] max-sm:w-full">
            <div className="main-div">
              <nav className="w-full border-blue-500 border-b-4 overflow-x-auto navbar">
                <div className="w-full flex gap-2">
                  <button
                    className={
                      activePanelId === 1
                        ? "p-1 rounded-t transition-all duration-300 text-nowrap bg-blue-500 text-white"
                        : "p-1 rounded-t transition-all duration-300 text-nowrap"
                    }
                    id="bookings"
                    onClick={() => setActivePanelId(1)}
                  >
                    Bookings
                  </button>
                  <button
                    className={
                      activePanelId === 2
                        ? "p-1 rounded-t transition-all duration-300 text-nowrap bg-blue-500 text-white"
                        : "p-1 rounded-t transition-all duration-300 text-nowrap"
                    }
                    id="bookings"
                    onClick={() => setActivePanelId(2)}
                  >
                    Add Packages
                  </button>
                  <button
                    className={
                      activePanelId === 3
                        ? "p-1 rounded-t transition-all duration-300 text-nowrap bg-blue-500 text-white"
                        : "p-1 rounded-t transition-all duration-300 text-nowrap"
                    }
                    id="bookings"
                    onClick={() => setActivePanelId(3)}
                  >
                    All Packages
                  </button>
                  <button
                    className={
                      activePanelId === 4
                        ? "p-1 rounded-t transition-all duration-300 text-nowrap bg-blue-500 text-white"
                        : "p-1 rounded-t transition-all duration-300 text-nowrap"
                    }
                    id="bookings"
                    onClick={() => setActivePanelId(4)}
                  >
                    Users
                  </button>
                  <button
                    className={
                      activePanelId === 5
                        ? "p-1 rounded-t transition-all duration-300 text-nowrap bg-blue-500 text-white"
                        : "p-1 rounded-t transition-all duration-300 text-nowrap"
                    }
                    id="bookings"
                    onClick={() => setActivePanelId(5)}
                  >
                    Payments
                  </button>
                  <button
                    className={
                      activePanelId === 6
                        ? "p-1 rounded-t transition-all duration-300 text-nowrap bg-blue-500 text-white"
                        : "p-1 rounded-t transition-all duration-300 text-nowrap"
                    }
                    id="bookings"
                    onClick={() => setActivePanelId(6)}
                  >
                    Ratings/Reviews
                  </button>
                  <button
                    className={
                      activePanelId === 7
                        ? "p-1 rounded-t transition-all duration-300 text-nowrap bg-blue-500 text-white"
                        : "p-1 rounded-t transition-all duration-300 text-nowrap"
                    }
                    id="bookings"
                    onClick={() => setActivePanelId(7)}
                  >
                    History
                  </button>
                  {/* <button
                    className={
                      activePanelId === 7
                        ? "p-1 rounded-t transition-all duration-300 text-nowrap bg-blue-500 text-white"
                        : "p-1 rounded-t transition-all duration-300 text-nowrap"
                    }
                    id="updateProfile"
                    onClick={() => setActivePanelId(7)}
                  >
                    Update Profile
                  </button> */}
                </div>
              </nav>
              <div className="content-div flex flex-wrap">
                {activePanelId === 1 ? (
                  <AllBookings />
                ) : activePanelId === 2 ? (
                  <AddPackages />
                ) : activePanelId === 3 ? (
                  <AllPackages />
                ) : activePanelId === 4 ? (
                  <AllUsers />
                ) : activePanelId === 5 ? (
                  <Payments />
                ) : activePanelId === 6 ? (
                  <RatingsReviews />
                ) : activePanelId === 7 ? (
                  <History />
                ) : activePanelId === 8 ? (
                  <AdminUpdateProfile />
                ) : (
                  <div>Page Not Found!</div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="text-red-700">Login First</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
