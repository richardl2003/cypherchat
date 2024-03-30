import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Button, Title } from "../components";
import { useNavigate } from "react-router-native"

const Home = () => {
  const navigate = useNavigate()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Title text="CypherChat" color="black" />
        <Button 
          title="Login"
          onPress={() => navigate("/login")}
        />
        <Button 
          title="Register"
          onPress={() => navigate("/register")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default Home;