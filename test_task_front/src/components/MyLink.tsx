import React, { useState } from 'react';
import {Ilink} from "../models/Ilink";
import {observer} from "mobx-react-lite";
import {API_URL} from "../http";

const MyLink: React.FC<Ilink> = ({ shortLink}) => {
    return (
        <div>
            <form>
                <label>
                    Короткая ссылка:
                    <a href={API_URL + '/l/' +shortLink}>
                        {API_URL + '/l/' +shortLink}
                    </a>
                </label>
            </form>
        </div>
    );
};

export default observer(MyLink);