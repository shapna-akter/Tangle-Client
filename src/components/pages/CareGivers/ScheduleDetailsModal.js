import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ScheduleDetailsModal = ({ schedule }) => {
    const { clientDetails } = schedule;
    // console.log(clientDetails);

    const [showNoteOptions, setShowNoteOptions] = useState(false);
    // Function to toggle note section visibility
    const toggleNoteOptions = () => {
        setShowNoteOptions((prev) => !prev);
    };
    return (
        <>
            <input type="checkbox" id="schedule-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg bg-primary text-base-100 text-center p-2">
                        Settings
                    </h3>
                    <div className="px-4 py-3 font-bold text-primary text-sm">
                        <div className='mb-5'>
                            <p className='lg:text-lg text-info'>Client's Personal Information: </p>
                            <p>Client's name: {clientDetails?.name?.firstName} {clientDetails?.name?.middleName} {clientDetails?.name?.lastName}</p>
                            <p>Email: {clientDetails?.email}</p>
                            <p>Phone: {clientDetails?.phoneNumber}</p>
                            <p>Social Security Number: {clientDetails?.socialSecurityNumber}</p>
                        </div>
                        <p>
                            <Link>Edit Schedule</Link>
                        </p>
                        <button>Delete Schedule</button>
                        <div className="flex items-center">
                            <p>Daily Note</p>
                            <button
                                className="text-primary px-1 font-bold rounded-lg cursor-pointer"
                                onClick={toggleNoteOptions}
                            >
                                {showNoteOptions ? "-" : "+"}
                            </button>
                        </div>
                        {showNoteOptions && (
                            <div className="grid grid-cols-1 gap-2 text-xs text-info ml-24">
                                <p>Edit Note</p>
                                <p>Delete Note</p>
                                <p>Visit Note</p>
                            </div>
                        )}
                    </div>
                    <div className="modal-action">
                        <label htmlFor="schedule-modal" className="btn btn-primary text-base-100 btn-sm lg:btn-md">Close!</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScheduleDetailsModal;