'use client';

import { useEffect, useState } from 'react';
import { useGetDistricts } from '@/hooks/profile/use-getDistrict';
import { useGetStatesList } from '@/hooks/profile/use-getStates';
import { useGetCities } from '@/hooks/profile/use-getCities';
import { useGetPin } from '@/hooks/profile/use-getPinCodes';
import CustomBreadCrumb from '../view/breadCrumb';
import SelectComponent from '../view/Select';
import { BookOpenCheckIcon  } from 'lucide-react';

import { formLabelStyles, formStyle } from '../model/applicationStyles';
import LocationModal from '../view/modal/locationPicker';

const Profile = () => {
    const [stateId, setStateId] = useState<number>();
    const [districtId, setDistrictId] = useState<number>();
    const [cityId, setCityId] = useState<number>();
    const [pinCode, setPinCode] = useState<string>();
    const [openModal , setOpenModal] = useState<boolean>(false);
    const states = useGetStatesList();
    const districts = useGetDistricts(stateId ?? 0);
    const cities = useGetCities(districtId ?? 0);
    const pin = useGetPin(cityId ?? 0);

    useEffect(() => {
        if (pin?.pinCode) {
            setPinCode(pin.pinCode);
            setOpenModal(true)
        }
    }, [pin]);

    return (

        <div className="min-h-screen bg-white">
            <CustomBreadCrumb
                toHome="home"
                currentPage="profile"
                toHomeRoute="/home"
                currentPageRoute="/profile"
            />

            <div className="max-w-6xl mx-auto px-4 md:px-2 mt-16 border rounded-2xl p-2 shadow-lg"
            >
                <h1 className="text-lg font-semibold mt-5 flex justify-center italic underline">Please Complete Your Profile</h1>

                <form className="flex flex-col space-y-6 mt-12">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="fullName" className={`${formLabelStyles}`}>Full Name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                placeholder="Your Full Name"
                                className={`${formStyle}`}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="email" className={`${formLabelStyles}`}>Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                className={`${formStyle}`}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="mobileNumber" className={`${formLabelStyles}`}>Mobile Number</label>
                            <input
                                id="mobileNumber"
                                name="mobileNumber"
                                placeholder="Enter your mobile number"
                                className={`${formStyle}`}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="confirmNumber" className={`${formLabelStyles}`}>Confirm Mobile Number</label>
                            <input
                                id="confirmNumber"
                                name="confirmNumber"
                                placeholder="Re-enter mobile number"
                                className={`${formStyle}`}
                            />
                        </div>
                    </div>

                    <h1 className="text-md font-semibold italic flex items-center gap-2">
                        What&apos;s Your Address<BookOpenCheckIcon size={18} />
                    </h1>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="line1" className={`${formLabelStyles}`}>Address Line One</label>
                            <input
                                id="line1"
                                name="line1"
                                placeholder="Address line 1"
                                className={`${formStyle}`}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="line2" className={`${formLabelStyles}`}>Address Line Two</label>
                            <input
                                id="line2"
                                name="line2"
                                placeholder="Address line 2"
                                className={`${formStyle}`}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="line3" className={`${formLabelStyles}`}>Address Line Three</label>
                            <input
                                id="line3"
                                name="line3"
                                placeholder="Address line 3"
                                className={`${formStyle}`}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <label htmlFor="state" className="mb-1 font-medium italic">
                                State
                            </label>
                            <SelectComponent
                                placeHolder="Select State"
                                items={states ?? []}
                                className="w-full rounded-lg"
                                onChange={(id: string) => setStateId(Number(id))}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="district" className="mb-1 font-medium italic">
                                District
                            </label>
                            <SelectComponent
                                placeHolder="Select District"
                                items={districts ?? []}
                                className="w-full rounded-lg"
                                onChange={(id: string) => setDistrictId(Number(id))}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="city" className="mb-1 font-medium italic">
                                City
                            </label>
                            <SelectComponent
                                placeHolder="Select City"
                                items={cities ?? []}
                                className="w-full rounded-lg"
                                onChange={(id: string) => setCityId(Number(id))}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="pin" className="mb-1 font-medium italic">
                                Pin Code
                            </label>
                            <input
                                id="pin"
                                name="pin"
                                placeholder="Pin Code"
                                className="border px-2 py-1 rounded-lg w-full"
                                value={pinCode ?? ''}
                                readOnly
                            />
                        </div>
                    </div>
                   

                    <div className='flex justify-end'>
                        <button className='w-[180px] cursor-pointer rounded-xl h-[40px] bg-black text-white italic'>Submit</button>
                    </div>

                </form>
            </div>
           {pinCode && (
  <LocationModal
    pincode={pinCode}
    isOpen={openModal}
    onClose={() => setOpenModal(false)}
  />
)}
        </div>
    );
};

export default Profile;
