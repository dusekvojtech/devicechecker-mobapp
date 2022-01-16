import React, { FC } from "react";
import { useRecoilState } from "recoil";
import { useTheme } from "@react-navigation/native";

import { Description } from "ui-components/texts";
import userAtom from "atoms/user";
import Container from "ui-components/Container";

const ProfileScreen: FC = () => {
  const [user] = useRecoilState(userAtom);
  const { colors } = useTheme();
  return (
    <Container backgroundColor={colors.background}>
      <Description style={{ marginTop: 50 }} color={colors.primaryText}>
        {user?.name}
      </Description>
      <Description color={colors.primaryText}>{user?.login}</Description>
      <Description color={colors.primaryText}>{user?.type}</Description>
    </Container>
  );
};

export default ProfileScreen;
