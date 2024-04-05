import React, {useState}  from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Button from './Button'
import { kdc } from '../utils';
import { useNavigate }  from 'react-router-native'
import { useStore } from '../utils/store';
const images = {
    defaultPfp : require('../assets/images/default_avatar.jpg'),
    editPfp : require('../assets/images/edit_image.png'),
    background: require('../assets/images/ProfilePicBackground.jpg')
};
import { launchImageLibrary } from 'react-native-image-picker';


function Profile() {

    const navigate = useNavigate()

    const currentUser = useStore((state) => state.user)
    const setUser = useStore((state) => state.setUser)
    const [profileImage, setProfileImage] = useState<string | null>(null);
    
    function handleLogout() {
        // Reset the user state and clear the token
        kdc.clear()
        navigate('/home')
    }

    function handleEditProfile() {
        // Navigate to the Edit Profile Page
        navigate('/edit-profile');
    }

    const handleChoosePhoto = () => {
        launchImageLibrary({mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                const imageUri = response.assets[0].uri || null;
                setProfileImage(imageUri);
                // Here, you can also handle uploading the image to your server if needed
            }
        });
    };

    return (
    <View style={styles.container}> 
        <View style={styles.profileImageContainer}>
            <Image 
                source={profileImage ? {uri: profileImage} : images.defaultPfp} 
                style={styles.profilePhoto} 
            />
            <Text style={styles.username}>{currentUser.username}</Text>
            <TouchableOpacity onPress={handleChoosePhoto} style={styles.editButton}><Image source={images.editPfp} style={styles.editIcon}/></TouchableOpacity> 
        </View>
        
        <View style={styles.profileInfoContainer}>
            <Text style={styles.subtitle}>Name</Text>
            <Text style={styles.textinfo}>{currentUser.first_name} {currentUser.last_name}</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.subtitle}>Email</Text>
            <Text style={styles.textinfo}>{currentUser.email}</Text>
            <View style={styles.horizontalLine} />
        </View>
        
        <View style={styles.profileButtonsContainer}>
            <Button 
                title="Edit Profile"
                onPress={handleEditProfile}
                style={styles.regButton}
            />

            <Button 
                title="Logout"
                onPress={handleLogout}
                style={styles.regButton}
            />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileImageContainer: {
        flex: 2,
        position: 'relative',
        alignItems: 'center',
        paddingTop: 30,
    },
    profileInfoContainer: {
        flex: 2,
        paddingLeft: 30,
    },
    profileButtonsContainer: {
        flex: 1.2,
        alignItems: 'center',
    },
    profilePhoto: {
        width: '40%',
        height: '62%',
        borderRadius: 75,
        paddingBottom: 5,
    },
    editButton: {
        position: 'absolute',
        bottom: '42%',
        right: '33%',
        width: '8%',
        height: '13%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: "#33B5FF",
    },
    editIcon: {
        width: '90%',
        height: '70%',
    },
    username: {
        color:"#33B5FF",
        fontWeight: 'bold',
        fontSize: 28,
    },
    regButton: {
        backgroundColor: "#33B5FF",  
    },
    subtitle: {
        color: "#33B5FF",  
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10,
    },
    textinfo: {
        fontSize: 22,
        marginBottom: 5,
    },
    horizontalLine: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        marginBottom: 25,
        width: '90%',
    }
})

export default Profile