Expo project

Build and publish dev
expo build:ios --release-channel dev
expo build:android --release-channel dev
expo publish --release-channel dev

Build stage
expo build:ios --release-channel stage
expo build:android --release-channel stage
expo publish --release-channel stage

Build prod
expo build:ios --release-channel prod
expo build:android --release-channel prod
expo publish --release-channel prod
