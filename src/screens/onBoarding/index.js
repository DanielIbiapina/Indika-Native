import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Alert,
  Linking,
  Platform,
} from "react-native";
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
  LinksContainer,
  LinkButton,
  LinkButtonText,
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
  {
    id: "4",
    title: "Termos e Privacidade",
    description:
      "Ao usar o Indika, você aceita nossos Termos de Uso e Política de Privacidade.",
    image: { uri: "https://cdn-icons-png.flaticon.com/512/3094/3094837.png" },
    links: {
      terms: "https://indika-landing.vercel.app/termos-e-politica.pdf",
    },
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false); // ✅ PROTEÇÃO: Evitar duplo clique
  const flatListRef = useRef();
  const navigation = useNavigation();

  const handleNext = () => {
    if (isCompleting) return; // ✅ PROTEÇÃO: Se já está processando

    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    if (isCompleting) return; // ✅ PROTEÇÃO: Evitar execução dupla

    setIsCompleting(true); // ✅ BLOQUEAR: Futuras execuções

    try {
      // ✅ PASSO 1: Salvar no AsyncStorage
      await AsyncStorage.setItem("hasSeenOnboarding", "true");

      // ✅ PASSO 2: Delay específico para iOS
      if (Platform.OS === "ios") {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // ✅ PASSO 3: Navegação usando reset (mais seguro no iOS)
      navigation.reset({
        index: 0,
        routes: [{ name: "TabNavigator" }],
      });
    } catch (error) {
      console.error("Erro ao completar onboarding:", error);
      setIsCompleting(false); // ✅ LIBERAR: Em caso de erro

      // ✅ FALLBACK: Tentar navegação simples
      setTimeout(() => {
        navigation.navigate("TabNavigator");
      }, 200);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Slide>
        <SlideImage source={item.image} resizeMode="contain" />
        <SlideTitle>{item.title}</SlideTitle>
        <SlideDescription>{item.description}</SlideDescription>

        {item.links && (
          <LinksContainer>
            <LinkButton
              onPress={() => {
                try {
                  Linking.openURL(item.links.terms);
                } catch (error) {
                  console.warn("Erro ao abrir link:", error);
                }
              }}
            >
              <LinkButtonText>
                Ver Termos de Uso e Política de Privacidade
              </LinkButtonText>
            </LinkButton>
          </LinksContainer>
        )}
      </Slide>
    );
  };

  const handleScroll = (event) => {
    try {
      const scrollPos = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPos / width);
      setCurrentIndex(index);
    } catch (error) {
      console.warn("Erro no scroll:", error);
    }
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
          <SkipButton
            onPress={completeOnboarding}
            disabled={isCompleting} // ✅ PROTEÇÃO: Desabilitar durante processo
          >
            <SkipText>Pular</SkipText>
          </SkipButton>

          <NextButton
            onPress={handleNext}
            disabled={isCompleting} // ✅ PROTEÇÃO: Desabilitar durante processo
          >
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
