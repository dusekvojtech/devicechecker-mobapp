import Constants from "expo-constants";

const ENV = {
  dev: {
    DEFAULT_EMAIL: "test",
    DEFAULT_PASSWORD: "test",
    API_URL: "",
  },
  stage: {
    DEFAULT_EMAIL: "",
    DEFAULT_PASSWORD: "",
  },
  prod: {
    DEFAULT_EMAIL: "",
    DEFAULT_PASSWORD: "",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
  if (env === "stage") {
    return ENV.stage;
  }
  if (env === "prod") {
    return ENV.prod;
  }
  return ENV.dev;
};

export default getEnvVars;
