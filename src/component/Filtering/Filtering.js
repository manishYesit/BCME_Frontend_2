import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component'; // Replace with your actual DataTable package

const FilteredTable = ({ columns, data }) => {
    // State for search input
    const [filterText, setFilterText] = useState('');

    // Handle search input change
    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    // Filter the rows based on the user input (assuming the data has a 'fullname' field)
    const filteredData = useMemo(() => {
        return data.filter((row) => {
            return columns.some((column) => {
                const value = column.selector(row); // Get the value of the current column for the row
                return value && value.toString().toLowerCase().includes(filterText.toLowerCase());
            });
        });
        // return data.filter((row) => {
        //   // Check if the row has a 'fullname' field for filtering
        //   if (row.fullname) {
        //     return row.fullname.toLowerCase().includes(filterText.toLowerCase());
        //   }
        //   return true; // Return all rows if no 'fullname' is found
        // });
    }, [filterText, data]);

    return (
        <>
            {/* Search input */}
            <div className="row-cols-lg-4">
                <div className="col-sm-6 float-right pb-1">
                    <input
                        type="text"
                        placeholder="Search"
                        className="form-control"
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            {/* DataTable component */}
            <DataTable
                columns={columns}
                data={filteredData} // Pass the filtered data to the table
                pagination
            />
        </>
    );
};

export default FilteredTable;