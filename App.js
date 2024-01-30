import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, FlatList, Modal } from "react-native";
import tw, { useAppColorScheme } from "twrnc";

const photos = [
  { id: 1, uri: 'https://assets.stickpng.com/thumbs/584df3956a5ae41a83ddee07.png', description: 'Mario Bros' },
  { id: 2, uri: 'https://mario.wiki.gallery/images/thumb/b/b8/SMBW_Yoshi.png/300px-SMBW_Yoshi.png', description: 'Yoshi' },
];

export default function App() {
  const [colorScheme, toggleColorScheme] = useAppColorScheme(tw);
  const isDarkMode = colorScheme === 'dark';

  const initialBackgroundColor = isDarkMode ? tw`bg-blue-500` : tw`bg-white`;
  const initialTextColor = isDarkMode ? tw`text-gray-100` : tw`text-black`;
  const initialShadow = tw`shadow-md`;

  const [cardStyle, setCardStyle] = useState({
    backgroundColor: initialBackgroundColor,
    textColor: initialTextColor,
    shadow: initialShadow,
  });

  const toggleCardColor = () => {
    setCardStyle((prevStyle) => ({
      backgroundColor: prevStyle.backgroundColor === tw`bg-gray-600`.backgroundColor
        ? (isDarkMode ? tw`bg-blue-600` : tw`bg-gray-400`)
        : (isDarkMode ? tw`bg-blue-500` : tw`bg-gray-400`),
      textColor: prevStyle.backgroundColor === tw`bg-gray-600`.backgroundColor
        ? (isDarkMode ? tw`text-white` : tw`text-silver-400`)
        : (isDarkMode ? tw`text-black` : tw`text-blue-100`),
      shadow: prevStyle.shadow,
    }));
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const toggleModal = (photo) => {
    setModalVisible(!modalVisible);
    setSelectedPhoto(photo);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleModal(item)}>
      <View style={{ margin: 10, overflow: 'hidden', ...cardStyle.shadow }}>
        <Image
          source={{ uri: item.uri }}
          style={{ width: 195, height: 200, borderRadius: 10 }}
          accessibilityLabel={item.description}
        />
        <Text style={[tw`text-lg font-bold mt-2`, cardStyle.textColor, { textAlign: 'center' }]}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[tw`flex flex-1 items-center justify-center bg-gray-200 dark:bg-gray-600`]}>
      <Text style={[tw`text-2xl font-bold mb-4`, cardStyle.textColor]}>App de Mario de Bros</Text>

      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ flexGrow: 0 }}
      />

      <View style={tw`mb-6`}>
        <TouchableOpacity
          onPress={() => {
            toggleCardColor();
            toggleColorScheme();
          }}
          style={tw`bg-cyan-600 py-3 px-6 rounded mt-4`}
        >
          <Text style={tw`text-white font-bold`}>Cambiar color</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal(null)}
      >
        <View style={[tw`flex-1 justify-center items-center`, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[tw`bg-white p-4 rounded-md items-center`, { width: '80%' }]}>
            <Text style={tw`text-lg font-bold mb-2`}>{selectedPhoto?.description}</Text>
            <Image
              source={{ uri: selectedPhoto?.uri }}
              style={{ width: '70%', height: 200, borderRadius: 55, marginBottom: 10 }}
              accessibilityLabel={selectedPhoto?.description}
            />
            <TouchableOpacity
              onPress={() => toggleModal(null)}
              style={tw`bg-cyan-600 py-3 px-6 rounded`}
            >
              <Text style={tw`text-white font-bold`}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
