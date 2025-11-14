import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, X } from 'lucide-react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';
import { ActivityIndicator } from 'react-native';
import Indicator from '../../../components/Indicator';
import { useAuth } from '../../../context/AuthProvider';
import { 
    get_partners_request, 
    delete_invitations,
    accepts_invitations,
    cancels_invitations 
} from '../../main_tab_screens/ScreensAPI';

const PartnerRequestScreen = () => {
    const {userProfile} = useAuth();

    const [visible, setVisible] = useState(false);
    const [requestList, setRequestList] = useState([]);
    const [filteredList, setFilteredList] = useState([])
    const [tab, setTab] = useState("Outgoing")


    const handleTab = (tb)=>{
      if(tb == "Outgoing"){
        const filtered = requestList.filter( item => item.isOutgoing);
        setFilteredList(filtered)
        console.log(JSON.stringify(filtered, null, 2))
      }else{
        const filtered = requestList.filter( item => !item.isOutgoing);
        setFilteredList(filtered)
        console.log(JSON.stringify(filtered, null, 2))
      }
      setTab(tb);
    }


    const handleGetRequestList = () => {
        setVisible(true);

        get_partners_request(res => {
            if(res){
                const temp = res.data.map(item => {

                    return {
                        ...item,
                        profile: item.fromUser.email == userProfile?.user?.email? item.fromUser.image: item.toUser.image,
                        isOutgoing: (item.fromUser.email == userProfile?.user?.email),
                        email: (item.fromUser.email == userProfile?.user?.email)?item.toUser.email:item.fromUser.email,
                        name: (item.fromUser.email == userProfile?.user?.email)?item.toUser.name:item.fromUser.name,

                    }
                })
                const filtered = temp.filter( item => item.isOutgoing);
                setRequestList(temp);
                setFilteredList(temp);

                
                setFilteredList(filtered)
                
            }else{
                setRequestList([])
            }

            setVisible(false);
        })
    }

    useEffect(() => {
        handleGetRequestList();
    }, [])




  const renderRequest = ({ item }) => (
    <View className="bg-white mb-4 rounded-2xl p-4 flex-row items-center">
      {/* Avatar */}
      <Image
        source={{ uri: item.profile }}
        className="w-16 h-16 rounded-full"
        resizeMode="cover"
      />

      {/* User Info */}
      <View className="flex-1 ml-4">
        <Text className="text-black text-base font-bold mb-0.5">
          {item.name}
        </Text>
        <Text className="text-gray-600 text-sm mb-0.5">
          {item.relation}
        </Text>
        <Text className="text-gray-500 text-xs">
          {item.email}
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center ml-2">
        {/* Accept Button */}
        {!(item.isOutgoing) && <TouchableOpacity 
          className="w-9 h-9 rounded-full bg-green-500 items-center justify-center mr-2"
          activeOpacity={0.8}
        >
          <Check size={20} color="#FFF" strokeWidth={3} />
        </TouchableOpacity>}

        {/* Reject Button */}
        <TouchableOpacity 
          className="w-9 h-9 rounded-full bg-red-500 items-center justify-center"
          activeOpacity={0.8}
        >
          <X size={20} color="#FFF" strokeWidth={3} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ComponentWrapper bg_color='bg-[##5055ba]' title='Send Invitation'>
        {/* Header */}
      <View className="px-4 py-4  ">
        <Text className="text-black text-center text-xl font-bold">
          Partner Request
        </Text>
      </View>

      <View className="flex flex-row">
          <TouchableOpacity onPress={() => handleTab("Outgoing")} className={`${tab=="Outgoing"?"bg-[##5055ba]":"bg-[##5055ba80]"} px-5 py-3 rounded-sm`}>
            <Text className="font-archivo-semi-bold  text-white text-xl">Outgoing</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTab("Incoming")} className={`${tab=="Incoming"?"bg-[##5055ba]":"bg-[##5055ba80]"} px-5 py-3 rounded-sm ml-3`}>
            <Text className="font-archivo-semi-bold  text-white text-xl">Incoming</Text>
          </TouchableOpacity>
          
      </View>

      {/* Request List */}
      <FlatList
        data={filteredList}
        renderItem={renderRequest}
        keyExtractor={(item, idx) => idx}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />


        {visible && <Indicator visible={visible} onClose={() => setVisible(false)}>

                <ActivityIndicator size={"large"}/>
            
            </Indicator>}
    </ComponentWrapper>
      
  );
};

export default PartnerRequestScreen;