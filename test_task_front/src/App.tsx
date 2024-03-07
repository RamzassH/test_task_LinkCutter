import React, {useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from "./services/UserService";
import {IUser} from "./models/IUser";
import LinkForm from "./components/LinkForm";
import {Ilink} from "./models/Ilink";
import LinkService from "./services/LinkService";
import MyLinks from "./components/MyLinks";



function App() {

    const {store} = useContext(Context)
    const [links, setLinks] = useState<Ilink[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])



    async function getLinks() {
        try {
            const response = await LinkService.fetchLinks();
            setLinks(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Загрузка</div>
    }
  return (
    <div>
        <h1>{store.isAuth ?
            <button onClick={()=>store.logout()}>Выйти</button>
            : `Пользователь не авторизован`}
        </h1>
        <h1>
            {store.user.isActivated ?
            'Аккаунт подтвержден' : 'Аккаунт не подтвержден'}
        </h1>

        <div>
            <LinkForm/>
        </div>
        <div>
            <LoginForm/>
            <button onClick={getLinks}>Показать ссылки</button>
        </div>
        {links ? <MyLinks linkList={links}/> : null}

    </div>
  );
}

export default observer(App);
