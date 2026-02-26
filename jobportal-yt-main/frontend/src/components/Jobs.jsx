import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {

    if (!searchedQuery || Object.keys(searchedQuery).length === 0) {
        setFilterJobs(allJobs)
        return
    }

    const filteredJobs = allJobs.filter((job) => {

        // Location filter
        const locationMatch =
            !searchedQuery[0] ||
            job.location.toLowerCase() === searchedQuery[0].toLowerCase()

        // Industry filter (based on title)
        const industryMatch =
            !searchedQuery[1] ||
            job.title.toLowerCase().includes(searchedQuery[1].toLowerCase())

        // Salary filter
        let salaryMatch = true

        if (searchedQuery[2]) {

            if (searchedQuery[2] === "0-40k") {
                salaryMatch = job.salary <= 40000
            }

            else if (searchedQuery[2] === "42-1lakh") {
                salaryMatch = job.salary >= 42000 && job.salary <= 100000
            }

            else if (searchedQuery[2] === "1lakh to 5lakh") {
                salaryMatch = job.salary >= 100000 && job.salary <= 500000
            }
        }

        return locationMatch && industryMatch && salaryMatch

    })

    setFilterJobs(filteredJobs)

}, [allJobs, searchedQuery])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs