import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Expo Icons substituindo react-icons
import {
  Card,
  ProfileImage,
  Content,
  Name,
  Profession,
  Stats,
  Connections,
} from "./styles";

const MemberCard = ({
  name,
  profession,
  rating,
  recommendations,
  mutualConnections,
  image,
}) => {
  return (
    <Card>
      <ProfileImage source={{ uri: image }} />
      <Content>
        <Name>{name}</Name>
        <Profession>{profession}</Profession>

        <Stats>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text>{rating}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="thumbs-up" size={12} color={theme.colors.primary} />
            <Text>{recommendations} recomendações</Text>
          </View>
        </Stats>

        <Connections>
          <Ionicons name="people" size={12} color={theme.colors.primary} />
          <Text>{mutualConnections} conexões em comum</Text>
        </Connections>
      </Content>
    </Card>
  );
};

export default MemberCard;
