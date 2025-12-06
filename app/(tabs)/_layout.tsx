import HomeIcon from "@/assets/icons/home-icon.svg";
import SearchIcon from "@/assets/icons/search-icon.svg";
import { COLORS } from "@/constants/theme";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.backgroundLight,
          paddingTop: 10,
          height: 70,
        },
        tabBarActiveTintColor: COLORS.text.primary,
        tabBarInactiveTintColor: COLORS.text.white,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <SearchIcon />,
        }}
      />
    </Tabs>
  );
}
