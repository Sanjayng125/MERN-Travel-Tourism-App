import Booking from "../models/booking.model.js";
import Package from "../models/package.model.js";
import { ObjectId } from "mongodb";

//book package
export const bookPackage = async (req, res) => {
  try {
    const { packageDetails, buyer, totalPrice, persons, date } = req.body;

    if (req.user.id !== buyer) {
      return res.status(401).send({
        success: false,
        message: "You can only buy on your account!",
      });
    }

    if (!packageDetails || !buyer || !totalPrice || !persons || !date) {
      return res.status(200).send({
        success: false,
        message: "All fields are required!",
      });
    }

    const validPackage = await Package.findById(packageDetails);

    if (!validPackage) {
      return res.status(404).send({
        success: false,
        message: "Package Not Found!",
      });
    }

    const newBooking = await Booking.create(req.body);

    if (newBooking) {
      return res.status(201).send({
        success: true,
        message: "Package Booked!",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get current bookings for admin
export const getCurrentBookings = async (req, res) => {
  try {
    const searchTerm = req?.query?.searchTerm || "";
    const bookings = await Booking.find({
      date: { $gt: new Date().toISOString() },
      status: "Booked",
    })
      .populate("packageDetails")
      // .populate("buyer", "username email")
      .populate({
        path: "buyer",
        match: {
          $or: [
            { username: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
          ],
        },
      })
      .sort({ createdAt: "asc" });
    let bookingsFilterd = [];
    bookings.map((booking) => {
      if (booking.buyer !== null) {
        bookingsFilterd.push(booking);
      }
    });
    if (bookingsFilterd.length) {
      return res.status(200).send({
        success: true,
        bookings: bookingsFilterd,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "No Bookings Available",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get all bookings admin
export const getAllBookings = async (req, res) => {
  try {
    const searchTerm = req?.query?.searchTerm || "";
    const bookings = await Booking.find({})
      .populate("packageDetails")
      // .populate("buyer", "username email")
      .populate({
        path: "buyer",
        match: {
          $or: [
            { username: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
          ],
        },
      })
      .sort({ createdAt: "asc" });
    let bookingsFilterd = [];
    bookings.map((booking) => {
      if (booking.buyer !== null) {
        bookingsFilterd.push(booking);
      }
    });
    if (bookingsFilterd.length) {
      return res.status(200).send({
        success: true,
        bookings: bookingsFilterd,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "No Bookings Available",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get current bookings for user by id
export const getUserCurrentBookings = async (req, res) => {
  try {
    if (req?.user?.id !== req?.params?.id) {
      return res.status(401).send({
        success: false,
        message: "You can only get your own bookings!!",
      });
    }
    const searchTerm = req?.query?.searchTerm || "";
    const bookings = await Booking.find({
      buyer: new ObjectId(req?.params?.id),
      date: { $gt: new Date().toISOString() },
      status: "Booked",
    })
      // .populate("packageDetails")
      .populate({
        path: "packageDetails",
        match: {
          packageName: { $regex: searchTerm, $options: "i" },
        },
      })
      .populate("buyer", "username email")
      .sort({ createdAt: "asc" });
    let bookingsFilterd = [];
    bookings.map((booking) => {
      if (booking.packageDetails !== null) {
        bookingsFilterd.push(booking);
      }
    });
    if (bookingsFilterd.length) {
      return res.status(200).send({
        success: true,
        bookings: bookingsFilterd,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "No Bookings Available",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get all bookings by user id
export const getAllUserBookings = async (req, res) => {
  try {
    if (req?.user?.id !== req?.params?.id) {
      return res.status(401).send({
        success: false,
        message: "You can only get your own bookings!!",
      });
    }
    const searchTerm = req?.query?.searchTerm || "";
    const bookings = await Booking.find({
      buyer: new ObjectId(req?.params?.id),
    })
      // .populate("packageDetails")
      .populate({
        path: "packageDetails",
        match: {
          packageName: { $regex: searchTerm, $options: "i" },
        },
      })
      .populate("buyer", "username email")
      .sort({ createdAt: "asc" });
    let bookingsFilterd = [];
    bookings.map((booking) => {
      if (booking.packageDetails !== null) {
        bookingsFilterd.push(booking);
      }
    });
    if (bookingsFilterd.length) {
      return res.status(200).send({
        success: true,
        bookings: bookingsFilterd,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "No Bookings Available",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//delete booking history
export const deleteBookingHistory = async (req, res) => {
  try {
    if (req?.user?.id !== req?.params?.userId) {
      return res.status(401).send({
        success: false,
        message: "You can only delete your booking history!",
      });
    }
    const deleteHistory = await Booking.findByIdAndDelete(req?.params?.id);
    if (deleteHistory) {
      return res.status(200).send({
        success: true,
        message: "Booking History Deleted!",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Something went wrong while deleting booking history!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//cancel booking
export const cancelBooking = async (req, res) => {
  try {
    if (req.user.id !== req?.params?.userId) {
      return res.status(401).send({
        success: false,
        message: "You can only cancel your bookings!",
      });
    }
    const cancBooking = await Booking.findByIdAndUpdate(
      req?.params?.id,
      {
        status: "Cancelled",
      },
      { new: true }
    );
    if (cancBooking) {
      return res.status(200).send({
        success: true,
        message: "Booking Cancelled!",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Something went wrong while cancelling booking!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
