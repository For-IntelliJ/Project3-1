import React from 'react';

function ClassCard({ image, title, instructor, people }) {
    console.log(people);
    return (
        <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
            <img className="w-80 h-60 object-cover" src={image} alt={title} />
            <div className="px-4 py-3">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">멘토: {instructor}</p>
                <p className="text-lg font-bold text-gray-800">👤 {people}명</p>
            </div>
        </div>
    );
}

export default ClassCard;
