import React, { useState } from 'react';
import {Ilink} from "../models/Ilink";
import MyLink from "./MyLink";

interface Props {
    linkList: Ilink[]
}
const MyLinks: React.FC<Props> = ({linkList}:Props) => {
    return (
        <div>
            {linkList.map((link, index) => (
                <MyLink shortLink={link.shortLink} link={link.link}/>
            ))}
        </div>
    );
};

export default MyLinks;