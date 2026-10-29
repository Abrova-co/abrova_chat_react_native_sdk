/**
 * AbrovaChat React Native SDK - Headless chat-as-a-service.
 *
 * @example
 * ```typescript
 * import { AbrovaChatClient } from '@abrova/react-native-chat';
 *
 * const client = new AbrovaChatClient({
 *   apiKey: 'your-api-key',
 *   userId: 'user-123',
 * });
 *
 * client.connect();
 *
 * // Listen for messages
 * client.on('message', (event) => {
 *   console.log('New message:', event.message.content);
 * });
 *
 * // Send a message
 * const message = await client.sendMessage(roomId, 'Hello!');
 *
 * // Cleanup
 * client.dispose();
 * ```
 *
 * @packageDocumentation
 */

// Main client
export { AbrovaChatClient } from './AbrovaChatClient';

// Config
export { AbrovaChatConfig, SDK_CONFIG, normalizeConfig } from './AbrovaChatConfig';
export type { NormalizedConfig } from './AbrovaChatConfig';

// Models
export type {
  Attachment,
  ConnectionState,
  Message,
  MessageType,
  PaginatedMessages,
  Participant,
  ParticipantRole,
  Reaction,
  Room,
  RoomType,
  RoomUnread,
  SubscriptionStatus,
  UnreadSummary,
} from './models/types';

// Events
export type {
  AbrovaChatEventMap,
  ConnectionStateEvent,
  MessageDeletionEvent,
  MessageEditEvent,
  MessageEvent,
  MessagePinEvent,
  PresenceEvent,
  ReactionEvent,
  ReadReceiptEvent,
  RecoveryFailedEvent,
  RoomUpdatedEvent,
  SubscriptionStateEvent,
  TypingEvent,
  AuthErrorEvent,
  MessageSentEvent,
  MessageFailedEvent,
} from './events/events';

// Offline outbox
export type { OutboxStore, PendingMessage } from './services/Outbox';

// Services (for advanced usage)
export { ApiService, AbrovaChatError } from './services/ApiService';
export type { TokenProvider } from './services/TokenManager';
export type { Mention, SearchResult, UploadResult } from './services/ApiService';
export { RealtimeService } from './services/RealtimeService';

// SDK identity
export { SDK_NAME, SDK_VERSION } from './version';
