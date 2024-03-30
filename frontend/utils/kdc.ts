import * as SecureStore from 'expo-secure-store'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

function set(key: string, value: string) {
    SecureStore.setItem(key, value)
}

function get(key: string) {
    return SecureStore.getItem(key)
}

function clear() {
    SecureStore.deleteItemAsync(ACCESS_TOKEN)
    SecureStore.deleteItemAsync(REFRESH_TOKEN)
}

export default { set, get, clear }