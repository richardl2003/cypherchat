import { View, Text } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'

function Empty(props: any) {
    return (
        <View 
            style={{
                flex: 1,
                justifyContent: props.centered ? 'center' : 'flex-start',
                alignItems: 'center',
                paddingVertical: 120                      
            }}
        >
            <FontAwesome6 
                name={props.name} 
                size={90} 
                color="#d0d0d0" 
                style={{ marginBottom: 20}}
            />
            <Text
				style={{
					color: '#c3c3c3',
					fontSize: 16
				}}            
            >
                {props.message}
            </Text>
        </View>
    )
}

export default Empty