import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Clock, Play } from 'lucide-react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';

const VideoTutorialsScreen = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Budget', 'Debt', 'Saving'];

  const videos = [
    {
      id: 1,
      title: 'How to create a monthly budget',
      duration: '5min',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
      category: 'Budget'
    },
    {
      id: 2,
      title: 'How to create a monthly budget',
      duration: '5min',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      category: 'Budget'
    },
    {
      id: 3,
      title: 'How to create a monthly budget',
      duration: '5min',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      category: 'Budget'
    },
    {
      id: 4,
      title: 'How to create a monthly budget',
      duration: '5min',
      thumbnail: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=300&h=200&fit=crop',
      category: 'Budget'
    }
  ];

  const CategoryButton = ({ category, isActive }) => (
    <TouchableOpacity
      className={`px-4 py-2 h-12 w-24 items-center justify-center rounded-lg mr-3 ${
        isActive 
          ? 'bg-blue-500' 
          : ' border border-gray-300'
      }`}
      onPress={() => setActiveCategory(category)}
    >
      <Text 
        className={`text-sm font-medium ${
          isActive 
            ? 'text-white' 
            : 'text-gray-700'
        }`}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const VideoCard = ({ video }) => (
    <TouchableOpacity className="w-[48%] mb-4 ">
      <View className="relative">
        <Image
          source={{ uri: video.thumbnail }}
          className="w-full h-32"
          style={{
            borderTopLeftRadius:5,
            borderTopRightRadius:5,
          }}
          resizeMode="cover"
        />
        {/* Play button overlay */}
        <View className="absolute inset-0 justify-center items-center">
          <View className="w-10 h-10 bg-white bg-opacity-90 rounded-full justify-center items-center">
            <Play size={16} color="#3B82F6" />
          </View>
        </View>
      </View>
      
      <View style={{borderBottomLeftRadius:5, borderBottomRightRadius:5}} className="bg-white p-3">
        <Text className="text-gray-800 text-sm font-medium my-2 leading-5">
            {video.title}
        </Text>
        
        <View className="flex-row items-center mt-1">
            <Clock size={12} color="#9CA3AF" />
            <Text className="text-gray-500 text-xs ml-1">
            {video.duration}
            </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredVideos = activeCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  return (
    <ComponentWrapper bg_color='bg-[#5055ba]' title='Financial Videos' >
        <View className="flex-1 ">
        {/* Category Filter Tabs */}
         <View className="flex-row items-center py-5">
            {categories.map((category, index) => (
            <CategoryButton 
                key={index}
                category={category}
                isActive={activeCategory === category}
            />
            ))}

        </View>

        {/* Video Grid */}
        <ScrollView 
            className="flex-1"
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-row flex-wrap justify-between">
            {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
            </View>
        </ScrollView>
        </View>
    </ComponentWrapper>
  );
};

export default VideoTutorialsScreen;