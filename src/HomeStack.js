import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Form from "./Form";
import Page2 from "./Page2";

const screens = {
  "Crée un compte :": {
    screen: Form
  },
  "Information :": {
    screen: Page2
  }
}

const HomeStack = createStackNavigator(screens);

export default Navigator = createAppContainer(HomeStack);