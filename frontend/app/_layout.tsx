import { Stack, Slot } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { SessionProvider, useSession } from "../utils/ctx";

const RootLayout = () => {
    return (
        <SessionProvider>
            <Slot />
        </SessionProvider>
    )
}

export default RootLayout;