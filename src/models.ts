export type CardProfile = {
  card_id: string;
  public_key: string;
  display_card_code: string;
  nickname: string;
  avatar_id: string;
  frame_id: string;
  background_id: string;
  tags: string[];
  created_at: string;
  signature: string;
};

export type DailyCard = {
  card_id: string;
  date: string;
  stamps: string[];
  mood?: string;
  template_version: string;
  signature: string;
};

export type ExchangeMethod = "qr" | "nfc" | "ble" | "local_session";

export type ApproxLocation = {
  enabled: boolean;
  precision?: "none" | "city" | "area" | "venue";
  label?: string;
  lat_approx?: number;
  lng_approx?: number;
  radius_m?: number;
};

export type ReceivedCardSnapshot = {
  nickname: string;
  avatar_id: string;
  stamps: string[];
};

export type ExchangeEvent = {
  exchange_id: string;
  card_id: string;
  exchanged_at: string;
  exchange_method: ExchangeMethod;
  is_first_meeting: boolean;
  reunion_count: number;
  location: ApproxLocation;
  received_card_snapshot: ReceivedCardSnapshot;
};
