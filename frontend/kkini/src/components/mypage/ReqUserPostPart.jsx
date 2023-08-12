import React, { useEffect, useState } from 'react'
import { AiOutlineTable } from 'react-icons/ai'
import { BiBookmark, BiBookBookmark } from 'react-icons/bi'
import { MdLocalDining } from 'react-icons/md'

import P1 from './P1_post'
import P2 from './P2_recipe'
import P3 from './P3_book'
import P4 from './P4_scrap.jsx'

const ReqUserPostPart = ({ 내것 = 0, memid = 0 }) => {
    const [activeTab, setActiveTab] = useState()
    let [tab, setTab] = useState(0)
    const [mine] = useState(내것);
    const [tabs, setTabs] = useState([
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
    ])

    useEffect(() => {
        if (mine !== 1) {
            setTabs([
                {
                    tab: "포스트",
                    icon:<AiOutlineTable />,
                    activeTab: "",
                    ind: 0
                },
                {
                    tab:"레시피",
                    icon: <MdLocalDining />,
                    ind: 1
                },
                {
                    tab:"도감",
                    icon: <BiBookBookmark />,
                    ind: 2
                }
            ]);
        }
    }, [mine]);  

    return (
        <div>
            <div className="flex space-x-14 border-t relative">
                {tabs.map((item)=> (
                    <div 
                        key={item.ind}
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
    return props.tab === 0 ? <P1 />
       : props.tab === 1 ? <P2 />
       : props.tab === 2 ? <P3 />
       : <P4 />;
  }