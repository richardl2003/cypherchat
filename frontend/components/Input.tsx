import { View, Text, TextInput } from "react-native"

function Input(props: any) {
    return (
        <View>
            <Text
                style={{
                    color: '#70747a',
                    marginVertical: 6,
                    marginHorizontal: 12
                }}
            >
                {props.title}
            </Text>
            <TextInput 
                autoCapitalize="none"
                autoComplete="off"
                onChangeText={text => {
                    props.setValue(text)
                }}
                secureTextEntry={props.secureTextEntry}
                style={{
                    backgroundColor: '#e1e2e4',
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                    width: 300,
                }}
                value={props.value}
                textContentType='oneTimeCode'
            />
        </View>
    )
}

export default Input