import React from 'react'

const DataCard = ({title, number, color}) => {
    return (
        <div style={{background: color}} className="card-wrapper">
            <div className="card">
                <h3>{title}</h3>
                <h4>{number}</h4>
            </div>
        </div>
    )
}

export default DataCard;
