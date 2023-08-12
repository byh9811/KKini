import React, { useState } from 'react'
import { AiOutlineTable, AiOutlineUserg } from 'react-icons/ai'
import { BiBookmark, BiBookBookmark } from 'react-icons/bi'
import { MdLocalDining } from 'react-icons/md'

import P1_post from './P1_post.jsx'
import P2_recipe from './P2_recipe.jsx'
import P3_book from './P3_book.jsx'
import P4_scrap from './P4_scrap.jsx'

const ReqUserPostPart = () => {
    const [activeTab, setActiveTab] = useState()
    let [tab, setTab] = useState(0)
    const tabs=[
        {
            tab: "포스트",
            icon:<AiOutlineTable></AiOutlineTable>,
            activeTab: "",
            ind: 0
        },
        {
            tab:"레시피",
            icon: <MdLocalDining></MdLocalDining>,
            ind: 1
        },
        {
            tab:"도감",
            icon: <BiBookBookmark></BiBookBookmark>,
            ind: 2
        },
        {
            tab: "스크랩",
            icon: <BiBookmark></BiBookmark>,
            ind: 3
        }
    ]

    return (
        <div>
            <div className="flex space-x-14 border-t relative">
                {tabs.map((item)=> (
                    <div 
                        onClick={()=> {
                            setActiveTab(item.tab);
                            setTab(item.ind);
                        }}
                        className={`${
                            activeTab === item.tab ? "border-t border-black" : "opacity-60" 
                        } flex items-center cursor-pointer py-2 text-sm`}
                    > 
                    <p>{item.icon}</p>
                    <p className='ml-1'>{item.tab}</p>
                </div>))}
            </div>
            <TabContent tab={tab}></TabContent>
        </div>
    )
}

export default ReqUserPostPart

function TabContent(props) {
    return props.tab === 0 ? <P1_post />
       : props.tab === 1 ? <P2_recipe />
       : props.tab === 2 ? <P3_book />
       : <P4_scrap />;
  }
