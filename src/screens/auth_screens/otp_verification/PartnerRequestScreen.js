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

    const [currentList, setCurrentList] = useState([]);
    const [incommingList, setIncommingList] = useState([]);
    const [outgoingList, setOutgoingList] = useState([])

    const [tab, setTab] = useState("Outgoing");
    const [accepted, setAccepted] = useState(false);

    const handleAcceptRequest = (id) => {
      accepts_invitations(id, res => {
        if(res){
          if(tab == "Outgoing"){
            const temp  = currentList.filter(item => item._id == id);
            const temp2 = temp.map(item => {
              return {
                ...item,
                status: "accepted"
              }
            })
            setCurrentList(temp2);
            setOutgoingList(temp2);
          }else{
            const temp  = currentList.filter(item => item._id == id);
            const temp2 = temp.map(item => {
              return {
                ...item,
                status: "accepted"
              }
            })
            setCurrentList(temp2);
            setIncommingList(temp2);
          }
          
        }
      })
    }

    const handleDelinkRequest = (id) => {
      cancels_invitations(id, res => {
        if(res){
          setCurrentList([]);
          setIncommingList([]);
          setOutgoingList([])
        }
      })
    }

    const handleDeleteRequest = (id) => {
      delete_invitations(id, res => {
        if(res){
          if(tab == "Outgoing"){
            setCurrentList(currentList.filter(item => item._id != id));
            setOutgoingList(outgoingList.filter(item => item._id != id))
          }else{
            setCurrentList(currentList.filter(item => item._id != id));
            setIncommingList(incommingList.filter(item => item._id != id))
          }
          
        }
      })
    }


    const handleTab = (tb)=>{
      if(tb == "Outgoing"){
        setCurrentList(outgoingList)
      }else{
        setCurrentList(incommingList)
      }
      setTab(tb);
    }


    const handleGetRequestList = () => {
        setVisible(true);

        get_partners_request(res => {
            if(res){
                
                setCurrentList(res?.data?.outgoing)
                setIncommingList(res?.data?.incoming);
                setOutgoingList(res?.data?.outgoing)
            }else{
                setRequestList([])
            }

            setVisible(false);
        })
    }

    useEffect(() => {
        handleGetRequestList();
    }, [])

    console.log(JSON.stringify(currentList, null,2 ))



  const renderRequest = ({ item }) => (
    <View className="bg-white mb-4 rounded-2xl p-4 flex-row items-center">
      {/* Avatar */}
      <Image
        source={{ uri: tab=="Outgoing"? item?.toUser?.image: item?.fromUser?.image }}
        className="w-16 h-16 rounded-full"
        resizeMode="cover"
      />

      {/* User Info */}
      <View className="flex-1 ml-4">
        <Text className="text-black text-base font-bold mb-0.5">
          {tab=="Outgoing"? item?.toUser?.name: item?.fromUser?.name}
        </Text>
        <Text className="text-gray-600 text-sm mb-0.5">
          {item?.relation}
        </Text>
        <Text className="text-gray-500 text-xs">
          {tab=="Outgoing"? item?.toUser?.email: item?.fromUser?.email}
        </Text>
      </View>

      {/* Action Buttons */}
      {item?.status == "pending"?
        <View className="flex-row items-center ml-2">
        {/* Accept Button */}
        {!(tab == "Outgoing") && <TouchableOpacity 
          className="w-9 h-9 rounded-full bg-green-500 items-center justify-center mr-2"
          activeOpacity={0.8}
          onPress={() => handleAcceptRequest(item?._id)}
        >
          <Check size={20} color="#FFF" strokeWidth={3} />
        </TouchableOpacity>}

        {/* Reject Button */}
        {tab == "Outgoing" && <TouchableOpacity 
          className="w-9 h-9 rounded-full bg-red-500 items-center justify-center"
          activeOpacity={0.8}
          onPress={() => handleDeleteRequest(item?._id)}
        >
          <X size={20} color="#FFF" strokeWidth={3} />
        </TouchableOpacity>}

      </View>:

      <View className="flex-row items-center ml-2">

        <TouchableOpacity 
          className="w-9 h-9 rounded-full bg-green-500 items-center justify-center mr-2"
          activeOpacity={0.8}
          onPress={() => handleDelinkRequest(item?._id)}
        >
          <Text className="text-yellow-400 p-5 rounded-sm">Delink</Text>
        </TouchableOpacity>

      </View>
    
      }
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
        data={currentList}
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