import AsyncStorage from '@react-native-async-storage/async-storage';

async function set(key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
}

async function get(key: string) {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.log(error);
    }
}

async function clear() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log(error);
    }
}

export default { set, get, clear }