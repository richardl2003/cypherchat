import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Button, Title } from "../components";
import { useNavigate } from "react-router-native"
import { useEffect } from "react"
import { useStore } from "../utils/store"
import kdc from "../utils/kdc"

const Home = () => {
  const navigate = useNavigate()
  const setUser = useStore((state) => state.setUser)

  useEffect(() => {
    kdc.clear()
  }, [])

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