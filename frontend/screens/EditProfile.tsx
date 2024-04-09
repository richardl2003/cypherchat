import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useStore } from '../utils/store';
import { api } from '../utils/';

function EditProfile() {
    const navigate = useNavigate();
    const currentUser = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);

    const [firstName, setFirstName] = useState(currentUser.first_name);
    const [lastName, setLastName] = useState(currentUser.last_name);
    const [username, setUsername] = useState(currentUser.username);

    async function handleSave() {
        try {
            // API call to update user details
            const response = await api.put('/api/user/profile/', {
                first_name: firstName,
                last_name: lastName,
                username: username,
            });
            // Update local user state
            setUser(response.data);
            Alert.alert('Success', 'Profile updated successfully.');
            navigate('/profile');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update profile.');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
            />
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
            />
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
            />
            <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFF', // Assuming a white background
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#000', // Border color
        marginBottom: 15,
        fontSize: 16,
        padding: 10,
    },
    button: {
        backgroundColor: '#000', // Button background color
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5, // Adjust as necessary to match your button style
        marginTop: 15,
    },
    buttonText: {
        color: '#FFF', // Button text color
        fontSize: 16,
    }
});

export default EditProfile;