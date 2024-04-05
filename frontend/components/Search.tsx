import { 
    TextInput, 
    View, 
    SafeAreaView, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    Keyboard, 
    KeyboardAvoidingView, 
    FlatList
} from 'react-native';
import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Empty from './Empty'
import { SearchRow } from './searching'
import { useStore } from '../utils/store';

function Search() {
    const [query, setQuery] = useState('')
    const searchList = useStore((state) => state.searchList)
    const searchUsers = useStore((state) => state.searchUsers)

    // Only perform search on query change
    useEffect(() => {
        searchUsers(query)
    }, [query])

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.viewContainer}>
                        <View>
                            <TextInput 
                                style={styles.searchBar}
                                value={query}
                                onChangeText={setQuery}
                                placeholder='Search...'
                                placeholderTextColor='#b0b0b0'
                            />
                            <Ionicons 
                                name='search'
                                size={20}
                                color='#b0b0b0'
                                style={styles.searchIcon}
                            />                             
                        </View>
                        {searchList === null ? (
                            <Empty 
                                name='magnifying-glass'
                                message={'Search for employee'}
                                centered={false}
                            />
                            ) : searchList.length === 0 ? (
                            <Empty 
                                name='triangle-exclamation'
                                message={`No results found for: ${query}`}
                                centered={false}
                            />
                        ) : (
                            <FlatList 
                                data={searchList}
                                renderItem={({ item }) => (
                                    <SearchRow user={item} />
                                )}
                                keyExtractor={item => item.username}
                            />
                        )
                    }                         
                    </View>
                </TouchableWithoutFeedback>               
            </KeyboardAvoidingView>           
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0'        
    },
    searchBar: {
        backgroundColor: '#e1e2e4',
        height: 52,
        borderRadius: 26,
        padding: 16,
        fontSize: 16,
        paddingLeft: 50        
    },
    searchIcon: {
        position: 'absolute',
        top: 17,
        left: 28
    }
})

export default Search