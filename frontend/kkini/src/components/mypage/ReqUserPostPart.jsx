import React, { useState } from 'react';
import { AiOutlineTable, AiOutlineUser } from 'react-icons/ai';
import { BiBookmark, BiBookBookmark } from 'react-icons/bi';
import { MdLocalDining } from 'react-icons/md';

import P1_post from './P1_post.jsx';
import P2_recipe from './P2_recipe.jsx';
import P3_book from './P3_book.jsx';
import P4_scrap from './P4_scrap.jsx';

const tabs = [
  { tab: "포스트", icon: <AiOutlineTable />, ind: 0 },
  { tab: "레시피", icon: <MdLocalDining />, ind: 1 },
  { tab: "도감", icon: <BiBookBookmark />, ind: 2 },
  { tab: "스크랩", icon: <BiBookmark />, ind: 3 },
];

const ReqUserPostPart = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].tab);
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div className="flex space-x-14 border-t relative">
        {tabs.map((item) => (
          <div
            key={item.tab}
            onClick={() => {
              setActiveTab(item.tab);
              setTab(item.ind);
            }}
            className={`${
              activeTab === item.tab ? "border-t border-black" : "opacity-60"
            } flex items-center cursor-pointer py-2 text-sm`}
          >
            <p>{item.icon}</p>
            <p className='ml-1'>{item.tab}</p>
          </div>
        ))}
      </div>
      <TabContent tab={tab} />
    </div>
  );
};

function TabContent({ tab }) {
  switch (tab) {
    case 0:
      return <P1_post />;
    case 1:
      return <P2_recipe />;
    case 2:
      return <P3_book />;
    case 3:
      return <P4_scrap />;
    default:
      return null;
  }
}

export default ReqUserPostPart;
