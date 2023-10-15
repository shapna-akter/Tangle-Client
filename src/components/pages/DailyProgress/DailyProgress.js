import React, { useState } from "react";
import dateImg from "../../../assets/calendar2.png";
import moment from "moment-timezone";

const DailyProgress = () => {
  const [timeIn, setTimeIn] = useState("12:00 PM");
  const [timeOut, setTimeOut] = useState("12:00 PM");

  return (
    <div className="lg:my-10 mx-14 m-4">
      <h3 className="lg:text-4xl text-2xl font-bold">Daily Progress Notes </h3>
      <div className="lg:text-3xl text-sm md:text-lg font-semibold">
        <div className="flex gap-2 my-4">
          <span>Caregiver: </span>
          <span>All Caregivers to check daily ADL's-IADL's</span>
        </div>
        <p className="my-4 flex flex-col lg:flex-row lg:gap-4 gap-2">
          <span>Client Name :</span>
          <input className="border-b-2 border-neutral" type="text" />
        </p>
        <p className="my-4 flex flex-col lg:flex-row lg:gap-4 gap-2">
          <span>Client id :</span>
          <input className="border-b-2 border-neutral" type="number" />
        </p>
        <p className="my-4 flex flex-col lg:flex-row lg:gap-4 gap-2">
          <div className="flex items-center justify-center gap-2">
            <span>Date: </span>
            <span>
              <img src={dateImg} alt="" className="h-6 " />
            </span>
          </div>
          <input className="border-b-2 border-neutral" type="" />
        </p>
      </div>
      <div className="my-12 lg:text-3xl text-sm md:text-lg font-semibold">
        <div className="flex flex-col lg:flex-row justify-center gap-12">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <span>Time In</span>
            <input
              className="border-2 border-gray-400 w-full max-w-xs"
              type="time"
              value={moment(timeIn, "hh:mm A").format("HH:mm")}
              onChange={(e) =>
                setTimeIn(moment(e.target.value, "HH:mm").format("hh:mm A"))
              }
            />
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <span>Time Out</span>
            <input
              className="border-2 border-gray-400 w-full max-w-xs"
              type="time"
              value={moment(timeOut, "hh:mm A").format("HH:mm")}
              onChange={(e) =>
                setTimeOut(moment(e.target.value, "HH:mm").format("hh:mm A"))
              }
            />
          </div>
        </div>
      </div>
      <p className="lg:text-3xl text-sm md:text-lg font-semibold text-center border-y-2 py-6">
        Please initial any Assistance of Daily Living you give to the Client
      </p>
      <div className="my-4 lg:mx-24 lg:text-3xl text-sm md:text-lg">
        <p className="font-semibold mx-8 my-4">Personal Care: </p>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Tub Bath/Shower Assistance:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Shower Assistance:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Bed Bath/ Sink Bath:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Shampoo Hair:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Shave Client:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Mouth Care:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span> Dressing Assistance:</span>
          </label>
        </div>
        <p className="font-semibold mx-8 my-4">Eating:</p>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Feed Client:</span>
          </label>
        </div>
        <p className="font-semibold mx-8 my-4">Toileting:</p>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Urinal/Bedpan:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Transfer to toilet/commode:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Diaper:</span>
          </label>
        </div>
        <p className="font-semibold mx-8 my-4">Activity</p>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Walks without help:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Uses cane/walker/crutch/wheelchair:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span> Needs hands on help with walking: </span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Assistance with transfer to chair/wheelchair/bed: </span>
          </label>
        </div>
      </div>
      <p className="lg:text-3xl text-sm md:text-lg font-semibold text-center border-y-2 py-6">
        Please check with Instrumental Activities of Daily Living you give to
        the Client only
      </p>
      <div className="my-4 lg:mx-24 lg:text-3xl text-sm md:text-lg">
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Prepare or serve meal:</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span> Grocery Shopping: </span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span> Cleaning: </span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Laundry: </span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Transportation (where?):</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Errands (where?):</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Hours out of home: </span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="checkbox border-2" />
            <span>Medication reminder</span>
          </label>
        </div>
      </div>
      <div className=" border-y-2 pb-6">
        <p className="lg:text-3xl text-sm md:text-lg font-semibold py-6">
          Additional Notes (Optional) :
        </p>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="border-2 border-gray-400 w-full"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:text-3xl text-sm md:text-lg font-semibold py-6">
        <div className="flex">
          <p className="w-2/5">Client Signature:</p>
          <textarea className="border-2 border-gray-400"></textarea>
        </div>
        <div className="flex">
          <p className="w-2/5">Company Representative:</p>
          <textarea className="border-2 border-gray-400"></textarea>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6 lg:mt-12">
        <input
          type="submit"
          value="Submit"
          className="text-base-100 bg-primary rounded-lg px-4 2xl:px-12 py-2 font-medium cursor-pointer hover:bg-primary-dark"
        />
      </div>
    </div>
  );
};

export default DailyProgress;
