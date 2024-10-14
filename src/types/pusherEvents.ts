export type SubscriptionSuccededEventData = {
  count: number;
  me: { id: string; info: { user_id: string } };
  members: Record<string, { user_id: string }>;
  myID: string;
};

export type MemberAddedEventData = MemberFullInfo;

export type MemberRemovedEventData = MemberFullInfo;

export type IncomingMoveEventData = { mark: string; pos: number };

type MemberFullInfo = {
  id: string;
  info: { user_id: string };
};
