import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Smile } from 'lucide-react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';

const ChatUIScreen = () => {
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      text: "Hello Tessa! I'm planning my next career move and need some guidance on exploring new industries.",
      time: '10:00 AM',
      isUser: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      id: 2,
      text: "Hello Tessa! I'm planning my next career move and need some",
      time: '07:30 AM',
      isUser: false,
      isAI: true,
    },
    {
      id: 3,
      text: "Hello Tessa! I'm planning my next career move and need some",
      time: '10:00 AM',
      isUser: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
  ];

  const renderMessage = ({ item: msg }) => (
    <View>
      {msg.isUser ? (
        // User Message - Right Side (Orange)
        <View className="flex-row justify-end mb-4">
          <View className="max-w-[80%] bg-[#FFA950] rounded-3xl rounded-br-md px-5 py-4 mr-3">
            <Text className="text-white text-base leading-6 mb-2">
              {msg.text}
            </Text>
            <Text className="text-white text-xs text-right opacity-90">
              {msg.time}
            </Text>
          </View>
          <Image
            source={{ uri: msg.avatar }}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
        </View>
      ) : (
        // AI Message - Left Side (White)
        <View className="flex-row justify-start mb-4">
          {msg.isAI && (
            <View className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 items-center justify-center mr-3">
              <Text className="text-black text-lg font-bold">AI</Text>
            </View>
          )}
          <View className="max-w-[70%]">
            <View className="bg-white rounded-3xl rounded-bl-md px-5 py-4 ">
              <Text className="text-gray-800 text-base leading-6">
                {msg.text}
              </Text>
            </View>
            <Text className="text-gray-600 text-xs mt-1 ml-2">
              {msg.time}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ComponentWrapper title='AI Suggestions' bg_color='bg-[#FFA950]'>
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* Input Bar */}
        <View className="">
          <View className="flex-row items-center bg-white rounded-full shadow-md px-4 py-2">
            {/* Emoji Button */}
            <TouchableOpacity className="mr-3" activeOpacity={0.7}>
              <Smile size={24} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>

            {/* Text Input */}
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type message here..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-gray-800 text-base py-2"
              multiline={false}
            />

            {/* Send Button */}
            <TouchableOpacity 
              className="w-12 h-12 bg-[#FFA950] rounded-full items-center justify-center ml-3"
              activeOpacity={0.8}
            >
              <Send size={20} color="#FFF" strokeWidth={2.5} fill="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ComponentWrapper>
  );
};

export default ChatUIScreen;