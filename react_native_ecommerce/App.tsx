import React, { useState, useEffect, useRef } from 'react';
import { AbrovaChatClient, AbrovaChatConfig } from '@abrova/react-native-chat';
import AbrovaPush from '@abrova/push-react-native';
import { DemoUser, Order, MockOrders } from './src/models/types';
import { LoginScreen } from './src/screens/LoginScreen';
import { OrdersScreen } from './src/screens/OrdersScreen';
import { OrderChatScreen } from './src/screens/OrderChatScreen';

type Screen =
  | { name: 'Login' }
  | { name: 'Orders' }
  | { name: 'OrderChat'; orderId: string };

export default function App() {
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [abrovaChatClient, setAbrovaChatClient] = useState<AbrovaChatClient | null>(null);
  const [screen, setScreen] = useState<Screen>({ name: 'Login' });
  const pushInitialized = useRef(false);

  // Initialize AbrovaPush SDK once on app start
  useEffect(() => {
    if (pushInitialized.current) return;
    pushInitialized.current = true;

    AbrovaPush.init({
      apiKey: 'ab_live_your_api_key_here',
    }).then(() => {
      console.log('[AbrovaPush] SDK initialized');

      AbrovaPush.onMessage((message) => {
        console.log('[AbrovaPush] Message received:', message.title, message.body);
      });

      AbrovaPush.onConnectionState((connected) => {
        console.log('[AbrovaPush] Connection state:', connected ? 'connected' : 'disconnected');
      });

      AbrovaPush.onError((error) => {
        console.error('[AbrovaPush] Error:', error);
      });
    }).catch((error) => {
      console.error('[AbrovaPush] Init failed:', error);
    });

    return () => {
      AbrovaPush.removeAllListeners();
    };
  }, []);

  const handleLogin = (user: DemoUser) => {
    setCurrentUser(user);

    // Initialize AbrovaChat client
    const config: AbrovaChatConfig = {
      apiKey: 'ab_live_your_api_key_here',
      userId: user.id,
      userInfo: {
        displayName: user.name,
        role: user.role,
      },
    };

    const client = new AbrovaChatClient(config);
    client.connect();
    setAbrovaChatClient(client);
    setScreen({ name: 'Orders' });

    // Register device for push notifications with the logged-in user
    AbrovaPush.register({ userId: user.id }).then(() => {
      console.log('[AbrovaPush] Registered for user:', user.id);
    }).catch((error) => {
      console.error('[AbrovaPush] Registration failed:', error);
    });
  };

  const handleLogout = () => {
    // Unregister from push notifications
    AbrovaPush.unregister().then(() => {
      console.log('[AbrovaPush] Unregistered');
    }).catch((error) => {
      console.error('[AbrovaPush] Unregister failed:', error);
    });

    abrovaChatClient?.disconnect();
    setAbrovaChatClient(null);
    setCurrentUser(null);
    setScreen({ name: 'Login' });
  };

  if (!currentUser || !abrovaChatClient || screen.name === 'Login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (screen.name === 'OrderChat') {
    const order = MockOrders.find((o) => o.id === screen.orderId);

    if (!order) {
      setScreen({ name: 'Orders' });
      return null;
    }

    return (
      <OrderChatScreen
        order={order}
        currentUser={currentUser}
        client={abrovaChatClient}
        onBack={() => setScreen({ name: 'Orders' })}
      />
    );
  }

  return (
    <OrdersScreen
      currentUser={currentUser}
      client={abrovaChatClient}
      onOrderTap={(order: Order) => {
        setScreen({ name: 'OrderChat', orderId: order.id });
      }}
      onLogout={handleLogout}
    />
  );
}
