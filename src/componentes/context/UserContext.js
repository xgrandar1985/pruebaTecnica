
import { useEffect, useState } from "react";
import { createContext } from "react";

// pertenece a config de firebase
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebaseConfig/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        console.log("useEffect en acción");
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            setUser(user);
        });
        return unsuscribe;
    }, []);

    if (user === false) return <p>Loading app...</p>;

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}
