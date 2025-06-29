export interface TwilioParticipant {
  sid: string;
  identity: string;
  state: 'connected' | 'disconnected' | 'reconnecting';
  tracks: Map<string, any>;
  audioTracks: Map<string, any>;
  videoTracks: Map<string, any>;
  dataTracks: Map<string, any>;
}

export interface TwilioRoom {
  sid: string;
  name: string;
  state: 'connected' | 'disconnected' | 'reconnecting';
  participants: Map<string, TwilioParticipant>;
  localParticipant: TwilioParticipant;
  disconnect: () => void;
}

export interface TwilioTrack {
  sid: string;
  kind: 'audio' | 'video' | 'data';
  name: string;
  isEnabled: boolean;
  attach: (element?: HTMLElement) => HTMLElement[];
  detach: (element?: HTMLElement) => HTMLElement[];
  enable: (enabled?: boolean) => TwilioTrack;
  disable: () => TwilioTrack;
  stop: () => void;
}

export interface TwilioVideoTrack extends TwilioTrack {
  kind: 'video';
  dimensions: {
    width: number;
    height: number;
  };
}

export interface TwilioAudioTrack extends TwilioTrack {
  kind: 'audio';
}

export interface TwilioLocalTrack extends TwilioTrack {
  restart: (constraints?: MediaTrackConstraints) => Promise<void>;
}

export interface TwilioLocalVideoTrack extends TwilioLocalTrack, TwilioVideoTrack {}
export interface TwilioLocalAudioTrack extends TwilioLocalTrack, TwilioAudioTrack {}

export interface TwilioConnectOptions {
  name: string;
  audio?: boolean | MediaTrackConstraints;
  video?: boolean | MediaTrackConstraints;
  tracks?: TwilioLocalTrack[];
  maxAudioBitrate?: number;
  maxVideoBitrate?: number;
  preferredVideoCodecs?: string[];
}

export interface TwilioTokenResponse {
  token: string;
  identity: string;
  room: string;
}