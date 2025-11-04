import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { 
  ChevronRight, 
  Users, 
  Lightbulb, 
  Bell, 
  FileText, 
  Lock, 
  Clock, 
  Play, 
  LogOut, 
  DollarSign,
  Edit3 
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import ComponentWrapper from '../../../components/ComponentWrapper';
import AppHeader from '../../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthProvider';

const ProfileScreen = () => {
  const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
  const [showSuggestionDropdown, setShowSuggestionDropdown] = useState(false);
  const [showDollarDropdown, setShowDollarDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face');
  const [isImagePressed, setIsImagePressed] = useState(false);

  const {SignOutUser} = useAuth()

  const navigation = useNavigation()

  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to change your profile picture!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const MenuItem = ({ icon: Icon, title, hasArrow = true, isRed = false, onPress, children }) => (
    <View>
      <TouchableOpacity 
        className="flex-row items-center justify-between py-4"
        onPress={onPress}
      >
        <View className="flex-row items-center">
          <Icon 
            size={20} 
            color={isRed ? "#EF4444" : "#5055ba"} 
            className="mr-3"
          />
          <Text className={`text-lg ml-2 ${isRed ? 'text-red-500' : 'text-gray-700'}`}>
            {title}
          </Text>
        </View>
        {hasArrow && (
          <ChevronRight size={25} color="#9CA3AF" />
        )}
      </TouchableOpacity>
      {children}
    </View>
  );

  const SubMenuItem = ({ title, route="ContactFormScreen" }) => (
    <TouchableOpacity onPress={() => navigation.navigate(route)} className="py-3 px-6 ml-4">
      <Text className="text-gray-600 text-sm">{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ComponentWrapper 
      headerComponent={() => 
        <AppHeader 
          middle={() => 
            <Text className="text-white font-archivo-semi-bold text-2xl">
              Profile
            </Text>
          }
        />
      } 
      bg_color='bg-button-bg'
    >
      <ScrollView showsVerticalScrollIndicator={false} className="flex-">
        {/* Profile Section */}
        <View className="pt-8 pb-6 items-center">
          <TouchableOpacity 
            className="relative w-24 h-24 rounded-full mb-4 overflow-hidden"
            onPress={pickImage}
            onPressIn={() => setIsImagePressed(true)}
            onPressOut={() => setIsImagePressed(false)}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: profileImage }}
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* Edit Overlay */}
            {isImagePressed && (
              <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
                <Edit3 size={24} color="white" />
              </View>
            )}
          </TouchableOpacity>
          
          <Text className="text-xl font-semibold text-gray-900 mb-1">
            Mostafa Rahman
          </Text>
          
          <Text className="text-gray-500 mb-6">
            mostafarah@gmail.com
          </Text>
          
          <TouchableOpacity onPress={() => navigation.navigate("PremiumFinancialAdvice")} className="bg-[#5055ba] py-3 rounded-[5px] w-full">
            <Text className="text-white text-center font-medium text-base">
              Subscribe Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View className="mt-4">
          <MenuItem 
            icon={Users} 
            title="Relationship data"
            onPress={() => setShowRelationshipDropdown(!showRelationshipDropdown)}
          >
            {showRelationshipDropdown && (
              <View className="">
                {/* <SubMenuItem title="Family Relations" />
                <SubMenuItem title="Friend Circle" /> */}
              </View>
            )}
          </MenuItem>
          
          <MenuItem 
            icon={Lightbulb} 
            title="Suggestion Adviser"
            onPress={() => setShowSuggestionDropdown(!showSuggestionDropdown)}
          >
            {showSuggestionDropdown && (
              <View className="">
                <SubMenuItem route='ChatUIScreen' title="Ask Financial Planner (AI Tool)" />
                {/* <SubMenuItem title="Send Expences" route='SendExpences' /> */}
                <SubMenuItem title="Book Appointment" route='ContactFormScreen' />
              </View>
            )}
          </MenuItem>
          
          <MenuItem 
            icon={Bell} 
            title="Notification"
            hasArrow={false}
            onPress={() => navigation.navigate("NotificationsFeedScreen")}
          />

          {/* <MenuItem 
            icon={DollarSign} 
            title="Dollar"
            onPress={() => setShowDollarDropdown(!showDollarDropdown)}
          >
            {showDollarDropdown && (
              <View className="">
                <SubMenuItem title="Curr" />
                <SubMenuItem title="Exchange Rates" />
              </View>
            )}
          </MenuItem> */}
          
          <MenuItem 
            icon={FileText} 
            title="Terms and Privacy Policy"
            hasArrow={false}
            onPress={() => navigation.navigate("TermsAndPolicy")}
          />
          
          <MenuItem 
            icon={Lock} 
            title="Change Password"
            hasArrow={false}
            onPress={() => navigation.navigate("ChangePassword")}
          />
          
          <MenuItem 
            icon={Clock} 
            title="Reminder Notification set"
            hasArrow={false}
            onPress={() => navigation.navigate("FinancialRemindersSettings")}
          />
          
          <MenuItem 
            icon={Play} 
            title="Financial Videos"
            hasArrow={false}
            onPress={() => navigation.navigate("VideoTutorialsScreen")}
          />
          
          <MenuItem 
            icon={LogOut} 
            title="Log out"
            hasArrow={false}
            isRed={true}
            onPress={() => SignOutUser()}
          />
        </View>
      </ScrollView>
    </ComponentWrapper>
  );
};

export default ProfileScreen;