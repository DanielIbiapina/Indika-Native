import React, { useState, useRef } from "react";
import { View, FlatList, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Slide,
  SlideImage,
  SlideTitle,
  SlideDescription,
  BottomContainer,
  Pagination,
  Dot,
  ButtonContainer,
  SkipButton,
  SkipText,
  NextButton,
  NextText,
} from "./styles";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Bem-vindo ao Indika",
    description: "Conectamos você a serviços de confiança próximos de você",
    image: {
      uri: "https://img.freepik.com/free-vector/people-searching-concept-illustration_114360-2656.jpg",
    },
  },
  {
    id: "2",
    title: "Encontre serviços",
    description: "Busque e compare serviços de diversos profissionais",
    image: {
      uri: "https://img.freepik.com/free-vector/hand-drawn-flat-design-marketplace-illustration_23-2149328941.jpg",
    },
  },
  {
    id: "3",
    title: "Contrate com segurança",
    description: "Profissionais verificados e avaliados pela comunidade",
    image: {
      uri: "https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg",
    },
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      navigation.replace("TabNavigator");
    } catch (e) {
      console.log("Erro ao salvar status de onboarding", e);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Slide>
        <SlideImage source={item.image} resizeMode="contain" />
        <SlideTitle>{item.title}</SlideTitle>
        <SlideDescription>{item.description}</SlideDescription>
      </Slide>
    );
  };

  const handleScroll = (event) => {
    const scrollPos = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPos / width);
    setCurrentIndex(index);
  };

  return (
    <Container>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
      />

      <BottomContainer>
        <Pagination>
          {slides.map((_, index) => (
            <Dot key={index} active={index === currentIndex} />
          ))}
        </Pagination>

        <ButtonContainer>
          <SkipButton onPress={completeOnboarding}>
            <SkipText>Pular</SkipText>
          </SkipButton>

          <NextButton onPress={handleNext}>
            <NextText>
              {currentIndex === slides.length - 1 ? "Começar" : "Próximo"}
            </NextText>
          </NextButton>
        </ButtonContainer>
      </BottomContainer>
    </Container>
  );
};

export default Onboarding;
