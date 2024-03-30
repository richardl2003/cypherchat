import { Text } from 'react-native'

const Title = (props: { text: string, color:string }) => {
  return (
    <Text
        style={{
            color: props.color,
            textAlign: 'center',
            fontSize: 48,
            marginBottom: 30
        }}
    >
        {props.text}
    </Text>
  );
};

export default Title;