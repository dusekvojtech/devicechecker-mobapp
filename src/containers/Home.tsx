import React, { FC, useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRecoilState } from "recoil";
import { useTheme } from "@react-navigation/native";

import { Row } from "ui-components/containers";
import DeviceItem from "components/DeviceItem";
import { Device, getDevices, bookDevice, returnDevice } from "services/rest";
import userAtom from "atoms/user";
import LoadingComponent from "ui-components/Loading";

type Filter = {
  os: string;
  vendor: string;
};

const HomeScreen: FC = () => {
  const [user] = useRecoilState(userAtom);
  const [devices, setDevices] = useState<Device[]>([]);
  const [originalDevices, setOriginalDevices] = useState<Device[]>([]);
  const [filter, setFilter] = useState<Filter>({ os: "", vendor: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const { colors } = useTheme();

  const handleFilter = (value: string, name: string) => {
    setFilter((state) => ({
      ...state,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filteredDevices = originalDevices
      .filter((item) => (filter.os !== "" ? item.os === filter.os : true))
      .filter((item) =>
        filter.vendor !== "" ? item.vendor === filter.vendor : true
      );

    setDevices(filteredDevices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    const fetchDevices = async () => {
      const data = await getDevices();
      setDevices(data);
      setOriginalDevices(data);
    };
    void fetchDevices();
  }, []);

  const updateDevice = (device: Device) => {
    // update rendered state
    const index = devices.findIndex((item) => item.id === device.id);
    const newDevices = [...devices];
    newDevices[index] = device;
    setDevices(newDevices);

    // update backup state
    const originalIndex = originalDevices.findIndex(
      (item) => item.id === device.id
    );
    const newOriginalDevices = [...originalDevices];
    newOriginalDevices[originalIndex] = device;
    setOriginalDevices(newOriginalDevices);
  };

  return (
    <>
      <LoadingComponent
        visible={loading}
        backgroundColor={colors.transparentBackground}
      />
      <FlatList
        data={devices}
        ListHeaderComponent={
          <Row>
            <Picker
              selectedValue={filter.os}
              onValueChange={(itemValue) => handleFilter(itemValue, "os")}
              style={{ flex: 1 }}
              itemStyle={{ color: colors.primaryText }}
            >
              <Picker.Item label="Filter by OS" value="" />
              <Picker.Item label="iOS" value="IOS" />
              <Picker.Item label="Android" value="ANDROID" />
              <Picker.Item label="Windows" value="WINDOWS" />
            </Picker>
            <Picker
              selectedValue={filter.vendor}
              onValueChange={(itemValue) => handleFilter(itemValue, "vendor")}
              style={{ flex: 1 }}
              itemStyle={{ color: colors.primaryText }}
            >
              <Picker.Item label="Filter by vendor" value="" />
              <Picker.Item label="Apple" value="APPLE" />
              <Picker.Item label="Samsung" value="SAMSUNG" />
              <Picker.Item label="Huawei" value="HUAWEI" />
              <Picker.Item label="Xiaomi" value="XIAOMI" />
            </Picker>
          </Row>
        }
        renderItem={({ item }) => (
          <DeviceItem
            key={item.id}
            device={item}
            bookAction={async () => {
              if (user?.id) {
                setLoading(true);
                const updatedDevice = await bookDevice(user?.id, item.id);
                updateDevice(updatedDevice);
                setLoading(false);
              }
            }}
            returnAction={async () => {
              if (user?.id) {
                setLoading(true);
                const updatedDevice = await returnDevice(user?.id, item.id);
                updateDevice(updatedDevice);
                setLoading(false);
              }
            }}
          />
        )}
      />
    </>
  );
};

export default HomeScreen;
