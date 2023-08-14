import React, { useEffect, useState } from 'react';
import { AiOutlineTable } from 'react-icons/ai';
import { BiBookmark, BiBookBookmark } from 'react-icons/bi';
import { MdLocalDining } from 'react-icons/md';

import P1Post from './P1_post.jsx';
import P2Recipe from './P2_recipe.jsx';
import P3Book from './P3_book.jsx';
import P4Scrap from './P4_scrap.jsx';

const ReqUserPostPart = ({ 내것 = 0, memid = 0 }) => {
  const [tab, setTab] = useState(0);
  const [tabs, setTabs] = useState([
    { tab: "포스트", icon: <AiOutlineTable />, ind: 0 },
    { tab: "레시피", icon: <MdLocalDining />, ind: 1 },
    { tab: "도감", icon: <BiBookBookmark />, ind: 2 },
    { tab: "스크랩", icon: <BiBookmark />, ind: 3 },
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0].tab);
  
  useEffect(()=> {
    if (내것 !== 1) {
      setTabs([
        { tab: "포스트", icon: <AiOutlineTable />, ind: 0 },
        { tab: "레시피", icon: <MdLocalDining />, ind: 1 },
        // { tab: "빈", icon: <MdLocalDining />, ind: 2 },
        // { tab: "칸", icon: <MdLocalDining />, ind: 3 },
      ])
    }
  }, [내것]);

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
      return <P1Post />;
    case 1:
      return <P2Recipe />;
    case 2:
      return <P3Book />;
    case 3:
      return <P4Scrap />;
    default:
      return null;
  }
}

export default ReqUserPostPart;
