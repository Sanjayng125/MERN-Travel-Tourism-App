import React, { useCallback, useEffect, useState } from "react";
import "./styles/Home.css";
import { FaCalendar, FaSearch, FaStar } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { LuBadgePercent } from "react-icons/lu";
import PackageCard from "./PackageCard";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [topPackages, setTopPackages] = useState([]);
  const [latestPackages, setLatestPackages] = useState([]);
  const [offerPackages, setOfferPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getTopPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=packageRating&limit=8"
      );
      const data = await res.json();
      if (data?.success) {
        setTopPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, [topPackages]);

  const getLatestPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=createdAt&limit=8"
      );
      const data = await res.json();
      if (data?.success) {
        setLatestPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, [latestPackages]);

  const getOfferPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=createdAt&offer=true&limit=6"
      );
      const data = await res.json();
      if (data?.success) {
        setOfferPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, [offerPackages]);

  useEffect(() => {
    getTopPackages();
    getLatestPackages();
    getOfferPackages();
  }, []);

  return (
    <div className="main w-full">
      <div className="w-full flex flex-col">
        <div className="backaground_image w-full"></div>
        <div className="top-part w-full gap-2 flex flex-col">
          <h1 className="text-white text-4xl text-center font-bold underline mb-2">
            The Travel Index[0]
          </h1>
          <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
            Make Your Travel Dream Come True With Our Amazing Packages
          </h1>
          <div className="w-full flex justify-center items-center gap-2 mt-8">
            <input
              type="text"
              className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              onClick={() => {
                navigate(`/search?searchTerm=${search}`);
              }}
              className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
            >
              Go
              {/* <FaSearch className="" /> */}
            </button>
          </div>
          <div className="w-[90%] max-w-xl flex justify-center mt-10">
            <button
              onClick={() => {
                navigate("/search?offer=true");
              }}
              className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-e border-white rounded-s-full flex-1 hover:scale-105 transition-all duration-150"
            >
              Best Offers
              <LuBadgePercent className="text-2xl" />
            </button>
            <button
              onClick={() => {
                navigate("/search?sort=packageRating");
              }}
              className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-x border-white flex-1 hover:scale-105 transition-all duration-150"
            >
              Top Rated
              <FaStar className="text-2xl" />
            </button>
            <button
              onClick={() => {
                navigate("/search?sort=createdAt");
              }}
              className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-x border-white flex-1 hover:scale-105 transition-all duration-150"
            >
              Latest
              <FaCalendar className="text-lg" />
            </button>
            <button
              onClick={() => {
                navigate("/search?sort=packageTotalRatings");
              }}
              className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-s border-white rounded-e-full flex-1 hover:scale-105 transition-all duration-150"
            >
              Most Rated
              <FaRankingStar className="text-2xl" />
            </button>
          </div>
        </div>
        {/* main page */}
        <div className="main p-6 flex flex-col gap-5">
          {loading && <h1 className="text-center text-2xl">Loading...</h1>}
          {!loading &&
            topPackages.length === 0 &&
            latestPackages.length === 0 &&
            offerPackages.length === 0 && (
              <h1 className="text-center text-2xl">No Packages Yet!</h1>
            )}
          {/* Top Rated */}
          {!loading && topPackages.length > 0 && (
            <>
              <h1 className="text-2xl font-semibold">Top Packages</h1>
              <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
                {topPackages.map((packageData, i) => {
                  return <PackageCard key={i} packageData={packageData} />;
                })}
              </div>
            </>
          )}
          {/* Top Rated */}
          {/* latest */}
          {!loading && latestPackages.length > 0 && (
            <>
              <h1 className="text-2xl font-semibold">Latest Packages</h1>
              <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
                {latestPackages.map((packageData, i) => {
                  return <PackageCard key={i} packageData={packageData} />;
                })}
              </div>
            </>
          )}
          {/* latest */}
          {/* offer */}
          {!loading && offerPackages.length > 0 && (
            <>
              <div className="offers_img"></div>
              <h1 className="text-2xl font-semibold">Best Offers</h1>
              <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
                {offerPackages.map((packageData, i) => {
                  return <PackageCard key={i} packageData={packageData} />;
                })}
              </div>
            </>
          )}
          {/* offer */}
        </div>
      </div>
    </div>
  );
};

export default Home;
