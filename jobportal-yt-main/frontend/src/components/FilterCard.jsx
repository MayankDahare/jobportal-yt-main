import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {

    const dispatch = useDispatch()

    // store selected value for each section independently
    const [selectedValues, setSelectedValues] = useState({})

    // store open state for each dropdown independently
    const [openSections, setOpenSections] = useState({})

    // toggle dropdown open/close
    const toggleSection = (index) => {
        setOpenSections(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    // handle radio select per section
   const changeHandler = (sectionIndex, value) => {

    const newValues = {
        ...selectedValues,
        [sectionIndex]: value
    }

    setSelectedValues(newValues)

    // send object instead of string
    dispatch(setSearchedQuery(newValues))
}

    return (
        <div className='w-full bg-white p-3 rounded-md'>

            <h1 className='font-bold text-lg'>Filter Jobs</h1>

            <hr className='mt-3 mb-2' />

            {
                fitlerData.map((data, index) => (

                    <div key={index} className='mb-2 border-b pb-2'>

                        {/* Dropdown Header */}
                        <div
                            className='cursor-pointer font-semibold py-2 flex justify-between items-center'
                            onClick={() => toggleSection(index)}
                        >

                            <span>{data.fitlerType}</span>

                            {/* dropdown arrow */}
                            <span
                                className={`transition-transform duration-200 ${openSections[index] ? "rotate-180" : ""
                                    }`}
                            >
                                ▼
                            </span>

                        </div>

                        {/* Dropdown Content */}
                        <div
                            className={`overflow-hidden transition-all duration-200 ${openSections[index]
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 opacity-0"
                                }`}
                        >

                            <RadioGroup
                                value={selectedValues[index] || ""}
                                onValueChange={(value) => changeHandler(index, value)}
                            >

                                {
                                    data.array.map((item, idx) => {

                                        const itemId = `id${index}-${idx}`

                                        return (
                                            <div
                                                key={itemId}
                                                className='flex items-center space-x-2 my-2'
                                            >

                                                <RadioGroupItem
                                                    value={item}
                                                    id={itemId}
                                                />

                                                <Label htmlFor={itemId}>
                                                    {item}
                                                </Label>

                                            </div>
                                        )

                                    })
                                }

                            </RadioGroup>

                        </div>

                    </div>

                ))
            }

        </div>
    )
}

export default FilterCard