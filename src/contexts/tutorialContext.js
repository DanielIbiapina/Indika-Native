import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TutorialContext = createContext({});

export const TutorialProvider = ({ children }) => {
  const [activeTutorial, setActiveTutorial] = useState(null);
  const [tutorialSeen, setTutorialSeen] = useState({
    home: false,
    profile: false,
  });
  const [loading, setLoading] = useState(true);

  // Carregar o estado dos tutoriais vistos
  useEffect(() => {
    const loadTutorialState = async () => {
      try {
        const seenTutorials = await AsyncStorage.getItem("@App:seenTutorials");
        if (seenTutorials) {
          setTutorialSeen(JSON.parse(seenTutorials));
        }
      } catch (error) {
        console.error("Erro ao carregar estado do tutorial:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTutorialState();
  }, []);

  // Salva o estado dos tutoriais vistos
  const markTutorialSeen = async (screen) => {
    try {
      const updatedSeen = { ...tutorialSeen, [screen]: true };
      setTutorialSeen(updatedSeen);
      await AsyncStorage.setItem(
        "@App:seenTutorials",
        JSON.stringify(updatedSeen)
      );
    } catch (error) {
      console.error("Erro ao salvar estado do tutorial:", error);
    }
  };

  // Inicia um tutorial para uma tela específica
  const startTutorial = (screen) => {
    if (!tutorialSeen[screen]) {
      setActiveTutorial(screen);
    }
  };

  // Finaliza o tutorial atual
  const endTutorial = async (screen) => {
    setActiveTutorial(null);
    await markTutorialSeen(screen);
  };

  // Verificar se o tutorial deve ser exibido
  const shouldShowTutorial = (screen) => {
    return !tutorialSeen[screen] && activeTutorial === screen;
  };

  // NOVA FUNÇÃO: Resetar tutoriais
  const resetTutorials = async (screen = null) => {
    try {
      if (screen) {
        // Reset apenas um tutorial específico
        const updatedSeen = { ...tutorialSeen, [screen]: false };
        setTutorialSeen(updatedSeen);
        await AsyncStorage.setItem(
          "@App:seenTutorials",
          JSON.stringify(updatedSeen)
        );
        console.log(`Tutorial para a tela ${screen} foi resetado`);
      } else {
        // Reset todos os tutoriais
        const resetAllTutorials = Object.keys(tutorialSeen).reduce(
          (acc, key) => {
            acc[key] = false;
            return acc;
          },
          {}
        );

        setTutorialSeen(resetAllTutorials);
        await AsyncStorage.setItem(
          "@App:seenTutorials",
          JSON.stringify(resetAllTutorials)
        );
        console.log("Todos os tutoriais foram resetados");
      }
    } catch (error) {
      console.error("Erro ao resetar tutorials:", error);
    }
  };

  return (
    <TutorialContext.Provider
      value={{
        startTutorial,
        endTutorial,
        shouldShowTutorial,
        resetTutorials, // Exportar a nova função
        loading,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error("useTutorial deve ser usado dentro de um TutorialProvider");
  }
  return context;
};
