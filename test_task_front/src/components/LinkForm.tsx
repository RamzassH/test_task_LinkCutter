import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LinkForm: FC = () => {
    const [link, setLink] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <div>
            <input
                onChange={e => setLink(e.target.value)}
                value={link}
                type="text"
                placeholder='Name'
            />
            <button onClick={() => store.create(link)}>
                Создать ссылку
            </button>
        </div>
    );
};

export default observer(LinkForm);