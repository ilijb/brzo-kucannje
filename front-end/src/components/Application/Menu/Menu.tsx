import { useState } from 'react';
import AppStore from "../../../stores/AppStore";
import MenuUser from './MenuUser';
import MenuVisitor from './MenuVisitor';

export default function Menu() {
    const [ role, setRole ] = useState<"visitor" | "user" | "administrator">(AppStore.getState().auth.role);

    AppStore.subscribe(() => {
        setRole(AppStore.getState().auth.role)
    });

    return (
        <>
            { role === "visitor" && <MenuVisitor /> }
            { role === "user" && <MenuUser /> }
        </>
    );
}