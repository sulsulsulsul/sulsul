import dayjs, { type Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

type Format = 'YYYY년' | 'YYYY-MM-DD';

export const formatDateInWeekKorean = (date?: Dayjs) => {
  const dayJsDate = dayjs(date);
  const year = dayJsDate.year();
  const month = dayJsDate.month() + 1;
  const week = dayJsDate.week() - dayjs(`${year}-${month}-01`).week();

  const koreanWeeks = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주'];

  return `${year}년 ${month}월 ${koreanWeeks[week]}`;
};

export const formatDate = ({
  date = dayjs(),
  formatCase,
}: {
  date?: Dayjs;
  formatCase: Format;
}) => {
  return dayjs(date).format(formatCase);
};
