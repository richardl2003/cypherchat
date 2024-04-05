import { TouchableOpacity, Text } from "react-native"

function Button(props: any) {
    return (
        <TouchableOpacity 
            style={[{
                backgroundColor: '#202020',
                borderRadius: 26,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                width: props.width ? props.width : 300
            }, props.style]}
            onPress={props.onPress}  
        >
            <Text style={[{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
            }, props.testStyle]}>
                {props.title}
            </Text>

        </TouchableOpacity>
    )
}

export default Button