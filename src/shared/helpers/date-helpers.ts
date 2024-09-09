import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

type Format = 'YYYY년';

export const formatDateInWeekKorean = (date?: Date) => {
  const dayJsDate = dayjs(date);
  const year = dayJsDate.year();
  const month = dayJsDate.month() + 1;
  const week = dayJsDate.week() - dayjs(`${year}-${month}-01`).week();

  const koreanWeeks = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주'];

  return `${year}년 ${month}월 ${koreanWeeks[week]}`;
};

export const formatDate = (date: Date, formatCase: Format) => {
  return dayjs(date).format(formatCase);
};
