import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProducScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import AppButton from "../components/AppButton";
import Colors from "../constants/Colors";
import { logout } from "../store/actions/auth";

const defaultNavOptions = {
  headerTitleStyle: {
    fontFamily: "open-sans-pro",
  },
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-create" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: UserProductsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.success,
    },

    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 50 }}>
          <SafeAreaView
            forceInset={{ top: "always", bottom: "never" }}
            style={styles.safearea}
          >
            <DrawerItems {...props} />
            <AppButton
              buttonStyle={styles.logout}
              textStyle={styles.text}
              onPress={() => {
                dispatch(logout());
              }}
            >
              Logout
            </AppButton>
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
});

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    justifyContent: "space-between",
  },
  logout: {
    marginHorizontal: 15,
    height: 50,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.success,
    borderRadius: 3,
    marginBottom: 30,
    elevation: 0,
  },
  text: {
    color: Colors.success,
  },
});

export default createAppContainer(MainNavigator);
