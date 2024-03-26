import { Redirect, Stack } from 'expo-router'
import { Text } from 'react-native'

import { useSession } from '../../utils/ctx'

export default function AppLayout() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <Text>Loading...</Text>
    }

    if (!session) {
        return <Redirect href="/log-in" />
    }

    return <Stack />
}