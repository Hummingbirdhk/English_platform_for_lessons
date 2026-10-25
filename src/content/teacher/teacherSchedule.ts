export type RawScheduleStatus = 'Пришел' | 'Пришла' | 'Перенос занятия' | 'Отмена' | null;

export type ScheduleLesson = {
  dateTime: string;
  attendance: RawScheduleStatus;
  reschedule: string | null;
  payment: string | null;
};

type StudentScheduleConfig = {
  time: string;
  records: Record<
    string,
    {
      attendance?: Exclude<RawScheduleStatus, null>;
      reschedule?: string;
      payment?: string;
    }
  >;
};

const configs: Record<string, StudentScheduleConfig> = {
  'student-artem': {
    time: '19:00',
    records: {
      '03.09.2026': { attendance: 'Пришел' },
      '09.09.2026': { attendance: 'Пришел' },
      '10.09.2026': { attendance: 'Пришел' },
      '16.09.2026': { attendance: 'Пришел' },
      '17.09.2026': { attendance: 'Пришел', reschedule: 'Добавили еще на 20 число' },
      '23.09.2026': { attendance: 'Пришел' },
      '24.09.2026': { attendance: 'Пришел' },
      '30.09.2026': { attendance: 'Пришел' },
      '01.10.2026': { attendance: 'Пришел' },
      '07.10.2026': { attendance: 'Пришел' },
      '08.10.2026': { attendance: 'Пришел' },
      '14.10.2026': { attendance: 'Пришел' },
      '15.10.2026': { attendance: 'Пришел' },
      '21.10.2026': { attendance: 'Перенос занятия', reschedule: 'На субботу 24' },
      '22.10.2026': { attendance: 'Перенос занятия', reschedule: 'На субботу 24' },
      '28.10.2026': { attendance: 'Отмена', reschedule: 'Каникулы' },
      '29.10.2026': {
        attendance: 'Отмена',
        reschedule: 'Каникулы',
        payment: 'Оплата за 8 занятий за ноябрь',
      },
    },
  },
  'student-zlata': {
    time: '18:30',
    records: {
      '03.09.2026': { attendance: 'Пришла' },
      '09.09.2026': { attendance: 'Пришла' },
      '10.09.2026': { attendance: 'Пришла' },
      '16.09.2026': { attendance: 'Пришла' },
      '17.09.2026': { attendance: 'Пришла', reschedule: 'Добавили еще на 20 число' },
      '23.09.2026': { attendance: 'Пришла' },
      '24.09.2026': { attendance: 'Пришла' },
      '30.09.2026': { attendance: 'Пришла' },
      '01.10.2026': { attendance: 'Пришла' },
      '07.10.2026': { attendance: 'Пришла' },
      '08.10.2026': { attendance: 'Отмена' },
      '14.10.2026': { attendance: 'Пришла' },
      '15.10.2026': { attendance: 'Пришла' },
      '21.10.2026': { attendance: 'Отмена' },
      '22.10.2026': { attendance: 'Отмена', payment: 'Оплата за 5 занятий в ноябре' },
      '28.10.2026': { attendance: 'Отмена', reschedule: 'Каникулы' },
      '29.10.2026': { attendance: 'Отмена', reschedule: 'Каникулы' },
    },
  },
};

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function toDateKey(date: Date) {
  return `${pad(date.getUTCDate())}.${pad(date.getUTCMonth() + 1)}.${date.getUTCFullYear()}`;
}

export function parseScheduleDateTime(value: string): Date {
  const [datePart, timePart] = value.split(' ');
  const [day, month, year] = datePart.split('.').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  return new Date(Date.UTC(year, month - 1, day, hours, minutes));
}

export function getStudentSchedule(studentId: string): ScheduleLesson[] {
  const config = configs[studentId];
  if (!config) return [];

  const lessons: ScheduleLesson[] = [];
  const start = Date.UTC(2026, 8, 3);
  const end = Date.UTC(2027, 4, 27);

  for (let timestamp = start; timestamp <= end; timestamp += 24 * 60 * 60 * 1000) {
    const date = new Date(timestamp);
    const weekday = date.getUTCDay();
    if (weekday !== 3 && weekday !== 4) continue;

    const dateKey = toDateKey(date);
    const record = config.records[dateKey] ?? {};
    lessons.push({
      dateTime: `${dateKey} ${config.time}`,
      attendance: record.attendance ?? null,
      reschedule: record.reschedule ?? null,
      payment: record.payment ?? null,
    });
  }

  return lessons;
}
