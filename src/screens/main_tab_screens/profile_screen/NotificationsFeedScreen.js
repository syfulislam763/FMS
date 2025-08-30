import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Bell, Star } from 'lucide-react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';

const NotificationsFeedScreen = () => {
  const notifications = [
    {
      id: 1,
      type: 'reminder',
      icon: 'bell',
      title: 'Reminder!',
      description: 'Set up your automatic savings to meet your savings goal...',
      time: '17:00 - April 24',
      section: 'today'
    },
    {
      id: 2,
      type: 'update',
      icon: 'star',
      title: 'New Update',
      description: 'Set up your automatic savings to meet your savings goal...',
      time: '17:00 - April 24',
      section: 'today'
    },
    {
      id: 3,
      type: 'transaction',
      icon: 'bell',
      title: 'Transactions',
      description: 'A new transaction has been registered',
      time: '17:00 - April 24',
      section: 'yesterday'
    },
    {
      id: 4,
      type: 'update',
      icon: 'star',
      title: 'New Update',
      description: 'Set up your automatic savings to meet your savings goal...',
      time: '17:00 - April 24',
      section: 'yesterday'
    }
  ];

  const NotificationItem = ({ notification }) => (
    <View className="flex-row px-4 py-3 mb-3 bg-white">
      <View className="mr-3 mt-1">
        {notification.icon === 'bell' ? (
          <Bell size={20} color="#8B5CF6" />
        ) : (
          <Star size={20} color="#8B5CF6" />
        )}
      </View>
      
      <View className="flex-1">
        <Text className="text-gray-900 text-base font-semibold mb-1">
          {notification.title}
        </Text>
        <Text className="text-gray-600 text-sm leading-5 mb-2">
          {notification.description}
        </Text>
        <Text className="text-indigo-500 text-sm">
          {notification.time}
        </Text>
      </View>
    </View>
  );

  const SectionHeader = ({ title }) => (
    <Text className="text-gray-900 text-lg font-semibold px-4 py-3 bg-gray-100">
      {title}
    </Text>
  );

  const todayNotifications = notifications.filter(n => n.section === 'today');
  const yesterdayNotifications = notifications.filter(n => n.section === 'yesterday');

  return (
    <ComponentWrapper bg_color='bg-[#5055ba]' title='Notification'>
        <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <SectionHeader title="Today" />
        <View className="bg-white">
          {todayNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </View>

        {/* Yesterday Section */}
        <SectionHeader title="Yesterday" />
        <View className="bg-white">
          {yesterdayNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </View>
      </ScrollView>
    </ComponentWrapper>
  );
};

export default NotificationsFeedScreen;