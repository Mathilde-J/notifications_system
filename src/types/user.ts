export type User = {
  id: string;
  username: string;
  isActive: boolean;
};

export type EmailUser = User & {
  email: string;
};

export type SmsUser = User & {
  phoneNumber: string;
};

export type PushUser = User & {
  deviceToken: string;
};
