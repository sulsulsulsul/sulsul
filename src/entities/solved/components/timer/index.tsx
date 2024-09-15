export const getTimeRemaining = (endTime: string) => {
  const now = new Date();
  const end = new Date(endTime);
  const timeDiff = end.getTime() - now.getTime();

  const seconds = Math.floor((timeDiff / 1000) % 60);
  const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return {
    timeString: `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 후 종료`,
    timeDiff,
  };
};
