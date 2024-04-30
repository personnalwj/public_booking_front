
import Input from '@/app/components/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const SpotForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedTimeslot, setSelectedTimeslot] = React.useState(null);

    const timeslots = [
        { id: 1, time: '9:00 AM - 9:30 AM' },
        { id: 2, time: '9:30 AM - 10:00 AM' },
        // Add more timeslots here
    ];

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="mb-4">
                <Input
                    type="text"
                    id="title"
                    label='Title'
                    {...register("title", { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && <span className="text-red-500">Title is required</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 font-bold">Description</label>
                <textarea
                    id="description"
                    {...register("description", { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.description && <span className="text-red-500">Description is required</span>}
            </div>

            <div className="mb-4">
                <Input
                    type="text"
                    label='Address'
                    id="address"
                    {...register("address", { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.address && <span className="text-red-500">Address is required</span>}
            </div>

            <div className="mb-4">
                <Listbox value={selectedTimeslot} onChange={setSelectedTimeslot}>
                    <Listbox.Label className="block mb-2 font-bold">Timeslot</Listbox.Label>
                    <div className="relative">
                        <Listbox.Button className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {selectedTimeslot ? selectedTimeslot.time : 'Select a timeslot'}
                            <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
                        </Listbox.Button>
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white border border-gray-300 rounded-md max-h-60 focus:outline-none">
                            {timeslots.map((timeslot) => (
                                <Listbox.Option
                                    key={timeslot.id}
                                    value={timeslot}
                                    className={({ active }) =>
                                        `${active ? 'text-white bg-blue-500' : 'text-gray-900'}
                                        cursor-default select-none relative py-2 pl-3 pr-9`
                                    }
                                >
                                    {timeslot.time}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
                {errors.timeslot && <span className="text-red-500">Timeslot is required</span>}
            </div>

            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Create Spot</button>
        </form>
    );
};

export default SpotForm;