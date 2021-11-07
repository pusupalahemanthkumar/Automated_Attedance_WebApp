import React from 'react'

const FilterForm = () => {
    return (
        <div className="container-date-filter-form">
            <form onSubmit={() => { }} className="date-filter-form">
                <div className="form-date-group">
                    <input type="date" />
                </div>
                <div className="form-date-group">
                    <input type="text" placeholder="Enter Subject Name" />
                </div>
                <button className="form-date-btn">Fetch</button>
            </form>

        </div>
    )
}

export default FilterForm
