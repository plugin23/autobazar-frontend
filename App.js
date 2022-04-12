import 'react-native-gesture-handler'
import React from 'react';
import LoginScreen from './components/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


class App extends React.Component {
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
          <LoginScreen loggedIn={this.loggedIn} showRegister={this.showRegister} />
        );
    }
}

export default App


