// src/components/ClassCard.jsx
import React from "react";

const ClassCard = ({
                       image,
                       title,
                       instructor,
                       people,
                       category, // 이제 “문자열(예: '디자인')” 항목을 받습니다.
                       onoff,
                       level,
                   }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 카드 상단 이미지 */}
            <div className="w-full h-44 bg-gray-200 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </div>
            {/* 카드 하단 정보 */}
            <div className="p-4">
                {/* 카테고리, 온/오프라인, 난이도 배지 배치 */}
                <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
            카테고리: {category}
          </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
            형태: {onoff}
          </span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
            난이도: {level}
          </span>
                </div>

                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-500 mb-1">멘토: {instructor}</p>
                <p className="text-lg font-bold text-gray-800">👤 {people}명</p>
            </div>
        </div>
    );
};

export default ClassCard;
