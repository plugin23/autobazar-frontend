import 'react-native-gesture-handler'
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import CarsScreen from './components/CarsScreen'
import FavouritesScreen from './components/FavouritesScreen'
import BottomTabs from './components/BottomTabs'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [userId, setUserId] = useState("")

    const loggedIn = (id) => {
        setIsLoggedIn(true)
        setUserId(id)
    }

    const logOut = () => {
        setIsLoggedIn(false)
        setUserId("")
    }
    
    const showRegister = () => {
        if (!isRegistering) {
            setIsRegistering(true)
            return
        } else {
            setIsRegistering(false)
            return
        }
    }

    return (
        !isLoggedIn ? (
            !isRegistering ? (
                <LoginScreen loggedIn={loggedIn} showRegister={showRegister} />
            ) : (
                <RegisterScreen showRegister={showRegister}/>
            )
        ) : (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Tabs' screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" children={() => <CarsScreen userId={userId}/>}></Stack.Screen>
                        <Stack.Screen name="Tabs" children={() => <BottomTabs userId={userId}/>}/>
                    </Stack.Navigator>
                </NavigationContainer>
            )
    )
}

class AppD extends React.Component {
    constructor() {
        super()

        this.state = {
            isLoggedIn: false, 
            isRegistering: false,
            userId: "",
        }

        this.loggedIn = this.loggedIn.bind(this)
        this.showRegister = this.showRegister.bind(this)

    }

    
    loggedIn = (id) => {
        this.setState({
            isLoggedIn: true,
            userId: id
        })
    }

    logOut = () => {
        this.setState({
            isLoggedIn: false,
            userId: ""
        })
    }

    showRegister() {
        if (!this.state.isRegistering) {
            this.setState({ isRegistering: true })
            return
        } else {
            this.setState({ isRegistering: false })
            return
        }
    }

    render() {
        return (
            !this.state.isLoggedIn ? (
                <LoginScreen loggedIn={this.loggedIn} showRegister={this.showRegister} />
            ) : (
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName='Tabs'>
                            <Stack.Screen name="Home" children={() => <CarsScreen userId={this.state.userId}/>}></Stack.Screen>
                            <Stack.Screen name="Tabs" children={() => <BottomTabs userId={this.state.userId}/>}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                )
            
        )
    }
}

export default App


