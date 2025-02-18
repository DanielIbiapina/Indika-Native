export const linking = {
  prefixes: ["exp://", "indika://"],
  config: {
    screens: {
      TabNavigator: {
        screens: {
          Pedidos: {
            path: "payment/:status",
            parse: {
              status: (status) => status,
            },
          },
        },
      },
    },
  },
};
