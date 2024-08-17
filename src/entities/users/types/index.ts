export interface UserDTO {
  userId: number;
  email: string;
  nickname: string;
  job?: {
    jobId: number;
    name: string;
  };
}
